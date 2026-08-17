// 狀態管理
const addedOrders = new Set(); // 已加入匯款清單的訂單編號
const addedAmounts = new Map(); // 訂單編號 → { amount, isFull }
let payoutList = [...PAYOUT_LIST];
let partialTarget = null;

// ── 資料查詢 ── //

function currentRows() {
  return PERIOD_DATA[document.getElementById("period-select").value] || [];
}

function findRow(no) {
  for (const rows of Object.values(PERIOD_DATA)) {
    const r = rows.find((r) => r.no === no);
    if (r) return r;
  }
  return null;
}

function getPrevUnpaidRows() {
  const rows = [];
  for (const [period, data] of Object.entries(PERIOD_DATA)) {
    if (period >= CURRENT_PERIOD) continue;
    for (const r of data) {
      if (r.status === "未匯款" || r.status === "部分匯款") {
        rows.push(r);
      }
    }
  }
  rows.sort((a, b) => a.period.localeCompare(b.period));
  return rows;
}

// ── 搜尋（第一區塊） ── //

function onPeriodChange() {
  clearSearch();
}

function doSearch() {
  const no = document.getElementById("s-no").value.trim();
  const master = document.getElementById("s-master").value.trim();
  const status = document.getElementById("s-status").value;
  const type = document.getElementById("s-type").value;
  const date = document.getElementById("s-date").value.trim();

  const filtered = currentRows().filter((r) => {
    if (no && !r.no.includes(no)) return false;
    if (master && !r.master.includes(master)) return false;
    if (status && r.status !== status) return false;
    if (type && r.type !== type) return false;
    if (date && !r.date.includes(date)) return false;
    return true;
  });

  renderBlock1(filtered);
}

function clearSearch() {
  ["s-no", "s-master", "s-invoice", "s-date"].forEach(
    (id) => (document.getElementById(id).value = ""),
  );
  ["s-status", "s-type"].forEach(
    (id) => (document.getElementById(id).value = ""),
  );
  const rows = currentRows();
  document.getElementById("period-count").textContent = "總數 " + rows.length;
  renderBlock1(rows);
}

// ── 加入 / 取消 ── //

function addOrder(no, amount, isFull) {
  const row = findRow(no);
  if (!row) return;

  addedOrders.add(no);
  addedAmounts.set(no, { amount, isFull });
  payoutList.push({
    no: row.no,
    master: row.master,
    type: row.type,
    amount: amount,
    status: "待匯款",
    period: CURRENT_PERIOD,
    date: new Date().toISOString().slice(0, 10),
  });

  showToast(
    isFull ? "✓ 已全額加入匯款清單" : "✓ 已部分加入匯款清單",
    "#27ae60",
    "查看清單 ↓",
    scrollToPayoutSection,
  );
  refreshAll();
}

function cancelAdd(no) {
  addedOrders.delete(no);
  addedAmounts.delete(no);
  payoutList = payoutList.filter((p) => p.no !== no);
  refreshAll();
}

function removeFromPayout(no) {
  addedOrders.delete(no);
  addedAmounts.delete(no);
  payoutList = payoutList.filter((p) => p.no !== no);
  refreshAll();
  showToast("已從匯款清單移除", "#888");
}

// ── 部分加入 Modal ── //

function openPartialModal(no, maxIncome) {
  partialTarget = { no, maxIncome };
  const input = document.getElementById("partial-amount-input");
  input.value = "";
  input.classList.remove("error");
  document.getElementById("partial-error").textContent = "";
  document.getElementById("partial-confirm-btn").disabled = true;
  document.getElementById("partial-modal-overlay").classList.add("show");
  setTimeout(() => input.focus(), 50);
}

function closePartialModal() {
  document.getElementById("partial-modal-overlay").classList.remove("show");
  partialTarget = null;
}

function validatePartialAmount() {
  const input = document.getElementById("partial-amount-input");
  const errEl = document.getElementById("partial-error");
  const btn = document.getElementById("partial-confirm-btn");
  const val = Number(input.value);
  const max = partialTarget ? partialTarget.maxIncome : Infinity;

  let error = "";
  if (!input.value || val <= 0) error = "請輸入大於 0 的金額";
  else if (val > max)
    error = `金額不可超過師傅剩餘收入 NT$ ${max.toLocaleString()}`;

  input.classList.toggle("error", !!error);
  errEl.textContent = error;
  btn.disabled = !!error || !input.value;
}

function doPartialAdd() {
  if (!partialTarget) return;
  const val = Number(document.getElementById("partial-amount-input").value);
  addOrder(partialTarget.no, val, false);
  closePartialModal();
}

// ── 確認匯款 ── //

// ── 流程說明 Modal ── //

function openFlowModal() {
  document.getElementById("flow-modal-overlay").classList.add("show");
}

function closeFlowModal() {
  document.getElementById("flow-modal-overlay").classList.remove("show");
}

function confirmPayout() {
  const pending = payoutList.filter((p) => p.status === "待匯款");
  if (pending.length === 0) {
    showToast("目前沒有待匯款項目", "#888");
    return;
  }
  document.getElementById("modal-overlay").classList.add("show");
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("show");
}

function doConfirmPayout() {
  payoutList.forEach((p) => {
    if (p.status !== "待匯款") return;
    p.status = "已匯款";

    const row = findRow(p.no);
    if (row) {
      row.remitted += p.amount;
      row.income -= p.amount;
      if (row.income <= 0) {
        row.income = 0;
        row.status = "已匯款";
      } else {
        row.status = "部分匯款";
      }
    }

    addedOrders.delete(p.no);
    addedAmounts.delete(p.no);
  });

  closeModal();
  refreshAll();
  showToast("✓ 已確認匯款完成", "#27ae60");
}

// ── 渲染 ── //

function refreshAll() {
  doSearch();
  doPrevSearch();
  renderBlock3();
}

function renderIncomeRow(r) {
  const isAdded = addedOrders.has(r.no);
  const isRemitted = r.status === "已匯款";
  const rowClass = isAdded ? ' class="row-added"' : "";
  const negAttr = r.profit < 0 ? ' class="neg"' : "";

  const statusClass =
    r.status === "已匯款"
      ? "status-remitted"
      : r.status === "部分匯款"
        ? "status-partial"
        : "status-unpaid";

  let actionCell;
  if (isRemitted) {
    actionCell = "";
  } else if (isAdded) {
    actionCell = `<div class="added-info">
      <span class="added-label">已加入<br>匯款清單</span>
      <button class="btn-cancel-add" onclick="cancelAdd('${r.no}')">取消加入</button>
    </div>`;
  } else {
    actionCell = `<div style="display:flex;gap:4px">
      <button class="btn-add-full"   onclick="addOrder('${r.no}', ${r.income}, true)">全額加入</button>
      <button class="btn-add-custom" onclick="openPartialModal('${r.no}', ${r.income})">部分加入</button>
    </div>`;
  }

  return `<tr${rowClass}>
    <td><a href="#">${r.no}</a></td>
    <td>${r.master}</td>
    <td>${r.income.toLocaleString()}</td>
    <td>${r.remitted.toLocaleString()}</td>
    <td>${r.revenue.toLocaleString()}</td>
    <td${negAttr}>${r.profit.toLocaleString()}</td>
    <td class="${statusClass}">${r.status}</td>
    <td></td>
    <td><span class="chip">${r.type}</span></td>
    <td>${r.period}</td>
    <td>${r.date}</td>
    <td>
      <button class="btn-edit">編輯</button>
    </td>
    <td>${actionCell}</td>
  </tr>`;
}

function renderBlock1(rows) {
  const tbody = document.getElementById("tbody");
  if (rows.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="13" style="text-align:center;color:#bbb;padding:30px">此週期無資料</td></tr>';
    return;
  }
  tbody.innerHTML = rows.map((r) => renderIncomeRow(r)).join("");
}

function doPrevSearch() {
  const no = document.getElementById("p-no").value.trim();
  const master = document.getElementById("p-master").value.trim();
  const status = document.getElementById("p-status").value;
  const type = document.getElementById("p-type").value;
  const date = document.getElementById("p-date").value.trim();

  const filtered = getPrevUnpaidRows().filter((r) => {
    if (no && !r.no.includes(no)) return false;
    if (master && !r.master.includes(master)) return false;
    if (status && r.status !== status) return false;
    if (type && r.type !== type) return false;
    if (date && !r.date.includes(date)) return false;
    return true;
  });

  renderBlockPrev(filtered);
}

function clearPrevSearch() {
  ["p-no", "p-master", "p-date"].forEach(
    (id) => (document.getElementById(id).value = ""),
  );
  ["p-status", "p-type"].forEach(
    (id) => (document.getElementById(id).value = ""),
  );
  const rows = getPrevUnpaidRows();
  renderBlockPrev(rows);
}

function renderBlockPrev(rows) {
  if (!rows) rows = getPrevUnpaidRows();
  const tbody = document.getElementById("prev-tbody");

  document.getElementById("prev-count").textContent = "總數 " + rows.length;

  if (rows.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="13" style="text-align:center;color:#bbb;padding:30px">目前無前期未匯款項</td></tr>';
    return;
  }
  tbody.innerHTML = rows.map((r) => renderIncomeRow(r)).join("");
}

function renderBlock3() {
  const tbody = document.getElementById("payout-tbody");
  const selectedPeriod = document.getElementById("payout-period-select").value;
  const filtered = payoutList.filter((p) => p.period === selectedPeriod);

  if (filtered.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="8" class="payout-empty">此週期無匯款清單資料</td></tr>';
    return;
  }
  tbody.innerHTML = filtered
    .map((p) => {
      const isPending = p.status === "待匯款";
      const statusClass = isPending ? "status-pending" : "status-remitted";
      const removeCell = isPending
        ? `<button class="btn-remove" onclick="removeFromPayout('${p.no}')">移除</button>`
        : "";
      return `<tr>
      <td><a href="#">${p.no}</a></td>
      <td>${p.master}</td>
      <td><span class="chip">${p.type}</span></td>
      <td>${p.amount.toLocaleString()}</td>
      <td class="${statusClass}">${p.status}</td>
      <td>${p.period}</td>
      <td>${p.date}</td>
      <td>${removeCell}</td>
    </tr>`;
    })
    .join("");
}

// ── Toast ── //

function showToast(msg, color, linkText, linkFn) {
  const t = document.getElementById("toast");
  t.style.background = color || "#27ae60";
  if (linkText && linkFn) {
    t.innerHTML = `<span>${msg}</span><span class="toast-link" onclick="${linkFn.name}()">${linkText}</span>`;
  } else {
    t.textContent = msg;
  }
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2500);
}

function scrollToPayoutSection() {
  document
    .getElementById("payout-section")
    .scrollIntoView({ behavior: "smooth" });
}

// ── 初始化 ── //
clearSearch();
clearPrevSearch();
renderBlock3();

// ── 導覽模式 ── //

let tourIndex = 0;

function startTour() {
  tourIndex = 0;
  document.getElementById('tour-overlay').style.display      = 'block';
  document.getElementById('tour-highlight-box').style.display = 'block';
  document.getElementById('tour-card').style.display          = 'block';
  showTourStep(0);
}

function showTourStep(i) {
  tourIndex = i;
  const step   = TOUR_STEPS[i];
  const target = document.querySelector(step.selector);
  if (!target) return;

  target.scrollIntoView({ behavior: 'smooth', block: 'center' });

  setTimeout(() => {
    const rect = target.getBoundingClientRect();
    const pad  = 6;

    const hbox = document.getElementById('tour-highlight-box');
    hbox.style.top    = (rect.top    - pad) + 'px';
    hbox.style.left   = (rect.left   - pad) + 'px';
    hbox.style.width  = (rect.width  + pad * 2) + 'px';
    hbox.style.height = (rect.height + pad * 2) + 'px';

    document.getElementById('tour-card-title').textContent   = step.title;
    document.getElementById('tour-card-body').innerHTML      = step.body;
    document.getElementById('tour-step-count').textContent   = `${i + 1} / ${TOUR_STEPS.length}`;

    const prevBtn   = document.getElementById('btn-tour-prev');
    const nextBtn   = document.getElementById('btn-tour-next');
    const finishBtn = document.getElementById('btn-tour-finish');

    prevBtn.disabled        = i === 0;
    nextBtn.style.display   = i < TOUR_STEPS.length - 1 ? '' : 'none';
    finishBtn.style.display = i === TOUR_STEPS.length - 1 ? '' : 'none';

    positionTourCard(rect);
  }, 350);
}

function positionTourCard(rect) {
  const card   = document.getElementById('tour-card');
  const cardW  = 480;
  const cardH  = card.offsetHeight || 180;
  const margin = 16;
  const vw     = window.innerWidth;
  const vh     = window.innerHeight;

  let left = rect.left;
  if (left + cardW > vw - margin) left = vw - cardW - margin;
  if (left < margin) left = margin;

  let top = rect.bottom + 14;
  if (top + cardH > vh - margin) top = rect.top - cardH - 14;
  if (top < margin) top = margin;

  card.style.left = left + 'px';
  card.style.top  = top  + 'px';
}

function tourNext() {
  if (tourIndex < TOUR_STEPS.length - 1) showTourStep(tourIndex + 1);
}

function tourPrev() {
  if (tourIndex > 0) showTourStep(tourIndex - 1);
}

function closeTour() {
  document.getElementById('tour-overlay').style.display       = 'none';
  document.getElementById('tour-highlight-box').style.display = 'none';
  document.getElementById('tour-card').style.display          = 'none';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && document.getElementById('tour-overlay').style.display === 'block') {
    closeTour();
  }
});

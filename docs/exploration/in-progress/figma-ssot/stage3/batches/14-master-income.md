# 批次 14：師傅端／3 收入與撥款

- **Figma**：[APP_師傅 → 3 收入與撥款](https://www.figma.com/design/m0yuXFZN2fkivzTOcwiKJ4/APP_師傅)
- **Evidence**：Flutter repo `docs/figma-ssot/evidence/T-0067.md`（3.1.1）、`T-0105.md`（3.2.1 至 3.3.3）
- **紀錄方式**：只記例外（見 fill-figma-ssot Skill「Recording」）

---

## Frame 清單

| Frame | 狀態 |
|---|---|
| 3.1.1 收入總覽 | 已完成 |
| 3.1.2 收入說明提示（2026-10-07 新增） | 已完成 |
| 3.2.1 訂單收入與匯款明細 | 已完成 |
| 3.1.3 尚無已完成案件（原 3.2.2，2026-10-07 搬進 3.1） | 已完成 |
| 3.3.1 提前撥款申請須知 | 已完成 |
| 3.3.2 確認申請提前撥款 | 已完成 |
| 3.3.3 已提出提前撥款申請 | 已完成 |

---

## 本機元件

- `IncomeListItem`（Status=Unpaid／Paid；TEXT 屬性 Item、Amount、Date）：訂單明細的一列，3.1.1 與 3.2.1 使用。

---

## 待寫規則

使用者修正中屬於通則的部分，每個對話結束時一次寫進 Skill，寫完標「已寫入」。

- 底部可拖曳面板（`SlidingUpPanel`）做成 Frame 層級浮層 `IncomePanel`，圖層順序要在 BottomNavBar 之下（否則蓋住中央 Logo，使用者指出）。`float()` 之後用 `insertChild(1, ...)` 不會移到第二層，要用 `insertChild(2, ...)` 或事後檢查 `frame.children` 順序。（已寫入 screen-types.md「底部可拖曳面板」與 snippets 的 float 註解）

---

## 3.1.1 收入總覽（2026-10-07）

**程式**：`master_income_page.dart`、`income_list.dart`、`income_list_item.dart`

- 新畫面類型：底部可拖曳面板（`SlidingUpPanel`，最小高度為螢幕 25%）。面板做成 Frame 層級的浮層 `IncomePanel`（絕對定位，高 213，貼在 BottomNavBar 上緣，圖層順序在 BottomNavBar 之下、AppBar 之上）。
- 近似對應：長條圖顏色 (255,217,108) 用原始色 `Yellow/300`（#FFDE7D）；Key `2897ee3c248b9d8e4616b2fefce854bed0d2d7ac`。長條圖沒有 DS 元件，自排。
- `Scroll Content` 底部 padding 432：程式最後一張卡片下方留 350，加導覽列 82（Figma 的內容延伸到導覽列後面）。
- 示意資料依撥款規則（9/26 至 10/10 完工，10/20 匯款）：今天 10/07，下個月（11 月）尚無收入，顯示 $0、沒有長條。10 月 26,350＝尚未匯款 12,500（10/20）＋已匯款 13,850（10/05）。明細列的描述欄是「服務名稱-地址第一段」，畫面只顯示服務名稱。
- 沒有畫：資料載入中的 Shimmer、點資訊圖示的提示氣泡（短暫提示）。

## 3.2.1 訂單收入與匯款明細

- 從 3.1.1 複製，面板完全展開：`IncomePanel` 高 646（AppBar 下緣到導覽列上緣），使用者同意。內容蓋住後方卡片。
- 明細十列，涵蓋兩種匯款狀態（尚未匯款只有一筆，其餘已匯款）；後兩列是 6 月（建立日在近四個月內）。

## 3.1.3 尚無已完成案件（原 3.2.2）

- 從 3.1.1 複製。畫面停在面板最小高度（內容放得下，不需展開）；長條圖沒有長條與金額，各項金額 $0、接案數 0，推薦文字「0 次、$0」（被面板蓋住）。
- 空狀態用 DS `EmptyState`（Compact，無插圖、無說明、有按鈕），按鈕 Secondary Filled md pill「前往接案」。程式沒有插圖。

## 3.3.1 提前撥款申請須知

- 一般資料頁。白底整寬帶用 Card（Layout=Fill），標題 `Heading/4`，三條說明 `Body/S`＋`Text/Primary`（程式未設字級，Material 2 預設 14）。底部 Sticky Footer（Button only），按鈕 Primary Filled lg（程式 `NORMAL_STYLE`）。
- 近似對應：程式內距 16×24 照 DS 的 16；頁面頂端空 8 用 `Spacing/8`；底部陰影不畫。

## 3.3.2、3.3.3 兩個 Dialog

- 從 3.3.1 複製底圖，Dialog Standard。程式在 Android 是 `AlertDialog`、iOS 是 `CupertinoAlertDialog`，Figma 照 DS 只畫一種。3.3.2 按鈕「取消」「申請提前撥款」，3.3.3 只有「知道了」。
- 兩個 Dialog 底圖按鈕在遮罩下，維持 3.3.1 內容。

## 結構檢查（2026-10-07）

前六個 Frame 通過（3.1.2 由 3.1.1 複製後加提示，尚未重跑檢查）；回報的 clipping 是面板刻意裁切（`IncomePanel`、`Income List`），不是問題。

## 3.1.2 收入說明提示（2026-10-07 新增）

- 使用者決定另開一格：提示會遮住內容，且 DS 有 `Tooltip`（Open=true）。從 3.1.1 複製，三個資訊圖示換成 DS `Tooltip`（內部圖示 Question 換成 Phosphor Info，`Text/Link`），文字照程式：「以該年度完工匯款（換行）之勞務費用計算」「以該年度完工之案（換行）件數計算」「案件於驗收完後一小時才會顯示於此」。三個並列，程式一次只出現一個。
- 與程式不同：「訂單明細」提示在程式是單行，DS 泡泡無法限制在螢幕內，單行會超出左緣，所以手動換行。DS 泡泡不會自動貼齊邊界（程式左右各留 32），右側「年度接案數」泡泡距右緣約 14。
- Plugin API：泡泡超出元件範圍，要把外層 Card Slot 與 Card 的 `clipsContent` 關掉；泡泡被同層後面的元素（金額）蓋住，要把所在欄的 `itemReverseZIndex` 設 true；泡泡位置在 instance 裡不能改（x 不可覆寫）。

## 補充待寫規則

- DS `Tooltip` 展開用法（上面三點 Plugin API 做法）寫進 `figma-notes.md`。（已寫入 screen-types.md 與 figma-notes.md）
- 提示、氣泡這類暫時浮層，若會遮住內容，獨立成一格（使用者決定，3.1.2）。（使用者確認升為通則，已寫入 SKILL.md）

## 資訊圖示統一用 DS Tooltip（使用者修正，2026-10-07）

- 3.1.1、3.1.3、3.2.1 的三個資訊圖示（訂單明細、年度收入、年度接案數）一律用 DS `Tooltip`，Open=false（只顯示觸發圖示）；只有 3.1.2 是 Open=true。內部圖示 Question 換成 Phosphor Info（`Text/Link`）。之後有資訊圖示的畫面都照此做，不自己畫圖示。（已寫入 screen-types.md）

## 批次驗收（2026-10-07）

- 結構檢查：七個 Frame（3.1.1、3.1.2、3.1.3、3.2.1、3.3.1、3.3.2、3.3.3）全部通過，沒有缺漏、多餘或問題項目。
- 內容檢查：每格對照程式的文字與元素；沒畫的只有載入中的 Shimmer。實機的面板實際高度未驗證（依程式 25% 推算）。
- 使用者確認：Page 內所有畫面 OK（含 3.2.2 搬進 3.1 改為 3.1.3、資訊圖示統一用 DS Tooltip）。
- 待寫規則全部已寫入 Skill：底部可拖曳面板與資訊提示（`screen-types.md`）、遮住內容的暫時浮層獨立成格（`SKILL.md`）、`float` 圖層順序與其他 Plugin API 注意事項（`figma-notes.md`、`snippets.js`）。

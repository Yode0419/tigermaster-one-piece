# 設計探索索引

_功能規劃文件、設計決策紀錄與互動原型。先依狀態分區，區內再依功能分類。_

_Last updated: 2026-08-31_

---

## 狀態說明

狀態即資料夾，功能資料夾放在對應的狀態資料夾底下。

| 狀態 | 資料夾 | 意義 |
|---|---|---|
| 進行中 | `in-progress/` | 設計探索或開發還沒結束，或已上線但知識尚未整理進 wiki |
| 已完成 | `completed/` | 已開發上線，且關鍵知識已透過 `/robin` 整理進 `docs/wiki/`，資料夾內留有 `decision-summary.md` |
| 已擱置 | `on-hold/` | 暫停或決定不做，文件保留供日後參考 |

功能開發完成後，執行 `/robin` 完成知識同步，她會把功能資料夾搬進 `completed/` 並更新本索引。

---

## 進行中

### service-catalog-app-cta/ — 官網服務工項頁 App 導流

- **[官網服務工項頁新增 App 導流構想](in-progress/service-catalog-app-cta/service-catalog-app-cta-idea.md)** — 顧問來訪提出：服務工項頁展示約200個工項介紹與價格區間，但缺少導流下載App的CTA；已核對前端程式碼確認現況，並記錄桌機／手機情境需分別設計等待釐清事項，純初步構想尚未定案 _(2026-08-31)_

### renovation-highlight/ — 凸顯裝潢工程能力

- **[凸顯裝潢工程能力構想](in-progress/renovation-highlight/renovation-highlight-idea.md)** — 董事長口頭提出的初步構想：把既有的裝潢整修 L1 分類從分類清單裡提升為獨立入口／頁面，App 首頁新增裝潢入口（仍走原本叫修流程）、官網新增裝潢作品展示頁，純初步構想尚未定案 _(2026-08-27)_

### frame-size-standard/ — 跨功能基礎規則

- **[Design Frame 尺寸標準：375×812 升級至 393×852](in-progress/frame-size-standard/frame-size-standard.md)** — 決策記錄：新畫面標準改為 393×852（Dynamic Island 機型），既有 375×812 畫面不強制遷移；StatusBar／HomeIndicator 依尺寸群組分開定義，並回頭修正 AppBar／Sticky Footer／BottomNavBar／ChatInputBar 的留白邏輯 _(2026-07-17)_

### reconciliation/ — 對帳與撥款

- **[開發現況：部分同步紀錄](in-progress/reconciliation/development-status.md)** — 後台三區塊版面與撥款五步驟已上線並同步進 wiki；師傅分組視角、請款方式欄位、批次加入仍卡在後端 API，程式碼已寫但被註解，資料夾暫留 in-progress _(2026-08-17)_
- **[對帳作業優化：師傅視角與撥款操作改善](in-progress/reconciliation/reconciliation-optimization.md)** — 後台匯款資訊頁面的優化規劃，新增師傅維度視角、批次操作與 invoice_no 填入流程，並封鎖誤用的狀態直改路徑 _(2026-04-13)_
- **[師傅詳情頁新增「請款方式」欄位](in-progress/reconciliation/master-payout-method-field.md)** — 後台師傅詳情頁新增請款方式 Radio Group 的 UI 設計規格，含空值處理、檢視／編輯模式行為與元件選型決策 _(2026-04-13)_
- **[對帳與撥款作業優化：討論議程](in-progress/reconciliation/reconciliation-discussion-agenda.md)** — 與董事長、總經理討論對帳與撥款作業優化的議程，含現有功能說明與待釐清事項 _(2026-04-14)_
- **[對帳與撥款作業優化：主管討論結果與調整方向](in-progress/reconciliation/reconciliation-discussion-results.md)** — 確認決策、新增規格（週期切換、中間款項請領、師傅報稅欄位）與待釐清事項 _(2026-04-14)_
- **[撥款作業介面調整討論紀錄](in-progress/reconciliation/payout-interface-redesign.md)** — 撥款後台三區塊的文案、版面與互動行為詳細設計紀錄，含術語對照表 _(2026-04-14)_
- **[匯款清單後期優化：師傅分組視角](in-progress/reconciliation/payout-list-master-grouping.md)** — 匯款清單第三區塊加入師傅分組邏輯的功能規劃，含群組結構設計與介面結構方案比較 _(2026-05-26)_
- **[設計原型索引 — 撥款作業](in-progress/reconciliation/prototype/index.html)** — 撥款作業後台介面的互動原型（v1–v6），含各版本迭代與 confirm banner 變體 _(2026-04-27)_

---

## 已完成

### website-optimization/ — 官網內容優化

- **[官網首頁與關於我們頁內容改版 — 決策摘要](completed/website-optimization/decision-summary.md)** — 品牌宣言、商業模式差異化比較表、客戶評價、企業福委會等區塊的最終決策與版本選定理由；含企業福委會清單一則決策記錄誤植的釐清紀錄 _(2026-08-17)_
- **[官網首頁與關於我們頁內容優化](completed/website-optimization/homepage-about-optimization.md)** — 董事長指派的官網改版案，以 PPT 內容為骨架擴充既有首頁／關於我們頁文案，含問題定義、SEO 稽核與完整決策記錄 _(2026-07-17)_
- **[官網首頁改版策略手冊](completed/website-optimization/homepage-redesign-strategy-playbook.md)** — 借鏡外部方法論的流程參考手冊，本輪未實際套用，供未來改版流程參考 _(2026-07-17)_
- **[Vue2 遷移 Prompt](completed/website-optimization/vue2-migration-prompt.md)** — 工程交接用的實作 prompt _(2026-07-17)_
- **[改版前首頁文案現況](completed/website-optimization/current-homepage-content.md)** — 改版前首頁逐字文案整理 _(2026-07-17)_
- **[改版前關於我們頁文案現況](completed/website-optimization/current-about-content.md)** — 改版前關於我們頁逐字文案整理 _(2026-07-17)_
- **[專案背景說明](completed/website-optimization/project-background.md)** — 專案背景、範圍與探索性原型狀態說明
- **[董事長會議議程](completed/website-optimization/chairman-meeting-outline.md)** — 董事長會議議程，含待拍板事項清單
- **[董事長會議簡報逐字稿](completed/website-optimization/chairman-meeting-slides-script.md)** — 會議簡報逐字稿
- **[官網調整討論紀錄](completed/website-optimization/record/20260721_官網調整討論.txt)** — 2026-07-21 討論會議逐字紀錄
- **[設計原型：首頁正式版](completed/website-optimization/官網首頁與關於頁面設計/首頁正式版.dc.html)** — Claude Design + Fable5 探索性設計提案，含多版本區塊切換（`sc-if`）
- **[設計原型：首頁最終版](completed/website-optimization/prototype/home.html)** — 官網改版互動原型，含企業福委會清單來源說明註記

### order-flag/ — 訂單旗標

- **[訂單旗標：不支付給師傅車馬費 — 決策摘要](completed/order-flag/decision-summary.md)** — 為什麼旗標不做狀態動態 disabled、以車馬費收入記錄而非場勘/報價單為判斷依據、取消旗標固定恢復 $200 _(2026-08-17)_
- **[訂單旗標：不支付給師傅車馬費](completed/order-flag/no-pay-dispatch-fee.md)** — 補完開發到一半的旗標邏輯，含文案調整、權限控制、儲存觸發規則、車馬費產生時的旗標判斷與系統註記格式 _(2026-05-25)_

### tiger-points-and-terms/ — Tiger Points 與條款

- **[Tiger Points 折抵規則與支付頁優化、法律條款服務費揭露 — 決策摘要](completed/tiger-points-and-terms/decision-summary.md)** — 折抵判斷點改為「升級時訂單是否已報價」、支付頁拆兩頁解決可見度問題、法律條款補上服務費揭露段落 _(2026-08-17)_
- **[Pro 升級頁面：Tiger Points 折抵規則說明與邏輯修正](completed/tiger-points-and-terms/pro-tiger-points-rule-clarification.md)** — Pro 升級頁面新增折抵範圍說明的 UI 優化規劃，含後端邏輯修正方向、文案設計與官網 Q1／Q3 更新內容 _(2026-04-27)_
- **[法律條款補充平台服務費用說明](completed/tiger-points-and-terms/2026-04-27-service-fee-clause-amendment.md)** — 因客訴決定在法律條款第 6 條新增平台服務費用說明段落（6.3），含條號順移影響範圍 _(2026-04-27)_
- **[Tiger Points 說明頁文案補充與支付頁優化](completed/tiger-points-and-terms/tiger-points-payment-visibility-improvement.md)** — 支付流程拆為兩頁（已完成驗收 / 確認付款資訊），Tiger Points 折抵 card 置於 Page 2 頂部確保可見 _(2026-05-18)_

---

## 已擱置

_目前沒有已擱置的功能。_

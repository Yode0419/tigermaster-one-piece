# 設計探索索引

_功能規劃文件、設計決策紀錄與互動原型，依功能分類。_

_Last updated: 2026-07-17_

---

## website-optimization/ — 官網內容優化

- **[官網首頁與關於我們頁內容優化](website-optimization/homepage-about-optimization.md)** — 董事長指派的官網改版案，以 PPT 內容為骨架擴充既有首頁／關於我們頁文案，含商業模式差異化與企業福委會區塊的版本選定、品牌宣言待定案 _(2026-07-17)_

## frame-size-standard/ — 跨功能基礎規則

- **[Design Frame 尺寸標準：375×812 升級至 393×852](frame-size-standard/frame-size-standard.md)** — 決策記錄：新畫面標準改為 393×852（Dynamic Island 機型），既有 375×812 畫面不強制遷移；StatusBar／HomeIndicator 依尺寸群組分開定義，並回頭修正 AppBar／Sticky Footer／BottomNavBar／ChatInputBar 的留白邏輯 _(2026-07-17)_

## order-flag/ — 訂單旗標

- **[訂單旗標：不支付給師傅車馬費](order-flag/no-pay-dispatch-fee.md)** — 補完開發到一半的旗標邏輯，含文案調整、權限控制、儲存觸發規則、車馬費產生時的旗標判斷與系統註記格式 _(2026-05-25)_

## reconciliation/ — 對帳與撥款

- **[對帳作業優化：師傅視角與撥款操作改善](reconciliation/reconciliation-optimization.md)** — 後台匯款資訊頁面的優化規劃，新增師傅維度視角、批次操作與 invoice_no 填入流程，並封鎖誤用的狀態直改路徑 _(2026-04-13)_
- **[師傅詳情頁新增「請款方式」欄位](reconciliation/master-payout-method-field.md)** — 後台師傅詳情頁新增請款方式 Radio Group 的 UI 設計規格，含空值處理、檢視／編輯模式行為與元件選型決策 _(2026-04-13)_
- **[對帳與撥款作業優化：討論議程](reconciliation/reconciliation-discussion-agenda.md)** — 與董事長、總經理討論對帳與撥款作業優化的議程，含現有功能說明與待釐清事項 _(2026-04-14)_
- **[對帳與撥款作業優化：主管討論結果與調整方向](reconciliation/reconciliation-discussion-results.md)** — 確認決策、新增規格（週期切換、中間款項請領、師傅報稅欄位）與待釐清事項 _(2026-04-14)_
- **[撥款作業介面調整討論紀錄](reconciliation/payout-interface-redesign.md)** — 撥款後台三區塊的文案、版面與互動行為詳細設計紀錄，含術語對照表 _(2026-04-14)_
- **[匯款清單後期優化：師傅分組視角](reconciliation/payout-list-master-grouping.md)** — 匯款清單第三區塊加入師傅分組邏輯的功能規劃，含群組結構設計與介面結構方案比較 _(2026-05-26)_
- **[設計原型索引 — 撥款作業](reconciliation/prototype/index.html)** — 撥款作業後台介面的互動原型（v1–v6），含各版本迭代與 confirm banner 變體 _(2026-04-27)_

## tiger-points-and-terms/ — Tiger Points 與條款

- **[Pro 升級頁面：Tiger Points 折抵規則說明與邏輯修正](tiger-points-and-terms/pro-tiger-points-rule-clarification.md)** — Pro 升級頁面新增折抵範圍說明的 UI 優化規劃，含後端邏輯修正方向、文案設計與官網 Q1／Q3 更新內容 _(2026-04-27)_
- **[法律條款補充平台服務費用說明](tiger-points-and-terms/2026-04-27-service-fee-clause-amendment.md)** — 因客訴決定在法律條款第 6 條新增平台服務費用說明段落（6.3），含條號順移影響範圍 _(2026-04-27)_
- **[Tiger Points 說明頁文案補充與支付頁優化](tiger-points-and-terms/tiger-points-payment-visibility-improvement.md)** — 支付流程拆為兩頁（已完成驗收 / 確認付款資訊），Tiger Points 折抵 card 置於 Page 2 頂部確保可見 _(2026-05-18)_

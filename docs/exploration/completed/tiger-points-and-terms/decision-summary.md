# Tiger Points 折抵規則與支付頁優化、法律條款服務費揭露 — 決策摘要

_整理日期：2026-08-17 ｜ 產品知識文件：[Tiger Points](../../../wiki/product/tiger-points.md)、[Pro 會員（師虎 Pro）](../../../wiki/product/pro-membership.md)、[法律條款](../../../wiki/legal/legal-terms.md)、[Pro 會員服務條款](../../../wiki/legal/pro-membership-terms.md)、[常見問題原文](../../../wiki/operations/faq.md)_

## 最終做法

Tiger Points 折抵規則回歸「升級時訂單是否已報價」為判斷點：報價前升級可折抵當前訂單，報價後升級則從下一張訂單起生效。尾款支付頁拆為兩頁（Page 1 已完成驗收／Page 2 確認付款資訊），Tiger Points 折抵卡片固定於 Page 2 頂部，從根本解決客戶漏用點數而事後客訴補折抵的問題。同時，法律條款（第 6.3 條）與 Pro 會員服務條款（第 6.3、6.4 條）補上折抵規則與服務費用的明文揭露，回應客訴風險。

## 關鍵決策

| 決策 | 為什麼這樣決定 | 出處 |
|---|---|---|
| 折抵判斷點改為「升級時訂單是否已報價」，而非時間先後或訂單狀態 | 與平台「超前部署」行銷訴求對齊，同時保留訂單進行中可隨時升級的彈性 | [pro-tiger-points-rule-clarification.md](pro-tiger-points-rule-clarification.md) |
| 規則說明文案採正面敘述（先講適用範圍再講例外），Benefit Card 用灰色小字＋＊前綴，不用紅字 | 定位為補充說明而非警告，維持升級頁銷售氛圍 | [pro-tiger-points-rule-clarification.md](pro-tiger-points-rule-clarification.md) |
| 尾款支付頁拆成兩頁，Tiger Points 折抵卡片移到 Page 2 最頂部 | 單頁設計下折抵卡片可能落在 fold 以下被忽略；若加強置底列可見度又會讓折扣變成結帳主要重點，與品牌期待不符。拆頁後客戶進 Page 2 即看到，可見度問題從根本解決 | [tiger-points-payment-visibility-improvement.md](tiger-points-payment-visibility-improvement.md) |
| Tiger Points 說明 bottom sheet 新增第 4 條「付款後恕無法補折抵」，僅粗體不用紅字 | 屬規則說明而非警示，紅字語氣對無點數客戶干擾感強；粗體落在規則核心（後半句） | [tiger-points-payment-visibility-improvement.md](tiger-points-payment-visibility-improvement.md) |
| 法律條款第 6 條新增 6.3 平台服務費用段落（原 6.3 付款順移為 6.4） | 條款已列出「平台服務費用」為費用項目卻無對應說明段落，客訴指出揭露不足；補充段落對齊既有派遣費（6.1）／修繕費用（6.2）的結構 | [2026-04-27-service-fee-clause-amendment.md](2026-04-27-service-fee-clause-amendment.md) |

## 曾考慮但未採用

| 方案 | 為何放棄 |
|---|---|
| 升級後立即可折抵任何訂單（含已報價訂單） | 稀釋「提前升級」的行銷誘因，偏離原始政策意圖 |
| 進行中訂單一律不適用折抵（更嚴格版本） | 需調整現有邏輯，且犧牲訂單進行中隨時升級的彈性 |
| 置底列加入「TIGER POINTS 折抵｜可用 N 點 >」促銷式 CTA | 促銷感過強，與品牌期待不符 |
| 「點數折抵 $0」中性摘要列（單頁架構下的補償設計） | 本質上仍是單頁架構的妥協，未解決根本可見度問題 |
| 點擊摘要列後捲動頁面至輸入欄位並 auto focus | 同上，屬單頁補救方案的一環，未採用拆頁後即不需要 |
| 僅修改法律條款第 6 條開頭說明文字，不增設獨立段落 | 沒有獨立段落仍難以回應客訴指出的揭露不足問題 |
| 在報價單條款加強說明，取代法律條款修正 | 客訴指向的是法律條款本身，報價單屬補充條款，不足以替代 |

## 設計與實作的落差

無，依設計文件內容實作。

## 原始探索文件

- [Pro 升級頁面：Tiger Points 折抵規則說明與邏輯修正](pro-tiger-points-rule-clarification.md) — 折抵時機判斷邏輯修正、升級頁與 FAQ 文案、法律條款 6.3 條草稿
- [法律條款補充平台服務費用說明](2026-04-27-service-fee-clause-amendment.md) — 法律條款新增 6.3 平台服務費用段落的決策與理由
- [Tiger Points 說明文案補充與支付頁優化](tiger-points-payment-visibility-improvement.md) — 支付流程拆頁設計、bottom sheet 文案新增第 4 條

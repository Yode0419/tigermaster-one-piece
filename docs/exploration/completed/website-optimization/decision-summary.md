# 官網首頁與關於我們頁內容改版 — 決策摘要

_整理日期：2026-08-17 ｜ 產品知識文件：[官網內容架構](../../../wiki/product/website-content.md)_

## 最終做法

官網首頁新增品牌宣言、客戶真實評價、商業模式差異化（含比較表）、企業福委會特約廠商四個區塊；關於我們頁重寫為創辦人的話、我們相信、品牌故事、我們的願景、公司里程碑的敘事結構。目前無前端工程師承接，改由 yode 直接以 AI 輔助產出並部署，已正式上線定案。

## 關鍵決策

| 決策 | 為什麼這樣決定 | 出處 |
|---|---|---|
| 品牌宣言採用 `stmtSplit`（左文右圖），文案定稿為「找師傅，不該靠運氣。」 | 排版與官網既有風格較一致、資訊層級清楚；排除全幅照片版（視覺過於強烈）與淡藍宣言版（資訊量偏多） | [homepage-about-optimization.md](homepage-about-optimization.md) 決策 #13 |
| 商業模式差異化採用 `bizNumbers` 版本（大數字＋四張保障卡＋對照表） | 對照表是直接回應「理解服務模式差異」最直接的工具；排除無對照表的 `bizCard`、`bizJourney` | [homepage-about-optimization.md](homepage-about-optimization.md) 決策 #2 |
| 企業福委會採用既有 Google Form 連結，不做客製化嵌入表單 | 避免跟嵌入表單產生兩份資料來源，福委會窗口的成功標準是「被吸引報名」，表單精緻度非關鍵 | [homepage-about-optimization.md](homepage-about-optimization.md) 決策 #1 |
| 客戶案例改為「客戶評價／真實留言」區塊，靜態呈現＋自動跑馬燈 | 原客戶案例只是 WordPress 精選文章、缺乏實質內容；後台有大量真實客戶留言，董事長認為更有說服力；來源為 App/平台完工評價，人工精選高分且完整的內容 | [homepage-about-optimization.md](homepage-about-optimization.md) 決策 #8、#15 |
| 移除「合作夥伴」區塊，改由企業福委會區塊取代 | 原合作夥伴清單已過時（含非現況合作對象），與企業福委會功能重疊，維持兩個獨立區塊沒有必要 | [homepage-about-optimization.md](homepage-about-optimization.md) 決策 #10 |
| 里程碑三大指標數字同時放在首頁與關於我們頁，且用跳動增加（count-up）動畫 | 讓進站客戶第一時間感受到平台規模與活躍度，動畫比靜態數字更有活力感 | [homepage-about-optimization.md](homepage-about-optimization.md) 決策 #9 |
| 首頁／關於我們頁品牌宣言語氣不強制統一 | 首頁重差異化／信賴、關於我們頁重陪伴感，兩者可各自對應不同訴求 | [homepage-about-optimization.md](homepage-about-optimization.md) 決策 #3 |

## 曾考慮但未採用

| 方案 | 為何放棄 |
|---|---|
| 企業福委會用客製化嵌入表單收單（`welForm`） | 會分散資料來源，改用既有 Google Form |
| 品牌宣言全幅照片版（`stmtPhoto`）、淡藍宣言版（`stmtBlue`） | 前者視覺過於強烈跳脫既有風格，後者資訊量偏多不夠聚焦 |
| 商業模式差異化 `bizCard`（深藍主打卡）、`bizJourney`（5 步驟旅程） | 兩者皆無對照表，無法直接回應「理解服務模式差異」的需求 |
| 只留比較表、刪除五大優勢區塊 | 總經理認為兩者功能互補，多數消費者不會逐項細讀比較表，五大優勢仍有其角色，故保留 |
| 比較表文案刻意模糊化、不明講比較項目 | 清楚易懂更能達成「讓消費者理解差異」的目標，同時避免使用競品特定行銷用詞引發糾紛風險 |
| 維持現有「客戶案例」WordPress 部落格文章連結 | 內容缺乏實質性，真實評價的說服力更被業主看重 |

## 設計與實作的落差

1. **客戶評價區塊的技術實作方式**：探索文件決議「來源為 App/平台完工評價、人工精選、跑馬燈呈現」，實作上是把精選的 16 則評價文案寫死在前端資料檔（`homeReviews.ts`），並非即時串接後台評價系統——屬於決議方向內的合理實作方式，非落差。
2. **企業福委會清單的公司名稱**：`homepage-about-optimization.md` 決策記錄 #10 曾記載最終名單為「重樂、育達科大、中華電信福委會」，且遠傳電信「尚未確認授權暫不列入」；但這份記錄本身是先前流程中 AI 生成時產生的錯字/誤植，並非真正定案內容。**以 `Home.vue` 實際上線的名單為準**：統一證券、崇越科技、英濟科技、中華電信職工福委會、遠傳電信。`Home.vue` 中緊鄰名單的工程端註解（「清單依原型稿原樣保留...待人工確認後修正」）目前已由業主於 2026-08-17 確認上線名單本身正確無誤，註解本身已是過時警語。
3. **商業模式差異化比較表的維度數量**：決策記錄 #5 定案為四項比較（付款方式、交易安全、保固、媒合速度），實際上線為六個維度（另加施工問題處理、發票）——屬於實作階段的加碼延伸，維度方向與定案一致，未違背決策精神。

## 原始探索文件

- [homepage-about-optimization.md](homepage-about-optimization.md) — 主要規劃文件，含問題定義、設計方向、SEO 稽核與完整決策記錄（16 條）
- [homepage-redesign-strategy-playbook.md](homepage-redesign-strategy-playbook.md) — 借鏡外部方法論的流程參考手冊，本輪未實際套用，供未來改版流程參考
- [project-background.md](project-background.md) — 專案背景、範圍與探索性原型狀態說明
- [current-homepage-content.md](current-homepage-content.md) — 改版前首頁文案現況
- [current-about-content.md](current-about-content.md) — 改版前關於我們頁文案現況
- [chairman-meeting-outline.md](chairman-meeting-outline.md) — 董事長會議議程，含待拍板事項清單
- [chairman-meeting-slides-script.md](chairman-meeting-slides-script.md) — 會議簡報逐字稿
- [record/20260721_官網調整討論.txt](record/20260721_官網調整討論.txt) — 2026-07-21 討論會議逐字紀錄，含會議中臨時提出的新方向
- [vue2-migration-prompt.md](vue2-migration-prompt.md) — 工程交接用的 Vue2 遷移／實作 prompt

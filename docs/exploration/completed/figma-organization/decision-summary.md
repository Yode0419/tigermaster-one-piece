# Figma 檔案整理與 Design Ops 方法論 — 決策摘要

_整理日期：2026-09-03 ｜ 知識文件：[TigerMaster File Handbook](../../../design-ops/file-maintenance/figma-file-handbook.md)_

## 最終做法

建立獨立的 Figma 檔案「TigerMaster File Handbook」，統一師虎生態系所有 Figma 設計稿檔案的 Pages 架構、封面格式、文件格式、與檔案生命週期狀態標籤，並發佈成 Figma Library。同時建立 `docs/design-ops/` 作為知識庫的第四層，收錄「設計團隊自己怎麼運作」的規格文件（與 `docs/wiki/` 的產品知識、`docs/design-system/` 的 UI 元件規格區分開來）。設計流程、交付開發、AI 協作規範、影響力評估四個延伸主題目前都還沒有真實案例，等實際發生需要才建立對應內容，避免預先寫出用不到的文件。

## 關鍵決策

| 決策 | 為什麼這樣決定 | 出處 |
|---|---|---|
| 開一個新的頂層知識層 `docs/design-ops/`，跟 wiki／design-system 平行，不併入任一方 | wiki 範圍嚴格是產品本身，design-system 範圍嚴格是 UI 元件庫，「Figma 檔案怎麼組織」跟兩者都不是同一層次 | 對話討論 |
| Handbook 內容以獨立 Figma 檔案、5 個獨立 page 呈現（Overview／File Structure／Usage／File Status／Change Log），不套用原本「單一功能」用的 Overview template 固定欄位 | 那組欄位是設計給「一個功能」用的（目標用戶、PRD、設計範圍），不適合說明「Handbook 這個規範庫本身」；改用 Blank template，依「是什麼／內容有什麼／怎麼使用／更新紀錄」四個閱讀目標拆頁 | [handbook-overview-content.md](handbook-overview-content.md) |
| 檔案生命週期採五階段標籤（概念探索／設計進行中／可交付開發／已上線／已封存），定義為「這份檔案本身還有沒有在維護」而非「交付進度」 | 讓所有檔案類型都適用同一套規則，不用依「單一功能檔案」或「多畫面彙整檔案」區分情境判斷 | [figma-folder-architecture-decision.md](figma-folder-architecture-decision.md) |
| 交付開發標記不在 page 層級標記狀態、不用 emoji 前綴，直接用 Figma Dev Mode 原生的「Ready for dev」section 狀態 | Figma 本來就有原生機制可以做這件事，沒必要自己發明一套；page 名稱清單也不會被 emoji 弄亂 | [figma-folder-architecture-decision.md](figma-folder-architecture-decision.md) |
| design-ops 現階段只建立 file-maintenance/，其餘主題（設計流程、交付開發、AI 協作規範、影響力評估）只在 INDEX.md 留一句話說明，不預先建資料夾或寫內容 | 這幾個主題現在都沒有真實摩擦（沒有多人協作卡住、沒有交付漂移問題、沒有 AI 自主設計 skill 存在、沒有價值證明壓力）。DesignOps 的精神是解決真實摩擦，不是預先把架構搭滿；業界研究也顯示 DesignOps 分類方式本來就沒有統一標準 | 對話討論 |
| `/robin` 的知識寫入目的地（Phase 3）改為依內容性質判斷寫進 `docs/wiki/` 或 `docs/design-ops/`，decision-summary 範本的連結格式改為依實際目的地動態產生 | 因應 design-ops 這個新目的地，讓 robin 能同時處理產品功能與設計方法論兩種探索的蒸餾 | `.claude/skills/robin/SKILL.md` |

## 曾考慮但未採用

| 方案 | 為何放棄 |
|---|---|
| 把 design-ops 內容併入 `docs/design-system/` | design-system 範圍嚴格是 TigerMaster App 自己的 UI 元件庫，跟「Figma 檔案怎麼組織」是不同層次 |
| 把 design-ops 內容併入 `docs/wiki/` | wiki 範圍嚴格是修繕媒合平台本身，Figma 檔案治理規範不屬於這裡 |
| design-process、dev-handoff、ai-collaboration、影響力評估現在就建立資料夾佔位，或用 lessons.md 式的觀察日誌先累積內容 | 團隊規模、AI 介入程度都還沒有真實素材，先建空殼或日誌機制都容易變成用不到的結構；改用「先寫清楚 design-ops 存在目的與使用方式，等真實摩擦出現才建立各主題」的做法 |
| Handbook page 名稱前綴加 emoji 標記交付狀態，或替多畫面彙整型檔案另外設計一套 page 層級狀態標記規則 | Figma 原生 Dev Mode「Ready for dev」已可做這件事；emoji 會讓 page 名稱清單雜亂；分情境判斷增加不必要的複雜度 |
| Handbook 文件元件依 PPT／A4 開尺寸 variant | 統一用單一尺寸（直式、類似 A4 比例）簡化維護成本 |

## 設計與實作的落差

無。Handbook 內容已依此決策套入 Figma 檔案（[連結](https://www.figma.com/design/glmNjH2sb9rS81NCJeDdWA/TigerMaster-File-Handbook?node-id=273-1085)），`docs/design-ops/file-maintenance/figma-file-handbook.md` 為其蒸餾版本。

## 原始探索文件

- [Figma 檔案整理：現況與目標](figma-folder-architecture-decision.md) — 起頭文件，描述整理前的混亂現況、已定案的 Handbook 與五階段生命週期決策
- [Figma 現況快照（師虎生態系）](figma-current-state.md) — 整理前的完整資料夾樹狀結構記錄
- [研究提示詞：設計流程／交付開發／設計檔案維護／AI協作](research-prompt-design-process-ai-collab.md) — 待另開 session 執行的研究提示詞，設計流程／交付開發／AI 協作規範三個延伸主題的素材來源
- [TigerMaster File Handbook｜自我文件化內容草稿](handbook-overview-content.md) — Handbook 五個 Documentation page 的定案文字內容
- [建置提示詞：TigerMaster File Handbook（Figma Library）](build-prompt-file-handbook.md) — 拿去給 Figma agent 執行的建置提示詞，實際建置後有兩處調整已與此文件不同步，保留作為建置過程紀錄

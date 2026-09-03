# TigerMaster File Handbook

Figma 設計檔案的統一規範：Pages 架構、封面、文件格式、生命週期狀態標籤。

_Figma 來源：[TigerMaster File Handbook](https://www.figma.com/design/glmNjH2sb9rS81NCJeDdWA/TigerMaster-File-Handbook?node-id=273-1085) ｜ Library，存放於 Design System 資料夾_

_此文件內容以 Figma 為載體撰寫（現階段唯一使用的設計工具）。分區、狀態管理、命名邏輯等核心原則預期可延續到其他工具，但 Cover 頁、Annotation Kit 等 Figma 專屬機制若換工具需要重寫。_

---

## 用途

TigerMaster File Handbook 是師虎生態系所有 Figma 設計稿檔案共同遵循的規範庫，統一檔案的 Pages 架構、封面、與文件格式。目的是讓任何人都能快速掌握檔案狀態與內容，檔案數量增加時仍能有效管理，也有利於團隊未來擴大。

## Pages 架構

新檔案的標準 Pages 順序：

| Page | 內容 |
|---|---|
| Cover | 使用 Thumbnail 元件呈現封面，套用狀態標籤 |
| Documentation | Overview／Change Log 等說明文件 |
| （彈性設計頁） | 依專案需求命名的正式設計稿頁面，頁數不固定，不套模板 |
| Archive | 已淘汰或封存的舊版設計 |

交付開發不在 page 層級標記狀態，也不用 emoji 前綴，直接使用 Figma Dev Mode 原生的「Ready for dev」section 狀態，標在對應設計稿的 frame／section 上。

## 元件

| 元件 | 用途 | 使用方式 |
|---|---|---|
| Thumbnail | 統一封面縮圖，不用點開檔案就能看出檔名、簡述、日期、目前狀態 | 用在 Cover page，instance 引用 |
| Document | 記錄檔案的背景脈絡與版本歷史，讓不熟悉這個檔案的人也能快速上手 | 用在 Documentation page，提供 Blank／Overview／Change Log 三種 template，複製後編輯內文 |
| Annotation Kit | 在設計稿上標註規格與說明 | 視需求使用，僅供參考、非強制規定 |

## File Status（檔案生命週期）

| 狀態 | 定義 |
|---|---|
| 💡 概念探索 | 預設起始狀態，發散找方向、還沒收斂（含個人草稿／探索用檔案） |
| ✏️ 設計進行中 | 方向收斂，開始產出正式設計稿 |
| `<>` 可交付開發 | 設計稿定案，已加上標註元件，可以讓開發看 |
| 🚀 已上線 | 功能上線到 production；規範庫類檔案代表目前是團隊採用中的現行版本 |
| 🗄 已封存 | 功能被取代／廢棄，或內容已併入其他檔案，不再需要維護 |

**流程**：主檔案線（🚀 已上線，持續代表現行版本，直到被新版取代才改為 🗄 已封存）與功能開發線（💡 概念探索 → ✏️ 設計進行中 → `<>` 可交付開發）並行；功能開發線完成後，內容併入主檔案線，功能檔案本身狀態改為 🗄 已封存。

**例外**：FigJam／workshop 討論檔案（非正式設計交付物）不套用狀態標籤。

## Change Log 慣例

Documentation page 內以「日期＋作者＋說明」逐筆記錄版本更新，取代散落在檔名或備註裡的版本資訊。

_Last updated: 2026-09-03_

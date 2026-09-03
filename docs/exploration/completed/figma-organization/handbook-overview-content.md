# TigerMaster File Handbook｜自我文件化內容草稿

用途：這是要放進 Handbook 自己的 Documentation page 的實際文字內容草稿，內容待確認後再請 Figma agent 套入。

**跟前一版的差異**：不再套用 Overview template 的固定欄位（專案資訊／相關連結／需求背景／設計範圍／設計備註）。那組欄位是設計給「一個功能」用的（有目標用戶、PRD、設計範圍等），不適合用來說明「Handbook 這個規範庫本身」。改用 **Blank template**（標題＋副標題＋自由內文），並依「讓閱讀的人知道 Handbook 是什麼、內容有什麼、怎麼使用、更新紀錄」這四個目標，拆成 **5 份獨立文件**，各自放在獨立的 Figma page（canvas 分頁籤），而不是同一 page 內的多個 frame：

| 頁面（標題） | 對應目標 |
|---|---|
| 文件一：Overview | 是什麼＋內容有什麼（合併） |
| 文件二：File Structure | 怎麼使用（1）：Pages 架構，先講整體骨架 |
| 文件三：Usage | 怎麼使用（2）：架構底下 Thumbnail／Document／Annotation Kit 三種元件的用法 |
| 文件四：File Status | 內容有什麼的細節延伸（獨立保留，因內容較細） |
| 文件五：Change Log | 更新紀錄 |

簡介與內容總覽合併為一份（Overview），拆成「用途」「內容」兩個小標籤各一句話（副標題也改成「用途與內容」，跟其他頁副標題的名詞風格一致），不用表格列出（曾經試過改成對應後面四份文件的目錄式表格，但跟各頁自己的副標題幾乎逐字重複，拿掉了）；也拿掉了原本描述「現況問題」（檔名亂、封面不一致）的句子，直接講 Handbook 包含什麼即可。「怎麼使用」拆成兩頁，敘事順序先講 Pages 架構（整體骨架），再講架構底下的 Thumbnail、Document、Annotation Kit 三種元件（細節），由大到小比較好懂；Usage 頁每個元件先講清楚用途（為什麼需要它、解決什麼問題），使用方式一句話帶過即可（元件本身設計得很簡單，抓過去改字即可），Annotation Kit 額外註明僅供參考、非強制規定。各頁**標題**改用英文（Figma 內既有元件多為英文命名，跟這裡的標題對齊），**副標題**維持中文說明。

**命名對照**：Cover 是 page 名稱，裡面放的元件叫 Thumbnail；Documentation 也是 page 名稱，裡面用的元件叫 Document。文件內容統一依此區分：講「page」時用 Cover／Documentation，講「元件」時用 Thumbnail／Document，避免混淆。

（5 份頁面實際的 Figma page 命名／分組方式，交給後續套版時再依 Handbook 既有 Pages 架構範例決定，例如統一掛在 Documentation 分類下。）

拿掉「相關連結」段落。

---

## 文件一：Overview

**Header**：師虎來了 tag・TigerMaster File Handbook・2026-09-03 更新
**標題**：Overview
**副標題**：用途與內容

**內文**：

**用途**
TigerMaster File Handbook 是師虎生態系所有 Figma 設計稿檔案共同遵循的規範庫，統一檔案的 pages 架構、封面、與文件格式。目的是讓任何人都能快速掌握檔案狀態與內容，檔案數量增加時仍能有效管理，也有利於團隊未來擴大。

**內容**
- 架構：建議的 Pages 架構
- 元件：封面範本、文件格式、標註
- 狀態：檔案生命週期狀態標籤

---

## 文件二：File Structure

**Header**：師虎來了 tag・TigerMaster File Handbook・2026-09-03 更新
**標題**：File Structure
**副標題**：新檔案的 Pages 架構

**內文**：
〔套版時放 Pages 面板截圖＋標註，示意標準順序：Cover → Documentation →（彈性設計頁，依專案命名，例如 Page 1／Page 2／Page 3）→ Archive〕

| Page | 內容 |
|---|---|
| Cover | 使用 Thumbnail 元件呈現封面，套用狀態標籤 |
| Documentation | Overview／Change Log 等說明文件 |
| （彈性設計頁） | 依專案需求命名的正式設計稿頁面 |
| Archive | 已淘汰或封存的舊版設計 |

---

## 文件三：Usage

**Header**：師虎來了 tag・TigerMaster File Handbook・2026-09-03 更新
**標題**：Usage
**副標題**：Thumbnail、Document、Annotation Kit 三種元件的用途

**內文**：

**Thumbnail**
統一封面縮圖，讓人不用點開檔案就能看出檔名、簡述、日期、目前狀態，用在 Cover page。

**Document**
記錄檔案的背景脈絡與版本歷史，讓不熟悉這個檔案的人也能快速上手，用在 Documentation page（本 Handbook 自己就是用這個元件記錄自己）。元件提供基本的 Overview／Change Log／Blank template，內文視需求調整。

**Annotation Kit**
在設計稿上標註規格與說明的基本元件，視需求使用。

---

## 文件四：File Status

**Header**：師虎來了 tag・TigerMaster File Handbook・2026-09-03 更新
**標題**：File Status
**副標題**：五階段生命週期標籤的定義與適用範圍

**內文**：

**定義**

| 狀態 | 定義 |
|---|---|
| 💡 概念探索 | 預設起始狀態，發散找方向、還沒收斂（含個人草稿／探索用檔案） |
| ✏️ 設計進行中 | 方向收斂，開始產出正式設計稿 |
| `<>` 可交付開發 | 設計稿定案，已加上標註元件，可以讓開發看 |
| 🚀 已上線 | 功能上線到 production；規範庫類檔案代表目前是團隊採用中的現行版本 |
| 🗄 已封存 | 功能被取代／廢棄，或內容已併入其他檔案，不再需要維護 |

**流程**
〔套版時畫成兩條並排的線＋兩線之間的關係，不要用單一條 1→5 的直線〕：
- 主檔案線：🚀 已上線，持續代表現行版本，直到被新版取代才改為 🗄 已封存
- 功能開發線：💡 概念探索 → ✏️ 設計進行中 → `<>` 可交付開發
- 兩線關係：功能開發線完成後，內容併入主檔案線，功能檔案本身狀態改為 🗄 已封存

**例外**
- 不套用狀態標籤：FigJam／workshop 討論檔案（非正式設計交付物）

---

## 文件五：Change Log（沿用既有 template，內容不變）

**Header**：師虎來了 tag・TigerMaster File Handbook・2026-09-03 更新
**標題**：Change Log
**副標題**：版本更新紀錄

| Type | 日期 | 作者 | 說明 |
|---|---|---|---|
| NEW | 2026-09-03 | @yode | 建立 File Handbook 初版：Thumbnail、Document、Annotation Kit、Documentation 頁面、Pages 架構範例 |

---

## 背景

此內容整理自 [figma-folder-architecture-decision.md](figma-folder-architecture-decision.md) 全部討論結果，是 Handbook「自我文件化」（用 Handbook 自己的 Document 元件記錄自己）的實際文案。前一版套用 Overview template 固定欄位被指出不適用（那是給功能用的欄位）；這一版依「是什麼／內容有什麼／怎麼使用／更新紀錄」四個閱讀目標，改用 Blank template 拆成 5 份獨立文件（Overview、File Structure、Usage、File Status、Change Log），各自獨立成一個 Figma page，標題改用英文，並拿掉相關連結段落。Overview 的「內容有什麼」最後定案為一句話概述（見上方說明），沒有用表格。

「怎麼使用」拆成兩頁、由大到小敘事：File Structure 頁講 Pages 架構，Usage 頁講 Thumbnail／Document／Annotation Kit 三種元件的用途。File Status 頁調整順序為「定義表格 → 流程 → 例外」（先講清楚每個狀態是什麼，再講流程與例外），「觸發時機」欄位改名「定義」；「流程」原本寫成單一條 1→5 的文字箭頭加密文字段落，被指出並不存在真正單向跑完五階段的「主線」，改成套版時畫成「主檔案線」（🚀 已上線，持續到被取代才封存）與「功能開發線」（💡→✏️→`<>`）兩條並排的線，並交代兩者關係（功能開發線完成後併入主檔案線，功能檔案本身改標 🗄 已封存）；「例外」原本混在一句話裡，拆成「不套用標籤」與「可跳過階段」兩種不同性質分開列。「已上線」標籤討論過幾個替代詞（生效中／上線中／使用中／現行）都不夠直觀，維持原詞。

# Figma 檔案整理：現況與目標

**日期：** 2026-09-02（初版 2026-09-01）
**狀態：** 起頭文件，描述現況與目標；已定案兩項決策（File Handbook、檔案生命週期五階段），其餘方法論仍待研究 design ops 成熟做法後再決定。

---

## 這份文件是什麼

這是 Figma 檔案整理這件事的起點記錄，只描述「現在在哪裡」跟「想去哪裡」，不包含具體的分類規則或執行方法——那些要等研究完 design ops 的成熟做法後才決定（見 [research-prompt-design-process-ai-collab.md](research-prompt-design-process-ai-collab.md)）。

## 現況

Figma 工作區「師虎生態系」原本有 10 個頂層資料夾，混用多種分類邏輯（依產品介面、依進度、依素材類型），新檔案該歸哪裡常無法直接判斷。

目前已完成第一輪初步整理：確認並清掉了確定沒在使用的舊 team 與檔案，把原本混雜的資料夾粗略依產品介面重新分類。這只是務實的第一步整理，不是正式方法論下的結果。

目前的完整資料夾現況見 [figma-current-state.md](figma-current-state.md)。

## 已決定事項

### TigerMaster File Handbook（Figma 檔案）

會建立一份獨立的 Figma 檔案，稱為 **TigerMaster File Handbook**，存放在 Design System 資料夾內，並發佈成 Figma **Library**。Library 裡兩種東西的使用方式不同：小型可重複元件（狀態標籤、標註元件、Info Row、Change Entry 等）用 instance 方式引用，改樣式各檔案一次同步；而 Document 底下的三個 template（Blank／Overview／Change Log）是**拿範本去複製後編輯**——因為每份文件的實際內容都不同，複製整頁比硬做 instance 更符合實際使用方式，內部的子元件（頁首、row 等）仍然是 instance，只是內容文字要自己填。內容規劃為以下幾個 pages：

- **封面（Thumbnail）範本**：每個設計稿檔案套用的統一封面格式，包含檔名（File Name）、簡述、日期，以及生命週期狀態標籤（見下方「檔案生命週期」）
- **Overview**：合併原本規劃的 File Info（負責設計師、目前狀態、相關連結：PRD／Jira／對應知識庫頁面／開發分支、關聯的其他 Figma 檔案）與 Feature Brief（功能簡介／需求簡介）成一份文件，用途是讓不熟悉這份檔案的人（新加入的人、開發、AI）不只知道「這是什麼、誰負責」，也能看懂這個功能要解決什麼問題
- **Changelog**：版本更新紀錄頁，逐筆記錄「日期＋改了什麼＋為什麼改」，取代目前散落在檔名或備註裡的版本資訊（例如現況快照中常見的「Ver1.0.1」「交付稿2024/10」這類命名方式）
- **標註元件**：設計稿內部用來標註（annotation）的元件庫
- **Pages 架構範例**：檔案內部 pages 該如何拆分／命名的範例

> Overview 與 Changelog 兩個 page 是延伸建議（非原始構想的封面／標註元件／pages 架構範例三項），用意是解決現況快照中版本資訊分散、檔案負責人不明確、功能背景說明缺失的問題，實際欄位與格式仍待建立 Handbook 檔案時定案。

#### 元件 vs. 頁面範本

Handbook 裡的內容分兩種性質，決定要不要做成可發佈的 Library 元件：

**文件格式元件（Document component）**

核心是一個統一的「文件」元件，概念上類似 Word 文件的頁首——固定的頁首結構（例如：文件標題、所屬檔案、更新日期），搭配一個可替換的內文區。Overview 跟 Changelog 不是各自獨立的頁面範本，而是套用同一個文件元件、只是內文區內容不同的兩種使用範例；未來要加其他文件類型（例如 TOC、待辦清單）也是同一個元件的另一種內文區組合，不用重新設計版面。實際使用時是複製 Overview／Change Log 這個 template 頁面去編輯內容，而不是對整頁做 instance（見上方使用方式說明）。

原本考慮另外開尺寸 variant（PPT／A4），後來決定不特別區分，統一用單一尺寸（實際建置為直式、類似 A4 比例），簡化維護成本。

**適合做成元件（發佈到 Library，各檔案用 instance 引用）**

| 元件 | 說明 |
|---|---|
| 文件格式元件（Document） | 統一頁首＋可替換內文區的文件框架，Overview、Changelog 都是套用它的範例；單一尺寸，不分 PPT／A4；template 頁面本身用複製編輯，不是 instance |
| 標註元件 | 尺寸線、箭頭、spec 標籤、redline 標記等，各自做 variant |
| 檔案生命週期狀態標籤 | 就是封面上的 `_File-status`，5 個狀態做成 variant |
| Changelog 條目 row | 「日期＋描述＋標籤」組成一個 row 元件，放進文件元件的內文區裡重複使用 |
| 相關連結 row | 「icon＋連結文字」小型 row 元件，放進 Overview 版本的內文區裡 |
| 目錄（TOC）項目 row | 「page 名稱＋跳轉連結」row 元件，放進 TOC 版本的內文區裡 |

**不是元件，是頁面範本／使用慣例**

| 項目 | 原因 |
|---|---|
| 封面整體版面 | 每個檔案內容不同（檔名、日期、簡述），本質是範本而非文件元件的一種；版面內會用到狀態標籤元件 |
| Pages 架構範例 | 純粹是命名／排序慣例，不是視覺元件，詳見下方「Pages 架構範例」段落 |
| 自訂 Frame Thumbnail | Figma 內建功能（右鍵設定重要 frame 當縮圖），不是元件 |

> 參考：Figma Community 已有現成套件可能值得直接參考或 fork，而非從零做——[Annotation Kit 3.0](https://www.figma.com/community/file/806626024182535168/annotation-kit-3-0)（標註元件）、[Design Annotations & File Template Setup 2.0](https://www.figma.com/community/file/1119570359580533212/design-annotations-file-template-setup-2-0)（封面＋標註＋pages 架構三合一，內容與此規劃高度重疊，建議實作前先打開看一次）。

### 檔案生命週期（五階段）

Figma 檔案的生命週期採用五個階段標記，對應到封面上的 `_File-status` 標籤元件：

| 階段 | 標籤文字 | 對應顏色 |
|---|---|---|
| 💡 概念探索 | exploration | 黃色 |
| ✏️ 設計進行中 | in progress | 藍色 |
| `<>` 可交付開發 | ready for dev | 綠色 |
| 🚀 已上線 | live | 粉紅色 |
| 🗄 已封存 | archived | 灰色 |

### Pages 架構範例

檔案內部 pages 只有一套規則，所有檔案類型通用，不分「單一功能檔案」或「多畫面彙整檔案」：

**固定頭尾**

1. 📄 Cover — 封面
2. 📋 Documentation — Overview ＋ Changelog
3. （中間彈性區，見下）
4. 🗄 Archive — 固定當垃圾桶，放被取代／棄用的內容

**中間彈性區**：依實際功能／畫面命名，頁數不固定，不套模板、不強制拆成「探索／設計／交付」幾個 page。

**交付開發標記**：不在 page 層級標記狀態，也不用 emoji 前綴——直接使用 Figma Dev Mode 原生的 section「Ready for dev」狀態，標在對應設計稿的 frame／section 上，開發在 Dev Mode 直接看得到。

> 曾考慮但捨棄的做法：一開始想過在 page 名稱前面加 emoji 標記狀態（例如 🚢 可交付開發），或是替「多畫面彙整型」檔案（例如 APP_師傅這種每個畫面各自獨立上線的檔案）另外設計一套 page 層級狀態標記規則。後來捨棄，原因：(1) Figma 本來就有原生的 Dev Mode「Ready for dev」可以做這件事，沒必要自己發明一套；(2) page 名稱清單會被一堆 emoji 弄得雜亂；(3) 把封面的五階段標籤定義成「這份檔案本身還有沒有在維護」而非「交付進度」，這樣所有檔案類型都適用同一套規則，不用區分情境判斷。

## 目標

整理 Figma 檔案，最終希望達成：

1. 從理解公司知識庫（`docs/wiki/`）內容出發，有系統地組織 Figma 檔案，而不是憑感覺分類
2. 清晰的資料夾結構，即便完全不熟悉的人也能輕鬆找到檔案
3. 釐清該用功能／產品線分類、還是用設計或開發進度分類——或兩者如何搭配
4. 能夠持續擴展的架構，未來新產品線、新設計師加入都不用整套打掉重練
5. 檔案架構能跟知識庫維持同步，不論是用 skill 還是其他方式

## 尚待研究決定的部分

具體方法論待研究後再定，包含但不限於：

- 資料夾分類的主軸與層級設計
- Overview／Changelog 兩個 page 的具體欄位與格式
- 五階段生命週期標籤該如何回溯套用到現有檔案、由誰／何時更新
- 設計交付開發時如何避免設計稿與實際上線內容漂移
- 檔案架構與知識庫的同步機制
- AI 在這整套流程裡能實際扮演什麼角色

## 待釐清事項（TBD）

- [ ] design ops 研究尚未進行（提示詞已備妥，待另開 session 執行）
- [ ] 「舊資料」「其他」「師虎商城/未分類」內部的實際整理／分類尚未執行
- [ ] 部分檔案的進度狀態尚未標記
- [x] TigerMaster File Handbook 檔案已在 Figma 建立元件（[連結](https://www.figma.com/design/glmNjH2sb9rS81NCJeDdWA/TigerMaster-File-Handbook?node-id=273-1085)，2026-09-02）——已有 `_File-status` 五狀態標籤、Thumbnail、Document（Header＋Blank／Overview／Change Log 三種 template＋Section Title／Info Row／Divider／Change Entry 子元件，單一尺寸不分 PPT／A4）、Annotation Kit（Light／Dark 兩色調，含 Marker／Note／Leader／Interaction／Change Tag）
- [ ] 既有檔案尚未套用新封面／狀態標籤（回溯套用範圍與順序待定）

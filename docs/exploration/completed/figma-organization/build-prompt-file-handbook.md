# 建置提示詞：TigerMaster File Handbook（Figma Library）

用途：這是一份要拿給 Figma agent 執行的建置提示詞，不是決策文件本身。所有需求皆已在
[figma-folder-architecture-decision.md](figma-folder-architecture-decision.md) 討論定案，
此提示詞是把那份文件裡「已決定事項」整理成可直接執行的建置指令。

**狀態（2026-09-02）：** 已執行，元件已在 Figma 建好（[連結](https://www.figma.com/design/glmNjH2sb9rS81NCJeDdWA/TigerMaster-File-Handbook?node-id=273-1085)）。實際建置後又有兩處調整，與本提示詞內容已不同步——以 [figma-folder-architecture-decision.md](figma-folder-architecture-decision.md) 為準，此檔案保留作為建置過程紀錄：
1. 文件元件不分 PPT／A4 尺寸，統一單一尺寸（原本「Size variant：PPT 尺寸／A4 尺寸」的敘述已作廢）
2. 原本規劃的 File Info 與 Feature Brief（功能簡介）合併成一份 **Overview**，Document 底下的三個 template 實際上是拿去複製編輯，不是對整頁做 instance
3. Pages 架構範例（下方原提示詞裡「🏗️ 進行中／💭 探索／🚢 可交付」那套 emoji 前綴慣例）已捨棄，改成「固定頭尾（Cover→Documentation…Archive）＋中間彈性區，不分頁層級標記，交付開發改用 Figma Dev Mode 原生的 section「Ready for dev」」，詳見決策文件

使用方式：請連同先前討論時提供的封面／狀態標籤草稿示意圖一併附給 Figma agent，
讓它有視覺參考可以比對風格。

---

```
我要在 Figma「師虎生態系」工作區的 Design System 資料夾內，建立一份新檔案，
命名為「TigerMaster File Handbook」，並發佈為 Library（元件可被其他檔案以
instance 方式引用，而不是複製貼上）。

這份檔案的用途：作為公司內所有 Figma 設計稿檔案共同遵循的規範範本，讓不同檔案的
封面、文件頁、標註方式維持一致，且未來新檔案能直接套用而不用重新設計。

請依照以下規劃建立 pages 與元件：

## Pages

1. Cover（封面範本）
2. File Info（套用文件元件的範例）
3. Changelog（套用文件元件的範例）
4. Annotation Kit（標註元件）
5. Page Architecture Example（Pages 架構範例）
6. Components（元件總覽，存放下面所有可發佈元件的 master component）

## 需要建立的元件（發佈到 Library）

### 1. 檔案生命週期狀態標籤 `_File-status`
5 個 variant，對應以下文字與顏色（沿用先前提供的草稿示意圖樣式：圓角 pill 形狀、
淺色底、對應色系深色字＋icon）：
- 💡 概念探索 exploration → 黃色
- ✏️ 設計進行中 in progress → 藍色
- <> 可交付開發 ready for dev → 綠色
- 🚀 已上線 live → 粉紅色
- 🗄 已封存 archived → 灰色

### 2. 文件格式元件 Document
一個統一的「文件」元件，概念類似 Word 文件的頁首：
- 固定頁首區：文件標題、所屬檔案名稱、更新日期
- 可替換的內文區（body），用來放不同文件類型的內容——File Info 版本放「相關連結
  row」、Changelog 版本放「Changelog 條目 row」，未來還可能加 TOC 版本
- Size variant：PPT 尺寸（適合簡報／投影）／A4 尺寸（適合列印或直式閱讀，例如
  給客戶／廠商看的文件）；兩種尺寸共用頁首與內文排版邏輯，只有外框比例不同
- 頁首與內文區都用 auto-layout，方便之後內容增減時自動撐開

### 3. Changelog 條目 row
「日期＋改動描述＋標籤（可選）」橫向排列的 row 元件，放進 Document 元件的
Changelog 版本內文區，可重複使用、直向堆疊多筆。

### 4. 相關連結 row
「icon＋連結文字」的 row 元件，放進 Document 元件的 File Info 版本內文區的相關
連結清單；icon 建議用 instance swap，支援 PRD／Jira／知識庫／開發分支等不同
連結類型。

### 5. 目錄（TOC）項目 row
「page 名稱＋跳轉連結」的 row 元件，預留給未來 TOC 版本的 Document 使用。

### 6. 標註元件 Annotation Kit
尺寸線（dimension line）、箭頭（arrow）、spec 標籤（spec label）、redline 標記
等交付開發常用的標註元件，各自建立必要的 variant（例如方向、顏色）。可先參考
Figma Community 的 Annotation Kit 3.0
（https://www.figma.com/community/file/806626024182535168/annotation-kit-3-0）
作為起點，再調整成符合我們風格。

## 封面（Cover）頁面範本（非元件，是複製整頁套用的範本）
版面請比照先前提供的草稿示意圖：
- 左側是縮圖卡片：卡片內置左放一個品牌色塊 tag（例如「師虎來了」）、置右放
  `_File-status` 元件 instance；卡片下半部放大標題「File Name」、下方一行簡述
  文字、最下方日期
- 右側可額外做一個 `_File-status` 五個狀態的展示區塊（方便設計師複製需要的狀態）

## Pages 架構範例（非元件，是命名／排序慣例）
建立一個範例 page 清單，示範一般設計稿檔案內 pages 該怎麼命名與排序（可搭配
emoji 前綴標示進度，例如 🏗️ 進行中／💭 探索／🚢 可交付，實際命名慣例可依五階段
生命週期對照調整）。

## 風格要求
- 沿用 TigerMaster Design System（Design System 資料夾內既有 Library）已定義的
  顏色、字體、圓角等 tokens，不要另外發明一套新樣式
- 元件都要用 auto-layout，並綁定既有的 design token variables（如果有的話），
  不要使用寫死的顏色數值

## 尚未定案、你可以先給合理預設值，完成後列出讓我確認
- PPT／A4 的實際尺寸數值（例如 PPT 是否用 16:9 標準投影尺寸、A4 是否含出血）
- File Info／Changelog 內文區的具體欄位（例如 File Info 要放哪幾個相關連結類型）
- 標註元件實際要包含哪些種類與 variant

完成後請列出：建立了哪些 pages、哪些元件（含各自的 variant 數量），以及上面
「尚未定案」項目你實際採用的預設值，方便我逐一確認調整。
```

---

## 背景

此提示詞整理自 [figma-folder-architecture-decision.md](figma-folder-architecture-decision.md)
「已決定事項」段落的討論結果——TigerMaster File Handbook 的定位、文件格式元件
（Document component，含 PPT／A4 尺寸 variant）、檔案生命週期五階段標籤、以及
哪些內容適合做成元件 vs. 只是頁面範本的區分。討論中的封面／狀態標籤草稿示意圖
是以圖片形式提供，未存成檔案，執行此提示詞時建議一併附上。

# 畫面類型做法

每種畫面類型的元件組合與關鍵設定。元件 Key 見 `docs/exploration/in-progress/figma-ssot/stage3/reference.md`，程式片段見 `../scripts/snippets.js`。

**這份清單沒有的畫面類型**：先畫那一格、停下來給使用者確認，定案後依文末格式補一節，再繼續畫。

---

## 三區 Auto Layout（所有畫面的基本結構）

對應 Flutter 的 `Scaffold`（appBar／body／bottomNavigationBar），用 `threeZone()` 建立。

| 圖層 | 設定 |
|---|---|
| Frame | 垂直 Auto Layout，固定 393×852，間距與 padding 為 0，背景綁 token |
| 1. 固定頂部 | AppBar 或 ChatAppBar instance，寬度 Fill |
| 2. `Content` | 寬高都 Fill，裁切內容，原型捲動方向垂直；裡面放實際內容（寬度 Fill） |
| 3. 固定底部 | BottomNavBar、ChatInputBar 或底部按鈕，寬度 Fill；沒有就省略。BottomNavBar 高 82，中央 Logo 圓圈會往上蓋到 `Content`，所以固定底部要排在 `Content` 之後（圖層在上方） |
| 浮層 | Dialog、BottomSheet、遮罩用 `float()` 設為絕對定位，排在最上層。遮罩用 `scrim()`，蓋滿整個 Frame（含狀態列）、約束 Stretch；BottomSheet 寬 393、貼底，約束左右 Stretch、垂直 Bottom；Dialog 置中，約束水平、垂直都 Center |

- 內容比畫面長時，只畫第一屏看得到的部分，超出的部分由 `Content` 裁切，Frame 不加高。
- **浮層畫面的底圖**：沿用打開浮層前的那一格（例如從 1.2.2 點「傳送照片」打開，底圖複製 1.2.2）。
- **沒有 AppBar、頂部跟著內容捲動的頁面**：頂部一樣放在固定頂部區，用 DS 對應的 AppBar variant；捲動行為只在批次紀錄用文字說明。放進 `Content` 會讓 AppBar 內嵌的狀態列一起捲走，與 App 不符。
- **靠左／靠右的項目**：Auto Layout 不能單獨指定某個子項目的對齊，每個項目包一層寬度 Fill 的水平 Auto Layout（無底色），再設主軸對齊。

---

## 一般資料頁

列表、卡片、按鈕組成的頁面（例如帳號頁）。第一個案例：管理員 2.1.1。

- `Content` 左右與上方 padding `Spacing/16`（DS 規定的頁面邊距，程式是其他值也照 DS）。
- 內容依程式分成區段（例如「幫助」「其他」），每個區段是一個 `box()`（區段標題＋內容，間距 `Spacing/8`），區段之間 `Spacing/16`。
- 區段標題 `Heading/4`。
- 設定入口：Card（Layout=Inset、Padding=None）包 ListItem（ListItem 自帶左右與上下 16，Card 不加內距）。
- 全寬按鈕：Button lg、寬度 Fill。Outlined 已自帶白底。

**帳號頁頁首**：AppBar（Tall／None／Brand），關閉 Has Leading、Has Action；刪掉 `Title` Slot 裡的 `Title Text`，放 `Profile`（水平、間距 `Spacing/16`、垂直置中）：Avatar 75＋姓名 `Title/L`／Email `Body/XS`（單行截斷）。

---

## 聊天室

第一個案例：管理員 1.2.1。

- 背景用 ChatBackground instance，`float()` 放在最底層、約束 Stretch。
- 頂部 ChatAppBar（依角色選 variant），底部 ChatInputBar。
- `Content` 主軸對齊設為頂部：訊息少時貼在上方；訊息超出畫面時，進入聊天室會停在最底部，所以只畫最新的一屏，從頂部排起、最後一則貼近輸入列。
- `Content` 左右 padding `Spacing/16`、訊息間距 `Spacing/8`、上方 padding `Spacing/8`。
- 每則訊息包一層寬度 Fill 的水平 Auto Layout：對方的訊息靠左、自己的訊息靠右、日期分隔置中。
- 同一聊天室的不同狀態（例如展開輸入列），複製上一格的子圖層，只換有變化的部分。

---

## 動作選單（程式的 CupertinoActionSheet）

第一個案例：管理員 1.2.3。

- BottomSheet：hasHeader=false、Footer=Inline、開啟 hasDragHandle。內容短的 BottomSheet 一律用 Inline，不要用 Sticky 再手動固定高度。
- 選項：ListItem（Trailing=None、關閉前方圖示、最後一列關閉分隔線），直接放進 `Content` Slot、寬度 Fill；Slot 間距改為 0。
- 「取消」用按鈕區的 Button，Style 改為 Ghost Neutral，接在選項下方，不做成選項之一。
- 有標題的選項清單：hasHeader=true，關閉左右圖示。
- 遮罩：`scrim()`。
- **只有一個動作的確認**（例如「重送訊息？」＋確認／取消）不是選項清單，改用 Dialog（見下節）。

---

## Dialog

第一個案例：管理員 1.2.5、1.3.3、2.2.1、2.3.1。

- 單句是非題用 Type=Standard，置中，加 `scrim()`。
- 標題直接改 `Title` 文字（不是元件屬性）；沒有內文時隱藏 `Content` Slot。
- `Actions` 兩顆 Button 預設為 Ghost Neutral（次要，左）與 Ghost Action（主要，右），只改 Label。破壞性確認（例如登出）右側換成 Ghost Danger：內部按鈕不能刪掉再插入，用 `swapComponent` 換 variant。
- 程式沒有標題、只有內文（Material `AlertDialog` 只給 content）：隱藏 `Title`，打開 `Content` Slot（刪掉 `Slot Rectangle`）放文字，`Body/M`＋`Text/Secondary`、寬度 Fill。
- 只有一顆按鈕：隱藏左側次要按鈕，保留右側主要按鈕。
- Flutter 內建對話框（`showAboutDialog` 等）的文字在 SDK，查法見 SKILL.md「來源」。

---

## 全螢幕照片（程式的 `DetailImage`、`SendImageConfirm`）

第一個案例：管理員 1.2.4、1.2.6。

- 用 DS 的 `PhotoViewer`，Frame 只放一個寬高 Fill 的 instance。
- 看照片且程式有下載網址時開 Has Download；傳送前確認開 Has Send。
- 黑底是 `Base/Black`（元件已內建）。

---

## 通話畫面（程式的 `IOSCallerControlPage`）

第一個案例：管理員 1.3.1、1.3.2。

- 用 DS 的 `VoiceCallScreen`（State=Calling／OnCall），Frame 只放一個寬高 Fill 的 instance，改 Name 與 Duration。

---

## 圖示

- **換圖示**：建立 icon 元件（Icon=Phosphor）的 instance（預設是 Smiley），用 `search_design_system` 限定 Phosphor 圖示庫（libraryKey 見 reference.md）以圖示名稱搜尋，拿元件組 Key，再用 `swapIcon()`（一律 Format=Outline，Weight 依程式：一般 Regular、實心 Fill）。需要白色時傳 `Icon/Inverse`。新查到的圖示 Key 補進 reference.md。
- **缺圖示**：Phosphor 搜尋不到時保留 Smiley，圖層名稱寫上要換成的圖示，並記入 components.md 的 DS 待辦。
- **只有圖示、沒有文字的 FAB**：用 FAB Type=Slot，刪掉 `Slot Rectangle` 放圖示，手動設 x、y 置中（Slot 沒有 Auto Layout）。

---

## 新增畫面類型的格式

```
## <畫面類型>（程式的 `<Widget>`，如有）

第一個案例：<角色> <Frame 編號>。

- 用哪些元件、哪個 variant
- 關鍵設定（間距、對齊、要隱藏或打開的圖層）
- 與程式不同之處的處理原則
```

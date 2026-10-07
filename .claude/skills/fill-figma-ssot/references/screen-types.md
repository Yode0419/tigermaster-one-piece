# 畫面類型做法：通則與索引

本檔是每個畫面都適用的通則，開場整份讀。各畫面類型的做法在 `types/`，**畫到該類型時才讀那一份**（同一個對話讀過就不必重讀）。元件 Key 見 `docs/exploration/in-progress/figma-ssot/stage3/reference.md`，程式片段見 `../scripts/snippets.js`。

**索引沒有的畫面類型**：先畫那一格、停下來給使用者確認，定案後（對話結束時）依文末格式補進最接近的 `types/` 檔案，並在下表加一列。

| 畫面類型 | 檔案 | 第一個案例 |
|---|---|---|
| 一般資料頁（帳號頁、設定入口） | `types/pages.md` | 管理員 2.1.1 |
| 分頁列表頁（頂部分頁＋卡片列表＋空狀態） | `types/pages.md` | 師傅 2.1.1 |
| 通知列表 | `types/pages.md` | 師傅 6.1.1 |
| 沒有 AppBar 的全頁（結果頁、評價表單） | `types/pages.md` | 師傅 2.8.1 |
| 底部可拖曳面板（`SlidingUpPanel`） | `types/pages.md` | 師傅 3.1.1 |
| 系統畫面邊界（推播橫幅等系統畫面） | `types/pages.md` | 師傅 6.1.4 |
| 啟動畫面（黃底 Logo、底部訊息列） | `types/pages.md` | 客戶端 1.1.1 |
| 首次介紹頁（插圖、標題、說明、分頁圓點） | `types/pages.md` | 客戶端 1.2.1 |
| 訂單詳情頁（AppBar 疊資訊卡、訂單階段內容） | `types/order-and-forms.md` | 師傅 2.2.1 |
| 唯讀資料頁（價格與保固、客戶資訊） | `types/order-and-forms.md` | 師傅 2.2.2 |
| 報價總覽頁（分類卡＋底部金額列） | `types/order-and-forms.md` | 師傅 2.4.2 |
| 表單編輯頁（卡片內多個欄位） | `types/order-and-forms.md` | 師傅 2.4.4 |
| 上傳照片表單（4 欄照片格） | `types/order-and-forms.md` | 師傅 2.3.1 |
| 證照／大張照片上傳頁 | `types/order-and-forms.md` | 師傅 4.3.1 |
| 動作選單、選項清單、長內容 BottomSheet | `types/bottom-sheets.md` | 管理員 1.2.3 |
| 底部兩顆按鈕的選擇器 BottomSheet | `types/bottom-sheets.md` | 師傅 2.4.5 |
| 相機與簽名 BottomSheet | `types/bottom-sheets.md` | 師傅 2.7.3 |
| 日期時間選擇 BottomSheet | `types/bottom-sheets.md` | 師傅 5.1.7 |
| 聊天室 | `types/chat.md` | 管理員 1.2.1 |
| 約施工時間訊息 | `types/chat.md` | 師傅 5.1.8 |
| 全螢幕照片（`PhotoViewer`） | `types/chat.md` | 管理員 1.2.4 |
| 通話畫面（`VoiceCallScreen`） | `types/chat.md` | 管理員 1.3.1 |
| Dialog、提示 Dialog、資訊提示（Tooltip） | 本檔 | 管理員 1.2.5 |

---

## 三區 Auto Layout（所有畫面的基本結構）

對應 Flutter 的 `Scaffold`（appBar／body／bottomNavigationBar），用 `threeZone()` 建立。

| 圖層 | 設定 |
|---|---|
| Frame | 垂直 Auto Layout，固定 393×852，間距與 padding 為 0，背景綁 token，堆疊順序 First on top（`itemReverseZIndex = true`，使用者指定） |
| 1. 固定頂部 | AppBar 或 ChatAppBar instance，寬度 Fill |
| 2. `Content` | 寬高都 Fill，裁切內容，原型捲動方向垂直；裡面只放一層 `Scroll Content`（垂直 Auto Layout，寬度 Fill、**高度 Hug**），**所有 padding 與實際內容都放在 `Scroll Content`，`Content` 自己不設 padding**。原因：固定大小的 Auto Layout 框在內容超出時，自己的底部 padding 不算進可捲動範圍，捲到底內容會被底部列遮住；padding 放在 Hug 高度的內層，捲動範圍才包含它。`Scroll Content` 底部一定要留 padding：預設 `Spacing/16`；有浮動 BottomNavBar 時是 134（導覽列 82＋中央 Logo 凸出導覽列上緣的 36＋16，Logo 凸出的部分不在導覽列的 82 範圍內，只算 82 會被 Logo 遮住，使用者指出）。左右、上方 padding 與項目間距也設在 `Scroll Content`，不要把底部設得比這小或設成 0 |
| 3. 固定底部 | BottomNavBar、ChatInputBar 或底部按鈕，寬度 Fill。**沒有任何固定底部列時，底部固定放 DS `HomeIndicator`**（Style=Dark，深色底用 Light，寬度 Fill，排在自動排列最後；ChatInputBar、BottomNavBar、按鈕區 Bar 本身已含 HomeIndicator，不必再放；浮層畫面的底圖也要有，使用者指出漏放）。**BottomNavBar 例外**（使用者決定）：高 82，中央 Logo 圓圈會往上蓋到 `Content`，所以 BottomNavBar 不放在自動排列裡，改成浮層：絕對定位、約束水平 Stretch、垂直 Bottom、`y = Frame 高度 - 82`，排在 `AppBar` 之前（第一層浮層之下、`Scrim` 與 Dialog 之下），同時 `Scroll Content` 底部 padding 設 134（導覽列 82＋Logo 凸出的 36＋16），讓內容不被導覽列與 Logo 蓋住、捲到底也留有空間。其他固定底部（ChatInputBar、底部按鈕區）沒有凸起，維持在自動排列最後 |
| 浮層 | Dialog、BottomSheet、遮罩用 `float()` 設為絕對定位，因為 First on top，要放在最前面（Dialog 第一、`Scrim` 第二）才會在最上層。遮罩用 `scrim()`，蓋滿整個 Frame（含狀態列）、約束 Stretch；BottomSheet 寬 393、貼底，約束左右 Stretch、垂直 Bottom；Dialog 置中，約束水平、垂直都 Center |

- 圖層順序（First on top，由上到下）：Dialog、`Scrim`、BottomNavBar（如有）、`AppBar`、`Content`、其他固定底部。
- **以內容為主的長頁面才拉長，其他一律 852**。以內容為主指頁面本身就是在讀或填一大段資訊且會捲動（案件詳情、訂單詳情、表單、說明頁、可能超過一屏的帳號頁）；首頁、列表、空狀態、聊天室、浮層畫面都不算。拉長的做法：Frame 寬 393、高度固定（`primaryAxisSizingMode=FIXED`）；`Content` 高度維持 **Fill**（與一般畫面相同），Frame 高度手動設成剛好容納整頁內容：`Frame 高度 = 頂部高度 + Scroll Content 高度 + 底部高度（含 HomeIndicator 的 34）+ 2`（Frame 外框的 1px 描邊算進排版，上下各 1，不加 2 的話 `Content` 會比 `Scroll Content` 少 2，捲動範圍被截），至少 852，之後驗證 `Content` 高度 ≥ `Scroll Content` 高度。這樣固定底部永遠貼在 Frame 最底，整頁內容完整可見。第一個案例：師傅 1.2.1（1140）。
- **聊天室**維持只畫進入時看到的最後一屏，`Content` 高度 Fill 並裁切（見 `types/chat.md`）。
- **浮層畫面**（Dialog、BottomSheet）不是主要展示頁，不跟著底圖拉長：Frame 固定高度 852、`Content` 高度 Fill 並裁切，底圖內容被裁掉沒關係；`Scrim` 蓋滿整個 Frame；Dialog 置中（`y = (852 - Dialog 高度) / 2`）。底圖是拉長的內容頁（例如 1.2.1）時，也只顯示第一屏。
- 重建或複製 Frame 後若背景綁定 `Background/Page` 卻顯示成黑色，是存下來的顏色值是黑的（師傅 2.4.3）：把一個正常 Frame 的 `fills` 複製過來，或用 `setBoundVariableForPaint` 重新綁一次。
- **浮層畫面的底圖**：沿用打開浮層前的那一格（例如從 1.2.2 點「傳送照片」打開，底圖複製 1.2.2）。
- **沒有 AppBar、頂部跟著內容捲動的頁面**：頂部一樣放在固定頂部區，用 DS 對應的 AppBar variant；捲動行為只在批次紀錄用文字說明。放進 `Content` 會讓 AppBar 內嵌的狀態列一起捲走，與 App 不符。
- **靠左／靠右的項目**：Auto Layout 不能單獨指定某個子項目的對齊，每個項目包一層寬度 Fill 的水平 Auto Layout（無底色），再設主軸對齊。

---

## 卡片與資料列（通則）

第一個案例：師傅 2.1.1、2.1.3。

- **卡片外框一律用 DS `Card`**（Layout=Inset、Padding=Standard，才有正確陰影與圓角），不自己畫底色圓角；內容放進 Card 的 `Slot`（先刪掉 `Slot Rectangle`），內距照 DS（16），程式是其他值也照 DS。
- 卡片內容若重複出現要做本機元件：**只做內容，不含 Card 外框**（Figma 不允許在元件裡把 Card 內部的文字連到屬性），使用時 Card 的 Slot 放內容元件；內容元件的文字都做成 TEXT 屬性。
- 「標籤＋數值」的資料列：列用水平 Auto Layout、主軸 SPACE_BETWEEN，**數值靠右端對齊**；很長的值（地址）設 Fill、靠右、單行截斷。列與列之間用 1px `Border/Default` 分隔線，間距 `Spacing/8`。
- 卡片上的狀態文字照程式的狀態色（紅、綠），綁最接近的 `Status/*` token。
- **整寬白底帶**（程式用沒有左右 margin、沒有圓角的 `Container`，例如訂單頁的金額與工期區塊、查看報價資訊區塊、報價分類列、報價明細卡）：Card 用 Layout=Fill 並填滿螢幕寬；有邊距的 `Card` 才用 Inset（使用者修正，師傅 2.4.4、2.4.8、2.4.9、2.5.1、2.5.3）。同一頁混用時，`Scroll Content` 左右 padding 設 0，Inset 卡片或按鈕各包一層左右 `Spacing/16` 的容器。判斷方法：看程式有沒有 `Card(margin: …)` 或外層 `Padding`，沒有就是整寬。
- **同一組內容在三個以上畫面重複**（例如訂單資訊卡）：做成本機元件，不要每格複製貼上（使用者提議，`OrderBasicInfo`）。
- **同一個 Page 內重複的共用 Dialog**（照片上傳失敗、刪除照片確認）：只畫最早出現的位置，其他畫面在結構表去向引用；不同 Page 因為是獨立畫面頁，各自有一份（使用者決定，師傅 2.3.2、2.3.3，2.6.3 引用）。

## Dialog

第一個案例：管理員 1.2.5、1.3.3、2.2.1、2.3.1。

- 單句是非題用 Type=Standard，置中，加 `scrim()`。
- 標題直接改 `Title` 文字（不是元件屬性）；沒有內文時隱藏 `Content` Slot。
- `Actions` 兩顆 Button 預設為 Ghost Neutral（次要，左）與 Ghost Action（主要，右），只改 Label。破壞性確認（例如登出）右側換成 Ghost Danger：內部按鈕不能刪掉再插入，用 `swapComponent` 換 variant。
- 程式沒有標題、只有內文（Material `AlertDialog` 只給 content）：隱藏 `Title`，打開 `Content` Slot（刪掉 `Slot Rectangle`）放文字，`Body/M`＋`Text/Secondary`、寬度 Fill。
- 只有一顆按鈕：隱藏左側次要按鈕，保留右側主要按鈕。
- Flutter 內建對話框（`showAboutDialog` 等）的文字在 SDK，查法見 SKILL.md「Sources for screen content」。

## 提示 Dialog（只有標題與一顆按鈕）

第一個案例：師傅 2.7.2、2.7.6、2.7.9（程式 `PlatformAlertDialog(title, 知道了)`）。

- 複製已畫好的 Dialog（例如 2.4.12）與它的 `Scrim`：改 `Title` 文字，內文槽維持隱藏，左側按鈕隱藏，右側 Label 改「知道了」；Dialog 置中，`y = (852 − 高) / 2`。底圖沿用打開前那一格。
- 疊在 BottomSheet 上的 Dialog（師傅 2.7.4、2.7.5、2.7.8）：底圖保留 BottomSheet 與它的遮罩，再疊第二層遮罩與 Dialog，圖層順序為 Dialog、`Scrim`、BottomSheet、`Scrim`、`AppBar`…。程式文字照抄，包含半形逗號與英文（例如「無效的QrCode,請重新掃描」）。

## 資訊提示（程式的 `InfoTooltip`、`TapTooltip`）

第一個案例：師傅 3.1.1、3.1.2。

- 畫面上所有資訊圖示一律用 DS `Tooltip`（Key 見 reference.md），內部圖示預設是 Question，換成 Phosphor Info（Outline／Regular）並綁 `Text/Link`；不要自己畫圖示。
- 一般畫面用 Open=false（只有觸發圖示）；提示會遮住內容，所以另開一格展示（Open=true，使用者決定，師傅 3.1.2）。同一格可把該畫面所有提示並列（程式一次只出現一個，批次紀錄註明）。展示格從主畫面複製，把圖示換成 Open=true 的 Tooltip，Message 填程式文字（程式的 `\n` 照留）。
- 泡泡是 instance 內超出範圍的子層，位置無法覆寫：要把外層 Card 與 Slot 的 `clipsContent` 關掉；泡泡所在欄的 `itemReverseZIndex = true`，同一排（含中央垂直分隔線）也要，否則會被後面的元素與分隔線蓋住；泡泡超出螢幕邊緣時，只能用 Message 手動換行縮窄（DS 泡泡不會自動貼齊邊界，程式左右各留 32）。

## 圖示

- **換圖示**：建立 icon 元件（Icon=Phosphor）的 instance（預設是 Smiley），用 `search_design_system` 限定 Phosphor 圖示庫（libraryKey 見 reference.md）以圖示名稱搜尋，拿元件組 Key，再用 `swapIcon()`（一律 Format=Outline，Weight 依程式：一般 Regular、實心 Fill）。需要白色時傳 `Icon/Inverse`。新查到的圖示 Key 補進 reference.md。
- **程式用自家彩色圖片（`assets/images/icons/colored_*.png`、`camera.png` 等）的圖示**（使用者決定，師傅 4.1.1、4.2.1）：換成 Phosphor 對應圖示，Weight 用 Duotone，淡色那層（`opacity` 0.2 的 Vector）改綁 `Brand/TigerYellow` 並把 opacity 設 1（不透明），深色線條維持原本綁定的圖示色。帶底色的圓形小圖示（頭像右下的相機）自排：藍色圓（`Brand/TigerBlue`，24）加白色 Phosphor Fill 圖示（16）。
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

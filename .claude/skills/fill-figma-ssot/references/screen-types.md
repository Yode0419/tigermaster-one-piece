# 畫面類型做法

每種畫面類型的元件組合與關鍵設定。元件 Key 見 `docs/exploration/in-progress/figma-ssot/stage3/reference.md`，程式片段見 `../scripts/snippets.js`。

**這份清單沒有的畫面類型**：先畫那一格、停下來給使用者確認，定案後依文末格式補一節，再繼續畫。

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
- **聊天室**維持只畫進入時看到的最後一屏，`Content` 高度 Fill 並裁切（見聊天室一節）。
- **浮層畫面**（Dialog、BottomSheet）不是主要展示頁，不跟著底圖拉長：Frame 固定高度 852、`Content` 高度 Fill 並裁切，底圖內容被裁掉沒關係；`Scrim` 蓋滿整個 Frame；Dialog 置中（`y = (852 - Dialog 高度) / 2`）。底圖是拉長的內容頁（例如 1.2.1）時，也只顯示第一屏。
- 重建或複製 Frame 後若背景綁定 `Background/Page` 卻顯示成黑色，是存下來的顏色值是黑的（師傅 2.4.3）：把一個正常 Frame 的 `fills` 複製過來，或用 `setBoundVariableForPaint` 重新綁一次。
- **浮層畫面的底圖**：沿用打開浮層前的那一格（例如從 1.2.2 點「傳送照片」打開，底圖複製 1.2.2）。
- **沒有 AppBar、頂部跟著內容捲動的頁面**：頂部一樣放在固定頂部區，用 DS 對應的 AppBar variant；捲動行為只在批次紀錄用文字說明。放進 `Content` 會讓 AppBar 內嵌的狀態列一起捲走，與 App 不符。
- **靠左／靠右的項目**：Auto Layout 不能單獨指定某個子項目的對齊，每個項目包一層寬度 Fill 的水平 Auto Layout（無底色），再設主軸對齊。

---

## 一般資料頁

列表、卡片、按鈕組成的頁面（例如帳號頁）。第一個案例：管理員 2.1.1。

- `Scroll Content` 左右與上方 padding `Spacing/16`（DS 規定的頁面邊距，程式是其他值也照 DS），底部 padding 見三區結構。
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
- `Scroll Content` 主軸對齊設為頂部：訊息少時貼在上方；訊息超出畫面時，進入聊天室會停在最底部，所以只畫最新的一屏，從頂部排起、最後一則貼近輸入列。
- `Scroll Content` 左右 padding `Spacing/16`、訊息間距 `Spacing/8`、上方 padding `Spacing/8`（底部 padding 見三區結構）。
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
- **長內容、需要捲動的 BottomSheet**（使用者決定）：原本那一格畫第一屏，也就是使用者打開時看到的畫面（Frame 852，BottomSheet 用元件的最大高度，內容超出的部分裁切）；再在它**右邊旁邊加一格完整的長畫面**，採用 BottomSheet 外殼，內容完整顯示：Frame 拉長，底圖與遮罩照第一格，BottomSheet 往上長到內容完整、貼在底部。額外這一格命名為「<原本編號> <原本名稱>（完整內容）」，不編新號碼、不算在結構表的 Frame 數，結構檢查要略過名稱以「（完整內容）」結尾的 Frame。批次紀錄用一句話說明哪一格有加。
- **只有一個動作的確認**（例如「重送訊息？」＋確認／取消）不是選項清單，改用 Dialog（見下節）。
- **沒有標題、沒有取消的選項清單**（師傅 2.2.3 選擇導航 App）：hasHeader=false、Footer=Inline、關閉 hasFooter、開 hasDragHandle，選項用 ListItem。選項的圖示若沒有素材（例如地圖 App 的 logo），使用者決定先不放：關閉 ListItem 的 Has Leading Icon，不留 Smiley 佔位。

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

## 卡片與資料列（通則）

第一個案例：師傅 2.1.1、2.1.3。

- **卡片外框一律用 DS `Card`**（Layout=Inset、Padding=Standard，才有正確陰影與圓角），不自己畫底色圓角；內容放進 Card 的 `Slot`（先刪掉 `Slot Rectangle`），內距照 DS（16），程式是其他值也照 DS。
- 卡片內容若重複出現要做本機元件：**只做內容，不含 Card 外框**（Figma 不允許在元件裡把 Card 內部的文字連到屬性），使用時 Card 的 Slot 放內容元件；內容元件的文字都做成 TEXT 屬性。
- 「標籤＋數值」的資料列：列用水平 Auto Layout、主軸 SPACE_BETWEEN，**數值靠右端對齊**；很長的值（地址）設 Fill、靠右、單行截斷。列與列之間用 1px `Border/Default` 分隔線，間距 `Spacing/8`。
- 卡片上的狀態文字照程式的狀態色（紅、綠），綁最接近的 `Status/*` token。
- **整寬白底帶**（程式用沒有左右 margin、沒有圓角的 `Container`，例如訂單頁的金額與工期區塊、查看報價資訊區塊、報價分類列、報價明細卡）：Card 用 Layout=Fill 並填滿螢幕寬；有邊距的 `Card` 才用 Inset（使用者修正，師傅 2.4.4、2.4.8、2.4.9、2.5.1、2.5.3）。同一頁混用時，`Scroll Content` 左右 padding 設 0，Inset 卡片或按鈕各包一層左右 `Spacing/16` 的容器。判斷方法：看程式有沒有 `Card(margin: …)` 或外層 `Padding`，沒有就是整寬。
- **同一組內容在三個以上畫面重複**（例如訂單資訊卡）：做成本機元件，不要每格複製貼上（使用者提議，`OrderBasicInfo`）。
- **同一個 Page 內重複的共用 Dialog**（照片上傳失敗、刪除照片確認）：只畫最早出現的位置，其他畫面在結構表去向引用；不同 Page 因為是獨立畫面頁，各自有一份（使用者決定，師傅 2.3.2、2.3.3，2.6.3 引用）。

---

## 分頁列表頁

第一個案例：師傅 2.1.1 至 2.1.4（程式 `MasterOrderListPage`，頂部是 `TwoTabPreferredSizeTabBar`）。

- AppBar（Standard／Slot／Brand），關閉 Has Leading、Has Action，標題照程式；頂部的兩個分頁用 DS `SegmentedControl`（Segments=2，Selected 依分頁）放進 `Extension Content`，並設寬度 Fill；刪掉 `Extension Content` 裡殘留的 `Slot Rectangle`。
- 浮動 BottomNavBar（Role=Master）選中對應分頁：對 Tab instance 設 `Toggle`（原本選中的關、目標的開）。
- 列表是卡片（見上節），`Scroll Content` 左右與上方 `Spacing/16`、卡片間距 `Spacing/8`。**示意資料要涵蓋該列表查詢條件下會出現的各種狀態**，例如保固中清單包含保固中、登記保固中、訂單結束、訂單終止（程式的查詢是狀態範圍，不只一種），不要只畫一種。
- 空狀態：`EmptyState`（Size=Compact，關說明、開按鈕）放進 `Scroll Content`，寬度 Fill；插圖沒有向量時留 Slot 的粉紅佔位並改名「插圖佔位（待補）」。

---

## 訂單詳情頁（AppBar 疊一張資訊卡）

第一個案例：師傅 2.2.1、2.3.1（程式 `MasterOrderDetail`＋`StackSliverAppBar`）。

- AppBar（Standard／Overlay／Brand），開啟 Has Leading；有動作鍵時開 Has Action，放 `IconLabelButton`（例如「聯繫客服」，圖示 Phosphor）。資訊卡用 DS `Card`（Inset／Standard）放進 `Extension Content`，寬度 Fill，並刪掉殘留的 `Slot Rectangle`。
- `Scroll Content` 上方 padding ＝ 卡片高 − 延伸列高（32）＋ 8 到 16，讓下方內容接在卡片之後。卡片下方的階段內容（報價、施工、驗收…）屬各自的 Section，這一格只畫共用資訊區時下方留灰底。
- 標題用程式 `titleParser` 對該訂單狀態的輸出。
- 未讀標記用 DS `Badge`（Count），絕對定位疊在目標右上角；要凸出 Card 的 Slot 時，把那個 instance 的 Slot `clipsContent` 關掉。該訂單沒有未讀就不放。
- 同一訂單的不同 Frame（2.2.1、2.3.1）頂部從已畫好的那格 `clone()` 再改字，不重建。資訊卡內容用本機元件 `OrderBasicInfo`（改 Category、Date、Customer Name、Address、Has Unread，巢狀按鈕的 Label 與未讀數字在巢狀 instance 上改）。
- **訂單階段內容**（卡片下方，依訂單狀態映射，師傅端 `master_order_detail_bloc.dart`）：金額與工期摘要（`OrderQuoteTimeSummary`，放 Card Fill／Standard）加該階段的內容：等待提交報價（狀態 30、35，2.4.1）是「請點選下方按鍵以進行報價」加 Button Secondary Filled md pill「開始報價」；等待客戶確認（40、45、50，2.5.1）是 ListItem「查看報價資訊」加等待說明加「先看其他案件」；施工中（55、58，2.6.1）是「查看報價資訊」、「新增一筆報價」pill、完工提醒文字、Button Primary Filled lg「上傳施工照片並驗收」；有未同意報價時兩顆按鈕改 State=disabled，文字「有未同意報價」（2.6.2）。按下「上傳施工照片並驗收」後同一個區塊換成上傳表單（2.6.3）。
- **畫階段內容的畫面前，先對照程式的狀態映射（bloc 的 `checkOrderStatus`）列出每個階段會看到的畫面，再核對結構表有沒有漏格**（13c 因為這樣查出漏了 2.4.1 上傳報價單與 2.6.1 施工進行中）；漏了就停下來回報使用者，由使用者決定編號。

---

## 唯讀資料頁（價格與保固、客戶資訊、問題描述）

第一個案例：師傅 2.2.2（結構與 1.2.1 相同）。

- 頂部 AppBar（Standard／Overlay／Brand）加 `OrderCategoryCard`；`Scroll Content` 上方 padding 48、左右 `Spacing/16`、區段間距 `Spacing/16`；每個區段是「`Title/M` 標題＋DS Card」。
- 直接從已畫好的同類畫面（例如 1.2.1）`clone()` 頂部與各區段，只改字。跨 Page 複製：在來源 Page 複製、切到目標 Page 後 `appendChild`；本機元件的 instance 要先把主元件複製進目標 Page 的「本機元件」再 `swapComponent`。
- 以內容為主，是長頁面，高度見三區結構。

---

## 上傳照片表單

第一個案例：師傅 2.3.1（程式 `MasterOrderUploadImageSection`、`GridImageView`）。

- 區段標題 `Heading/4`、提示文字 `Body/M`＋`Text/Hint`、DS Card 放照片格，格子用 DS `PhotoUpload`（已上傳 State=uploaded，新增格 State=default）。
- 程式固定 4 欄、格子填滿一列：一列 4 格，間距固定 `Spacing/4`，每格縮小到 (一列寬 − 3×4)／4 填滿（約 78.75），不要用兩端對齊撐滿（間距會被拉得很大）。超過 4 格換行，最多 10 張。
- 送出鍵 Button Primary Filled lg、寬度 Fill；沒有選照片時程式是半透明的 `DISABLE_STYLE`，兩種輸入狀態合併一格時畫已選照片的狀態。處理中文字不另建格。

---

## 報價總覽頁（頂部分頁＋多張分類卡＋底部金額列）

第一個案例：師傅 2.4.2、2.4.7（程式 `StandardQuotationOverviewSection`、`SimpleQuotationOverviewSection`）。

- 頂部 AppBar（Standard／Slot／Brand）加 `SegmentedControl`，做法同分頁列表頁；浮層畫面的底圖沿用打開前那一格。
- 每個分類是一張 DS `Card`（Inset／None）放本機元件 `QuotationCategoryRow`（標題＋小字說明＋小計＋箭頭或加號），列高 64（上下 8＋右側點擊區 48，程式用 Material 2 的 `IconButton`，最小 48）。展開的分類在列下方加 1px 分隔線與 Button Secondary Outlined md pill（例如「新增一筆工種工程」）。不要改用 `ListItem`：ListItem 只有單行標題，放不下小字說明。
- 底部用 DS `Sticky Footer`（Button + Slot），Slot 放本機元件 `QuotationAmountBar`（兩個 DS `Tag` 加提示文字），送出鍵 Button Primary Filled lg。
- 以內容為主，長頁面高度見三區結構。

## 表單編輯頁（卡片內多個欄位，確認後返回）

第一個案例：師傅 2.4.4、2.4.8、2.4.9（程式 `StandardFeeEditSection`、`SimpleFeeEditSection`、`OtherFeeEditSection`）。

- 每筆資料是一張 DS `Card`（Inset／Standard），Slot 放表單內容的本機元件（例如 `StandardFeeItemForm` 的展開、收合 variant，`OtherFeeItemForm`），欄位用 DS `TextField`。
- **TextField 沒有說明文字、字數、錯誤訊息時，把 `Show Helper Row` 關掉**，整列才會移除；不關的話每個欄位下方多一列空白，長頁面高度也會算錯。
- 驗證錯誤（空欄位在按「確認」後一次顯示紅字）不另畫一格，記在批次紀錄；要表示時用 TextField 的 State=Error，唯讀欄位出錯時也改 Error。
- 「確認」鍵在捲動內容最下方（Button Primary Filled lg、寬度 Fill），沒有固定底部列時底部放 HomeIndicator。長頁面。

## 底部兩顆按鈕的選擇器 BottomSheet

第一個案例：師傅 2.4.5（程式 `UnitPickerBottomSheet`）。

- BottomSheet 有標題與右上 X，高度照程式比例（90% 約 767）；內容用 Slot：分類名稱加一排 DS `Chip`（Tone=info，選中 Selected），列本身自排。
- 底部「取消」「確認」兩顆並排：把 BottomSheet 內建的 Sticky Footer 換成 Flexible Slot 變體，Slot 放兩顆 Button（取消 Secondary Outlined lg、確認 Primary Filled lg，間距 `Spacing/16`），DS 待辦 10 處理前的做法。
- 同一格有多個狀態（例如選「台」與選「式」）時畫資訊較多的那個，不另開 Frame；選「式」的提醒用 DS `Banner`（Tone=Notice、Leading=Icon、Closable 關，圖示換 Phosphor Warning），放在內容下方、左右 `Spacing/16`。
- 只有標題與選項、沒有底部按鈕、點選項即選定的選項清單（師傅 2.4.3）：BottomSheet Footer=Inline，右上 X，內容放 ListItem，做法同動作選單的「有標題的選項清單」。

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

# 畫面類型：頁面與列表

一般資料頁、分頁列表頁、通知列表、沒有 AppBar 的全頁、底部可拖曳面板、系統畫面邊界。

元件 Key 見 `docs/exploration/in-progress/figma-ssot/stage3/reference.md`，三區結構、卡片、Dialog、圖示等通則見 `../screen-types.md`。

---

## 一般資料頁

列表、卡片、按鈕組成的頁面（例如帳號頁）。第一個案例：管理員 2.1.1。

- `Scroll Content` 左右與上方 padding `Spacing/16`（DS 規定的頁面邊距，程式是其他值也照 DS），底部 padding 見三區結構。
- 內容依程式分成區段（例如「幫助」「其他」），每個區段是一個 `box()`（區段標題＋內容，間距 `Spacing/8`），區段之間 `Spacing/16`。
- 區段標題 `Heading/4`。
- 設定入口：Card（Layout=Inset、Padding=None）包 ListItem（ListItem 自帶左右與上下 16，Card 不加內距）。
- 全寬按鈕：Button lg、寬度 Fill。Outlined 已自帶白底。

**帳號頁頁首**：AppBar（Tall／None／Brand），關閉 Has Leading、Has Action；刪掉 `Title` Slot 裡的 `Title Text`，放 `Profile`（水平、間距 `Spacing/16`、垂直置中）：Avatar 75＋姓名 `Title/L`／Email `Body/XS`（單行截斷）。

## 分頁列表頁

第一個案例：師傅 2.1.1 至 2.1.4（程式 `MasterOrderListPage`，頂部是 `TwoTabPreferredSizeTabBar`）。

- AppBar（Standard／Slot／Brand），關閉 Has Leading、Has Action，標題照程式；頂部的兩個分頁用 DS `SegmentedControl`（Segments=2，Selected 依分頁）放進 `Extension Content`，並設寬度 Fill；刪掉 `Extension Content` 裡殘留的 `Slot Rectangle`。
- 浮動 BottomNavBar（Role=Master）選中對應分頁：對 Tab instance 設 `Toggle`（原本選中的關、目標的開）。
- 列表是卡片（見通則 `../screen-types.md` 的「卡片與資料列」），`Scroll Content` 左右與上方 `Spacing/16`、卡片間距 `Spacing/8`。**示意資料要涵蓋該列表查詢條件下會出現的各種狀態**，例如保固中清單包含保固中、登記保固中、訂單結束、訂單終止（程式的查詢是狀態範圍，不只一種），不要只畫一種。
- 空狀態：`EmptyState`（Size=Compact，關說明、開按鈕）放進 `Scroll Content`，寬度 Fill；插圖沒有向量時留 Slot 的粉紅佔位並改名「插圖佔位（待補）」。

## 通知列表（程式的 `MasterNotificationList`、`OrderNotification`、`SystemNotification`）

第一個案例：師傅 6.1.1 至 6.1.3。

- 頂部同分頁列表頁（AppBar Standard／Slot／Brand＋`SegmentedControl`，開 Has Leading），沒有 BottomNavBar，底部放 HomeIndicator，頁面底色 `Background/Surface`（程式 Scaffold 白底）。
- 列是整寬白底帶加底部 1px `Border/Default` 線，不用 DS `Card`，做成本機元件：`OrderNotificationItem`（Title、Content、Time）、`SystemNotificationItem`（variant Expanded，加 Has Image 布林）。左右上下內距 `Spacing/16`。
- 系統通知的展開鈕是 48×48 點擊區、圖示 16 靠上置中（內文列最矮 48）；收合內文最多 3 行（設 `maxLines` 要在設完 `textTruncation` 之後，否則變成 1 行），展開全文；沒有縮圖時仍留 8 的空隙。示意資料涵蓋有縮圖、沒縮圖、展開。
- 時間文字依 `TimeElapsedText`：N天前、N小時前、N分鐘前、剛剛。
- 空狀態：`EmptyState` Compact（關說明、關按鈕），外包一層上方 `Spacing/48`，兩個分頁共用，畫第一個分頁。

## 沒有 AppBar 的全頁（結果頁、評價表單）

第一個案例：師傅 2.8.1、2.8.2（程式 `MasterOrderDetailFinishPage`、`ToClientComment`，Scaffold 沒有 appBar）。

- 頂部只放 StatusBar（Dark Content），底部 HomeIndicator，內容置中（`Scroll Content` 副軸置中）。程式頂部空 150 → 兩層 `Spacing/48`（接在 StatusBar 之後）。
- 插圖沒有向量：留粉紅佔位「插圖佔位（待補）」，尺寸照程式（2.8.1 為 233×233）。提醒框：1px `Border/Subtle`、`Radius/4`、內距 `Spacing/12`、左右邊距 `Spacing/32`。
- 評分用 DS `Rating`（Size=lg，Rate 照預設值）、頭像用 DS `Avatar`；評論框用 DS Card（Inset／Standard）放 `TextField`（Multi、Empty，關閉 Label 與 Helper Row）。系統商店評分視窗屬外部邊界，不畫。

## 底部可拖曳面板（程式的 `SlidingUpPanel`）

第一個案例：師傅 3.1.1、3.1.3、3.2.1（我的收入頁的「訂單明細」面板）。

- 面板做成 Frame 層級的浮層 `IncomePanel`（絕對定位、約束水平 Stretch、垂直 Bottom、背景綁 `Background/Page`、裁切），不放進 `Content`。圖層順序：BottomNavBar、`IncomePanel`、`AppBar`、`Content`，面板要在導覽列**之下**，否則會蓋住中央 Logo（使用者指出）。`float()` 之後要把面板放到第二層，用 `insertChild(2, panel)`，用 `insertChild(1, …)` 會留在最上層；放完立刻檢查 `frame.children` 順序。
- 收合狀態高度照程式 `minHeight`（螢幕 25% ＝ 213），`y = 852 − 82 − 面板高`，貼在導覽列上緣。完全展開時面板填滿 AppBar 下緣到導覽列上緣（3.2.1：高 646），內容蓋住後方畫面。
- 面板內：標題列（內距 `Spacing/8`）＋白底列表區（填滿剩餘高度、裁切）。面板內有資訊圖示時，面板的 `itemReverseZIndex = true`，泡泡才不會被後面的列表蓋住。
- 後方 `Scroll Content` 底部 padding：程式在最後一張卡片下留的空白（例如 350）加導覽列 82，保證捲到底能看到被面板蓋住的內容；這高於 134 的最小值，結構檢查可接受。
- 列表的列（`IncomeListItem`）用本機元件，欄寬照程式 flex 比例換成固定寬（361 切成 120／80／80／81）。
- 空狀態：面板停在收合高度，`EmptyState`（Compact）放在標題列下方，沒有插圖時關 Has Illustration、Has Description。
- 示意資料要符合真實商業規則（例如撥款週期），不要編出不可能的資料（例如今天 10/07 就有 11 月已入帳的收入）。

## 系統畫面邊界（手機系統自己的橫幅、對話框）

第一個案例：師傅 6.1.4（推播橫幅）。

- 使用者決定：只畫系統元素，底圖用灰色（`Icon/Subtle`），不畫任何 App 畫面，點擊後的目的地不畫。頂部 StatusBar（Dark Content），底部 HomeIndicator。
- 推播橫幅自排：白底、`Radius/12`、內距 `Spacing/12`；左側 DS `Logo-AppIcon`（原 64，縮成 40 用 `rescale`，不能 `resize`），中間標題 `Title/S`＋內文 `Body/S`，右上「現在」`Body/XS`＋`Text/Hint`。文字用真實推播文案。
- 程式的外部頁面（例如點「立即更新」前往的 Google Play／App Store）不畫，也不留邊界 Frame（使用者決定，客戶端 1.1.6 已刪除）；去向寫在前一格的結構表去向。

## 啟動畫面（程式的 `MainInitializer`）

第一個案例：客戶端 1.1.1、1.1.3。

- 背景綁 `Brand/TigerYellow`（`#FABF13`，與程式相同）。頂部 StatusBar（Dark Content），底部 HomeIndicator（Dark）。`Content` 的主軸置中，放 DS `logo`（key 見 reference.md，原 206×60，用 `rescale` 縮成高 68）。
- 底部訊息列（程式 `bottomSheet`）：高 74（40＋底部安全區 34），`Status/Error` 底、`Body/S` 白字、水平置中、單行截斷、內距 `Spacing/8`。絕對定位浮在最底（約束左右 Stretch、垂直 Bottom，排在最前），HomeIndicator 仍留在自動排列，Logo 位置才與沒有訊息列的畫面一致（`bottomSheet` 不縮小 body）。
- 疊 Dialog 的畫面：底圖複製對應的啟動畫面，加 `Scrim` 與 Dialog（見 `screen-types.md` 的 Dialog）。
- 後端傳來的系統訊息沒有固定文案，示意文字用單行放得下的內容。

## 首次介紹頁（程式的 `IntroductionScreen`，套件 `introduction_screen`）

第一個案例：客戶端 1.2.1 至 1.2.5。

- 白底，頂部 StatusBar（Dark Content）。版面照套件原始碼：圖片區與文字區 flex 1:1，頁面可用高度扣掉 `pageMargin` 下 60 與 `safeArea` 60；本檔案的 852 高下，插圖區固定高 280，插圖靠下置中、無內距。
- 文字區內距 `Spacing/16`，標題上 `Spacing/16`、下 `Spacing/24`，標題 `Display/M`＋`Text/Primary`，內文 `Body/M`＋`Text/Primary`，皆置中。
- 底部控制列內距 `Spacing/16`，三等分：左（沒有略過與返回時為空，高度固定 1，否則空框會撐到 100）、中間分頁圓點、右側 DS `Button`（Ghost Action、lg）。最後一頁標籤改「繼續」。最底 HomeIndicator。
- 分頁圓點用本機元件 `IntroDots`（variant Page=1 至 5；10px `Icon/Subtle` 圓點，目前頁為 22×10 `Brand/TigerBlue` 藥丸，間距 `Spacing/12`）。使用者決定不升級 DS。
- 插圖是圖檔，Figma 工具不能匯入：留粉紅佔位（235×280，命名「插圖佔位（pageN.png，待補）」），由使用者之後自己放入。
- 改按鈕標籤時，要從 Button instance 內找文字（`findOne` 從外層框找不到），並先 `skipInvisibleInstanceChildren = false`。

## 啟動畫面加底部按鈕（程式的 `AuthNav`）

第一個案例：客戶端 1.3.1。

- 複製啟動畫面 1.1.1 當底圖，`Scroll Content` 內 Logo 下方 `Spacing/24` 加標語（`Heading/2`＋`Text/Primary`）。
- 底部用 DS `Sticky Footer`（Buttons=Single、Has Slot=false，已含 HomeIndicator），取代原本的 HomeIndicator；清掉它的填色與陰影（`fills = []`、`effects = []`）讓黃底透出，Button Label 改文字。

## 登入表單頁（程式的 `PhoneInputSection`、`PasswordInputSection`、`VerifyInputSection`）

第一個案例：客戶端 1.3.2 至 1.3.5、1.4.1 至 1.4.3（使用者已確認）。

- 頂部 AppBar（Tall／Overlay／Brand），開 Has Leading、關 Has Action。總高 225、`Extension Content` 內的卡片頂在 y=193，與程式（狀態列 59＋工具列 56＋下緣 110，卡片 top 193）吻合。
- `Title` Slot：刪掉 `Title Text`，放垂直 `box`：標題 `Heading/3`、副標 `Label/L`，皆 `Text/Primary`。`Extension Content` Slot：放 DS Card（Inset／Standard），寬度 Fill。
- 卡片超出 AppBar 的高度不會撐開 AppBar：`Scroll Content` 上方 padding ＝ 卡片底緣超出量 ＋ `Spacing/16`（用 `absoluteBoundingBox` 計算）。左右 `Spacing/16`。
- 欄位用 `TextField`（Single）或 `PasswordField`（Reveal=Hidden）；錯誤文字用元件 State=Error＋Helper Text，不另畫紅字。`PasswordField` 沒有 Show Helper Row，卡片底部會多一段空白（DS 待辦 13）。
- 卡片下方 Button Primary Filled lg，寬度 Fill；其下的次要文字按鈕（忘記密碼、重新傳送）用 Ghost 的 md／sm Button 置中，間距 `Spacing/16`／`Spacing/8`；停用狀態用 Button 的 State=disabled。
- 六格驗證碼輸入用本機元件 `PinInput`（Content=Empty／Filled，40×50 方框，1px `Border/Subtle`、`Radius/4`，主軸 SPACE_BETWEEN）。
- 輸入焦點、按鈕載入中文字動畫不另建 Frame，只記錄。

## 空白頁

第一個案例：客戶端 1.3.6。

- 程式沒有對應畫面（只回傳空 `Container()`）時，照現況畫空白頁：StatusBar、空的 `Content`、HomeIndicator，底色 `Background/Page`；不要發明設計。

## 登入表單頁：多卡片長表單（程式的 `UserCreateInputSection`）

第一個案例：客戶端 1.5.1、1.5.3 至 1.5.5。

- 沿用「登入表單頁」的 AppBar（Tall／Overlay／Brand）與卡片。標題兩行時 AppBar 高 239（Tall 預設 225），卡片頂在 y=207，記在批次紀錄。第一張卡片放進 `Extension Content`，其餘卡片（複製第一張再換 Slot 內容）與小標題放在 `Scroll Content`。
- 小標題 `Heading/4`＋`Text/Primary`，上下內距 `Spacing/8`；卡片內欄位間距 `Spacing/24`（程式欄位沒有預留說明列，所以欄位的 Show Helper Row 只在有錯誤或字數時開）。
- 欄位每次用元件組建新 instance，不改複製來的 instance 的 variant。唯讀欄（已驗證手機）用 `TextField` State=Disabled，尾端圖示換 Phosphor PencilSlash。
- `TextField` 尾端圖示預設是 Smiley：要換成 XCircle，要把 `input-row` 內名為 Smiley 的內層 instance 用 `swapComponent` 換掉；改 `Suffix Icon` 屬性值不會生效。
- 內文裡的連結（條款）：一段 `Body/S` 文字，連結範圍用 `setRangeFills` 綁 `Text/Link` 並加底線。
- 欄位下方的紅字（建立失敗）：`Body/S`＋`Status/Error`，包一層上、左 `Spacing/4` 內距的框。
- 長表單拉長：Frame 高 ＝ AppBar ＋ `Scroll Content` ＋ 34 ＋ 2，`Scroll Content` 底部 padding 28（程式 28）。
- 全空白送出的錯誤畫面：每個必填欄位 State=Error，顯示程式的檢核文字，不為單一錯誤另開 Frame。

## 系統權限對話框（Android 樣式）

第一個案例：客戶端 1.7.1、1.7.2（使用者已確認 1.7.1）。

- 屬於「系統畫面邊界」：底色 `Icon/Subtle`，只畫系統元素，StatusBar 與 HomeIndicator 保留，不畫 App 畫面。複製空白頁當底。
- 對話框自排：白底 `Background/Surface`、內距 `Spacing/24`、圓角 `Radius/12`（Android 實際約 28，見 approximations.md）、寬 312、置中，內容垂直置中對齊、間距 `Spacing/16`：Phosphor 圖示（24）、標題 `Title/S` 置中、按鈕（DS Button Secondary Outlined lg，寬度 Fill）垂直堆疊。
- 通知：Bell，按鈕「允許」「不允許」。麥克風：Microphone，按鈕「使用應用程式時允許」「僅限這一次」「不允許」。系統文案沒有實機查證，批次紀錄要註明。

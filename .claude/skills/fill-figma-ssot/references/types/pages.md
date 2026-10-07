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

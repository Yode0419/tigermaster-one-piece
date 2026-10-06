# 批次 13：師傅端／2 訂單與報價

- **Figma**：[APP_師傅 → 2 訂單與報價](https://www.figma.com/design/m0yuXFZN2fkivzTOcwiKJ4/APP_師傅)
- **Evidence**：Flutter repo `docs/figma-ssot/evidence/T-0102.md`（2.1 至 2.3，13a 共 9 格）、`T-0103.md`（2.4 至 2.6，13b 為 2.4 共 11 格）；2.7 以後各段開始時再補
- **紀錄方式**：只記例外（見 fill-figma-ssot Skill「Recording」）

本批切成四個對話：13a（2.1 至 2.3）、13b（2.4）、13c（2.5、2.6）、13d（2.7、2.8）。每段開始時把該段的 Frame 補進清單。

---

## Frame 清單

| Frame | 狀態 |
|---|---|
| 2.1.1 進行中訂單列表 | 已完成 |
| 2.1.2 尚無進行中訂單 | 已完成 |
| 2.1.3 保固中訂單列表 | 已完成 |
| 2.1.4 尚無保固中訂單 | 已完成 |
| 2.2.1 訂單資訊 | 已完成 |
| 2.2.2 客戶下單需求 | 已完成 |
| 2.2.3 選擇導航 App | 已完成 |
| 2.3.1 上傳施工前照片 | 已完成 |
| 2.3.2 施工前照片上傳失敗 | 已完成 |
| 2.4.1 標準報價總覽與編輯 | 已完成 |
| 2.4.2 選擇標準報價工程分類 | 已完成 |
| 2.4.3 標準報價分類／項目編輯 | 已完成 |
| 2.4.4 單位選擇 | 已完成 |
| 2.4.5 編輯標準報價分類描述 | 已完成 |
| 2.4.6 簡易報價總覽與編輯 | 已完成 |
| 2.4.7 編輯施工費／材料費 | 已完成 |
| 2.4.8 編輯其他工程明細 | 已完成 |
| 2.4.9 載入上次報價確認 | 已完成 |
| 2.4.10 離開報價確認 | 已完成 |
| 2.4.11 送出報價確認 | 已完成 |

---

## 本機元件

放在該 Page 右側的「本機元件」Section。

| 元件 | 用在 | 屬性 |
|---|---|---|
| `OrderCategoryCard`（從師傅 1.2.1 複製過來，屬性 Category） | 2.2.2 | 與批次 12 同一個元件，兩個 Page 各一份。已用在 1.2.x 與 2.2.2，客戶端服務詳情若再出現，建議升級進 DS |
| `QuotationCategoryRow`（variant Trailing=Arrow／Add） | 2.4.1、2.4.3、2.4.6、2.4.8 | TEXT：Title、Description（含括號，例如「(含配線)」）、Subtotal；BOOLEAN：Has Description、Has Subtotal。程式 `QuotationCategoryCard`（標題＋說明＋小計＋圖示）。只做列內容，外框用 DS `Card`（Inset／None）。列高 64（使用者指出 44 太矮：上下 8＋右側點擊區 48，箭頭與小計間距 14） |
| `StandardFeeItemForm`（variant State=Expanded／Collapsed） | 2.4.3（展開、收合各一）、2.4.4、2.4.5 底圖 | TEXT：Subtotal（複價金額）、Item Name（只用在收合的細項名稱）。程式 `StandardFeeEditForm` 同一個 widget 的兩種狀態。內含 DS `Button`（刪除）與 `TextField`，值在巢狀 instance 上改。只做表單內容，外框用 DS `Card`（Inset／Standard）。因為屬性只有一組預設值，收合 variant 的預設複價顯示 $ 7,200，使用時改成實際金額 |
| `QuotationAmountBar` | 2.4.1、2.4.2、2.4.6、2.4.9 至 2.4.11（放在 DS `Sticky Footer`（Button + Slot）的 Slot） | TEXT：Prepaid Note；BOOLEAN：Has Prepaid Note（預設關）。內含兩個 DS `Tag`（報價金額＝Info、師傅收入＝Emphasis Solid），金額在巢狀 Tag 的 Label 屬性上改（Figma 不能把巢狀 instance 的文字連到本元件屬性） |
| `OtherFeeItemForm` | 2.4.8（兩個項目） | TEXT：Header。內含兩個 DS `TextField`（名稱、價格）與「刪除」Button，值在巢狀 TextField 的 Value Text 上改。只做表單內容，外框用 DS `Card`（Inset／Standard） |
| `OrderListCardBody`（variant Type=OnGoing／Warranty） | 2.1.1、2.1.3 | TEXT：Category、Status、Value 1 至 3。標籤文字（叫修地址等）依 Type 固定；Status 顏色依 Type 綁 `Status/Error`／`Status/Success`。只做卡片內容（標題列＋資料框），外框用 DS `Card`（Inset／Standard）：Figma 不允許在元件裡把 Card 內部文字連到屬性，所以外框不放進本機元件，使用時 Card 的 Slot 放這個元件 |

---

## 待寫規則

使用者修正中屬於通則的部分，每個對話結束時一次寫進 Skill，寫完標「已寫入」。

**13a 結束（2026-10-06）：下列規則除最後兩條（使用者決定舊畫面不回頭修）之外，都已寫入 Skill**：SKILL.md 的繪製原則（卡片與資料列、HomeIndicator 與長頁面高度、示意資料、捲動結構、省 token 的搜尋規則）、`screen-types.md`（三區結構補 HomeIndicator 與長頁面 +2、新增「卡片與資料列」「分頁列表頁」「訂單詳情頁」「唯讀資料頁」「上傳照片表單」，動作選單補「沒有標題、沒有取消的選項清單」）、`snippets.js`（`threeZone` 說明、結構檢查新增 HomeIndicator 與長頁面高度）、`figma-notes.md`（Card Slot 裁切、跨 Page 複製、instance 尺寸、失敗呼叫可重跑）。

**13b 待寫規則（2026-10-06，已全部寫入 Skill：SKILL.md 繪製原則三條、`screen-types.md` 新增報價總覽頁、表單編輯頁、底部兩顆按鈕的選擇器 BottomSheet 三節並補背景重綁說明；使用者決定的三項記進 `stage3.md` 決策）**：

- 自排任何區塊前，先把 DS 的 Tag、TextField、Chip、Sticky Footer 這幾頁的元件清單對照一次：這次第一版自排了金額膠囊與工期欄位，Section 結束才發現 `Tag`、`TextField` 已涵蓋。「標籤加數值的膠囊」找 Tag，「有標籤的欄位」找 TextField（含 Readonly、尾端圖示）。
- BottomSheet 的底部要放兩顆按鈕時：把內層 Sticky Footer 換成 Flexible Slot 變體，Slot 裡放水平排列的兩顆 Button（DS 待辦 10 處理前的做法）。
- 本機元件裡放 DS 巢狀 instance（Tag、TextField）時，Figma 不能把巢狀文字連到本元件的屬性，值要在巢狀 instance 的屬性上改；本元件另外至少有一個自己的 TEXT 屬性，結構檢查才不會報「沒有文字屬性」。
- Plugin API：這個環境 `parent.children.indexOf(node)` 回傳 -1，找位置要用 `children.findIndex(c => c.id === node.id)`。
- 同一個畫面有多個狀態（例如單位選「台」與選「式」）時，不新增 Frame，畫資訊較多的那個狀態（選「式」，含提醒），其餘寫進紀錄；欄位錯誤同理只寫文字（2.4 使用者修正，依 `figma-build-r01.md` 暫緩表）。
- 複製畫面後，Frame 背景若綁變數，要檢查存下來的顏色值：2.4.2 綁了 `Background/Page` 但存的是黑色，畫面顯示成黑底，重新綁一次才正常。結構檢查可加一項：Frame 填色與其綁定變數的值不一致。
- 手排的列要對照程式的實際高度：Material 2 的 `IconButton` 最小 48，所以含圖示按鈕的列約 64，不是只算文字高。
- DS `TextField` 新增 `Show Helper Row` 布林（預設開）：沒有說明文字、字數、錯誤訊息的欄位要關掉，否則每個欄位下方多一列空白（2.4.3 少算 104）。長頁面改完要重算高度。
- 浮層畫面複製底圖：移除目標 Frame 的子層、設好三區屬性後，逐一 `clone()` 來源 Frame 的子層並寬度 Fill，`Content` 高度 Fill。來源是拉長的頁面時，浮層畫面仍是 852，內容被裁切。
- 卡片外框一律用 DS `Card`（才有正確陰影），不自己畫底色圓角；本機元件只做卡片內容，放進 Card 的 Slot（2.1 使用者修正）。
- 「標籤＋數值」的資料列，數值靠右端對齊（列用 SPACE_BETWEEN，長文字的值 Fill＋靠右＋單行截斷）（2.1 使用者修正）。
- 列表的示意資料要涵蓋該列表查詢條件下會出現的各種狀態，不只畫一種；保固中訂單包含訂單結束、訂單終止（程式查詢是狀態 ≥ 等待客戶支付尾款）（2.1 使用者修正）。
- 捲動結構：`Content` 裡只放一層 `Scroll Content`（Hug 高度），所有 padding 與內容都在內層；底部一定要留 padding（預設 `Spacing/16`，有浮動導覽列時為 134：導覽列 82＋中央 Logo 凸出導覽列上緣的 36＋16，只算 82 會被 Logo 遮住），捲到底才不會被底部列遮住或緊貼（2.1 使用者修正，兩次）。**已寫入** Skill（SKILL.md 繪製原則、screen-types.md 三區結構與一般資料頁、聊天室、snippets.js 的 `threeZone` 與結構檢查）。批次 12 與管理員端已畫好的畫面是舊結構（padding 在 `Content`），使用者決定不回頭修。
- 沒有固定底部列（BottomNavBar、輸入列、按鈕區）的畫面，底部也要放 DS `HomeIndicator`（Style=Dark，深色底用 Light）當固定底部，寬度 Fill，排在自動排列最後；以內容為主的長頁面高度要把它的 34 算進去（2.2.1、2.2.2、2.2.3 底圖漏放，使用者指出後補）。結構檢查可加一項：Frame 底部沒有 HomeIndicator（含在 BottomNavBar、ChatInputBar、按鈕區 Bar 內者不算）。
- 拉長的長頁面，高度要再加 2：Frame 外框的 1px 描邊算進排版（上下各 1），不加的話 `Content` 會比 `Scroll Content` 少 2，捲動範圍被截（2.2.2 驗出）。
- 地圖 App 這類沒有圖示素材的選項清單，使用者決定先不放圖示（關 ListItem 的 Has Leading Icon），不留 Smiley 佔位。
- 示意資料要有真實來源：資料只有某個工項有真實數字（價格、保固）時，同一批的訂單就用那個工項，並同步改前一格的列表，不另外編資料（2.2 的做法，使用者尚未確認）。
- 跨 Page 複製畫面部件：在來源 Page `clone()`，切到目標 Page 後 `appendChild`（可行，同一個檔案內）；本機元件的 instance 要先把主元件複製進目標 Page 的「本機元件」再 `swapComponent`。
- DS `Card` 的 Slot 預設裁切內容；需要凸出的元素（例如未讀標記）要關掉那個 instance 的 Slot `clipsContent`。AppBar 延伸區放卡片後，要刪掉 `Extension Content` 裡殘留的 `Slot Rectangle`。
- `search_design_system` 一律帶 `includeLibraryKeys`（變數用 DS 的 libraryKey `lk-1316b9…`、圖示用 Phosphor 的），不帶會回傳大量其他函式庫的結果（這次一次回了約 30k 字）。
- 批次 12 的 `MasterSuitableOrderCard`、`MasterInProgressOrderCard`、`OrderCategoryCard` 也是自己畫底色圓角、沒有 DS Card 的陰影，使用者決定不回頭換成 DS `Card`。

---

## 2.1 訂單列表（2026-10-06）

**程式**：`master_order_list_page.dart`、`master_on_going_order_card.dart`、`master_warranty_order_card.dart`

只記例外：

- 頂部兩個分頁（程式 `TwoTabPreferredSizeTabBar`）用 DS 的 `SegmentedControl`（Segments=2）放進 AppBar（Standard／Slot／Brand）的 `Extension Content`，標題「訂單紀錄」。選項與文字照程式。
- BottomNavBar（Master）選中「訂單」：Home 的 Toggle 關、Order 的 Toggle 開。
- 兩種訂單卡共用本機元件 `OrderListCardBody`，外框是 DS `Card`（使用者修正，原本自己畫外框沒有陰影）。不與批次 12 的 `MasterInProgressOrderCard` 合併：那張是首頁窄卡（左側藍條＋未讀點），這張是整列寬卡（標題列＋三列資料框），兩個程式 widget 也不同。
- 日期照程式 `yyyy年MM月dd日,ahh:mm` 顯示成「2026年10月07日,上午09:30」；保固卡用 `yyyy年M月d日`，月日不補零。時間加成文字取自程式對照表（無加成、平日 18:00 - 20:59 等）。
- 示意資料與師傅 1.1.1 的進行中案件一致（更換氣密窗、抽油煙機清洗），第三張壁癌的狀態是「等待上傳施工照片」，供 2.3.1 使用。保固卡的保固天數 31 天取自批次 12 的監視系統保固資料，其餘服務的實際保固天數沒有核對。保固中清單畫四張，涵蓋保固中、正在為客戶登記保固、訂單結束、訂單終止（程式查詢包含這些狀態，使用者指出）；訂單終止沒有施工完成日，顯示「--」。卡片文字色一律照程式：狀態綠對保固卡所有狀態。
- 空狀態用 DS `EmptyState`（Compact，關說明）。程式的插圖（`empty_in_progress_order_list.png`、`empty_in_warranty_order_list.png`）高 112，DS 版插圖是 60 的 Slot，這兩張圖還沒有向量，插圖位置留粉紅佔位圖層（命名「插圖佔位（待補）」）。程式的 PillButton 藍色 40×120，對應 DS Button Secondary Filled md pill（#3A89F8 完全相同）。
- 空狀態離頂部 120：DS 沒有對應的間距，用兩層 `Spacing/48`（96）。


## 2.2 訂單資訊與客戶需求（2026-10-06）

**程式**：`master_order_detail.dart`、`master_order_basic_info_card.dart`、`stack_sliver_app_bar.dart`、`order_client_requirement.dart`、`order_requirement_section.dart`

只記例外：

- **示意訂單改用監視系統安裝維修**：2.2.2 要顯示該工項的價格區間與保固，官網沒有價格資料，只有 1.2.1 那筆（使用者提供的實際畫面）有真實數字。所以 2.2.1、2.2.2 的訂單是「監視系統安裝維修」，並把 2.1.1 第二張卡（原本抽油煙機清洗）的工項改成監視系統安裝維修，讓「從列表點進詳情」是同一筆（狀態等待前往現場查看、場勘 10/06 下午 7:00、新北市三重區重新路三段 12 號）。師傅首頁的進行中案件卡也同步改了（使用者同意）：1.1.1、1.1.2、1.1.4、1.1.5、1.3.1 共 5 個畫面，屬性 Category 由抽油煙機清洗改為監視系統安裝維修。
- **2.2.1 下方的階段內容留空**：程式在資訊卡下方依訂單狀態放 2.3 至 2.8 的內容（此狀態是 2.4 的報價單上傳區），依 T-0102 證據這一格只畫共用資訊區，下方歸各自的 Section，所以只有灰底。標題「上傳報價單」是程式 `titleParser` 對這個狀態的輸出。
- 2.2.1 頂部（程式 `StackSliverAppBar`，黃色漸層＋疊在上面的白卡）用 AppBar（Standard／Overlay／Brand），卡片放進 `Extension Content`，卡片外框是 DS `Card`（內距 16，與程式相同）。捲動時卡片淡出、標題列收合的行為只用文字記錄。`Scroll Content` 上方 padding 297（卡片高 321 減延伸列 32 加 8）。
- 「查看需求 ›」「導航 ›」（程式藍字加箭頭）用 DS Button（Ghost Action、sm，後方圖示 Phosphor CaretRight）；「與 王先生 對話」（程式藍框 `OutlinedButton`，`sms_outlined` 圖示）用 Button Secondary Outlined lg，前方圖示 Phosphor ChatDots。Colors.blue（#2196F3）對應 DS 的 Interactive/Action（#3A89F8）。
- 「聯繫客服」程式用自家圖片 `chat_with_admin.png`（36px）加 12px 字，Figma 用 AppBar 動作區的 `IconLabelButton`，圖示換成 Phosphor Headset，**不是原圖**。兩個未讀標記（客服 1、客戶對話 2）用 DS `Badge`（Count）；對話按鈕的標記凸出按鈕 6px，Card 的 Slot 預設會裁切，所以把這個畫面 Card Slot 的 `clipsContent` 關掉。
- 客戶姓名程式顯示後端的 `clientUserObscureName`，測試資料格式是「n先生」「n客戶」，沒有查到後端怎麼組，示意用「王先生」，**組法沒有核對**。地址是完整地址（承接後訂單才看得到）。
- 日期照程式：2.2.1 `M/dd(EE)a h:mm`，顯示「10/06(週二)下午 7:00」（括號與「下午」之間沒有空格）；2.2.2 `MM/dd(EEE) a hh:mm`，顯示「10/06(週二) 下午 07:00」。
- 2.2.2 與批次 12 的 1.2.1 結構相同，頂部、三張資料卡直接從 1.2.1 複製過來（價格區間關說明、保固膠囊含說明），只改標題「客戶下單需求」、客戶姓名、地址、場勘時間；沒有底部按鈕，是以內容為主的長頁面，Frame 高 1030。`OrderCategoryCard` 一併複製進本頁的「本機元件」。照片區沿用 1.2.1 的三張貓咪佔位照（程式 `HorizontalImageList` 高 120，Figma 照 DS Image 100）。
- 2.2.3 的 BottomSheet 程式沒有標題、沒有取消：hasHeader=false、Footer=Inline 且關掉 hasFooter，開拖曳把手；選項是 ListItem（Trailing=None、有前方圖示）。地圖 App 名稱程式用 `map_launcher` 套件的 `mapName`，示意放 Apple Maps、Google Maps、Waze（裝了哪些依手機而定）。前方圖示是各地圖 App 的 logo（套件內的 SVG），Figma 沒有，使用者決定先不放：關掉 ListItem 的 Has Leading Icon。

## 2.3 施工前照片（2026-10-06）

**程式**：`master_order_upload_images_section.dart`、`grid_image_view.dart`、`master_order_detail.dart`

只記例外：

- **訂單**：2.1.1 第三張卡（壁癌，狀態等待上傳施工照片）那筆，頂部資訊卡複製 2.2.1 的 AppBar 再改字：標題「上傳施工前照片」（程式 `titleParser` 對 `PENDING_PREVIEW_PICTURE` 的輸出）、工項壁癌、10/05(週一)上午 10:00、客戶「林小姐」（示意）、地址台北市中山區民生東路二段 80 號 5 樓(有電梯)。這筆訂單沒有未讀訊息，所以拿掉兩個未讀標記。
- **畫哪個狀態**：程式上傳區在「未選照片」與「已選照片」兩種輸入狀態，證據文件要求合併一格；畫已選 3 張的狀態（有照片格、新增格、可點的送出按鈕），未選時的差異只有沒有照片格、送出鍵是半透明（程式 `DISABLE_STYLE`），沒有另畫。
- 照片格用 DS `PhotoUpload`：3 個 State=uploaded（照片加右上刪除圖示，程式 `cancel_outlined` 白色）加 1 個 State=default（Plus 新增格，程式是藍框加號）。元件 80×80，一列 4 個，橫向 SPACE_BETWEEN；程式照片格是 (螢幕寬 − 60)／4，間距 5，Figma 依 DS 元件尺寸。照片用 DS Image 內建貓咪佔位照。
- 送出鍵：Button Primary Filled lg（#1F286F，與程式 `NORMAL_STYLE` 的 (31,40,111) 完全相同），Fill 寬度，與資訊卡區段間距 `Spacing/20`。文字 16 白色、圓角 5 都照 DS。程式的上傳中文字「正在上傳照片...」（打字動畫）沒有畫（證據文件：按鈕處理中不另建格）。
- 區段標題「上傳施工前照片」程式 20 Bold，用 `Heading/4`；提示文字「請先上傳施工前照片，才能進行報價」16 灰，用 `Body/M`＋`Text/Hint`（#727276 與程式 (114,114,118) 相同）。卡片用 DS Card（Inset／Standard，內距 16，程式也是 16）。
- 畫面高度維持 852（內容加起來只有 768，未超出一屏）；底部固定放 `HomeIndicator`（Dark），`Scroll Content` 底部 padding 為預設 `Spacing/16`。
- 2.3.2 底圖複製 2.3.1，Dialog（Standard）標題「上傳照片失敗」、內文「請確認網路連線」（Body/M＋Text/Secondary）、只有一顆「確認」（隱藏左側次要按鈕）。程式的「確認」是預設 `TextButton`，對應 Ghost Action。
- **照片格間距（使用者修正）**：`PhotoUpload` 預設 80×80，4 格用兩端對齊撐滿一列時，格子間距被拉到約 29，比程式的 5 大很多。改成固定間距 `Spacing/4`，每格縮到 (一列寬 − 3×4)／4（約 78.75）填滿一列，與程式「4 欄、間距 5、格子填滿」一致。同樣適用 2.3.2 的底圖。

## 2.4 報價編輯與送出（2026-10-06）

**程式**：`quotation_submit.dart`、`standard_quotation_overview_section.dart`、`standard_fee_edit_section.dart`、`standard_fee_edit_form.dart`、`unit_picker_bottom_sheet.dart`、`standard_fee_create_bottom_sheet.dart`、`simple_quotation_overview_section.dart`、`simple_fee_edit_section.dart`、`other_fee_edit_section.dart`、`other_fee_edit_form.dart`、`quotation_submit_bottom_section.dart`、`quotation_category_card.dart`、`expand_quotation_category_card.dart`

只記例外：

- **示意資料**：沿用監視系統安裝維修那筆。報價內容是示意，沒有真實來源：工種工程「水電工程」（描述「含配線」，攝影機安裝 4 台×1,800、電源與網路佈線 30 米×110，共 10,500）加其他工程 2,000，師傅收入 12,500。報價金額照程式 `calculateClientTaxPrice`：收入×(1＋平台服務費率 10%＋稅率 5%)，再×1.05 取整，得 15,094；簡易報價 3,600 得 4,347。**平台服務費率 10% 是程式在訂單沒有 payment 資料時的預設，實際訂單的費率沒有核對。**
- **頂部共用**：AppBar（Standard／Slot／Brand）加 `SegmentedControl`（標準報價單、簡易報價單），標題「開始報價」，返回鍵，右上「讀檔」用 `IconLabelButton`＋Phosphor FloppyDisk（程式 `save_outlined`）。2.4.1 至 2.4.8 同一個頂部，只差分頁選中；浮層畫面（2.4.2、2.4.4、2.4.5、2.4.9 至 2.4.11）底圖沿用打開前的那一格。
- **底部金額列**：DS `Sticky Footer`（Button + Slot），Slot 放本機元件 `QuotationAmountBar`；「送出報價單」是 Button Primary Filled lg（程式 `NORMAL_STYLE` #1F286F）。
- **2.4.1**：畫已填寫的狀態（工期 1 天 2 時、一筆工種工程、其他工程有金額、送出鍵可按）。沒畫：沒填時送出鍵變半透明並顯示「請填寫工期」「請填寫報價單」，工期編輯模式（兩個輸入框加確認），載入中轉圈，上傳中文字「報價單上傳中...」。長頁面，高 1214（列高改 64 前是 1034）。運費列的小計為 0，所以不顯示小計。
- **2.4.2**：程式的場地、工種、設備三種新增共用同一個 BottomSheet，只畫工種（標題「請選擇工種」，水電、泥作、木作、鋁門窗、油漆、冷氣安裝、漏水）。DS BottomSheet（有標題、右上 X、Footer=Inline、無底部按鈕）加 ListItem；程式選項字 18，依 DS。
- **2.4.3**：畫「水電工程」編輯，第一個項目展開（程式預設展開第一項）、第二個收合。「代購材料」入口只在非正式環境顯示（`Config.env != PROD`），沒畫。欄位驗證的錯誤訊息沒畫（依暫緩表不拆新 Frame；程式按「確認」後空欄位一次顯示紅字「請輸入工程細項」「請選擇單位」「請輸入單價」，Figma 用 DS `TextField` 的 State=Error、Show Helper Row 開，單位欄原本 Readonly，出錯時改 Error）。TextField 都沒有說明文字與字數，Show Helper Row 一律關閉（DS 新增的布林，關掉整列才會移除），2.4.3 因此縮為 886。程式是底線輸入框，用 DS `TextField`；單位欄唯讀（State=Readonly）。長頁面，高 886（列高改 64 後加 20，關掉 TextField 空白列後減 124）。沒有底部按鈕列，底部放 HomeIndicator；「確認」在捲動內容的最下方（程式在 ListView 最後一項）。
- **2.4.4**：程式一開始沒有選中任何單位、確認鍵半透明，選了才變色；選「式」時下方出現黃色提醒。原本畫已選「台」的狀態，使用者指出「式」的提醒沒有畫；依 `figma-build-r01.md` 暫緩表「相同版型的狀態變體不拆新 Frame」，改成同一格畫選「式」（確認可按，是選「台」的超集），提醒用 DS `Banner`（Notice 淡色、Leading=Icon、Closable 關，圖示換 Phosphor Warning），放在單位分類下方、左右 16。沒畫初始狀態（沒選單位、確認鍵半透明）。BottomSheet 高度用程式的 90%（767）。單位用 DS `Chip`（Tone=info）。底部「取消」「確認」兩顆按鈕：BottomSheet 內建的 Sticky Footer 只有一顆按鈕，把內層 Sticky Footer 換成 Flexible Slot 變體，再放兩顆 Button 並排（DS 待辦 10）。取消用 Secondary Outlined，確認用 Primary Filled。
- **2.4.5**：程式的描述輸入框限制 5 個字（`maxLength: 5`）。Dialog（Standard）的內容放 DS `TextField`（不顯示標籤與說明），文字「含配線」，與 2.4.3 的描述相同。
- **2.4.6**：程式 `quotationTotal >= 5000` 才擋送出，畫 3,600（報價金額 4,347）的可送出狀態。紅字提示「報價金額超過 $5,000 時，請改用【標準報價單】報價。」程式固定放在三張卡下方，不論金額；沒畫送出鍵停用時的文案「報價金額超過$5,000請用標準報價單」。證據文件已記：程式用 `< 5000` 判斷、提示卻寫「超過」，邊界不一致。
- **2.4.7**：施工費與材料費同一個畫面，只差標題，畫施工費；價格欄值照程式顯示「2500」（沒有千分位）。
- **2.4.8**：其他工程兩個項目（耗材補充 200、現場清潔 100，合計 300 與 2.4.6 相符，都是示意）；項目名稱欄沒有標籤，照程式。
- **2.4.9 至 2.4.11**：程式用平台對話框（Android `AlertDialog`、iOS `CupertinoAlertDialog`），Figma 統一用 DS Dialog（Standard）。2.4.10 的「離開」程式是紅字，對應 Ghost Danger。2.4.11 標題三行（「您的案件收入是／NTD$12,500／確定上傳報價?」），金額是 `incomeTotal`（沒扣預扣材料費），與 2.4.1 的師傅收入相同。
- **DS 取代自排**：第一版自排了「報價金額／師傅收入」膠囊與工期欄位，Section 結束前發現 DS 的 `Tag`（Info、Emphasis Solid）與 `TextField`（Readonly＋尾端圖示）已涵蓋，已換成 DS 元件並刪除自排的工期元件。膠囊裡原本金額加粗、標籤不加粗，Tag 只有單一文字，合併成一個 Label。
- **自排（DS 沒有）**：`QuotationCategoryRow`（標題＋說明＋小計＋圖示的列）與工種工程那張卡裡的分隔線＋「新增一筆工種工程」按鈕（按鈕是 DS Button Secondary Outlined md pill）。單位選擇的「分類名稱＋Chip 換行排列」列，Chip 是 DS 的，列本身自排。
- **使用者尚未確認的新畫面類型**：報價總覽頁（2.4.1、2.4.6）、表單編輯頁（2.4.3、2.4.7、2.4.8）、底部兩顆按鈕的選擇器 BottomSheet（2.4.4）。照 Skill 應該畫第一格就停下來確認，這次一次畫完，Section 結束一起請使用者確認；確認後再補進 `screen-types.md`。

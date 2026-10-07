# 批次 13：師傅端／2 訂單與報價

- **Figma**：[APP_師傅 → 2 訂單與報價](https://www.figma.com/design/m0yuXFZN2fkivzTOcwiKJ4/APP_師傅)
- **Evidence**：Flutter repo `docs/figma-ssot/evidence/T-0102.md`（2.1 至 2.3，13a 共 9 格）、`T-0103.md`（2.4 至 2.6，13b 為 2.4 共 12 格，其中 2.4.1 是 2026-10-07 新增、不在 T 檔內，原 2.4.1 至 2.4.11 在 Flutter repo 的證據文件與 `evidence/index.md` 裡仍是舊編號，對照時全部加 1）；2.7 以後各段開始時再補
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
| 2.3.2 照片上傳失敗（原「施工前照片上傳失敗」，2.6.3 沿用） | 已完成 |
| 2.3.3 刪除照片確認（2026-10-07 新增，2.6.3 沿用） | 已完成 |
| 2.4.1 上傳報價單（2026-10-07 新增，13c 補畫） | 已完成 |
| 2.4.2 標準報價總覽與編輯 | 已完成 |
| 2.4.3 選擇標準報價工程分類 | 已完成 |
| 2.4.4 標準報價分類／項目編輯 | 已完成 |
| 2.4.5 單位選擇 | 已完成 |
| 2.4.6 編輯標準報價分類描述 | 已完成 |
| 2.4.7 簡易報價總覽與編輯 | 已完成 |
| 2.4.8 編輯施工費／材料費 | 已完成 |
| 2.4.9 編輯其他工程明細 | 已完成 |
| 2.4.10 載入上次報價確認 | 已完成 |
| 2.4.11 離開報價確認 | 已完成 |
| 2.4.12 送出報價確認 | 已完成 |
| 2.5.1 報價等待客戶確認 | 已完成 |
| 2.5.2 報價總覽與各筆狀態 | 已完成 |
| 2.5.3 報價分類項目明細 | 已完成 |
| 2.6.1 施工進行中（2026-10-07 新增） | 已完成 |
| 2.6.2 施工中有未同意報價（2026-10-07 新增） | 已完成 |
| 2.6.3 施工／完工照片上傳 | 已完成 |
| 2.6.4 開始驗收（2026-10-07 新增，13d） | 已完成 |
| 2.7.1 完工驗收資訊 | 已完成 |
| 2.7.2 進入提示：行動條碼驗收（新增） | 已完成 |
| 2.7.3 掃描客戶驗收 QR 碼（原 2.7.2） | 已完成 |
| 2.7.4 QR 碼無效提示（原 2.7.3） | 已完成 |
| 2.7.5 QR 確認完成驗收（原 2.7.4） | 已完成 |
| 2.7.6 進入提示：簽名驗收（新增） | 已完成 |
| 2.7.7 簽名驗收（原 2.7.5） | 已完成 |
| 2.7.8 簽名確認完成驗收（新增） | 已完成 |
| 2.7.9 客戶選擇直接驗收提示（原 2.7.6） | 已完成 |
| 2.8.1 訂單完成與評分入口 | 已完成 |
| 2.8.2 評價客戶 | 已完成 |

---

## 本機元件

放在該 Page 右側的「本機元件」Section。

| 元件 | 用在 | 屬性 |
|---|---|---|
| `OrderCategoryCard`（從師傅 1.2.1 複製過來，屬性 Category） | 2.2.2 | 與批次 12 同一個元件，兩個 Page 各一份。已用在 1.2.x 與 2.2.2，客戶端服務詳情若再出現，建議升級進 DS |
| `QuotationCategoryRow`（variant Trailing=Arrow／Add） | 2.4.2、2.4.4、2.4.7、2.4.9 | TEXT：Title、Description（含括號，例如「(含配線)」）、Subtotal；BOOLEAN：Has Description、Has Subtotal。程式 `QuotationCategoryCard`（標題＋說明＋小計＋圖示）。只做列內容，外框用 DS `Card`（Inset／None）。列高 64（使用者指出 44 太矮：上下 8＋右側點擊區 48，箭頭與小計間距 14） |
| `StandardFeeItemForm`（variant State=Expanded／Collapsed） | 2.4.4（展開、收合各一）、2.4.5、2.4.6 底圖 | TEXT：Subtotal（複價金額）、Item Name（只用在收合的細項名稱）。程式 `StandardFeeEditForm` 同一個 widget 的兩種狀態。內含 DS `Button`（刪除）與 `TextField`，值在巢狀 instance 上改。只做表單內容，外框用 DS `Card`（Inset／Standard）。因為屬性只有一組預設值，收合 variant 的預設複價顯示 $ 7,200，使用時改成實際金額 |
| `QuotationAmountBar` | 2.4.2、2.4.3、2.4.7、2.4.10 至 2.4.12（放在 DS `Sticky Footer`（Button + Slot）的 Slot） | TEXT：Prepaid Note；BOOLEAN：Has Prepaid Note（預設關）。內含兩個 DS `Tag`（報價金額＝Info、師傅收入＝Emphasis Solid），金額在巢狀 Tag 的 Label 屬性上改（Figma 不能把巢狀 instance 的文字連到本元件屬性） |
| `OtherFeeItemForm` | 2.4.9（兩個項目） | TEXT：Header。內含兩個 DS `TextField`（名稱、價格）與「刪除」Button，值在巢狀 TextField 的 Value Text 上改。只做表單內容，外框用 DS `Card`（Inset／Standard） |
| `OrderQuoteTimeSummary` | 2.4.1、2.5.1、2.6.1 至 2.6.3（2.7 可能也用） | TEXT：Hint（未含客戶端服務費）。程式 `MasterOrderQuoteAndTimeSection`：左「報價金額」右「預估工期」，中間分隔線。內含兩個 DS `Tag`（Info），金額與工期在巢狀 Tag 的 Label 屬性上改。只做內容，外框用 DS `Card`（Inset／Standard） |
| `OrderBasicInfo` | 2.2.1、2.2.3、2.3.1、2.3.2、2.5.1（2.6.x、2.7、2.8 繼續用） | TEXT：Category、Date、Customer Name、Address；BOOLEAN：Has Unread（對話按鈕右上的未讀標記）。程式 `MasterOrderBasicInfoCard`：工項、場勘／施工時間、客戶資訊、導航、與客戶對話按鈕。放在 AppBar 延伸區的 DS `Card`（Inset／Standard）的 Slot 裡，只做內容。巢狀 Button 的 Label（「與 ○○ 對話」）與 Badge 數字在巢狀 instance 上改（Figma 不能把巢狀文字連到本元件屬性） |
| `OrderListCardBody`（variant Type=OnGoing／Warranty） | 2.1.1、2.1.3 | TEXT：Category、Status、Value 1 至 3。標籤文字（叫修地址等）依 Type 固定；Status 顏色依 Type 綁 `Status/Error`／`Status/Success`。只做卡片內容（標題列＋資料框），外框用 DS `Card`（Inset／Standard）：Figma 不允許在元件裡把 Card 內部文字連到屬性，所以外框不放進本機元件，使用時 Card 的 Slot 放這個元件 |

---

## 待寫規則

使用者修正中屬於通則的部分，每個對話結束時一次寫進 Skill，寫完標「已寫入」。

**13a 結束（2026-10-06）：下列規則除最後兩條（使用者決定舊畫面不回頭修）之外，都已寫入 Skill**：SKILL.md 的繪製原則（卡片與資料列、HomeIndicator 與長頁面高度、示意資料、捲動結構、省 token 的搜尋規則）、`screen-types.md`（三區結構補 HomeIndicator 與長頁面 +2、新增「卡片與資料列」「分頁列表頁」「訂單詳情頁」「唯讀資料頁」「上傳照片表單」，動作選單補「沒有標題、沒有取消的選項清單」）、`snippets.js`（`threeZone` 說明、結構檢查新增 HomeIndicator 與長頁面高度）、`figma-notes.md`（Card Slot 裁切、跨 Page 複製、instance 尺寸、失敗呼叫可重跑）。

**13d 待寫規則（2026-10-07，已全部寫入 `screen-types.md`：訂單詳情頁階段內容與「依流程拆 Frame」、新增「提示 Dialog」「相機與簽名 BottomSheet」「沒有 AppBar 的全頁」三節；Rating、Avatar、`Border/Subtle` 的 Key 已進 `reference.md`）**：

- 使用者決定：同一個畫面入口依客戶選項會走不同流程（例如驗收方式 QR／簽名／直接）時，每個流程各自成 Frame，不用暫緩表合併；進入時自動跳出、只差文字的提示 Dialog 也各畫一格。
- 「訂單階段內容」補：驗收中（狀態 60）是金額與工期摘要＋「查看報價資訊」列＋提示文字＋Button Secondary Filled md pill「完成驗收」＋代理人說明；施工中補傳階段（狀態 58）上傳表單多一顆深藍「開始驗收」（2.6.4）。
- 只有標題與一顆按鈕的提示 Dialog（程式 `PlatformAlertDialog(title, 知道了)`）：複製 2.4.12 的 Dialog，內文槽隱藏、左側按鈕隱藏。疊在 BottomSheet 上的 Dialog，底圖保留原 BottomSheet 與遮罩，再疊第二層遮罩與 Dialog（順序：Dialog、Scrim、BottomSheet、Scrim…）。
- 全頁沒有 AppBar（師傅 2.8.1、2.8.2）：頂部固定放 StatusBar（Dark Content），底部 HomeIndicator，內容置中；頂部空白用兩層 `Spacing/48`。
- 相機預覽、簽名區這類系統輸入區沒有素材：用黑色方塊（相機）或虛線框（簽名）並在圖層名稱註明，不加程式沒有的掃描框。簽名完成的底圖用一條示意筆跡 Vector，圖層名稱註明「示意」。
- 評分用 DS `Rating`、頭像用 DS `Avatar`；評論框用 DS Card 放 `TextField`（Multi、Empty、關閉 Label 與 Helper Row）。
- BottomSheet 要貼滿 767 高時，把 BottomSheet 內層 `Content` 設 Fill、Slot 內的內容框 Fill，內建 HomeIndicator 才會貼底。

**13c 待寫規則（2026-10-07，已全部寫入 Skill：`screen-types.md` 的「卡片與資料列」三條、「訂單詳情頁」三條，`figma-notes.md` 新增「呼叫與元件操作」四條；使用者決定的項目已記進 `stage3.md` 決策）**：

- 程式裡滿版（無左右邊距、無圓角）的白底區塊，Card 用 Layout=Fill 並填滿螢幕寬，有邊距的卡片才用 Inset。同頁混用時，`Scroll Content` 左右 padding 設 0，Inset 卡片各包一層左右 `Spacing/16` 的容器（2.5.1、2.5.3 使用者修正）。程式裡的整寬白底帶（報價項目表單、分類列）都這樣處理，2.4.4、2.4.8、2.4.9 回頭改過。
- 同一組內容在三個以上畫面重複（例如訂單資訊卡）要做本機元件，不要每格複製（使用者提議，`OrderBasicInfo`）。

**13b 待寫規則（2026-10-06，已全部寫入 Skill：SKILL.md 繪製原則三條、`screen-types.md` 新增報價總覽頁、表單編輯頁、底部兩顆按鈕的選擇器 BottomSheet 三節並補背景重綁說明；使用者決定的三項記進 `stage3.md` 決策）**：

- 自排任何區塊前，先把 DS 的 Tag、TextField、Chip、Sticky Footer 這幾頁的元件清單對照一次：這次第一版自排了金額膠囊與工期欄位，Section 結束才發現 `Tag`、`TextField` 已涵蓋。「標籤加數值的膠囊」找 Tag，「有標籤的欄位」找 TextField（含 Readonly、尾端圖示）。
- BottomSheet 的底部要放兩顆按鈕時：把內層 Sticky Footer 換成 Flexible Slot 變體，Slot 裡放水平排列的兩顆 Button（DS 待辦 10 處理前的做法）。
- 本機元件裡放 DS 巢狀 instance（Tag、TextField）時，Figma 不能把巢狀文字連到本元件的屬性，值要在巢狀 instance 的屬性上改；本元件另外至少有一個自己的 TEXT 屬性，結構檢查才不會報「沒有文字屬性」。
- Plugin API：這個環境 `parent.children.indexOf(node)` 回傳 -1，找位置要用 `children.findIndex(c => c.id === node.id)`。
- 同一個畫面有多個狀態（例如單位選「台」與選「式」）時，不新增 Frame，畫資訊較多的那個狀態（選「式」，含提醒），其餘寫進紀錄；欄位錯誤同理只寫文字（2.4 使用者修正，依 `figma-build-r01.md` 暫緩表）。
- 複製畫面後，Frame 背景若綁變數，要檢查存下來的顏色值：2.4.3 綁了 `Background/Page` 但存的是黑色，畫面顯示成黑底，重新綁一次才正常。結構檢查可加一項：Frame 填色與其綁定變數的值不一致。
- 手排的列要對照程式的實際高度：Material 2 的 `IconButton` 最小 48，所以含圖示按鈕的列約 64，不是只算文字高。
- DS `TextField` 新增 `Show Helper Row` 布林（預設開）：沒有說明文字、字數、錯誤訊息的欄位要關掉，否則每個欄位下方多一列空白（2.4.4 少算 104）。長頁面改完要重算高度。
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
- **頂部共用**：AppBar（Standard／Slot／Brand）加 `SegmentedControl`（標準報價單、簡易報價單），標題「開始報價」，返回鍵，右上「讀檔」用 `IconLabelButton`＋Phosphor FloppyDisk（程式 `save_outlined`）。2.4.2 至 2.4.9 同一個頂部，只差分頁選中；浮層畫面（2.4.3、2.4.5、2.4.6、2.4.10 至 2.4.12）底圖沿用打開前的那一格。
- **底部金額列**：DS `Sticky Footer`（Button + Slot），Slot 放本機元件 `QuotationAmountBar`；「送出報價單」是 Button Primary Filled lg（程式 `NORMAL_STYLE` #1F286F）。
- **2.4.2**：畫已填寫的狀態（工期 1 天 2 時、一筆工種工程、其他工程有金額、送出鍵可按）。沒畫：沒填時送出鍵變半透明並顯示「請填寫工期」「請填寫報價單」，工期編輯模式（兩個輸入框加確認），載入中轉圈，上傳中文字「報價單上傳中...」。長頁面，高 1214（列高改 64 前是 1034）。運費列的小計為 0，所以不顯示小計。
- **2.4.3**：程式的場地、工種、設備三種新增共用同一個 BottomSheet，只畫工種（標題「請選擇工種」，水電、泥作、木作、鋁門窗、油漆、冷氣安裝、漏水）。DS BottomSheet（有標題、右上 X、Footer=Inline、無底部按鈕）加 ListItem；程式選項字 18，依 DS。
- **2.4.4**：畫「水電工程」編輯，第一個項目展開（程式預設展開第一項）、第二個收合。「代購材料」入口只在非正式環境顯示（`Config.env != PROD`），沒畫。欄位驗證的錯誤訊息沒畫（依暫緩表不拆新 Frame；程式按「確認」後空欄位一次顯示紅字「請輸入工程細項」「請選擇單位」「請輸入單價」，Figma 用 DS `TextField` 的 State=Error、Show Helper Row 開，單位欄原本 Readonly，出錯時改 Error）。TextField 都沒有說明文字與字數，Show Helper Row 一律關閉（DS 新增的布林，關掉整列才會移除），2.4.4 因此縮為 886。程式是底線輸入框，用 DS `TextField`；單位欄唯讀（State=Readonly）。長頁面，高 886（列高改 64 後加 20，關掉 TextField 空白列後減 124）。沒有底部按鈕列，底部放 HomeIndicator；「確認」在捲動內容的最下方（程式在 ListView 最後一項）。
- **2.4.5**：程式一開始沒有選中任何單位、確認鍵半透明，選了才變色；選「式」時下方出現黃色提醒。原本畫已選「台」的狀態，使用者指出「式」的提醒沒有畫；依 `figma-build-r01.md` 暫緩表「相同版型的狀態變體不拆新 Frame」，改成同一格畫選「式」（確認可按，是選「台」的超集），提醒用 DS `Banner`（Notice 淡色、Leading=Icon、Closable 關，圖示換 Phosphor Warning），放在單位分類下方、左右 16。沒畫初始狀態（沒選單位、確認鍵半透明）。BottomSheet 高度用程式的 90%（767）。單位用 DS `Chip`（Tone=info）。底部「取消」「確認」兩顆按鈕：BottomSheet 內建的 Sticky Footer 只有一顆按鈕，把內層 Sticky Footer 換成 Flexible Slot 變體，再放兩顆 Button 並排（DS 待辦 10）。取消用 Secondary Outlined，確認用 Primary Filled。
- **2.4.6**：程式的描述輸入框限制 5 個字（`maxLength: 5`）。Dialog（Standard）的內容放 DS `TextField`（不顯示標籤與說明），文字「含配線」，與 2.4.4 的描述相同。
- **2.4.7**：程式 `quotationTotal >= 5000` 才擋送出，畫 3,600（報價金額 4,347）的可送出狀態。紅字提示「報價金額超過 $5,000 時，請改用【標準報價單】報價。」程式固定放在三張卡下方，不論金額；沒畫送出鍵停用時的文案「報價金額超過$5,000請用標準報價單」。證據文件已記：程式用 `< 5000` 判斷、提示卻寫「超過」，邊界不一致。
- **2.4.8**：施工費與材料費同一個畫面，只差標題，畫施工費；價格欄值照程式顯示「2500」（沒有千分位）。
- **2.4.9**：其他工程兩個項目（耗材補充 200、現場清潔 100，合計 300 與 2.4.7 相符，都是示意）；項目名稱欄沒有標籤，照程式。
- **2.4.10 至 2.4.12**：程式用平台對話框（Android `AlertDialog`、iOS `CupertinoAlertDialog`），Figma 統一用 DS Dialog（Standard）。2.4.11 的「離開」程式是紅字，對應 Ghost Danger。2.4.12 標題三行（「您的案件收入是／NTD$12,500／確定上傳報價?」），金額是 `incomeTotal`（沒扣預扣材料費），與 2.4.2 的師傅收入相同。
- **DS 取代自排**：第一版自排了「報價金額／師傅收入」膠囊與工期欄位，Section 結束前發現 DS 的 `Tag`（Info、Emphasis Solid）與 `TextField`（Readonly＋尾端圖示）已涵蓋，已換成 DS 元件並刪除自排的工期元件。膠囊裡原本金額加粗、標籤不加粗，Tag 只有單一文字，合併成一個 Label。
- **自排（DS 沒有）**：`QuotationCategoryRow`（標題＋說明＋小計＋圖示的列）與工種工程那張卡裡的分隔線＋「新增一筆工種工程」按鈕（按鈕是 DS Button Secondary Outlined md pill）。單位選擇的「分類名稱＋Chip 換行排列」列，Chip 是 DS 的，列本身自排。
- **使用者尚未確認的新畫面類型**：報價總覽頁（2.4.2、2.4.7）、表單編輯頁（2.4.4、2.4.8、2.4.9）、底部兩顆按鈕的選擇器 BottomSheet（2.4.5）。照 Skill 應該畫第一格就停下來確認，這次一次畫完，Section 結束一起請使用者確認；確認後再補進 `screen-types.md`。

## 2.5 報價資訊與等待確認（2026-10-07）

**程式**：`master_order_quotation_accept_section.dart`、`master_order_quote_and_time_section.dart`、`master_quotation_overview_page.dart`、`master_quotation_overview_card.dart`、`quotation_items_view.dart`、`master_quotation_item_card.dart`、`quotation_submit_bottom_section.dart`、`quotation_status_map.dart`

只記例外：

- **2.5.1**：訂單沿用監視系統安裝維修那筆，頂部從 2.2.1 複製（標題「上傳報價單」是 `titleParser` 對狀態 45 的輸出，資訊卡內容與 2.2.1 相同）。報價金額 15,094、預估工期 1 天 2 時與 2.4 的報價一致。程式的兩個白底區塊（報價金額與工期、查看報價資訊與等待說明）外框都改用 DS `Card`，前者做成本機元件 `OrderQuoteTimeSummary`，後者用 `ListItem`（Trailing=Icon，有分隔線）加說明文字加 Button Secondary Filled md pill「先看其他案件」（程式 `PillButton` 160×40，寬度照 DS hug）。
- **2.5.2 示意資料**：結構表要求各筆狀態，所以一筆訂單畫五筆報價，涵蓋程式 `quotationStatusMapping` 全部狀態：客戶已同意報價（藍，即 2.4 那筆：水電工程含配線 10,500＋其他工程 2,000）、等待客戶同意報價（綠）、待審核（綠）、退件（紅）、客戶已拒絕報價（紅）。後四筆的工種與金額是示意，沒有真實來源。彙總照程式排除退件與拒絕：工期 1 天 6 小時、報價金額 17,993、師傅收入 14,900（報價金額沿用 2.4 算法，收入×1.15×1.05 取整）。**工期照程式顯示「1天 6小時」（天與小時之間一個空格），與 2.4.2 的「1 天 2 時」格式不同。**
- 2.5.2 底部是 DS `Sticky Footer`＋`QuotationAmountBar`，按鈕「已送出報價單」是 Button Primary Filled lg 的 State=disabled（DS 停用樣式）；程式是 `DISABLE_STYLE`（#1F286F 40%），照 DS。沒畫：載入中轉圈、清單為空時沒有空狀態文案。
- **2.5.3**：程式第一筆工程細項預設展開、其餘收合，用 2.4.4 的 `StandardFeeItemForm`（Expanded／Collapsed），把「刪除」鈕隱藏（唯讀頁沒有），欄位改 State=Readonly。單價照程式 `toString()` 顯示「1800」（沒有千分位）。備註欄程式在沒有備註時顯示提示字「請輸入數量」（程式文案錯誤），這格改填示意備註「200 萬畫素紅外線攝影機，含支架」避開，**備註內容是示意**。頂部分類列程式 `icon: null` 沒有箭頭，隱藏列內的 Trailing Icon。工程細項攝影機 4 台×1,800＝7,200、佈線 30 米×110＝3,300，合計 10,500 與 2.4 相同，這個分類只有這兩項。
- 2.5.2 為長頁面（高 1008）。2.5.2 五種報價狀態都是程式查詢會回傳的（查詢只排除 status -3，對照表有 -2、-1、0、1、2、3），顏色照 `_buildStatusText`。
- **使用者修正（第二輪）**：2.5.3 第 2、3 張工程細項卡也改 Layout=Fill；2.4.4、2.4.8、2.4.9 的卡片同樣改 Fill 並填滿螢幕寬（連同 2.4.5、2.4.6 的底圖一起改，「確認」鈕外層容器補左右 `Spacing/16`），高度不變。2.4.2、2.4.3、2.4.7、2.4.10 至 2.4.12 沒有改（使用者沒有指出，程式的報價分類列本來是帶邊距的卡片）。
- **本機元件 `OrderBasicInfo`**（使用者提議）：訂單資訊、客戶資訊、對話按鈕做成一個本機元件，已換進 2.2.1、2.2.3、2.3.1、2.3.2、2.5.1，各格原本的文字與未讀標記照舊。
- **發現缺格**：訂單狀態 30（等待提交報價）的畫面，標題「上傳報價單」、下方是 `MasterOrderQuotationSubmitSection`（報價金額與工期摘要、「請點選下方按鍵以進行報價」、說明「報價請盡量符合價格區間，同時注意您的案件收入」、藍色膠囊鈕「開始報價」），在結構表與 T-0102、T-0103 都沒有收錄：2.2.1 只畫共用資訊區、2.4.2 是按「開始報價」之後。待使用者決定怎麼補。
- **使用者修正**：程式裡滿版白底的區塊（2.5.1 的金額與工期區塊、查看報價資訊區塊，2.5.3 頂部的分類列）Card 用 Layout=Fill 並填滿螢幕寬，不用 Inset 留邊；同一頁其他 Inset 卡片改包一層左右 `Spacing/16` 的容器，頁面 `Scroll Content` 左右 padding 改為 0。2.5.2 的卡片在程式裡本來就有邊距（`Card` 預設 margin），維持 Inset。

## 2.4.1 上傳報價單（2026-10-07，新增）

**程式**：`master_order_detail.dart`（`titleParser`、狀態映射）、`master_order_detail_bloc.dart`、`master_order_quotation_submit_section.dart`、`master_order_quote_and_time_section.dart`

只記例外：

- **為什麼新增**：訂單狀態 ≤35（30 等待提交報價、35 報價被拒絕）顯示 `MasterOrderQuotationSubmitSection`，結構表沒收錄；2.2.1 只畫共用資訊區，2.4.2（原 2.4.1）是按「開始報價」之後。使用者決定新增一格編號 2.4.1，原 2.4.1 至 2.4.11 順移為 2.4.2 至 2.4.12，結構表（`figma-build-r01.md`）、本批紀錄、`reference.md`、`components.md`、`screen-types.md` 的師傅 2.4.x 編號已同步，Figma 的 Frame 名稱也已改。
- 版面：從 2.5.1 複製，頂部沿用 `OrderBasicInfo`，金額與工期摘要用 `OrderQuoteTimeSummary`，下方 Card（Fill／Standard）放「請點選下方按鍵以進行報價」、說明「報價請盡量符合價格區間，同時注意您的案件收入」、Button Secondary Filled md pill「開始報價」（程式 `PillButton` 160×40）。
- **金額與工期顯示 $ 0、0 天 0 時是推測**：程式用 `payment!.taxedQuotePrice!`（後端 `PriceCalculator` 對空值當 0），工期用 `?? 0`；第一次報價前後端是否一定帶出 `payment.taxedQuotePrice`，沒有核對。若是客戶拒絕報價後再進來，這裡會顯示上一筆報價的金額（`QuotationAccept` 會累加），這格畫的是第一次報價前。
- 同一個畫面也是「客戶拒絕報價」（status 35）與「客服退回報價」之後師傅看到的畫面，程式沒有另外的畫面。

## 2.6 施工與完工照片（2026-10-07）

**程式**：`master_order_work_in_progress_section.dart`、`grid_image_view.dart`、`master_order_detail.dart`、`master_order_detail_bloc.dart`

只記例外：

- **新增 2.6.1 施工進行中**：狀態 55、58 顯示 `MasterOrderWorkInProgressSection` 的預設畫面（`showUpload=false`），原結構表漏了，使用者確認新增（編號最後定為：2.6.1 施工進行中、2.6.2 施工中有未同意報價、2.6.3 施工／完工照片上傳，原刪除確認與上傳失敗兩格改沿用 2.3.3、2.3.2，見下）。標題「施工進行中」（`titleParser` 對狀態 55、58 的輸出）。畫的是客戶已同意報價、沒有未同意旗標的狀態：「查看報價資訊」列、Button Secondary Filled md pill「新增一筆報價」（程式 `PillButton` 160×40）、提醒文字（12 Medium，`Label/S`＋`Text/Hint`）、Button Primary Filled lg「上傳施工照片並驗收」。長頁面，高 881。有未同意報價的狀態另畫成 2.6.2（見下）。
- **新增 2.6.2 施工中有未同意報價**（使用者提議，後端查證）：施工中送出追加報價單後，後端把訂單標上 `UnAcceptQuotation`，客戶同意或拒絕才清除，所以只會出現在施工中。「新增一筆報價」與「上傳施工照片並驗收」都變成停用並顯示「有未同意報價」（Button 的 State=disabled，程式是淡藍 40% 與 `DISABLE_STYLE`，照 DS）。另有攔截旗標（大額訂單的追加報價，`InterceptedQuotation`）：只停用新增鈕、上傳鈕仍可按，沒畫。底部金額與工期只含已同意報價（15,094、1 天 2 時），與 2.5.2 第 2 筆「等待客戶同意報價」對應。從 2.6.1 複製，只換兩顆按鈕。
- **2.6.3 畫哪個狀態**：結構表寫「初始顯示一個＋空格」，但刪除確認需要已有縮圖、上傳失敗需要按過送出，所以畫已選 3 張的狀態（沿用 2.3.1 的 `PhotoUpload` 區塊與 2.3.1 同一做法），沒畫初始空格與送出鍵半透明停用。狀態 58 補傳時送出鍵文字是「繼續上傳施工照片」，另有「開始驗收」鍵（屬 2.7），沒畫。
- **送出鍵樣式**：程式這顆是透明底深藍框、深藍字的 `OutlinedButton`（不是 2.3.1 的實心深藍），用 Button Primary Outlined lg（DS 白底），文字「送出施工照片」。程式的上傳中文字「正在上傳照片...」沒畫。
- **刪除確認與上傳失敗不在 2.6 另畫**（使用者決定：同一個 Page 內重複的 Dialog 只留最早出現的位置）：2.3 補 2.3.3 刪除照片確認（標題「刪除照片」、內文「請確認是否刪除選取照片」，「取消」Ghost Neutral、「確認」程式是紅字所以用 Ghost Danger，底圖是 2.3.1），2.3.2 原「施工前照片上傳失敗」改名「照片上傳失敗」，兩格都在 2.3，2.6.3 只引用。我原先畫過 2.6 的兩格 Dialog，已刪除。4.4（證照上傳，另一個 Page）自有一份刪除確認（原本就有 4.4.3），批次 15 也要有上傳失敗的對應處理。結構表「共用內容」表已加一列。
- 2.6.1、2.6.2 頂部沿用 2.5.1（同一筆訂單，報價金額 15,094、工期 1 天 2 時），沿用本機元件 `OrderBasicInfo` 與 `OrderQuoteTimeSummary`。

## 2.7 驗收（2026-10-07，13d）

**程式**：`master_order_acceptance_section.dart`、`master_order_detail.dart`、`master_order_detail_bloc.dart`、`qr_code_bottom_sheet.dart`、`rounded_bottom_sheet.dart`、`bottom_sheet_header.dart`

只記例外：

- **2.7.1**：從 2.6.1 複製，標題「完工驗收」（`titleParser` 對狀態 60 的輸出），資訊卡與金額工期摘要沿用同一筆訂單。「查看報價資訊」列下方放提示區（程式 16 Medium 深藍 `Label/L`＋`Text/Brand`、12 灰說明 `Body/XS`＋`Text/Hint`，置中）與 Button Secondary Filled md pill「完成驗收」（程式藍底圓角 25，對應 DS pill），卡片下方 12 的說明文字沿用頁面間距 `Spacing/16`。畫的是進入驗收階段、客戶**還沒選驗收方式**的狀態：「完成驗收」按鈕停用（Secondary Filled md pill、State=disabled，實機是淡藍 40%，照 DS 停用樣式），沒有進入提示。使用者用實機確認過（2026-10-07）。我讀程式與後端時以為空值會被當成 0（直接驗收）而讓按鈕可按，實機並非如此，**我沒有查出停用的實際路徑**（程式 `acceptanceBy ?? 0` 與 `method != -1` 照字面看不會停用，後端也沒有寫入 -1 的地方，可能是 Firestore 預設值或我沒讀到的程式），以實機為準。客戶選定方式後的畫面是 2.7.2 以後的各格（按鈕可按，底圖是按鈕可按版本）。長頁面，高 863。
- **狀態映射核對**（開始前）：程式在進入狀態 60 時，依客戶選的方法自動跳出提示（`master_order_detail.dart` 的 listener）：QR 碼「客戶選擇以行動條碼進行驗收」、簽名「客戶選擇以簽名方式進行驗收」、直接「客戶選擇直接驗收」，按鈕都是「知道了」；按下「完成驗收」時直接驗收會再跳一次同樣的提示。結構表 2.7.6 只收直接驗收這句，另兩句版型完全相同，依暫緩表原本只在 2.7.6 記文字，使用者看過後決定三種方式各自成流程、拆成獨立 Frame（見下方編號調整）。
- **2.7.3（舊稱 2.7.2）**：BottomSheet（有標題「掃描行動條碼」、右上 X、Footer=Inline、不放底部按鈕），高度照程式 `RoundedBottomSheet` 的 90%（767）。標題下方 `Spacing/48`（程式 50）接相機預覽，預覽為 393×393 正方形（程式 `height = 螢幕寬`），下方藍字「請掃描客戶端行動條碼以完成驗收」（`Body/S`＋`Text/Link`）。相機畫面是系統鏡頭，沒有素材，用 `Base/Black` 黑色方塊，圖層名稱「相機預覽（系統畫面，待補）」。底圖沿用 2.7.1 第一屏（長頁面 863 的第一屏，Frame 852）。
- **編號調整（使用者決定）**：三種驗收方式是各自的流程，所以 2.7 拆成 9 格：新增 2.7.2、2.7.6（進入提示的 QR 與簽名版）與 2.7.8（簽名確認，底圖是簽名板），原 2.7.2 至 2.7.6 順移（QR 掃描 2.7.3、無效 2.7.4、QR 確認 2.7.5、簽名 2.7.7、直接驗收 2.7.9）。Flutter repo 的 T-0104 與 `evidence/index.md` 仍是舊編號，對照時 2.7.2 起要對照新表。結構表 `figma-build-r01.md` 已同步。
- **2.7.2、2.7.6、2.7.9 進入提示**：程式 `master_order_detail.dart` 的 listener，進入狀態 60 時用 `PlatformAlertDialog` 顯示（只有標題與「知道了」）。Dialog（Standard）隱藏內文與左側按鈕，底圖沿用 2.7.1。2.7.9 同時涵蓋按下「完成驗收」時的同文字提示。
- **2.7.4、2.7.5**：底圖是 2.7.3 的掃描 BottomSheet 加遮罩，再疊第二層遮罩與 Dialog。無效提示標題照程式文字「無效的QrCode,請重新掃描」（含半形逗號與英文），按鈕「確認」。QR 確認按下後標題會變成「正在完成驗收...」（打字動畫），沒畫。
- **2.7.7**：BottomSheet（標題「簽名驗收」、右上 X）高 767，內容：藍字「請客戶於下方虛線框中簽名」、簽名區（虛線框，1px 虛線 `Text/Primary` 綁定，程式 `DottedBorder` 預設黑色）、「清除」Button Secondary Outlined sm pill、下方送出鍵。畫的是開啟時的空白狀態：送出鍵 Primary Filled State=disabled，文字「請於上方虛線框中簽名」（程式半透明 `DISABLE_STYLE`，照 DS）。程式 `Expanded(flex: 5)` 讓簽名區吃掉剩餘高度，Figma 用 Fill。程式底部空 50，Figma 內容底部 `Spacing/16`＋BottomSheet 內建 HomeIndicator。
- **2.7.8**：底圖是簽名完成的狀態：簽名區放一條示意筆跡（Vector，`Text/Primary` 綁定 3px 圓端，圖層名「簽名筆跡（示意）」，是示意不是真實簽名），送出鍵換成 Primary Filled「送出簽名」。程式按下後先開確認，確認後才上傳，處理中文字「正在完成驗收...」沒畫。
- **簽名區與相機預覽都沒有素材**，相機預覽沿用 2.7.3 的黑色方塊（使用者確認維持）。
- **2.6.4 開始驗收**（使用者提出，程式查證）：`MasterOrderWorkInProgressSection` 在 `showUpload` 且狀態為 `PENDING_START_ACCEPTANCE`（58）時，上傳表單多出「開始驗收」按鈕（`NORMAL_STYLE` 深藍），原送出鍵文字變成「繼續上傳施工照片」。從 2.6.3 複製，畫的是照片送出後（程式送出成功會清空已選照片）：照片格只剩「＋」新增格，「繼續上傳施工照片」Primary Outlined State=disabled（程式是淡藍框，照 DS 停用樣式），「開始驗收」Primary Filled lg，兩顆間距 `Spacing/8`。長頁面，高 923。程式沒有已選照片時「開始驗收」仍可按。
- **2.8.1**：程式 `MasterOrderDetailFinishPage` 沒有 AppBar，Frame 頂部只放 StatusBar（Dark Content），底部 HomeIndicator。程式頂部空 150（含狀態列），Figma 用兩層 `Spacing/48`（96）加狀態列 59，近似。插圖 `acceptance_success.png`（633×633）程式左右各留 80，顯示 233×233，沒有向量，留粉紅佔位「插圖佔位（待補）」。提醒框（程式 1px 灰框圓角 5 內距 12 左右邊距 36）：邊線 `Border/Subtle`（#9E9E9E 與程式 Colors.grey 相同）、圓角 `Radius/4`、內距 `Spacing/12`、左右邊距 `Spacing/32`（36 沒有 token）。字級程式 12 預設色，用 `Body/XS`＋`Text/Primary`。按鈕「為客戶評分」Primary Filled lg、「暫時跳過」Secondary Outlined lg（程式白底藍框藍字）。標題 20 Medium 對 `Heading/4`。系統商店評分視窗屬外部邊界，不畫。
- **2.8.2**：同樣沒有 AppBar，用 StatusBar。頭像 DS Avatar 100（Source=custom，程式 `HeadshotImage` 100，無頭像時是預設頭像）、姓名「王先生」（`clientUserObscureName`，與 2.2.1 一致，**組法沒有核對**）`Title/M`、DS `Rating`（Size=lg、Rate=5，程式 itemSize 24，Figma 元件高 24 相同）。評論框程式是 `Card` 內無框 `TextField`，Figma 用 DS Card（Inset／Standard）放 `TextField`（Multi、Empty，關閉 Label 與 Helper Row，提示字「寫點評論吧...」）：DS TextField 自帶底線，程式沒有。程式 maxLines 5，DS TextField Multi 高 80。「此評價不會對客戶公開」12 Medium 深藍 `Label/S`＋`Text/Brand`，靠右。送出鍵 Primary Filled lg（評分為 0 時才半透明，預設 5 星所以可按）。送出中文字「正在上傳評論...」沒畫；半星評分只記文字（最低 1 星）。鍵盤沒畫。

## 批次 13d 驗收（2026-10-07）

- 結構檢查：2.6.4、2.7.1 至 2.7.9、2.8.1、2.8.2 共 12 格通過（Frame 缺漏、尺寸、三區結構、HomeIndicator、浮層順序、文字覆寫、佔位字都沒有問題）；只剩 Frame 自己的描邊與插圖佔位色未綁變數，沿用既有慣例。
- 內容核對：每格的文字傾印與畫之前列的內容清單一致。2.7.1 的停用按鈕經使用者實機確認。
- 使用者確認：12 格畫面都沒問題。

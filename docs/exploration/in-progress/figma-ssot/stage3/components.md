# 階段 3 元件狀況與候選

記錄畫面填入時的元件缺口、重複區塊與重複出現的組合。到檢查點再決定哪些元件候選以 `/sanji` 升級進 Design System，哪些 pattern 候選以 `/sanji pattern` 寫進 `docs/design-system/patterns/`。

---

## 元件狀況

- 檢查點 1、2 與兩次 DS 升級已把 `PhotoViewer`、`VoiceCallScreen`、`Carousel`、`EmptyState`、`PriceRangeIndicator`、`WarrantyPill`、`Calendar`、`WheelPicker` 升級進 DS，並擴充了 BottomSheet、Sticky Footer、ListItem、Button，淘汰 375 系統列。經過與原文見 [decisions.md](decisions.md) 最後一節。
- DS 檔案只剩 StepIndicator 頁沒有元件；訂單進度畫面若需要，記 DS 待辦。
- `docs/design-system/INDEX.md` 寫 ChatAppBar、ChatBackground「Figma 尚未建立正式 Component」，但 Figma Chatroom 頁已有這兩個元件組，待確認並更新索引。

---

## 元件候選

| 候選 | 出現位置 | 狀態 |
|---|---|---|
| 通話畫面（`VoiceCallScreen`，撥出中、通話中） | 客戶端 6.3、師傅端 5.3、管理員端 1.3.1、1.3.2 | 已升級進 DS（檢查點 1）。四種聊天室共用同一個頁面 `IOSCallerControlPage`，三個 App 檔案相同 |
| 全螢幕照片檢視（`PhotoViewer`） | 管理員 1.2.4、1.2.6；客戶 5.1.4、6.1.5、6.1.7；師傅 5.1.4、5.1.6；程式另有 `horizontal_image_list`（可能是訂單照片，不能下載） | 已升級進 DS（檢查點 1），見 DS 待辦 2 |
| 聊天室列表列（`AdminChatroomListItem`） | 管理員端 1.1.1（同畫面重複 8 次） | 不升級，維持本機元件（檢查點 1）。客戶端、師傅端沒有聊天室列表，只有管理員 1.1.1 用到 |
| 適合案件卡（`MasterSuitableOrderCard`，左側黃條） | 師傅端 1.1.1、1.1.3 | 維持本機元件（檢查點 2）。程式只有師傅首頁用到；客戶端是否有同樣的案件摘要卡，客戶端批次再判斷 |
| 進行中案件卡（`MasterInProgressOrderCard`，左側藍條＋紅色狀態＋未讀點） | 師傅端 1.1.1、1.1.2 | 維持本機元件（檢查點 2）。訂單列表（師傅端 2.1.1）用的是另一個 widget `MasterOnGoingOrderCard`，批次 13a 比較後不合併：版型不同（首頁窄卡 vs 整列寬卡），見下一列 |
| 訂單列表卡內容（`OrderListCardBody`，標題列＋狀態＋三列資料框；Type=OnGoing／Warranty，程式 `MasterOnGoingOrderCard`、`MasterWarrantyOrderCard`），外框用 DS `Card` | 師傅端 2.1.1、2.1.3；程式的客戶端訂單列表（客戶端 3.1）可能有相似卡，客戶端批次再判斷 | 本機元件（批次 13a）。目前只有師傅訂單列表用，先不升級。若升級進 DS，需把外框一起做進元件並用 Slot 以外的方式帶文字屬性，因為 Figma 不允許在元件裡把 Card 內部文字連到屬性 |
| 案件分類卡（`OrderCategoryCard`，黃色直條＋類別名＋保固徽章） | 師傅 1.2.1 至 1.2.5、2.2.2（批次 13a 複製進 2.x 的本機元件） | 維持本機元件（檢查點 2）；兩個師傅 Page 都在用，客戶端服務詳情若再出現就建議升級進 DS。客戶端服務詳情頁（`WorkingCategoryDetail`）頂部有類似版本但多一段描述，客戶端批次再判斷是否合併 |
| 價格區間指示條（`PriceRangeIndicator`）、保固膠囊（`WarrantyPill`） | 師傅 1.2.1 至 1.2.5；程式另用在客戶端服務詳情（`WorkingCategoryDetail`，確認與查看工項兩頁），保固膠囊也用在客戶端保固訂單卡 | 已升級進 DS（DS 升級，2026-10-06），分成兩個元件放 DS 的 Service 頁，見 DS 待辦 6 |
| 報價類別列（`QuotationCategoryRow`，標題＋說明＋小計＋箭頭／加號；程式 `QuotationCategoryCard`），外框用 DS `Card` | 師傅 2.4.2、2.4.4、2.4.7、2.4.9；師傅 2.5.2 報價總覽（`MasterQuotationOverviewCard`）、客戶端報價頁（`client_quotation_card`）可能相似，後續批次再判斷 | 本機元件（批次 13b）。2.5 也出現就建議升級進 DS（需決定與 `ListItem` 的關係：ListItem 只有單行標題與右側圖示）。使用者決定維持本機元件、不改用 `ListItem`（ListItem 放不下標題旁的小字說明，字級也不同）；列高改為 64（上下 8＋右側箭頭點擊區 48，程式用 Material 2 的 `IconButton`，最小 48），原本的 44 偏矮 |
| 訂單資訊卡內容（`OrderBasicInfo`：工項、場勘／施工時間＋查看需求、客戶資訊＋導航、與客戶對話按鈕＋未讀標記；程式 `MasterOrderBasicInfoCard`），放在 AppBar 延伸區的 DS `Card` | 師傅 2.2.1、2.2.3、2.3.1、2.3.2、2.3.3、2.4.1、2.5.1、2.6.x，2.7、2.8 繼續用 | 本機元件（批次 13c，使用者提議）。TEXT：Category、Date、Customer Name、Address；BOOLEAN：Has Unread。客戶端訂單資訊頁（批次 05）若有相似卡片再判斷 |
| 報價金額與預估工期摘要（`OrderQuoteTimeSummary`，兩個 DS `Tag`＋提示文字＋分隔線；程式 `MasterOrderQuoteAndTimeSection`），外框用 DS `Card`（Fill／Standard） | 師傅 2.4.1、2.5.1、2.6.1、2.6.2、2.6.3，2.7 可能也用 | 本機元件（批次 13c），暫不升級。與 `QuotationAmountBar` 結構相近（左邊都是報價金額 Tag），差在右邊是預估工期 |
| 報價金額列（`QuotationAmountBar`，兩個 DS `Tag`＋提示文字＋分隔線，放進 DS `Sticky Footer`） | 師傅 2.4.2、2.4.7；程式的 `QuotationSubmitBottomSection` 只有送出報價用到，客戶端報價頁底部若有相同金額列再判斷 | 本機元件（批次 13b），暫不升級 |
| 其他工程項目表單（`OtherFeeItemForm`，標題列＋刪除＋名稱、價格兩個 `TextField`） | 師傅 2.4.9（兩次） | 本機元件（批次 13b），暫不升級 |
| 標準報價項目表單（`StandardFeeItemForm`，variant State=Expanded／Collapsed；展開：標題列＋刪除＋細項、數量、單位、單價、備註五個 `TextField`＋複價；收合：標題列＋刪除＋細項名稱＋複價；程式 `StandardFeeEditForm`），外框用 DS `Card` | 師傅 2.4.4（展開、收合各一）、2.4.5、2.4.6 的底圖；師傅 2.5.3 報價明細（`master_quotation_item_card`）可能有相同卡片，後續批次再判斷 | 本機元件（批次 13b 使用者確認後補做）。屬性：TEXT Subtotal、Item Name（只用在收合）。2.5 也出現就建議升級進 DS |
| 輪播 Banner（`CarouselBanner`） | 師傅 1.1.1 至 1.1.5、1.3.1；程式的 `CarouselBannerSwiper` 也用在客戶端首頁 | 已升級進 DS 為 `Carousel`（DS 升級，2026-10-06），放 DS 的 Carousel 頁，見 DS 待辦 7。DS 既有的 `Banner` 是通知提示框，不能取代 |
| 首頁空狀態（`MasterHomeEmptyState`，圖示＋標題＋提示） | 師傅端 1.1.2、1.1.3；程式另有師傅收入頁、客戶端媒合失敗頁兩處空狀態 | 已改做成通用的 DS `EmptyState`（DS 升級，2026-10-06），Size=Compact 涵蓋師傅首頁與收入頁，Page 涵蓋客戶端媒合失敗頁，見 DS 待辦 8 |
| 收入明細列（`IncomeListItem`，Status=Unpaid／Paid，TEXT 屬性 Item、Amount、Date；程式 `IncomeListItem`） | 師傅 3.1.1、3.2.1 | 本機元件（批次 14），只有收入頁用，暫不升級 |
| 日期時間選擇面板（`DatePickerPanel`：月份標題與上下月箭頭、星期列、日期格，加「時間」標籤與三欄滾輪（時、分、上下午）；程式 `DateSelectBottomSheet`），放進 DS `BottomSheet` 的 Slot | 師傅 5.1.7；客戶端 6.1 對話的約施工時間（`ChatroomInputBar` 同一個元件）也會用到 | 已升級進 DS 為 `Calendar`＋`WheelPicker`（DS 升級 2，2026-10-08），放 DS 的 DatePicker 頁，見 decisions.md |
| 訂單進度通知列（`OrderNotificationItem`，TEXT 屬性 Title、Content、Time；程式 `OrderNotification`）與系統通知列（`SystemNotificationItem`，variant Expanded，TEXT 屬性加 Has Image 布林；程式 `SystemNotification`） | 師傅 6.1.1、6.1.2；客戶端 4.1.1、4.1.2 用同一個程式 widget | 本機元件（批次 17），客戶端批次 06 畫到時再判斷是否升級進 DS |
| 首次介紹頁分頁圓點（`IntroDots`，variant Page=1 至 5；10px 灰圓點，目前頁為 22×10 深藍藥丸；程式 `introduction_screen` 的 `DotsDecorator`） | 客戶端 1.2.1 至 1.2.5 | 本機元件（批次 03a，使用者決定：不拆成 DS 元件，只做本機元件）。與 DS `Carousel` 的 8px 圓點規格不同，不合併 |
| 月收入長條圖（五根長條＋金額＋月份，程式 `fl_chart` 的 `BarChart`）：DS 沒有圖表元件，自排 | 師傅 3.1.1（客戶端、管理員端目前沒有圖表） | 自排（批次 14），只出現一處，暫不升級；若之後有第二個圖表再討論 |
| 六格驗證碼輸入（`PinInput`，variant Content=Empty／Filled，6 個 40×50 方框；程式 `pin_code_fields` 的 `PinCodeTextField`） | 客戶端 1.4.1 至 1.4.3 | 本機元件（批次 03b）。DS 沒有驗證碼輸入元件；之後若有其他驗證碼畫面再討論是否升級 |
| 中類列表列（`CategoryRow`，TEXT 屬性 Name、Count，右側圖片；程式 `L2Card`） | 客戶端 2.3.1（同畫面 5 次） | 本機元件（批次 04a），只有分類瀏覽用，暫不升級 |
| 工項卡內容（`L3CardContent`，圖片＋左下保固徽章＋名稱＋說明；TEXT 屬性 Name、Description，徽章在巢狀 `CornerBadge` 上改 Label；程式 `L3Card`），外框用 DS `Card` | 客戶端 2.2.3、2.3.2、2.3.3 | 本機元件（批次 04a） |
| 工項詳情頂部卡內容（`CategoryInfo`，TEXT 屬性 Name、Description，右下絕對定位 `CornerBadge`；程式 `WorkingCategoryDetail` 的 `StackSliverAppBar`），放在 AppBar（Tall／Overlay／Image）延伸區的 DS `Card` | 客戶端 2.4.1、2.4.2 | 本機元件（批次 04a，使用者選 A 並要求做成本機元件）。與師傅端 `OrderCategoryCard`（黃色直條）版型不同，客戶端沒有直條，名稱用 `Heading/3`、多一段說明，不合併；是否升級進 DS 檢查點再決定 |
| 首頁訂單摘要列（`HomeOrderSummary`，variant State=Collapsed／Expanded，TEXT Count、BOOLEAN Has Important）、訂單列（`HomeOrderRow`，TEXT 屬性 Name、Status，BOOLEAN Has Divider；程式 `_buildOrder`）、下單流程步驟內容（`ProcedureStepContent`，TEXT Description，插圖佔位） | 客戶端 2.1.2、2.1.3 | 本機元件（批次 04a）。另有依使用者要求拆出的靜態內容區塊：`HomeSearch`、`HomeServiceEntry`、`HomeArticles`、`HomeGuarantees`、`ProcedureList`、`SearchRow`、`HotKeywords`、`PriceWarranty`、`FeeDescription`，用來讓多個畫面共用同一份內容 |
| 可橫向捲動的頁籤列（大類頁籤，選中為藍字加 3px 底線；程式 `SelectL1L2DisplaySection`） | 客戶端 2.3.1 | 自排（批次 04a），DS 沒有可捲動的頁籤元件，見 DS 待辦 14 |

## pattern 候選

畫圖時發現**兩個以上元件**的組合重複用來解決同一個問題，就記一行；已有的候選只在「出現位置」補上新的 Frame。到檢查點時，跨兩個以上檔案出現的候選以 `/sanji pattern` 寫成文件（見 [decisions.md](decisions.md) 2026-10-06 決策與檢查點 2 的修正）。單一元件的用法規則不算 pattern，補進該元件的規格文件。做法細節見 fill-figma-ssot Skill 的 `references/screen-types.md`。

| 候選 | 組合 | 解決的問題 | 出現位置 | 狀態 |
|---|---|---|---|---|
| 動作選單 | BottomSheet（無標題、Footer=Inline、拖曳把手）＋ ListItem 選項＋ Ghost Neutral「取消」 | 從幾個動作中選一個，可以不選直接取消 | 管理員 1.2.3 | 候選 |
| 確認對話框 | Dialog（Standard）＋遮罩；次要按鈕在左、主要在右，破壞性動作用 Ghost Danger，只有告知時保留一顆主要按鈕 | 執行單一動作前的確認，或需要使用者知悉的提示 | 管理員 1.2.5、1.3.3、2.2.1、2.3.1；師傅 1.1.4、1.1.5、1.2.2 至 1.2.5、1.3.1 | 不寫成 pattern（檢查點 2）：只有單一元件，規則已補進 `docs/design-system/components/dialog.md` |
| 一般資料頁 | 三區結構＋區段（`Heading/4` 標題＋ Card 包 ListItem 或全寬 Button lg），區段間 `Spacing/16` | 把設定入口與帳號操作分組呈現 | 管理員 2.1.1 | 候選 |
| 全螢幕媒體 | 單一個撐滿 Frame 的 DS 元件（`PhotoViewer`、`VoiceCallScreen`），黑底或模糊照片背景、控制鍵疊在上方 | 沉浸式的全螢幕內容（看照片、傳照片前確認、通話） | 管理員 1.2.4、1.2.6、1.3.1、1.3.2 | 候選 |
| 表單編輯頁 | 三區結構＋ DS `Card`（Standard）包 `TextField` 欄位組（標題列＋刪除 Button）＋全寬 Button Primary Filled lg「確認」 | 使用者一次填多筆有欄位的資料，確認後回上一頁 | 師傅 2.4.4、2.4.8、2.4.9 | 候選 |
| 選項清單 BottomSheet | BottomSheet（有標題＋右上 X）＋ ListItem 選項，沒有底部按鈕，點選項即選定 | 從一組固定選項選一個，立即生效 | 師傅 2.4.3 | 候選，和動作選單同樣是 BottomSheet＋ListItem，差別在有標題、無取消，寫文件時可能合併 |
| 登入表單頁 | AppBar（Tall／Overlay／Brand，標題加副標）＋ Card（Inset）放 `TextField`／`PasswordField`／驗證碼輸入＋全寬 Button Primary Filled lg「下一步」 | 登入流程中一步輸入一項資料，白卡疊在黃色頂部下緣 | 客戶端 1.3.2 至 1.3.5、1.4.1 至 1.4.3（1.5、1.6 預期也會用） | 候選 |
| 空狀態 | 置中圖示＋一行標題＋一行提示文字（`Label/S`＋`Text/Hint`） | 清單區沒有資料時，說明原因與下一步 | 師傅 1.1.2、1.1.3 | 改做成 DS 元件 `EmptyState`（檢查點 2），不再列為 pattern |

---

## DS 待辦

階段 3 畫圖時發現、要回 DS 檔案處理的事，由 Opus 在檢查點或 DS 升級時處理；新元件或規格變動要先跑 `/sanji` 備料，再用 `/write-doc`、`/archive-doc` 寫進 `docs/design-system/`。完成的項目移到 [decisions.md](decisions.md)。

| # | 項目 | 內容 | 狀態 |
|---|---|---|---|
| 9 | `PhotoUpload` 支援寬度填滿 | 程式的照片格是 4 欄、格子填滿一列（隨螢幕寬度縮放），DS 的 `PhotoUpload` 固定 80×80，一列放 4 格會超出（4×80＋3×4＝332，頁面邊距加卡片內距後只有 329）。師傅 2.3.1 暫時用 `resize()` 把每格縮到約 78.75、間距 `Spacing/4`。建議：元件支援水平 Fill 並保持 1:1，圖片與刪除圖示跟著縮放。2026-10-06 使用者同意先用縮小格子，DS 之後處理 | 待處理 |
| 13 | `PasswordField` 加 Show Helper Row | 沒有說明文字或錯誤時，元件仍保留說明列的高度（隱藏文字但佔位），卡片底部多一段空白（客戶端 1.3.4 的卡片比程式高約 18）。`TextField` 已有 Show Helper Row，建議 `PasswordField` 同樣支援 | 待處理 |
| 14 | 可橫向捲動的頁籤列（Tabs） | 客戶端 2.3.1 的大類頁籤項目數不固定、可橫向捲動，選中項文字與 3px 底線為藍色。DS 只有 2 至 3 格的 `SegmentedControl`，沒有頁籤列。本批自排（`L1 Tabs`）。建議新增 `Tabs` 元件：項目為 TEXT、Selected 狀態、可橫向溢出 | 待處理 |
| 15 | `Card` 支援滿版背景圖 | 客戶端 2.1.1「我們如何提供您可靠的服務？」卡片有滿版背景圖 `provider_reliable_service_bg.png`。DS `Card` 的 Slot 只覆蓋內距以內，不是整張卡，所以本批改做成本機元件 `HomeBrandCard`（不套 Card）。若之後有第二處需要背景圖卡片，建議 Card 加 `Background Image` 外露圖層 | 暫不處理（本機元件已解決，使用者決定，批次 04a） |

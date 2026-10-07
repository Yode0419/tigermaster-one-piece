# 階段 3 元件狀況與候選

記錄畫面填入時的元件缺口、重複區塊與重複出現的組合。到檢查點再決定哪些元件候選以 `/sanji` 升級進 Design System，哪些 pattern 候選以 `/sanji pattern` 寫進 `docs/design-system/patterns/`。

---

## 元件狀況

**管理員端需要的元件，Figma 都已有**：BottomNavBar（Admin）、AppBar、ListItem、Avatar、Badge、ChatAppBar、ChatBackground、MessageBubble、ChatInputBar、BottomSheet、Dialog、StatusBar、HomeIndicator。

**Design System 檔案中的空白頁**：只剩 StepIndicator 頁沒有元件，訂單進度相關畫面可能需要用到，輪到這些 Page 之前要先確認是否補建。EmptyState、Carousel 兩頁已在 DS 升級補建（2026-10-06）。

**DS 升級（2026-10-06）**：`Carousel`、`EmptyState`、`PriceRangeIndicator`、`WarrantyPill` 升級進 DS（後兩者放新增的 Service 頁），新增原始色 `PriceGradient/Light`、`PriceGradient/Deep`。師傅 1.1.x、1.2.x、1.3.1 已換成 DS 版本，舊的本機元件已刪除。規格見 `docs/design-system/components/` 的 carousel.md、empty-state.md、price-range-indicator.md、warranty-pill.md。

**BottomSheet 已擴充（2026-10-05）**：原本底部按鈕區只能絕對定位貼底，內容短時會蓋住內容。已新增 Footer variant（Sticky／Inline）與 hasDragHandle，`hasStickyFooter` 改名為 `hasFooter`，規格見 `docs/design-system/components/bottom-sheet.md`。

**沒有 iOS 動作選單元件**：程式多處使用 CupertinoActionSheet，依決策改用 BottomSheet（Footer=Inline、拖曳把手）+ ListItem + Ghost Neutral「取消」，不另建元件。

**ListItem 已擴充（2026-10-05）**：新增 State variant（default／pressed，按下底色 `Overlay/Pressed/Neutral` 12%），左右 `Spacing/16` 收進元件，分隔線內縮。規格見 `docs/design-system/components/list-item.md`。

**Button 的 Outlined 加白底（2026-10-05）**：Primary、Secondary、Neutral Outlined 共 54 個 variant 最底層加 `Background/Surface`，按下狀態的 12% 疊色保留在上層。規格見 `docs/design-system/components/button.md`。

**Button lg 高度改為 48（2026-10-05）**：54 個 lg variant 加最小高度 `Spacing/48`，內距不變，內容垂直置中；原本一個高度固定 44 的 variant（Primary Filled／rect／default）改為依內容撐開。

**PhotoViewer、VoiceCallScreen 升級進 DS（2026-10-05）**：PhotoViewer 放 Image 頁，下載鍵移出 AppBar 做成 Has Download；VoiceCallScreen 放 Chatroom 頁，結構照本機元件。規格見 `docs/design-system/components/photo-viewer.md`、`voice-call-screen.md`。

**StatusBar、HomeIndicator 只保留 393（2026-10-05）**：StatusBar 刪除 375 變體並拿掉 Frame Group 屬性，HomeIndicator 改為 393 寬，放入時不必再手動拉寬。

**文件與 Figma 不一致**：`docs/design-system/INDEX.md` 寫 ChatAppBar、ChatBackground「Figma 尚未建立正式 Component」，但 Figma Chatroom 頁已有這兩個元件組，待確認是否完成並更新索引。

---

## 元件候選

| 候選 | 出現位置 | 狀態 |
|---|---|---|
| 通話畫面（`VoiceCallScreen`，撥出中、通話中） | 客戶端 6.3、師傅端 5.3、管理員端 1.3.1、1.3.2 | 已升級進 DS（檢查點 1）。四種聊天室共用同一個頁面 `IOSCallerControlPage`，三個 App 檔案相同 |
| 全螢幕照片檢視（`PhotoViewer`） | 管理員 1.2.4、1.2.6；客戶 5.1.4、6.1.5、6.1.7；師傅 5.1.5、5.1.7；程式另有 `horizontal_image_list`（可能是訂單照片，不能下載） | 已升級進 DS（檢查點 1），見 DS 待辦 2 |
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

---
| 收入明細列（`IncomeListItem`，Status=Unpaid／Paid，TEXT 屬性 Item、Amount、Date；程式 `IncomeListItem`） | 師傅 3.1.1、3.2.1 | 本機元件（批次 14），只有收入頁用，暫不升級 |
| 月收入長條圖（五根長條＋金額＋月份，程式 `fl_chart` 的 `BarChart`）：DS 沒有圖表元件，自排 | 師傅 3.1.1（客戶端、管理員端目前沒有圖表） | 自排（批次 14），只出現一處，暫不升級；若之後有第二個圖表再討論 |

## pattern 候選

畫圖時發現**兩個以上元件**的組合重複用來解決同一個問題，就記一行；已有的候選只在「出現位置」補上新的 Frame。到檢查點時，跨兩個以上檔案出現的候選以 `/sanji pattern` 寫成文件（見 [stage3.md](stage3.md) 2026-10-06 決策與檢查點 2 的修正）。單一元件的用法規則不算 pattern，補進該元件的規格文件。做法細節見 fill-figma-ssot Skill 的 `references/screen-types.md`。

| 候選 | 組合 | 解決的問題 | 出現位置 | 狀態 |
|---|---|---|---|---|
| 動作選單 | BottomSheet（無標題、Footer=Inline、拖曳把手）＋ ListItem 選項＋ Ghost Neutral「取消」 | 從幾個動作中選一個，可以不選直接取消 | 管理員 1.2.3 | 候選 |
| 確認對話框 | Dialog（Standard）＋遮罩；次要按鈕在左、主要在右，破壞性動作用 Ghost Danger，只有告知時保留一顆主要按鈕 | 執行單一動作前的確認，或需要使用者知悉的提示 | 管理員 1.2.5、1.3.3、2.2.1、2.3.1；師傅 1.1.4、1.1.5、1.2.2 至 1.2.5、1.3.1 | 不寫成 pattern（檢查點 2）：只有單一元件，規則已補進 `docs/design-system/components/dialog.md` |
| 一般資料頁 | 三區結構＋區段（`Heading/4` 標題＋ Card 包 ListItem 或全寬 Button lg），區段間 `Spacing/16` | 把設定入口與帳號操作分組呈現 | 管理員 2.1.1 | 候選 |
| 全螢幕媒體 | 單一個撐滿 Frame 的 DS 元件（`PhotoViewer`、`VoiceCallScreen`），黑底或模糊照片背景、控制鍵疊在上方 | 沉浸式的全螢幕內容（看照片、傳照片前確認、通話） | 管理員 1.2.4、1.2.6、1.3.1、1.3.2 | 候選 |
| 表單編輯頁 | 三區結構＋ DS `Card`（Standard）包 `TextField` 欄位組（標題列＋刪除 Button）＋全寬 Button Primary Filled lg「確認」 | 使用者一次填多筆有欄位的資料，確認後回上一頁 | 師傅 2.4.4、2.4.8、2.4.9 | 候選 |
| 選項清單 BottomSheet | BottomSheet（有標題＋右上 X）＋ ListItem 選項，沒有底部按鈕，點選項即選定 | 從一組固定選項選一個，立即生效 | 師傅 2.4.3 | 候選，和動作選單同樣是 BottomSheet＋ListItem，差別在有標題、無取消，寫文件時可能合併 |
| 空狀態 | 置中圖示＋一行標題＋一行提示文字（`Label/S`＋`Text/Hint`） | 清單區沒有資料時，說明原因與下一步 | 師傅 1.1.2、1.1.3 | 改做成 DS 元件 `EmptyState`（檢查點 2），不再列為 pattern |

---

## DS 待辦

階段 3 畫圖時發現、要回 DS 檔案處理的事。建議在檢查點 1 前後一起處理，完成後在此標記並更新 DS 文件。

| # | 項目 | 內容 | 狀態 |
|---|---|---|---|
| 1 | 接回 Phosphor 圖示庫 | DS 的 icon 元件引用的 Phosphor 元件顯示「Component removed from library」，既有圖示仍能顯示，但無法替換或新增。使用者把 Phosphor Icons（2.1，1,512 icons × 6 weights）復原到團隊的 Design System 資料夾並重新發布（2026-10-05）。復原後元件 Key 與原本相同（例如 Smiley Outline Regular 仍是 `c90b73f1…`），既有引用直接接回，不需要 Swap library。圖示庫已可用搜尋找到 | 已完成 |
| 2 | `PhotoViewer` 升級進 DS | 以 `/sanji` 升級。建議屬性：Has Send（右下傳送鍵）、Has Download（右上下載鍵）、Photo（外露 Image，可換照片或切載入中、失敗）。Has Download 的做法待使用者決定：A. 維持外露 AppBar 切 Has Action；B. 下載鍵移出 AppBar、放在元件本身那層疊在右上，才能做成真正的開關（Claude 建議 B）。使用者選 B，已建立於 DS 的 Image 頁 | 已完成 |
| 3 | 1.2.6 下載鍵換圖示 | 已把 1.2.6 下載鍵的 Smiley 佔位換成 Phosphor DownloadSimple（Regular、`Icon/Inverse`）。下載鍵在外露 AppBar 的 Slot 裡，不在 `PhotoViewer` 元件中；2 升級時若採做法 B，要把這顆鍵移進元件 | 已完成 |
| 4 | 375 系統列淘汰 | 依 [layout.md](../../../../design-system/tokens/layout.md)，目標全面使用 393。StatusBar 刪除 Frame Group=375 兩個變體並拿掉只剩一個值的 Frame Group 屬性；HomeIndicator 目前只有 375 寬，改為 393（現在每次放入都要手動拉寬）。刪除前已確認 DS 與三個 App 檔案（含 Archive、舊檔案頁）都沒有引用 375 變體；兩個 375 變體已刪除、Frame Group 屬性已拿掉，HomeIndicator 已改 393 寬 | 已完成 |
| 5 | 通話畫面換圖示 | 已在本機元件 `VoiceCallScreen` 兩個 State 把掛斷鍵的 Smiley 佔位換成 Phosphor PhoneDisconnect（Fill，對應程式 `call_end_rounded`，`Icon/Inverse`），1.3.1、1.3.2 跟著更新 | 已完成 |
| 6 | 價格區間指示條（含「件數最多」標籤）與保固膠囊 | 師傅 1.2.1 自己排：漸層條加向下尖角的標籤、灰色膠囊放兩組圖示加天數。DS 沒有對應元件。**做法已定（檢查點 2）**：分成 `PriceRangeIndicator` 與 `WarrantyPill` 兩個元件，放新增的 Service 頁；以本機元件的屬性為基礎（Position Low／Mid／High、Min Price、Max Price、Marker Label；Residential、Commercial），都加是否顯示說明文字的開關與說明文字屬性（程式 `PriceRange` 的 `showDescription`、`WarrantyDate` 預設顯示說明）；價格區間的三個程式原色 #40AEFE、#3449FF、#3A89F8 新增為 DS 原始色並綁定（命名寫規格時提案）。完成後更新 reference.md 近似對應表的價格區間特例。**結果**：#3A89F8 等於既有 `Blue/500`，只新增 `PriceGradient/Light`、`PriceGradient/Deep`；`PriceRangeIndicator` 收進常見價格行（Summary）與說明（Has Description），師傅 1.2.1 至 1.2.5 已換成 DS 版本（關說明），reference.md 已更新 | 已完成 |
| 7 | 輪播 Banner | 師傅 1.1.1 首頁已做成本機元件 `CarouselBanner`（Image 佔位照加三個分頁圓點）。**做法已定（檢查點 2）**：升級為 DS `Carousel`，放既有的 Carousel 頁；結構照本機元件（外露 Image、variant 決定選中第幾顆），圓點固定 3 顆，客戶端首次介紹頁若有相同圓點再拆成獨立元件。**結果**：已建 DS `Carousel`，師傅 1.1.1 至 1.1.5、1.3.1 已換成 DS 版本 | 已完成 |
| 9 | `PhotoUpload` 支援寬度填滿 | 程式的照片格是 4 欄、格子填滿一列（隨螢幕寬度縮放），DS 的 `PhotoUpload` 固定 80×80，一列放 4 格會超出（4×80＋3×4＝332，頁面邊距加卡片內距後只有 329）。師傅 2.3.1 暫時用 `resize()` 把每格縮到約 78.75、間距 `Spacing/4`。建議：元件支援水平 Fill 並保持 1:1，圖片與刪除圖示跟著縮放。2026-10-06 使用者同意先用縮小格子，DS 之後處理 | 待處理 |
| 8 | 通用空狀態 | 師傅 1.1.2、1.1.3 的 `MasterHomeEmptyState` 改做成通用的 DS `EmptyState`，放既有的 EmptyState 頁：插圖佔位（之後可從 Illustration 頁取用）＋標題＋說明＋可選按鈕。先看程式另外兩處空狀態（`master_income_page.dart`、`order_detail_match_fail_page.dart`），確認通用版能涵蓋。完成後師傅 1.1.2、1.1.3 改用 DS 版本。**結果**：已建 DS `EmptyState`（Size Compact／Page，插圖為 Slot），三處都能涵蓋；師傅 1.1.2、1.1.3 已換成 DS 版本，插圖沿用原本的向量 | 已完成 |
| 10 | `BottomSheet` 底部支援兩顆按鈕 | 師傅 2.4.5 單位選擇的底部是「取消」「確認」兩顆並排，但 DS `BottomSheet`（Footer=Sticky）內建的 Sticky Footer 只有一顆 Button。暫時把內層 Sticky Footer 換成 Flexible Slot 變體，Slot 放兩顆並排 Button（Secondary Outlined lg、Primary Filled lg，間距 `Spacing/16`）。建議：BottomSheet 的 Footer 增加「雙按鈕」變體或布林，客戶端若有相同的取消／確認選擇器（例如日期時間選擇）也用得到。另外 BottomSheet 目前內容少於最大高度時是 Hug，這格為了貼近程式的 90% 高度手動設成 767 | 待處理 |

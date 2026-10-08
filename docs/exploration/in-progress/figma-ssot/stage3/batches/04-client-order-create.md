# 批次 04：客戶端／2 首頁與叫修

- **Figma**：[APP_Client → 2 首頁與叫修](https://www.figma.com/design/G3tNva2zGzIi74Aujg3cLB/APP_Client)
- **Evidence**：Flutter repo `docs/figma-ssot/evidence/` 的 T-0049（2.1）、T-0051（2.2）、T-0053（2.3）、T-0055（2.4）

---

## 開工檢查

**04a（2026-10-08）**

**結構**：16 格與程式吻合。使用者要求首頁新版提示卡多畫一格，編為 2.1.5（排在 2.1 最後，免重新編號），結構表與各處 Frame 數已更新（客戶端 179、04a 共 17 格）。2.3.2／2.3.3、2.4.1／2.4.2 版型相近但保留分開（使用者同意）。

**示意資料計畫**：
- 工項：監視系統安裝維修，常見價格 $3,500 至 $25,000，保固一般住家 31 天、營業用 7 天（沿用師傅端 1.2.1）；價格說明與保固說明文字取自師傅端 1.2.1 畫面。
- 首頁進行中訂單 3 筆：監視系統安裝維修（等待前往現場查看）、更換氣密窗（等待驗收，有紅點）、壁癌（等待上傳施工照片）；畫之前對照師傅端 1.1.1 的狀態。
- 搜尋用「監視」，無結果用「鋼琴調音」，熱門關鍵字照程式 11 個。
- 2.4.4 停用原因畫「連續兩次未付派遣費」。
- 今天 2026-10-08（週四）。

**畫面類型**：

| Frame | 類型 | 備註 |
|---|---|---|
| 2.1.1 首頁 | 新類型：客戶首頁 | 進行中訂單卡浮在最上層（Stack），收合 |
| 2.1.2 訂單卡展開 | 沿用 2.1.1 | |
| 2.1.3 下單流程說明 | 長內容 BottomSheet | |
| 2.1.4 多筆更新提示 | Dialog（只有內文、一顆按鈕） | 「您有N筆訂單已更新狀態」App 組字，N 為後端回傳訂單數 |
| 2.1.5 首頁新版提示 | 沿用 2.1.1 | 條件內容，使用者要求單獨一格 |
| 2.2.1 搜尋紀錄與熱門 | 新類型：搜尋頁 | |
| 2.2.2 搜尋提示 | 沿用 2.2.1 | |
| 2.2.3 搜尋結果 | 沿用 2.3.2 的工項卡 | |
| 2.2.4 搜尋無結果 | 沿用 2.2.1 | 「我們未能找到與「…」有關的工項」App 組字 |
| 2.3.1 大類與中類 | 新類型：大類頁籤加中類列表 | |
| 2.3.2 工項列表 | 新類型：圖片頁首加工項卡列表 | 「共N項相關服務」App 組字 |
| 2.3.3 工項列表無結果 | 沿用 2.3.2 | 同位置文字改「找不到相符的搜尋結果」 |
| 2.4.1 工項詳情 | 新類型：工項詳情 | 價格與保固文字 App 組字，說明為後端欄位 |
| 2.4.2 唯讀詳情 | 沿用 2.4.1 | 去掉底部按鈕 |
| 2.4.3 派遣費說明 | 長內容 BottomSheet＋Sticky Footer | |
| 2.4.4 下單停用 | Dialog 兩顆按鈕 | 內文依 paymentStrike／cancelStrike 三選一，App 組字 |
| 2.4.5 申請已送出 | Dialog 一顆按鈕 | |

新類型停下方式（使用者同意）：五個新類型（2.1.1、2.2.1、2.3.1、2.3.2、2.4.1）各畫第一格，一起給使用者確認，再往下畫。

**客戶端待判斷**：2.4.1 頂部與師傅端 `OrderCategoryCard` 相似，本批選 A：在客戶端檔案自排，記為元件候選，檢查點再決定是否升級進 DS。

---

## Frame 清單

| Frame | 狀態 |
|---|---|
| 2.1.1 首頁 | 已畫 |
| 2.1.2 首頁進行中訂單卡展開 | 已畫 |
| 2.1.3 下單流程說明 | 已畫 |
| 2.1.4 多筆訂單狀態更新提示 | 已畫 |
| 2.1.5 首頁新版提示 | 已畫 |
| 2.2.1 搜尋紀錄與熱門關鍵字 | 已畫 |
| 2.2.2 搜尋關鍵字提示 | 已畫 |
| 2.2.3 搜尋結果列表 | 已畫 |
| 2.2.4 搜尋無結果 | 已畫 |
| 2.3.1 大類與中類瀏覽 | 已畫 |
| 2.3.2 工項列表 | 已畫 |
| 2.3.3 工項列表無結果 | 已畫 |
| 2.4.1 工項詳情與開始叫修 | 已畫 |
| 2.4.2 唯讀工項詳情 | 已畫 |
| 2.4.3 派遣費說明 | 已畫 |
| 2.4.4 下單功能停用提示 | 已畫 |
| 2.4.5 恢復下單功能申請已送出 | 已畫 |

---

## 本機元件

建在客戶端 Figma「2 首頁與叫修」Page 底部的「本機元件」Section，依使用的 Frame 編號分四列排列（同編號依畫面由上到下）。

| 元件 | 用在 | 說明 |
|---|---|---|
| `HomeOrderSummary`（variant State=Collapsed／Expanded） | 2.1.1 至 2.1.5 | 首頁進行中訂單摘要列；TEXT Count、BOOLEAN Has Important（紅點）；外框是 DS `Card`（Padding=None） |
| `HomeSearch`、`HomeServiceEntry`、`HomeBrandCard`、`HomeArticles`、`HomeGuarantees` | 2.1.1 至 2.1.5 | 首頁各區塊，靜態內容；`HomeBrandCard` 不套 DS `Card`，內含滿版命名佔位圖層 |
| `HomeOrderRow` | 2.1.2 | TEXT Name、Status；BOOLEAN Has Divider；上下 padding 16，分隔線在底部 |
| `ProcedureStepContent`、`ProcedureList` | 2.1.3 | 下單流程七步驟（插圖佔位）與整份清單 |
| `SearchRow`、`HotKeywords` | 2.2.1 至 2.2.4 | 搜尋列（巢狀 SearchBar 可換 Filled）、熱門關鍵字 |
| `L3CardContent` | 2.2.3、2.3.2、2.3.3 | TEXT Name、Description；保固徽章在巢狀 `CornerBadge` 上改 Label；外框用 DS `Card`（Fill） |
| `CategoryRow` | 2.3.1 | TEXT Name、Count，右側 DS Image 佔位 |
| `CategoryInfo`、`PriceWarranty`、`FeeDescription` | 2.4.1 至 2.4.5 | 工項頂部資訊（TEXT Name、Description，右下絕對定位 `CornerBadge`）、價格與保固區、派遣費七題說明 |

---

## 待寫規則

使用者修正中屬於通則的部分，每個對話結束時一次寫進 Skill，寫完標「已寫入」。

**已寫入**（2026-10-08）：AppBar Tall 規則、白底列表、整寬卡片、右下徽章元件、重複區塊做本機元件、Section 重排、搜尋框取消按鈕，寫在 `screen-types.md`（「AppBar 與頁首」「卡片與資料列」兩節）、`types/pages.md`（客戶首頁、搜尋頁、大類頁籤加中類列表、圖片頁首加整寬卡片列表、工項詳情五個新類型）與 `SKILL.md`（Local components）。黑色背景複製 `fills` 的做法已在 `screen-types.md`。

- 有大標題的頁面（頁首標題在黃色底下方左側）AppBar 用 Type=Tall，標題寫進 `Title Text`，不用 Standard＋Slot 自己放文字；圖片頁首用 Tall／None／Image，疊卡用 Tall／Overlay／Image（使用者修正，2.3.1、2.3.2、2.4.1）。
- 列表內容區若每列是白底，列與列之間不透出灰底：用一個白底容器包住所有列（使用者修正，2.3.1）；Tab 區與項目區分成兩個區塊。
- 卡片列表頁的卡片若是整寬，用 DS `Card` Layout=Fill，`Scroll Content` 左右 padding 設 0（使用者修正，2.3.2）。
- 卡片裡「忽略 Auto Layout、貼右下角」的徽章：做成本機元件，徽章絕對定位（約束右下），元件底部留 `Spacing/32` 避免蓋到文字；Slot 會裁切超出範圍的內容，徽章不能超出 Slot 邊界（使用者修正，2.4.1）。
- 首頁類長頁面：Frame 拉長到完整內容（使用者修正，2.1.1），Content 內垂直間距 `Spacing/12`。
- 搜尋框旁的「取消」用 Button sm，並縮小列的左右 padding，避免提示文字超出（使用者修正，2.2.1）。
- 同一個 Page 內多個畫面重複出現的區塊（首頁各區塊、品牌卡內容、搜尋列、熱門關鍵字、價格與保固區、長 BottomSheet 的內容清單），做成本機元件，各畫面放 instance（使用者要求，2026-10-08）。純靜態內容的區塊（程式固定文字）不加 TEXT 屬性，結構檢查的 `localNoTextProps` 會列出，屬預期。
- 長 BottomSheet 加的「（完整內容）」Frame 會讓 Section 變高：每次畫完重排 Section 高度與垂直位置，免得 Frame 被下一個 Section 遮住（使用者指出，2.1）。
- 重建 Frame 後背景若顯示黑色，從正常的 Frame 複製 `fills`（2.3.1 又發生一次）。


---

## 2.1.1 首頁（2026-10-08）

**程式**：`client_home_page.dart`、`client_main_page.dart`、`selected_article_section.dart`、`selected_article_list.dart`、`new_version_card.dart`

- 頂部：黃色（`Brand/TigerYellow`）底，DS StatusBar（Dark Content）加 30 高色條。程式 `AppBar` 高 30，Material 2 會再加狀態列高度，所以黃色總高 89。
- 進行中訂單卡：程式是 Stack 疊在最上層，畫成浮層 DS `Card`（x=16、y=59、寬 361，頁面邊距照 DS 的 16，程式為 8），收合狀態；紅點用 DS `Badge`（Dot），數字 3 用 `Text/Link`。圖示 `colored_note.png` 換 Phosphor Note（Duotone，淡色層綁 `Brand/TigerYellow`）。
- 底部 `BottomNavBar`（Role=Client）浮層，首頁選中，Scroll Content 底部 padding 134。
- 內容：Carousel（Page=1，用 DS 內建貓咪佔位）、DS `SearchBar`（Boxed）、「讓我們協助您找到需要的服務」加兩張入口 `Card`（插圖留命名佔位圖層 `select_by_working_category`、`common_order_question`）、品牌卡（`Heading/3`＋Button Primary Filled md「了解更多」）、最新部落格文章（橫向列表，第二張露出一半）、客戶保障五列（Phosphor Duotone：CurrencyCircleDollar、Handshake、Users、ShieldCheck、Lightning）。
- 程式「查看更多」字串寫成「査看更多」（異體字），照抄。
- 文章標題與徽章文字是示意（後端資料）：「修繕小知識／冷氣不冷怎麼辦？師傅教你先檢查這 5 件事」、「施工案例／浴室漏水怎麼辦？先找出漏水來源再修」。
- 品牌卡：使用者要求做成有滿版背景圖的本機元件 `HomeBrandCard`，不再套 DS `Card`（圓角 `Radius/4` 與陰影沿用 Card 的設定，內含標題、按鈕與滿版命名佔位圖層 `背景圖 provider_reliable_service_bg（待放入）`，使用者之後放圖）。第二個入口依使用者確認照程式碼寫「常見下單問題」（實機截圖是「依您的需求搜尋」，不採用）。新版本提示卡獨立為 2.1.5。
- 使用者修正（2026-10-08）：內容區垂直間距由 8 改 `Spacing/12`；2.1.1 Frame 拉長到完整內容（1789），2.1.2、2.1.5 與浮層底圖維持 852（使用者驗收時調整）。
- 近似對應：文章圖圓角程式 10 用 `Radius/8`，徽章圓角程式 5 用 `Radius/4`；頁面背景 `#F8F8F9` 用 `Background/Page`；25 高以上的粗體 18 用 `Title/M`（Medium）。

## 2.2.1 搜尋紀錄與熱門關鍵字（2026-10-08）

**程式**：`search_working_categories.dart`、`search_service_entry_section.dart`、`hot_search_keyword.dart`

- 頂部：AppBar（Standard／Slot／Brand），隱藏標題，延伸區放搜尋列本機元件 `SearchRow`（DS `SearchBar` Boxed 加 Button Ghost Neutral sm「取消」）。搜尋框前的圖示程式為黃色，DS 內建為預設色，照 DS。
- 搜尋紀錄 3 筆（示意：監視器、漏水、冷氣），用 DS `ListItem`（Leading 圖示 Phosphor ClockCounterClockwise，`Icon/Subtle`，Has Divider）；「清除搜尋紀錄」用 Button Ghost Action sm。
- 熱門關鍵字 11 個照程式，用 DS `Chip`（Tone=info，Selected=false，hasIcon 關），自動換行，間距水平 `Spacing/8`、列 `Spacing/12`。Chip 高 36（程式 30），照 DS。
- 首次進入會疊開下單流程說明（引用 2.1.3，不畫）。

## 2.3.1 大類與中類瀏覽（2026-10-08）

**程式**：`select_working_categories.dart`、`select_l1l2_display_section.dart`、`l2_card.dart`

- 頂部：AppBar（Tall／None／Brand），標題寫在 `Title Text`（使用者修正，原為 Standard／Slot）。
- 大類頁籤列自排（DS 沒有可橫向捲動的頁籤，DS 待辦 14），選中項藍字加 3px 底線，其餘黑字。
- 中類列：本機元件 `CategoryRow`（建在本頁新增的「本機元件」Section），圖片用 DS Image 佔位。
- 大類頁籤用 App 真實的八大項目（使用者提供，2026-10-08）：安裝服務、水電服務、清潔服務、裝潢整修、搬運服務、家電服務、房屋漏水、消毒病媒；選中「安裝服務」，第八項被畫面右緣裁切（可橫向捲動）。中類「層架掛件（3 項）、監視系統（2 項）、淨水器、乾溼分離、系統廚具（各 1 項）」是依官網工項代碼分組推測的示意文字，後端沒有可查的中類名稱。

## 2.3.2 工項列表（2026-10-08）

**程式**：`select_l3_display_section.dart`、`l3_card.dart`

- 頂部：AppBar（Tall／None／Image），`Title Text` 放中類名稱，上方加大類小字「安裝服務」（使用者修正，原為 Standard／Slot）。程式展開高度 130，DS 為 173，照 DS。收合後標題淡入的捲動行為只用文字記錄。
- 內容：「共2項相關服務」（App 組字）加兩張工項卡。工項卡用 DS `Card`＋本機元件 `L3CardContent`；程式的黃色保固標籤是 DS `CornerBadge`（BottomLeft，hasIcon）。
- 示意資料：第一張「監視系統安裝維修，保固 31 天」（真實）；說明文字與第二張「(AWF61)天鉞監視器安裝」的說明、保固天數為示意，後端沒有可查的真實值。

## 2.4.1 工項詳情與開始叫修（2026-10-08）

**程式**：`confirm_working_category.dart`、`working_category_detail.dart`、`price_range.dart`、`warranty_date.dart`

- 頂部：AppBar（Tall／Overlay／Image），返回鍵換成 IconButton Filled（白圓）加 Phosphor X；延伸區放 DS `Card`，內容用本機元件 `CategoryInfo`（名稱 `Heading/3`、說明、右下 `CornerBadge`）。因白卡比 Overlay 預留的高度高，Scroll Content 上方 padding 手動設成卡片底緣下方再加 `Spacing/16`，不是 token。
- 價格區間：DS `PriceRangeIndicator`（Position=Low，約 0.12）；保固：DS `WarrantyPill`（說明用師傅端 1.2.1 的真實文字）。價格說明文字（後端 `priceRangeDescription`）倉庫裡找不到真實值，用示意文字。
- 底部：DS `Sticky Footer`（Buttons=Single）「開始叫修」。
- Frame 維持 852（使用者驗收時調整）。
- **這一格什麼時候出現（2.4.2）**：使用者在 2.5 叫修表單、2.7 確認與送出、3 訂單詳情／訂單資訊／尾款頁按「查看詳情」時，以工項代碼重新讀資料後開啟；只有關閉鍵，沒有「開始叫修」。從 2.2 搜尋結果、2.3 工項列表點工項卡開的是 2.4.1。

## 其餘 Frame 的例外（2026-10-08）

- **2.1.2**：複製 2.1.1，把進行中訂單卡展開（高 852）；訂單列用本機元件 `HomeOrderRow`（TEXT：Name、Status；BOOLEAN：Has Divider）。狀態文字照客戶端對照表（`repairOrderStatusMapping`）。程式 `ExpansionTile` 的展開箭頭換 Phosphor CaretUp。
- **2.1.3**：長內容 BottomSheet。第一屏：底圖複製 2.1.1 並縮成 852，BottomSheet（hasHeader、Footer=None）高 767（90%）；旁邊多一格「2.1.3 下單流程說明（完整內容）」（高 2502，不編號、不算 Frame 數）；2.4.3 的完整內容一格高 1337，同樣不編號。右上 X（DS 慣例，程式在左側）。7 張插圖留命名佔位（`插圖 order_procedure（待放入）`，比例 945×531）。卡片邊距照 DS 16。
- **2.1.4**：Dialog Standard，只有內文「您有2筆訂單已更新狀態」與一顆「前往查看」（Android 樣式，iOS 為 Cupertino，內容相同不另畫）。
- **2.1.5**：新增 Frame（使用者要求）。複製 2.1.1，Carousel 下方插入新版提示卡：自排（`Status/InfoContainer` 底、`Radius/4`），左側關閉鍵、App 圖示 40、「您有最新版本可以升級!」「師虎來了APP」，右側 Button Primary Filled sm pill「更新」。程式藍色 `#3A89F8` 的按鈕用 DS 樣式（深藍）。
- **2.2.2、2.2.3、2.2.4**：複製 2.2.1 的頂部。搜尋框換成 Content=Filled（輸入「監視」、「鋼琴調音」，DS 自帶清除圖示）。2.2.2 提示三筆（示意）：監視系統安裝維修、監視器安裝、監視器故障，用 ListItem＋Phosphor MagnifyingGlass。2.2.3 兩張工項卡（Card Fill）。2.2.4 文字照程式。載入中的轉圈不畫。
- **2.3.3**：複製 2.3.2，拿掉工項卡，標題「共2項相關服務」換成「找不到相符的搜尋結果」。
- **2.4.2**：複製 2.4.1，拿掉底部「開始叫修」，底部改 HomeIndicator。讀取中的骨架畫面不畫。
- **2.4.3**：長內容 BottomSheet（hasHeader、Footer=Sticky，Sticky Footer 切 Has Slot 放「點選即代表您已閱讀並同意派遣費支付規則」，按鈕「開始叫修」），第一屏高 767，旁邊一格「（完整內容）」。插圖 `dispatch_intro.png`（252×186）留佔位 100×74。程式左右 32 的邊距照 DS 改 16；七題文字照抄（含半形標點）。
- **2.4.4**：Dialog Standard，標題與內文照程式，示範「連續兩次未支付派遣費」那句；按鈕「取消」「聯繫客服」。**2.4.5**：Dialog，一顆「知道了」。
- **結構檢查**（04a）：無缺格、無多餘 Frame、大小、圖層順序、HomeIndicator、底部 padding、文字覆寫、硬編碼顏色都通過。只剩兩項說明：一、上述靜態內容的本機元件沒有 TEXT 屬性；二、2.3.1 的大類頁籤列有裁切，是刻意的（可橫向捲動）。

- **首頁進行中訂單卡**（使用者要求，2026-10-08）：外框用 DS `Card`（Inset、Padding=None），內部摘要列做成本機元件組 `HomeOrderSummary`（variant State=Collapsed／Expanded；TEXT 屬性 Count，BOOLEAN 屬性 Has Important 控制紅點）。展開時下方放 `HomeOrderRow`（上下 padding 16、左右 16，分隔線在底部、左側內縮 16）。

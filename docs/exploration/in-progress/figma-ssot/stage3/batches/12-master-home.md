# 批次 12：師傅端／1 首頁與接案

- **Figma**：[APP_師傅 → 1 首頁與接案](https://www.figma.com/design/m0yuXFZN2fkivzTOcwiKJ4/APP_師傅)
- **Evidence**：Flutter repo `docs/figma-ssot/evidence/T-0101.md`（1.1.1 至 1.3.1，共 11 格）
- **紀錄方式**：完整紀錄（見 fill-figma-ssot Skill「Recording」）

---

## Frame 清單

| Frame | 狀態 |
|---|---|
| 1.1.1 首頁總覽與案件摘要 | 已完成 |
| 1.1.2 尚無適合您的案件 | 已完成 |
| 1.1.3 尚無進行中的案件 | 已完成 |
| 1.1.4 客戶尚未支付派遣費 | 已完成 |
| 1.1.5 客戶已支付派遣費 | 已完成 |
| 1.2.1 適合您的案件需求 | 已完成 |
| 1.2.2 確認接案 | 已完成 |
| 1.2.3 目前無法接案 | 已完成 |
| 1.2.4 接案成功 | 已完成 |
| 1.2.5 接案失敗 | 已完成 |
| 1.3.1 英雄榜敬請期待 | 已完成 |

**批次驗收（2026-10-06）**：結構檢查（腳本）11 個 Frame 的名稱都對、沒有缺漏或多出，寬都是 393、高度都不小於 852（只有 1.2.1 拉長到 1140，是以內容為主的長頁面）；佔位文字都已刪除，沒有寫死的顏色（`PriceRangeIndicator` 依使用者指定直接用程式原色，在元件內，不在檢查範圍），除 `Content` 外沒有會裁切內容的外框，所有 Frame 都是垂直 Auto Layout 並設為 First on top。內容逐格對照過程式與後端；使用者看過 Figma 並在修改後確認 OK。

**檢查點 2 修正（2026-10-06）**：另開代理逐格對照程式驗收，加上新版結構檢查試跑，修了兩處：

- 日期：程式用 `DateFormat` 的 `EEE`，zh_TW 顯示「週四」而不是「四」；而且原本的星期也算錯一天（2026-10-06 是星期二）。11 格的卡片日期與 1.2.x 的場勘時間都改為「10/06(週二)」「10/07(週三)」「10/08(週四)」「10/09(週五)」，本機元件的預設文字一起改。
- 1.1.4：這個對話框只在訂單為「等待支付派遣費」時出現，背景第一張進行中卡片的狀態改為「等待支付派遣費」。

驗收另外提到 `OrderCategoryCard` 的保固徽章是改實例內的文字，查證後不是問題：徽章是外露的 DS 子元件，改的是它自己的 Label 屬性，上層元件的屬性本來就連不到子元件的屬性。

**本批新增的規則**（都已寫進 stage3.md 決策與 Skill）：本機元件要用屬性、示意資料用官網與實際畫面的資料、自排前先搜尋 DS、以內容為主的長頁面才拉長（其餘 852）、First on top 與 BottomNavBar 浮層、長內容 BottomSheet 加一格完整畫面。

---

## 本機元件

放在該 Page 右側的「本機元件」Section。

**2026-10-06 DS 升級後**：`CarouselBanner`、`MasterHomeEmptyState`、`PriceRangeIndicator`、`WarrantyPill` 已換成 DS 的 `Carousel`、`EmptyState`、`PriceRangeIndicator`、`WarrantyPill` 並刪除，下表只留作紀錄，Key 與用法查 [reference.md](../reference.md)。Section 現在只剩兩種案件卡與 `OrderCategoryCard`。

| 元件 | 用在 | 內容 |
|---|---|---|
| `MasterSuitableOrderCard` | 1.1.1、1.1.3 | 白底圓角卡，左側黃條；類別（`Title/S`）＋預約或立即（`Label/S`）、地址、日期。文字都是元件屬性：Category、Mode、Address、Date（使用者指示，不要覆寫圖層文字） |
| `MasterInProgressOrderCard` | 1.1.1、1.1.2 | 同上，左側藍條；多一列紅色訂單狀態與未讀徽章。屬性：Category、Mode、Address、Date、Status、Has Unread（布林，預設關）、Unread Count |
| `PriceRangeIndicator` | 1.2.1 至 1.2.5 | 價格區間指示條：「件數最多」標籤（向下尖角）＋漸層條＋最低最高價。**特例（使用者指定）：顏色與程式碼原色一致、不綁 token**：漸層 (64,174,254)→(52,73,255)→(64,174,254)、標籤與尖角 (52,73,255)、價格文字 (58,137,248)。variant Position（Low 0.12／Mid 0.5／High 0.88，標籤與漸層峰值位置），屬性 Min Price、Max Price、Marker Label。寬 329（頁面邊距 16＋卡片內距 16 後的寬度） |
| `OrderCategoryCard` | 1.2.1 至 1.2.5（放在 AppBar 的 Extension Content） | 白底 `Radius/4` 卡片：黃色直條＋類別名稱（`Heading/3`）＋右下 DS `CornerBadge`。屬性 Category；保固徽章設為外露 instance，可在實例上改 Label 與 hasIcon |
| `WarrantyPill` | 1.2.1 至 1.2.5 | 保固膠囊：左右兩個內容均分寬度、各自置中，圖示 Phosphor House／Buildings（Fill）。屬性 Residential、Commercial（整句文字，例如「一般住家31天」） |
| `CarouselBanner` | 1.1.1 至 1.1.5、1.3.1 | 首頁輪播 Banner，393×200：圖片＋底部三個分頁圓點（選中 `Brand/TigerYellow`、其他 `Border/Default`）。variant Page（1／2／3，決定哪一顆圓點選中）；圖片是外露 instance `Banner Image`，可直接換圖。程式是自動輪播，只畫靜止狀態 |
| `MasterHomeEmptyState` | 1.1.2、1.1.3 | 元件組，variant Type=Suitable（尚無適合您的案件）、Type=InProgress（尚無進行中的案件），文字固定在 variant 裡。各有一個 60 圓形的 `Illustration` 佔位圖層，等使用者填入插圖 |

---

## 1.1.1 首頁總覽與案件摘要（2026-10-06）

**程式**：`master_home_page.dart`、`master_main_page.dart`（底部導覽）、`master_suitable_order_card.dart`、`master_in_progress_order_card.dart`、`carousel_banner_swiper.dart`、`new_version_card.dart`、`config/repair_order_status_mapping.dart`（狀態文字）

| 項目 | 程式現況 | Figma 做法 |
|---|---|---|
| 頂部 | AppBar 黃色漸層圖，沒有標題，右側鈴鐺（`notifications_outlined`） | AppBar（Standard／None／Brand），關閉返回鍵、開啟右側動作；隱藏 `Title Text`，動作鈕隱藏文字、圖示換成 Phosphor Bell（Outline／Regular） |
| 更新提示卡 | 有新版本才顯示，平常隱藏 | 不畫（依 evidence，代表首頁不固定加入更新卡） |
| Banner | 200 高輪播圖，底部圓點分頁（灰＋黃色選中） | 本機元件 `CarouselBanner`（使用者指示）：DS Image 佔位照 393×200，疊 3 個圓點（選中 `Brand/TigerYellow`、其他 `Border/Default`） |
| 統計卡 | Material Card，兩欄置中：標籤 14 Medium 藍、數字 28 Bold 藍 | Card（Inset／Standard）＋兩欄，標籤 `Label/M`、數字 `Heading/2`，顏色 `Text/Brand`。示意資料 12、9 |
| 兩欄清單 | 左右各佔一半，邊距 8，標題 20 Bold | 兩欄，頁面邊距與欄距都用 `Spacing/16`，標題 `Heading/4`＋`Text/Primary` |
| 案件卡 | 圓角 10、左側色條 8、類別 16 Medium 藍、預約或立即 12 Medium、地址、日期 | 本機元件，見上表與 reference.md 近似對應表 |
| 進行中卡狀態 | 紅色訂單狀態文字＋有未讀才顯示的徽章（總未讀 0 不顯示，1 至 9 顯示數字，超過 9 顯示 N，8 號字白字紅底） | 本機元件內的 `Status Row`，徽章是 16 圓形（`Status/Error`、`Label/XS`＋`Text/Inverse`），預設隱藏。使用者指示讓有未讀的狀態看得到：1.1.1、1.1.2、1.1.4、1.1.5 的第一張進行中卡開啟徽章並顯示「2」。徽章字級程式 8，DS 最小是 `Label/XS`（近似） |
| 底部導覽 | 師傅主頁導覽，首頁選中 | BottomNavBar（Role=Master），預設即首頁選中 |
| 頁面底色 | `#EAEAEA` | `Background/Page`（#F5F5F5）。程式的底色與管理員頁不同，沿用同一個近似 |
| 示意資料 | 適合案件 3 筆、進行中 2 筆 | 服務名稱取自官網的服務清單（監視系統安裝維修、洗衣機故障、壁癌、更換氣密窗、抽油煙機清洗），日期以今天（10/06）前後，狀態取自狀態對照表（「等待確認報價單」「等待前往現場查看」）。適合案件的地址只到區（後端遮蔽，見 1.2.1 後端追查），進行中案件顯示完整地址 |

**DS 沒有、由 Claude 自己排的部分**

- 輪播 Banner 與分頁圓點：DS 沒有輪播元件。
- 案件卡（兩種）與空狀態：DS 沒有，做成本機元件。
- 統計卡內部兩欄：用 Card 的 `Slot` 自己排。

**遇到的問題**

- reference.md 記的 FAB 與 icon 的「整組」Key 是元件組，用 `importComponentByKeyAsync` 會找不到，要用 `importComponentSetByKeyAsync`。已在 reference.md 註明。
- AppBar 的右側動作預設是「Smiley＋Label」的 IconLabelButton，程式只有圖示，所以隱藏了文字。

## 1.1.2 尚無適合您的案件、1.1.3 尚無進行中的案件（2026-10-06）

**程式**：`master_home_page.dart`（空狀態分支，`FutureBuilder` 的 `orders.length == 0`）

- 底圖複製 1.1.1，只把有變化的那一欄換成 `MasterHomeEmptyState`，另一欄保留代表資料（兩區可同時存在，依 evidence）。
- 文字照程式：「尚無適合您的案件」＋「一有適合您的案件，會立即推播給您，請多多留意手機通知。」；「尚無進行中的案件」＋「請師傅幫忙踴躍接案」。
- 程式的兩行文字灰色深淺不同，Figma 都用 `Text/Hint`（近似）。
- 插圖是程式的 png 圖片，DS 沒有，用 60 圓形佔位。

## 1.1.4 客戶尚未支付派遣費（2026-10-06）

**程式**：`master_in_progress_order_card.dart`（`_showPendingDispatchFeeDialog`）、`platform_alert_dialog.dart`

- 底圖複製 1.1.1，加 `Scrim`＋Dialog（Standard，置中）。
- 標題「客戶尚未支付派遣費」，內文「待客戶支付派遣費後，即可與客戶確認場勘相關事宜」（`Body/M`＋`Text/Secondary`），只有一顆「確定」，隱藏左側按鈕。

## 1.1.5 客戶已支付派遣費（2026-10-06）

**程式**：`master_main_page.dart`（`_showDispatchFeeSuccessDialog`）

- 程式沒有標題、只有內文：「客戶已支付派遣費，已可與客戶確認場勘相關事宜」，隱藏 `Title`。
- 結構表只寫「取消」關閉提示，但程式有兩顆按鈕「取消」與「前往確認」（前往該筆訂單詳情）。照程式畫兩顆，左「取消」、右「前往確認」。
- 底圖用 1.1.1（任何分頁都可能觸發，代表性底圖用首頁）。

## 1.2.1 適合您的案件需求（2026-10-06）

**程式**：`suitable_order.dart`、`order_requirement_section.dart`、`stack_sliver_app_bar.dart`、`price_range.dart`、`price_range_indicator.dart`、`warranty_date.dart`、`warranty_day_badge.dart`、`horizontal_image_list.dart`、`scaffold_bottom_sheet.dart`

| 項目 | 程式現況 | Figma 做法 |
|---|---|---|
| 頂部 | `StackSliverAppBar`：黃色漸層圖＋返回鍵＋標題「適合您的案件」，下方疊一張白色卡（黃色直條＋類別名稱 24 Bold＋右下黃色「保固N天」徽章），捲動會收合 | AppBar（Standard／Overlay／Brand），標題「適合您的案件」，卡片放進 `Extension Content` Slot：黃色直條＋類別名 `Heading/3`＋DS 的 `CornerBadge`（BottomRight、hasIcon，Label「保固31天」）貼在卡片右下角。卡片圓角使用者指定 `Radius/4`（與徽章外側圓角一致，程式為 10）。收合行為只用文字記錄。第一版誤用 Tag，使用者指出 DS 有保固徽章後改正 |
| 內容區 | 三個段落標題 18 Bold，左邊距 12，卡片左右 12 | 標題 `Title/M`，頁面邊距 `Spacing/16`（照 DS）。上方 padding 用 `Spacing/48`，讓出疊在 AppBar 下方的卡片 |
| 價格區間 | 藍色漸層條，上方「件數最多」箭頭標籤依常見價位比例定位，下方最低最高價，再一行「常見價格落於$X-Y之間」 | 本機元件 `PriceRangeIndicator`（使用者指示做成本機元件，第一版的尖角有黑色外框、位置也不對）：標籤 `Body/S`＋白字、`Radius/4`，尖角無外框；漸層條 8 高圓角；位置依程式 `(常見價-最低價)/(最高價-最低價+1)`，監視系統約 0.12，用 Position=Low；最低最高價 `Label/M`；下方說明文字 `Label/M`。顏色依使用者指定（特例）直接用程式原色，不綁 token；先前用 `Blue/400`、`Blue/600` 的近似對應已撤銷 |
| 保固 | 灰色膠囊，左「一般住家N天」右「營業用N天」，圖示 home、business，膠囊下方還有一段保固說明文字（`WarrantyDate` 預設顯示說明） | 本機元件 `WarrantyPill`（使用者指示兩個內容均分寬度）：`Background/Page`＋`Radius/Full`，左右各佔一半、內容置中，圖示 Phosphor House、Buildings（Outline／Fill）；下方說明文字 `Body/S`＋`Text/Hint`（第一版漏畫，使用者指出後補上） |
| 客戶資訊 | 姓名（遮蔽）20、地址 16、「場勘時間」16 Medium、時間 20 | 姓名與時間 `Title/L`、地址 `Body/M`＋`Text/Secondary`、「場勘時間」`Title/S`。示意資料「王O明」，時間格式 `MM/dd(EEE) a hh:mm`（zh_TW）。**地址已被後端遮蔽**：未接案件的地址只到「縣市＋區」（見下方「後端追查」），所以寫「台北市大安區(有電梯)」 |
| 問題描述 | 描述文字 16 灰、分隔線、「照片」、橫向照片列（高 120，間距 5，圓角 5） | 文字 `Body/M`＋`Text/Secondary`、分隔線 `Border/Subtle`、「照片」`Body/S`＋`Text/Hint`、3 張 100 見方 DS Image（`Radius/4`，間距 `Spacing/4`） |
| 底部 | `ScaffoldBottomSheet`：白底、陰影、按鈕寬 85% 高 45，上 16 下 28 | 白底 `Background/Surface` 容器，Button（Primary Filled、lg、rect）寬度填滿、左右 `Spacing/16`，下方 HomeIndicator（Dark）。程式的陰影沒有畫（DS 沒有對應的陰影樣式），按鈕寬度照 DS 用填滿 |
| 長頁面 | 內容可捲動，底部按鈕固定在畫面底部 | 使用者指示：把 Frame 拉長到整頁內容完整顯示。Frame 寬 393、高度固定 1140（頂部 155＋內容 877＋底部按鈕區 106，再加邊框），`Content` 維持 Fill，底部按鈕區永遠貼底 |
| 示意資料 | 使用者指示用官網資料 | 服務「監視系統安裝維修」，常見價格 $3,500 至 $25,000，保固一般住家 31 天、營業用 7 天，保固說明文字取自使用者提供的實際畫面截圖 |

**後端追查**：未接案件清單與詳情的資料來自 `order_matching/matched_order`（`OrderMatchingGetMatchedOrder.ts`），後端把地址遮蔽後才回傳：先去掉「台灣」，之後只保留到第一個「段、市、區、鄉、鎮、路、街、村、里」（例如「台北市大安區」）；若地址有「-」且前段夠長，就取「-」之前。師傅自己的進行中案件（`getMasterOrderList`）則是完整地址。因此首頁「適合您的案件」卡片與 1.2.1 都只顯示到區，「進行中的案件」卡片顯示完整地址。

**DS 沒有、由 Claude 自己排的部分**：價格區間指示條（含「件數最多」標籤）與保固膠囊（都已是本機元件）、橫向照片列、底部按鈕區。價格指示條與保固膠囊客戶端 2.4 工項詳情應該也會用到，已列入元件候選與 DS 待辦。保固徽章 DS 有（`CornerBadge`），不屬於自排。

**遇到的問題**：重建 1.2.1 後 Frame 的背景綁定 `Background/Page` 卻顯示成黑色（變數的備援色是黑色，沒有被解析），把已正常的 Frame 的填色複製過去才恢復。原因未查明，已記進 `figma-notes.md`。

**圖層結構（使用者指示 First on top）**：所有 Frame 的 Auto Layout 堆疊順序設為 First on top。對話框畫面的 `Scrim`、Dialog 放在最前面；首頁相關 Frame（1.1.1 至 1.1.5、1.3.1）的 BottomNavBar 改成浮層（絕對定位貼底，排在 `AppBar` 之前），`Content` 底部 padding 82，這樣中央 Logo 不會被第三張案件卡蓋住。

**Frame 高度（使用者指示：只有以內容為主的長頁面才拉長）**：只有 1.2.1 案件需求頁拉長到 1140（整頁內容完整顯示，`Content` 維持 Fill，底部按鈕區貼底）。首頁 1.1.1 至 1.1.3、對話框畫面（1.1.4、1.1.5、1.2.2 至 1.2.5、1.3.1）都維持標準高度 852，內容超出的部分被裁掉（例如首頁第三張案件卡被導覽列蓋住），`Scrim` 蓋滿整個 Frame，Dialog 置中。

## 1.2.2 至 1.2.5、1.3.1 對話框（2026-10-06）

**程式**：`suitable_order.dart`（`_showConfirmReceiveDialog`、`_showReceiveBanDialog`、`_showSuccessReceiveDialog`、`_showFailReceiveDialog`）、`master_main_page.dart`（英雄榜 FAB）

- 底圖：1.2.2 至 1.2.5 複製 1.2.1，1.3.1 複製 1.1.1（底部導覽的英雄榜鍵在各分頁都有，用首頁代表）。都加 `Scrim`＋Dialog（Standard，置中）。
- 1.2.2：標題「您確定要接案嗎?」（半形問號照程式），無內文，「取消」「確定接案」。
- 1.2.3：標題「您目前無法接案，請聯絡客服人員為您處理」，無內文，「取消」「聯絡客服」。
- 1.2.4：標題「接案成功」，內文「待客戶支付派遣費後，即可與客戶確認場勘相關事宜」，一顆「確定」。
- 1.2.5：標題「接案失敗」，內文「這個訂單已經被承接」，一顆「確定」。
- 1.3.1：標題「敬請期待」，無內文，一顆「知道了」。
- 1.2.4、1.2.5 在程式裡 Dialog 彈出後緊接著 `Navigator.pop`，實機看得到的時間很短，evidence 已記錄，使用者依 R-0076 接受納入，照預期畫面畫。
- 「我要接案」按鈕按下後的「接案中...」載入文案不另畫（依 evidence 通則）。

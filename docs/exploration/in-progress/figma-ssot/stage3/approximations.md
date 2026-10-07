# 階段 3 近似對應表

程式數值沒有完全相同的 token 或文字樣式時，記錄選用結果。之後遇到同一個程式值，一律照這張表套用。

**怎麼查**：不要整份讀。用 Grep 搜程式值（例如 `#9E9E9E`、`20 Bold`、`Colors.grey`、`(179,172,162)`）；查不到才自己挑最接近的 token，並在表尾新增一列。Key 見 [reference.md](reference.md)。

| 程式值 | 選用 | 其他候選 | 改為（使用者填） | 出現位置 |
|---|---|---|---|---|
| `#FAFAFA`（Material 2 頁面背景） | `Background/Page`（#F5F5F5） | `Background/Surface`（#FFFFFF） | | 管理員 1.1.1 |
| 12px Medium 灰（聊天室列表的最後訊息） | `Body/XS`（使用者指定，只限此頁面，不作通用規則） | `Label/S`（數值完全相同） | | 管理員 1.1.1 |
| 10px（聊天室訊息列表上方 padding） | `Spacing/8` | `Spacing/12` | | 管理員 1.2.1、1.3.1（掛斷鍵到文字） |
| 36px（通話畫面頭像到姓名） | `Spacing/32` | `Spacing/40` | | 管理員 1.3.1 |
| `Colors.black54`（通話畫面背景暗化，54%） | `Background/Overlay`（63%） | 無 | | 管理員 1.3.1 |
| `Colors.red`（#F44336，掛斷鍵） | `Status/Error`（#FF2851） | 無 | | 管理員 1.3.1 |
| 28px Bold（通話畫面姓名） | `Heading/2`（28 SemiBold） | 無 | | 管理員 1.3.1 |
| 14 Regular（帳號頁版本文字，Material 2 預設 body2） | `Body/XS`（12 Regular，使用者指定） | `Body/S`（數值完全相同） | | 管理員 2.1.1 |
| 18px（About 對話框版本到著作權文字） | `Spacing/16` | `Spacing/20` | | 管理員 2.2.1 |
| 60px（帳號頁按鈕到版本文字） | 區段間距 `Spacing/16`＋`Version` 上方 `Spacing/48`，共 64 | `Spacing/40`（共 56） | | 管理員 2.1.1 |
| 30px（帳號頁版本文字下方） | `Spacing/32` | `Spacing/24` | | 管理員 2.1.1 |
| `(190,190,190)` #BEBEBE（版本文字灰） | `Text/Hint`（#727276） | 原始色 `Neutral/400`（#BABABA，較接近但不是語意 token） | | 管理員 2.1.1 |
| `#000000`（全螢幕照片檢視的黑底，`PhotoView` 預設） | `Base/Black`（原始色，使用者指定；語意 token 沒有純黑） | `Background/Inverse`（#2A2A2A，AppBar 遮罩會看出帶狀） | | 管理員 1.2.4 |
| 師傅首頁 AppBar 背景（黃色漸層圖 `appbar_bg.png`） | AppBar（Standard／None／Brand） | 無 | | 師傅 1.1.1 |
| 首頁輪播 Banner 圖（網路圖片） | DS 的 Image（Loaded）內建貓咪佔位照，拉成 393×200 | 無 | | 師傅 1.1.1 |
| 輪播分頁圓點：10px、間距 6、距底 10，未選中 (179,172,162) #B3ACA2 | `Carousel` 照本機元件：8px、`Spacing/8`、距底 8，未選中 `Border/Default`（#EDEDED） | `Neutral/400`（#BABABA）、`Icon/Subtle`（#9E9E9E） | | 師傅 1.1.1 |
| 14 Medium 灰（案件卡的日期、狀態） | `Label/M`（14 Medium） | 無 | | 師傅 1.1.1 |
| 14 Regular 灰（案件卡的地址） | `Body/S`＋`Text/Secondary` | 無 | | 師傅 1.1.1 |
| 20 Bold（首頁「適合您的案件」標題） | `Heading/4`（20 Medium） | 無 | | 師傅 1.1.1 |
| 28 Bold 藍（本月接案數） | `Heading/2`（28 SemiBold）＋`Text/Brand` | 無 | | 師傅 1.1.1 |
| 案件卡圓角 10 | `Radius/12` | `Radius/8` | | 師傅 1.1.1 |
| 案件卡左側黃條、藍條 8px | 原始色 `Brand/TigerYellow`、`Brand/TigerBlue`（沒有對應語意 token） | 無 | | 師傅 1.1.1 |
| 空狀態灰 (145,145,151)、(179,179,179) | 兩行都用 `Text/Hint` | 無 | | 師傅 1.1.2 |
| 空狀態插圖（`empty_suitable_order.png` 等） | `EmptyState` 的 `Illustration` Slot 放入插圖（師傅 1.1.2、1.1.3 沿用原本畫好的插圖向量） | 無 | | 師傅 1.1.2、1.1.3 |
| 空狀態標題 14 Regular 灰（師傅收入頁「尚無已完成案件」） | `EmptyState` Compact 標題 `Label/S`＋`Text/Hint` | `Body/S` | | 師傅收入頁（批次 14） |
| 價格區間漸層與標籤：(64,174,254)、(52,73,255)、價格文字 (58,137,248) | **特例：綁原始色**，漸層兩端 `PriceGradient/Light`、最深處與標籤底 `PriceGradient/Deep`（DS 升級新增，與程式完全一致，只限 `PriceRangeIndicator`），價格文字 `Blue/500`（值相同但語意不符的 `Text/Link`、`Status/Info` 不用）。先前「直接用程式原色、不綁 token」的特例已取代 | 無 | | 師傅 1.2.1 |
| 灰色保固膠囊底色 (238,238,238) | `Background/Page`（#F5F5F5） | 無 | | 師傅 1.2.1 |
| 24 Bold（案件類別名稱） | `Heading/3`（24 Medium） | 無 | | 師傅 1.2.1 |
| 18 Bold（段落標題） | `Title/M`（18 Medium） | 無 | | 師傅 1.2.1 |
| `ScaffoldBottomSheet` 陰影（grey 15%） | 不畫陰影 | 無 | | 師傅 1.2.1 |
| 按鈕寬 85% 高 45 | Button lg 寬度填滿（照 DS） | 無 | | 師傅 1.2.1 |
| 保固訂單卡的狀態綠 `Color(46,204,113)` #2ECC71 | `Status/Success`（#1AA354） | 原始色 `Green/400` | | 師傅 2.1.3 |
| 訂單卡資料框的邊框與分隔線 (209,209,209) #D1D1D1 | `Border/Default`（#EDEDED） | `Border/Subtle`（#9E9E9E，太深） | | 師傅 2.1.1、2.1.3 |
| 訂單卡資料框圓角 5 | `Radius/4` | `Radius/8` | | 師傅 2.1.1、2.1.3 |
| 訂單卡左右邊距 10、上下 5（`Card` margin）、卡片內距 12 | 頁面邊距 `Spacing/16`、卡片間距 `Spacing/8`、卡片內距照 DS `Card` Standard（16） | 無 | | 師傅 2.1.1、2.1.3 |
| 分隔線 `Divider` 高 16（線上下各約 8） | 列間距 `Spacing/8`，線 1px | 無 | | 師傅 2.1.1、2.1.3 |
| 空狀態離頂部 120 | 兩層 `Spacing/48`（96） | `Spacing/40` 加 `Spacing/48`（88） | | 師傅 2.1.2、2.1.4 |
| 空狀態插圖高 112 | `EmptyState` Compact 的 Slot（60），沿用 DS | `EmptyState` Page（200） | | 師傅 2.1.2、2.1.4 |
| 藍字加箭頭的文字連結「查看需求」「導航」（`Colors.blue`、14 Medium、`arrow_forward_ios`） | Button Ghost Action sm＋後方 Phosphor CaretRight | 無 | | 師傅 2.2.1 |
| 藍框 `OutlinedButton`（`Colors.blue`，圓角 5） | Button Secondary Outlined lg（#3A89F8，白底） | 無 | | 師傅 2.2.1 |
| 自家圖片 `chat_with_admin.png`（聯繫客服，36px） | AppBar 動作區 `IconLabelButton`＋Phosphor Headset | 無 | | 師傅 2.2.1 |
| 資訊卡文字 20 Bold／18 Medium／16 Regular／14 Medium 灰 | `Heading/4`／`Title/M`／`Body/M`／`Label/M`＋`Text/Hint` | 無 | | 師傅 2.2.1 |
| 價格與客戶資訊卡內距 20×16、16×12、12×16（`Card` padding） | 照 DS `Card` Standard（16） | 無 | | 師傅 2.2.2 |
| 地圖 App 圖示（`map_launcher` 套件 SVG，28px） | 不放圖示：關閉 ListItem 的 Has Leading Icon，不留 Smiley 佔位（使用者決定） | 無 | | 師傅 2.2.3 |
| 報價類別列（`QuotationCategoryCard`）：標題 20 Medium 深藍 (31,40,111)、說明 12 Medium 暖灰 (179,172,162)、「小計」16 Medium 灰 (79,79,84)、金額 20 Bold 深藍 | `Heading/4`＋`Text/Brand`、`Body/XS`＋`Text/Hint`、`Label/L`＋`Text/Secondary`、`Heading/4`＋`Text/Brand`（Bold 對 Medium） | 無 | | 師傅 2.4.2、2.4.4、2.4.7、2.4.9 |
| 類別列內距 左 16 上下 8、卡片 `Card` margin 4 | 列左 `Spacing/16`、右 `Spacing/4`、上下 `Spacing/8`；卡片外框用 DS `Card`（Inset／None），頁面邊距 `Spacing/16` | 無 | | 師傅 2.4.x |
| 「報價金額」膠囊底 (240,243,253) 深藍字、「師傅收入」膠囊紅底 (255,40,81) 白字，金額 14 Bold、標籤 14 Medium | DS `Tag`（Info／Emphasis Solid），兩段文字合併成一個 Label，不分粗細 | 自排膠囊（金額加粗） | | 師傅 2.4.2、2.4.7 |
| 金額列上方「未含客戶端服務費」14 Regular 藍 (58,137,248)、「已預扣…材料費」12 Medium | `Body/S`＋`Text/Link`、`Label/S`＋`Text/Primary` | 無 | | 師傅 2.4.2 |
| 底部金額列 `ScaffoldBottomSheet`（白底、陰影、上 16 下 28） | DS `Sticky Footer`（Button + Slot），內距照 DS | 無 | | 師傅 2.4.2、2.4.7 |
| 輸入欄位（Material 底線 `TextFormField`，輸入字 18、提示字 #D1D1D1） | DS `TextField`（Default／Readonly），字級與色彩照 DS | 無 | | 師傅 2.4.4、2.4.6、2.4.8、2.4.9 |
| 工期卡（標題＋值＋`create_outlined`＋底線） | DS `TextField`（Readonly）＋尾端 Phosphor PencilSimple | 無 | | 師傅 2.4.2、2.4.7 |
| 單位 `ChoiceChip`（底 #EBF3FF、選中 #BFDAFF＋深藍框、字 20 深藍、間距 12／8） | DS `Chip`（Tone=info，Selected），間距 `Spacing/12`／`Spacing/8` | 無 | | 師傅 2.4.5 |
| 單位選擇 BottomSheet 高度 90%（`RoundedBottomSheet` 預設） | 固定 767（852×0.9） | 無 | | 師傅 2.4.5 |
| 底部兩顆按鈕：`OutlinedButton` 藍框、`NORMAL_STYLE` | Button Secondary Outlined lg、Primary Filled lg，間距 `Spacing/16` | 無 | | 師傅 2.4.5 |
| 紅字提示 (255,40,81) 14 Medium（簡易報價 $5,000 提醒） | `Label/M`＋`Status/Error` | 無 | | 師傅 2.4.7 |
| 刪除小按鈕 `PillButton` 高 24、藍框透明底 | Button Secondary Outlined sm pill | 無 | | 師傅 2.4.4、2.4.9 |
| 工種項目名稱 18 Regular 灰 (79,79,84)、金額 18 Bold 深藍 | `Title/M`＋`Text/Secondary`、`Title/M`＋`Text/Brand` | 無 | | 師傅 2.4.4 |
| 18 Regular（`QuotationCategoryCard` 以外的輸入字、工期值） | `Title/M`（18 Medium） | 無 | | 師傅 2.4.x |
| 無 AppBar 全頁頂部空 150（含狀態列，`SizedBox(150)`） | StatusBar 59＋兩層 `Spacing/48`（96） | 無 | | 師傅 2.8.1、2.8.2 |
| 提醒框左右邊距 36 | `Spacing/32` | `Spacing/40` | | 師傅 2.8.1 |
| 灰色邊框 `Colors.grey`（#9E9E9E） | `Border/Subtle` | `Border/Default`（太淺） | | 師傅 2.8.1 |
| 簽名板虛線框 `DottedBorder` 預設黑 1px | `Text/Primary` 綁定 1px 虛線（4，4） | 無 | | 師傅 2.7.7 |
| 簽名板底部空 50 | 內容底部 `Spacing/16`＋BottomSheet 內建 HomeIndicator | 無 | | 師傅 2.7.7 |
| 掃描 BottomSheet 標題到相機空 50 | `Spacing/48` | 無 | | 師傅 2.7.3 |
| 12 Medium 深藍 (31,40,111) 說明文字（「此評價不會對客戶公開」） | `Label/S`＋`Text/Brand` | 無 | | 師傅 2.8.2 |
| 長條圖顏色 (255,217,108) #FFD96C | 原始色 `Yellow/300`（#FFDE7D，Key `2897ee3c248b9d8e4616b2fefce854bed0d2d7ac`） | `Yellow/400`（#FFD048） | | 師傅 3.1.1 |
| 收入頁「訂單明細」資訊圖示（`info_outlined` 16，藍 #3A89F8） | Phosphor Info（Outline／Regular，元件組 Key `aff3f7b333137a5533dd3db6598642b6848795d8`），顏色 `Text/Link` | 無 | | 師傅 3.1.1 |
| 收入明細列文字 12 Medium、表頭 14 Medium | `Label/S`、`Label/M`；狀態色紅綠用 `Status/Error`、`Status/Success` | 無 | | 師傅 3.1.1、3.2.1 |
| 收入頁推薦獎勵紅字 18 Light (236,13,13) | `Title/M`＋`Status/Error` | 無 | | 師傅 3.1.1 |
| 說明文字未設字級（Material 2 預設 14） | `Body/S`＋`Text/Primary` | 無 | | 師傅 3.3.1 |
| 師傅資料總分 48 Bold 深藍 (31,40,111) | `Heading/2`（28 SemiBold）＋`Text/Brand` | 無 | | 師傅 4.1.2 |
| 評分星星 30／20（`RatingBarIndicator`） | `Rating` lg（24）／sm（16），只有半星刻度，4.8 顯示 5 顆 | 無 | | 師傅 4.1.2 |
| 帳號頁 `colored_user_gear.png`、`colored_bell.png`（自家彩色圖片） | Phosphor UserGear、Bell（Outline／**Duotone**，淡色層綁 `Brand/TigerYellow` 且不透明，使用者指定） | 無 | | 師傅 4.1.1 |
| 提醒文字 `Colors.grey`（#9E9E9E，14 Regular，對話最上方「師虎提醒您」） | `Body/S`＋`Text/Hint`（#727276） | `Icon/Subtle`（#9E9E9E，非文字 token） | | 師傅 5.1.1、5.2.1 |
| 18 w700（日曆日期）、21 Regular（時間滾輪）、20 w600（「時間」標籤） | `Title/M`（18 Medium）、`Title/L`（20 Medium）、`Heading/4`（20 Medium） | 無 | | 師傅 5.1.7 |
| 日曆停用日 `Colors.black` 38% | `Text/Hint`（沒有停用色 token） | 無 | | 師傅 5.1.7 |
| 時間滾輪選取條（`CupertinoDatePicker` 預設灰 12%） | `Border/Default`（#EDEDED），圓角 `Radius/8` | `Background/Page` | | 師傅 5.1.7 |
| 日曆左側標題內距 16、「時間」列左內距 28、日曆列高 42、時間滾輪高 70 | `Spacing/16`、`Spacing/24`（28 無 token）、固定 42、固定 70 | `Spacing/32` | | 師傅 5.1.7 |
| 通知列底線 `Colors.grey` 0.5px | `Border/Default` 1px | `Border/Subtle`（太深） | | 師傅 6.1.1、6.1.2 |
| 通知列標題 16 Bold、內文與時間 14 Regular、時間灰 (114,114,118) | `Title/S`、`Body/S`、`Body/S`＋`Text/Hint`（數值相同） | 無 | | 師傅 6.1.1、6.1.2 |
| 空狀態離頂部 120、插圖高 112（通知頁，`empty_notification_list.png` 無向量） | 兩層 `Spacing/48`，`EmptyState` Compact 的 Slot 佔位 | 無 | | 師傅 6.1.3 |
| 首次介紹頁「下一步」「繼續」：16 w600 深藍 (31,40,111) 的 `TextButton` | DS `Button` Ghost Action（藍字，lg 高 48） | 自排文字＋`Text/Brand`（深藍相同但不是 DS 元件） | | 客戶端 1.2.1 |
| 首次介紹頁標題 40 w700（預設文字色） | `Display/M`（40 Bold）＋`Text/Primary`，數值完全相同 | 無 | | 客戶端 1.2.1 |
| 首次介紹頁分頁圓點：10px 灰 `Colors.grey`、選中 22×10 深藍 (31,40,111)、間距 6 | 自排：未選中 `Icon/Subtle`（#9E9E9E，與 `Colors.grey` 相同），選中 `Brand/TigerBlue`，間距 `Spacing/12`（兩側各 6） | DS `Carousel` 圓點（8px，規格不同） | | 客戶端 1.2.1 |
| 系統推播橫幅（手機系統畫面） | 自排：白底、`Radius/12`、內距 `Spacing/12`，底圖 `Icon/Subtle` 灰（使用者指定只畫橫幅） | 無 | | 師傅 6.1.4 |

使用者指定的對應即使有數值完全相同的樣式，也照指定的套用。

**想換成另一個 token 時**：在「改為」欄填上想要的 token，或直接告訴 Claude。Claude 會把已畫好的 Frame 中綁到舊 token 的地方一次換掉，再把新值移到「選用」欄並清空「改為」。只在 Figma 手動改某一處的話，不會影響後續批次。

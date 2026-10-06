# 階段 3 查表：Key 與近似對應

畫圖時查用。做法見 fill-figma-ssot Skill（`.claude/skills/fill-figma-ssot/`）。新查到的 Key 與新的近似對應，畫完當下就補進來。

---

## Figma 檔案

| 檔案 | fileKey |
|---|---|
| Design System | `X00A5f1Ohj9BhgbMXwzNuM` |
| 管理員端 | `M5DWva58qmX9Xx3V2O3c3x` |
| 師傅端 | `m0yuXFZN2fkivzTOcwiKJ4` |
| 客戶端 | `G3tNva2zGzIi74Aujg3cLB` |

---

## 元件 Key

在目標檔案用 `importComponentByKeyAsync` 匯入。

| 元件 | Key | 備註 |
|---|---|---|
| AppBar（Standard／None／Solid） | `429b562349bd543539bd47c05de939f8dc3b04d2` | 布林屬性 Has Leading、Has Action、Reserve Status Bar；標題是 Slot 內的 `Title Text`；寬螢幕時填滿並水平置中 |
| AppBar（Standard／None／Image） | `2ccf997e12bce107ab0b65a18589bfd3a9dc3ce4` | 疊在照片上的頂部列：白色狀態列與返回鍵、自帶 12% 暗化遮罩。全螢幕照片畫面隱藏 `Background Image` 與 `Title Text` 圖層。整組 `b64b4a3590ccbbe7a0385f35c6900e23dc6e16e1` |
| FAB（整組，用 `importComponentSetByKeyAsync`） | `814f448a2def64884f0b4882f73be0954fe2f33c` | Type（Default 圖示＋文字／Slot），78px。只有圖示時用 Slot：刪掉 `Slot Rectangle`，放入圖示後手動設 x、y 置中（Slot 沒有 Auto Layout） |
| Image（State=Loaded） | `9e6be81d61b6fac917f0de433ca9e851f96bc138` | 內建貓咪佔位照片；Loading／Error 見 DS 的 Image 頁 |
| HomeIndicator（Style=Light／Dark） | `9cb03ac1b7d42ecdc675aa1340ce88df1f0793ca`／`21b4309f38d5179ef12851dea605b27fdd83270f` | 寬 393；深色背景用 Light |
| 傳送圖示 | 複製 1.2.1 ChatInputBar 裡的 `SendButton`（`I40:609;1062:466`） | icon（Size=24）換成 PaperPlaneRight 實心、TigerBlue；需要相同圖示時直接 `clone()` |
| BottomNavBar（Role=Admin） | `044a5acccdfc31ac252a54d9755071ccf09082ae` | 預設已是聊天室選中；寬螢幕時填滿並水平置中 |
| BottomNavBar（Role=Client／Master） | `167bc7460ac0a4651b7cda4ecebec03f42316652`／`761f43b191c83a8cfa1e2eb1d01838706403e534` | |
| Avatar 60（custom／default） | `6d1d4632eec37682651f0a69bc040bf590c832b2`／`da7fb7e8f71e1e806f8038ebbf42fb6a8d75fc47` | 尺寸有 36／60／75／100／140，見 DS 的 Avatar 頁 |
| Avatar 140（custom／default） | `829fd483ff3100e2f8fdf873807043655f3cfb0f`／`d055bc845e0990c759c5f39bc3ae7b0e2d24de88` | 通話畫面 |
| StatusBar（Style=Light／Dark Content） | `e14c6629a1ad46b3d402fbf96a7909b40022771e`／`da48caf54a006a7e4a7142c3179a1587f8ef7564` | 393×59（375 變體已淘汰）。沒有 AppBar 的畫面單獨放；深色背景用 Light |
| icon（整組，用 `importComponentSetByKeyAsync`） | `3e92f2bfe35a30eaeb557398677d68e18524e14f` | Size（24／20／16）、Icon（Phosphor／Slot）。Phosphor 預設是 Smiley，換圖示見 Skill 的 `screen-types.md`，改色要改內部 Vector 的填色 |
| Phosphor 圖示庫 | libraryKey `lk-bf8c530498484244d086dee012c8c3556de272d639976c99d80f0ea2d5131dc1adf34cd2fe9598d5b27790bea4ffa4e29cc0ec42090b5c8847855be3834a95c8` | `search_design_system` 的 `includeLibraryKeys` 填這個，以圖示名稱搜尋（例如 DownloadSimple、PhoneDisconnect）。每個圖示是元件組，variant 為 Format（Outline／Stroke）× Weight（Regular／Thin／Light／Bold／Fill／Duotone），一律用 Outline |
| DownloadSimple／PhoneDisconnect（元件組） | `25e62441552ff56e6583853a80da89d1c535fa3c`／`9239da56ea75d41615cc45394effcb629a77fac5` | 用 `importComponentSetByKeyAsync` 匯入再挑 variant。下載用 Regular，掛斷用 Fill |
| IconButton（整組） | `f148e16650e8a647c4f0512a528ccfa145fd002d` | Style（Ghost Default／Ghost Inverse／Filled）、Size（md 48／sm 40）、State。Filled 是白底圓形 |
| CornerBadge（保固徽章，整組） | `85657b343c321532eebcb4fa1e46aa704254301e` | 用 `importComponentSetByKeyAsync`。variant Position（BottomRight／BottomLeft）；hasIcon（布林）、Label（文字）。程式的 `WarrantyDayBadge`，貼在卡片右下角時設絕對定位、約束右下 |
| Badge（Dot／Count） | `89064adcc4e7c687617bf0abf4c0530ef7d3f71b`／`2456905712bff8a3265f27e7c36e0f00afda2ed0` | |
| ChatAppBar（Chat=Admin Mode） | `4fea660ac9636ec206d74056ef3e23856792f3a2` | 整組 `c2c2556aba04f3d8c8d43bcb4004943c80271fb6`，其他 variant：To Client／To Master／To Admin。內含 AppBar 與 StatusBar，高 123；姓名是 `Name` 框裡的文字 |
| ChatBackground（Type=Default／Watermark） | `31e32722d54c9e7416febe7a00afb54d55d039c2`／`d769913727fccaea131126fade7e17d27cf35380` | Default 只是綁 `Background/Page` 的底色；放進 Frame 時設絕對定位、約束 Stretch |
| MessageBubble（整組） | `64d16df720ff2534707fc0d827767fca1de57884` | 用 `importComponentSetByKeyAsync` 匯入再依名稱挑 variant。屬性 Type（Text／Image／File／CallLog／Slot／DayMark）、Self Message；氣泡寬度上限 240。訊息文字是 `Bubble` 框裡的文字，時間是 `Meta` 框裡的文字；Self 的已讀狀態是 `Meta` 框裡名為 `Status` 的 instance（元件名 `_Message Status`），屬性 State（Sending／Sent／Failed／Read） |
| ChatInputBar（整組） | `050daf67b1fcafa68d1d402c60b18bde3ab709c9` | 用 `importComponentSetByKeyAsync` 匯入再依名稱挑 variant。高 106，已含 HomeIndicator；輸入框提示文字圖層原文為「Placeholder text」。屬性 State（Collapsed／Expanded）、Content（Empty／Filled）、TimeRequest（布林，管理員設 false，只影響 Expanded）、Reserve Home Indicator（布林）。兩個布林都直接在 ChatInputBar instance 上 `setProperties` |
| BottomSheet（整組） | `623ce912db34f3b5f72ef1e0c2037ef3f9f1f98a` | variant hasHeader（true／false）、Footer（Sticky／Inline）；Title（文字）、leadingIcon、tailingIcon、hasFooter、hasDragHandle（布林）。內容放進 `Content` Slot（先刪掉 `Slot Rectangle`）。短內容用 Footer=Inline，長內容用 Sticky |
| ListItem（整組） | `0255130eee127e0935f6853dca74e7041a9f3035` | variant Trailing（Icon／Slot／None）、State（default／pressed）；Label（文字）、Has Leading Icon、Has Divider（布林）。自帶左右 `Spacing/16`，直接放、寬度填滿 |
| Dialog（Standard／Emphasis） | `c65efcd66dd4013a7e31d53205c959ad418a7bd4`／`079dcccc432c1708fef015ad9299629dc1462aca` | 整組 `2b55cd9f7f7872a2792bfa16829a0c18b154d285`，沒有元件屬性。Standard 寬 300、按鈕水平排列；Emphasis 寬 343、主按鈕實心、垂直堆疊 |
| AppBar（Tall／None／Brand） | `efc873c2b05847cfa181346fa992131319a4f0f0` | 帳號頁頁首。高 214（狀態列 59＋空的第一列 64＋Title 列）；頭像區放進 `Title` Slot（先刪掉 `Title Text`） |
| Avatar 75（custom／default） | `c3822d64f3710381168854c191704361513e0d38`／`cc75fbf7eb48e16f491c7d1ae4efcabc3cacfd56` | 帳號頁頁首頭像 |
| Card（Inset／None） | `f64c6178c1da1ba24c970626af159042bfa6a065` | 整組 `0a964e8beb2f6f7b514d76fa4926d79dd66db241`，variant Layout（Inset／Fill）× Padding（Standard／None）。內容放進 `Slot`（先刪掉 `Slot Rectangle`）。包 ListItem 時用 Padding=None |
| Button（整組） | `86872cf8e34bcd719965b50d7a9ab2abeb291235` | 用 `importComponentSetByKeyAsync` 匯入，依名稱 `Style=…, Size=lg, Shape=rect, State=default` 挑 variant。Label（文字）、hasIconStart、hasIconEnd |
| PhotoViewer | `038549fe7226b232077c23afd9f97e485dda98c0` | 全螢幕照片。Has Send、Has Download（布林，預設關）；`Photo` 外露 Image。Frame 只放一個寬高 Fill 的 instance |
| VoiceCallScreen（Calling／OnCall） | `bf39456318e7736d621186872da2a5a3a8258116`／`bf7b5acd7beb8b894c697198d7cfb9a12dabbdc8` | 整組 `01e69e793d03f6de05d8e07e8984a5b42c6cb775`。Name、Duration（文字）；`Background Photo`、`Avatar` 外露。Frame 只放一個寬高 Fill 的 instance |
| Carousel（整組） | `660324fea70b872a40c347fa093a021b12796245` | 首頁輪播 Banner。variant Page（1／2／3，第幾顆圓點選中）；`Banner Image` 外露 Image。寬度 Fill、高 200 |
| EmptyState（整組） | `069b5a9c06814d2eee42df3e9478452794b86e10` | variant Size（Compact 清單區／Page 整頁）；Title、Description（文字）、Has Illustration、Has Description、Has Action（布林，Has Action 預設開，沒有按鈕時要關）。插圖是 `Illustration` Slot：刪掉 `Slot Rectangle` 後貼入插圖；`Action` 外露 Button |
| PriceRangeIndicator（整組） | `01ffdc80fadaa053617c33f26a7c0039b08006a0` | variant Position（Low／Mid／High）；Min Price、Max Price、Summary（常見價格那一行）、Description（文字）、Has Description（布林，預設開；師傅案件需求要關）。「件數最多」為固定文字 |
| WarrantyPill | `3dbb4100105d33276143a80182fe169dbd1f90ff` | 單一元件。Residential、Commercial、Description（文字）、Has Description（布林，預設開）。和 CornerBadge 不同：這是內容區並列兩種保固 |
| Button（BottomSheet 內） | 從 BottomSheet 的底部按鈕直接改 | Style 有 Primary Filled／Primary Outlined／Secondary Filled／Secondary Outlined／Brand Filled／Neutral Outlined／Ghost Action／Ghost Neutral／Ghost Danger；Size lg／md／sm；Label（文字）。動作選單的「取消」用 Ghost Neutral |

---

## Token 與樣式 Key

變數用 `figma.variables.importVariableByKeyAsync`（不是 `figma.importVariableByKeyAsync`），文字樣式用 `figma.importStyleByKeyAsync` 匯入。只列已用到的，完整清單在 DS 檔案。

| 名稱 | Key |
|---|---|
| `Text/Primary` | `4c768288e8efaf7674e5acc7c012350f409ef906` |
| `Text/Hint`（#727276） | `aeaecce62d5fac12d9af07ea9b9cc9db5dfa3002` |
| `Background/Page`（#F5F5F5） | `c2ad73f62adb2d8740ca6993cf4e7107ec7f8486` |
| `Background/Surface`（#FFFFFF） | `25a536791d69b6c9c1a8b14055fcf914781f9acd` |
| `Background/Inverse`（#2A2A2A） | `b4c57f8d43b1ee0eecfb8918648c4c99a74ac2c1` |
| `Base/Black`（原始色 #000000） | `097e8ad86585bab8f02eeda3ff204dd8978761d1` |
| `Background/Overlay`（浮層遮罩） | `2be39c9de6a074c0b3b0462231ef9a4eb423a5f2` |
| `Spacing/8`／`Spacing/12` | `8553c60279b7619ca64c897f0d2c58d8c3b66775`／`67a4b5ad236fc440d60d6c73b16e476634956c9f` |
| `Spacing/16` | `d83cd74d5f15f468c9a0b21f1b921aea1498c990` |
| `Spacing/2`／`Spacing/32` | `f3e1f7d57728f7edd081803c55856ec51a5a1607`／`197c60a72bcfd6e3f421ea278e69c467c1334fb9` |
| `Spacing/48` | `c12c67e02fe456bb24980764e0f975ac5658a72f` |
| `Heading/4`（20 Medium） | `abfffd46333b70a4306a33ba9f777b4c238e794d` |
| `Title/L`（20 Medium） | `12b6da252d350ebf12cd89584efc49e660a0ec09` |
| `Body/S`（14 Regular） | `12d8e3bd37213cb45a5c8f384594ec0fdb3aee0a` |
| `Radius/Full` | `b73e8cc968980a0228feb1f7af1ca4f41c10fbe4` |
| `Status/Error`（#FF2851） | `95cb702e62654b3fab2f169f8a6b19063eda34bf` |
| `Text/Inverse`／`Icon/Inverse`（白） | `1aa6d7b6c559ffc6cf8829a686fa5da64d9e862b`／`b50ca8e9952006eb895ed1f24032497ed4da5795` |
| `Heading/2`（28 SemiBold） | `310155252a1686cc122dd3ec3464fc47ef18c5d1` |
| `Label/L`（16 Medium） | `d350f65bb698bdfb95f7378ee258b555a92e4f75` |
| `Title/S`（16 Medium） | `4843b58b61eec9235c9023cbb912b2b33872c6ee` |
| `Label/S`（12 Medium） | `120f52c9dc83d5db4d94defe531f5bf8abebdd35` |
| `Body/XS`（12 Regular） | `152f397c33be8e2817cd007f46cafebf96f0b647` |
| `Body/M`（16 Regular） | `ac01a9fbb6ef66b66d47e26bbd75e527884390cb` |
| `Label/M`（14 Medium） | `bcf19c9f818adf3ce00ff1a7c2fdba3a421a1082` |
| `Text/Brand`／`Text/Secondary` | `02dbe31a4ef5ce159871f07911a82d9f7736f40b`／`9b54cce6196f8a95be8e4ae8659aa2661c368e07` |
| `Brand/TigerYellow`／`Brand/TigerBlue`（原始色） | `ebf2c3fa28bb7207313c8650b8a23c94c7de1908`／`98b1177ce8bc0e22a51038c6330d1bbf6165c5f9` |
| `Border/Default`（stroke） | `86042c2ee2e589c6bcdab2724eca23d8227b20c2` |
| `Radius/12`／`Spacing/4` | `eb22a1b5d208fc1a74838aab28a99fec20d83a2a`／`0e5c80bc92a0d5cda616f6739174c390fbba548c` |
| `Heading/3`（24 Medium）／`Title/S`／`Title/M` | `6eb54c54e1c60c5d8263d636f4636d78dd8680d8`／`4843b58b61eec9235c9023cbb912b2b33872c6ee`／`2dcf2a4950a1086708863ecacb4b3311ffce3bb9` |
| `Blue/400`／`Status/Info`（別名 `Blue/500`）／`Text/Link` | `481b28fe502d136df6bfea8125e762df5d0174c1`／`df2aecc3eea4b34b240922072c51ec5a986ecb61`／`607ca0c6b5b15e3be7c84292e8cfe767e8e2f266` |
| `Blue/500`（原始色 #3A89F8） | `78389dfd7aec889f768ea7d2d0fc641064b869f3` |
| `PriceGradient/Light`／`PriceGradient/Deep`（原始色，僅限價格區間） | `5d859c5d4e17528b3c9f32d46c5d5ed212bb2773`／`c014d06c392a9f47e0b79902ae67be3d23871ec4` |
| Phosphor Bell（元件組） | `ebde5899bf4833b05b2ede5d9bb7389d21c0c092`（鈴鐺，程式 `notifications_outlined`，Outline／Regular） |

---

## 近似對應表

程式數值沒有完全相同的 token 或文字樣式時，記錄選用結果。之後遇到同一個程式值，一律照這張表套用。

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
| Phosphor House／Buildings（元件組 Key） | `0408a611f7868ef34a9a0be470492f4070f9d742`／`6405940916f5c3c15b0baf6eaff7c52868153229`，程式 `home`、`business` | 無 | | 師傅 1.2.1 |

使用者指定的對應即使有數值完全相同的樣式，也照指定的套用。

**想換成另一個 token 時**：在「改為」欄填上想要的 token，或直接告訴 Claude。Claude 會把已畫好的 Frame 中綁到舊 token 的地方一次換掉，再把新值移到「選用」欄並清空「改為」。只在 Figma 手動改某一處的話，不會影響後續批次。

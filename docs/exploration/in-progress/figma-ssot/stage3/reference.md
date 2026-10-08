# 階段 3 查表：Figma 檔案與 Key

畫圖時查用。做法見 fill-figma-ssot Skill（`.claude/skills/fill-figma-ssot/`）。新查到的 Key 畫完當下就補進來。近似對應表在 [approximations.md](approximations.md)。

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
| BottomSheet（整組） | `623ce912db34f3b5f72ef1e0c2037ef3f9f1f98a` | variant hasHeader（true／false）、Footer（Sticky／Inline／None）；Title（文字）、leadingIcon、tailingIcon、hasDragHandle（布林）。右側 `Trailing`（Instance swap）可換成 Button Ghost Action sm（`1a78a998ee1768e4f94eb7d2db60f4c79e8e9fac`）放「完成」等文字按鈕，Label 在該 instance 上改；兩側欄固定 64 寬。內容放進 `Content` Slot（先刪掉 `Slot Rectangle`）。短內容用 Footer=Inline，長內容用 Sticky，底部沒有按鈕用 None（Home Indicator 由 BottomSheet 自己放；Sticky、Inline 用 Sticky Footer 內建的） |
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
| SegmentedControl（整組） | `031923bc6ecb635626bd3711935c3eba3e52fd3e` | variant Segments（2／3）、Selected（First／Second／Third）；Label 1 至 3（文字）。程式的 `TwoTabPreferredSizeTabBar` 用它，放進 AppBar（Standard／Slot）的 `Extension Content`（`appendChild` 後設寬度 Fill） |
| Sticky Footer（整組） | `5c19eb106789857e6cf78a3f50131eb70db25f2c` | variant Buttons（Single／Pair／None）× Has Slot（true／false）。Pair 是「取消」「確認」兩顆並排（`Secondary Button`、`Primary Button`），BottomSheet 要雙按鈕時把內層 Sticky Footer 切成 Buttons=Pair；Has Slot 的 Slot 放金額列（師傅 2.4）；Buttons=None 只有 Slot。固定內含 HomeIndicator（不可關閉） |
| TextField（整組） | `dead407394f14e7557d2a92c8657efdf397a2dc1` | variant Lines（Single／Multi）、State（Default／Disabled／Readonly／Focused／Error）、Content（Filled／Empty）；Label、Value Text、Placeholder Text、Helper Text、Counter Text（文字）、Show Label／Show Helper Row／Show Helper Text／Show Counter／Show Suffix Icon（布林）。Show Helper Row 預設開，沒有說明文字也沒有字數時要關掉，整列才會移除、高度才會縮短（2.4 系列已關）。尾端圖示在 `suffix-icon` 裡，用 `swapIcon` 換 Phosphor |
| Banner（整組） | `81ff6287277357f06963f6f495aaba4e26b344ea`；Notice／Solid=false／Leading=Icon 變體 `69d811dc89fed5553e048e7308830b916840eab4` | variant Tone（Info／Notice／Error）、Solid、Leading（None／Icon／Slot）；Message（文字）、Closable／Has Action（布林）。單位選「式」的提醒用 Notice 淡色＋Icon，Closable 關，圖示 Smiley 換成 Phosphor Warning |
| Chip（整組） | `501d1e123c4259e856c2bcb8913f02d5b0ce3bbd` | variant Tone（brand／info）、Selected、Disabled；hasIcon（布林）、Label。單位選擇用 info |
| Tag（整組） | `77c8f1b0e4de0de8d003b30c8d6cbef61032ba93` | variant Tone（Info／Notice／Success／Emphasis）、Solid、Size（Default／Compact）；Label。Info 底 `Status/InfoContainer`＋`Text/Brand`，Emphasis＋Solid 底 `Status/Error`＋白字；14 Medium，內距 12×4，全圓角 |
| Avatar（整組，Source×Size） | `1bc96b71ade9ad4185b9379223854dffe5863803` | 用 `importComponentSetByKeyAsync`，variant Source（default／custom）、Size（36／60／75／100／140）。師傅 2.8.2 用 Source=custom、Size=100 |
| Rating（整組） | `4e42ab06db4ac4996a696be212d304310cc9ec44` | variant Size（lg／sm）、Rate（5、4.5、4…，半星）。lg 高 24、寬 136，對應程式 `RatingBar` itemSize 24 |
| StatusBar（Dark Content）、HomeIndicator（Dark） | 見上表 | 沒有 AppBar 的全頁（師傅 2.8.1、2.8.2）：頂部只放 StatusBar，底部放 HomeIndicator |
| Phosphor FloppyDisk／PlusCircle／PencilSimple／Warning／X（元件組） | `3cdafa3c1a777cc3f0f4d3a1e0828b0392a7444b`／`5f1f5f94bd1f88e1f4ca6599c7cc08f5e0343de6`／`953d0ad703b16697cdf551119e3206479c774c71`／`b627e5e07e748bdb388b5c66e915887b60a65485`／`e82a7a45eeb09f58f707fedee9b2f3de32df05de` | 程式 `save_outlined`、`add_circle_outline`、`create_outlined`、`warning_rounded`、`close`，Outline／Regular |
| Button（BottomSheet 內） | 從 BottomSheet 的底部按鈕直接改 | Style 有 Primary Filled／Primary Outlined／Secondary Filled／Secondary Outlined／Brand Filled／Neutral Outlined／Ghost Action／Ghost Neutral／Ghost Danger；Size lg／md／sm；Label（文字）。動作選單的「取消」用 Ghost Neutral |

---

## Token 與樣式 Key

變數用 `figma.variables.importVariableByKeyAsync`（不是 `figma.importVariableByKeyAsync`），文字樣式用 `figma.importStyleByKeyAsync` 匯入。只列已用到的，完整清單在 DS 檔案。

| 名稱 | Key | 備註 |
|---|---|---|
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
| `Status/Success`（#1AA354） | `9de14b9eb2da711a02df74dd216927508e2626b2` |
| `Radius/4`／`Radius/8` | `ad61f7f2bfe7abe247524688b7952c8168ebe00e`／`b38dec1c188cdf374088c605831b5edb6a69bdbc` |
| `Spacing/20`／`Spacing/24`／`Spacing/40` | `4d98dce690ea3d64883dd650d76bcc1139e181bd`／`59ee6610248e15d1ca768de02bd29049a02b8c6a`／`e36fed52983ee661aa218b3b5862e897518c0484` |
| Phosphor CaretRight／ChatDots／Headset（元件組） | `d7f0bb51360e472eaf4688628e92d3165c0bab23`／`ae283edde49c40eeb524dac605576f04152679f5`／`76f4b9b91e5c44e4d33b67a308659db075aad011`（箭頭、對話氣泡 sms_outlined、客服耳機，Outline／Regular） |
| `Status/InfoContainer`／`Status/ErrorContainer`／`Background/Notice` | `b7fa6fff58eadf3dc5b38f54bc83cbd3d3b2b7df`／`8a87dd88a3b35d3f4c1cf4daee615412d663aa5a`／`3d4813956348eb7235f2c9e1c545d34a5bc0c17b` | 淺藍、淺紅、淺黃底（Tag 與提醒框用） |
| `Interactive/OnFilled`／`Chip/InfoSelected` | `cbf5078d3270c00fb293c07a635c65d66abf4ac7`／`318c7e9abe7107fa2279228b6c8724f12383c234` | 實心底上的字色／選中的 info Chip 底色 |
| `Border/Subtle`（#9E9E9E） | `189f9120d0ad0cc3feff78704618c3b481d6a45b` | 與程式 `Colors.grey` 相同；提醒框外框（師傅 2.8.1） |
| Switch（整組，variant State × Selected）／Phosphor UserGear（元件組） | `725b56a0b9d2298034ea4f3f37db10201d0e2abb`／`5a6a2905efce7a71f92884d380d50ae1756388ea` | Switch 40×20，放 ListItem 的 Trailing Slot；UserGear 對應 `colored_user_gear.png`，帳號首頁用 Outline／Duotone |
| Phosphor CaretLeft／CaretDown（元件組）／`Interactive/Action`／`Icon/Default`／`Icon/Subtle` | `6c0b7f857a2a3b761d5731c62f51295d3d1ca36d`／`3123b154077e5b1d2b261c04357275cde472901b`／`07aa36da7de6e8dbae477c2e8ab2e161f3ed5aaa`／`52b48f39822225eece13a42f85ca18095b6f4e60`／`0f2d615857bdcfc72b98bba019c0f5829e73ab8c` | 日期選擇面板（師傅 5.1.7）：月份箭頭、下拉箭頭，選取日的藍框與藍字，停用的上個月箭頭 |
| Phosphor Bell（元件組） | `ebde5899bf4833b05b2ede5d9bb7389d21c0c092`（鈴鐺，程式 `notifications_outlined`，Outline／Regular） |
| logo（單一元件，「師虎來了」字標） | `6d234a1db0e1d5654251e6a7b4630e94606700e7`（原 206×60；啟動畫面縮成高 68 用 `rescale(68/高)`，不用 `resize`） |
| Logo-AppIcon（單一元件） | `e30102d71a06084634ef1f9aec8ac2cfe8bbdfd0`（師虎 App 圖示，原尺寸 64；縮小用 `rescale`，不能用 `resize`） |
| Phosphor CaretUp（元件組） | `07ed6a8449b09a06f62c590259d38904bc91537d`（程式 `expand_less`，通知列展開；收合用既有 CaretDown） |
| Phosphor House／Buildings（元件組） | `0408a611f7868ef34a9a0be470492f4070f9d742`／`6405940916f5c3c15b0baf6eaff7c52868153229` | 程式 `home`、`business`（保固膠囊） |
| Phosphor XCircle／Eye／EyeSlash（元件組） | `997b8a8219ac3e43540cdfb1982b330ee014aed7`／`76cf682ef7692e44fae98814f459ac233e5230cc`／`e8581bef72d81910eafd74fc4b41d878eaf328fc` | 程式 `cancel`（輸入框清除）、`visibility`、`visibility_off`，Outline／Regular |
| Phosphor PaperPlaneTilt／PencilSlash／Microphone（元件組） | `191227f529380b5ce6c3f1732e016ad1b3c5f67b`／`734454e737fede1b83429b6ba1649eb2d943fed9`／`b953b98588b2c4f37df4e5e35bdec4cac56d049b` | 程式 `send_outlined`（寄送說明）、`edit_off`（唯讀手機欄）、麥克風權限，Outline／Regular |
| PasswordField（整組） | `0e9ad408b351837f924ab660e6b06b3a833f882e` | 密碼輸入欄，客戶端 1.3.4 用 |
| AppBar（Tall／Overlay／Brand）登入表單頁 | 同 AppBar 整組，variant Type=Tall、Extension=Overlay、Background=Brand | 總高 225；`Title` Slot 放標題加副標，`Extension Content` 放卡片 |
| Phosphor MagnifyingGlass／Lightbulb／CurrencyCircleDollar／Handshake／Users／ShieldCheck／Lightning／Note（元件組） | `db1945ccac1ffb0fafe23afe69521677a376e3ed`／`6d8625fb0b11035d5062ec629ea2dda0a2527d74`／`60664e9489b5122d16e3d059228cd30daf5ae896`／`7a37e9c679cebd6e72e2661370d1796d7ca5f378`／`507af50bbd8ec03b8ce79037ed9319c08429f151`／`7a95e573de4a53fbfdc3c0d8ddd193c25a401c74`／`6bcdbfdd315de9e39d34819d56701194c40c1bd5`／`82b618f8e8a12b3daf5b91990f8b2a4d49ead85d` | 客戶端首頁：搜尋 `search`、`light_bulb.png`、客戶保障五個彩色圖示（Duotone）、進行中訂單 `colored_note.png`（Duotone） |
| SearchBar（整組） | `e747cffc88c30e81c03009389041145273f65c98` | variant Type（Boxed 高 48／Lined 高 60）× Content（Empty／Filled）；Placeholder Text、Value Text（文字） |
| Calendar | `9e894a6501d4a6fd1096f346f7da779b8270418b` | 月曆，寬 393。Month（文字）、Show Week 6（布林）；日期格是 `_CalendarDay` instance（`Week 1` 至 `Week 6` 列），逐格改 Day（文字）、State（Default／Selected／Disabled）與 Today（true／false），空格清空 Day；預設選今天為 State=Selected、Today=true。上個月箭頭 `Prev Button` 預設 40% 透明度（停用） |
| WheelPicker | `ace17c3166e859f93e79c14ea57440cc8b311393` | 滾輪，寬 393、高 70。Has Label、Label（「時間」）、Show Column 3；`Column 1` 至 `Column 3` 是外露的 `_WheelColumn`，改 Prev、Value、Next。日期時間選擇：BottomSheet（hasHeader、Footer=None、Trailing 換 Ghost Action sm）的 Content 依序放 Calendar、WheelPicker，Slot 間距 32 |

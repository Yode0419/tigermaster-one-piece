# 階段 3 查表：Key 與近似對應

畫圖時查用。做法見 [method.md](method.md)。新查到的 Key 與新的近似對應，畫完當下就補進來。

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
| BottomNavBar（Role=Admin） | `044a5acccdfc31ac252a54d9755071ccf09082ae` | 預設已是聊天室選中；寬螢幕時填滿並水平置中 |
| BottomNavBar（Role=Client／Master） | `167bc7460ac0a4651b7cda4ecebec03f42316652`／`761f43b191c83a8cfa1e2eb1d01838706403e534` | |
| Avatar 60（custom／default） | `6d1d4632eec37682651f0a69bc040bf590c832b2`／`da7fb7e8f71e1e806f8038ebbf42fb6a8d75fc47` | 其他尺寸見 DS 的 Avatar 頁 |
| Badge（Dot／Count） | `89064adcc4e7c687617bf0abf4c0530ef7d3f71b`／`2456905712bff8a3265f27e7c36e0f00afda2ed0` | |
| ChatAppBar（Chat=Admin Mode） | `4fea660ac9636ec206d74056ef3e23856792f3a2` | 整組 `c2c2556aba04f3d8c8d43bcb4004943c80271fb6`，其他 variant：To Client／To Master／To Admin。內含 AppBar 與 StatusBar，高 123；姓名是 `Name` 框裡的文字 |
| ChatBackground（Type=Default／Watermark） | `31e32722d54c9e7416febe7a00afb54d55d039c2`／`d769913727fccaea131126fade7e17d27cf35380` | Default 只是綁 `Background/Page` 的底色；放進 Frame 時設絕對定位、約束 Stretch |
| MessageBubble（整組） | `64d16df720ff2534707fc0d827767fca1de57884` | 用 `importComponentSetByKeyAsync` 匯入再依名稱挑 variant。屬性 Type（Text／Image／File／CallLog／Slot／DayMark）、Self Message；氣泡寬度上限 240。訊息文字是 `Bubble` 框裡的文字，時間是 `Meta` 框裡的文字；Self 的已讀狀態是 `_Message Status` instance（Sending／Sent／Failed／Read） |
| ChatInputBar（整組） | `050daf67b1fcafa68d1d402c60b18bde3ab709c9` | 用 `importComponentSetByKeyAsync` 匯入再依名稱挑 variant。高 106，已含 HomeIndicator；輸入框提示文字圖層原文為「Placeholder text」。屬性 State（Collapsed／Expanded）、Content（Empty／Filled）、TimeRequest（布林，管理員設 false，只影響 Expanded）、Reserve Home Indicator（布林）。兩個布林都直接在 ChatInputBar instance 上 `setProperties` |
| BottomSheet（整組） | `623ce912db34f3b5f72ef1e0c2037ef3f9f1f98a` | variant hasHeader（true／false）、Footer（Sticky／Inline）；Title（文字）、leadingIcon、tailingIcon、hasFooter、hasDragHandle（布林）。內容放進 `Content` Slot（先刪掉 `Slot Rectangle`）。短內容用 Footer=Inline，長內容用 Sticky |
| ListItem（整組） | `0255130eee127e0935f6853dca74e7041a9f3035` | variant Trailing（Icon／Slot／None）、State（default／pressed）；Label（文字）、Has Leading Icon、Has Divider（布林）。自帶左右 `Spacing/16`，直接放、寬度填滿 |
| Button | 從 BottomSheet 的底部按鈕直接改 | Style 有 Primary Filled／Primary Outlined／Secondary Filled／Secondary Outlined／Brand Filled／Neutral Outlined／Ghost Action／Ghost Neutral／Ghost Danger；Size lg／md／sm；Label（文字）。「取消」用 Neutral Outlined |

---

## Token 與樣式 Key

用 `importVariableByKeyAsync`、`importStyleByKeyAsync` 匯入。只列已用到的，完整清單在 DS 檔案。

| 名稱 | Key |
|---|---|
| `Text/Primary` | `4c768288e8efaf7674e5acc7c012350f409ef906` |
| `Text/Hint`（#727276） | `aeaecce62d5fac12d9af07ea9b9cc9db5dfa3002` |
| `Background/Page`（#F5F5F5） | `c2ad73f62adb2d8740ca6993cf4e7107ec7f8486` |
| `Background/Surface`（#FFFFFF） | `25a536791d69b6c9c1a8b14055fcf914781f9acd` |
| `Background/Overlay`（浮層遮罩） | `2be39c9de6a074c0b3b0462231ef9a4eb423a5f2` |
| `Spacing/8`／`Spacing/12` | `8553c60279b7619ca64c897f0d2c58d8c3b66775`／`67a4b5ad236fc440d60d6c73b16e476634956c9f` |
| `Spacing/16` | `d83cd74d5f15f468c9a0b21f1b921aea1498c990` |
| `Title/S`（16 Medium） | `4843b58b61eec9235c9023cbb912b2b33872c6ee` |
| `Label/S`（12 Medium） | `120f52c9dc83d5db4d94defe531f5bf8abebdd35` |
| `Body/XS`（12 Regular） | `152f397c33be8e2817cd007f46cafebf96f0b647` |

---

## 近似對應表

程式數值沒有完全相同的 token 或文字樣式時，記錄選用結果。之後遇到同一個程式值，一律照這張表套用。

| 程式值 | 選用 | 其他候選 | 改為（使用者填） | 出現位置 |
|---|---|---|---|---|
| `#FAFAFA`（Material 2 頁面背景） | `Background/Page`（#F5F5F5） | `Background/Surface`（#FFFFFF） | | 管理員 1.1.1 |
| 12px Medium 灰（聊天室列表的最後訊息） | `Body/XS`（使用者指定，只限此頁面，不作通用規則） | `Label/S`（數值完全相同） | | 管理員 1.1.1 |
| 10px（聊天室訊息列表上方 padding） | `Spacing/8` | `Spacing/12` | | 管理員 1.2.1 |

使用者指定的對應即使有數值完全相同的樣式，也照指定的套用。

**想換成另一個 token 時**：在「改為」欄填上想要的 token，或直接告訴 Claude。Claude 會把已畫好的 Frame 中綁到舊 token 的地方一次換掉，再把新值移到「選用」欄並清空「改為」。只在 Figma 手動改某一處的話，不會影響後續批次。

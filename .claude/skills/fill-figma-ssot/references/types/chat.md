# 畫面類型：聊天與媒體

聊天室、約施工時間訊息、全螢幕照片、通話畫面。

元件 Key 見 `docs/exploration/in-progress/figma-ssot/stage3/reference.md`，三區結構、卡片、Dialog、圖示等通則見 `../screen-types.md`。

---

## 聊天室

第一個案例：管理員 1.2.1。

- 背景用 ChatBackground instance，`float()` 放在最底層、約束 Stretch。
- 頂部 ChatAppBar（依角色選 variant），底部 ChatInputBar。
- `Scroll Content` 主軸對齊設為頂部：訊息少時貼在上方；訊息超出畫面時，進入聊天室會停在最底部，所以只畫最新的一屏，從頂部排起、最後一則貼近輸入列。
- `Scroll Content` 左右 padding `Spacing/16`、訊息間距 `Spacing/8`、上方 padding `Spacing/8`（底部 padding 見三區結構）。
- 每則訊息包一層寬度 Fill 的水平 Auto Layout：對方的訊息靠左、自己的訊息靠右、日期分隔置中。
- 同一聊天室的不同狀態（例如展開輸入列），複製上一格的子圖層，只換有變化的部分。
- **客戶聊天室**（師傅 5.1，程式 `ToClientChatroom`）頂部多一條可關閉的提醒：DS `Banner`（Tone=Error、Solid=false、Leading=None、Closable 開），**文字與關閉圖示綁 `Status/Error`**（使用者指定），放在 ChatAppBar 與 `Content` 之間（固定區，不隨訊息捲動），左右 `Spacing/8`。ChatAppBar 用 To Client variant，姓名改 `Name` 框裡的文字（後端 `obscureName`，姓氏加先生／小姐）。客服聊天室（To Admin variant）沒有這條提醒，背景用 ChatBackground（Watermark）。
- 對話最上方的說明文字（程式 `topInsert`，`Body/S`＋`Text/Hint`，左右 `Spacing/32` 合計）放在 `Scroll Content` 第一項。訊息超出一屏時它會被捲出畫面，該狀態省略它，只畫最新一屏。
- **每個狀態都要驗證**：展開輸入列後內容區縮短 64，最後一則訊息不能被切到（必要時把示意訊息縮成一行）；`Content` 高度與 `Scroll Content` 高度要比對。
- 失敗狀態的自己訊息：`Status` 子實例的 `State` 屬性設 Failed（Meta 內名為 `Status` 的 instance）。

## 約施工時間訊息（聊天室）

第一個案例：師傅 5.1.8 至 5.1.10（程式 `TimeRequestMessage`、`chatroom.dart` 的 `replyTimeRequest`）。

- 請求訊息文字格式「請問 yyyy年MM月dd日, HH:mm ，可以與您約定施工時間嗎?」，**自己送出的是黃底一般氣泡**（MessageBubble Text，Self）。**對方送來的**是白底卡：MessageBubble Type=Slot（氣泡內距改 0），Slot 放本機元件 `TimeRequestCard`（TEXT 屬性 Message；內容為訊息文字、1px 分隔線、「取消」Ghost Neutral 與「確認」Ghost Action 兩顆 Button md 並排填滿）。
- **回覆是新增一則訊息**（後端不改原請求）：「同意更改施工時間至 …」或「拒絕更改施工時間至 …」，由回覆的人送出，所以原請求的白底卡按鈕仍在。**同意時同一方的 App 另外送出**一則一般文字「【系統訊息】施工時間更改至yyyy年MM月dd日，HH:mm」（日期後是全形逗號；拒絕不送）；師傅按確認它是自己的黃底氣泡，客戶按確認師傅看到白底氣泡。
- 一個流程拆成多格：自己發起後對方的回覆（5.1.8）、師傅按確認（5.1.9）、師傅按取消（5.1.10），三格都只畫最新一屏。

## 全螢幕照片（程式的 `DetailImage`、`SendImageConfirm`）

第一個案例：管理員 1.2.4、1.2.6。

- 用 DS 的 `PhotoViewer`，Frame 只放一個寬高 Fill 的 instance。
- 看照片且程式有下載網址時開 Has Download；傳送前確認開 Has Send。
- 黑底是 `Base/Black`（元件已內建）。

## 通話畫面（程式的 `IOSCallerControlPage`）

第一個案例：管理員 1.3.1、1.3.2。

- 用 DS 的 `VoiceCallScreen`（State=Calling／OnCall），Frame 只放一個寬高 Fill 的 instance，改 Name 與 Duration。

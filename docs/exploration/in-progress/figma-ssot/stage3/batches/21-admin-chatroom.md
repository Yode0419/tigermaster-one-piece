# 批次 21：管理員端／1 客服聊天室

- **Figma**：[APP_管理員 → 1 客服聊天室](https://www.figma.com/design/M5DWva58qmX9Xx3V2O3c3x/APP_管理員)
- **Evidence**：Flutter repo `docs/figma-ssot/evidence/T-0110.md`（10 個 Frame 都在這份）
- **紀錄方式**：試做批次，每個 Frame 寫完整對照表（見 [method.md](../method.md)「批次紀錄怎麼寫」）

---

## Frame 清單

| Frame | 狀態 |
|---|---|
| 1.1.1 聊天室列表 | 已完成 |
| 1.2.1 與客戶／師傅對話 | 已完成 |
| 1.2.2 展開更多功能 | 已完成 |
| 1.2.3 選擇照片來源 | 已完成 |
| 1.2.4 確認傳送照片 | 已完成 |
| 1.2.5 確認重送訊息 | 已完成 |
| 1.2.6 檢視與下載照片 | 已完成 |
| 1.3.1 撥出中 | 已完成 |
| 1.3.2 通話中 | 已完成（同上） |
| 1.3.3 對方正在通話中 | 已完成 |

**批次驗收（2026-10-05）**

- 結構檢查（腳本）：10 個 Frame 名稱與數量不變、都是 393×852，佔位文字已全部刪除，Frame 與本機元件裡沒有寫死的顏色。腳本列出 1.1.1 有 8 個名為 Avatar 的一般 Frame，查證後是 `AdminChatroomListItem` 裡包住頭像與紅點的外框，頭像本身仍是 DS instance，沒有被拆開的元件。
- 內容對照：每個 Frame 畫完都已截圖對照程式。
- 使用者確認：10 個 Frame 都已確認。

---

## 本機元件

- `AdminChatroomListItem`：放在本 Page 右側的「本機元件」Section。屬性：Name、Info、Last Message、Time（文字）、Unread（顯示紅點）；頭像為可切換的 Avatar instance。
- `PhotoViewer`：全螢幕照片檢視，用於 1.2.4、1.2.6。屬性 Has Send；下載鍵切換外露 AppBar 的 Has Action；`Photo` 外露。
- `VoiceCallScreen`：通話畫面，用於 1.3.1、1.3.2。variant State（Calling／OnCall）；文字屬性 Name、Duration（只有 OnCall 用到）；背景照片 `Background Photo` 與頭像 Avatar 外露。

---

## 1.1.1 聊天室列表（2026-10-05）

**程式**：`admin_main_page.dart`、`admin_chatroom_list.dart`、`admin_chatroom_list_item.dart`

**實際步驟**（第一個 Frame，步驟已整理進 [method.md](../method.md)）

1. 讀 evidence index 找到 T-0110，再讀「分析與判斷」表取得程式檔與行號。
2. 讀程式檔：頁面、列表元件、主題設定（`main.dart`：Material 2、字型、日期語系）。
3. 在 DS 檔案用 `use_figma` 逐頁列出元件與屬性、variables 與文字樣式的 key。
4. 在管理員檔案暫時建立 instance 看內部結構，看完刪掉。
5. 沒有元件的區塊先做成本機元件，再組畫面，最後截圖確認。

**對照程式的判斷**

| 項目 | 程式現況 | Figma 做法 |
|---|---|---|
| 背景 | Material 2 預設 `#FAFAFA` | 沒有完全相同的 token，綁 `Background/Page`（#F5F5F5） |
| AppBar | 黃底、標題置中、20px 粗體、Material 2 陰影 | AppBar（Standard／None／Solid），關閉 Leading 與 Action；標題維持元件的 `Title/M`，陰影由元件本身提供（最初自行覆寫字重與陰影，經使用者確認改回） |
| 列表列 | 頭像 60 + 未讀紅點、姓名角色 16/500、說明與最後訊息 12/500 灰、時間 12 灰 | 本機元件 `AdminChatroomListItem`，灰色 (114,114,118) 正好等於 `Text/Hint`；最後訊息由使用者改為 `Body/XS`；文字欄由固定 196px 改為填滿 |
| 寬螢幕 | 無 | 使用者調整 DS 的 AppBar 與 BottomNavBar，寬螢幕時填滿並水平置中；BottomNavBar 高度改為 82，中央 Logo 圓圈蓋在內容上 |
| 聊天室說明 | 後端寫入「訂單編號-工項名稱」，編號格式為 RO + 日期 + 5 碼流水號（來自後台測試資料） | 示意資料照此格式 |
| 時間 | `M/d aahh:mm`，語系 zh_TW | 「10/5 下午03:42」 |
| 未讀紅點 | `badges` 套件預設約 10px | 用 Badge（Dot，8px）元件，不覆寫尺寸 |
| 底部導覽 | 聊天室／無／無／帳號，中央 Logo 無文字 | BottomNavBar（Role=Admin），預設已是聊天室選中 |

**遇到的問題**

- `chatroomInfo` 內容 App 端看不到，要追到後端（Functions）和後台測試資料才知道格式。之後遇到後端組成的文字，要預留追查時間。
- Material 2 的預設值（背景色、AppBar 字級與陰影）不寫在程式裡，要靠 Flutter 預設值判斷。
- 程式字級沒有剛好對應的文字樣式時（20px 粗體），最初套最接近的樣式再覆寫字重；使用者決定改用 Design System 規格（見 [stage3.md](../stage3.md) 決策）。
- 畫面最初用絕對座標排版，改變 Frame 尺寸時內容不會跟著調整，改為三區 Auto Layout（見決策）。

---

## 1.2.1 與客戶／師傅對話（2026-10-05）

**程式**：`admin_chatroom_list.dart`（進入時的標題）、`from_admin_chatroom.dart`、`message_list.dart`、`message_builder.dart`、`text_message.dart`、`day_mark_message.dart`、`chatroom_input_bar.dart`、`scaffold_bottom_sheet.dart`

**對照程式的判斷**

| 項目 | 程式現況 | Figma 做法 |
|---|---|---|
| 背景 | Material 2 預設 `#FAFAFA` | ChatBackground（Default），本身綁 `Background/Page`；絕對定位、約束 Stretch |
| 頂部 | AppBar 底色 `#FAFAFA`、無陰影、返回鍵、標題「與{姓名}對話」粗體、右側深藍電話鍵 | ChatAppBar（Admin Mode），姓名改為「陳怡君」。標題用不含角色的姓名（列表才在姓名後加「客戶／師傅」）。底色與陰影維持元件樣式 |
| 訊息列表 | 反向列表且依內容決定高度：訊息少時貼在頂部，超出畫面時進入就停在最底部；左右邊距 16、上下各 4 | `Content` 頂部對齊（最初設為底部對齊，經使用者指正改回）；左右 padding `Spacing/16`、訊息間距 `Spacing/8`；上方 padding 10 用 `Spacing/8`（近似） |
| 判斷誰是自己 | 發送者為 `admin` 的訊息算自己的，靠右黃底 | 管理員訊息用 Self Message=true，客戶訊息用 false |
| 文字訊息 | 寬度上限為螢幕 70%（約 275）、圓角 10、頭像 36 與氣泡間距 8、自己的訊息黃底 `#FFC827` | MessageBubble（Text），維持元件的寬度上限 240、`Radius/8`、間距 12、`Interactive/Brand` |
| 時間與已讀 | 時間格式 `ah:mm`（例如「下午3:42」）；自己的訊息在時間**前面**顯示「已讀」或打勾 | 時間照程式格式；已讀維持元件順序（時間在前、已讀在後），用 Read 狀態 |
| 日期分隔 | `M/dd(E)`，例如「10/05(週一)」 | MessageBubble（DayMark），置中 |
| 示意對話 | — | 接 1.1.1 第一列（陳怡君、RO2026100500012-水管漏水），最後一則「請問師傅大概幾點會到？」下午3:42 與列表一致 |
| 輸入列 | 白底加陰影的底部區；「更多功能」+、輸入框提示「Aa」、深藍傳送鍵；管理員沒有「約施工時間」 | ChatInputBar（Collapsed／Empty），提示改「Aa」，TimeRequest 關閉（Collapsed 本來就沒有日期按鈕，畫 Expanded 時才有影響） |
| 載入中骨架 | `MessageListLoading` | 依 evidence 併入本格，不另畫 |

**遇到的問題**

- ChatInputBar 在 DS 檔案裡有，但沒有發布到元件庫，匯入失敗。先畫其他部分，使用者發布後補上。已在 [method.md](../method.md) 加上「先試匯入」的步驟。
- 元件與程式有幾處不同（氣泡寬度上限、圓角、頭像間距、已讀與時間的順序、AppBar 陰影），依決策維持元件樣式，只記在上表，沒有覆寫。

---

## 1.2.2 展開更多功能（2026-10-05）

**程式**：`chatroom_input_bar.dart`（展開狀態）、`from_admin_chatroom.dart`（管理員只傳入照片與文字的 callback）

**對照程式的判斷**

| 項目 | 程式現況 | Figma 做法 |
|---|---|---|
| 其他區塊 | 與 1.2.1 相同 | 複製 1.2.1 的背景、頂部列與訊息列表 |
| 左側按鈕 | 展開後變成叉叉圖示加「收起功能」 | ChatInputBar（Expanded／Empty），元件本身就是「收起功能」 |
| 功能列 | 只有傳入 callback 的功能才顯示；管理員只有「傳送照片」，沒有「約施工時間」 | TimeRequest 關閉，只留「傳送照片」 |
| 輸入框 | 提示「Aa」 | 同 1.2.1 |
| 訊息列表 | 程式的輸入列是蓋在內容上方的底部區，展開時會多蓋住一些訊息 | 三區結構下內容區自動縮短；訊息靠上對齊且不多，畫面上沒有差異 |

**DS 沒有、由 Claude 自己排的部分**：沒有（全部沿用 1.2.1）。

**遇到的問題**

- 複製 1.2.1 的輸入列後用 `setProperties` 切到 Expanded，提示文字「Aa」的寬度沒有重算，超出外框被切掉。DS 元件本身正常，改成刪掉後直接建立 Expanded 的新 instance 就好了。已寫進 [method.md](../method.md)。

---

## 1.2.3 選擇照片來源（2026-10-05）

**程式**：`chatroom_input_bar.dart`（`_showImagePicker`）、`image_select_bottom_sheet.dart`

**對照程式的判斷**

| 項目 | 程式現況 | Figma 做法 |
|---|---|---|
| 底圖 | 從展開的輸入列點「傳送照片」打開 | 複製 1.2.2 |
| 選單樣式 | iOS 動作選單（CupertinoActionSheet），Android 上也一樣 | 依決策改用 BottomSheet（hasHeader=false、Footer=Inline、開啟拖曳把手），參考 M3。外觀與 App 不同，內容不變 |
| 選項 | 「開啟相機拍攝」「從圖庫中選擇照片」，16px 藍字，無圖示 | 兩列 ListItem（Trailing=None、關閉前方圖示、最後一列關閉分隔線），文字與順序照程式 |
| 取消 | 獨立在下方的「取消」，藍字 | 按鈕區的 Button 改為 Ghost Neutral「取消」，接在選項下方（不做成第三個選項，因為取消是「不做任何事」） |
| 遮罩 | 系統預設半透明黑，蓋住整個畫面 | `Scrim` 綁 `Background/Overlay`，蓋滿含狀態列 |
| 圖庫多選 | 管理員為多選，最多 10 張 | 屬於系統挑選畫面，不畫 |

**DS 沒有、由 Claude 自己排的部分**

- `Scrim`：一個蓋滿 Frame 的外框，填色綁 `Background/Overlay`。DS 沒有遮罩元件。
- BottomSheet 的 Slot 間距由 `Spacing/8` 改為 0，讓兩列 ListItem 緊貼、分隔線在兩列正中間。（最初另包一層 `Options` 外框補左右 16，ListItem 擴充後已拿掉。）
**遇到的問題**

- DS 沒有 iOS 動作選單元件。與使用者討論後定出「照 Flutter 與照 DS 的分界」，記在 [stage3.md](../stage3.md) 決策。
- 第一版用 Sticky 底部按鈕區：內容短時按鈕區蓋住第二個選項，手動固定高度後，「取消」又被分隔陰影隔成另一區、下方多出空白，使用者覺得奇怪。討論後參考 M3，擴充 DS 的 BottomSheet（Footer=Inline、拖曳把手，見 stage3.md 決策），再用新版重畫。
- 擴充 DS 時，複製出來的 variant 遺失屬性連結，Slot 也變成一般 Frame（Plugin API 的行為），要用 `createSlot()` 重建並接回原屬性，再刪掉多產生的屬性。

---

## 1.2.4 確認傳送照片（2026-10-05）

**程式**：`chatroom_input_bar.dart`（`_showImagePicker`：只有圖庫選一張時才進確認頁，相機或多張直接送出）、`send_image_confirm.dart`

**對照程式的判斷**

| 項目 | 程式現況 | Figma 做法 |
|---|---|---|
| 版面 | 全螢幕照片，AppBar 疊在照片上方（`extendBodyBehindAppBar`），沒有底部區 | Frame 只放 `Content`（填滿整個 Frame）；AppBar、FAB、HomeIndicator 都設為絕對定位疊在上面 |
| 背景 | `PhotoView` 預設純黑 | Frame 填色綁 `Base/Black`（原始色）。最初用 `Background/Inverse`（#2A2A2A），AppBar 的 12% 遮罩在灰底上看出帶狀，使用者改為 `Base/Black` |
| 照片 | `PhotoView` 置中、等比縮放到完整顯示 | Image（State=Loaded）寬度填滿、高 295（4:3），在 `Content` 垂直置中 |
| 頂部 | AppBar 底色 `black26`、白色 iOS 返回箭頭、無標題、無右側按鈕 | AppBar（Standard／None／Image）：Has Action 關閉、隱藏元件內的 `Background Image`（讓下方照片透出）與 `Title Text`；元件自帶 12% 暗化遮罩與白色狀態列 |
| 傳送鍵 | 右下角 FAB，白底、深藍 `Icons.send`，56px，無文字 | FAB（Type=Slot），Slot 內放輸入列同一個傳送圖示（PaperPlaneRight 實心、TigerBlue）；維持元件的 78px 與陰影；距右 16、距 HomeIndicator 上緣 16 |
| 底部系統列 | 系統 Home 指示條 | HomeIndicator（Style=Light）寬 393 貼底 |
| 示意照片 | 管理員從圖庫選的照片 | Image 元件內建的貓咪照片（Plugin API 不能自行上傳圖片），使用者決定維持 |
| 返回 | 回傳 false，回到聊天室不送出 | 只畫畫面本身 |

**DS 沒有、由 Claude 自己排的部分**

- 全螢幕照片檢視的整體版面（黑底、照片置中、AppBar 疊在照片上）。DS 沒有這種畫面的元件或樣板，1.2.6 會再出現一次。
- 隱藏 AppBar（Image）裡的 `Background Image` 與 `Title Text` 兩個圖層。元件沒有對應的開關，是 Claude 判斷「照片在 AppBar 下方透出」比較接近程式。
- FAB 用 Type=Slot 自放圖示。DS 規格寫 Slot「目前無實際使用情境，暫不建議用於正式畫面」，但 Default 一定有文字，程式沒有文字，只好用 Slot。這是 Slot 的第一個案例。
- FAB 的位置（右 16、下 16）照 Flutter `endFloat` 的預設邊距，沒有綁 token（絕對定位的座標不能綁變數）。

**遇到的問題**

- 黑底沒有語意 token：`Background/Inverse` 是 #2A2A2A，AppBar 的 12% 遮罩在灰底上會看出一條較深的帶狀。使用者決定改用原始色 `Base/Black`（見 stage3.md 決策）。
- 示意照片：Plugin API 不支援 `createImageAsync`，無法放入與「水管漏水」對話相符的照片，目前是 DS 的貓咪佔位照片。
- FAB 的 Slot 沒有 Auto Layout，放進去的圖示會停在原座標，要手動設定 x、y 置中。
- 畫 1.2.6 時，本格內容做成本機元件 `PhotoViewer`，本格改為它的 instance（Has Send 開啟），外觀不變。

---

## 1.2.5 確認重送訊息（2026-10-05）

**程式**：`from_admin_chatroom.dart`（`_showResendConfirmBottomSheet`）、`message_builder.dart`（`FAIL_TEXT`：自己的黃底氣泡，時間旁顯示灰色叉叉，點氣泡觸發重送）

**對照程式的判斷**

| 項目 | 程式現況 | Figma 做法 |
|---|---|---|
| 底圖 | 聊天室中，管理員點傳送失敗的文字訊息 | 複製 1.2.1（輸入列收合），最後加一則管理員回覆「師傅預計4點左右抵達，到了會先打電話給您。」下午3:45，接續陳怡君的提問 |
| 失敗狀態 | 時間旁 12px 灰色 `Icons.close` | MessageBubble 的 `Status` 改為 Failed |
| 觸發 | 失敗訊息傳入 `onResend`，但 `TextMessage` 只有網址那段有點擊事件，純文字的失敗訊息點了沒反應（bug） | 畫預期行為：點失敗訊息後跳出確認 |
| 選單樣式 | iOS 動作選單，有標題「重送訊息？」 | 使用者決定改用 Dialog（Type=Standard，DS 規格「單句是非題」），置中；見 stage3.md 決策 |
| 標題 | 「重送訊息？」，無內文 | Dialog 標題「重送訊息？」，隱藏內容 Slot |
| 按鈕 | 「確認」＋獨立的「取消」 | Dialog 原本的兩顆按鈕：「取消」Ghost Neutral、「確認」Ghost Action，順序照 DS（次要在左） |
| 遮罩 | 系統預設半透明黑 | 複製 1.2.3 的 `Scrim` |

**DS 沒有、由 Claude 自己排的部分**：沒有新的，`Scrim` 沿用 1.2.3。

**遇到的問題**

- reference.md 寫的 `_Message Status` 是元件名稱，instance 的圖層名稱是 `Status`、屬性是 `State`，第一次用名稱找圖層失敗。已更正 reference.md。
- 第一版照分界決策用 BottomSheet＋一列 ListItem「確認」。使用者檢視時指出：確認型動作做成單列清單語意不對，且程式這個畫面本來就觸發不到（bug），改為 Dialog。

---

## 1.2.6 檢視與下載照片（2026-10-05）

**程式**：`image_message.dart`（點聊天室照片開啟）、`tap_detail_image.dart`（`DetailImage`）

**對照程式的判斷**

| 項目 | 程式現況 | Figma 做法 |
|---|---|---|
| 版面 | 與 1.2.4 相同：黑底、`PhotoView` 置中、AppBar `black26` 疊在照片上、白色返回鍵 | 本機元件 `PhotoViewer` |
| 右上 | 有 `downloadUrl` 時顯示白色 `Icons.file_download_outlined` | 外露的 AppBar 開啟 Has Action，Action Slot 放 IconButton（Ghost Inverse），圖示 Phosphor DownloadSimple（Regular），綁 `Icon/Inverse` |
| 右下 | 沒有傳送鍵 | Has Send 關閉 |
| 下載結果 | `EasyLoading` 提示「下載成功」或「下載失敗，請稍後再試」 | 依 evidence 併入流程，不另畫 |
| 示意照片 | 聊天室裡的照片訊息 | 同 1.2.4 的貓咪照片（1.2.4 送出、1.2.6 檢視，資料接得上） |

**本機元件 `PhotoViewer`**：由 1.2.4 的內容做成，393×852，填色 `Base/Black`。屬性 Has Send（右下 FAB）；下載鍵由外露的 AppBar 的 Has Action 控制；照片 `Photo` 設為外露，可換 Image 的 State。1.2.4 同時改為此元件的 instance。

**DS 沒有、由 Claude 自己排的部分**

- 本機元件 `PhotoViewer` 本身（版面同 1.2.4）。
- 下載鍵用 IconButton（Ghost Inverse），從 AppBar 的返回鍵複製後放進 Action Slot，取代 AppBar 預設的 IconLabelButton（有文字，程式沒有）。

**遇到的問題**

- DS 沒有用過下載圖示，Phosphor 圖示庫也搜尋不到，拿不到 Key，只能放佔位圖示請使用者手動換。Phosphor 重新發布後已換成 DownloadSimple（2026-10-05）。下載鍵放在 1.2.6 外露 AppBar 的 Slot 裡，不在本機元件中，所以是直接換 1.2.6。
- 元件的布林屬性不能控制子元件內部的圖層（`Cannot set component property references on instance sublayer`），所以「顯示下載鍵」做不成 `PhotoViewer` 的屬性，改為把 AppBar 設成外露子元件，直接切它的 Has Action。
- AppBar 的 Has Action 關閉時，`findOne` 預設找不到隱藏的 Action Slot 內容，要先設 `figma.skipInvisibleInstanceChildren = false`。

---

## 1.3.1 撥出中（2026-10-05）

**程式**：`from_admin_chatroom.dart`（ChatAppBar 電話鍵直接推入撥出頁，沒有連線延遲提示）、`ios_caller_control_page.dart`（`_buildCallingWidget`）、`caller_callkeep.dart`（`cancelable`）

**對照程式的判斷**

| 項目 | 程式現況 | Figma 做法 |
|---|---|---|
| 版面 | 沒有 AppBar，全螢幕 Stack，內容整欄垂直置中 | 三區：StatusBar（Light，393）、`Content`（寬高 Fill、內容置中）、HomeIndicator（Light）。背景與遮罩絕對定位、約束 Stretch |
| 背景 | 對方頭像撐滿高度，`black54` 暗化，再疊 25 的背景模糊 | Image（Loaded）撐滿 Frame；上方 `Scrim` 填色綁 `Background/Overlay`（63%，近似），加背景模糊 25。Frame 底色綁 `Base/Black` |
| 頭像 | 140 圓形 | Avatar（custom，140），與 1.1.1 同一張佔位照片 |
| 姓名 | 對方完整姓名，28 粗體白字 | 「陳怡君」（接 1.2.1），`Heading/2`（28 SemiBold）＋`Text/Inverse` |
| 撥出狀態 | `SpinKitWave` 白色波形動畫（5 條、高 25），沒有文字 | 5 條白色長條（高 10／17.5／25／17.5／10，寬 3），綁 `Icon/Inverse`，間距 `Spacing/2` |
| 間距 | 頭像到姓名 36、姓名到波形 32、波形到掛斷鍵為螢幕高 30%、按鈕到文字 10 | 36、32 都用 `Spacing/32`；30% 用固定 256 的 `Spacer`；10 用 `Spacing/8` |
| 掛斷鍵 | `Colors.red` 圓形、padding 16、白色 `call_end_rounded` 24，下方「結束通話」16 Medium 白字 | 自排：圓形綁 `Status/Error`、`Radius/Full`、padding `Spacing/16`；圖示 Phosphor PhoneDisconnect（Fill），綁 `Icon/Inverse`；文字 `Label/L`＋`Text/Inverse` |
| 掛斷鍵何時出現 | `cancelable` 在撥出初始化完成後才為 true，之前隱藏 | 畫可以取消的狀態（結構表寫「可取消」） |
| 示意照片 | 對方的大頭貼 | DS 內建的貓咪照片（同 1.2.4） |

**DS 沒有、由 Claude 自己排的部分**

- 整個通話畫面版面（模糊頭像背景、中央頭像與姓名、下方掛斷鍵）。1.3.2 結構相同，畫 1.3.2 時會做成本機元件。
- 背景的模糊與暗化：Image 撐滿＋`Scrim` 背景模糊 25。Flutter 的模糊值是 sigma，Figma 的是 radius，兩者定義不同，模糊程度是目測接近。
- 撥出中的波形：DS 沒有載入中元件，用 5 條長條畫靜態的一格。
- 掛斷鍵：DS 的 IconButton Filled 是白底，Button 沒有實心紅色或圓形圖示款，所以自己排。
- 波形到掛斷鍵的 256 間距沒有綁 token（程式是螢幕高的 30%，超出 Spacing 的範圍）。

**遇到的問題**

- 電話相關圖示（掛斷）在 DS 沒有用過，Phosphor 還在重新發布，先放佔位。重新發布後已在本機元件 `VoiceCallScreen` 兩個 State 換成 PhoneDisconnect，1.3.1、1.3.2 跟著更新（2026-10-05）。
- 畫 1.3.2 時，本格內容做成本機元件 `VoiceCallScreen`（State=Calling），本格改為它的 instance，外觀不變。

---

## 1.3.2 通話中（2026-10-05）

**程式**：`ios_caller_control_page.dart`（`_buildOnCallWidget`）、`timer_text.dart`；接聽方 `ios_callee_control_page.dart` 接通後的畫面相同（依 evidence 引用本格，不另畫）

**對照程式的判斷**

| 項目 | 程式現況 | Figma 做法 |
|---|---|---|
| 版面、背景、頭像、姓名、掛斷鍵 | 與撥出中相同 | 本機元件 `VoiceCallScreen`（State=OnCall） |
| 通話狀態 | 波形換成兩行白字：「通話中」與計時，16 Medium，兩行之間沒有間距 | `Call Status` 兩行文字，都用 `Label/L`＋`Text/Inverse`，間距 0 |
| 計時 | 接通後從 `00:00` 起每秒加一，格式「分:秒」補零 | 示意「01:23」，做成文字屬性 Duration |
| 掛斷 | 「結束通話」一定顯示（不像撥出中要等初始化） | 同 1.3.1 |
| 結束後 | 回到原聊天室 | 只畫畫面本身 |

**本機元件 `VoiceCallScreen`**：由 1.3.1 的內容做成，放在「本機元件」Section。客戶端 6.3、師傅端 5.3 也有同樣的畫面，見 components.md 元件候選。

**DS 沒有、由 Claude 自己排的部分**

- 本機元件 `VoiceCallScreen` 本身（版面同 1.3.1）。
- 「通話中」與計時兩行的排法（照程式，間距 0）。

**遇到的問題**：沒有。

---

## 1.3.3 對方正在通話中（2026-10-05）

**程式**：`ios_caller_control_page.dart`（`VoiceChatCallerCalleeBusy` 時先關閉撥出頁，再呼叫 `_showCalleeBusyNotice`）

**對照程式的判斷**

| 項目 | 程式現況 | Figma 做法 |
|---|---|---|
| 底圖 | 撥出頁先關閉，提示出現在原聊天室上 | 複製 1.2.1（輸入列收合） |
| 對話框 | Material `AlertDialog`，沒有標題，只有內文 | Dialog（Standard）：依 DS 規格手動隱藏 `Title`，打開 `Content` Slot 放內文 |
| 內文 | 「對方正在通話中，請稍後再撥」 | `Body/M`＋`Text/Secondary`（DS 的內容文字規格），寬度填滿 |
| 按鈕 | 只有一顆「知道了」（TextButton，Medium 字重） | 隱藏左側次要按鈕，右側主要按鈕（Ghost Action）改為「知道了」 |
| 遮罩 | 系統預設半透明黑 | 複製 1.2.5 的 `Scrim` |
| 忙線查詢失敗 | `voice_chat.dart` 的 `calleeBusy()` 遇到非預期的狀態碼或例外都回傳「忙線」，所以查詢失敗也會出現同一個提示 | 同一張畫面，不另畫 |

**DS 沒有、由 Claude 自己排的部分**

- 沒有新的版面。用法上有兩個判斷：隱藏標題、只留一顆按鈕。DS 規格允許手動隱藏標題，但沒有寫只有一顆按鈕時怎麼做，我隱藏的是次要按鈕，讓「知道了」維持主要按鈕的樣式與靠右的位置。

**遇到的問題**：沒有。

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
| 1.2.4 確認傳送照片 | 未開始 |
| 1.2.5 確認重送訊息 | 未開始 |
| 1.2.6 檢視與下載照片 | 未開始 |
| 1.3.1 撥出中 | 未開始 |
| 1.3.2 通話中 | 未開始 |
| 1.3.3 對方正在通話中 | 未開始 |

---

## 本機元件

- `AdminChatroomListItem`：放在本 Page 右側的「本機元件」Section。屬性：Name、Info、Last Message、Time（文字）、Unread（顯示紅點）；頭像為可切換的 Avatar instance。

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
- `Options`：Slot 裡包住兩列 ListItem 的外框，左右 padding `Spacing/16`。因為 ListItem 本身沒有左右留白。
**遇到的問題**

- DS 沒有 iOS 動作選單元件。與使用者討論後定出「照 Flutter 與照 DS 的分界」，記在 [stage3.md](../stage3.md) 決策。
- 第一版用 Sticky 底部按鈕區：內容短時按鈕區蓋住第二個選項，手動固定高度後，「取消」又被分隔陰影隔成另一區、下方多出空白，使用者覺得奇怪。討論後參考 M3，擴充 DS 的 BottomSheet（Footer=Inline、拖曳把手，見 stage3.md 決策），再用新版重畫。
- 擴充 DS 時，複製出來的 variant 遺失屬性連結，Slot 也變成一般 Frame（Plugin API 的行為），要用 `createSlot()` 重建並接回原屬性，再刪掉多產生的屬性。

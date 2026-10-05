# 批次 21：管理員端／1 客服聊天室

- **Figma**：[APP_管理員 → 1 客服聊天室](https://www.figma.com/design/M5DWva58qmX9Xx3V2O3c3x/APP_管理員)
- **Evidence**：Flutter repo `docs/figma-ssot/evidence/T-0110.md`（10 個 Frame 都在這份）
- **紀錄方式**：試做批次，每個 Frame 寫完整對照表（見 [method.md](../method.md)「批次紀錄怎麼寫」）

---

## Frame 清單

| Frame | 狀態 |
|---|---|
| 1.1.1 聊天室列表 | 已完成 |
| 1.2.1 與客戶／師傅對話 | 未開始 |
| 1.2.2 展開更多功能 | 未開始 |
| 1.2.3 選擇照片來源 | 未開始 |
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

# 階段 3 元件狀況與候選

記錄畫面填入時的元件缺口與重複區塊。到檢查點再決定哪些候選以 `/sanji` 升級進 Design System。

---

## 元件狀況

**管理員端需要的元件，Figma 都已有**：BottomNavBar（Admin）、AppBar、ListItem、Avatar、Badge、ChatAppBar、ChatBackground、MessageBubble、ChatInputBar、BottomSheet、Dialog、StatusBar、HomeIndicator。

**Design System 檔案中的空白頁**：EmptyState、Carousel、StepIndicator 三頁目前沒有元件。客戶端的「1.2 首次介紹」和訂單進度相關畫面可能需要用到，輪到這些 Page 之前要先確認是否補建。

**BottomSheet 已擴充（2026-10-05）**：原本底部按鈕區只能絕對定位貼底，內容短時會蓋住內容。已新增 Footer variant（Sticky／Inline）與 hasDragHandle，`hasStickyFooter` 改名為 `hasFooter`，規格見 `docs/design-system/components/bottom-sheet.md`。

**沒有 iOS 動作選單元件**：程式多處使用 CupertinoActionSheet，依決策改用 BottomSheet（Footer=Inline、拖曳把手）+ ListItem + Ghost Neutral「取消」，不另建元件。

**ListItem 已擴充（2026-10-05）**：新增 State variant（default／pressed，按下底色 `Overlay/Pressed/Neutral` 12%），左右 `Spacing/16` 收進元件，分隔線內縮。規格見 `docs/design-system/components/list-item.md`。

**文件與 Figma 不一致**：`docs/design-system/INDEX.md` 寫 ChatAppBar、ChatBackground「Figma 尚未建立正式 Component」，但 Figma Chatroom 頁已有這兩個元件組，待確認是否完成並更新索引。

---

## 元件候選

| 候選 | 出現位置 | 狀態 |
|---|---|---|
| 通話畫面（撥出中、通話中） | 客戶端 6.3、師傅端 5.3、管理員端 1.3 | 待試做時確認 |
| 全螢幕照片檢視（`PhotoViewer`） | 管理員 1.2.4、1.2.6；客戶 5.1.4、6.1.5、6.1.7；師傅 5.1.5、5.1.7；程式另有 `horizontal_image_list`（可能是訂單照片，不能下載） | 已建本機元件（管理員檔案）。三個 App 檔案都會用到，建議檢查點 1 升級進 DS，見下方 DS 待辦 2 |
| 聊天室列表列（`AdminChatroomListItem`） | 管理員端 1.1.1（同畫面重複 8 次） | 已建本機元件；客戶端、師傅端的聊天室列表是否同樣式待確認 |

---

## DS 待辦

階段 3 畫圖時發現、要回 DS 檔案處理的事。建議在檢查點 1 前後一起處理，完成後在此標記並更新 DS 文件。

| # | 項目 | 內容 | 狀態 |
|---|---|---|---|
| 1 | 接回 Phosphor 圖示庫 | DS 的 icon 元件引用的 Phosphor 元件顯示「Component removed from library」，既有圖示仍能顯示，但無法替換或新增。使用者已把 Phosphor Icons（2.1，1,512 icons × 6 weights）加回團隊的 Design System 資料夾，發布中（2026-10-05）。發布後：在 DS 用「Swap library」把遺失的圖示接到新元件庫；名稱對不上時由 Claude 寫腳本依名稱替換（目前命名為圖示名稱的元件組，variant 為 `Format=Outline, Weight=Regular`）；接著確認各 App 檔案裡的圖示也接回 | 等待發布 |
| 2 | `PhotoViewer` 升級進 DS | 以 `/sanji` 升級。建議屬性：Has Send（右下傳送鍵）、Has Download（右上下載鍵）、Photo（外露 Image，可換照片或切載入中、失敗）。Has Download 的做法待使用者決定：A. 維持外露 AppBar 切 Has Action；B. 下載鍵移出 AppBar、放在元件本身那層疊在右上，才能做成真正的開關（Claude 建議 B） | 檢查點 1 |
| 3 | 1.2.6 下載鍵換圖示 | 1 完成後，在 `PhotoViewer`（或 2 升級後的 DS 元件）把 Smiley 佔位換成 Phosphor DownloadSimple | 等 1 |
| 4 | 375 系統列淘汰 | 依 [layout.md](../../../../design-system/tokens/layout.md)，目標全面使用 393。StatusBar 刪除 Frame Group=375 兩個變體並拿掉只剩一個值的 Frame Group 屬性；HomeIndicator 目前只有 375 寬，改為 393（現在每次放入都要手動拉寬）。刪除前先確認各 App 檔案 Archive 裡的舊 375 畫面是否引用這些變體 | 檢查點 1 |

# 階段 3 元件狀況與候選

記錄畫面填入時的元件缺口、重複區塊與重複出現的組合。到檢查點再決定哪些元件候選以 `/sanji` 升級進 Design System，哪些 pattern 候選以 `/sanji pattern` 寫進 `docs/design-system/patterns/`。

---

## 元件狀況

**管理員端需要的元件，Figma 都已有**：BottomNavBar（Admin）、AppBar、ListItem、Avatar、Badge、ChatAppBar、ChatBackground、MessageBubble、ChatInputBar、BottomSheet、Dialog、StatusBar、HomeIndicator。

**Design System 檔案中的空白頁**：EmptyState、Carousel、StepIndicator 三頁目前沒有元件。客戶端的「1.2 首次介紹」和訂單進度相關畫面可能需要用到，輪到這些 Page 之前要先確認是否補建。

**BottomSheet 已擴充（2026-10-05）**：原本底部按鈕區只能絕對定位貼底，內容短時會蓋住內容。已新增 Footer variant（Sticky／Inline）與 hasDragHandle，`hasStickyFooter` 改名為 `hasFooter`，規格見 `docs/design-system/components/bottom-sheet.md`。

**沒有 iOS 動作選單元件**：程式多處使用 CupertinoActionSheet，依決策改用 BottomSheet（Footer=Inline、拖曳把手）+ ListItem + Ghost Neutral「取消」，不另建元件。

**ListItem 已擴充（2026-10-05）**：新增 State variant（default／pressed，按下底色 `Overlay/Pressed/Neutral` 12%），左右 `Spacing/16` 收進元件，分隔線內縮。規格見 `docs/design-system/components/list-item.md`。

**Button 的 Outlined 加白底（2026-10-05）**：Primary、Secondary、Neutral Outlined 共 54 個 variant 最底層加 `Background/Surface`，按下狀態的 12% 疊色保留在上層。規格見 `docs/design-system/components/button.md`。

**Button lg 高度改為 48（2026-10-05）**：54 個 lg variant 加最小高度 `Spacing/48`，內距不變，內容垂直置中；原本一個高度固定 44 的 variant（Primary Filled／rect／default）改為依內容撐開。

**PhotoViewer、VoiceCallScreen 升級進 DS（2026-10-05）**：PhotoViewer 放 Image 頁，下載鍵移出 AppBar 做成 Has Download；VoiceCallScreen 放 Chatroom 頁，結構照本機元件。規格見 `docs/design-system/components/photo-viewer.md`、`voice-call-screen.md`。

**StatusBar、HomeIndicator 只保留 393（2026-10-05）**：StatusBar 刪除 375 變體並拿掉 Frame Group 屬性，HomeIndicator 改為 393 寬，放入時不必再手動拉寬。

**文件與 Figma 不一致**：`docs/design-system/INDEX.md` 寫 ChatAppBar、ChatBackground「Figma 尚未建立正式 Component」，但 Figma Chatroom 頁已有這兩個元件組，待確認是否完成並更新索引。

---

## 元件候選

| 候選 | 出現位置 | 狀態 |
|---|---|---|
| 通話畫面（`VoiceCallScreen`，撥出中、通話中） | 客戶端 6.3、師傅端 5.3、管理員端 1.3.1、1.3.2 | 已升級進 DS（檢查點 1）。四種聊天室共用同一個頁面 `IOSCallerControlPage`，三個 App 檔案相同 |
| 全螢幕照片檢視（`PhotoViewer`） | 管理員 1.2.4、1.2.6；客戶 5.1.4、6.1.5、6.1.7；師傅 5.1.5、5.1.7；程式另有 `horizontal_image_list`（可能是訂單照片，不能下載） | 已升級進 DS（檢查點 1），見 DS 待辦 2 |
| 聊天室列表列（`AdminChatroomListItem`） | 管理員端 1.1.1（同畫面重複 8 次） | 不升級，維持本機元件（檢查點 1）。客戶端、師傅端沒有聊天室列表，只有管理員 1.1.1 用到 |

---

## pattern 候選

畫圖時發現同一種元件組合重複用來解決同一個問題，就記一行；已有的候選只在「出現位置」補上新的 Frame。到檢查點時，跨兩個以上檔案出現的候選以 `/sanji pattern` 寫成文件（見 [stage3.md](stage3.md) 2026-10-06 決策）。做法細節見 fill-figma-ssot Skill 的 `references/screen-types.md`。

| 候選 | 組合 | 解決的問題 | 出現位置 | 狀態 |
|---|---|---|---|---|
| 動作選單 | BottomSheet（無標題、Footer=Inline、拖曳把手）＋ ListItem 選項＋ Ghost Neutral「取消」 | 從幾個動作中選一個，可以不選直接取消 | 管理員 1.2.3 | 候選 |
| 確認對話框 | Dialog（Standard）＋遮罩；次要按鈕在左、主要在右，破壞性動作用 Ghost Danger，只有告知時保留一顆主要按鈕 | 執行單一動作前的確認，或需要使用者知悉的提示 | 管理員 1.2.5、1.3.3、2.2.1、2.3.1 | 候選 |
| 一般資料頁 | 三區結構＋區段（`Heading/4` 標題＋ Card 包 ListItem 或全寬 Button lg），區段間 `Spacing/16` | 把設定入口與帳號操作分組呈現 | 管理員 2.1.1 | 候選 |
| 全螢幕媒體 | 單一個撐滿 Frame 的 DS 元件（`PhotoViewer`、`VoiceCallScreen`），黑底或模糊照片背景、控制鍵疊在上方 | 沉浸式的全螢幕內容（看照片、傳照片前確認、通話） | 管理員 1.2.4、1.2.6、1.3.1、1.3.2 | 候選 |

---

## DS 待辦

階段 3 畫圖時發現、要回 DS 檔案處理的事。建議在檢查點 1 前後一起處理，完成後在此標記並更新 DS 文件。

| # | 項目 | 內容 | 狀態 |
|---|---|---|---|
| 1 | 接回 Phosphor 圖示庫 | DS 的 icon 元件引用的 Phosphor 元件顯示「Component removed from library」，既有圖示仍能顯示，但無法替換或新增。使用者把 Phosphor Icons（2.1，1,512 icons × 6 weights）復原到團隊的 Design System 資料夾並重新發布（2026-10-05）。復原後元件 Key 與原本相同（例如 Smiley Outline Regular 仍是 `c90b73f1…`），既有引用直接接回，不需要 Swap library。圖示庫已可用搜尋找到 | 已完成 |
| 2 | `PhotoViewer` 升級進 DS | 以 `/sanji` 升級。建議屬性：Has Send（右下傳送鍵）、Has Download（右上下載鍵）、Photo（外露 Image，可換照片或切載入中、失敗）。Has Download 的做法待使用者決定：A. 維持外露 AppBar 切 Has Action；B. 下載鍵移出 AppBar、放在元件本身那層疊在右上，才能做成真正的開關（Claude 建議 B）。使用者選 B，已建立於 DS 的 Image 頁 | 已完成 |
| 3 | 1.2.6 下載鍵換圖示 | 已把 1.2.6 下載鍵的 Smiley 佔位換成 Phosphor DownloadSimple（Regular、`Icon/Inverse`）。下載鍵在外露 AppBar 的 Slot 裡，不在 `PhotoViewer` 元件中；2 升級時若採做法 B，要把這顆鍵移進元件 | 已完成 |
| 4 | 375 系統列淘汰 | 依 [layout.md](../../../../design-system/tokens/layout.md)，目標全面使用 393。StatusBar 刪除 Frame Group=375 兩個變體並拿掉只剩一個值的 Frame Group 屬性；HomeIndicator 目前只有 375 寬，改為 393（現在每次放入都要手動拉寬）。刪除前已確認 DS 與三個 App 檔案（含 Archive、舊檔案頁）都沒有引用 375 變體；兩個 375 變體已刪除、Frame Group 屬性已拿掉，HomeIndicator 已改 393 寬 | 已完成 |
| 5 | 通話畫面換圖示 | 已在本機元件 `VoiceCallScreen` 兩個 State 把掛斷鍵的 Smiley 佔位換成 Phosphor PhoneDisconnect（Fill，對應程式 `call_end_rounded`，`Icon/Inverse`），1.3.1、1.3.2 跟著更新 | 已完成 |

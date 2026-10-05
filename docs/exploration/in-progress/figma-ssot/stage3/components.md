# 階段 3 元件狀況與候選

記錄畫面填入時的元件缺口與重複區塊。到檢查點再決定哪些候選以 `/sanji` 升級進 Design System。

---

## 元件狀況

**管理員端需要的元件，Figma 都已有**：BottomNavBar（Admin）、AppBar、ListItem、Avatar、Badge、ChatAppBar、ChatBackground、MessageBubble、ChatInputBar、BottomSheet、Dialog、StatusBar、HomeIndicator。

**Design System 檔案中的空白頁**：EmptyState、Carousel、StepIndicator 三頁目前沒有元件。客戶端的「1.2 首次介紹」和訂單進度相關畫面可能需要用到，輪到這些 Page 之前要先確認是否補建。

**BottomSheet 已擴充（2026-10-05）**：原本底部按鈕區只能絕對定位貼底，內容短時會蓋住內容。已新增 Footer variant（Sticky／Inline）與 hasDragHandle，`hasStickyFooter` 改名為 `hasFooter`，規格見 `docs/design-system/components/bottom-sheet.md`。

**沒有 iOS 動作選單元件**：程式多處使用 CupertinoActionSheet，依決策改用 BottomSheet（Footer=Inline、拖曳把手）+ ListItem + Ghost Neutral「取消」，不另建元件。

**ListItem 本身沒有左右留白**：放進 BottomSheet 時要在外層包一層 `Spacing/16`。若之後常遇到，可考慮在 ListItem 加上左右 padding。

**文件與 Figma 不一致**：`docs/design-system/INDEX.md` 寫 ChatAppBar、ChatBackground「Figma 尚未建立正式 Component」，但 Figma Chatroom 頁已有這兩個元件組，待確認是否完成並更新索引。

---

## 元件候選

| 候選 | 出現位置 | 狀態 |
|---|---|---|
| 通話畫面（撥出中、通話中） | 客戶端 6.3、師傅端 5.3、管理員端 1.3 | 待試做時確認 |
| 全螢幕照片檢視 | 管理員端 1.2.6，其他角色的聊天室待確認 | 待試做時確認 |
| 聊天室列表列（`AdminChatroomListItem`） | 管理員端 1.1.1（同畫面重複 8 次） | 已建本機元件；客戶端、師傅端的聊天室列表是否同樣式待確認 |

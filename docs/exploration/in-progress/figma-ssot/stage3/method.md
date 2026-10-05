# 階段 3 畫面填入做法

## 概述

- **用途**：記錄 Claude Code 把 Flutter 現行畫面畫進 Figma placeholder 的做法，作為檢查點 1 寫成 Skill 的主體
- **狀態**：草稿，依管理員端 1.1.1 試做整理，之後每畫一種新畫面類型就補充
- **相關文件**：決策與進度見 [stage3.md](stage3.md)；Key 與近似對應表見 [reference.md](reference.md)；元件候選見 [components.md](components.md)

---

## 來源

| 來源 | 位置 | 用來做什麼 |
|---|---|---|
| 結構表 | [figma-build-r01.md](../figma-build-r01.md) | Frame 名稱、一句情境（要畫哪個狀態）、去向 |
| Evidence | Flutter repo `docs/figma-ssot/evidence/index.md` | 由 Frame 編號找到 T 編號，再讀該 T 檔的「分析與判斷」表取得程式檔與行號 |
| Flutter 程式 | `C:\Users\yode0\develop\source_code\android_app_2.6.1\fdtigermaster_app` | 文案、欄位、狀態、版面結構 |
| App 主題 | 同上 `lib/main.dart` | Material 2（`useMaterial3: false`）、字型、日期語系 zh_TW |
| 後端 | `fdtigermaster-functions` | App 端只顯示後端欄位時，追查文字怎麼組成 |
| 示意資料格式 | `fdtigermaster-admin-web/test/fakeData.ts` | 訂單編號等資料的真實格式 |

Figma 檔案的 fileKey 見 [reference.md](reference.md)。

---

## 繪製原則

- **內容照 Flutter**：文案、欄位、狀態與流程以 Flutter 程式為準。結構表的「一句情境」說明畫面要呈現哪個狀態。
- **樣式照 Design System**：有元件的地方使用元件 instance，保留元件原本的樣式（字級、陰影、尺寸），只覆寫內容（文字、顯示開關、variant），不拆開元件（detach）。
- **沒有元件的地方**：直接排版，顏色、字級、間距、圓角一律綁定 token，不寫死數值。程式數值沒有對應 token 時選最接近的，記入近似對應表。
- **重複區塊**：沒有元件的區塊出現第二次，就在該角色檔案做成本機元件，放在該 Page 右側的「本機元件」Section，並記入 [components.md](components.md) 的「元件候選」。到檢查點再決定是否以 `/sanji` 升級進 Design System。
- **Frame**：維持 393×852，名稱與位置不變。畫完後刪除三行佔位文字。
- **Material 2 預設值**：不寫在程式裡，要自己判斷。已遇到：頁面背景 `#FAFAFA`、AppBar 標題 20px Medium 加陰影（用元件原本樣式即可）。
- **示意資料**：常見台灣姓名；時間依當下日期由新到舊；格式照真實資料（例如訂單編號 `RO` + 日期 + 5 碼流水號）。

---

## 每個 Frame 的步驟

1. **定位證據**：在 evidence index 找到 Frame 對應的 T 編號，讀「分析與判斷」表的程式檔與行號。
2. **讀程式**：列出畫面分成哪幾區（固定頂部、內容、固定底部、浮層），每區的文案、狀態與資料欄位。遇到後端組成的文字，追到後端或測試資料確認格式。
3. **對應元件**：每一區先在 [reference.md](reference.md) 找元件 Key，沒有的再到 DS 檔案查。找不到元件才自己排版。
4. **看元件內部**：不熟的元件先在目標檔案暫時建立 instance，讀出圖層結構與屬性名稱（例如 AppBar 標題是 Slot 裡的文字），看完刪除。
5. **自排區塊**：依繪製原則綁 token，重複區塊做成本機元件。
6. **組 Frame**：用三區 Auto Layout 結構（見下節），刪除三行佔位文字。
7. **驗證**：把 Frame 暫時拉大（例如 430×932），確認內容區會伸縮、底部維持貼底，再改回 393×852；截圖一次確認。
8. **記錄**：近似對應與新查到的 Key 寫進 [reference.md](reference.md)，判斷與問題寫進當批的 `batches/` 紀錄，回報時列出這次新增的近似對應。

---

## Frame 結構：三區 Auto Layout

對應 Flutter 的 `Scaffold`（appBar／body／bottomNavigationBar）。

| 圖層 | 設定 |
|---|---|
| Frame | 垂直 Auto Layout，固定 393×852，間距與 padding 為 0，背景綁 token |
| 1. 固定頂部 | AppBar 或 ChatAppBar instance，寬度 Fill |
| 2. `Content` | 寬高都 Fill，裁切內容，原型捲動方向設為垂直；裡面放實際內容（寬度 Fill） |
| 3. 固定底部 | BottomNavBar、ChatInputBar 或底部按鈕，寬度 Fill；沒有就省略。BottomNavBar 高 82，中央 Logo 圓圈會往上蓋到 `Content`，所以固定底部要排在 `Content` 之後（圖層在上方） |
| 浮層 | Dialog、Bottom Sheet、遮罩設為忽略 Auto Layout 的絕對定位，綁約束貼底或置中（待第一個 Dialog 畫面驗證） |

- 內容比畫面長時，只畫第一屏看得到的部分，超出的部分由 `Content` 裁切，Frame 不加高。
- 把既有 Frame 改成 Auto Layout 時，先建立 `Content` 並調整圖層順序，再設 `layoutMode`；最後確認 Frame 的 x、y 沒有跑掉。

---

## 驗收方式

每批完成時：

1. **結構檢查（腳本）**：Frame 名稱與數量不變，佔位文字已刪除，列出被拆開的元件與寫死顏色的數量。
2. **內容對照**：逐個 Frame 截圖，與 Flutter 程式對照文案與狀態。
3. **使用者確認**截圖後，才進行下一批。

檢查點另外交給 `verifier` 依清單完整檢查一次，再檢討流程。

---

## 批次紀錄怎麼寫

- 試做期間（批次 21、22、12）：每個 Frame 寫完整的「程式現況 vs Figma 做法」對照表。
- 檢查點 1 之後：只記例外（非標準判斷、近似對應、要追後端的資料、使用者修改），照做法就能完成的 Frame 只在清單打勾。

---

## Figma 操作注意事項

- 查 DS 元件：`search_design_system` 一次只能查一筆，改用 `use_figma` 在 DS 檔案逐頁列出元件、屬性與 key 比較快。
- 每次 `use_figma` 都要重新 `setCurrentPageAsync` 切到目標 Page。
- 元件屬性名稱帶有 `#id` 後綴（例如 `Has Leading#851:0`），用名稱前綴找出完整 key 再 `setProperties`。
- 綁顏色：`setBoundVariableForPaint` 會回傳新的 paint，要重新指定給 `fills`。
- 改文字前先載入字型；單行截斷用 `textTruncation = 'ENDING'` 加 `maxLines = 1`，寬度設 Fill。
- 本機元件的文字屬性用 `componentPropertyReferences` 連到文字圖層；instance 裡要換的子元件（例如 Avatar）設為 exposed instance，或用 `swapComponent`。

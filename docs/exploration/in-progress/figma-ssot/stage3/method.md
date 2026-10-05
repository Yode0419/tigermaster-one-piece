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
- **示意資料前後接得上**：從上一格點進來的畫面，沿用上一格的同一筆資料（例如 1.2.1 是 1.1.1 第一列那間聊天室，最後一則訊息與列表相同）。

---

## 每個 Frame 的步驟

1. **定位證據**：在 evidence index 找到 Frame 對應的 T 編號，讀「分析與判斷」表的程式檔與行號。
2. **讀程式**：列出畫面分成哪幾區（固定頂部、內容、固定底部、浮層），每區的文案、狀態與資料欄位。遇到後端組成的文字，追到後端或測試資料確認格式。
3. **對應元件**：每一區先在 [reference.md](reference.md) 找元件 Key，沒有的再到 DS 檔案查。找不到元件才自己排版。
4. **看元件內部**：不熟的元件先在目標檔案暫時建立 instance，讀出圖層結構與屬性名稱（例如 AppBar 標題是 Slot 裡的文字），看完刪除。
5. **自排區塊**：依繪製原則綁 token，重複區塊做成本機元件。
6. **組 Frame**：用三區 Auto Layout 結構（見下節），刪除三行佔位文字。
7. **驗證**：把 Frame 暫時拉大（例如 430×932），確認內容區會伸縮、底部維持貼底，再改回 393×852；截圖一次確認。
8. **記錄**：近似對應與新查到的 Key 寫進 [reference.md](reference.md)，判斷與問題寫進當批的 `batches/` 紀錄，回報時列出這次新增的近似對應，以及「DS 沒有、由 Claude 自己排的部分」（沒有就寫沒有），讓使用者一眼看到哪些是 Claude 的判斷。

---

## Frame 結構：三區 Auto Layout

對應 Flutter 的 `Scaffold`（appBar／body／bottomNavigationBar）。

| 圖層 | 設定 |
|---|---|
| Frame | 垂直 Auto Layout，固定 393×852，間距與 padding 為 0，背景綁 token |
| 1. 固定頂部 | AppBar 或 ChatAppBar instance，寬度 Fill |
| 2. `Content` | 寬高都 Fill，裁切內容，原型捲動方向設為垂直；裡面放實際內容（寬度 Fill） |
| 3. 固定底部 | BottomNavBar、ChatInputBar 或底部按鈕，寬度 Fill；沒有就省略。BottomNavBar 高 82，中央 Logo 圓圈會往上蓋到 `Content`，所以固定底部要排在 `Content` 之後（圖層在上方） |
| 浮層 | Dialog、Bottom Sheet、遮罩設為忽略 Auto Layout 的絕對定位，排在最上層。遮罩 `Scrim` 蓋滿整個 Frame（含狀態列），填色綁 `Background/Overlay`，約束 Stretch；BottomSheet 寬 393、貼底，約束左右 Stretch、垂直 Bottom（1.2.3 已驗證）；Dialog 置中，約束水平、垂直都 Center（1.2.5 已驗證） |

- 內容比畫面長時，只畫第一屏看得到的部分，超出的部分由 `Content` 裁切，Frame 不加高。
- **聊天室**：背景用 ChatBackground instance，設為絕對定位、約束 Stretch，放在最底層；`Content` 主軸對齊設為頂部（訊息少時貼在上方；訊息超出畫面時，進入聊天室會停在最底部，所以只畫最新的一屏，從頂部排起、最後一則貼近輸入列），左右 padding 綁 `Spacing/16`、訊息間距綁 `Spacing/8`。
- **浮層畫面的底圖**：沿用打開浮層前的那一格（例如 1.2.3 從 1.2.2 點「傳送照片」打開，底圖複製 1.2.2）。
- **動作選單（程式的 CupertinoActionSheet）**：BottomSheet 用 hasHeader=false、Footer=Inline、開啟 hasDragHandle；選項用 ListItem（Trailing=None、關閉前方圖示、最後一列關閉分隔線），直接放進 Slot、寬度填滿（元件自帶左右留白），Slot 間距改為 0（Slot 預設 `Spacing/8`，列表項目之間不留間距）；「取消」用按鈕區的 Button，Style 改為 Ghost Neutral。有標題的選項清單改用 hasHeader=true 並關閉左右圖示。只有一個動作的確認（例如「重送訊息？」＋確認／取消）不是選項清單，要回報使用者是否改用 Dialog（1.2.5 改用 Dialog Standard，因程式該畫面是 bug）。
- **Dialog**：單句是非題用 Type=Standard。標題直接改 `Title` 文字（不是元件屬性）；沒有內文時隱藏 `Content` Slot；`Actions` 裡兩顆 Button 預設為 Ghost Neutral（次要）與 Ghost Action（主要），只改 Label。程式沒有標題、只有內文時（Material `AlertDialog` 只給 content），隱藏 `Title`、打開 `Content` Slot（刪掉 `Slot Rectangle`）放文字，綁 `Body/M`＋`Text/Secondary`、寬度 Fill；只有一顆按鈕時隱藏左側次要按鈕，保留右側主要按鈕（1.3.3 已驗證）。
- **通話畫面（程式的 `IOSCallerControlPage`）**：管理員檔案已有本機元件 `VoiceCallScreen`（State=Calling／OnCall），Frame 只放一個寬高 Fill 的 instance，改 Name 與 Duration。其他檔案還沒有，結構為：Frame 填色 `Base/Black`；Image 撐滿＋`Scrim`（`Background/Overlay`、背景模糊 25）絕對定位、約束 Stretch；三區為 StatusBar（Light）、`Content`（內容置中）、HomeIndicator（Light）（1.3.1、1.3.2 已驗證）。
- **換圖示**：建立 icon 元件（Icon=Phosphor）的 instance（預設是 Smiley），用 `search_design_system` 限定 Phosphor 圖示庫（見 [reference.md](reference.md)）以圖示名稱搜尋，拿元件組 Key 匯入、挑 variant（`Format=Outline, Weight=Regular`／`Fill` 等），對內部的 Smiley instance 做 `swapComponent`。換完後填色會變回預設，需要白色時把內部 Vector 的填色綁 `Icon/Inverse`（1.2.6、1.3.1 已驗證）。
- **缺圖示時的佔位**：Phosphor 搜尋不到對應圖示時，保留 Smiley，圖層名稱寫上要換成的圖示，並記入 [components.md](components.md) 的 DS 待辦。
- **全螢幕照片（程式的 `PhotoView` 加 `extendBodyBehindAppBar`）**：管理員檔案已有本機元件 `PhotoViewer`，Frame 只放一個寬高 Fill 的 instance；其他檔案還沒有，照以下結構排。Frame 填色綁 `Base/Black`，只放 `Content`（寬高 Fill、內容置中），照片用 Image 元件、寬度 Fill、維持照片比例；AppBar 用 Background=Image 並隱藏 `Background Image`、`Title Text` 圖層，絕對定位貼頂、約束左右 Stretch；底部放 HomeIndicator（Light）絕對定位貼底；右下 FAB 照 Flutter `endFloat` 距右 16、距 HomeIndicator 16，約束 Right／Bottom（1.2.4 已驗證，待使用者確認）。
- **沒有 AppBar、頂部跟著內容捲動的頁面**（例如帳號頁的 `ClientAccountHeaderSection`）：頂部一樣放在固定頂部區，用 DS 對應的 AppBar variant；捲動行為只在批次紀錄用文字說明。Why：只畫第一屏，靜止畫面相同；放進 `Content` 會讓 AppBar 內嵌的狀態列一起捲走，反而與 App 不符；DS 的 AppBar 規格也規定捲動行為不做 variant（2.1.1 已驗證）。
- **一般資料頁（帳號頁這類列表、卡片、按鈕組成的頁面）**：`Content` 左右與上方 padding `Spacing/16`；內容依程式分成區段（例如「幫助」「其他」），每個區段是一個垂直 Auto Layout（區段標題＋內容，間距 `Spacing/8`），區段之間 `Spacing/16`。區段標題 `Heading/4`；設定入口用 Card（Inset、Padding=None）包 ListItem；全寬按鈕用 Button lg、寬度 Fill（2.1.1 已驗證）。
- **帳號頁頁首**：AppBar（Tall、None、Brand），關閉 Has Leading、Has Action；刪掉 `Title` Slot 裡的 `Title Text`，放 `Profile`（水平、間距 `Spacing/16`、垂直置中）：Avatar 75＋姓名 `Title/L`／Email `Body/XS`（2.1.1 已驗證）。
- **Flutter 內建對話框的文字**：`showAboutDialog`、Material 預設按鈕等文字由 Flutter 依語系產生，不在程式裡。到 Flutter SDK 的 `flutter_localizations/lib/src/l10n/material_zh_TW.arb` 查 zh_TW 字串（例如「查看授權」「關閉」），版面看 SDK 的元件原始碼（例如 `material/about.dart`）。SDK 在 `C:\Users\yode0\develop\flutter`（2.2.1 已驗證）。
- **Dialog 的按鈕要換樣式時**：Dialog 內部的按鈕不能刪掉再插入新的（`Cannot move node … inside of an instance`），改用 `swapComponent` 換成目標 variant，再設定 Label（2.3.1 已驗證）。
- **內容短的 BottomSheet 一律用 Footer=Inline**，不要用 Sticky 再手動固定高度。
- **靠左／靠右的項目**：Auto Layout 不能單獨指定某個子項目的對齊，所以每則訊息包一層寬度 Fill 的水平 Auto Layout（無底色），對方訊息靠左、自己的訊息靠右、日期分隔置中。
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

- `figma.createAutoLayout()` 建立的外框預設會裁切內容，裡面放 Card 等有陰影的元件時陰影會被切掉。自己建的區段、外框一律設 `clipsContent = false`，只有 `Content` 保留裁切（2.1.1 已發生）。
- 匯入變數用 `figma.variables.importVariableByKeyAsync`，`figma.importVariableByKeyAsync` 不存在。
- 查 DS 元件：`search_design_system` 一次只能查一筆，改用 `use_figma` 在 DS 檔案逐頁列出元件、屬性與 key 比較快。
- 每次 `use_figma` 都要重新 `setCurrentPageAsync` 切到目標 Page。
- 同一個畫面的不同狀態（例如 1.2.2 是 1.2.1 展開輸入列）：把上一格的子圖層複製過來，只換有變化的部分。複製來的 instance 如果有文字覆寫，**不要用 `setProperties` 切換 variant**，曾發生覆寫文字的寬度沒有重算、超出外框；改成刪掉後直接建立目標 variant 的新 instance，再重新覆寫。
- 在 DS 複製 variant 來新增 variant 時，複製品會遺失所有屬性連結（顯示開關、文字、Slot），Slot 也會變成一般 Frame。要逐一接回 `componentPropertyReferences`；Slot 用 `component.createSlot()` 重建、把內容搬進去、接回原本的 Slot 屬性，再刪掉 `createSlot()` 多產生的屬性。
- DS 元件發布新版後，目標檔案裡既有的 instance 不一定會馬上更新（ChatInputBar 自動更新了，ListItem 沒有）。用到新版的屬性或結構時，先檢查 instance 是否已是新版，沒有就從 `importComponentSetByKeyAsync` 匯入新版重建。
- DS 檔案裡看得到、但還沒發布的元件，匯入時會出現「not found」。先用一段只匯入不建立的腳本確認每個 Key 都能匯入，再組畫面；匯入失敗就請使用者發布 DS 元件庫，不要自己複製一份。
- 示意照片：`use_figma` 不支援 `createImageAsync`，Claude 無法自行放入新照片，只能用 DS Image 元件內建的佔位照片（目前是貓咪）。需要符合情境的照片時，請使用者在 Figma 手動換圖。
- 元件屬性名稱帶有 `#id` 後綴（例如 `Has Leading#851:0`），用名稱前綴找出完整 key 再 `setProperties`。
- 綁顏色：`setBoundVariableForPaint` 會回傳新的 paint，要重新指定給 `fills`。
- 改文字前先載入字型；單行截斷用 `textTruncation = 'ENDING'` 加 `maxLines = 1`，寬度設 Fill。
- 本機元件的布林屬性只能控制自己的直接圖層，不能控制子元件 instance 內部的圖層。要切換子元件的開關（例如 AppBar 的 Has Action），把該子元件設為外露（`isExposedInstance = true`）。
- 找 instance 裡被隱藏的圖層（例如 Has Action 關閉時的 Action Slot）前，先設 `figma.skipInvisibleInstanceChildren = false`，否則 `findOne` 找不到。
- 本機元件的文字屬性用 `componentPropertyReferences` 連到文字圖層；instance 裡要換的子元件（例如 Avatar）設為 exposed instance，或用 `swapComponent`。

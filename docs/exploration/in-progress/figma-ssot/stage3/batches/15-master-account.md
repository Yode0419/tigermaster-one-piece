# 批次 15：師傅端／4 帳號

- **Figma**：[APP_師傅 → 4 帳號](https://www.figma.com/design/m0yuXFZN2fkivzTOcwiKJ4/APP_師傅)
- **Evidence**：Flutter repo `docs/figma-ssot/evidence/T-0106.md`（4.1 至 4.3）、`T-0107.md`（4.4 至 4.6）
- **紀錄方式**：只記例外（見 fill-figma-ssot Skill「Recording」）

---

## Frame 清單

| Frame | 狀態 |
|---|---|
編號依 2026-10-07 調整後的結構表（見 stage3.md 決策）：原 4.3.1 帳號首頁成為 4.1.1，原 4.1.1 成為 4.1.2，原 4.3 刪除，原 4.4 至 4.6 順移為 4.3、4.5、4.6，並把批次 14 的 3.3 提前撥款搬入成為 4.4。Flutter repo 證據文件仍是舊編號。批次共 13 格。

| Frame | 狀態 |
|---|---|
| 4.1.1 帳號首頁 | 已完成 |
| 4.1.2 師傅資料與評價 | 已完成 |
| 4.2.1 帳號設定 | 已完成 |
| 4.2.2 選擇頭像來源 | 已完成 |
| 4.2.3 頭像預覽與確認 | 已完成 |
| 4.3.1 證照上傳 | 已完成 |
| 4.3.2 選擇證照照片來源 | 已完成 |
| 4.3.3 確認刪除證照照片 | 已完成 |
| 4.4.1 提前撥款申請須知（原 3.3.1，批次 14 畫好，2026-10-07 搬入） | 已完成 |
| 4.4.2 確認申請提前撥款（原 3.3.2） | 已完成 |
| 4.4.3 已提出提前撥款申請（原 3.3.3） | 已完成 |
| 4.5.1 師傅接案操作說明（另有「（完整內容）」一格） | 已完成 |
| 4.6.1 確認登出 | 已完成 |

---

## 本機元件

- `ManualStepIllustration`（variant `Step`＝1 至 8）：操作說明八個步驟的插圖（使用者提供的向量），4.5.1 使用。

---

## 待寫規則

使用者修正中屬於通則的部分，每個對話結束時一次寫進 Skill，寫完標「已寫入」。

- 長內容 BottomSheet 的第一屏（852）：BottomSheet 內建的 `Content` 框與內層 Slot 都要設 Fill 高度並開裁切，內建 HomeIndicator 才會貼在 Sheet 底部；否則 `Content` 框會跟著內容撐到數千高，把 HomeIndicator 擠到 Sheet 外面。「（完整內容）」那一格相反：`Content` 框與 Slot 設 Hug，Sheet 高度＝標題列＋內容框＋HomeIndicator，Frame 高度再加 85（露出底圖頂部）。已寫入 screen-types.md 的「動作選單」長內容那條。
- 取代程式自家彩色圖片（`colored_*.png`）的 Phosphor 圖示，一律用 Duotone，淡色那層綁 `Brand/TigerYellow` 且不透明（Phosphor 預設淡色層 20% 透明，改成 100%），深色線條維持原圖示色（使用者決定，師傅 4.1.1 帳號設定、推播通知；4.1.2 底圖同步）。已寫入 screen-types.md 的「圖示」。
- 新畫面類型「證照／大張照片上傳頁」（4.3.1，使用者確認）。已寫入 screen-types.md。

---

## 批次驗收

- **結構檢查**（2026-10-07）：13 個 Frame（4.1.1 至 4.6.1，不含 4.5.1 完整內容那格）全部通過，沒有缺漏、多餘或問題項目。
- **內容檢查**：每個 Section 畫完後比對過內容清單與文字傾印；使用者逐段確認，4.1 到 4.6 都已驗收。
- **本批調整**：4 帳號由 6 個 Section 改為 6 個（帳號首頁移到最前、原 4.3 刪除、提前撥款由 3.3 搬入成 4.4），Page 3 改名「3 我的收入」；細節見 stage3.md 決策。
- **DS 待辦、pattern 候選**：本批沒有新增。
- **未畫的狀態**：證照與頭像沒有上傳失敗畫面（程式沒有錯誤處理）；管理員模式入口只有管理員帳號才有；驗證錯誤、更新中、上傳中等瞬時狀態只記文字。

---

## 4.1.1 帳號首頁（2026-10-07，原 4.3.1）

**程式**：`master_account_page.dart`、`master_account_header_section.dart`、`account_top_nav_section.dart`、`version_text.dart`

- 當底圖：4.1.2（浮層）、4.5.1（Dialog）從它複製。示意師傅「陳志豪」、平均 4.8。
- 以內容為主的長頁面，高 1146（AppBar 214＋內容 930＋2）。結構同管理員 2.1.1：AppBar（Tall／None／Brand）的 `Title` Slot 放頭像 75＋姓名＋「★ 4.8」，浮動 BottomNavBar（Role=Master，帳號選中），`Scroll Content` 底部 134。
- 「進入管理員模式」只有管理員帳號才出現，這格畫一般師傅，沒畫。
- 程式的 `colored_user_gear.png`、`colored_bell.png` 是自家彩色圖片，沒有向量：換成 Phosphor UserGear、Bell（Outline／Regular）。
- 程式推播開關預設開，用 DS `Switch`（Selected=true），放進 ListItem 的 Trailing Slot。
- 程式標題「幫助」「其他」`Heading/4`；列表 16 Medium 對 DS ListItem；左右邊距程式 8 改 DS `Spacing/16`。
- 「刪除帳號」程式是灰字 TextButton，用 Button Ghost Neutral md；版本文字沿用管理員 2.1.1 的 `Body/XS`＋`Text/Hint`，版本「師虎來了 v2.6.2」。
- 程式的頁首是黃色漸層圖加上白卡往上疊 20，Figma 用 AppBar Brand 版本，卡片接在頁首下方，不疊。

## 4.2.1 帳號設定、4.2.2 選擇頭像來源、4.2.3 頭像預覽與確認（2026-10-07）

**程式**：`master_account_setting.dart`、`account_basic_setting_section.dart`、`headshot_image_setting.dart`、`image_select_bottom_sheet.dart`、`send_image_confirm.dart`

- **4.2.1**：AppBar（Standard／None／Brand），欄位用 DS `TextField`（姓名、電子信箱 Default，手機號碼 Disabled，Show Helper Row 關），外框 Card（Inset／Standard）；「更改密碼」Card（Padding=None）放 ListItem；底部 `Sticky Footer`（Button only）「儲存」。沒有捲動需要，高 852。驗證錯誤（「姓名不能空白」「電子郵件格式不正確」）、更新中（按鈕變停用「更新中...」）、儲存結果 SnackBar 都不另畫。
- 頭像程式高 110 → DS Avatar custom 100。右下的 `camera.png`（藍圓白相機）沒有向量：自排藍色圓（`Brand/TigerBlue`，24）加 Phosphor Camera Fill（16，`Icon/Inverse`），圖層名稱 `Camera Badge`。示意手機 0912345678、信箱 chihhao.chen@gmail.com。
- **4.2.2**：程式 `CupertinoActionSheet`，照動作選單做法：BottomSheet（無標題、Footer=Inline、有拖曳把手）放兩列 ListItem（Trailing=None、無圖示），「取消」Ghost Neutral。程式選項字是藍色，照 DS ListItem 預設字色。底圖複製 4.2.1。
- **4.2.3**：程式 `SendImageConfirm`（同聊天室傳送前確認）→ DS `PhotoViewer`（Has Send 開），照片用內建貓咪佔位。

## 4.3.1 證照上傳、4.3.2 選擇證照照片來源、4.3.3 確認刪除證照照片（2026-10-07，原 4.4.x）

**程式**：`account_image_upload.dart`、`image_select_bottom_sheet.dart`

- **4.3.1**：AppBar（Standard／None／Brand）「上傳證照」；程式是整寬白底帶（有陰影、左右 16、上下 24），用 Card Layout=Fill；內放兩張已選照片（`PhotoUpload` Type=Certificate、State=uploaded，右上有刪除圖示）加一格「選擇欲上傳的證件照」（State=default，藍框藍字加號）。畫已選兩張的狀態，空清單只少了照片；上傳中（按鈕變停用「上傳中...」、隱藏新增格）沒畫。底部 Sticky Footer「上傳證照」。16:9 格寬 359 高 202。以內容為主的長頁面，高 909。
- 程式 `Scroll` 底部留 110（給固定在底部的按鈕），Figma 的 Footer 在排版內，改用底部 padding `Spacing/16`；程式頂部空 8 用 `Spacing/8`。
- **4.3.2**：底圖是 4.3.1（只顯示第一屏 852），疊上 4.2.2 複製來的 BottomSheet 與遮罩（程式同一個 `ImageSelectBottomSheet`，文字相同；圖庫為多選，畫面上看不出差異）。
- **4.3.3**：Dialog 從 2.3.3 複製，程式文字與 2.3.3 相同，但「確認」是預設藍字（不是紅字），所以右側按鈕換成 Ghost Action。

## 4.5.1 師傅接案操作說明、4.6.1 確認登出（2026-10-07，原 4.4.1、4.5.1）

**程式**：`manual_procedure_bottom_sheet.dart`、`master_account_page.dart`、`platform_alert_dialog.dart`

- **4.5.1**：底圖複製 4.1.1（帳號首頁），疊遮罩與 BottomSheet（hasHeader、關閉鍵在左、標題「操作說明」、高 767）。內容區底色 `Background/Page`（程式 245 灰），八個步驟各是「`Title/M` 標題＋Card（Inset／Standard）」，Card 內是插圖、說明文字 `Body/S`、紅色注意事項 `Body/S`＋`Status/Error`。步驟 1 沒有注意事項。文字照程式抄，步驟 6 原始碼是相鄰字串，顯示為「收到APP系統推播客戶已同意報價單後，…」（沒有引號）。程式標題 18 Bold → `Title/M`，邊距 10 → `Spacing/16`，卡片內距 20×16 → DS Card 標準內距。
- 插圖：程式是 945×531 的 PNG（`manual_procedure1.png` 至 `8.png`，內含文字與截圖）。使用者把八張插圖做成向量元件放進「本機元件」，我把元件改名為 `ManualStepIllustration`（variant 屬性 `Step`，值 1 至 8，原名 `manual_procedure`、`step=manual_procedure1`），並換掉 4.5.1 兩格（第一屏與完整內容）八個步驟的粉紅佔位。插圖元件 315×177，放進 Card 後寬度 Fill（329×177）。
- 長內容 BottomSheet：原格畫第一屏，旁邊加「4.5.1 師傅接案操作說明（完整內容）」（高 3379，八步完整）。結構檢查略過。
- **4.6.1**：底圖複製 4.1.1，Dialog Standard 從 4.3.3 複製：標題「您確定要登出嗎?」（半形問號照程式），沒有內文，「取消」Ghost Neutral、「登出」Ghost Danger（程式分別是灰字、紅字）。程式在 Android 是 `AlertDialog`、iOS 是 `CupertinoAlertDialog`，Figma 只畫一種。
- 「進入管理員模式」只有管理員帳號才出現，沒有畫（4.1.1 畫一般師傅）；切換為客戶帳號只是切換模式，沒有確認畫面，不另畫。

## 4.1.2 師傅資料與評價（2026-10-07，原 4.1.1）

**程式**：`master_Introduction_bottom_sheet.dart`、`master_detail_section.dart`、`badge_image.dart`

- 底圖複製 4.1.1 的頂部與內容，疊 `Scrim` 與 BottomSheet（hasHeader、右上 X、無底部按鈕、高 767＝852 的 90%）。
- 程式總分 48 Bold 深藍，沒有對應文字樣式：`Heading/2`（28）＋`Text/Brand`，近似。星星：總分 30 → Rating lg（24），三項分數 20 → Rating sm（16），只有半星刻度，4.8 顯示 5 顆、4.7 顯示 4.5 顆。
- 師虎認證與專業證照的徽章是網路圖片，沒有素材：32×32 圓形灰色佔位，圖層名稱「徽章圖（待補）」，認證 3 個、證照 2 個。
- 技能標籤用 DS `Tag`（Info），程式 (240,243,253) 底與 (35,54,119) 字對應 Tag Info。技能名稱取官網服務名稱（監視系統安裝維修、壁癌、屋頂防水塗佈）。
- 分區上緣 0.5 灰線改 1px `Border/Subtle`，分隔線 `Border/Default`。

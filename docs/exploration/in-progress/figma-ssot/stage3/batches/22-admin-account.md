# 批次 22：管理員端／2 帳號

- **Figma**：[APP_管理員 → 2 帳號](https://www.figma.com/design/M5DWva58qmX9Xx3V2O3c3x/APP_管理員)
- **Evidence**：Flutter repo `docs/figma-ssot/evidence/T-0111.md`（2.1.1、2.3.1）、`T-0069.md`（2.2.1）
- **紀錄方式**：試做批次，每個 Frame 寫完整對照表（見 method.md（已併入 fill-figma-ssot Skill）「批次紀錄怎麼寫」）

---

## Frame 清單

| Frame | 狀態 |
|---|---|
| 2.1.1 管理員帳號頁 | 已完成 |
| 2.2.1 著作權聲明 | 已完成 |
| 2.3.1 確認登出 | 已完成 |

**批次驗收（2026-10-05）**：結構檢查見下；每個 Frame 畫完都已截圖對照程式；使用者發布 DS（Outlined 白底、lg 高度 48）並更新引用後確認 3 個 Frame 正常。

**結構檢查（腳本，2026-10-05）**：3 個 Frame 名稱不變、都是 393×852，佔位文字已全部刪除，沒有寫死的顏色。仍會裁切的外框只剩 `Content`、DS 元件內部，以及沒有子圖層的 `Scrim`。

---

## 本機元件

沒有。

---

## 2.1.1 管理員帳號頁（2026-10-05）

**程式**：`admin_main_page.dart`（帳號分頁）、`admin_account_page.dart`、`client_account_header_section.dart`、`headshot_image.dart`、`text_icon_button.dart`、`version_text.dart`、`config/constants/prod_constants.dart`（版本號）

**對照程式的判斷**

| 項目 | 程式現況 | Figma 做法 |
|---|---|---|
| 版面 | 沒有 `Scaffold.appBar`，整頁是一個 `SingleChildScrollView`，頂部的頭像區跟著內容捲動 | 三區：AppBar、`Content`、BottomNavBar。頭像區放進固定頂部（靜止畫面相同，DS 規格「帳號頁頁首靜態不收合」） |
| 頂部 | `appbar_bg.png` 黃色漸層圖，頂部留 100（含狀態列）、左 30、下 30 | AppBar（Type=Tall、Extension=None、Background=Brand），關閉 Has Leading、Has Action。DS 的 AppBar 規格已把 `ClientAccountHeaderSection` 歸為 Tall 類；頭像、姓名、Email 放進 `Title` Slot。內距維持元件（左 16、下 16），高 214（程式約 205） |
| 頭像 | `HeadshotImage` 75 圓形 | Avatar（custom，75），DS 規格標明 75 是「帳號頁 Header 頭像」 |
| 姓名 | 20 Medium，預設黑字 | `Title/L`（20 Medium，數值相同）＋`Text/Primary` |
| Email | 12 Regular，預設黑字 | `Body/XS`＋`Text/Primary`，單行截斷 |
| 頭像與文字 | 間距 16，文字欄上方多 10 | `Spacing/16`；文字欄與頭像垂直置中（沒有照上方 10） |
| 區塊標題 | 「幫助」「其他」20 Medium | `Heading/4`（20 Medium，數值相同） |
| 頁面左右邊距 | 8 | `Spacing/16`（DS 規定的頁面左右邊距，見下方「待確認」） |
| 區塊間距 | 頂部 8；標題、卡片、按鈕之間一律 8，不分區段 | 依使用者指示照 DS：分成 `Help Section`、`Other Section` 兩個區段，區段內間距 `Spacing/8`，區段之間 `Spacing/16`；`Content` 上方 padding `Spacing/16` |
| 幫助卡片 | Material `Card`（白底、圓角 4、陰影、外距 4），內距上下 4 左右 20；一列「著作權聲明」16 Medium＋右側 16 的 `arrow_forward_ios`，無底線 | Card（Layout=Inset、Padding=None）＋ ListItem（Trailing=Icon、關閉前方圖示、關閉分隔線）。ListItem 自帶左右 16 與上下 16，所以 Card 不加內距 |
| 切換按鈕 | 「切換為客戶帳號」「切換為師傅帳號」：OutlinedButton 白底、圓角 5、高 56、16 深藍字 | Button（Primary Outlined、lg、rect）寬度填滿，維持元件樣式；高度原為 44，使用者把 DS 的 lg 改為 48（程式 56）。原本元件是透明底，在灰色頁面上幾乎看不見，使用者決定 DS 的 Outlined 一律加白底（見 stage3.md 決策） |
| 登出按鈕 | 同上，文字灰褐 (179,172,162) | Button（Neutral Outlined、lg、rect）。DS 規格寫 Neutral Outlined 用於「帳號設定類低強調行動」 |
| 版本文字 | 按鈕下方 60、文字下方 30，置中「師虎來了 v2.6.2」，14 Regular，(190,190,190) | `Version` 外框上 `Spacing/48`、下 `Spacing/32`（近似）；`Body/XS`＋`Text/Hint`（近似）。最初用 `Body/S`（14 Regular，數值相同），使用者改為 `Body/XS` |
| 底部導覽 | 管理員主頁的底部導覽，帳號分頁選中 | BottomNavBar（Role=Admin），內部 Tab 切成聊天室 off、帳號 on |
| 載入中 | 資料未回傳時置中進度圈 | 依 evidence 併入本格，不另畫 |
| 示意資料 | 目前登入的管理員 | 「林雅婷」「yating.lin@gmail.com」；頭像用 Avatar 內建佔位照片 |

**DS 沒有、由 Claude 自己排的部分**

- 頭像區的內部排法：Avatar 75 ＋ 姓名／Email 兩行，水平排列、間距 `Spacing/16`、垂直置中，放進 AppBar 的 `Title` Slot。DS 規格只說帳號頁頁首屬於 Tall，沒有定義 Title 裡放頭像的樣子。
- 版本文字區：置中一行灰字，上下留白用 `Version` 外框的 padding 表達。DS 沒有頁尾或版本文字的規格。
- 頁面版面本身（區塊標題＋卡片＋按鈕的直排）。DS 沒有帳號頁的樣板，各區都是元件，排列順序照程式。

**使用者決定**

- 切換按鈕維持 Primary Outlined（深藍字），不改成 DS 有效組合表所列的 Neutral Outlined（灰字）。
- 版本文字：程式 14 Regular，使用者改用 `Body/XS`（12 Regular）。
- 內容區頂部與區段之間的間距照 DS 用 `Spacing/16`（程式都是 8），區段內維持 8。按鈕到版本文字因此變成區段間距 16＋`Version` 上方 48，共 64（程式 60）。
- 頁面左右邊距：程式是 8，有完全相同的 `Spacing/8`；DS 規定頁面左右邊距 `Spacing/16`。使用者決定照 DS 用 16（見 stage3.md 決策）。

**遇到的問題**

- `figma.importVariableByKeyAsync` 不存在，匯入變數要用 `figma.variables.importVariableByKeyAsync`。method.md 與 reference.md 只寫「`importVariableByKeyAsync`」，第一次試匯入時寫錯。

**文件缺口**（依使用者要求記下）

- method.md 沒有「一般資料頁」的 Frame 結構與做法（頭像頁首、區塊標題、卡片、全寬按鈕、頁尾），本格是從 DS 的 AppBar、Card、Button、spacing 規格文件推出來的，不是從 method.md。
- method.md 沒寫「頂部跟著內容捲動、沒有 AppBar」的頁面要怎麼處理，本格判斷放進固定頂部。
- 程式數值有完全相同的 token、但 DS 規格另有規定時（例如頁面邊距 8 與 DS 的 16），以哪個為準沒有規則。已補成 stage3.md 決策：照 DS。
- 不需要回頭查之前的對話。
- 以上缺口已補進 method.md（一般資料頁、帳號頁頁首、沒有 AppBar 的頁面）與 stage3.md 決策。

---

## 2.2.1 著作權聲明（2026-10-05）

**程式**：`admin_account_page.dart`（`showAboutDialog`，只傳 `applicationLegalese`、`applicationVersion`）、`main.dart`（App 標題「師虎來了」、語系 zh_TW）；Flutter SDK `material/about.dart`（`AboutDialog` 版面）、`flutter_localizations` 的 `material_zh_TW.arb`（按鈕文字）

**對照程式的判斷**

| 項目 | 程式現況 | Figma 做法 |
|---|---|---|
| 底圖 | 帳號頁點「著作權聲明」打開 | 複製 2.1.1 |
| 對話框 | Material `AboutDialog`（`AlertDialog`，沒有標題列，全部放在內容區）；沒有 App 圖示 | Dialog（Standard），置中 |
| App 名稱 | 未傳入，取 `MaterialApp.title`「師虎來了」，24 Regular（`headlineSmall`） | 放進 Dialog 的 `Title`（DS 標題樣式）。程式是內容區第一行大字，作用等同標題 |
| 版本 | 「v2.6.2」，14 Regular，緊接在名稱下方 | `Content` Slot 第一行，`Body/S`＋`Text/Secondary` |
| 著作權文字 | 「Copyright © 2020 飛達智能股份有限公司 All Rights Reserved.」，12 Regular，與版本間距 18 | `Content` Slot 第二行，`Body/XS`＋`Text/Secondary`；Slot 間距改 `Spacing/16`（近似 18） |
| 按鈕 | 「查看授權」「關閉」（zh_TW 字串；Material 2 會轉大寫，中文不受影響） | 左「查看授權」Ghost Neutral、右「關閉」Ghost Action，順序與程式相同 |
| 查看授權 | 開啟 Flutter 內建的授權清單頁 | 系統內建頁面，不畫 |
| 遮罩 | 系統預設半透明黑 | `Scrim` 綁 `Background/Overlay` |
| 共用 | 客戶端 5.9、師傅端 4.5 呼叫同一個對話框 | 依 evidence 只在本格維護，其他角色引用 |

**DS 沒有、由 Claude 自己排的部分**

- 把 App 名稱放進 Dialog 標題。程式沒有標題列，名稱是內容的第一行；改放標題是 Claude 的判斷，內容與順序不變。
- 內容區兩行文字的字級：版本 `Body/S`、著作權 `Body/XS`，照程式的大小關係各自對到 DS 樣式。DS 的 Dialog 內容規格是 `Body/M`，這裡沒有照，因為著作權文字在程式裡刻意用小字。

**遇到的問題**

- Dialog 的標題和按鈕文字不在專案程式裡，要到 Flutter SDK 查 `AboutDialog` 的原始碼與 zh_TW 字串，已寫進 method.md（已併入 fill-figma-ssot Skill）。

---

## 2.3.1 確認登出（2026-10-05）

**程式**：`admin_account_page.dart`（`_showLogoutDialog`）、`platform_alert_dialog.dart`（Android 用 `AlertDialog`、iOS 用 `CupertinoAlertDialog`）

**對照程式的判斷**

| 項目 | 程式現況 | Figma 做法 |
|---|---|---|
| 底圖 | 帳號頁點「登出」打開 | 複製 2.1.1 |
| 對話框 | 依平台切換 Material／Cupertino 樣式，只有標題、沒有內文 | Dialog（Standard），隱藏 `Content` Slot |
| 標題 | 「您確定要登出嗎?」（半形問號） | 照程式文字，含半形問號 |
| 按鈕 | 「取消」Medium 字重、「登出」紅字 | 左「取消」Ghost Neutral；右「登出」Ghost Danger（DS 規格「破壞性最終確認」，與程式紅字一致） |
| 遮罩 | 系統預設半透明黑 | 複製 2.2.1 的 `Scrim` |
| 登出後 | 發出登出事件，導向登入流程 | 去向是客戶端／1 啟動與登入，不在本檔重畫 |

**DS 沒有、由 Claude 自己排的部分**：沒有。

**遇到的問題**

- 右側按鈕要從 Ghost Action 換成 Ghost Danger。Dialog 內部的按鈕不能刪掉再插入新的（`Cannot move node … inside of an instance`），改用 `swapComponent` 解決，已寫進 method.md（已併入 fill-figma-ssot Skill）。
- 標題的半形問號「?」是程式原文；中文句子通常用全形「？」。內容照 Flutter 所以沒改；使用者決定不回報工程。

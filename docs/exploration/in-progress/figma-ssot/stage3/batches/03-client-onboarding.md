# 批次 03：客戶端／1 啟動與登入

- **Figma**：[APP_Client → 1 啟動與登入](https://www.figma.com/design/G3tNva2zGzIi74Aujg3cLB/APP_Client)
- **Evidence**：Flutter repo `docs/figma-ssot/evidence/T-0037.md`（1.1）、`T-0039.md`（1.2）

---

## 開工檢查

每段對話開工前確認，後續各段沿用並補充（見 fill-figma-ssot Skill「Session start」第 4 步）。

**示意資料計畫**：
- 03a 沒有人物與訂單。
- 1.1.4 系統訊息：後端 `SystemSetMessage` 由管理員寫入任意文字，倉庫裡沒有固定文案，也找不到過去實例。示意改為單行放得下的「系統維護中，預計 23:00 恢復服務」（使用者要求換掉較長的版本）。
- 啟動畫面 Logo：用 DS `logo` 元件（使用者指定，取代佔位）。
- 介紹插圖（`app_intro/page1-5.png`）：Figma 工具不能匯入圖片，留命名清楚的佔位圖層，使用者之後自己拖入（使用者選 A）。

**03b 示意資料**（2026-10-07）：
- 手機號碼 0912345678（程式規定 09 開頭共 10 碼）；1.3.3 錯誤示範輸入 0912345，欄位紅字「手機號碼格式錯誤」。
- 1.3.4、1.3.5 密碼欄用遮蔽圓點；1.4.1 驗證碼框留空，倒數文字「重新傳送驗證碼(287S)」（App 組字）；1.4.3 填入 123456，紅字「驗證碼錯誤，請重新輸入」。
- 組字來源皆在 App 端（欄位檢查、`loginreg_bloc.dart` 的錯誤文字、`CountDownButton` 的秒數），沒有後端組字。
- 按下一步後的「確認中...」「登入中...」只是按鈕文字動畫，只記不畫。

**畫面類型**：

| Frame | 類型 | 備註 |
|---|---|---|
| 1.3.1 開始頁 | 啟動畫面（沿用） | 黃底、DS `logo`、標語、底部「點擊開始」 |
| 1.3.2 至 1.3.5、1.4.1 至 1.4.3 | 新類型：登入表單頁 | 黃色頂部加標題副標，白卡疊在頂部下緣 |
| 1.3.6 停用帳號 | 新類型：空白頁 | 程式只回傳空 `Container()`，使用者確認畫空白頁（只有狀態列與 HomeIndicator） |

**（以下為 03a 畫面類型）**

| Frame | 類型 | 備註 |
|---|---|---|
| 1.1.1 啟動檢查中 | 新類型：啟動畫面 | 黃底 `#FABF13`，置中 `logo.png`（高 68） |
| 1.1.2 無網路提示 | Dialog | 底圖 1.1.1；`PlatformAlertDialog`，Android 與 iOS 同內容 |
| 1.1.3 啟動檢查未通過（底部訊息） | 新類型：啟動畫面（含底部訊息列） | 紅色底部訊息列，高 40＋底部安全區 |
| 1.1.4 系統訊息 | Dialog | 底圖 1.1.3（底部訊息列已是同一段文字，由後端組字） |
| 1.1.5 強制更新提示 | Dialog | 底圖 1.1.1；不可點外側關閉，只有「立即更新」 |
| ~~1.1.6 App 商店更新頁~~ | 已刪除 | 使用者決定刪除（2026-10-07），外部頁面不畫 |
| 1.2.1 至 1.2.5 | 新類型：首次介紹頁 | 第 5 頁右下「下一步」改「繼續」 |

---

## Frame 清單

| Frame | 狀態 |
|---|---|
| 1.1.1 啟動檢查中 | 完成 |
| 1.1.2 無網路提示 | 完成 |
| 1.1.3 啟動檢查未通過（底部訊息） | 完成 |
| 1.1.4 系統訊息 | 完成 |
| 1.1.5 強制更新提示 | 完成 |
| 1.2.1 預先掌握行情範圍 | 完成 |
| 1.2.2 精準媒合專業師傅 | 完成 |
| 1.2.3 專屬技術專案管理師 | 完成 |
| 1.2.4 有保障的修繕過程 | 完成 |
| 1.2.5 便利選擇多項服務 | 完成 |
| 1.3.1 開始頁 | 完成 |
| 1.3.2 輸入手機號碼 | 完成 |
| 1.3.3 手機號碼錯誤 | 完成 |
| 1.3.4 輸入密碼 | 完成 |
| 1.3.5 密碼錯誤 | 完成 |
| 1.3.6 停用帳號（現行空白） | 完成 |
| 1.4.1 輸入簡訊驗證碼 | 完成 |
| 1.4.2 可重新傳送驗證碼 | 完成 |
| 1.4.3 簡訊驗證錯誤 | 完成 |

---

## 本機元件

- **PinInput**（本機元件 Section）：variant Content=Empty／Filled，6 個 40×50 方框（1px `Border/Subtle`、`Radius/4`），Filled 固定顯示 1 至 6（`Heading/4`）。1.4.1 至 1.4.3 用 instance。
- **IntroDots**（1 啟動與登入 Page 的「本機元件」Section）：variant Page=1 至 5，選中的圓點拉長成 22×10 藥丸。使用者決定不拆成 DS 元件，只做本機元件。1.2.1 至 1.2.5 都用 instance。

---

## 待寫規則

以下兩項與外部頁面不畫的規則，已於 2026-10-07 寫入 `types/pages.md` 與 `screen-types.md` 索引（已寫入）。

- 啟動畫面（黃底置中 DS `logo`，底部訊息列絕對定位浮在 HomeIndicator 上，不縮小 Content）。
- 首次介紹頁（使用者已確認）：白底，StatusBar Dark，插圖區固定高 280（佔位 235×280 靠下置中），文字區（內距 16、標題上 16 下 24，標題 `Display/M`、內文 `Body/M`，置中），底部控制列內距 16 三等分（左空、`IntroDots` 置中、DS Button Ghost Action 靠右），最底 HomeIndicator。最後一頁按鈕改「繼續」。分頁圓點做本機元件（使用者決定）。圖檔無法匯入，留命名佔位。

---

## 1.1.1 啟動檢查中（2026-10-07）

**程式**：`main.dart` 的 `_MainInitializer`（Scaffold 背景 `Color.fromRGBO(250,191,19,1)`，置中 `logo.png` 高 68，沒有 AppBar）

- 背景綁 `Brand/TigerYellow`（值 `#FABF13`，與程式完全相同）。頂部 StatusBar 用 Dark Content（黃底），底部 HomeIndicator Dark。Logo 在 `Content` 內垂直水平置中。
- Logo 圖檔 Figma 工具不能匯入，留粉紅佔位「Logo 佔位（logo.png，待補）」235×68（原圖 681×197，高 68 等比）。

## 1.1.2 至 1.1.6（2026-10-07）

**程式**：`main.dart` 的 `_showNoConnectionDialog`、`_showSystemMessageDialog`、`_showUpdatableDialog`、`bottomSheet`

- **1.1.3 底部訊息列**：程式 `Colors.red`（`#F44336`）沒有精確 token，用 `Status/Error`（沿用既有近似對應）。高度照程式 40＋底部安全區 34 ＝ 74，文字 `Body/S` 白字、單行截斷，內距 `Spacing/8`。訊息列絕對定位浮在最底，下方 HomeIndicator 保留在自動排列，讓 Logo 位置與 1.1.1 一致（Scaffold 的 `bottomSheet` 不會縮小 body）。
- **1.1.4**：底圖複製 1.1.3，訊息列文字換成與對話框相同的系統訊息（程式 `networkErrorMessage = status.systemMessage`）。示意文字太長，訊息列單行截斷成「…」，與程式 `TextOverflow.ellipsis` 一致。
- **Dialog**：Android 與 iOS 兩種原生樣式只畫一份，用 DS Dialog Standard；單顆按鈕，隱藏左側次要按鈕。程式按鈕字色 `Colors.blue`，用 Ghost Action（沿用 DS）。
- **1.1.5**：程式 `barrierDismissible: false`，畫面上無差異，這裡只記錄。
- **1.1.6**：原本畫成灰底系統邊界，使用者決定刪除。Figma 畫面、結構表（r01 總數 280→279、客戶端 179→178、1.1.5 去向、第 430 行）與 stage3.md 都已更新。
- **訊息列文字**：水平置中（使用者要求，1.1.3、1.1.4）。
- **Logo**：1.1.1 至 1.1.5 的佔位全換成 DS `logo`（206×60 縮成高 68，約 233×68）。

## 1.2.1 預先掌握行情範圍（2026-10-07）

**程式**：`introduction_page.dart`，套件 `introduction_screen 3.1.17`（`intro_page.dart`、`page_decoration.dart`）

- **版面**：套件預設圖片區與文字區 flex 1:1，圖片靠下置中、`imagePadding` 為 0。頁面可用高度 679 扣掉 `pageMargin` 下 60 與 `safeArea` 60，各得約 280。圖片區固定高 280，佔位 235×280（原圖 885×1056 等比）。
- **文字區**：`contentMargin` 16、標題上 16 下 24，標題 `Display/M`（40 Bold，與程式相同），內文 `Body/M`，皆置中。
- **底部控制列**：內距 16，三等分：左空、中間分頁圓點、右側按鈕（`skipFlex`、`dotsFlex`、`nextFlex` 都是 1）。圓點與按鈕的近似對應見 approximations.md。
- **按鈕**：沒有略過、沒有返回，所以左側為空。
- **插圖**：圖檔不能匯入，留粉紅佔位「插圖佔位（page1.png，待補）」。

## 1.3.1 開始頁、1.3.6 停用帳號（2026-10-07）

**程式**：`auth_nav.dart`、`authentication.dart`（無停用分支，回傳空 `Container()`）

- **1.3.1**：複製 1.1.1 當底圖。標語「保障您的修繕服務」程式 28 Bold、色 (35,36,42)，用 `Heading/2`（28 SemiBold）加 `Text/Primary`，近似對應見 approximations.md。Logo 與標語間距 24。底部按鈕用 DS `Sticky Footer`（Content=Button only，已含 HomeIndicator），底色與陰影去掉讓黃底透出，Label 改「點擊開始」。程式按鈕左右 23、高 46、圓角 4，照 DS（左右 16、lg）。
- **1.3.6**：只有 StatusBar、空的 `Content`、HomeIndicator。底色用 `Background/Page`（程式 Material 2 預設 #FAFAFA，沿用既有近似）。使用者確認畫空白頁。

## 1.3.2 輸入手機號碼（2026-10-07）

**程式**：`phone_input_section.dart`

- **新類型：登入表單頁**（待使用者確認）。頂部用 AppBar（Tall／Overlay／Brand），總高 225、卡片頂在 y=193，與程式（狀態列 59＋工具列 56＋下緣 110、卡片 top 193）完全吻合。標題與副標放 `Title` Slot：標題 `Heading/3`、副標 `Label/L`。卡片放進 `Extension Content`，卡片超出 AppBar 的 58 由 `Scroll Content` 上方 padding 74（58＋16）補上。
- 欄位用 DS `TextField`（Single、Filled、關 Helper Row），尾端圖示 Phosphor XCircle（程式 `cancel` 16）。「下一步」用 Button Primary Filled lg，寬度 Fill。
- 底圖 `Background/Page`，底部 HomeIndicator。

## 1.3.3 至 1.3.5（2026-10-07）

**程式**：`phone_input_section.dart`、`password_input_section.dart`

- **1.3.3**：欄位用 `TextField` State=Error，值 0912345，說明列紅字「手機號碼格式錯誤」（程式欄位檢核訊息）。另一種卡片內紅字「驗證流程失敗，請稍後再試」只記不畫（同位置、同樣式）。
- **1.3.4**：密碼欄用 DS `PasswordField`（Reveal=Hidden、Filled，遮蔽圓點）。「忘記密碼?」程式是 `TextButton`，用 Button Ghost Action md 置中，與「下一步」間距 `Spacing/16`。`PasswordField` 沒有 Show Helper Row，卡片底部多一段空白，記 DS 待辦 13。
- **1.3.5**：同 1.3.4，State=Error，說明列紅字「密碼錯誤，請重新輸入」。程式紅字在欄位下方卡片內，位置相同。

## 1.4.1 至 1.4.3（2026-10-07）

**程式**：`verify_input_section.dart`、`countdown_button.dart`

- 卡片內：提示文字 `Body/M`、「驗證碼」`Body/S`（程式預設 14）、六格 `PinInput`。程式驗證碼框選中邊框為藍色，三格都畫未選中（輸入焦點不另建 Frame）。
- **1.4.1**：「重新傳送驗證碼(287S)」用 Button Ghost Neutral sm、State=disabled（程式 12 灰 (179,172,162)，DS 沒有停用文字色 token，用元件停用樣式）。秒數格式「(287S)」是 `CountDownButton` 組字。
- **1.4.2**：「沒有收到驗證碼嗎?」用 Button Ghost Action sm（程式 12 藍 (58,137,248)）。
- **1.4.3**：驗證碼填 123456，紅字「驗證碼錯誤，請重新輸入」。重送失敗的「發送失敗。」「請輸入六位簡訊驗證碼」只記不畫（同位置）。底部重送列畫成可點擊狀態（1.4.2 之後）。
- 兩個 Section 的按下一步後「確認中...」「登入中...」只記不畫。

## 待寫規則（03b，已於 2026-10-07 寫入 `types/pages.md` 與 `screen-types.md` 索引）

- 登入表單頁（使用者已確認 1.3.2）：頂部 AppBar（Tall／Overlay／Brand，開 Has Leading、關 Has Action）；`Title` Slot 放標題（`Heading/3`）加副標（`Label/L`），`Extension Content` 放 Card（Inset／Standard）；總高 225、卡片頂在 y=193，與程式吻合。卡片超出 AppBar 的高度由 `Scroll Content` 上方 padding 補（超出量加 16）。卡片下方依序是 Button Primary Filled lg 寬度 Fill，其下可接小按鈕（Ghost，sm 或 md，置中）。欄位用 `TextField`／`PasswordField`，驗證碼用本機 `PinInput`；欄位錯誤文字用元件的 Error 狀態。第一個案例：客戶端 1.3.2。
- 空白頁：只有 StatusBar、空 `Content`、HomeIndicator，底色 `Background/Page`。第一個案例：客戶端 1.3.6。
- 啟動畫面加底部按鈕：底部用 DS `Sticky Footer`（Button only），清掉填色與陰影讓底色透出。第一個案例：客戶端 1.3.1。


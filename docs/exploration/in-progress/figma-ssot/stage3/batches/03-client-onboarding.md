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

**畫面類型**：

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

---

## 本機元件

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

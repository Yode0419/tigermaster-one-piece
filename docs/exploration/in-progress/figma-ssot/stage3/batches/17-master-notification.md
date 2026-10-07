# 批次 17：師傅端／6 通知

- **Figma**：[APP_師傅 → 6 通知](https://www.figma.com/design/m0yuXFZN2fkivzTOcwiKJ4/APP_師傅)
- **Evidence**：Flutter repo `docs/figma-ssot/evidence/T-0109.md`（4 個 Frame 都在這份，編號與結構表一致）
- **紀錄方式**：只記例外（見 fill-figma-ssot Skill「Recording」）

---

## Frame 清單

| Frame | 狀態 |
|---|---|
| 6.1.1 訂單進度通知清單 | 已完成 |
| 6.1.2 系統通知清單 | 已完成 |
| 6.1.3 空狀態（無訊息） | 已完成 |
| 6.1.4 系統推播橫幅點擊 | 已完成（新畫面類型，等使用者確認） |

---

## 本機元件

| 元件 | 屬性 | 用在 |
|---|---|---|
| `OrderNotificationItem` | TEXT：Title、Content、Time | 6.1.1 |
| `SystemNotificationItem`（variant Expanded=false／true） | TEXT：Title、Content、Time；BOOLEAN：Has Image | 6.1.2 |

---

## 待寫規則

- 縮小固定尺寸的 DS 圖示類元件（例如 `Logo-AppIcon` 64 縮成 40）用 `rescale`，不要 `resize`，否則內層圖案不縮放而被裁掉。App 圖示用 `Logo-AppIcon`，不留佔位。（已寫入 screen-types.md「系統畫面邊界」）
- 新畫面類型：通知列表、系統畫面邊界（已寫入 screen-types.md）。

---

**批次驗收（2026-10-07）**

- 結構檢查（腳本，整個 Page）：4 個 Frame 名稱與結構表一致，都是 393×852，捲動結構、堆疊順序、HomeIndicator、佔位文字、本機元件文字屬性都通過；只剩 Frame 外框的 1px 灰描邊提示（所有批次共有）。
- 內容對照：每格畫之前先列出文字與元素，對照結構檢查的文字傾印。
- 使用者確認：4 格都已確認（6.1.4 使用者指定只畫橫幅並用 `Logo-AppIcon`）。
- 本批新增：本機元件 `OrderNotificationItem`、`SystemNotificationItem`；Key 新增 CaretUp、Logo-AppIcon；近似對應 4 筆。沒有新增 DS 待辦與 pattern 候選。

---

## 例外判斷（2026-10-07）

**程式**：`master_notification_list.dart`、`order_notification.dart`、`system_notification.dart`、`time_elapsed_text.dart`

- 整頁白底（Scaffold 白色），底色綁 `Background/Surface`。列是整寬白底帶加底部細線，不是有邊距的卡片，所以不用 DS `Card`，各自做本機元件，底線用 `Border/Default` 1px（程式 `Colors.grey` 0.5px，`Border/Subtle` 太深）。
- 文字：標題 16 Bold 用 `Title/S`，內文與時間 14 Regular 用 `Body/S`，時間灰 (114,114,118) 用 `Text/Hint`（數值相同）。
- 系統通知的展開鈕是 Material 2 `IconButton`，最小點擊區 48，圖示 16 靠上置中，所以內文列最矮 48；收合時內文最多 3 行加刪節號，展開則全文。標題限寬 65% 單行刪節。沒有縮圖時仍留 8 的空隙（程式 `SizedBox(width: 8)` 一直存在）。
- 縮圖用 DS `Image`（Loaded）65×65 的佔位貓咪照。
- 6.1.2 示意資料涵蓋有縮圖、沒縮圖、展開三種；展開狀態只畫一則（資訊最多）。
- 6.1.3 空狀態兩個分頁共用，畫「訂單進度通知」分頁。用 `EmptyState`（Compact，關說明、關按鈕），插圖 `empty_notification_list.png` 沒有向量，留粉紅佔位「插圖佔位（待補）」。程式離頂部 120，用 `Wrap` 加 `Spacing/48` 共 96（近似對應表既有規則）。
- 頂部 AppBar 與兩個分頁照分頁列表頁做法（Standard／Slot／Brand＋`SegmentedControl`），沒有 BottomNavBar（通知頁是從首頁推進去的頁面）。
- 示意資料來源（後端 `fdtigermaster-functions`）：訂單進度通知的標題與內文都是後端 cron 與流程組好的真實文案（客戶同意報價、支付派遣費、約定時間提醒、報價被拒、客戶同意驗收）。靜音的「有 N 筆新訂單」不寫入通知紀錄，所以不放。系統通知（`type=0`）沒有師傅端的真實樣本，內容是依平台公告情境編的示意文字，需使用者確認。
- 時間文字用 `TimeElapsedText` 規則：N天前、N小時前、N分鐘前、剛剛。

**6.1.4（使用者決定）**：只畫系統橫幅，底圖用灰色 `Icon/Subtle`，不畫任何 App 畫面。橫幅用自排（白底、`Radius/12`、內距 `Spacing/12`），圖示用 DS 的 `Logo-AppIcon`（使用者指定，Key `e30102d71a06084634ef1f9aec8ac2cfe8bbdfd0`，原尺寸 64，縮成 40 要用 `rescale`，直接 `resize` 會讓內層圖案被裁掉），文字取自 6.1.1 第一則真實推播文案，右上「現在」。點擊後依後端 payload 導向的目的地不畫。頂部 StatusBar（Dark Content），底部 HomeIndicator。

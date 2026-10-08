# DatePicker（Calendar／WheelPicker）

日期與時間選擇。分成兩個元件：`Calendar`（月曆）與 `WheelPicker`（滾輪），放進 [BottomSheet](bottom-sheet.md) 的 Content 組合使用。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，`DateSelectBottomSheet`（`lib/component/bottom_sheet/date_select_bottom_sheet.dart`，內含 `CalendarDatePicker` 與 `CupertinoDatePicker`）；由 figma-ssot 階段 3 師傅檔案的本機元件 `DatePickerPanel` 升級_
_最後更新：2026-10-08_

---

## Variants

**Calendar**

| 屬性 | 類型 | 值 | 說明 |
|------|------|------|------|
| Month | Text | 預設「2026年10月」 | 月份標題 |
| Show Week 6 | Boolean | 預設關 | 月份跨 6 週時打開 |
| 日期格 | `_CalendarDay` instance | | 依月份逐格改 Day 與 State |

**_CalendarDay**（Calendar 的日期格，不單獨使用）。參考 Material 3 與 iOS 的日期選擇器：選取、停用是狀態，今天是另外疊加的標記。

| 屬性 | 值 | 樣式 |
|------|------|------|
| State | Default | `Text/Primary` |
| | Selected | 實心圓 `Interactive/Action`、白字 `Interactive/OnFilled` |
| | Disabled | `Text/Primary`，整格 40% 透明度（程式為黑色 38%） |
| Today | true／false | true 加 1px 藍框 `Interactive/Action`；未選取時字也是藍色 |
| Day | 文字 | 月初、月末的空格把文字清空 |

**與程式不同的地方**：程式的選取只有藍字、沒有底色，今天未選取時是黃字（`Colors.amber`）。程式碼註解說明這段顏色設定是為了繞過選取標記消失的問題，黃字在白底上也看不清楚，所以 DS 改用業界常見的實心圓與藍框。

**WheelPicker**

| 屬性 | 類型 | 值 | 說明 |
|------|------|------|------|
| Has Label | Boolean | 預設開 | 左側標籤（例如「時間」） |
| Label | Text | 預設「Label」 | |
| Show Column 3 | Boolean | 預設開 | 只要兩欄時關掉 |
| Column 1 至 3 | 外露的 `_WheelColumn` | Prev、Value、Next（文字） | Value 是選取列，Prev、Next 是上下鄰近值 |

## 結構與 Design Tokens

| 部位 | 做法 | 備註 |
|------|------|------|
| Calendar 外框 | 寬 393，左右 `Spacing/8` | |
| 月份列 | 高 52，左 `Spacing/16`、右 `Spacing/4`；月份 `Label/M`＋下拉箭頭，上下月箭頭各 48×48 | 上個月箭頭停用時 40% 透明度 |
| 星期列 | `Body/XS`、`Text/Hint`，每格高 42 | |
| 日期格 | 寬度平分、高 42，圓圈 42×42 `Radius/Full`；數字 `Title/M` | 程式 18 Bold，沿用近似 |
| WheelPicker 外框 | 左右 `Spacing/32`，標籤與滾輪間距 `Spacing/24`；標籤 `Heading/4` | |
| 滾輪 | 高 70、裁切，每列 32；選取值 `Title/L`＋`Text/Primary`，鄰近值 `Text/Hint` | 程式 `Container(height: 70)`、`itemExtent` 預設 32 |
| 選取條 | 高 32、`Border/Default`、`Radius/8`，滿寬 | |

## 使用規則

**用於：**
- 選擇預約日期與時間（打開時預設選今天：State=Selected、Today=true）：BottomSheet（hasHeader、Footer=None），右側 Trailing 換成 Ghost Action sm 的「完成」，Content 依序放 Calendar、WheelPicker，間距 `Spacing/32`。時間的欄位順序為時、分、上午／下午
- 只需要滾輪的選擇（例如生日）：只放 WheelPicker，關 Has Label

**避免：**
- 選項是一般文字清單時，用 BottomSheet＋[ListItem](list-item.md)，不用滾輪

## 邊界情況

- 可選範圍：程式從現在加 2 小時起、到 30 天後；範圍外的日期用 Disabled
- 預設時間：現在加 2 小時，分鐘進位到 00 或 30（分鐘間隔 30）
- 停用沿用 DS 慣例（整個元件 40% 透明度），不另設停用色 token
- 按「完成」後標題列的按鈕文字變成打字動畫「確認中」，屬互動行為，不做 variant

## 給工程的待辦

- 程式「今天但未選取」的日期用黃字（`Colors.amber`），在白底上看不清楚；選取日只有藍字沒有底色。建議改成和 DS 一致：選取為實心藍圓白字，今天為藍框藍字（見上方 `_CalendarDay`）。

## Flutter Widget

| Flutter Class | 對應元件 | 現況說明 |
|--------------|---------|------|
| `CalendarDatePicker` | Calendar | 在 `DateSelectBottomSheet` 內，以 Theme 覆寫日期顏色 |
| `CupertinoDatePicker`（time 模式） | WheelPicker | 同上 |
| `CupertinoPicker`／`CupertinoDatePicker`（date 模式） | WheelPicker | `PickerBottomSheet`、`DatePickerBottomSheet`（標題列兩側為「取消」「確認」文字鍵） |

`DateSelectBottomSheet` 用在客戶端叫修選時間、客戶端訂單修改期望施工時間、聊天室約施工時間（客戶與師傅共用）。

## Figma 元件

**位置**：TigerMaster-Design-System → DatePicker 頁

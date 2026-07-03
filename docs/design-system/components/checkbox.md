# Checkbox

複選勾選框，用於多選情境下讓使用者勾選/取消單一選項。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1，`titled_check_box.dart`）審查_
_最後更新：2026-07-03_

---

## Variants

Checkbox 由兩個獨立的 VARIANT 屬性交叉組成 2×3 = 6 種畫面呈現：`State`（enabled/disabled/error）與 `Selected`（false/true）為正交維度，非互斥——例如已勾選但被鎖定、或已勾選但驗證失敗都需要能各自呈現。

| 屬性 | 值 |
|------|-----|
| 狀態（`State`，VARIANT） | enabled / disabled / error |
| 已選取（`Selected`，VARIANT） | false / true |
| Label（TEXT property） | 勾選項文字，預設 `Checkbox label` |
| Error message（TEXT property） | 錯誤提示文字，預設 `請勾選以繼續`，僅 `error` 狀態顯示 |
| Error 文字顯示（`Show Error Message` BOOLEAN） | 顯示 / 隱藏——僅 `error` 狀態適用，預設 `true` |

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 選中底色 | `Interactive/Action` | Blue/500，`#3A89F8`，與 Button `secondary/filled` 語意一致 |
| 選中打勾符號 | `Interactive/OnFilled` | White |
| 未選中邊框 | `Border/Subtle` | `#9E9E9E` |
| Error 邊框 | `Border/Error` | 參考 TextField；僅 `Selected=false` 時顯示（空心紅框） |
| Error 底色 + 勾選符號 | `Status/Error` + `Interactive/OnFilled` | 僅 `Selected=true` 時顯示，取代選中底色 `Interactive/Action`，勾選符號沿用白色 |
| Error 文字 | `Status/Error`，Text Style `Body/S` | 顯示於 checkbox+label 下方，參考 TextField 規格 |
| Disabled | 整體 `opacity: 40%` | 與 Button/IconButton 一致，不使用獨立色票；`Selected=true` 時疊加選取樣式（藍底+勾勾）再套用同一組透明度，而非改用其他色票 |
| 圓角 | `Radius/4` | codebase 現況 5px，非精確對應，視覺差異可忽略 |
| Label 文字 | `Text/Primary`，Text Style `Body/M` | 元件內部不強制字級（text 由外部傳入 Widget），此為建議值；長者可用性優先，對齊系統基準字級 |
| Checkbox 與 label 間距 | `Spacing/8` | 統一取代現有 4px / 12px 兩種不一致間距 |

## 使用規則

**用於：**
- 多選情境下的單一可勾選選項（可搭配文字 label）

**避免：**
- 互斥選項——一組選項中只能選一個時應改用 `Radio`，非 Checkbox

## 邊界情況

- 可點擊區域涵蓋整個 Row（checkbox + label 文字皆可觸發勾選），非僅 checkbox 本體
- Label 長文字換行：checkbox 對齊文字第一行頂部（非垂直置中），文字自由換行不限行數

## Flutter Widget

| Flutter Class | 對應 Variant |
|--------------|-------------|
| `TitledCheckBox`（`lib/component/button/titled_check_box.dart`） | 全部 variant |

## Figma 元件

**位置**：[TigerMaster-Design-System → Checkbox](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=324-7)

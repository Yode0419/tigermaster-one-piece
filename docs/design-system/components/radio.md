# Radio

單選勾選框，用於一組互斥選項中讓使用者選擇單一選項。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，原生 `Radio<T>` 分散使用於 5 個檔案（`order_matching_cancel_page.dart`、`order_quotation_cancel_page.dart`、`personal_invoice_form.dart`、`donation_invoice_form.dart`、`donation_invoice_setting.dart`）_
_最後更新：2026-07-03_

---

## Variants

Radio 由兩個獨立的 VARIANT 屬性交叉組成 2×3 = 6 種畫面呈現：`State`（enabled/disabled/error）與 `Selected`（false/true）為正交維度，非互斥——例如已選取但被鎖定、或已選取但驗證失敗（見下方「Error 狀態說明」）都需要能各自呈現。

| 屬性 | 值 |
|------|-----|
| 狀態（`State`，VARIANT） | enabled / disabled / error |
| 已選取（`Selected`，VARIANT） | false / true |

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 選中外框 + 內部圓點 | `Interactive/Action` | 與 Checkbox 選中色一致 |
| 未選中邊框 | `Border/Subtle` | 與 Checkbox 一致 |
| Error 邊框 | `Border/Error` | 由群組驗證觸發，非單一項目獨立判斷（見「使用規則」）；僅 `Selected=false` 的組內選項顯示（空心紅圓） |
| Error 外框 + 圓點 | `Status/Error` | 僅 `Selected=true` 的組內選項顯示（該選項是使用者已選取的那一個），取代選中色 `Interactive/Action` |
| Error 文字 | `Status/Error`，Text Style `Body/S` | 顯示於整組選項下方，非個別 Radio 下方 |
| Disabled | 整體 `opacity: 40%` | 與 Checkbox/Button/IconButton 一致，不使用獨立色票；`Selected=true` 時疊加選取樣式（藍框+圓點）再套用同一組透明度，而非改用其他色票 |
| Label 文字 | `Text/Primary`，Text Style `Body/M` | 與 Checkbox 一致；長者可用性優先，對齊系統基準字級 |
| Radio 與 label 間距 | `Spacing/8` | codebase 現況已一致使用 8px |

## 使用規則

**用於：**
- 一組互斥選項中選擇單一選項，選項數量無上限

**避免：**
- 多選情境——應改用 `Checkbox`

**Error 狀態說明：**
- Radio 的 error 是「群組層級」共享狀態，非單一項目獨立判斷（與 Checkbox 不同）
- 群組驗證失敗時（例如必選但未選擇任何選項、或選擇了不合法組合），組內所有 Radio 同步套用 error 樣式，並在整組選項下方顯示錯誤文字
- 若組內已有選項被使用者選取，該選項套用 `Selected=true` 的 error 樣式，其餘未選取的選項則套用 `Selected=false` 的空心紅圓樣式（見上方 Design Tokens）

## 邊界情況

- 可點擊區域涵蓋整個 Row（radio + label 文字皆可觸發選取），非僅 radio 本體
- Label 長文字換行：radio 對齊文字第一行頂部（非垂直置中），與 Checkbox 一致

## Flutter Widget

| Flutter Class | 對應 Variant |
|--------------|-------------|
| `Radio<T>`（Flutter 原生，無封裝元件） | selected / unselected / disabled |

目前各畫面手動包裝、無品牌色主題，未來建議封裝為統一元件並套用主題色。

## Figma 元件

**位置**：[TigerMaster-Design-System → Radio](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=333-1385)

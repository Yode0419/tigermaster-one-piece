# Checkbox

複選勾選框，用於多選情境下讓使用者勾選/取消單一選項。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1，`titled_check_box.dart`）審查_
_最後更新：2026-07-02_

---

## Variants

Checkbox 由兩個獨立的 VARIANT 屬性交叉組成 2×3 = 6 種畫面呈現，取代舊版把「選取」與「狀態」混在同一個屬性裡的做法：

| 屬性 | 值 |
|------|-----|
| 狀態（`State`，VARIANT） | enabled / disabled / error |
| 已選取（`Selected`，VARIANT） | false / true |
| Label（TEXT property） | 勾選項文字，預設 `Checkbox label` |
| Error message（TEXT property） | 錯誤提示文字，預設 `請勾選以繼續`，僅 `error` 狀態顯示 |
| Error 文字顯示（`Show Error Message` BOOLEAN） | 顯示 / 隱藏——僅 `error` 狀態適用，預設 `true` |

### 為什麼 State 與 Selected 要拆成兩個屬性

`disabled` 與 `error` 都不是與「是否選取」互斥的狀態，而是獨立的維度：
- 被鎖定的 checkbox 一樣可能原本就是已勾選的（例如條款必勾且不可取消、或系統預設鎖定的選項）
- 驗證失敗但使用者已勾選的 checkbox 也可能同時處於 error（例如「必須勾選其中一項但目前選的組合不合法」）

舊版把「unselected / selected / disabled / error」四個值放在同一個屬性裡，等同於預設 disabled、error 只會是未選取狀態，畫面上完全無法呈現「已勾選但被鎖定」或「已勾選但驗證失敗」。拆成 `State`（enabled/disabled/error）× `Selected`（false/true）兩個正交的 VARIANT 屬性後，Figma 元件集會呈現完整的 2×3 網格，enabled/disabled/error 三種狀態各自都有「未選取」與「已選取」兩種畫面，設計師可直接在 Figma 屬性面板切換，不會漏掉任何組合。

業界作法（Material Design 3、USWDS、Carbon 等）也是將 disabled/error 與 selected 視為正交維度：disabled 保留原本的顏色/勾選符號、疊加降低透明度表示不可互動；error 則是把選中底色從 `Interactive/Action` 換成 error 語意色（`Status/Error`），勾選符號維持白色，而非把已選取的視覺資訊抹除。

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

# TextField

文字輸入框，用於表單中需要使用者鍵入一般文字或多行說明的欄位。

> **元件邊界**：此規格僅涵蓋「使用者鍵入內容」本身。密碼欄位是獨立元件，見 [PasswordField](password-field.md)；搜尋框（前綴/後綴 icon 組合）屬於未來 `SearchBar` molecule 規格範疇；欄位外部並排的按鈕（如「全部折抵」）屬於版面組合，非 TextField 屬性；標籤列容器（icon + 標籤 + 底線外殼，如訂單詳情頁的欄位顯示）屬於另一獨立元件，非 TextField 範疇。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查_
_最後更新：2026-07-01_

---

## Variants

| 維度 | 值 |
|------|-----|
| 行數 | 單行 / 多行（textarea） |
| 後綴控制項 | 無 / 自訂 Icon（驗證提示，Stack 疊加於底線範圍內）|
| 狀態 | default / disabled / readonly / focused / error |
| 內容顯示 | Filled（使用者已輸入值，`Text/Primary`）/ Empty（空欄位提示文字 Placeholder，`Text/Hint`）——正式 VARIANT 維度，非 BOOLEAN 開關 |
| 字數顯示器 | 顯示（有 `maxLength` 且無後綴控制項時）/ 隱藏（有後綴控制項時，現況讓位給 icon） |
| Helper Text 顯示 | 顯示 / 隱藏——`Show Helper Text` BOOLEAN，預設 `true` |
| Label 顯示 | 顯示 / 隱藏——`Show Label` BOOLEAN，預設 `true`；關閉時必須在欄位外部（正上方或區塊標題）另外提供標籤文字，不可完全無標籤，見下方使用規則 |

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 背景色 | `Background/Surface` | 白底 |
| 邊框色（default） | `Border/Subtle` | ⚠ 見下方 TBD：codebase 現況色差待修正 |
| 邊框色（focus） | `Border/Focus` | |
| 邊框色（error） | `Border/Error` | |
| Label 文字 | `Text/Secondary`，Text Style `Body/S` | 欄位名稱，永久顯示的重要資訊，顏色/字級皆高於 Placeholder 一階，與其區隔 |
| Hint 文字（輔助說明） | `Text/Hint`，Text Style `Body/S` | 字級與 Label 同階、顏色較淡，維持次要語意 |
| 輸入文字（`Value Text`） | `Text/Primary`，Text Style `Body/M` | 預設文字 `Input text` |
| Placeholder 文字（`Placeholder Text`） | `Text/Hint`，Text Style `Body/M` | 與 Value Text 字級相同（同一文字圖層切換內容）；⚠ 不可用更淡的色階，見下方邊界情況的對比度說明；預設文字 `Placeholder text` |
| Error 文字 | `Status/Error`，Text Style `Body/S` | 任務關鍵資訊，字級與 Label/Hint 同階，不使用最小字級 |
| 後綴 icon | `Icon/Subtle` | |
| 字數顯示器文字 | `Text/Hint`，Text Style `Body/XS` | 純裝飾性資訊，維持最低字級層級 |
| 圓角 | 無 | Flutter 底線樣式，不適用 Radius token |

## 使用規則

**用於：**
- 表單中需要使用者鍵入內容的任何欄位（一般文字、多行說明）

**避免：**
- 密碼欄位——改用獨立的 [PasswordField](password-field.md)
- 搜尋情境（改用未來的 `SearchBar` molecule）
- 欄位值永不可編輯的純顯示情境（不應套用輸入框視覺語言）
- 在 TextField 內建立按鈕/badge slot——外部按鈕（如 `PillButton`）應以 `Row` 並排組合，非 TextField 自身屬性
- 關閉 `Show Label` 時完全不提供替代標籤——應在欄位外部（正上方或區塊標題）補上標籤文字

## 邊界情況

- **驗證失敗時的後綴 icon 位移**：`TextFormField` 顯示錯誤紅字時會自動長高，連帶讓外層 `Stack` 容器變高；後綴 icon 用 `bottom: 26` padding 固定錨在原本輸入框那一列，避免跟著容器長高被拖往下滑到錯誤文字旁邊
- **readonly 狀態**：樣式與一般欄位相同（floating label、邊框不變），僅移除互動性，符合 Material 3 readonly 設計原則
- **多行 textarea**：Flutter 端用 `maxLines: null`，隨內容自動增高，無固定行數上限。Figma 端對齊此行為：`Value Text`/`Placeholder Text` 圖層設定 `textAutoResize: HEIGHT` + `minHeight: 72`（= 3 行 `Body/M` 的高度），內容超過最小高度時持續往下長高；外層 `input-row` 與整個 component 皆為 HUG 高度，隨內容層層往上長高，不會被裁切
- **Placeholder 顏色不可比 `Text/Hint` 更淡**：WCAG 2.0 AA（SC 1.4.3）將 placeholder 視為頁面真實文字內容，需符合 4.5:1 對比度；`Text/Hint`（`#727276`）對白底僅 4.79:1，已接近下限——若改用更淡的 `Neutral/500`（`#9E9E9E`，2.68:1）或更淡色階會直接不符合標準
- **Focused 狀態不顯示游標**：靜態 Figma 元件用邊框變化（1px 灰 → 2px 藍）表達 focus，不畫出動態游標圖示
- **`Value Text` vs `Placeholder Text`**：Figma 端是各自獨立的 property，`Content=Filled` 時改 `Value Text` 才有作用，`Content=Empty` 時改 `Placeholder Text` 才有作用，兩個欄位會同時出現在屬性面板上

## Flutter Widget

| Flutter Class | 對應 Variant |
|--------------|-------------|
| `IconButtonTextFormField` | 一般文字 + 可選驗證 icon |
| 原生 `TextFormField` / `TextField`（直接呼叫） | 多行 textarea、readonly 顯示值、特例邊框（如 Tiger Points 折抵輸入） |

> ⚠ 同一概念有多種寫法並存，是技術債之一，建議長期收斂成單一 widget。

## Figma 元件

**位置**：[TigerMaster-Design-System → TextField](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=264-1425)

## 待釐清事項（TBD）

- [ ] `Border/Subtle` 色差修正：codebase 多數輸入框邊框實為 `#A0A0A0`，已決議以 token `#9E9E9E` 為準，待之後修正 codebase

# TextField

文字輸入框，用於表單中需要使用者鍵入文字、數字或密碼內容的欄位。

> **元件邊界**：此規格僅涵蓋「使用者鍵入內容」本身。搜尋框（前綴/後綴 icon 組合）屬於未來 `SearchBar` molecule 規格範疇；欄位外部並排的按鈕（如「全部折抵」）屬於版面組合，非 TextField 屬性；標籤列容器（icon + 標籤 + 底線外殼，如訂單詳情頁的欄位顯示）屬於另一獨立元件，非 TextField 範疇。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查_
_最後更新：2026-06-30_

---

## Variants

| 維度 | 值 |
|------|-----|
| 內容型態 | 一般文字 / 密碼 |
| 行數 | 單行 / 多行（textarea） |
| 後綴控制項 | 無 / 自訂 IconButton（驗證提示，Stack 疊加於底線範圍內）/ 密碼顯示切換（固定眼睛圖示，Stack 疊加）|
| 狀態 | default / disabled / readonly / focused / error |
| 字數顯示器 | 顯示（有 `maxLength` 且無後綴控制項時）/ 隱藏（有後綴控制項時，現況讓位給 icon） |

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 背景色 | `Background/Surface` | 白底 |
| 邊框色（default） | `Border/Subtle` | ⚠ 見下方 TBD：codebase 現況色差待修正 |
| 邊框色（focus） | `Border/Focus` | |
| 邊框色（error） | `Border/Error` | |
| Label / Hint 文字 | `Text/Hint` | `labelText`、`hintText` 共用 |
| 輸入文字 | `Text/Primary`，`Body/M` | typography.md 已註記「表單輸入值」用 Body |
| Error 文字 | `Status/Error` | |
| 後綴 icon | `Icon/Subtle` | |
| 字數顯示器文字 | `Text/Hint` | typography.md 已註記「字數計算」用 Text/Hint |
| 圓角 | 無 | Flutter 底線樣式，不適用 Radius token |

## 使用規則

**用於：**
- 表單中需要使用者鍵入內容的任何欄位（一般文字、密碼、多行說明）

**避免：**
- 搜尋情境（改用未來的 `SearchBar` molecule）
- 欄位值永不可編輯的純顯示情境（不應套用輸入框視覺語言）
- 在 TextField 內建立按鈕/badge slot——外部按鈕（如 `PillButton`）應以 `Row` 並排組合，非 TextField 自身屬性

## 邊界情況

- **驗證失敗時的後綴 icon 位移**：`TextFormField` 顯示錯誤紅字時會自動長高，連帶讓外層 `Stack` 容器變高；後綴 icon 用 `bottom: 26` padding 固定錨在原本輸入框那一列，避免跟著容器長高被拖往下滑到錯誤文字旁邊
- **readonly 狀態**：樣式與一般欄位相同（floating label、邊框不變），僅移除互動性，符合 Material 3 readonly 設計原則
- **多行 textarea**：目前用 `maxLines: null`，隨內容自動增高，無固定行數上限

## Flutter Widget

| Flutter Class | 對應 Variant |
|--------------|-------------|
| `IconButtonTextFormField` | 一般文字 + 可選驗證 icon |
| `ObscureTextFormField` | 密碼 |
| 原生 `TextFormField` / `TextField`（直接呼叫） | 多行 textarea、readonly 顯示值、特例邊框（如 Tiger Points 折抵輸入） |

> ⚠ 目前同一概念有 3 種以上寫法並存，是技術債之一，建議長期收斂成單一 widget，這次先記錄現況。

## Figma 狀態

- [ ] 已建立為 Figma Component（TigerMaster-Design-System）
- **目前位置**：尚未確認
- **下一步**：TBD — 確認 Figma 中是否已有 TextField Component 節點；建議元件名稱與 Figma 頁面皆使用 `TextField`，與 `SearchBar` 各自獨立頁面（SearchBar 雖依賴 TextField，但 codebase 內有多種視覺型態，獨立頁面利於之後備料管理）

---

## 待釐清事項（TBD）

- [ ] `Border/Subtle` 色差修正：codebase 多數輸入框邊框實為 `#A0A0A0`，已決議以 token `#9E9E9E` 為準，待之後修正 codebase
- [ ] Figma 中是否已有 TextField Component 節點？

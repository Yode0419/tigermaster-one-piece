# CornerBadge

疊加在卡片或圖片角落、強調顯示的資訊標記元件，不對稱圓角隨左下／右下位置鏡像翻轉；目前唯一使用場景為保固天數顯示，與可互動的 [Chip](chip.md)、靜態描述用的 [Tag](tag.md) 明確區分。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，`WarrantyDayBadge`（`lib/component/service/warranty_day_badge.dart:3`）+ 2 處實際使用情境比對_
_最後更新：2026-07-07_

---

## Variants

| 屬性 | 值 |
|------|-----|
| Position | `左下角`／`右下角`（不對稱圓角鏡像翻轉：外側角小圓角、內側角大圓角）|

不做互動狀態（無 disabled/hover），純顯示用途。

另有 Boolean 元件屬性 `hasIcon`（預設 `true`），控制圖示是否顯示，取代原先的 `Content`（圖示＋文字／純文字）variant，與 [Chip](chip.md) 的 `hasIcon` 屬性同一模式。文字內容為 Text property `Label`（預設值「保固 365 天」），可於 instance 層級覆寫。

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 背景色 | `Interactive/Brand` | `#FABF13`，與 codebase 現況精準對應 |
| 文字色 | `Text/Brand` | `#1F286F`，與 codebase 現況精準對應 |
| 內側圓角 | `Radius/12` | 與 codebase 現況（`topLeft: 12`）精準對應 |
| 外側圓角 | `Radius/4` | 現況 codebase 為 5px（`bottomRight: 5`），[radius.md](../tokens/radius.md) 規定不得使用未定義任意圓角值，四捨五入對應至已定義的 `Radius/4`，列為待修正技術債 |
| 圖示 | [Icon](icon.md) 元件 `Phosphor` variant，`Size 16` | 與 Icon 元件同一資源路徑（`assets/images/icons/`），歸類為 Icon 元件管理；現況 hardcode 14px，與最接近的定義尺寸 16px 有微差，列為輕微技術債 |
| 字重 | — | hardcode `FontWeight.w500`，與 [typography.md](../tokens/typography.md) Label 群組字重一致，無需另立 token |
| 字級 | `Label/S` | 12px；現況未 hardcode，繼承 ambient 樣式，[typography.md](../tokens/typography.md) 明確列出 `Label/S` 典型用途包含 Badge 類元件，字重亦與現況吻合，定案採用 |
| Padding | `Spacing/8`（容器水平 padding）／`Spacing/4`（圖示與文字間距） | 統一為對稱 8px，取代現況不對稱的 `left: 9 / right: 10` |

## 使用規則

**用於：**
- 保固天數等需疊加在卡片／圖片角落強調的資訊

**避免：**
- 其他情境尚未定義前，先僅限保固天數使用場景

## 邊界情況

- 文字過長：不限制寬度，隨文字長度自適應擴張（現行 codebase 為固定寬度 110px，規格定義為自適應，需一併修正，列為技術債）

## Flutter Widget

| Flutter 現況實作 | 對應 Variant | 現況說明 |
|--------------|-------------|------|
| `WarrantyDayBadge` | Position：固定（現況未隨位置鏡像）／`hasIcon`：true（圖示＋文字）| 僅服務保固情境；寬度固定 110px（技術債，應改自適應）|

**技術債**：現況僅有 `WarrantyDayBadge` 單一實作，只支援固定位置與「圖示＋文字」組合。規格立場：不建議改寫為通用 widget，僅記錄現狀。

## Figma 元件

**位置**：[TigerMaster-Design-System → CornerBadge](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=593-1751)

---

## 待釐清事項（TBD）

- 無

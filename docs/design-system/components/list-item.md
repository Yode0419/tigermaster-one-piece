# ListItem

icon（可選）+ 標題 + 尾端元件組成的通用列表列外殼，用於可瀏覽/互動的列表情境（設定選單、帳號資料列）。

> **元件邊界**：與 PriceText（純 label:value 金額/數值明細列，無 icon、無互動意圖，未來另立 Pattern）明確區分；ListItem 服務可瀏覽/互動的列表，PriceText 服務財務摘要展示。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，`SettingTile`（`lib/component/tile/account_setting_tile.dart`）、`MemberInfoTile`（`lib/component/tile/member_info_tile.dart`）為現況參考實作；Figma 尚未建立_
_最後更新：2026-07-13_

---

## Variants

| 維度 | 值 |
|------|-----|
| Leading Icon | Boolean property（顯示/隱藏；隱藏時不保留佔位空間，內容直接左移貼齊）|
| Trailing | Variant，三選一：`Icon`（固定顯示單一圖示，如預設箭頭）／`Slot`（彈性插槽，承接自訂組合內容）／`None`（不顯示）|
| Divider | Boolean property（底部分隔線）|

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 上下 padding | `Spacing/16` | 左右無 padding，水平間距由外層容器決定 |
| icon-title 間距 | `Spacing/12` | |
| Icon 尺寸 | Icon 元件 `Size/24` | |
| Title 文字 | `Title/S` + `Text/Primary` | 16px/500 |
| Trailing 數值文字（Slot 內容） | `Body/L` + Bold + `Text/Brand` | 沿用內文強調規則（Body 套 Bold），對應現況 `MemberInfoTile` 數值樣式 |
| Trailing 圖示 | `Icon/Default`，`Size/16` | |
| 分隔線顏色 | `Border/Default` | |
| 分隔線寬度 | 1px | 現況 0.5px，統一為 1px 屬技術債修正 |

## 使用規則

**用於：**
- 使用者可瀏覽/互動的列表項目（設定選項、帳號資料列，如「聯繫客服」）

**避免：**
- 純 label:value 明細類列表（不限金額，泛指各類逐項明細）→ 屬於 PriceText（未來另立 Pattern）範疇。判斷準則（符合任一即不適用 ListItem）：
  1. 列表垂直節奏為緊湊型（非 16px padding + Divider）
  2. 同一列表中不同列的 trailing 強調層級（字級/字重）會變化（如總計特別放大加粗）
  3. 完全沒有互動/導覽意圖，純粹展示金額摘要

## 邊界情況

- **標題過長** → 單行 truncate + ellipsis（無副標可承接換行）
- **Leading icon 隱藏時** → 不保留佔位空間
- **Trailing = Slot** → 可同時容納「數值文字 + 互動圖示」組合（現況 `MemberInfoTile`：value + 8px 間距 + 條件顯示箭頭）
- **多列疊放** → 建議只在最後一項關閉 Divider
- **Pressed 互動** → 為通用回饋（現況 `InkWell` 包住整列），不做「可點擊/純顯示」variant；有無 onTap 由呼叫端決定

## Flutter Widget

| Flutter Class | 對應角色 |
|--------------|---------|
| `SettingTile` | 現況參考實作，Trailing = Icon 預設用法 |
| `MemberInfoTile` | 現況參考實作，Trailing = Slot 用法 |
| —（待新建） | 待整併為統一 `ListItem` widget |

## Figma 元件

**位置**：[TigerMaster-Design-System → ListItem](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=727-16)

---

## 待釐清事項（TBD）

- Divider 用 `Border/Default` 綁定在 `fills`（該 token 於 Figma 定義 scope 為 `STROKE`），視覺結果一致但綁定方式與 token 定義用途不符，待設計確認是否需調整
- Trailing=Slot 現況為一般 auto-layout frame，非原生 Figma Slot node（Plugin API 限制），功能等效但節點類型與 Dialog/Icon 等元件的 Slot 用法不一致

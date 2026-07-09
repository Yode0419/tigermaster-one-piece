# Rating

星級評分元件，涵蓋唯讀顯示分數與使用者輸入評分兩種場景。兩者視覺完全一致，僅 Flutter 行為（是否可點擊）不同。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查；Figma Component 已建立_
_最後更新：2026-07-09_

---

## Variants

| 維度 | 值 |
|------|-----|
| `Size` | `lg`(24px) ／ `sm`(16px)，復用 `Icon` 元件尺寸 token |
| `Rate` | `0` / `0.5` / `1` / `1.5` / `2` / `2.5` / `3` / `3.5` / `4` / `4.5` / `5`（半星為最小刻度，共 11 階）|

星星數量固定 5 顆，不作為 variant。`Interactive`（是否可點擊評分）只在 Flutter Widget 層作為行為參數，視覺不變，不對應 Figma variant。

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 填色星星（Full／Half） | `Icon/Brand` | 取代現況 `Colors.amber` |
| 未填色星星（Empty） | `Icon/Subtle` | 現況為 `Theme.disabledColor`，色值與此 token 相近 |
| 星星間距（`lg`） | `Spacing/4` | |
| 星星間距（`sm`） | `Spacing/2` | |

## 使用規則

**用於：**
- 展示平均評分（`Rate=0` 為合法值，如尚無評分時顯示全空星）
- 蒐集使用者對師傅／服務的評分輸入

**避免：**
- 互動輸入允許評到 0 分（現況 `minRating: 1`）

## 邊界情況

- 唯讀顯示支援任意小數比例填色；互動輸入以半星為最小刻度
- 分數文字現況無四捨五入格式化，技術債
- 分數為 `null` 時 fallback 為 `0`，顯示全空星

## Flutter Widget

| Flutter Class | 對應行為 |
|--------------|---------|
| `RatingBarIndicator`（`flutter_rating_bar`） | `Interactive: false`，唯讀顯示 |
| `RatingBar.builder`（`flutter_rating_bar`） | `Interactive: true`，互動輸入 |

現況 8 處直接呼叫套件元件，無專屬封裝 widget，建議整併為統一 `Rating` widget：`master_Introduction_bottom_sheet.dart:37,76,106,136`、`to_client_comment.dart:52`、`to_master_comment.dart:115,152,189`。

## Figma 元件

**位置**：[TigerMaster-Design-System → Rating](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=653-50)（Component Set，`Size` × `Rate` 共 22 種變體；內部由 5 顆獨立星星子元件 `_Rating Star` 組成，Fill(Full/Half/Empty) 決定填色）

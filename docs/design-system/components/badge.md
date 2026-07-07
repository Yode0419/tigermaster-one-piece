# Badge

疊加在其他元件（圖示、頭像）右上角的通知提示元件，用於主動引起使用者對未讀訊息／新通知的注意；與靜態顯示、不強調即時性的 [Tag](tag.md) 明確區分。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，`ChatroomUnreadBadge`（`lib/component/badge/chatroom_unread_badge.dart:7`）+ 3 處直接使用 `package:badges` 情境比對_
_最後更新：2026-07-07_

---

## Variants

| 屬性 | 值 |
|------|-----|
| Content | `Dot`（純圓點，無文字）／`Count`（顯示數字或 9+）|
| Position | 固定右上角，不開放其他位置 |

不做互動狀態（無 disabled/hover），純顯示用途，僅有顯示／隱藏（`showBadge`）之分。

`Count` 的顯示文字為 Figma 元件 Text property `Label`（預設值 `9+`），可於 instance 層級覆寫成任意數字／文字，非寫死內容。

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 背景色 | `Status/Error` | `#FF2851`，與 codebase 現況精準對應 |
| 文字色 | `Interactive/OnFilled` | `#FFFFFF`，語意（填色互動元件上的文字與 icon）與現況值皆吻合，不另立新 token |
| 字級 | `Label/XS` | 10px；現況 hardcode 8px，低於 `typography.md` 規定的最小 Label 尺寸（[typography.md](../tokens/typography.md) 明訂「不得更小」），已修正為符合規則的 `Label/XS`，列為技術債 |
| 圓角 | `Radius/Full` | 現況未明確 hardcode，依外部 `badges` package 圓形慣例定案；已同步修正 [radius.md](../tokens/radius.md) 原將 Badge 歸類於 `Radius/4` 的描述 |
| Dot 尺寸 | 直徑 8px（對應 `Spacing/8`） | |
| Count 尺寸 | 高度 16px，水平 padding `Spacing/4` | 單一數字時呈圓形；兩位數字（9+）時呈自適應寬度的橢圓形 |

**陰影**：不使用 Elevation token。Badge 是貼附在其他元件正上方的小型指示物，沒有獨立的空間層次關係，不符合 [elevation.md](../tokens/elevation.md)「僅用於有明確層次關係的元件」的適用範圍；現況 codebase 各呼叫點也均未設定非零 elevation 值。

## 使用規則

**用於：**
- 需要主動引起注意的未讀訊息、新通知（如聊天室未讀數）

**避免：**
- 非時效性資訊或靜態狀態標示（該用 [Tag](tag.md)）

## 邊界情況

- 數字上限：規格定義為 `9+`；現行 codebase 顯示為字母 `'N'`（`unread > 0 && unread < 10 ? unread : 'N'`），對使用者無語意，列為待修正技術債

## Flutter Widget

| Flutter 現況實作 | 對應 Variant | 現況說明 |
|--------------|-------------|------|
| `ChatroomUnreadBadge` | Count | 聊天室未讀數，1–9 直接顯示數字，超過 9 顯示 `'N'`（技術債，應改為 `9+`）|
| `package:badges` 直接使用（`client_home_page.dart:331`）| Dot | 筆記圖示紅點提示，`showBadge: hasImportant` |
| `package:badges` 直接使用（`admin_chatroom_list_item.dart:27`）| Dot | 使用者頭像紅點提示，`showBadge: chatroom.unread != 0` |
| `package:badges` 直接使用（`master_in_progress_order_card.dart:152`）| Count | 訂單卡片未讀數 |

**技術債**：現況為 `ChatroomUnreadBadge` 自訂包裝與多處直接使用 `package:badges` 兩種不一致實作並存，各自 hardcode 顏色與字級。規格立場：不建議整併為統一 widget，僅記錄現狀。

## Figma 元件

**位置**：[TigerMaster-Design-System → Badge](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=592-15)

---

## 待釐清事項（TBD）

- 無

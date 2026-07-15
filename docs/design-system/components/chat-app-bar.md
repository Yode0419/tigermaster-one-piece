# ChatAppBar

聊天室頁面頂部標題列，依對話情境（客戶端／師傅端／客服／管理員模式）顯示標題，並提供返回與撥打電話功能。

> **元件邊界**：功能角色等同 [AppBar](app-bar.md)，但因應聊天室四種情境有專屬的 Title 姓名 pill 與 Action 顏色覆寫，獨立成篇記錄，不回頭修改 AppBar 主規格。

_來源：Figma（TigerMaster-Design-System → Chatroom 頁面）＋ Flutter codebase（`fdtigermaster_app` v2.6.1）四個獨立頁面比對：`to_client_chatroom.dart`、`to_master_chatroom.dart`、`to_admin_chatroom.dart`、`from_admin_chatroom.dart`；Figma 現況僅 3 個 symbol，尚未建立正式 Component_
_最後更新：2026-07-15_

---

## Variants

| 維度 | 值 |
|------|-----|
| Chat（情境） | `To Client`（師傅端與客戶對話，標題含客戶姓名 pill）／`To Master`（客戶端與師傅對話，標題含師傅姓名 pill）／`To Admin`（師傅端或客戶端與客服對話，靜態文字「聯繫客服」）／`Admin Mode`（客服端與師傅或客戶對話，標題 pill 顯示全名，Action 僅圖示無文字）|

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 背景色 | `Background/Surface` | |
| 陰影 | `Elevation/Drop` | |
| Leading icon | 複用 [IconButton](icon-button.md)，CaretLeft 圖示 | 固定返回鍵 |
| Title 文字 | `Title/M` / `Text/Primary` | 置中，與 [AppBar](app-bar.md) Standard 一致 |
| Title 姓名 pill 底色 | `Status/InfoContainer` | 僅 `To Client`／`To Master`／`Admin Mode` 出現 |
| Title 姓名 pill 文字色 | `Text/Brand` | |
| Title 姓名 pill 圓角 | `Radius/4` | |
| Action | 複用 [IconLabelButton](icon-label-button.md) 結構，顏色覆寫為 `Icon/Brand` + `Text/Brand` | 不新增 tone、不動 IconLabelButton 主規格，由 ChatAppBar 內部覆寫 |

## 使用規則

**用於：**
- 聊天室頁面最上層，取代標準 AppBar

**避免：**
- 非聊天室情境的一般頁面標題（用 [AppBar](app-bar.md)）

## 邊界情況

- 姓名 pill 寬度一律 hug，不截斷、不加省略號：`To Client`／`To Master` 為姓氏縮寫（如「陳客戶」），固定最多 3 字；`Admin Mode` 顯示全名，同樣採 hug 處理
- 明確不含頭像（修正 [component-inventory.md](../component-inventory.md) 先前「對話對象頭像」的描述，Figma 稿與 Flutter 現況皆無頭像）

## Flutter Widget

| Flutter Class | 對應 Variant |
|--------------|-------------|
| `to_client_chatroom.dart:40` | `To Client` |
| `to_master_chatroom.dart:43` | `To Master` |
| `to_admin_chatroom.dart:63` | `To Admin` |
| `from_admin_chatroom.dart:39` | `Admin Mode` |

現況 4 個獨立 class，皆用原生 Flutter `AppBar` 各自手刻，無共用元件，待整併為統一 `ChatAppBar` widget。

## Figma 元件

**位置**：[TigerMaster-Design-System → Chatroom](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=831-54)

---

## 待釐清事項（TBD）

- 無

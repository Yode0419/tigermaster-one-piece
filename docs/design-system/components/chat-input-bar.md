# ChatInputBar

聊天室頁面底部的訊息輸入列，讓使用者輸入文字、附加照片，並在特定角色組合下發起日期邀約。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，`ChatroomInputBar`（`lib/component/chatroom/chatroom_input_Bar.dart`）+ 四個聊天室頁面呼叫端比對：`to_client_chatroom.dart`、`to_master_chatroom.dart`、`to_admin_chatroom.dart`、`from_admin_chatroom.dart`；Figma Component Set 已建立_
_最後更新：2026-07-16_

---

## Variants

| 維度 | 值 |
|------|-----|
| State | Collapsed（收合，Toggle 顯示「更多功能」）／Expanded（展開，Toggle 顯示「收起功能」，露出照片與日期選項面板） |
| Content | Empty（顯示 Placeholder）／Filled（顯示使用者輸入值，輸入框邊框變色） |
| TimeRequest（Boolean，Figma 端僅為標記，非功能性） | true（預設，日期按鈕顯示）／false（無實際綁定，見下方限制說明） |

> 元件邊界：外層容器直接複用 [Sticky Footer](sticky-footer.md)（`Content: Flexible Slot`），承載本元件的自訂內容；不定義獨立 disabled 屬性——disabled 完全由內部子元件（IconButton／IconLabelButton）各自的 disabled 狀態決定，非 ChatInputBar 自身 variant。文字輸入框**不複用** [TextField](text-field.md) 元件——聊天室輸入框為專屬客製實作（貼近現況 codebase 原生 `TextField` 寫法：隨內容增高），僅套用相近的顏色／字級／邊框 token 維持視覺一致，不是 TextField 元件的 instance。
>
> ⚠ **TimeRequest 限制**：Figma 平台不允許把 component property 綁在巢狀於另一個 instance（Sticky Footer）插槽內的子層上，因此 `TimeRequest` 目前只是一個沒有實際接線的 Boolean property，日期按鈕在 Expanded 的兩個 variant 中固定顯示。對應到「客服涉入即不應顯示日期按鈕」（`to_admin`／`from_admin`）的情境時，需在該 instance 手動刪除／隱藏日期按鈕圖層，非由屬性面板切換。

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 容器背景 | `Background/Surface` | 沿用 Sticky Footer |
| 容器陰影 | `Elevation/Rise` | 沿用 Sticky Footer |
| 容器 padding | `Spacing/16`（四邊統一） | 沿用 Sticky Footer，取代現況硬編碼 `16/0/8/0` |
| 主色（icon/label） | `Interactive/Primary`（`#1F286F`） | 現況色值與此 token 完全吻合，零新增 |
| 輸入框內距 | `Spacing/16` + `Spacing/4` | 現況 `16/4/16/0` 對應吻合；輸入框為客製元素，非 TextField instance |
| 輸入框圓角 | `Radius/16` | 現況硬編碼 20px，就近取整收斂 |
| 輸入框邊框（Content=Empty） | `Border/Subtle` | |
| 輸入框邊框（Content=Filled） | `Border/Focus` | |
| 輸入文字（Content=Filled） | `Text/Primary`，Text Style `Body/M` | 比照 TextField 同組 token 維持視覺一致，非共用元件 |
| Placeholder 文字（Content=Empty） | `Text/Hint`，Text Style `Body/M` | 現況文字「Aa」 |
| Toggle／輸入框／Send 間距 | `Spacing/12` | |
| 展開面板內按鈕間距 | `Spacing/32` | |
| 垂直元件間距 | `Spacing/4` | |
| Toggle 按鈕文字 | `Label/S` | 現況 12px/w500，與此 token 完全吻合，零新增；文案「更多功能」／「收起功能」隨 State 切換 |
| 展開面板按鈕文字 | `Label/S` | 文案「傳送照片」／「約施工時間」 |
| Send 按鈕 icon 尺寸 | `24` | 現況硬編碼 22px，就近取整收斂 |

## 使用規則

**用於：**
- 聊天室頁面底部，四種角色情境共用（`to_client`／`to_master`／`to_admin`／`from_admin`）

**避免：**
- 非聊天室頁面的一般表單輸入——改用 [TextField](text-field.md)

## 邊界情況

- 文字輸入隨內容增高，最多 5 行，超過捲動（不再增高）

## Flutter Widget

| Flutter Class | 對應角色 |
|--------------|---------|
| `ChatroomInputBar`（`chatroom_input_Bar.dart`） | 現況單一 class，4 個角色頁面共用同一實作，功能顯示（照片/日期）由 callback 是否為 null 控制，非明確 variant 切換 |

組成子元件：[Sticky Footer](sticky-footer.md)（容器）、[IconButton](icon-button.md)（送出鈕）、[IconLabelButton](icon-label-button.md)（展開切換鈕）；文字輸入框為聊天室專屬客製元素，貼近現況 codebase 原生 `TextField` 寫法特化，非共用 [TextField](text-field.md) 元件。需新建為共用 widget，整併現況 4 處各自實作。

## Figma 元件

**位置**：[TigerMaster-Design-System → Chatroom → ChatInputBar](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=918-3383)（Component Set，State × Content 共 4 個 variant

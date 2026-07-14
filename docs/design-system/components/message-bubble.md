# MessageBubble

聊天室中單則訊息的顯示容器，依訊息型態切換內容，並統一處理發話方對齊、頭像、時間戳、已讀狀態。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，`TextMessage`／`ImageMessage`／`FileMessage`／`DayMarkMessage`／`CallLogMessage`／`TimeRequestMessage` 六個訊息 class + `MessageBuilder`／`PendingMessageBuilder` 外殼比對 + `/sanji` 訪談_
_最後更新：2026-07-14_

---

## Variants

| 維度 | 值 |
|------|-----|
| Type（內容型態，分兩大類） | **內容型**（被動顯示）：`Text`（純文字，含 URL 自動連結）／`Image`（圖片附件，直接複用 [Image](image.md) 元件含其 Loading/Loaded/Error 三態）／`File`（檔案附件）／`DayMark`（日期分隔線，置中無發話方邏輯）／`CallLog`（通話記錄摘要）<br>**互動型**：`Slot`（彈性插槽，內容自由帶入——現況用於 TimeRequest 日期協調的接受/拒絕按鈕） |
| selfMessage（Boolean，`DayMark` 除外） | `true` = 自己發送（右側對齊）／`false` = 對方發送（左側對齊 + 顯示頭像） |
| Status（僅 `selfMessage=true` 時適用） | `Sending`（送出中）／`Sent`（已送達，單勾）／`Read`（已讀，文字標示）／`Failed`（失敗，叉號） |

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 泡泡圓角 | `Radius/8` | 現況實作 10px，歸類至最接近的既有尺度 |
| 泡泡 padding | `Spacing/12` | |
| 外殼 margin | `Spacing/16`（水平）／`Spacing/4`（垂直） | |
| 自方泡泡底色 | `Interactive/Brand`（`Brand/TigerYellow` `#FABF13`） | **設計債**：現況實作 `#FFC827`，與 token 定義色值不符，待修正 |
| 對方泡泡底色 | `Background/Surface`（`#FFFFFF`） | |
| 時間戳／狀態文字 | `Text/Hint`（`Neutral/600` `#727276`） | **設計債**：現況實作 `#B3ACA2`，待修正 |
| 連結文字色 | `Text/Link`（`Blue/500`） | 現況 `#007AFF`，建議統一 |
| 日期分隔文字 | `Text/Brand`（`Brand/TigerBlue`） | 現況 `#1F286F`，可直接對應 |
| 陰影 | `Elevation/Drop` | |
| 頭像 | 複用 [Avatar](avatar.md) 元件，`Size: 36` | 已涵蓋此尺寸，Figma Component 已建立 |
| 泡泡內文字（Text 內容／File 檔名／CallLog 文字／Slot 佔位文字） | `Body/M` | 現況 codebase 字級不一致（Text 14px／File 16px），規格統一收斂為 `Body/M`（16px／Regular／LH24），Flutter 整併時一併修正 |

## 使用規則

**用於：**
- 聊天室訊息串列，每則訊息獨立一則 MessageBubble

**避免：**
- 非聊天情境的一般文字容器（應使用 Card 或其他容器元件）

**連續同發話方訊息**：現況不摺疊，每則獨立顯示頭像與時間戳（記錄現況，非規格建議）

## 邊界情況

- **長文字** → 自動換行，泡泡寬度統一上限：Flutter 端為 75% viewport（現況外殼 `MessageBuilder` 寫死 70%，規格統一收斂為 75%，與 File 一致，Flutter 整併時一併修正）；Figma 端無法用比例，改用固定上限 **240px**
- **圖片** → 直接複用 [Image](image.md) 元件狀態機（Loading/Loaded/Error），不另立規則；唯一例外於其他 Type：**沒有泡泡外殼**（無背景色、無 padding、無陰影），只有圖片本身裁切圓角，圓角統一改用 `Radius/8`（現況 codebase 寫死 10px）
- **檔案** → 寬度固定，Flutter 端 75% viewport（與泡泡統一上限一致）、Figma 端固定 240px，檔名過長 → 自動換行（非截斷）
- **URL** → 文字中偵測到網址自動轉為可點擊底線連結
- **DayMark** → 置中顯示，無發話方對齊邏輯，不適用 Status/Avatar
- **Slot** → 尺寸撐滿泡泡容器寬度（與其他 Type 一致，Flutter 端最大 75% viewport、Figma 端固定 240px），高度由插入內容自身決定；padding 沿用泡泡標準 `Spacing/12`；底色/圓角/陰影不因 Slot 而改變，仍依 `selfMessage` 決定；插槽內部排版（如 TimeRequest 的接受/拒絕按鈕橫向排列）由呼叫端自行決定

## Flutter Widget

| Flutter Class | 對應 Variant | 現況說明 |
|--------------|-------------|------|
| `TextMessage` | Type=Text | |
| `ImageMessage` | Type=Image | |
| `FileMessage` | Type=File | |
| `DayMarkMessage` | Type=DayMark | |
| `CallLogMessage` | Type=CallLog | |
| `TimeRequestMessage` | Type=Slot | 接受/拒絕按鈕（receiver）或純文字（sender） |
| `MessageBuilder` / `PendingMessageBuilder` | 外殼（頭像/時間戳/Status） | |

目標整併為單一 `MessageBubble` widget，搭配 `MessageVariant` enum（內容型 5 種 + Slot 型），對齊現有 `enum_message_variant.dart` 的分類。現況為六個獨立 class + 兩個 builder，待整併。

## Figma 元件

**位置**：[TigerMaster-Design-System → Chatroom → MessageBubble](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=808-11)（`Self Message=true` 的 5 個變體內建 `_Message Status` 內部元件，`State`（Sending/Sent/Read/Failed）決定圖示或文字，已設為可各自切換的 exposed instance；不再是 Boolean+Text 佔位）

> Figma page 已比照 `Button` page 慣例，從單一元件頁改名為 `Chatroom`，同頁內以區塊方式容納聊天室系列元件。`MessageBubble` 是目前唯一備料完成的區塊；`ChatInputBar`／`ChatAppBar`／`ChatBackground` 已建立空白 Header+Content 區塊待後續備料。

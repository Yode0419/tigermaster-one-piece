# FAB（Floating Action Button）

浮動於畫面固定位置的主要行動按鈕，用於頁面上最重要、需隨時可觸及的單一行動。分為 `Default`（icon + label）與 `Slot`（預留自訂容器，尚無案例）兩種型態。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查 + Figma Component（TigerMaster-Design-System）比對_
_最後更新：2026-07-14 — 同步 Figma 元件：Content 維度改為 Type（Default／Slot），補上尺寸、圖示色、標籤色 token，新增 Slot 說明_

---

## Variants

| 維度 | 值 |
|------|-----|
| Type | `Default`（固定 icon+label 結構）／`Slot`（預留通用容器，內容不固定，目前無實際使用情境）|
| Position | `endFloat`（右下角）/ `centerDocked`（底部導覽列中央，屬於 Bottom Nav Bar 元件）|

> `centerDocked` 為 Bottom Nav Bar 元件的一部分，不在此規格範圍內。

## Design Tokens

### FAB 本體（Type = Default）

| 屬性 | Token | 備註 |
|------|-------|------|
| 背景色 | `Background/Surface` | 白色底，適合淺色頁面背景 |
| 形狀 | `Radius/Full` | 圓形 |
| 陰影 | `Elevation/Drop` | |
| 尺寸 | `78×78px` | Figma 與現況 Flutter 實作一致（非 Flutter FAB 元件預設的 56×56px） |
| 圖示尺寸 | `24px` | Figma 示意稿使用 Smiley 佔位圖示，僅供示意，非固定圖示 |
| 圖示色 | 依情境決定，參考 `Icon/*` token | |
| 標籤文字 | `Label/M` | 14px / 500 Medium |
| 標籤色 | `Text/Primary` | `#23242A` |

### Type = Slot（預留通用容器）

| 屬性 | Token | 備註 |
|------|-------|------|
| 容器尺寸 | `78×78px` | 與 Default 一致 |
| 圓角 / 陰影 | `Radius/Full` / `Elevation/Drop` | 套用於外層容器，內容本身不受限 |
| 佔位樣式 | 底色 `#FEE8F7` + 邊框 `#F65BC7` | 純 Figma 示意用佔位色，**非正式 design token**；實際內容與外觀由使用情境決定 |

### 引導 Tooltip（選用）

FAB 可搭配一次性引導 Tooltip，協助使用者在首次看見 FAB 時理解其用途。

| 屬性 | Token | 備註 |
|------|-------|------|
| 背景色 | `Status/Info` | |
| 文字色 | `Interactive/OnFilled` | |
| 文字樣式 | `Body/S` | |
| 圓角 | `Radius/4` | |
| 陰影 | `Elevation/Drop` | |

## 使用規則

**用於：**
- 頁面上最重要的單一行動，且需在任意捲動位置都能觸及
- 行動無法自然放入頁面主要內容區時

**避免：**
- 一般次要操作（改用 Button）
- 可放入頁面主要內容區的行動（改用 Button 或 IconButton）
- 同一頁面出現兩個以上的 FAB
- 每個頁面都放 FAB——使用門檻高，不是所有頁面都需要

**Type = Slot**：Figma 上預留的通用容器 variant，目前無實際使用情境，暫不建議用於正式畫面；待有具體需求（例如自訂圖形、複合內容）出現時再定義規則。

## 邊界情況

- **與 BottomSheet 共存**：FAB 外層需加 `padding: EdgeInsets.only(bottom: 64)` 以避免遮擋頁面底部操作區
- **引導 Tooltip 行為**（若使用）：建議進入頁面短暫延遲後出現，數秒後自動消失；每次進入頁面都觸發

## 目前實作案例

### CustomerServiceFab（客服聊天室入口）

- **出現頁面**：客戶端的訂單詳情頁、報價總覽頁
- **Type**：`Default`（headset 圖示 44×44 + 「聯繫客服」文字）
- **尺寸**：78×78px
- **動作**：導航至客服聊天室（`/to_admin_chatroom`）
- **Tooltip 文字**：「使用客服聊天室／解決您的問題」

## Flutter Widget

| Flutter Class | 說明 |
|--------------|------|
| `FloatingActionButton` | 底層 widget |
| `CustomerServiceFab` | 自訂 `StatefulWidget`，封裝圖示、標籤、Tooltip 動畫邏輯 |

**位置參數**：`FloatingActionButtonLocation.endFloat`

## Figma 元件

**位置**：[TigerMaster-Design-System → FAB](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=765-514)

---

## 待釐清事項（TBD）

- 無

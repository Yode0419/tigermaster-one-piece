# VoiceCallScreen

語音通話的全螢幕畫面，涵蓋撥出中與通話中兩個狀態。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，`IOSCallerControlPage`（`lib/page/voice_chat/ios_caller_control_page.dart`），由四種聊天室（`to_client_chatroom`、`to_master_chatroom`、`to_admin_chatroom`、`from_admin_chatroom`）開啟；由 figma-ssot 階段 3 管理員檔案的本機元件升級_
_最後更新：2026-10-05_

---

## Variants

| 屬性 | 類型 | 值 |
|------|------|-----|
| State | Variant | `Calling`（撥出中，姓名下方為聲波動畫）／`OnCall`（通話中，顯示「通話中」與通話時間） |
| Name | Text | 對方姓名 |
| Duration | Text | 通話時間，只有 `OnCall` 顯示 |

`Background Photo`（Image）與 `Avatar`（140）為外露 instance，可換成對方的照片。

## 結構與 Design Tokens

| 部位 | 做法 | 備註 |
|------|------|------|
| 底色 | `Base/Black` | 照片載入前的底色 |
| 背景 | 對方照片撐滿，疊 `Background/Overlay` 遮罩加背景模糊 25 | 程式為 `Colors.black54`（54%），近似對應 63% |
| 頭像 | Avatar 140 | 頭像到姓名 `Spacing/32`（程式 36） |
| 姓名 | `Heading/2`、`Text/Inverse` | 程式 28 Bold，近似對應 28 SemiBold |
| 撥出中動畫 | 5 條直條，`Icon/Inverse`、間距 `Spacing/2` | 靜態示意，實際為動畫 |
| 通話狀態 | 「通話中」＋時間，`Label/L`、`Text/Inverse` | |
| 結束通話鍵 | 圓形 `Status/Error`、`Radius/Full`、內距 `Spacing/16`，Phosphor `PhoneDisconnect`（Fill、`Icon/Inverse`），下方「結束通話」`Label/L` | 程式為 `Colors.red`（#F44336），近似對應 `Status/Error`（#FF2851）；鍵與文字間距 `Spacing/8` |
| 版面 | StatusBar（Light）、內容置中、HomeIndicator（Light）；姓名區與結束通話鍵之間留約 30% 螢幕高 | |

## 使用規則

**用於：**
- 任何角色從聊天室撥打語音電話後的畫面

**避免：**
- 對方忙線等提示，用 Dialog 疊在原聊天室上，不畫成本元件的狀態

## 邊界情況

- 姓名過長 → 置中換行，現況無截斷規則
- 對方沒有大頭照 → Avatar 切 Source=default，背景照片跟著換成預設圖

## Flutter Widget

| Flutter Class | 對應 Variant | 現況說明 |
|--------------|-------------|------|
| `IOSCallerControlPage` | `_buildCallingWidget` → Calling；`_buildOnCallWidget` → OnCall | 四種聊天室共用同一個頁面 |

## Figma 元件

**位置**：[TigerMaster-Design-System → Chatroom](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=1112-614)

---

## 待釐清事項（TBD）

- 無

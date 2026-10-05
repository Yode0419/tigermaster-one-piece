# PhotoViewer

全螢幕檢視單張照片的頁面級元件，用於點開照片查看，以及傳送照片前確認。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，`DetailImage`（`lib/component/image/tap_detail_image.dart`）與 `SendImageConfirm`（`lib/component/chatroom/send_image_confirm.dart`）；由 figma-ssot 階段 3 管理員檔案的本機元件升級_
_最後更新：2026-10-05_

---

## Variants

沒有 variant，只有以下元件屬性：

| 屬性 | 類型 | 預設 | 說明 |
|------|------|------|------|
| Has Download | Boolean | false | 右上下載鍵 |
| Has Send | Boolean | false | 右下傳送鍵 |
| Photo | 外露的 Image instance | Loaded | 可換照片，或切 Loading／Error |

## 結構與 Design Tokens

| 部位 | 做法 | 備註 |
|------|------|------|
| 底色 | `Base/Black` | 刻意使用原始色：語意 token 沒有純黑，`Background/Inverse`（#2A2A2A）上 AppBar 的 12% 遮罩會看出帶狀 |
| 照片 | Image，寬度填滿、維持比例、垂直置中 | |
| 頂部 | AppBar（Standard／None／Image），隱藏背景照片與標題，Has Action 關閉 | 疊在照片上，白色返回鍵 |
| 下載鍵 | IconButton（Ghost Inverse、md）＋ Phosphor `DownloadSimple`（Regular、`Icon/Inverse`） | 放在元件本身，位置對齊 AppBar 的 Action 區（距右 4、距頂 67），不放進 AppBar，才能做成元件開關 |
| 傳送鍵 | FAB（Type=Slot）＋ Phosphor `PaperPlaneRight`（Fill、`Brand/TigerBlue`） | 對應 Flutter `endFloat`：距右 `Spacing/16`、距 HomeIndicator `Spacing/16` |
| 底部 | HomeIndicator（Light） | |

## 使用規則

**用於：**
- 點開一張照片全螢幕查看（聊天室照片、帳號設定、訂單需求等）
- 選好照片後，確認要不要送出

**避免：**
- 列表或卡片裡的縮圖，用 Image

## 邊界情況

- 照片比例與畫面不同 → 寬度填滿、維持比例、垂直置中，其餘是黑底
- 縮放、拖曳是互動行為，不做 variant
- 下載成功或失敗的提示由程式另外跳出（現況為 EasyLoading），不畫進元件

## Flutter Widget

| Flutter Class | 對應屬性 | 現況說明 |
|--------------|---------|------|
| `DetailImage`（由 `TapDetailImage` 點擊開啟） | 有 `downloadUrl` 時 Has Download 開 | 三種角色的聊天室、帳號設定、訂單相關頁面共用 |
| `SendImageConfirm` | Has Send 開 | 聊天室傳送照片前確認 |

## Figma 元件

**位置**：[TigerMaster-Design-System → Image](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=1111-160)

---

## 待釐清事項（TBD）

- 下載結果提示之後是否改用 DS 的 Snackbar（屬程式向 DS 靠攏，不影響本元件）

# Dialog

置中疊加的阻斷式對話框，用於需要使用者立即決策才能繼續的高重要性情境。依內容豐富度分為 Standard（一般提示）與 Emphasis（重要事項強調）兩個 Type。

> **元件邊界**：與 BottomSheet（從螢幕底部滑出的容器，機制與適用情境不同）明確區分，詳見下方使用規則。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，`PlatformAlertDialog`（`lib/component/dialog/platform_alert_dialog.dart`）、`ImportantOrderActionDialog`（`lib/component/dialog/important_order_action_dialog.dart`）為代表案例，另比對 14 個其他 dialog class（`AtmDialog`、`ProMemberUpgradeSuccessDialog` 等）；Figma component 已建立_
_最後更新：2026-07-09_

---

## Variants

| 維度 | 值 |
|------|-----|
| Type | `Standard`（一般提示）／`Emphasis`（重要事項強調） |
| Title | 非獨立 variant 屬性；標題文字固定顯示，若特定情境不需要標題，於該 instance 手動隱藏處理 |
| Content | 彈性 slot（文字／圖片／資訊框／表單欄位皆可），不拆分為多個獨立 boolean variant |
| Actions | 數量不限、由呼叫端決定，原則上以「一主一次」為預設配置；`Standard` 水平排列、`Emphasis` 垂直堆疊；主要動作用較高強調度樣式（`ghost/action` 或 `primary filled`），次要動作統一用 `ghost/neutral`，複用 [Button](button.md) 元件 instance |

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 圓角 | `Radius/16` | 兩個 Type 統一 |
| 陰影 | `Elevation/Ambient` | |
| 卡片背景 | `Background/Surface` | |
| 背景遮罩 | `Background/Overlay` | 既有 token，本就用於 Modal／BottomSheet 遮罩，不新增 |
| 標題文字 | `Text/Primary` + `Title/M` | ⚠️ `Title/M` 定義為 500 字重，Flutter 現況（`ImportantOrderActionDialog` 等）硬寫 700，屬既有技術債，本次不調整 token 定義 |
| 內容文字 | `Text/Secondary` + `Body/M`（或 `Body/L`） | |
| 資訊框邊框 | `Border/Default` | |
| 外層 padding | `Spacing/16` | |
| 內層 padding | `Spacing/24` | |
| 寬度 | `Emphasis` = 螢幕寬度 − 2×`Spacing/16`；`Standard` = 固定 300px | `Standard` 不隨螢幕寬度縮放 |
| Actions 按鈕 | 複用 [Button](button.md) 既有 token 與 variant 定義 | 不新增 |

## 使用規則

**用於：**
- 需要使用者做決策才能繼續、中斷其餘操作直到回應
- `Standard`：單句是非題／簡短通知確認
- `Emphasis`：需搭配圖片、金額、訂單資訊等輔助內容才能充分理解情境後決策

**避免：**
- 選項為可挑選清單、或 3 個以上帶說明文字的動作 → 改用 BottomSheet
- 多步驟表單填寫、不會立即儲存的任務 → 規劃獨立頁面或 BottomSheet，不塞進 Dialog
- 非阻斷、非時效性的次要提示（如操作成功通知）→ 用 Snackbar
- 同時疊加兩個以上 Dialog
- 背景是否可點擊關閉不在本規格定義範圍，交由使用場景自行決定

## 邊界情況

- **標題過長** → 允許換行，不做省略
- **`Emphasis` content 過長** → 限制 max-height 並允許內部捲動；Figma 端僅需加上 max-height 約束，不特別強調視覺樣式
- **Content 含輸入框** → 鍵盤彈出時 Dialog 需上移避免遮擋輸入框；純行為規則，不寫入 Figma 視覺規格

## Flutter Widget

| Flutter Class | 對應 Type | 現況說明 |
|--------------|----------|------|
| `PlatformAlertDialog` | 貼近 `Standard` | 平台自適應（Android 用 `AlertDialog`、iOS 用 `CupertinoAlertDialog`），非設計系統版本樣式 |
| `ImportantOrderActionDialog` | 貼近 `Emphasis` | 白底圓角卡片、可帶圖片／資訊框、底部滿版按鈕 |
| 其餘 14 個 dialog class（`AtmDialog`、`ProMemberUpgradeSuccessDialog`、`ProAtmPendingDialog` 等） | 多數貼近 `Emphasis` | 共用 `Dialog()` + `showDialog()` 底層機制，視覺相近但各自寫死數值（borderRadius 15–20、insetPadding 16–20 不等），尚未整併，暫記錄現況，整併目標留待日後處理 |

## Figma 元件

**位置**：[TigerMaster-Design-System → Dialog](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=673-34)

---

## 待釐清事項（TBD）

- 無

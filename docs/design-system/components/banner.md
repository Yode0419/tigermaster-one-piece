# Banner

嵌入頁面版面內的持續性通知/提示訊息容器，用於系統通知、規則性警示、情境提示等非阻斷式訊息；與短暫浮動、自動消失的 [Snackbar](snackbar.md) 明確區分。

_來源：Flutter codebase（`fdtigermaster_app`）審查，`CloseableCard`（`lib/component/card/closeable_card.dart`，4 處呼叫）+ `NewVersionCard`（內嵌 CloseableCard）+ `unit_picker_bottom_sheet.dart` 自訂實作比對 + `/sanji` 訪談_
_最後更新：2026-07-14 — 使用者於 Figma 手動調整：Closable／Action 改為獨立於 variant grid 之外的 Boolean 元件屬性；Leading 從不限內容 Slot 改為 None／Icon／Slot 三選一 instance-swap variant；padding 修正為 `Spacing/12`_

---

## Variants

| 維度 | 值 | 說明 |
|------|-----|------|
| Tone | `Info` / `Notice` / `Error` | 語意分類，沿用 [Tag](tag.md) 已建立的 Tone 系統 |
| Solid（僅 `Notice` tone 適用） | `false`（預設，淡底色）／`true`（實色） | 對應現況高飽和黃色警示情境（費用不退、聯繫師傅） |
| Leading | `None` / `Icon` / `Slot`（三選一 instance-swap） | `Icon` 為語意圖示；`Slot` 為不限內容的插槽（可放品牌圖片等） |

**元件屬性（獨立於上方 variant grid，可與任何 Tone/Solid/Leading 組合搭配）：**

| 屬性 | 值 | 預設 | 說明 |
|------|-----|------|------|
| Closable | Boolean | `true` | 控制右上角關閉鈕（X）顯示與否 |
| Action | Boolean（屬性名 `hasAction`） | `false` | 控制是否顯示右側按鈕；按鈕本身可由呼叫端自行更換（instance-swap） |

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 圓角 | `Radius/4` | |
| Padding | `Spacing/12`（四邊統一） | |
| 內部元素間距（icon／文字／Action／關閉鈕） | `Spacing/12` | 統一間距，不分元素種類 |
| 文字樣式 | 預設 `Body/S`（14px/400，行高 22） + `Text/Primary`（`#23242A`） | 支援換行為多行，且可依需要混用不同文字樣式（例如標題行 Bold＋副標題行 `Text/Secondary`），對應 `NewVersionCard` 兩行文字排版；三個 Tone 底色不變色 |
| Info 底色 | `Status/InfoContainer`（`#EBF3FF`） | |
| Notice（淡）底色 | `Background/Notice`（`#FFF9E7`） | |
| Notice（實色）底色 | `Interactive/Brand`（`#FABF13`） | 沿用既有 token，現況 codebase 為 `#FFC827`，收斂至品牌黃 |
| Error 底色 | `Status/ErrorContainer`（`#FFE9ED`） | |
| 關閉鈕位置 | 固定右上角 | |
| Action 按鈕預設樣式 | 底色 `Interactive/Action`（`#3A89F8`）、`Radius/Full` 膠囊圓角、文字 `Interactive/OnFilled`（白） | 預設佔位樣式，可由呼叫端自行更換為其他按鈕 |

## 使用規則

**用於：**
- 系統通知（新版本升級提醒）
- 規則性警示（不談報價、派遣費不退）
- 情境提示（工項單位選擇建議）

**避免：**
- 短暫性、需自動消失的訊息（屬 [Snackbar](snackbar.md) 範疇）

## 邊界情況

- **長文字換行**：文字支援換行為多行，且可混用不同文字樣式（如標題＋副標題），對應 `NewVersionCard` 的兩行文字排版
- **Closable + Action 同時開啟**：內容區塊需容納 Leading + 文字（可能多行）+ Action 按鈕 + 關閉鈕
- **Leading = Slot 尺寸**：圖片（如品牌 Logo）與 `Icon` 選項尺寸不同，尺寸由放入的內容自身決定

## Flutter Widget

| Flutter Class | 對應 Variant | 現況說明 |
|--------------|-------------|------|
| `CloseableCard`（`lib/component/card/closeable_card.dart`） | Info（`new_version_card.dart:23`，藍 `#F0F3FD`）／Error（`to_client_chatroom.dart:154`「不談報價」警告，粉 `#FFE4E8`）／Notice-Solid（`order_confirm.dart:69`「派遣費不退」、`order_information.dart:114`「聯繫師傅」，黃 `#FFC827`） | 4 處呼叫，待整併；圓角現況 5dp 非既有 token |
| `NewVersionCard`（`lib/component/card/new_version_card.dart`） | Info + Closable=true + Action=true + Leading=Slot（App Logo 圖片） | 內嵌 `CloseableCard`，Action 按鈕（「更新」）對應 `hasAction`；標題（粗體）＋副標題（灰字）兩行文字對應文字換行＋混用樣式的處理方式 |
| `_unitSelectionWarning()`（`unit_picker_bottom_sheet.dart:53-87`） | Notice（淡）+ Closable=false + Leading=Icon | 淡黃底 `#FFF9E7` + 黃邊框 `#FFD048`（整併後邊框拿掉）+ 橘色 warning icon；圓角現況 8dp 符合既有 `Radius/8`，統一調整為 `Radius/4` |

## Figma 元件

**位置**：[TigerMaster-Design-System → Banner](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=750-20)

---

## 待釐清事項（TBD）

- 無

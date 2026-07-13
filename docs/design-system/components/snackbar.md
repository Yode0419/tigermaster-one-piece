# Snackbar

頁面底部浮動、短暫顯示的非阻斷式通知元件，用於操作結果回饋（儲存成功/失敗、複製成功等），不阻斷頁面互動、自動消失。

_來源：Flutter codebase（`fdtigermaster_app`）審查，`show_save_result_snack_bar.dart`（`showSaveResultSnackBar()` wrapper，11 處使用）+ 6 處 inline 直接呼叫 `SnackBar` 比對 + `/sanji` 訪談_
_最後更新：2026-07-13 — Figma Component 建置完成後同步微調：Action 文字改用 Label/S、Message／Action 改為 Text property、Figma 狀態更新_

---

## Variants

| 維度 | 值 | 說明 |
|------|-----|------|
| Tone | `Default` / `Success` / `Error` | 語意分類，決定 Icon 有無與顏色 |
| Icon | 跟 Tone 綁定，非獨立 Boolean | `Default`：無 icon；`Success`／`Error`：各自帶對應色彩 icon |
| Action | `有` / `無`（Boolean） | 最多一個按鈕，樣式為文字（非獨立 Button instance） |

**Icon 不獨立設 variant**：比照 [Tooltip](tooltip.md) 觸發圖示「顏色由父元件決定」的組合邏輯，Icon 存在與否、顏色皆由 Tone 決定，不另立 Boolean 屬性。

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 底色 | `Background/Inverse`（**新增語意 token**，對應 `Neutral/900` `#2A2A2A`） | 三個 Tone 共用同一底色，不隨語意變色 |
| 內文文字 | `Body/S`（14px/400） + `Interactive/OnFilled`（白） | 三個 Tone 共用不變色；現況 codebase 為 16px，依 [Tooltip](tooltip.md) 同類「輔助性、短暫顯示」邏輯下修一階 |
| Action 文字 | `Label/S`（12px/500 Medium） + `Interactive/OnFilled`（白） | Action 本身是可點擊互動元素，改用 `typography.md` 定義的 Label 系列（「互動元件的文字標籤」，與 Chip/Tag/Badge 同層級）；比內文 `Body/S`（14px）小一階，視覺上更協調 |
| Icon 顏色 | `Status/Success`（綠）／`Status/Error`（紅） | 既有 token，僅 Success／Error 使用 |
| Icon 尺寸 | `16px`（[Icon](icon.md) 元件「標籤內嵌、輔助說明圖示」尺寸） | |
| 圓角 | `Radius/8` | 比照 Button 標準元件圓角，非 Card 等級的 12/16 |
| Padding | `Spacing/16`（四邊統一） | 比照 [Sticky Footer](sticky-footer.md) 統一 padding 哲學 |
| Elevation | **不使用** | `elevation.md` 明文規定「深色背景不使用」elevation，Snackbar 為深底元件 |
| 顯示時間 | 純文字 2 秒／有 Action 4 秒 | 業界慣例：有 Action 時需拉長時間讓使用者反應，現況 2 秒為既有行為保留 |

**顏色對比度驗證**（WCAG）：
- `Status/Error`（`#FF2851`）於 `Background/Inverse`（`#2A2A2A`）上對比度約 3.86:1，未達文字要求的 4.5:1，**因此不作為文字顏色使用**，僅用於 Icon（圖形對比度門檻為 3:1，合格）
- `Status/Success`（`#1AA354`）於同底色對比度約 4.39:1，作為 Icon 顏色同樣合格

## 使用規則

**用於：**
- 操作結果的短暫回饋通知（儲存成功/失敗、複製成功等）

**避免：**
- 承載使用者必須看到／確認的關鍵資訊——比照 [Tooltip](tooltip.md) 同邏輯，自動消失特性不適合承載不能被錯過的內容，應改用 Dialog

**與 Sticky Footer 的位置關係：**
- 頁面同時存在 [Sticky Footer](sticky-footer.md) 時，Snackbar 底部偏移 = Sticky Footer 高度 + `Spacing/16`，浮在其上方、不重疊，避免蓋住頁面主要 CTA

## 邊界情況

- **長文字**：正常換行，不做省略號截斷；文案本身應保持精簡（文案撰寫規範，非元件字數上限限制）
- **同時觸發多則通知**：沿用現況行為——清除前一則、顯示最新一則，非佇列疊加顯示
- **Dismiss 機制**：自動逾時 + 滑動關閉（Flutter 原生手勢），不做額外的關閉按鈕（Close icon）——業界慣例 Snackbar 不需要手動關閉鈕，且與本元件「不使用 icon 做裝飾」的整體方向一致

## Flutter Widget

| Flutter Class | 對應 Variant | 現況說明 |
|--------------|-------------|------|
| `showSaveResultSnackBar()`（`show_save_result_snack_bar.dart`） | Default／Success／Error（經 `SaveResultType` enum 對應） | 11 處呼叫，待擴充支援 Icon／Action |
| 6 處 inline 直接呼叫 `SnackBar` | 分散於 `master_order_basic_info_card.dart`、`atm_dialog.dart`、`pro_member_upgrade_atm_dialog.dart`、`invoice_confirm_helper.dart` 等 | 待整併進統一元件 |

## Figma 元件

**位置**：[TigerMaster-Design-System → Snackbar](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=731-124)

---

## 待釐清事項（TBD）

- 無

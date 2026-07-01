# PasswordField

密碼輸入框，用於表單中需要使用者鍵入密碼的欄位。獨立於 [TextField](text-field.md) 之外的元件。

> **元件邊界**：此規格僅涵蓋密碼欄位本身。一般文字/多行輸入請見 [TextField](text-field.md)；密碼恆為單行、恆不顯示字數。獨立成元件（而非 TextField 的 variant）的原因：密碼特有的顯示/隱藏維度若做成 TextField 的 variant，Figma 的 variant 系統會強迫這個 property 出現在所有跟密碼無關的 TextField variant 上，造成面板混亂。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1，`obscure_text_form_field.dart`）審查_
_最後更新：2026-07-01_

---

## Variants

| 維度 | 值 |
|------|-----|
| 狀態 | default / disabled / readonly / focused / error |
| 內容顯示（`Content`） | Filled（使用者已輸入密碼）/ Empty（空欄位提示文字 Placeholder）——正式 VARIANT |
| 密碼顯示狀態（`Reveal`） | Hidden（圓點遮蔽）/ Shown（明碼顯示）——**僅套用於 `Content=Filled`**；`Content=Empty` 沒有實際密碼值可顯示，固定 `Reveal=Hidden` |
| Helper Text 顯示 | 顯示 / 隱藏——`Show Helper Text` BOOLEAN，預設 `true` |

**沒有的維度（相較 TextField）：**
- 沒有「行數」——密碼恆為單行
- 沒有「字數顯示器」——密碼欄位不提供字數顯示

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 背景色 | `Background/Surface` | 白底，與 TextField 一致 |
| 邊框色（default） | `Border/Subtle` | |
| 邊框色（focus） | `Border/Focus` | |
| 邊框色（error） | `Border/Error` | |
| Label / Helper Text | `Text/Hint`，Text Style `Body/XS` | |
| 密碼遮蔽文字（`Value Text`） | `Text/Primary`，Text Style `Body/M` | `Reveal=Hidden` 用，預設圓點 `••••••••` |
| 密碼明碼文字（`Revealed Text`） | `Text/Primary`，Text Style `Body/M` | `Reveal=Shown` 用，預設 `Password` |
| Placeholder 文字（`Placeholder Text`） | `Text/Hint`，Text Style `Body/M` | `Content=Empty` 用，預設 `Enter password` |
| Error 文字 | `Status/Error`，Text Style `Body/XS` | |
| 後綴 icon（眼睛） | `Icon/Subtle` | `Reveal=Hidden` 用閉眼圖示，`Reveal=Shown` 用睜眼圖示 |
| 圓角 | 無 | Flutter 底線樣式，不適用 Radius token |

## 使用規則

**用於：**
- 表單中需要使用者鍵入密碼的欄位（登入、註冊、修改密碼）

**避免：**
- 一般文字或多行輸入——改用 [TextField](text-field.md)
- 不需要顯示/隱藏切換的遮蔽輸入（如驗證碼）——視情境評估是否需要新元件，不應直接套用 PasswordField

## 邊界情況

- **後綴眼睛 icon 恆固定顯示**：與 TextField 的 `Show Suffix Icon` 開關做法不同，PasswordField 的眼睛 icon 沒有開關 property，直接固定可見；圖示本身也不是可換的 INSTANCE_SWAP property，而是每個 `Reveal` variant 各自內建對應的閉眼／睜眼圖示（`Reveal=Hidden` 用閉眼、`Reveal=Shown` 用睜眼）
- **`Value Text` / `Revealed Text` / `Placeholder Text` 三選一**：各自獨立的 property，`Reveal=Hidden` 時改 `Value Text`、`Reveal=Shown` 時改 `Revealed Text`、`Content=Empty` 時改 `Placeholder Text` 才有作用，三個欄位會同時出現在屬性面板上
- **`Reveal` 只影響 `Content=Filled`**：`Content=Empty`（尚未輸入）沒有實際密碼值，不需要「顯示/隱藏」的區別，固定用 `Reveal=Hidden` 呈現
- **Placeholder 顏色不可比 `Text/Hint` 更淡**：同 TextField 的 WCAG AA 對比度限制（`Text/Hint` `#727276` 對白底僅 4.79:1，已接近 4.5:1 下限）
- **Focused 狀態不顯示游標**：同 TextField，靜態 Figma 元件用邊框變化表達 focus，不畫動態游標圖示

## Flutter Widget

| Flutter Class | 對應 Variant |
|--------------|-------------|
| `ObscureTextFormField` | 全部 variant；內部用 `_isObscure` state 切換 `TextFormField.obscureText`，對應 Figma 的 `Reveal=Hidden`/`Reveal=Shown` |

實際 codebase 用 Flutter Material Icons `Icons.visibility`（睜眼，對應 `Reveal=Shown`）/`Icons.visibility_off`（閉眼，對應 `Reveal=Hidden`）；Figma 端眼睛圖示已放入 `Icon` 元件的 `Phosphor` variant 內。

## Figma 元件

**位置**：[TigerMaster-Design-System → PasswordField](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=302-1391)

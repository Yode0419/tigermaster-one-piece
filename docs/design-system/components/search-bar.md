# SearchBar

頁面內嵌的搜尋輸入框，讓使用者鍵入關鍵字進行即時搜尋或自動完成建議。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，`SearchWorkingCategories`（`lib/page/client_mode/service_scope/search_working_categories.dart`）、`AddressSelectBottomSheet`（`lib/component/bottom_sheet/address_select_bottom_sheet.dart`）兩處現況比對_
_最後更新：2026-07-16_

---

## Variants

| 維度 | 值 |
|------|-----|
| Type | Boxed（圓角容器）／Lined（底線大字級） |
| Content | Empty（顯示 Placeholder）／Filled（顯示使用者輸入值，尾端出現清除按鈕） |

> 不含互動 State（如 focused/disabled）：SearchBar 是純輸入容器，聚焦視覺由外層元件（AppBar／BottomSheet）處理。清除按鈕僅在 `Content=Filled` 時出現，非獨立開關——比照 TextField 的「內容顯示」維度命名。

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 背景色 | `Background/Surface` | 兩個 Type 共用 |
| Boxed 圓角 | `Radius/4` | 現況硬編碼 5px，比照 Button/Card 慣例收斂 |
| Boxed 邊框 | 無 | |
| Boxed 輸入文字（Filled） | `Text/Primary`，Text Style `Body/M` | 現況 14px |
| Boxed Placeholder（Empty） | `Text/Hint`，Text Style `Body/M` | |
| Boxed 搜尋圖示 | `Icon/Brand`（`#FABF13`） | 現況金色 `rgba(250,191,19,1)` 與此 token 完全吻合 |
| Lined 邊框 | `Border/Subtle`（default） | 沿用 TextField 底線邏輯 |
| Lined 輸入文字（Filled） | `Text/Primary`，Text Style `Body/L` | 現況 24px |
| Lined Placeholder（Empty） | `Text/Hint`，Text Style `Body/L` | |
| Lined 搜尋圖示 | `Icon/Subtle` | 現況黑色，與此 token 吻合 |
| 清除按鈕 icon（兩個 Type 共用） | `Icon/Subtle` | 僅 `Content=Filled` 顯示，點擊後清空輸入值並回到 `Content=Empty` |

## 使用規則

**用於：**
- 頁面內嵌即時搜尋（Boxed），如服務項目搜尋
- BottomSheet／Modal 內的搜尋輸入（Lined），如地址自動完成

**避免：**
- 一般表單文字輸入——改用 [TextField](text-field.md)
- 密碼輸入——改用 [PasswordField](password-field.md)

## 邊界情況

- Placeholder 文字長度差異大（Boxed「搜尋欲修繕的設備、問題或場所」9 字 vs Lined「輸入地址」2 字），不需換行處理，維持單行截斷
- 清除按鈕點擊後 `Content` 由 `Filled` 變回 `Empty`，同時觸發清空輸入值（是否連動重新觸發搜尋，由呼叫頁面自行決定，非元件本身行為）

## Flutter Widget

| Flutter Class | 對應 Variant |
|--------------|-------------|
| 原生 `TextField`（`search_working_categories.dart:74`） | Boxed |
| 原生 `TextFormField`（`address_select_bottom_sheet.dart:105`） | Lined |

> ⚠ 兩處皆直接呼叫原生元件，無共用 widget，現況各自實作。清除按鈕為本次規格新增，現況兩處實作皆未內建，屬設計新增項目（非現況缺陷）。

## Figma 元件

**位置**：[TigerMaster-Design-System → SearchBar](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=896-44)（Component Set，`Type`（Boxed/Lined）× `Content`（Empty/Filled）共 4 種變體，搜尋圖示為 Phosphor `MagnifyingGlass`、清除按鈕為 Phosphor `X`，皆透過 Icon 元件的 instance-swap 帶入）

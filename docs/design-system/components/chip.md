# Chip

少量選項（目前皆為 2-3 個）的單選切換元件，用於表單內的分類/決策選擇。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，`InvoiceCategoryPicker`（`lib/component/switch/invoice_category_picker.dart`）、`WorkingDateTypeSwitch`（`lib/component/switch/working_date_type_switch.dart`）、`ChoiceChip` 用例（`lib/component/bottom_sheet/unit_picker_bottom_sheet.dart`）三處現況比對_
_最後更新：2026-07-06_

---

## Variants

Chip 由三個獨立的 VARIANT 屬性交叉組成：

| 屬性 | 值 |
|------|-----|
| Tone | `Brand`（黃）／`Info`（藍） |
| Selected | false / true |
| Disabled | false / true |

另有 Boolean 元件屬性 `hasIcon`（預設 `true`），控制前綴 icon 是否顯示，透過 instance-swap 屬性置換實際圖示。

不做多尺寸，僅單一尺寸，高度採 hug（依 padding + 文字自然撐開），刻意不放大以避免與 Button 混淆。

**Tone 的使用時機是語意差異，不是視覺喜好**：
- `Brand`：使用者主動選擇且結果會直接影響後續流程或金額的關鍵決策（發票類型、叫修模式）
- `Info`：描述性、低業務重量的分類型選擇，選哪個都只是屬性標記，不影響核心流程（單位選擇）

## Design Tokens

### 共用（兩種 Tone 皆適用）

| 屬性 | Token | 備註 |
|------|-------|------|
| 圓角 | `Radius/Full` | 現況 codebase 為 30px／100px，皆已是視覺上的完全圓角 |
| 內距 | `Spacing/8` | 均勻 padding |
| Chip 相鄰間距 | `Spacing/12` | 同一組 Chip 之間的水平間距 |
| 文字字級 | `Label/M`（14px） | 現況 codebase 為 16px／20px，屬既有設計債，詳見「Flutter Widget」 |
| Disabled | 整體 `opacity: 40%` | 與 Button/Checkbox 一致，不使用獨立色票 |

### Brand tone

| 屬性 | Token | 備註 |
|------|-------|------|
| 選中底色 | `Interactive/Brand` | `#FABF13` |
| 選中文字 | `Interactive/OnBrand` | `#23242A`，專為疊在 `Interactive/Brand` 底色上的文字定義 |
| 未選中底色 | `Background/Page` | `#F5F5F5` |
| 未選中文字 | `Text/Hint` | `#727276` |
| 邊框 | 恆為 transparent | 選中與未選中皆無邊框 |

### Info tone

| 屬性 | Token | 備註 |
|------|-------|------|
| 選中底色 | `Chip/InfoSelected` | **元件專屬 token**（非全域 Semantic token），對應 Primitive `Blue/200`（`#BFDAFF`）。僅 Chip 使用，不建議其他元件比照套用 |
| 選中文字／邊框 | `Interactive/Primary` | `#1F286F`，文字與邊框同色 |
| 未選中底色 | `Status/InfoContainer` | `#EBF3FF` |
| 未選中文字 | `Interactive/Primary` | `#1F286F`，與選中文字同色 |
| 邊框 | 選中時 `Interactive/Primary`；未選中 transparent | |

> **設計系統備註**：`Chip/InfoSelected` 是這個設計系統第一次出現「元件專屬 token」（第三層，僅限單一元件引用，區別於 Primitive/Semantic 兩層架構）。原因是 `Blue/200` 只在 Chip Info tone 選中態使用，硬塞進 Interactive 或 Status 群組會造成語意混淆。建議 `colors.md` 之後補充這個第三層級的正式說明。

## 使用規則

**用於：**
- 少量選項（目前皆為 2-3 個）的單選切換
- 不限制選項數量上限，保持彈性，待後續實際情境累積更多再收斂

**避免：**
- 多選情境（目前無多選 Chip 使用案例）

**文案規則：**
- Chip 文字須簡短，元件本身不處理長文字或 overflow

## 邊界情況

- 長文字：不適用，由文案規則保證簡短，不做自動換行或省略號截斷
- Disabled：不可點擊，套用整體 `opacity: 40%`，兩種 Tone 皆同套用

## Flutter Widget

| Flutter Class | 對應 Variant | 現況 |
|--------------|-------------|------|
| `InvoiceCategoryPicker`（`lib/component/switch/invoice_category_picker.dart`） | Brand tone，無 icon | 手刻 `OutlinedButton`，待遷移至統一元件 |
| `WorkingDateTypeSwitch`（`lib/component/switch/working_date_type_switch.dart`） | Brand tone，有 icon | 手刻 `OutlinedButton`，與上者邏輯幾乎一致，待遷移至統一元件 |
| `ChoiceChip` 用例（`lib/component/bottom_sheet/unit_picker_bottom_sheet.dart`） | Info tone | 直接使用 Flutter 內建 `ChoiceChip`，現況為藍色系但色值未對應 `Chip/InfoSelected`，待遷移至統一元件並改色 |

**技術債**：
- 三處現況為各自獨立實作（兩處手刻 `OutlinedButton`、一處直接用 Flutter 內建 `ChoiceChip`），無共用 widget，需整併為一個統一的 Chip 元件（暫名 `Chip`）
- 文字字級現況 16px／20px，需對齊 `Label/M`（14px）
- Brand tone 選中文字現況 hardcode `Colors.black`，需改用 `Interactive/OnBrand`
- Info tone 選中底色現況 hardcode `Color.fromRGBO`，需改用 `Chip/InfoSelected` token

## Figma 元件

**位置**：[TigerMaster-Design-System → Chip](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=530-2520)

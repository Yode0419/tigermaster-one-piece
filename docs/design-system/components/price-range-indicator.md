# PriceRangeIndicator

顯示一個服務的價格區間，標出件數最多的價位，並說明常見價格。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，`PriceRange`（`lib/component/service/price_range.dart`）與 `PriceRangeIndicator`（`lib/component/service/price_range_indicator.dart`）；由 figma-ssot 階段 3 師傅檔案的本機元件升級_
_最後更新：2026-10-06_

---

## Variants

| 屬性 | 類型 | 值／預設 | 說明 |
|------|------|------|------|
| Position | Variant | Low／Mid／High | 「件數最多」標籤的位置 |
| Min Price、Max Price | Text | $Min、$Max | 漸層條兩端的最低價、最高價 |
| Summary | Text | Summary | 常見價格那一行，例如「常見價格落於$3,500-25,000之間」 |
| Description | Text | Description | 價格說明文字 |
| Has Description | Boolean | true | 說明文字，對應程式 `showDescription`（預設 true） |

「件數最多」是程式寫死的固定文字，不做成屬性。

## 結構與 Design Tokens

| 部位 | 做法 | 備註 |
|------|------|------|
| 整體 | 由上而下：指示條、常見價格、說明，間距 `Spacing/12` | 寬度隨外層填滿 |
| 件數最多標籤 | 72×28，`PriceGradient/Deep` 底、`Radius/4`、`Body/S`＋`Text/Inverse`，下方 12×6 向下尖角 | 尖角無外框 |
| 標籤位置 | Low／Mid／High 左距 31／129／226 | 程式依 `(常見價－最低價)/(最高價－最低價＋1)` 計算比例，Figma 取三個代表位置 |
| 漸層條 | 高 8、`Radius/Full`，`PriceGradient/Light` → `PriceGradient/Deep` → `PriceGradient/Light`，最深處與標籤位置一致（0.12／0.5／0.88） | 指示條內各段間距 `Spacing/8` |
| 最低價、最高價 | `Label/M`＋`Blue/500`，左右內縮 `Spacing/12`、兩端對齊 | |
| 常見價格 | `Label/M`＋`Text/Primary`，置中 | 程式為 14 Bold |
| 說明 | `Body/S`＋`Text/Hint`，靠左 | |

**顏色刻意綁原始色**：漸層與標籤用 `PriceGradient/Light`（#40AEFE）、`PriceGradient/Deep`（#3449FF），這兩個原始色僅限本元件使用；價格文字用 `Blue/500`（#3A89F8）。語意 token 中值相同的 `Text/Link`、`Status/Info` 用途不符（價格不是連結也不是資訊提示），所以不綁語意 token。三個顏色都與程式完全一致。

## 使用規則

**用於：**
- 服務或案件需求中說明價格區間（客戶端服務詳情、師傅案件需求）

**避免：**
- 報價明細或訂單金額，那是確定的金額，不是區間

## 邊界情況

- 常見價格接近最低價或最高價時，選最接近的 Position
- 說明文字可能多行，自動換行
- 師傅案件需求頁程式設 `showDescription: false`，使用時關閉 Has Description

## Flutter Widget

| Flutter Class | 對應屬性 | 現況說明 |
|--------------|---------|------|
| `PriceRange` | 整個元件；`showDescription` → Has Description | 客戶端服務詳情（`working_category_detail.dart`，顯示說明）、師傅案件需求（`order_requirement_section.dart`，不顯示說明） |
| `PriceRangeIndicator` | 指示條部分（Indicator 圖層） | 由 `PriceRange` 呼叫，標籤用 `BottomArrowPath` 裁出尖角 |

## Figma 元件

**位置**：[TigerMaster-Design-System → Service](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=1133-117)

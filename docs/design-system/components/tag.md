# Tag

靜態顯示用的小型標籤元件，用於標示金額、時效、分類、評分等描述性資訊；不具互動狀態，與可互動的 [Chip](chip.md) 明確區分。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，`PillText`（`lib/component/text/pill_text.dart`）+ 9 處實際使用情境比對，另比對 `order_detail_info_section.dart` 獨立實作_
_最後更新：2026-07-06_

---

## Variants

Tag 由 Tone、Solid、Size 三個變體屬性組成：

| 屬性 | 值 |
|------|-----|
| Tone | `Info`（藍）／`Emphasis`（紅）／`Notice`（米黃）／`Success`（綠）|
| Solid（僅 `Emphasis` tone 適用） | `false`（預設，淡底色）／`true`（實色反白）|
| Size | `Default`／`Compact` |

不做互動狀態（無 disabled/hover），純顯示用途。

**Tone 的使用時機是語意差異，不是視覺喜好**：
- `Info`：描述性、低業務重量的數值標記（報價金額、預估工期、技能分類、評分）
- `Emphasis`：金額相關的強調提示，非錯誤語意（師傅收入、時間加成金額）。`Solid=false` 為預設的淡底色樣式；`Solid=true` 為更強烈的實色反白樣式，用於需要更高視覺優先度的情境
- `Notice`：提示性資訊，非強制警示（保固天數）
- `Success`：正向／完成狀態標記（目前 codebase 無實例，為預期未來場景保留）

## Design Tokens

### 共用（所有 Tone 皆適用）

| 屬性 | Token | 備註 |
|------|-------|------|
| 圓角 | `Radius/Full` | 現況 codebase 為完全圓形（50px），已同步修正 [radius.md](../tokens/radius.md) 原誤寫為 `Radius/4` 的描述 |
| Default 字級 | `Label/M`（14px） | 現況 codebase hardcode 14px，未套用 text style，屬設計債 |
| Default padding（橫／縱） | `Spacing/12`／`Spacing/4` | |
| Compact 字級 | `Label/S`（12px） | 與 Default 拉開字級差異，強化兩個 Size 的視覺區別；現況 codebase hardcode，未套用 text style |
| Compact padding（橫／縱） | `Spacing/8`／`Spacing/4` | 用於技能標籤、評分標籤等密集排列情境 |

### Info tone

| 屬性 | Token | 備註 |
|------|-------|------|
| 底色 | `Status/InfoContainer` | `#EBF3FF` |
| 文字 | `Text/Brand` | `#1F286F` |

### Emphasis tone

| 屬性 | Token | 備註 |
|------|-------|------|
| 底色（Solid=false，預設） | `Status/ErrorContainer` | `#FFE9ED`（原 `Red/150` 調整為 `Red/100`，2026-07-06 同步修正 [semantic-colors.md](../tokens/semantic-colors.md)）|
| 文字（Solid=false） | `Status/Error` | `#FF2851` |
| 底色（Solid=true） | `Status/Error` | `#FF2851` |
| 文字（Solid=true） | `Interactive/OnFilled` | `#FFFFFF` |

> **設計系統備註**：`semantic-colors.md` 原標註「`Status/Error` 誤用」（師傅收入金額借用錯誤色做視覺強調），此規格建立 Emphasis tone 後已將該筆設計債標記為解決。

### Notice tone

| 屬性 | Token | 備註 |
|------|-------|------|
| 底色 | `Background/Notice` | `#FFF9E7`（原為觀察候選 token，因本次出現第二個使用場景，已於 [semantic-colors.md](../tokens/semantic-colors.md) 升級為正式 token）|
| 文字 | `Text/Primary` | `#23242A`；現況 codebase hardcode `#233677`，屬設計債，見「Flutter Widget」|

### Success tone

| 屬性 | Token | 備註 |
|------|-------|------|
| 底色 | `Status/SuccessContainer` | `#EDFFF4`；此為該 token 首次啟用場景 |
| 文字 | `Status/Success` | `#1AA354`（原 `Green/500` `#2ECC71` 對比不足，已同步調整為 `Green/600`）|

## 使用規則

**用於：**
- 靜態顯示的描述性標記：報價金額、預估工期、技能分類、評分、保固天數、金額強調（師傅收入、時間加成）

**避免：**
- 可互動的選擇情境（屬於 [Chip](chip.md) 範疇）
- 需要 icon + 複合資訊的專用徽章情境（如保固盾牌徽章，屬 Badge 範疇，非 Tag）

## 邊界情況

- 長文字：無自動換行／截斷機制，文案需簡短
- 內容可為純文字，或 Row（label + 動態數值），元件不控制內部子項排版

## Flutter Widget

| Flutter 現況實作 | 對應 Variant | 現況說明 |
|--------------|-------------|------|
| `PillText`「師傅收入」 | Emphasis, Solid=true | |
| `order_detail_info_section.dart`「時間加成金額」 | Emphasis, Solid=false | |
| `PillText`「報價金額」「預估工期」「技能標籤」「評分★」 | Info | |
| `PillText`「保固天數」「師傅資訊」 | Notice | 文字色現況 hardcode `#233677`，待改為 `Interactive/Primary` `#1F286F` |

**技術債**：
- 現況為多處獨立實作（`PillText` 多處呼叫、`order_detail_info_section.dart` 另有一處獨立手刻 Container），各自 hardcode `backgroundColor`／文字顏色，無 tone/size 參數化，需整併為統一元件並改造為 Tone × Solid × Size 參數
- `master_detail_header.dart:55` 有一淺灰底評分相關 tag（`RGB 238,238,238`），與同檔案內另一評分 tag（Info tone 藍色）語意重疊卻視覺不同，判定為手誤造成的不一致，建議統一為 Info tone，不建立為正式 tone
- 保固天數另有獨立元件 `WarrantyDayBadge`（金色 + 盾牌 icon + 深藍文字）並存，判定屬 Badge 元件範疇，非本次 Tag 範圍

## Figma 元件

**位置**：[TigerMaster-Design-System → Tag](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=558-26)

---

## 待釐清事項（TBD）

- 無

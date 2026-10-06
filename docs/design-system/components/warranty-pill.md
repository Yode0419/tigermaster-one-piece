# WarrantyPill

顯示服務的保固天數（一般住家、營業用），可附保固說明。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，`WarrantyDate`（`lib/component/service/warranty_date.dart`）；由 figma-ssot 階段 3 師傅檔案的本機元件升級_
_最後更新：2026-10-06_

---

## Variants

沒有 variant，只有以下元件屬性：

| 屬性 | 類型 | 預設 | 說明 |
|------|------|------|------|
| Residential | Text | Residential | 一般住家保固，例如「一般住家31天」 |
| Commercial | Text | Commercial | 營業用保固，例如「營業用7天」 |
| Description | Text | Description | 保固說明文字 |
| Has Description | Boolean | true | 說明文字，對應程式 `showDescription`（預設 true） |

## 結構與 Design Tokens

| 部位 | 做法 | 備註 |
|------|------|------|
| 膠囊 | `Background/Page` 底、`Radius/Full`，上下 `Spacing/8` | 程式底色 #EEEEEE，近似對應記在 figma-ssot 階段 3 的 reference.md |
| 左右兩半 | 等寬、內容置中，圖示與文字間距 `Spacing/8` | |
| 圖示 | 20 的 Phosphor `House`、`Buildings`（Fill、`Icon/Default`） | 對應程式 `Icons.home`、`Icons.business` |
| 天數文字 | `Label/M`＋`Text/Primary` | 與程式 14 Medium 一致 |
| 說明 | `Body/S`＋`Text/Hint`，靠左，與膠囊間距 `Spacing/16` | |

## 使用規則

**用於：**
- 服務或案件需求中說明保固（客戶端服務詳情、客戶端保固訂單卡、師傅案件需求）

**避免：**
- 貼在卡片或圖片角落的單一保固天數，用 [CornerBadge](corner-badge.md)

## 邊界情況

- 說明文字可能多行，自動換行
- 程式載入中顯示骨架樣式 `WarrantyDateLoading`，不做 variant

## Flutter Widget

| Flutter Class | 對應屬性 | 現況說明 |
|--------------|---------|------|
| `WarrantyDate` | 整個元件；`showDescription` → Has Description | 客戶端服務詳情（`working_category_detail.dart`）、客戶端保固訂單卡（`client_warranty_order_card.dart`）、師傅案件需求（`order_requirement_section.dart`），三處都顯示說明 |

## Figma 元件

**位置**：[TigerMaster-Design-System → Service](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=1134-160)

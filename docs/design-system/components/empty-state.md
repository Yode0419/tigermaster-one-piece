# EmptyState

清單或頁面沒有資料（或沒有結果）時，說明原因與下一步。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，師傅首頁（`master_home_page.dart`）、師傅收入頁（`master_income_page.dart`）、客戶端媒合失敗頁（`order_detail_match_fail_page.dart`）三處；由 figma-ssot 階段 3 師傅檔案的本機元件 `MasterHomeEmptyState` 改做成通用元件_
_最後更新：2026-10-06_

---

## Variants

| 屬性 | 類型 | 值／預設 | 說明 |
|------|------|------|------|
| Size | Variant | Compact／Page | Compact 用於清單區，Page 用於整頁結果 |
| Title | Text | Title | 標題，可換行 |
| Description | Text | Description | 說明文字 |
| Has Illustration | Boolean | true | 插圖 |
| Has Description | Boolean | true | 說明文字 |
| Has Action | Boolean | true | 按鈕 |
| Illustration | Slot | 粉紅 `Slot Rectangle` 佔位 | 刪掉佔位後放入任何插圖 |
| Action | 外露的 Button instance | Secondary Filled、pill、md | 可改文字 |

排列順序固定為插圖、標題、說明、按鈕，全部水平置中。

## 結構與 Design Tokens

| 部位 | Compact | Page |
|------|------|------|
| 內距 | 上 `Spacing/16`、左右 `Spacing/12`、下 0 | 上下 `Spacing/32`、左右 `Spacing/16` |
| 元素間距 | `Spacing/8` | `Spacing/32` |
| 插圖佔位 | 60×60 | 200×200 |
| 標題 | `Label/S`＋`Text/Hint` | `Heading/2`＋`Text/Primary` |
| 說明 | `Label/S`＋`Text/Hint` | `Label/M`＋`Text/Primary` |

- 插圖是 Slot（比照 Card 的做法），內含粉紅 `Slot Rectangle` 佔位；刪掉佔位後，從 DS 的 Illustration 頁複製插圖貼進來，Slot 會依插圖大小撐開。Illustration 頁的插圖目前是一般 Frame 不是元件，所以不做成下拉替換
- 寬度隨外層填滿，說明文字自動換行

## 使用規則

**用於：**
- 清單區沒有資料（適合案件、進行中案件、收入明細）→ Compact
- 整頁的無結果狀態（媒合失敗）→ Page

**避免：**
- 載入失敗或網路錯誤，那是錯誤狀態，不是空狀態
- 頁面底部的主要行動（例如媒合失敗頁的「取消媒合」「再次搜尋」）不放進元件，照頁面的底部按鈕區畫

## 邊界情況

- 只有一句話時關閉 Has Description；不需要插圖時關閉 Has Illustration（收入頁）
- 標題需要分行時直接在文字裡換行（媒合失敗頁「Oops！」與下一句分兩行）

## Flutter Widget

| 位置 | 對應設定 | 現況說明 |
|------|---------|------|
| 師傅首頁（適合案件、進行中案件） | Compact，有插圖與說明 | 各自用 `Column` 排，插圖 60 高 |
| 師傅收入頁「尚無已完成案件」 | Compact，關閉插圖與說明，Has Action「前往接案」 | 標題程式為 14 Regular，統一為 `Label/S`；按鈕程式為 `PillButton` |
| 客戶端媒合失敗頁 | Page | 程式標題在插圖上方，Figma 統一為插圖在上 |

目前沒有共用的 Flutter widget，建議之後整併為一個 `EmptyState` widget。

## Figma 元件

**位置**：[TigerMaster-Design-System → EmptyState](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=1129-782)

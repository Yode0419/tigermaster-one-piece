# SegmentedControl

用於整面頁面內容的切換（如「進行中訂單/已完成訂單」兩個完全不同的清單內容互換）。功能上等同於 Tab——切換後是整頁內容替換，而非同一內容的篩選——只是視覺呈現採用 Segmented Control 樣式（膠囊容器＋填色指示），而非傳統底線式 Tab。使用此元件前應確認情境是「切換整頁內容」，而非篩選同一份清單。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，`TwoTabPreferredSizeTabBar`（`lib/component/tab_bar/two_tab_preferred_size_tab_bar.dart`，用於 4 處頁面，皆搭配 `TabController`/`TabBarView` 做整頁內容切換）+ 截圖核對（「開始報價」頁「簡易報價單/標準報價單」）_
_最後更新：2026-07-03 — 建立 Figma Component（2/3 段 variant、Label 1-3 文字屬性）；補充「功能上等同 Tab」的使用情境說明；新增分段水平 padding token_

---

## Variants

| 屬性 | 值 |
|------|-----|
| 分段數 | 2 段 / 3 段 |
| Selected | 每個分段獨立呈現選中／未選中視覺 |
| 分段文字 | 每個分段各自帶入的自訂文字內容（非固定選項） |

不含 disabled、error 狀態——SegmentedControl 用於即時切換檢視，無「必選但未選擇」或「權限停用」的驗證情境，與 Checkbox/Radio 不同。

分段文字為 Text property，Figma 端每個分段各自建立獨立可編輯的文字圖層，對應 Flutter 端 `firstTab`／`secondTab`（未來擴充為 `List<String> tabs`）參數。

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 外層容器背景 | `Background/Surface` | 白色 |
| 選中分段填色 | `Interactive/Primary` | `#1F286F`，與 codebase 實際色值精確相符 |
| 選中分段文字 | `Interactive/OnFilled` | 白色 |
| 未選中分段文字 | `Interactive/Primary` | 當作前景色使用，符合既有 token 語意定義（filled 時作底色、其餘情境作前景色） |
| 外層圓角 | `Radius/8` | 現況 codebase 為 7px，歸入最接近 token |
| 選中指示圓角 | `Radius/4` | 現況 codebase 為 5px，歸入最接近 token |
| 外邊距 | `Spacing/8` | 現況 codebase 為 10px，歸入最接近 token |
| 外層容器 padding | `Spacing/2` | |
| 分段水平 padding | `Spacing/16` | |
| 分段垂直 padding | `Spacing/8` | |
| 文字字級 | `Label/M` | |

## 使用規則

**用於：**
- 切換 2–3 個完全獨立的頁面內容（如「進行中訂單/已完成訂單」），選中即整面替換下方內容，等同 `TabController` + `TabBarView` 的用法
- 沒有禁用或錯誤提示需求的情境

**避免：**
- 篩選同一份清單內容（如依狀態篩選但清單結構不變）——應改用 Chip 或 Filter
- 超過 3 段——畫面會過擠，應改用 Tab 列表或下拉選單
- 分段文字過長——文案需精簡，元件本身不處理換行或截斷

**放置建議：**
- 建議放在 AppBar.bottom：配色（白底容器＋深藍選中填色）設計上依賴 AppBar 底色做出對比，目前 4 處實際用法都嵌在 AppBar 底部
- 若用於頁面內容區，需額外確保背景對比（如加邊框或陰影），否則白色容器會融入頁面淺色底色

## 邊界情況

- 長文字：不做自動換行、不做省略號截斷，仰賴文案規範保持短文字
- 分段數上限為 3 段，無法再多

## Flutter Widget

| Flutter Class | 對應 Variant |
|--------------|-------------|
| `TwoTabPreferredSizeTabBar` | 分段數＝2（現況，需搭配 `TabController`／`TabBarView` 使用） |

**技術債**：現況寫死 `firstTab`／`secondTab` 兩個字串參數，未支援 3 段；顏色、圓角、間距為 hardcoded 值，與本文件 token 有落差，待後續對齊。

## Figma 元件

**位置**：[TigerMaster-Design-System → SegmentedControl](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=479-1715)

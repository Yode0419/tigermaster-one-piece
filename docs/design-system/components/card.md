# Card

通用容器底座，作為頁面中的分區元件，透過單一彈性 slot 承接任意內容，統一內距與陰影規則，取代目前 7+ 處各自為政的卡片實作（`L2Card`、`L3Card`、`ClientOnGoingOrderCard`、`MasterOnGoingOrderCard`、`MasterSuitableOrderCard`、`MasterInProgressOrderCard`、`ProMemberFaqCard` 等）。

## Variants

| 維度 | 值 |
|------|-----|
| Layout | Fill（滿版融入頁面）／ Inset（圓角，強調獨立性）|
| Padding | Standard（套用統一內距）／ None（不處理，由內部 slot 自行決定）|

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 背景色 | `Background/Surface` | Fill、Inset 皆同 |
| 陰影 | `Elevation/Drop` | 不分 Layout，一律套用——陰影代表「這是一張卡片」|
| 圓角（Fill） | 無 | 邊到邊，無留白可供陰影表達層次 |
| 圓角（Inset） | `Radius/4` | 與 Button 一致，符合 App 專業感的視覺風格 |
| Padding = Standard | `Spacing/16`（四邊）| |
| Padding = None | 不套用 | 內距完全交由內部 slot 決定，用於包裹已自帶內距的元件（如 `QuotationCategoryCard`、`ExpansionTile`）|

## 使用規則

**用於：**
- 頁面中需要視覺分區、統一內距的內容區塊

**Fill vs Inset 判斷（軟性指引，非硬性規則）：**
- Card 的共同作用是「分區」，Fill 與 Inset 差別在區隔強度
- 傾向 **Inset**：內容代表獨立、可個別辨識的東西（清單項目、可選方案、設定入口），或想特別強調
- 傾向 **Fill**：內容是同一份資料的不同面向、想融入頁面閱讀流程
- 兩者常常都說得通，模糊地帶以「這個頁面主要在做什麼」的整體閱讀節奏為準，不強求唯一解

**避免：**
- Card 本身不內建互動/點擊狀態，點擊行為由外層呼叫端自行包裝手勢
- Card 不內建與螢幕邊緣的外部留白——Inset 只定義圓角，跟頁面邊緣的間距屬於頁面版面的責任（例如頁面套用 `Spacing/16` 邊距），避免元件被放進本身已有留白的容器時（如 BottomSheet 內）造成雙倍留白

## 邊界情況

**不歸類為 Card variant 的現況樣式：**
- 左側色條訂單卡（無陰影、ClipPath 而非圓角）
- 漸層/圖片背景促銷卡（背景非純色）

## Flutter Widget

| Flutter Class | 對應 Variant |
|--------------|-------------|
| 無（需新建，暫定 `AppCard`）| Fill／Inset |

現況待整併對象：`L2Card`、`L3Card`、`ClientOnGoingOrderCard`、`MasterOnGoingOrderCard`、`MasterSuitableOrderCard`、`MasterInProgressOrderCard`、`ProMemberFaqCard`（各自 Organism 規格不變，僅底層改用新 Card）

## Figma 元件

**位置**：[TigerMaster-Design-System → Card](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=768-2931)


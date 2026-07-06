# Tooltip

點擊觸發的輔助說明泡泡，用於補充解釋文字（收入明細、報價說明、媒合規則等），不承載必須被使用者確認的關鍵資訊。

_來源：Flutter codebase（`fdtigermaster_app`）審查，`TapTooltip`（`lib/component/tooltip/tap_tooltips.dart:84-216`）+ `QuestionTooltip`／`InfoTooltip` wrapper + 5 處實際使用情境比對_
_最後更新：2026-07-06_

---

## Variants

Tooltip 只有一種視覺樣式（品牌藍底 + 白字），無 tone/size 變體，但為了讓設計稿能直觀呈現「觸發圖示」與「泡泡展開」的組合關係，元件本身納入兩個屬性：

| 維度 | 值 |
|------|-----|
| 觸發圖示 | icon slot（instance-swap），預設可替換為 Question／Info icon，未來可擴充 |
| Open（開啟狀態） | `false`（預設，僅顯示觸發圖示）／`true`（顯示觸發圖示 + 說明泡泡）|

**觸發圖示不當作獨立 Tone variant**：`QuestionTooltip`／`InfoTooltip` 底色、字色、間距完全相同，唯一差異只是觸發用的 icon 圖案，因此比照 [Icon](icon.md)「顏色由父元件決定」的組合模式，圖示以插槽方式帶入，而非用多個 variant 分支表示不同圖示。

**Open 屬性是 Figma 端的呈現簡化，非執行期真實結構**：實際 Flutter 行為是泡泡以浮動 overlay 形式出現在觸發元件旁（見「邊界情況」的位置規則），觸發圖示與泡泡並非同一個容器。Open=true／false 只是讓設計稿能在同一個元件內展示「收合」與「展開」兩種狀態，方便標註與溝通，不代表兩者在畫面上是父子巢狀關係。

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 底色 | `Interactive/Action` | `#3A89F8`，與現況 hardcode `RGB(58,137,248)` 完全對應 |
| 文字 | `Interactive/OnFilled` | `#FFFFFF` |
| 字級 | `Body/S`（14px） | 對應現況 Flutter `bodyMedium`；說明文字用 Body 系列而非 Label（Label 給按鈕/標籤等短字詞用） |
| 圓角 | `Radius/4` | |
| 內距（左右／上下） | `Spacing/8`／`Spacing/4` | 取代現況 8~16px 不一致的多組數值 |
| 圖示與泡泡間距 | `Spacing/4` | Open=true 時，觸發圖示與泡泡之間的間距 |
| 最大寬度 | 280px（固定數值） | 現況無此限制，design-system 也無既有寬度 token 對應，屬新定義；手機最窄常見 360dp，扣除安全邊距後可容納 2-3 行中文說明文字 |
| 自動消失時間 | 3 秒（固定） | 取代現況 1.5s／5s／預設值不一致 |
| 箭頭指標 | 無 | 靠定位框（`positionDependentBox`）直接貼齊觸發元件 |

## 使用規則

**用於：**
- 輔助說明、解釋性文字（收入明細、報價說明、媒合規則等）

**避免：**
- 放置可互動元件（按鈕、連結、表單欄位）在泡泡內容裡——泡泡會自動消失且點擊外部就關閉，互動元件放進去容易操作到一半內容就不見
- 用於使用者必須看到／確認的關鍵資訊（如錯誤訊息、必填提醒）——自動消失特性不適合承載不能被錯過的內容

## 邊界情況

- 長文字：超過 max-width 280px 自動換行
- 觸發機制：點擊顯示（tap-down）、放開或點擊外部消失（非 hover、非長按，與 Material 標準行為不同）
- 位置：預設顯示於觸發元件下方（`preferBelow`），若下方空間不足自動翻轉至上方（Flutter 內建 `positionDependentBox` 邏輯，非設計師手動指定的樣式選項）
- 無障礙：現況有 `excludeFromSemantics` 參數可選擇性隱藏於螢幕閱讀器，屬既有能力
- Tap target 最小尺寸：由觸發元件自身規格決定（如 [IconButton](icon-button.md) 的 48×48px／40×40px 規則），Tooltip 本身不重複定義

## Flutter Widget

| Flutter Class | 對應 Variant | 現況說明 |
|--------------|-------------|------|
| `TapTooltip`（`tap_tooltips.dart:84-216`） | Tooltip 核心 | |
| `QuestionTooltip` | Tooltip + Question icon slot | 預組合 wrapper，保留為既有便利類別 |
| `InfoTooltip` | Tooltip + Info icon slot | 預組合 wrapper，保留為既有便利類別 |

## Figma 元件

**位置**：[TigerMaster-Design-System → Tooltip](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=576-11)

---

## 待釐清事項（TBD）

- 無

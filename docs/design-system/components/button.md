# Button

帶文字標籤的通用按鈕，可附加前置 Icon。
按鈕語意由 variant 決定視覺優先層級，shape 與 size 為獨立修飾詞。

> **元件邊界**：此規格僅涵蓋文字按鈕（Button）。純 icon 按鈕請見 `IconButton`；懸浮按鈕請見 `FloatingActionButton`。

---

## Variants

### Variant × Fill

| Variant | Fill | Tone | 背景 | 文字 | 邊框 | 語意角色 |
|---------|------|------|------|------|------|---------|
| `primary` | `filled` | — | `Interactive/Primary` | `Interactive/OnFilled` | — | 頁面主確認行動 |
| `primary` | `outlined` | — | transparent | `Interactive/Primary` | `Border/Interactive` | 次要全寬行動 |
| `secondary` | `filled` | — | `Interactive/Action` | `Interactive/OnFilled` | — | 頁面內次要行動 |
| `secondary` | `outlined` | — | transparent | `Interactive/Action` | `Border/Interactive` | 小型輔助行動 |
| `brand` | `filled` | — | `Interactive/Brand` | `Interactive/OnBrand` | — | 品牌色溝通 / 催促行動 |
| `neutral` | `outlined` | — | transparent | `Text/Hint` | `Border/Default` | 帳號設定類低強調行動 |
| `ghost` | — | `action` | transparent | `Interactive/Action` | — | 取消、三級動作 |
| `ghost` | — | `neutral` | transparent | `Text/Hint` | — | 刻意壓制的低調入口 |
| `ghost` | — | `danger` | transparent | `Status/Error` | — | 破壞性最終確認 |

**停用狀態（所有 variant）**：整體套用 `opacity: 40%`，不修改底層顏色。

### 其他修飾詞

| 修飾詞 | 值 | 說明 |
|--------|-----|------|
| `shape` | `rectangle` / `pill` | 全部 variant 適用 |
| `size` | `lg` / `md` / `sm` | 見下方 Size 規格 |
| `width` | `full` / `hug` | 全部 variant 適用 |
| `hasIconStart` | `true` / `false` | 前置 Icon（Frame slot） |
| `hasIconEnd` | `true` / `false` | 後置 Icon（Frame slot） |
| `tone` | `action` / `neutral` / `danger` | 僅 `ghost` variant 適用；預設為 `action` |
| `state` | `default` / `pressed` / `disabled` | 全部 variant 適用 |

---

## Design Tokens

### Size 規格

> 計算高度 = 垂直 Padding × 2 + Line Height（Label token）

| Size | 垂直 Padding | 水平 Padding | Icon 間距 | 文字大小 | 計算高度 | 典型 Width |
|------|------------|------------|---------|--------|--------|-----------|
| `lg` | `Spacing/12` | `Spacing/20` | `Spacing/8` | `Label/L`（16px, LH 20）| **44px** | `full` |
| `md` | `Spacing/8` | `Spacing/16` | `Spacing/8` | `Label/L`（16px, LH 20）| **36px** | `hug` |
| `sm` | `Spacing/4` | `Spacing/12` | `Spacing/4` | `Label/M`（14px, LH 20）| **28px** | `hug` |

### Shape 圓角

| Shape | Token |
|-------|-------|
| `rectangle` | `Radius/4` |
| `pill` | `Radius/Full` |

### Icon 規格

| Size | Icon 尺寸 |
|------|---------|
| `lg` | 24px |
| `md` | 20px |
| `sm` | 16px |

- **顏色**：與文字同色——由 `foregroundColor` 統一控制，各 variant 的 icon 色 = 文字 token

### 狀態視覺

| State | 視覺處理 |
|-------|---------|
| `default` | 正常顯示 |
| `pressed` | `foregroundColor` 12% 透明度疊加，對應 Material 2 InkWell 預設行為 |
| `disabled` | 整體 `opacity: 40%`，不修改底層顏色 |

> **Loading pattern**：Figma 不另設 `loading` variant。使用 `disabled` state + 修改 `Label` 文字（如「處理中…」）即可表達。Flutter 端由 `FutureButton` 包裝處理，視覺上進入 disabled，label 替換為 loadingText（call site 自訂）。

---

## 有效組合

| Variant | Fill | Shape | Size | Width | 對應 app 情境 |
|---------|------|-------|------|-------|------------|
| primary | filled | rectangle | lg | full | 下一步、上傳施工照片並驗收 |
| primary | outlined | rectangle | lg | full | 與客戶聯繫、與王小姐對話 |
| secondary | filled | pill | md | hug | 新增一筆報價、開始接案 |
| secondary | outlined | pill | sm | hug | 查看詳情、查看說明 |
| brand | filled | rectangle | md | hug | 再次通知師傅、與師傅對話 |
| neutral | outlined | rectangle | lg | full | 切換為師傅帳號、登出 |
| ghost | — | action | md | hug | 取消（dialog）|
| ghost | — | neutral | md | hug | 取消媒合、刪除帳號（頁面入口）|
| ghost | — | danger | md | hug | 中止媒合、刪除（dialog confirm）|

---

## 使用規則

**用於：**
- 頁面唯一主要行動（送出、確認）→ `primary filled`，置於頁面底部，`width: full`
- 品牌導向的溝通或催促行動 → `brand filled`
- 頁面內次要填充行動 → `secondary filled`，通常搭配 `pill`
- 有邊框的支援行動（全寬或膠囊）→ `primary outlined` 或 `secondary outlined`
- 三級動作、彈窗取消 → `ghost/action`
- 刻意壓制的破壞性入口（不希望誤觸）→ `ghost/neutral`
- 需要明確確認的破壞性行動（dialog 最終確認）→ `ghost/danger`
- 帳號設定類低強調行動 → `neutral outlined`

**避免：**
- 同一頁面出現兩個 `primary filled` 按鈕
- 將 `primary filled` 用於 inline（非底部全寬）場景
- 將 `brand`（黃色）用於非溝通 / 催促語意的場景
- `pill` 搭配 `width: full`（膠囊形狀不應撐滿容器）
- 直接引用 Primitive token 或 hardcode 色值

---

## 邊界情況

- **Disabled**：整體 `opacity: 40%`，不另設顏色 token，適用所有 variant
- **Loading**：Figma 使用 `disabled` + 修改 `Label` 文字呈現。Flutter 端由 `FutureButton` 包裝，視覺進入 disabled，label 替換為 loadingText（call site 自訂，非 spinner）
- **含 Icon**：前置（`hasIconStart`）與後置（`hasIconEnd`）各為獨立 Frame slot，通常擇一使用


---

## Flutter Widget

| Flutter Class | 角色 |
|--------------|------|
| `ToggleDisableButton` | 所有 variant 的核心結構，管理 enable / disable 切換 |
| `FutureButton` | loading state 包裝層（包住 `ToggleDisableButton`）|
| `PillButton` | pill shape 視覺包裝；目前 token 未對齊，待重構 |
| `ButtonShareStyle` | primary filled 硬碼 style；待 token 化後移除 |
| `CountDownButton` | 行為邏輯層（倒數計時），不屬於視覺規格範疇 |
| `ProUpgradeButton` | 頁面特規（漸層 + 固定路由），不屬於設計系統 |

---

## Figma 狀態

- [x] 已建立為 Figma Component（TigerMaster-Design-System）
- **目前位置**：`TigerMaster-Design-System` → `Button` 頁
- **下一步**：
  1. 依新 variant 定義重命名（Tertiary → brand、Outline Primary → primary outlined 等）
  2. 移除 hovered state（mobile app 無 hover）
  3. `hasIconStart` / `hasIconEnd` 各建立獨立 Frame slot（Instance Swap），取代現有 variant 展開
  4. 確認 `Interactive/Brand` 的黃色值與 Figma token 同步（Yellow/450，`#FFC827`）

---


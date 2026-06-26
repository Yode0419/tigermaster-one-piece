# Button

帶文字標籤的通用按鈕，可附加前置 Icon。
按鈕語意由 variant 決定視覺優先層級，shape 與 size 為獨立修飾詞。

> **元件邊界**：此規格僅涵蓋文字按鈕（Button）。純 icon 按鈕請見 `IconButton`；懸浮按鈕請見 `FloatingActionButton`。

---

## Variants

### Variant × Fill

| Variant | Fill | 背景 | 文字 | 邊框 | 語意角色 |
|---------|------|------|------|------|---------|
| `primary` | `filled` | `Interactive/Primary` | `Interactive/OnPrimary` | — | 頁面主確認行動 |
| `primary` | `outlined` | transparent | `Interactive/Secondary` | `Border/Interactive` | 次要全寬行動 |
| `secondary` | `filled` | `Interactive/Action` | `Interactive/OnPrimary` | — | 頁面內次要行動 |
| `secondary` | `outlined` | transparent | `Interactive/Action` | `Border/Interactive` | 小型輔助行動 |
| `brand` | `filled` | `Interactive/Brand` | `Interactive/OnBrand` | — | 品牌色溝通 / 催促行動 |
| `neutral` | `outlined` | transparent | `Text/Hint` | `Border/Default` | 帳號設定類低強調行動 |
| `ghost` | — | transparent | `Text/Primary` | — | 三級動作、取消 |
| `ghost` + `danger` | — | transparent | `Status/Error` | — | 破壞性確認（dialog 內）|

**停用狀態（所有 variant）**：整體套用 `opacity: 40%`，不修改底層顏色。

### 其他修飾詞

| 修飾詞 | 值 | 說明 |
|--------|-----|------|
| `shape` | `rectangle` / `pill` | 全部 variant 適用 |
| `size` | `md` / `sm` | 見下方 Size 規格 |
| `width` | `full` / `hug` | 全部 variant 適用 |
| `hasIconStart` | `true` / `false` | 前置 Icon（Instance Swap slot） |
| `danger` | `true` / `false` | 目前僅確認 `ghost` 使用 |
| `state` | `default` / `pressed` / `disabled` / `loading` | 全部 variant 適用 |

---

## Design Tokens

### Size 規格

| Size | 垂直 Padding | 水平 Padding | Icon 間距 | 文字大小 |
|------|------------|------------|---------|--------|
| `md` | `Spacing/12` | `Spacing/20` | `Spacing/8` | TBD |
| `sm` | `Spacing/8` | `Spacing/12` | `Spacing/8` | TBD |

### Shape 圓角

| Shape | Token |
|-------|-------|
| `rectangle` | `Radius/8` |
| `pill` | `Radius/Full` |

---

## 有效組合

| Variant | Fill | Shape | Size | Width | 對應 app 情境 |
|---------|------|-------|------|-------|------------|
| primary | filled | rectangle | md | full | 下一步、上傳施工照片並驗收 |
| primary | outlined | rectangle | md | full | 與客戶聯繫、與王小姐對話 |
| secondary | filled | pill | md | hug | 新增一筆報價 |
| secondary | outlined | pill | sm | hug | 查看詳情、查看說明 |
| brand | filled | rectangle | md | hug | 再次通知師傅、與師傅對話 |
| neutral | outlined | rectangle | md | full | 切換為師傅帳號、登出 |
| ghost | — | — | md | hug | 取消（dialog）、刪除帳號 |
| ghost + danger | — | — | md | hug | 離開（dialog）|

---

## 使用規則

**用於：**
- 頁面唯一主要行動（送出、確認）→ `primary filled`，置於頁面底部，`width: full`
- 品牌導向的溝通或催促行動 → `brand filled`
- 頁面內次要填充行動 → `secondary filled`，通常搭配 `pill`
- 有邊框的支援行動（全寬或膠囊）→ `primary outlined` 或 `secondary outlined`
- 三級動作、彈窗取消 → `ghost`
- 需要明確確認的破壞性行動 → `ghost + danger`
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
- **Loading**：由 `FutureButton` 包裝處理，視覺上按鈕進入 disabled，同時顯示 loading 文字（非 spinner）
- **含 Icon**：僅支援前置 icon（`hasIconStart`），透過 Instance Swap slot 替換；不支援後置 icon（`hasIconEnd`）
- **「切換為師傅帳號」深藍文字**：這是頁面層套用 `Text/Brand` 的情境覆蓋，非 `neutral` variant 的標準樣式；`neutral` 標準文字色為 `Text/Hint`

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
  3. Icon 改為 Instance Swap slot，取代現有 hasIconStart/hasIconEnd variant 展開
  4. 確認 `Interactive/Brand` 的黃色值與 Figma token 同步（Yellow/450，`#FFC827`）

---

## 待釐清事項（TBD）

- [ ] Typography token：`md` / `sm` size 各對應哪個 Label token（需對照 `typography.md`）
- [ ] `neutral outlined` 標準外觀：`Border/Default`（`#EDEDED`）在視覺上是否夠明顯，或應調整為 `Border/Subtle`（需視覺驗證）

# Typography Tokens

_來源：Figma Design System / Foundations > Typography_
_Figma 節點：`13:2`（`X00A5f1Ohj9BhgbMXwzNuM`）_
_最後同步：2026-06-25_

---

## 說明

- 字體家族：**Noto Sans TC**（全系列統一）
- Letter Spacing：全部為 `0`
- 命名規則：`群組/尺寸`，由大至小排列

---

## Display

用於大型行銷標題、空白頁的主標語，不用於一般 UI 內容。

| Token | Size | Weight | Line Height | Flutter |
|-------|------|--------|-------------|---------|
| `Display/XL` | 72px | 700 Bold | 98px | — |
| `Display/L` | 56px | 700 Bold | 76px | — |
| `Display/M` | 40px | 700 Bold | 56px | — |

## Heading

用於頁面「內文中」的大型分段標題（例如長內容頁中間的分節大標、行銷／推廣性質的醒目文字），**不包含 AppBar／導覽列標題**——AppBar 頁面標題請用 `Title`。使用頻率低，多半一頁使用一次或完全不使用。

| Token | Size | Weight | Line Height | Flutter |
|-------|------|--------|-------------|---------|
| `Heading/1` | 32px | 600 Semibold | 44px | — |
| `Heading/2` | 28px | 600 Semibold | 40px | — |
| `Heading/3` | 24px | 500 Medium | 34px | — |
| `Heading/4` | 20px | 500 Medium | 28px | — |

> Heading/1-2 為頁面內最強層級，用 Semibold 建立份量；Heading/3-4 為次級分段標題，靠尺寸差異分層即可，不需要額外加粗。

## Title

用於 **AppBar／頁面標題、Bottom Sheet 標題、Card 主標、Dialog 標題、列表項目主文（需強調時）**。這是 App 中最常出現的「標題類」文字，涵蓋導覽列到元件層級的各種標題情境。

| Token | Size | Weight | Line Height | 典型用途 | Flutter |
|-------|------|--------|-------------|---------|---------|
| `Title/L` | 20px | 500 Medium | 28px | AppBar 大標題、獨立顯示的 Bottom Sheet 標題 | — |
| `Title/M` | 18px | 500 Medium | 28px | Card 主標、一般 Dialog 標題（最常見） | — |
| `Title/S` | 16px | 500 Medium | 24px | 列表項目強調文字、次要卡片標題 | — |

> `Title/L` 與 `Heading/4` 尺寸相同屬刻意設計：兩者服務情境不同（導覽 chrome vs 內文分節），數值重疊不代表衝突。

## Body

用於一般說明文字、訂單內容、表單輸入值。

| Token | Size | Weight | Line Height | Flutter |
|-------|------|--------|-------------|---------|
| `Body/L` | 18px | 400 Regular | 28px | — |
| `Body/M` | 16px | 400 Regular | 24px | — |
| `Body/S` | 14px | 400 Regular | 22px | — |
| `Body/XS` | 12px | 400 Regular | 18px | — |

## Label

用於互動元件的文字標籤：按鈕、Chip、Tag、Badge、輔助說明。
層級由大至小對應元件的視覺重要性。

| Token | Size | Weight | Line Height | 比例 | 典型用途 | Flutter |
|-------|------|--------|-------------|------|---------|---------|
| `Label/L` | 16px | 500 Medium | 20px | 1.25× | lg / md 按鈕文字 | — |
| `Label/M` | 14px | 500 Medium | 20px | 1.43× | sm 按鈕文字、次要標籤 | — |
| `Label/S` | 12px | 500 Medium | 16px | 1.33× | Chip、Tag、Badge 文字 | — |
| `Label/XS` | 10px | 500 Medium | 14px | 1.4× | 最小標籤 | — |

---

## 使用規則

**標題類（Heading／Title）**
- Heading 用於頁面內文中的大型分段標題；Title 用於 AppBar／Card／Bottom Sheet／Dialog 等標題情境。AppBar 頁面標題一律用 Title，不用 Heading
- 同一區塊內 Heading 不跳級使用（例如不可從 Heading/1 直接跳到 Heading/3）

**內文強調**
- Body 需要強調特定字詞（金額、狀態字等）時，直接在 Body 上套用 Bold 做行內強調；不要為了強調而改用 Title——Title 是標題類 token，不是強調工具

**其他**
- **Display** 僅用於行銷場景，不用於一般功能頁面
- **Label** 不用於段落文字，僅用於短文字元素；最小使用尺寸為 `Label/XS`（10px），不得更小
- **按鈕文字**：lg / md 按鈕 → `Label/L`；sm 按鈕 → `Label/M`

---

## 已知設計債

| 問題 | 說明 | 建議處理時機 |
|------|------|------------|
| fontWeight 不一致 | Codebase 正文大量使用 w500，Body group 定義的 w400 尚未落地 | 重構各頁面文字時逐步對齊 |
| 字型名稱不一致 | Codebase `main.dart` 使用 `Noto Sans CJK`；設計端與 token 定義使用 `Noto Sans TC` | 統一換成 `Noto Sans TC` |

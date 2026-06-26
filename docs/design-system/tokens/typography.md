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

用於頁面主標題、區塊大標。

| Token | Size | Weight | Line Height | Flutter |
|-------|------|--------|-------------|---------|
| `Heading/1` | 32px | 700 Bold | 44px | — |
| `Heading/2` | 28px | 700 Bold | 40px | — |
| `Heading/3` | 24px | 700 Bold | 34px | — |
| `Heading/4` | 20px | 500 Medium | 28px | — |

> `Heading/4` 為 Medium weight，其餘為 Bold。

## Title

用於 Bottom Sheet 標題、Card 主標、列表項目主文（需強調時）。

| Token | Size | Weight | Line Height | Flutter |
|-------|------|--------|-------------|---------|
| `Title/L` | 18px | 700 Bold | 28px | — |
| `Title/M` | 17px | 700 Bold | 22px | — |
| `Title/S` | 16px | 700 Bold | 24px | — |

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

- **Display** 僅用於行銷場景，不用於一般功能頁面
- **Heading** 每個區塊最多使用一個層級，不跳級
- **Title vs Body**：強調用 Title（Bold），正文用 Body（Regular）
- **Label** 不用於段落文字，僅用於短文字元素
- 最小使用尺寸：`Label/XS`（10px），不得更小
- **按鈕文字**：lg / md 按鈕 → `Label/L`；sm 按鈕 → `Label/M`

---

## 已知設計債

| 問題 | 說明 | 建議處理時機 |
|------|------|------------|
| fontWeight 不一致 | Codebase 正文大量使用 w500，Body group 定義的 w400 尚未落地 | 重構各頁面文字時逐步對齊 |
| 字型名稱不一致 | Codebase `main.dart` 使用 `Noto Sans CJK`；設計端與 token 定義使用 `Noto Sans TC` | 統一換成 `Noto Sans TC` |

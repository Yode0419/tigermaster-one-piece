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

用於標籤、按鈕文字、Badge、Tag、輔助說明。

| Token | Size | Weight | Line Height | Flutter |
|-------|------|--------|-------------|---------|
| `Label/L` | 14px | 500 Medium | 22px | — |
| `Label/M` | 12px | 500 Medium | 18px | — |
| `Label/S` | 10px | 500 Medium | 14px | — |

---

## 使用規則

- **Display** 僅用於行銷場景，不用於一般功能頁面
- **Heading** 每個區塊最多使用一個層級，不跳級
- **Title vs Body**：強調用 Title（Bold），正文用 Body（Regular）
- **Label** 不用於段落文字，僅用於短文字元素
- 最小使用尺寸：`Label/S`（10px），不得更小

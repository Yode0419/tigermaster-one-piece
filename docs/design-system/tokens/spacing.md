# Spacing Tokens

_來源：Figma Design System / Foundations > Spacing_
_Figma 節點：`28:2`（`X00A5f1Ohj9BhgbMXwzNuM`）_
_最後同步：2026-06-25_

---

## 說明

間距系統採 **4px 為基本單位**，所有 token 值均為 4 的倍數（`Spacing/2` 為例外，保留用於極小間距）。

---

## Spacing Tokens

| Token | 值（px） | 常見用途 |
|-------|----------|----------|
| `Spacing/2` | 2 | 極小間距，如 icon 與文字之間的微調 |
| `Spacing/4` | 4 | 元件內部最小間距 |
| `Spacing/8` | 8 | 元件內部標準間距、小型元件 padding |
| `Spacing/12` | 12 | 中型元件 padding、相鄰元素間距 |
| `Spacing/16` | 16 | 標準 padding、Card 內距、區塊間距 |
| `Spacing/20` | 20 | 較寬的 padding |
| `Spacing/24` | 24 | 大型元件內距、區塊上下 padding |
| `Spacing/32` | 32 | 區塊與區塊之間的間距 |
| `Spacing/40` | 40 | 頁面區塊大間距 |
| `Spacing/48` | 48 | 頁面頂部／底部邊距 |

---

## 使用規則

- 所有間距值**必須引用 token**，不得使用任意數值
- 元件 padding 優先使用 `Spacing/16`（標準）或 `Spacing/12`（緊湊）
- 頁面左右 margin 使用 `Spacing/16`
- 清單項目上下間距使用 `Spacing/12` 或 `Spacing/8`
- `Spacing/2` 僅用於精細調整，不用於結構間距

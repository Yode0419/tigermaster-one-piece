# Radius Tokens

_來源：Figma Design System / Foundations > Radius_
_Figma 節點：`28:74`（`X00A5f1Ohj9BhgbMXwzNuM`）_
_最後同步：2026-07-07 — 修正 Badge 圓角歸屬（Radius/4 → Radius/Full）；新增 CornerBadge 內側/外側圓角對照（Radius/12、Radius/4）_

---

## Radius Tokens

| Token | 值（px） | 常見用途 |
|-------|----------|----------|
| `Radius/4` | 4 | 小型元件，如輸入框、CornerBadge 外側圓角 |
| `Radius/8` | 8 | 標準元件，如 Button、小型 Card |
| `Radius/12` | 12 | 中型 Card、選單項目、CornerBadge 內側圓角 |
| `Radius/16` | 16 | 大型 Card、Modal、Bottom Sheet |
| `Radius/24` | 24 | 特殊圓角，如膠囊型按鈕容器 |
| `Radius/Full` | 999 | 完全圓形，如頭像、圓形按鈕、Chip、Tag、Badge |

---

## 使用規則

- Button 標準使用 `Radius/8`
- Card 標準使用 `Radius/12` 或 `Radius/16`
- Bottom Sheet 頂部圓角使用 `Radius/16`
- Avatar、圓形 icon 按鈕使用 `Radius/Full`
- 不得使用未定義的任意圓角值

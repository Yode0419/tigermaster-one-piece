# Radius Tokens

_來源：Figma Design System / Foundations > Radius_
_Figma 節點：`28:74`（`X00A5f1Ohj9BhgbMXwzNuM`）_
_最後同步：2026-07-14 — 盤點全元件圓角使用狀況；Dialog 依 Type 拆分圓角（Standard/Radius/8、Emphasis/Radius/16），呼應其風格差異（俐落提示 vs 慎重強調）_

---

## Radius Tokens

| Token | 值（px） | 常見用途 |
|-------|----------|----------|
| `Radius/4` | 4 | 小型元件，如輸入框、CornerBadge 外側圓角、Button、Card（Inset）|
| `Radius/8` | 8 | 標準元件（現況個案，如 SegmentedControl 就近歸類）、Dialog（Standard） |
| `Radius/12` | 12 | 選單項目、CornerBadge 內側圓角 |
| `Radius/16` | 16 | Dialog（Emphasis）、Bottom Sheet |
| `Radius/24` | 24 | 特殊圓角，如膠囊型按鈕容器 |
| `Radius/Full` | 999 | 完全圓形，如頭像、圓形按鈕、Chip、Tag、Badge |

---

## 使用規則

圓角大小反映元件的慎重程度與內容份量：內容越簡單、功能性越強，圓角越小、越俐落；內容越豐富、越需要使用者留意，圓角越大。

- 小型、功能性元件（如 Button、輸入框）走俐落調性，用較小圓角
- 疊加型容器（如 Dialog、Bottom Sheet）依內容份量分級，同一元件不同情境可對應不同圓角
- `Radius/Full` 保留給語意上明確為「圓形物件」的元件（頭像、標籤、選中狀態等），非單純圓角尺度的延伸
- 不得使用未定義的任意圓角值

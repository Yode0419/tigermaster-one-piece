# Elevation Tokens

_來源：Figma Design System / Foundations > Elevation_
_Figma 節點：`32:5`（`X00A5f1Ohj9BhgbMXwzNuM`）_
_最後同步：2026-06-25_

---

## Elevation Tokens

| Token | 類型 | 色值（含透明度） | Offset | Blur | Spread | 用途 |
|-------|------|-----------------|--------|------|--------|------|
| `Elevation/Card` | Drop Shadow | `#000000` 9% | (x:0, y:2) | 4px | 0 | Card、列表項目、一般浮起元素 |
| `Elevation/Sheet` | Drop Shadow | `#000000` 12% | (x:0, y:0) | 8px | 0 | Bottom Sheet、Drawer、浮層面板 |

---

## 使用規則

- **Card**：使用 `Elevation/Card`，表示輕度浮起，與背景有微弱層次區隔
- **Sheet / Modal**：使用 `Elevation/Sheet`，表示覆蓋在頁面上方的浮層元素
- Elevation 只應用在有明確層次關係的元件上，不用於裝飾目的
- 背景色為白色或淺色時 elevation 效果才明顯；深色背景不使用

---

## Flutter 對應

```dart
// Elevation/Card
BoxShadow(
  color: Color(0x17000000),  // 9% opacity
  offset: Offset(0, 2),
  blurRadius: 4,
  spreadRadius: 0,
)

// Elevation/Sheet
BoxShadow(
  color: Color(0x1F000000),  // 12% opacity
  offset: Offset(0, 0),
  blurRadius: 8,
  spreadRadius: 0,
)
```

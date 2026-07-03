# Elevation Tokens

_來源：Figma Design System / Foundations > Elevation_
_Figma 節點：`32:5`（`X00A5f1Ohj9BhgbMXwzNuM`）_
_最後同步：2026-07-03 — 新增 Elevation/Rise（置底區塊陰影）_

---

## Elevation Tokens

| Token | 類型 | 色值（含透明度） | Offset | Blur | Spread | 用途 |
|-------|------|-----------------|--------|------|--------|------|
| `Elevation/Drop` | Drop Shadow | `#000000` 9% | (x:0, y:2) | 4px | 0 | Card、列表項目、一般浮起元素 |
| `Elevation/Ambient` | Drop Shadow | `#000000` 12% | (x:0, y:0) | 8px | 0 | Bottom Sheet、Drawer、浮層面板 |
| `Elevation/Rise` | Drop Shadow | `#000000` 9% | (x:0, y:-2) | 4px | 0 | 置底固定 CTA 區塊（如表單底部送出按鈕）與上方內容的區隔 |

---

## 使用規則

- **Drop**：陰影有方向性（y:2），光從上方投射，用於輕度浮起且仍在頁面流中的元素（Card、列表項目、FAB）
- **Ambient**：陰影四面均散（y:0），元件懸浮於空間中，用於覆蓋頁面內容的浮層（BottomSheet、Drawer、Modal）
- **Rise**：與 Drop 互為鏡像（y:-2，其餘數值相同），光從下方投射，用於置底固定的操作區塊（例如表單底部的 CTA bar），與上方可捲動內容做區隔
- Elevation 只應用在有明確層次關係的元件上，不用於裝飾目的
- 背景色為白色或淺色時 elevation 效果才明顯；深色背景不使用

---

## Flutter 對應

```dart
// Elevation/Drop
BoxShadow(
  color: Color(0x17000000),  // 9% opacity
  offset: Offset(0, 2),
  blurRadius: 4,
  spreadRadius: 0,
)

// Elevation/Ambient
BoxShadow(
  color: Color(0x1F000000),  // 12% opacity
  offset: Offset(0, 0),
  blurRadius: 8,
  spreadRadius: 0,
)

// Elevation/Rise
BoxShadow(
  color: Color(0x17000000),  // 9% opacity
  offset: Offset(0, -2),
  blurRadius: 4,
  spreadRadius: 0,
)
```

---

## 已知落差（技術債）

- `ScaffoldBottomSheet`（`lib/component/bottom_sheet/scaffold_bottom_sheet.dart`）目前寫死 `Colors.grey.withOpacity(0.15)` + `spreadRadius: 4` + `blurRadius: 2`（零 offset、四面均散），與 `Elevation/Rise` 的目標數值（Drop 鏡像、方向性陰影）不同，尚未改用 token，實作對齊留待後續處理

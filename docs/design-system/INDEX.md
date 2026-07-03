# Design System Index

TigerMaster App 的設計系統文件，供 AI 與設計師理解視覺語言、元件規格與使用規則。

_Figma 來源：[TigerMaster-Design-System](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System)_
_Last updated: 2026-07-03 — 新增 SegmentedControl 元件規格_

---

## 目錄結構

```
design-system/
├── tokens/          — 設計 token（顏色、字型、間距）
├── components/      — 元件規格（用途、variants、規則、禁用模式）
└── patterns/        — 複合版型（頁面佈局、重複使用的 UI 組合）
```

---

## Tokens

- [colors.md](tokens/colors.md) — Primitive 色票（品牌色、中性色、功能色）_(2026-06-26)_
- [semantic-colors.md](tokens/semantic-colors.md) — Semantic 顏色 token（Text / Background / Icon / Border / Interactive / Status）_(2026-07-03)_
- [typography.md](tokens/typography.md) — 字型層級（Display / Heading / Title / Body / Label）_(2026-07-03)_
- [spacing.md](tokens/spacing.md) — 間距 token（2–48px）_(2026-06-25)_
- [radius.md](tokens/radius.md) — 圓角 token（4–Full）_(2026-06-25)_
- [elevation.md](tokens/elevation.md) — 陰影層級（Card / Sheet）_(2026-06-29)_

## Components

工作清單：[component-inventory.md](component-inventory.md) _(2026-07-03)_

### components/

- **[Button](components/button.md)** — 文字按鈕規格：variant × fill 組合、token 對照、有效組合、Flutter widget 對應 _(2026-06-26)_
- **[Icon](components/icon.md)** — 圖示容器規格：Material / Phosphor 兩套系統說明、Phosphor Duotone、Size 對照、顏色由父元件決定 _(2026-06-29)_
- **[IconButton](components/icon-button.md)** — 純圖示按鈕規格：ghost / filled variant、md / sm 尺寸、tone 定義、token 對照、Flutter widget 對應 _(2026-06-29)_
- **[FAB（Floating Action Button）](components/fab.md)** — 浮動主要行動按鈕：通用規格定義、引導 Tooltip、使用門檻與禁用情境、CustomerServiceFab 實作案例 _(2026-06-29)_
- **[TextField](components/text-field.md)** — 文字輸入框規格：Lines/State/Content 三維 variant、readonly state、Content（Filled/Empty）placeholder 機制、Show Helper Text 開關、token 對照、後綴 icon 位移邊界情況、Flutter widget 對應 _(2026-07-01)_
- **[PasswordField](components/password-field.md)** — 密碼輸入框規格：從 TextField 拆出的獨立元件，State/Content/Reveal 三維 variant、顯示/隱藏密碼機制、不提供字數顯示、Flutter widget 對應 _(2026-07-01)_
- **[Checkbox](components/checkbox.md)** — 複選勾選框規格：State（enabled/disabled/error）× Selected（true/false）兩個獨立 variant 屬性、token 對照、避免互斥選項使用、Flutter widget 改造項目 _(2026-07-03)_
- **[Radio](components/radio.md)** — 單選勾選框規格：State（enabled/disabled/error）× Selected（true/false）兩個獨立 variant 屬性、error 為群組層級共享狀態（非個別項目獨立判斷）、token 對照、Flutter widget 改造項目 _(2026-07-03)_
- **[Switch](components/switch.md)** — 即時生效設定開關規格：Selected（true/false）× State（enabled/disabled）兩個獨立 variant 屬性、Material 2 風格溢出式 Thumb + 陰影、token 對照、與 Checkbox/Radio 可點擊區域差異、disabled 特例技術債說明 _(2026-07-03)_
- **[SegmentedControl](components/segmented-control.md)** — 整頁內容切換元件規格：功能上等同 Tab（需搭配 TabController/TabBarView），視覺為 Segmented Control 樣式；分段數（2/3）與 Label 文字 variant、token 對照、Figma Component 已建立 _(2026-07-03)_

## Patterns

版型文件陸續建立中。

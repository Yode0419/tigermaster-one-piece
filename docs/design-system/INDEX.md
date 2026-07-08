# Design System Index

TigerMaster App 的設計系統文件，供 AI 與設計師理解視覺語言、元件規格與使用規則。

_Figma 來源：[TigerMaster-Design-System](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System)_
_Last updated: 2026-07-08 — 新增 IconLabelButton 元件規格_

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

- [colors.md](tokens/colors.md) — Primitive 色票（品牌色、中性色、功能色）+ Component Tokens 第三層說明 _(2026-07-07)_
- [semantic-colors.md](tokens/semantic-colors.md) — Semantic 顏色 token（Text / Background / Icon / Border / Interactive / Status）_(2026-07-07)_
- [typography.md](tokens/typography.md) — 字型層級（Display / Heading / Title / Body / Label）_(2026-07-03)_
- [spacing.md](tokens/spacing.md) — 間距 token（2–48px）_(2026-06-25)_
- [radius.md](tokens/radius.md) — 圓角 token（4–Full）_(2026-07-06)_
- [elevation.md](tokens/elevation.md) — 陰影層級（Card / Sheet / 置底區塊）_(2026-07-03)_

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
- **[Chip](components/chip.md)** — 少量選項單選切換元件規格：Tone（Brand/Info）× Selected × Icon × Disabled 四維 variant、Tone 語意差異定義、新引入「元件專屬 token」概念（Chip/InfoSelected）、三處現況實作待整併為統一 Flutter widget _(2026-07-06)_
- **[Tag](components/tag.md)** — 靜態顯示標籤規格：Tone（Info/Emphasis/Notice/Success）× Solid × Size 三維 variant、Emphasis 兩種視覺強度（淡底色/實色反白）、`Background/Notice` 由候選升級為正式 token、同步修正 `Status/Success`、`Status/ErrorContainer`、`radius.md` 圓角歸屬 _(2026-07-06)_
- **[Tooltip](components/tooltip.md)** — 點擊觸發輔助說明泡泡規格：觸發圖示以 slot 帶入而非 Tone variant、統一 padding/最大寬度(280px)/自動消失時間(3秒)、Tap target 由觸發元件（如 IconButton）自身定義 _(2026-07-06)_
- **[Badge](components/badge.md)** — 通知提示元件規格：疊加於其他元件右上角，Content（Dot/Count）variant、9+ 上限規則（現況 'N' 列為技術債）、與 CornerBadge 明確區分 _(2026-07-07)_
- **[CornerBadge](components/corner-badge.md)** — 卡片/圖片角落強調標記規格：Position（左下/右下，圓角鏡像翻轉）× Content（圖示+文字/純文字）、目前唯一場景為保固天數顯示 _(2026-07-07)_
- **[Image](components/image.md)** — 遠端圖片顯示規格：State（Loading/Loaded/Error）單一維度、不定義 Shape variant（裁切交給外層元件）、統一 Error 佔位符取代現況不一致的錯誤處理 _(2026-07-07)_
- **[PhotoUpload](components/photo-upload.md)** — 可增減圖片上傳插槽規格：Type（Photo/Certificate）× State（default/loading/uploaded/disabled）兩維 variant、GridImageView 與 AccountImageUpload 兩處現況整併、圓角設計債（現況 5px 非既有 token）_(2026-07-08)_
- **[IconLabelButton](components/icon-label-button.md)** — 垂直排列（icon 上、文字下）的圖示+文字按鈕：參照 IconButton 拿掉 size 的 tone(default/inverse/brand) × state 兩維 variant、文字色複用既有 Interactive 群組 token（零新增）、BottomNavBar/聊天室選單/AppBar 客服按鈕三處現況待整併 _(2026-07-08)_

## Patterns

版型文件陸續建立中。

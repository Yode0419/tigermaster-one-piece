# Design System Index

TigerMaster App 的設計系統文件，供 AI 與設計師理解視覺語言、元件規格與使用規則。

_Figma 來源：[TigerMaster-Design-System](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System)_
_Last updated: 2026-07-14 — 新增 Card 元件規格；圓角 token 盤點重構（Button/Card 改 Radius/4、Dialog 依 Type 拆分 Radius/8|16）；同步修正 Snackbar 圓角；FAB 同步 Figma Component（Content 改為 Type：Default/Slot）；補齊 Avatar／Tag／FAB 的 Figma 元件位置_

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
- [radius.md](tokens/radius.md) — 圓角 token（4–Full）：使用規則改為「慎重程度與內容份量」邏輯，Button/Card（Inset）改用 `Radius/4`、Dialog 依 Type 拆分 `Radius/8`（Standard）/`Radius/16`（Emphasis）_(2026-07-14)_
- [elevation.md](tokens/elevation.md) — 陰影層級（Card / Sheet / 置底區塊）_(2026-07-03)_

## Components

工作清單：[component-inventory.md](component-inventory.md) _(2026-07-03)_

### components/

- **[Button](components/button.md)** — 文字按鈕規格：variant × fill 組合、token 對照、有效組合、Flutter widget 對應 _(2026-06-26)_
- **[Icon](components/icon.md)** — 圖示容器規格：Material / Phosphor 兩套系統說明、Phosphor Duotone、Size 對照、顏色由父元件決定 _(2026-06-29)_
- **[IconButton](components/icon-button.md)** — 純圖示按鈕規格：ghost / filled variant、md / sm 尺寸、tone 定義、token 對照、Flutter widget 對應 _(2026-06-29)_
- **[FAB（Floating Action Button）](components/fab.md)** — 浮動主要行動按鈕：Type（Default/Slot）variant、引導 Tooltip、使用門檻與禁用情境、CustomerServiceFab 實作案例、Figma Component 已建立 _(2026-07-14)_
- **[TextField](components/text-field.md)** — 文字輸入框規格：Lines/State/Content 三維 variant、readonly state、Content（Filled/Empty）placeholder 機制、Show Helper Text 開關、token 對照、後綴 icon 位移邊界情況、Flutter widget 對應 _(2026-07-01)_
- **[PasswordField](components/password-field.md)** — 密碼輸入框規格：從 TextField 拆出的獨立元件，State/Content/Reveal 三維 variant、顯示/隱藏密碼機制、不提供字數顯示、Flutter widget 對應 _(2026-07-01)_
- **[Checkbox](components/checkbox.md)** — 複選勾選框規格：State（enabled/disabled/error）× Selected（true/false）兩個獨立 variant 屬性、token 對照、避免互斥選項使用、Flutter widget 改造項目 _(2026-07-03)_
- **[Radio](components/radio.md)** — 單選勾選框規格：State（enabled/disabled/error）× Selected（true/false）兩個獨立 variant 屬性、error 為群組層級共享狀態（非個別項目獨立判斷）、token 對照、Flutter widget 改造項目 _(2026-07-03)_
- **[Switch](components/switch.md)** — 即時生效設定開關規格：Selected（true/false）× State（enabled/disabled）兩個獨立 variant 屬性、Material 2 風格溢出式 Thumb + 陰影、token 對照、與 Checkbox/Radio 可點擊區域差異、disabled 特例技術債說明 _(2026-07-03)_
- **[SegmentedControl](components/segmented-control.md)** — 整頁內容切換元件規格：功能上等同 Tab（需搭配 TabController/TabBarView），視覺為 Segmented Control 樣式；分段數（2/3）與 Label 文字 variant、token 對照、Figma Component 已建立 _(2026-07-03)_
- **[Chip](components/chip.md)** — 少量選項單選切換元件規格：Tone（Brand/Info）× Selected × Icon × Disabled 四維 variant、Tone 語意差異定義、新引入「元件專屬 token」概念（Chip/InfoSelected）、三處現況實作待整併為統一 Flutter widget _(2026-07-06)_
- **[Tag](components/tag.md)** — 靜態顯示標籤規格：Tone（Info/Emphasis/Notice/Success）× Solid × Size 三維 variant、Emphasis 兩種視覺強度（淡底色/實色反白）、`Background/Notice` 由候選升級為正式 token、同步修正 `Status/Success`、`Status/ErrorContainer`、`radius.md` 圓角歸屬、Figma Component 已建立 _(2026-07-06)_
- **[Tooltip](components/tooltip.md)** — 點擊觸發輔助說明泡泡規格：觸發圖示以 slot 帶入而非 Tone variant、統一 padding/最大寬度(280px)/自動消失時間(3秒)、Tap target 由觸發元件（如 IconButton）自身定義 _(2026-07-06)_
- **[Badge](components/badge.md)** — 通知提示元件規格：疊加於其他元件右上角，Content（Dot/Count）variant、9+ 上限規則（現況 'N' 列為技術債）、與 CornerBadge 明確區分 _(2026-07-07)_
- **[CornerBadge](components/corner-badge.md)** — 卡片/圖片角落強調標記規格：Position（左下/右下，圓角鏡像翻轉）× Content（圖示+文字/純文字）、目前唯一場景為保固天數顯示 _(2026-07-07)_
- **[Image](components/image.md)** — 遠端圖片顯示規格：State（Loading/Loaded/Error）單一維度、不定義 Shape variant（裁切交給外層元件）、統一 Error 佔位符取代現況不一致的錯誤處理 _(2026-07-07)_
- **[PhotoUpload](components/photo-upload.md)** — 可增減圖片上傳插槽規格：Type（Photo/Certificate）× State（default/loading/uploaded/disabled）兩維 variant、GridImageView 與 AccountImageUpload 兩處現況整併、圓角設計債（現況 5px 非既有 token）_(2026-07-08)_
- **[IconLabelButton](components/icon-label-button.md)** — 垂直排列（icon 上、文字下）的圖示+文字按鈕：參照 IconButton 拿掉 size 的 tone(default/inverse/brand) × state 兩維 variant、文字色複用既有 Interactive 群組 token（零新增）、BottomNavBar/聊天室選單/AppBar 客服按鈕三處現況待整併 _(2026-07-08)_
- **[Rating](components/rating.md)** — 星級評分元件：Size（lg/sm，復用 Icon token）× Rate（0~5 半星 11 階）兩維 variant，唯讀顯示與互動輸入視覺一致、Icon/Brand+Icon/Subtle 零新增 token、Figma 由 5 顆獨立星星 Full/Half/Empty 子元件組成 _(2026-07-09)_
- **[Avatar](components/avatar.md)** — 使用者頭像顯示元件：Size（36/60/75/100/140）× Source（Custom/Default）兩維 variant，無照片統一顯示品牌老虎佔位圖（非 Image 破圖樣式）、換頭像相機圖示定位為 Avatar+IconButton 複合用法而非內建 variant、Figma Component 已建立 _(2026-07-09)_
- **[Dialog](components/dialog.md)** — 置中疊加的阻斷式對話框規格：Type（Standard/Emphasis）variant、圓角依 Type 拆分（`Radius/8`／`Radius/16`，呼應俐落提示 vs 慎重強調）、Content 以 Figma Slot 功能表達、Actions 採「一主一次」原則並複用 Button instance、與 BottomSheet 使用情境明確區分、現況 16 個 dialog class 待整併、Figma 已建立 Component _(2026-07-14)_
- **[BottomSheet](components/bottom-sheet.md)** — 模態式置底容器規格：hasHeader（Variant，有/無支援 Action Sheet 組合）、hasStickyFooter（Boolean property）、Content 為彈性 slot、圓角 Radius/16、與 Dialog／Sticky Footer 明確區分使用情境、Figma Component 已建立 _(2026-07-09)_
- **[Sticky Footer](components/sticky-footer.md)** — 非模態置底常駐操作列規格：Content 三維 variant（Button only／Button + Slot／Flexible Slot）、按鈕固定滿版複用 Button、陰影 Elevation/Rise、padding 統一 Spacing/16、可獨立使用或嵌入 BottomSheet 搭配、Figma Component 已建立 _(2026-07-09)_
- **[ListItem](components/list-item.md)** — 通用列表列外殼規格：Leading Icon／Divider 為 Boolean property，Trailing 為三選一 Variant（Icon/Slot/None）、與 PriceText（明細類列表，未來另立 Pattern）明確區分使用情境、token 零新增（Trailing 數值文字複用 Body/L+Bold 強調規則）、Figma Component 已建立 _(2026-07-13)_
- **[Snackbar](components/snackbar.md)** — 底部浮動非阻斷式通知規格：Tone（Default/Success/Error）× Icon（跟 Tone 綁定，非獨立 variant）× Action（Boolean）三維、三個 Tone 共用深底 `Background/Inverse`（不隨語意變色，經 WCAG 對比度驗證決定）、新增此語意 token、Action 文字採 `Label/S`、Message／Action label 皆為 Figma Text component property、現況 17 處呼叫（11 wrapper + 6 inline）待整併、Figma Component 已建立 _(2026-07-13)_
- **[Card](components/card.md)** — 通用容器底座規格：Layout（Fill/Inset）× Padding（Standard/None）兩維 variant，陰影不分 Layout 一律套用 `Elevation/Drop`，Inset 圓角改用 `Radius/4` 呼應 Button 專業調性、Fill/Inset 判斷定調為軟性指引而非硬性規則、現況 7+ 處重複實作待整併為 `AppCard`、Figma Component 已建立 _(2026-07-14)_

## Patterns

版型文件陸續建立中。

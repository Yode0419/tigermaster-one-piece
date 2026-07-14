# Avatar

顯示使用者（客戶、師傅、客服）頭像的圓形圖片元件，統一處理有照片與無照片（佔位圖）兩種顯示情況。

> **元件邊界**：本規格僅涵蓋頭像的顯示邏輯（尺寸、圓角、佔位圖）。換頭像用的相機圖示疊加屬於「Avatar + IconButton」的複合用法，不是 Avatar 自身的 variant，詳見下方使用規則。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，`HeadshotImage`（`lib/component/image/headshot_image.dart`）9 處使用情境比對（聊天泡泡、聊天室列表、帳號頁 Header、評價頁、語音通話畫面）+ `HeadshotImageSetting`（`lib/component/image/headshot_image_setting.dart`）比對_
_最後更新：2026-07-09_

---

## Variants

| 維度 | 值 |
|------|-----|
| Size | `36` / `60` / `75` / `100` / `140` |
| Source | `Custom`（`url` 有效且成功載入，顯示真實頭像）／`Default`（無照片或載入失敗，統一顯示品牌老虎佔位圖） |

### Size 使用場景對照

| Size | 尺寸 | 使用場景 |
|------|------|---------|
| `36` | 36×36px | 聊天泡泡旁頭像 |
| `60` | 60×60px | 列表項頭像（聊天室列表、評價頁小頭像） |
| `75` | 75×75px | 頁面 Header 頭像（帳號頁） |
| `100` | 100×100px | 大頭像展示（評價頁主視覺） |
| `140` | 140×140px | 全螢幕強調情境（語音通話） |

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 圓角 | `Radius/Full` | 既有 token，`radius.md` 已預先定義涵蓋 Avatar 用途 |
| Default 圖片 | Avatar 專屬品牌資產（老虎頭像） | 非顏色 token，是圖片 asset；刻意與 Image 元件的破圖 Error 佔位符區分 |

## 使用規則

**用於：**
- 使用者頭像顯示（客戶、師傅、客服），出現於列表、頁面 Header、通話、聊天泡泡等情境

**避免：**
- 一般遠端圖片內容（商品圖、示意圖等）一律使用 `Image` 元件，不走 Avatar
- 換頭像用的相機圖示不內建於 Avatar，改用 Avatar + `IconButton` 疊加的複合用法（見邊界情況）

## 邊界情況

- **無照片或載入失敗** → 統一顯示品牌老虎佔位圖，非 `Image` 元件定義的破圖 Error 樣式
- **聊天泡泡頭像（36px）可點擊** → 現況小於系統最小點擊區域規範（`IconButton` `sm` 40×40px），列為已知技術債，本次不處理
- **換頭像入口（Editable）** → 不納入 Avatar variant，定位為「Avatar + IconButton」複合用法；現況 `HeadshotImageSetting` 使用寫死的 `camera.png` asset，未套用既有 Icon/IconButton 系統，列為待整併技術債

## Flutter Widget

| Flutter Class | 對應 Variant | 現況說明 |
|--------------|-------------|------|
| `HeadshotImage` | Size（36/60/75/100/140）；Source 由 `url` 是否有效決定 | 圓形頭像顯示，`errorWidget` 目前指向後端 default headshot 圖（即品牌老虎佔位圖來源） |
| `HeadshotImageSetting` | 對應 Editable 複合用法 | 現況獨立實作（`InkWell` + `Stack` + 寫死的 `camera.png`），待整併為 Avatar + IconButton 疊加 |

## Figma 元件

**位置**：[TigerMaster-Design-System → Avatar](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=661-163)

---

## 待釐清事項（TBD）

- 無

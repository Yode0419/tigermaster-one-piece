# Carousel

首頁頂部的輪播廣告圖，自動切換多張 Banner，點擊開啟對應網頁。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，`CarouselBannerSwiper`（`lib/component/banner/carousel_banner_swiper.dart`）；由 figma-ssot 階段 3 師傅檔案的本機元件 `CarouselBanner` 升級_
_最後更新：2026-10-06_

---

## Variants

| 屬性 | 類型 | 值 | 說明 |
|------|------|------|------|
| Page | Variant | 1／2／3 | 決定第幾顆圓點是選中狀態 |
| Banner Image | 外露的 Image instance | Loaded | 可直接換圖，或切 Loading／Error |

圓點固定 3 顆。之後若其他元件（例如客戶端首次介紹頁）也用到相同圓點，再拆成獨立元件。

## 結構與 Design Tokens

| 部位 | 做法 | 備註 |
|------|------|------|
| 外框 | 寬度填滿、高 200 固定 | 對應程式 `height: 200` |
| 圖片 | Image，寬度填滿、高 200 | 外露，對應程式 `BoxFit.cover` |
| 分頁圓點 | 8×8 圓形，間距 `Spacing/8`，水平置中、距底 8 | 程式為 10px、間距 6、距底 10，沿用本機元件數值 |
| 選中圓點 | `Brand/TigerYellow` | 與程式 #FABF13 一致 |
| 未選中圓點 | `Border/Default` | 程式為暖灰 #B3ACA2，近似對應記在 figma-ssot 階段 3 的 reference.md |

## 使用規則

**用於：**
- 客戶端首頁、師傅首頁頂部的廣告輪播，寬度滿版

**避免：**
- 頁面內的通知或提示，用 [Banner](banner.md)
- 瀏覽多張照片，用 [PhotoViewer](photo-viewer.md)

## 邊界情況

- 自動輪播（每 3.5 秒）是互動行為，不做 variant，Figma 只畫靜止狀態
- 只有一張圖時程式不自動輪播，但仍顯示圓點；Figma 一律畫 3 顆
- 載入中程式顯示灰色 Shimmer 方塊（沒有圓點），Figma 把 Banner Image 切成 Loading 表達
- 點擊開啟 Banner 設定的網頁，沒有設定連結時點擊無反應

## Flutter Widget

| Flutter Class | 對應屬性 | 現況說明 |
|--------------|---------|------|
| `CarouselBannerSwiper` | 整個元件 | 客戶端首頁、師傅首頁共用，圖片清單由後端提供 |

## Figma 元件

**位置**：[TigerMaster-Design-System → Carousel](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=1128-117)

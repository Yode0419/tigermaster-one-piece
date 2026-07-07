# Image

顯示遠端（伺服器／CDN）圖片的基礎元件，統一處理載入中、載入完成、載入失敗三種狀態；不涵蓋本機圖片資產。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，`CustomNetworkImage`（`lib/component/image/custom_network_image.dart`）+ 8 處使用情境比對（HeadshotImage、BadgeImage、CarouselBannerSwiper、HorizontalImageList、MasterShopItemCard、L3Card、ImageMessage 等）_
_最後更新：2026-07-07_

---

## Variants

| 屬性 | 值 |
|------|-----|
| State | `Loading`（淺色遮罩佔位）／`Loaded`（正常顯示）／`Error`（統一佔位符）|

不定義 Shape variant（方形／圓角／圓形）。裁切、圓角由外層元件（如 Avatar 的 `ClipRRect`）自行決定，Image 元件本身不擁有形狀邏輯。

`auth`、`cached` 為 Flutter 資料層設定（是否帶授權 header、是否使用快取），非視覺 variant，不對應 Figma 屬性。

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| Loading 佔位底色 | `Background/OverlaySubtle` | `rgba(0, 0, 0, 0.08)`，單一淺色遮罩，取代原先的雙色 shimmer 設計；為此元件新增的 semantic token _(2026-07-07)_ |
| Error 佔位符 icon | `Icon/Subtle` | `Neutral/500`，圖示改為破圖樣式（相框+裂痕，Phosphor `ImageBroken`），色彩沿用此 token |

無 radius token——本元件不擁有裁切/圓角邏輯。

## 使用規則

**用於：**
- 需從伺服器／CDN 載入的遠端圖片

**避免：**
- 本機圖片資產（icon、插圖等），一律用 `Image.asset`，不經過本元件

## 邊界情況

- `url` 為空 → 顯示統一 Error 佔位符（非空白 Container）
- `auth=true` 但登入 token 遺失 → 規格上應改為顯示統一 Error 佔位符；現況退化為 `SizedBox.shrink` 空白，列為待修正技術債
- 圖片比例與容器不符 → 由呼叫端指定的 `fit` 參數決定裁切／縮放行為，元件本身不額外處理

## Flutter Widget

| Flutter Class | 對應 Variant | 現況說明 |
|--------------|-------------|------|
| `CustomNetworkImage` | Loading / Loaded / Error | 統一包裝 `Image.network` / `CachedNetworkImage`，參數：`url`、`height`/`width`、`fit`、`auth`、`cached`、`errorWidget` |

**現況技術債**：`errorWidget` 是否傳、傳什麼在各呼叫點不一致（如 `MasterShopItemCard`、`L3Card` 傳自訂 `error_placeholder.png`，其餘多處未傳、退化為空白 `Container()`）。規格立場：統一為 Error 佔位符，逐步修正各呼叫點。

## Figma 元件

**位置**：[TigerMaster-Design-System → Image](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=603-10)

---

## 待釐清事項（TBD）

- 無

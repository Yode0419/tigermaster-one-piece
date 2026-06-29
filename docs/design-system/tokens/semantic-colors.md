# Semantic Color Tokens

## 概述

定義 TigerMaster App 中所有語意化顏色 token，作為元件配色的唯一引用來源。
分為 6 個群組，底層對應 [colors.md](colors.md) 的 Primitive token。

_來源：設計訪談 + Flutter codebase（`fdtigermaster_app` v2.6.1）審查_
_最後更新：2026-06-29 — 新增 Icon/Subtle_

---

## 背景與脈絡

`colors.md` 的 Primitive token 僅記錄原始色值，不帶語意。
Semantic token 是實際在元件中應引用的顏色：它說明「這個顏色用在什麼角色」，而不是「這個顏色是什麼色值」。

本文件透過多張 app 截圖與 codebase 審查共同驗證，確保每個 token 有對應的實際使用情境。

---

## 色彩架構

```
Primitive token（原始色值）
    └── Semantic token（語意角色）← 元件引用這一層
```

元件設計時只能引用 Semantic token，不可直接引用 Primitive token 或 hardcode 色值。

---

## Token 定義

### Text

文字顏色。用於所有可閱讀的文字角色。

| Token | 對應 Primitive | 色值 | 使用情境 |
|-------|--------------|------|---------|
| `Text/Primary` | `Neutral/950` | `#23242A` | 主要文字、標題、列表項目內容 |
| `Text/Secondary` | `Neutral/800` | `#4F4F54` | 次要說明文字、地址、輔助資訊 |
| `Text/Hint` | `Neutral/600` | `#727276` | 標籤、placeholder、時間戳、字數計算 |
| `Text/Link` | `Blue/500` | `#3A89F8` | 行內連結、可點擊行動文字（查看需求、法律條款、+ 選擇常用地址）|
| `Text/Brand` | `Brand/TigerBlue` | `#1F286F` | 品牌色強調標題（如報價單段落分類標題）|

---

### Background

表面底色。用於頁面層、卡片層、遮罩層。

| Token | 對應 Primitive | 色值 | 使用情境 |
|-------|--------------|------|---------|
| `Background/Page` | `Neutral/100` | `#F5F5F5` | 整個頁面底色 |
| `Background/Card` | `Base/White` | `#FFFFFF` | 白色卡片、BottomSheet、輸入框底 |
| `Background/Overlay` | `Base/Overlay` | `rgba(0, 0, 0, 0.63)` | Modal、BottomSheet 後方的半透明遮罩 |

---

### Icon

圖示顏色。TigerMaster 主要使用 Phosphor Duotone 圖示，由兩層顏色組成。

| Token | 對應 Primitive | 色值 | 使用情境 |
|-------|--------------|------|---------|
| `Icon/Default` | `Neutral/950` | `#23242A` | Duotone 深色主體層；單色 icon（箭頭、chevron）|
| `Icon/Subtle` | `Neutral/600` | `#727276` | 輔助性、弱化的 icon（TextField suffix、次要說明圖示）|
| `Icon/Brand` | `Brand/TigerYellow` | `#FABF13` | Duotone 黃色填色層；底部導覽列選中狀態 |
| `Icon/Inverse` | `Base/White` | `#FFFFFF` | 深色底上的 icon（底部導覽列非選中狀態）|
| `Icon/Interactive` | `Blue/500` | `#3A89F8` | Outlined 互動按鈕內的 icon |

---

### Border

框線顏色。用於分隔線、輸入框、按鈕外框。

| Token | 對應 Primitive | 色值 | 使用情境 |
|-------|--------------|------|---------|
| `Border/Default` | `Neutral/200` | `#EDEDED` | 列表分隔線、區塊間距線、Neutral outlined 按鈕邊框 |
| `Border/Subtle` | `Neutral/500` | `#9E9E9E` | 輸入框預設邊框（★ 見設計債）|
| `Border/Focus` | `Blue/500` | `#3A89F8` | 輸入框 focused 狀態外框 |
| `Border/Error` | `Red/400` | `#FF2851` | 輸入框 error 狀態外框 |
| `Border/Interactive` | `Blue/500` | `#3A89F8` | Outlined 按鈕邊框（查看詳情、刪除等次要操作）|

---

### Interactive

可互動元件的品牌配色。用於按鈕、Tab、Chip 等互動元件。

**停用狀態**：按鈕停用一律透過整體 opacity 40% 處理，不使用獨立顏色 token。

| Token | 對應 Primitive | 色值 | 使用情境 |
|-------|--------------|------|---------|
| `Interactive/Primary` | `Brand/TigerBlue` | `#1F286F` | 品牌深藍互動色，filled 時作為底色，outlined / ghost 時作為前景色，視情境選用 |
| `Interactive/OnFilled` | `Base/White` | `#FFFFFF` | 填色互動元件上的文字與 icon |
| `Interactive/Brand` | `Yellow/450` | `#FFC827` | 品牌黃填色按鈕底色；Chip 選中底色；聊天室自方訊息氣泡底色 |
| `Interactive/OnBrand` | `Neutral/950` | `#23242A` | 品牌黃按鈕上的文字與 icon |
| `Interactive/Action` | `Blue/500` | `#3A89F8` | 藍色互動色，filled 時作為底色，outlined / ghost 時作為前景色，視情境選用 |

---

### Status

狀態回饋顏色。用於成功、錯誤、資訊等系統狀態的前景色與容器底色。

TigerMaster 無「警告（Warning）」狀態，緊急或警示情境統一使用 Error。

| Token | 對應 Primitive | 色值 | 使用情境 |
|-------|--------------|------|---------|
| `Status/Success` | `Green/500` | `#2ECC71` | 成功狀態文字、圖示、badge |
| `Status/SuccessContainer` | `Green/100` | `#EDFFF4` | 成功狀態底色（備用，目前 app 未啟用）|
| `Status/Error` | `Red/400` | `#FF2851` | 錯誤文字、圖示、輸入框錯誤狀態 |
| `Status/ErrorContainer` | `Red/150` | `#FFCCD6` | 錯誤底色（Snackbar、錯誤提示區塊）|
| `Status/Info` | `Blue/500` | `#3A89F8` | 資訊文字、說明區塊、日曆 today 框線 |
| `Status/InfoContainer` | `Blue/100` | `#EBF3FF` | 資訊底色（報價 Chip 底色、資訊提示卡片）|

---

## 已知設計債

| 問題 | 說明 | 建議處理時機 |
|------|------|------------|
| `Border/Subtle` 色差 | codebase 輸入框預設邊框為 `#A0A0A0`，與 `Neutral/500`（`#9E9E9E`）有落差 | TextField 元件備料時統一 |
| 按鈕邊框未指定 | 「切換為師傅帳號」「登出」使用 Flutter Material 2 預設邊框，已定義使用 `Border/Default` | ✅ Button 元件備料時確認 |
| `Status/Error` 誤用 | 「師傅收入」金額 Chip 使用紅色做視覺強調，非錯誤語意 | Tag 元件備料時建立 Emphasis variant |

---

## 觀察候選 token

下列顏色角色目前只出現在單一情境，暫不建立 token。若未來出現第二個使用場景，再提升為正式 token。

| 候選角色 | 色值 | 目前唯一情境 |
|---------|------|------------|
| `Background/Notice` | `Yellow/100`（`#FFF9E7`）| 確認發票設定 BottomSheet 的注意事項底色 |

---

## 待釐清事項（TBD）

- [ ] `Status/SuccessContainer`（`Green/100`）：備用定義，實際顯示效果待有使用場景時驗證

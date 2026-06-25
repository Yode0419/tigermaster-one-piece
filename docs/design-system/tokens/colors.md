# Color Tokens

_來源：Figma Design System / Foundations > Color / Primitive_
_Figma 檔案：TigerMaster-Design-System（`X00A5f1Ohj9BhgbMXwzNuM`）_
_最後同步：2026-06-25_

---

## 色彩架構說明

顏色分為兩層：

- **Primitive（原始色票）**：原始色值，按色相分組，不代表特定語意。命名規則：`色相/數值`（數值越大越深）。
- **Semantic（語意化 token）**：在 Primitive 之上賦予語意，是實際使用時應引用的 token。

---

## Primitive Color Tokens

### Brand

| Token | 色值 | 說明 |
|-------|------|------|
| `Brand/TigerBlue` | `#1F286F` | 師虎主品牌深藍 |
| `Brand/TigerYellow` | `#FABF13` | 師虎主品牌黃 |

### Base

| Token | 色值 |
|-------|------|
| `Base/White` | `#FFFFFF` |
| `Base/Black` | `#000000` |

### Blue

| Token | 色值 |
|-------|------|
| `Blue/100` | `#EBF3FF` |
| `Blue/200` | `#BFDAFF` |
| `Blue/300` | `#93C0FF` |
| `Blue/400` | `#67A6FF` |
| `Blue/500` | `#3A89F8` |
| `Blue/600` | `#2770D6` |
| `Blue/700` | `#1759B4` |
| `Blue/800` | `#0B4392` |

### Yellow

| Token | 色值 |
|-------|------|
| `Yellow/100` | `#FFF9E7` |
| `Yellow/200` | `#FFEBB2` |
| `Yellow/300` | `#FFDE7D` |
| `Yellow/400` | `#FFD048` |
| `Yellow/450` | `#FFC827` |
| `Yellow/500` | `#FABF13` |
| `Yellow/600` | `#C79400` |
| `Yellow/700` | `#946E00` |

> `/450` 為額外補充的中間色，用於特定高飽和情境。

### Green

| Token | 色值 |
|-------|------|
| `Green/100` | `#EDFFF4` |
| `Green/200` | `#B7FFD5` |
| `Green/300` | `#81FFB6` |
| `Green/400` | `#48F591` |
| `Green/500` | `#2ECC71` |
| `Green/600` | `#1AA354` |
| `Green/700` | `#0B7A3A` |
| `Green/800` | `#025223` |

### Red

| Token | 色值 |
|-------|------|
| `Red/100` | `#FFE9ED` |
| `Red/150` | `#FFCCD6` |
| `Red/200` | `#FFA9B9` |
| `Red/300` | `#FF6885` |
| `Red/400` | `#FF2851` |
| `Red/500` | `#D61338` |
| `Red/600` | `#AD0424` |
| `Red/700` | `#850019` |

> `/150` 為額外補充的中間色，用於錯誤狀態的淡色背景情境。

### Neutral

| Token | 色值 |
|-------|------|
| `Neutral/100` | `#F5F5F5` |
| `Neutral/200` | `#EDEDED` |
| `Neutral/300` | `#D3D3D3` |
| `Neutral/400` | `#BABABA` |
| `Neutral/500` | `#9E9E9E` |
| `Neutral/600` | `#727276` |
| `Neutral/700` | `#69696D` |
| `Neutral/800` | `#4F4F54` |
| `Neutral/900` | `#2A2A2A` |
| `Neutral/950` | `#23242A` |

### ProGradient

用於 Pro 會員相關 UI 的漸層色組，僅限 Pro 功能區塊使用。

| Token | 色值 |
|-------|------|
| `ProGradient/DarkNavy` | `#0D1A74` |
| `ProGradient/Navy` | `#1F2A73` |
| `ProGradient/DeepBlue` | `#0014B0` |
| `ProGradient/MidBlue` | `#1438BB` |
| `ProGradient/LightBlue` | `#3090E4` |

---

## Semantic Color Tokens

語意化 token 是實際在元件中應引用的顏色，底層對應到 Primitive token。

### Text

| Token | 色值 | 對應 Primitive | 使用情境 |
|-------|------|----------------|----------|
| `Text/Primary` | `#23242A` | `Neutral/950` | 主要文字、標題 |
| `Text/Secondary` | `#4F4F54` | `Neutral/800` | 次要文字、說明文字 |
| `Text/Hint` | `#727276` | `Neutral/600` | 提示文字、placeholder、輔助說明 |

> **待補充**：其他語意 token 群組（Background、Border、Status、Interactive 等）在整理中，將於後續版本補入。

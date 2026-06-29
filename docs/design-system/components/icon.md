# Icon

圖示容器元件，統一管理 app 內兩套圖示系統的尺寸與對齊。
提供 `Phosphor`（功能性圖示）與 `slot`（自由插入）兩種模式。

> **元件邊界**：此規格僅涵蓋圖示容器本身（尺寸 + 對齊）。
> 顏色由使用情境（IconButton、AppBar 等父元件）決定，不在此元件內定義。

---

## Variants

| 維度 | 值 | 說明 |
|------|----|------|
| `Icon` | `Phosphor` / `slot` | `Phosphor`：預填 Phosphor 功能性圖示；`slot`：空白插槽，可放入任意向量或圖片 |
| `Size` | `24` / `20` / `16` | 圖示邊框尺寸（px） |

---

## 圖示系統說明

App 使用兩套圖示系統，此元件同時支援兩者：

| 圖示系統 | 來源 | 用途 | 對應 variant |
|----------|------|------|-------------|
| **Material Icons**（`Icons.*`） | Flutter 內建 | 互動操作圖示：返回、關閉、傳送、通知 | `slot` |
| **Phosphor Icons**（PNG assets） | `assets/images/icons/` | 功能性 / 類別圖示：服務分類、首頁功能卡 | `Phosphor` |

Phosphor Icons 包含雙色版本（Duotone），檔名前綴為 `colored_`，例如：`colored_tool.png`。
Duotone 配色為品牌規格：主色黑色（default）+ 品牌黃作為強調色。

---

## Size 規格

| Size | 尺寸 | 常見使用場景 |
|------|------|------------|
| `24` | 24×24px | AppBar 圖示、IconButton md |
| `20` | 20×20px | IconButton sm、行內次要圖示 |
| `16` | 16×16px | 標籤內嵌、輔助說明圖示 |

---

## Design Tokens

此元件本身不綁定顏色 token，顏色由父元件透過 variable override 決定。

| 屬性 | 處理方式 |
|------|---------|
| 顏色 | 由父元件設定（如 `Icon/Default`、`Icon/Inverse`） |
| 尺寸 | 由 `Size` variant 決定，固定值（24 / 20 / 16px） |

---

## 使用規則

**用於：**
- 作為 `IconButton` 的圖示內容（搭配 `slot` 放入 Material Icon）
- 作為 `AppBar`、`BottomNavBar` 等導覽元件的圖示
- 作為功能卡、分類頁的 Phosphor 功能性圖示

**避免：**
- 在此元件內直接 hardcode 顏色（應由父元件控制）
- 混用 Material Icon 與 Phosphor 於同一個圖示脈絡（兩套系統的視覺風格不同）
- 將 Phosphor Duotone（雙色）與 Material Icon 並列於同一列操作按鈕

**Phosphor Duotone 說明：**
雙色圖示（Duotone）不需獨立 variant，在 `Phosphor` variant 以 override 方式填入對應圖片即可。
Duotone 配色固定為品牌規格（主色黑色 + 品牌黃），不應自行更換顏色組合。

---

## 邊界情況

- **`slot` 為空時**：容器為空白透明框，不顯示佔位內容；設計時需主動放入圖示才有視覺呈現
- **顏色衝突**：Icon 元件不持有顏色，父元件 override 優先；若父元件未設定，繼承框架預設色
- **Phosphor Duotone 使用限制**：雙色圖示僅用於功能分類場景，不應出現在互動按鈕（AppBar / BottomNavBar）

---

## Flutter Widget

| 圖示類型 | Flutter 寫法 |
|----------|-------------|
| Material Icons | `Icon(Icons.close, size: 24)` |
| Phosphor（PNG）| `Image.asset('assets/images/icons/tool.png', width: 24)` |
| Phosphor Duotone | `Image.asset('assets/images/icons/colored_tool.png', width: 24)` |

---

## Figma 元件

**位置**：[TigerMaster-Design-System → Icon](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=219-88)


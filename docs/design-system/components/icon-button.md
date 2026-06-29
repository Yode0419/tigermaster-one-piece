# IconButton

純圖示互動觸發點，不帶文字標籤，用於 AppBar 導覽操作、BottomSheet 關閉、頁面快捷行動。

> **元件邊界**：此規格僅涵蓋獨立 IconButton。TextField 內嵌的 suffix icon button 屬於 `TextField` 元件規格範疇。帶文字標籤的圖示按鈕請見 `LabeledIconButton`。

---

## Variants

| 維度 | 值 | 說明 |
|------|----|------|
| `variant` | `ghost` / `filled` | ghost = 透明底；filled = 白底圓形，用於疊加圖片的場景 |
| `size` | `md` / `sm` | 見下方 Size 規格 |
| `tone` | `default` / `inverse` | **僅 ghost 適用**；filled 不支援 tone（白底已自帶對比）|
| `state` | `default` / `pressed` / `disabled` | 全部 variant 適用 |

**無效組合**：`filled` + `tone`（不存在）

---

## Design Tokens

### Ghost variant

| 屬性 | tone: default | tone: inverse |
|------|--------------|--------------|
| Background | transparent | transparent |
| Icon 色 | `Icon/Default` | `Icon/Inverse` |
| 使用場景 | 淺色 AppBar、BottomSheet | 深色或半透明 AppBar、圖片全螢幕檢視 |

### Filled variant（固定 tone: default）

| 屬性 | Token |
|------|-------|
| Background | `Background/Card` |
| Shape | `Radius/Full` |
| Icon 色 | `Icon/Default` |

### Size 規格

| Size | Icon 尺寸 | Tap Target | Filled 圓圈容器 | 圓圈內距 |
|------|----------|-----------|----------------|---------|
| `md` | 24px | 48×48px | 32×32px | `Spacing/4` |
| `sm` | 20px | 40×40px | 28×28px | `Spacing/4` |

### 狀態視覺

| State | 視覺處理 |
|-------|---------|
| `default` | 正常顯示 |
| `pressed` | Material InkWell splash，foreground 12% 透明疊加 |
| `disabled` | 整體 `opacity: 40%`，不修改底層顏色 |

---

## 使用規則

**用於：**
- AppBar leading — 返回、關閉（`ghost / tone: default`，淺色底）
- AppBar actions — 通知、下載、語音通話（`ghost / tone: default`）
- 圖片封面頁、商品詳情頁 AppBar leading — 疊圖關閉（`filled / sm`）
- BottomSheet 標題欄 leading / tailing — 關閉（`ghost / tone: default`）

**避免：**
- 在非圖片疊加場景使用 `filled`（對一般頁面背景過度視覺強調）
- 在同一 AppBar 混用 `ghost/default` 和 `ghost/inverse`（背景色應一致）
- 直接 hardcode `Colors.black`、`Colors.white`，應使用對應 token
- 在 TextField 內使用本元件作為 suffix（屬於 TextField 規格，應使用 `Icon/Subtle`）

---

## 邊界情況

- **無文字**：icon 本身語意必須足夠清晰；無法自我說明時補 `Tooltip` 或 `semanticsLabel`
- **Tap Target 最小值**：`sm` 為 40×40px，確保觸控舒適度，不可壓縮
- **Disabled**：整體 `opacity: 40%`，同 Button 規則，不另設顏色 token

---

## Flutter Widget

| Flutter Class | 角色 |
|--------------|------|
| `IconButton`（Flutter Material 2）| 所有 variant 的基礎 widget |
| 無自訂包裝 | `filled` variant 透過 `icon: Container(decoration: BoxDecoration(color: Colors.white, shape: BoxShape.circle), child: Icon(...))` 實作圓圈背景，尚未抽成共用 widget |

---

## Figma 元件

**位置**：[TigerMaster-Design-System → Button → IconButton](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=197-3705)


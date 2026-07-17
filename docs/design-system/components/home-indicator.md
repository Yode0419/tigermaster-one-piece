



# HomeIndicator

疊加於完整手機畫面最下層的系統手勢列裝飾，代表返回主畫面的手勢區域，純視覺裝飾、不可互動。所有代表完整手機畫面的 Frame 都必須有（不論 375 或 393），與 [StatusBar](status-bar.md) 頭尾成對出現。

> **元件邊界**：本元件永遠**無自身背景填色**（透明），底層內容（多為 [Sticky Footer](sticky-footer.md)／[BottomNavBar](bottom-nav-bar.md)／[ChatInputBar](chat-input-bar.md)）透出來。詳見下方「組裝規則」。

_來源：本次 Frame 尺寸決策（375×812 → 393×852 並存）延伸出的系統 chrome 元件備料；Figma Component 已建立_
_最後更新：2026-07-17_

---

## Variants

| 維度 | 值 |
|------|-----|
| Style | `Light`（白色膠囊，用於深色背景畫面）／`Dark`（黑色膠囊，用於淺色背景畫面） |

不需要 Frame Group 維度——375／393 高度皆 34pt，無差異。膠囊尺寸固定 **134pt 寬、置中**，不隨容器寬度縮放（對應真實 iOS 行為）。

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| Light 膠囊色 | `Base/White` | ⚠ 刻意例外，見下方說明 |
| Dark 膠囊色 | `Base/Black` | ⚠ 刻意例外，見下方說明 |

⚠ **Primitive Token 例外**：與 [StatusBar](status-bar.md) 同一條例外規則——直接引用 Primitive token `Base/White`／`Base/Black`，因需精準對應真實 OS 渲染色，非一般元件的 Semantic-only 規則。

## 使用規則

**用於：**
- 所有代表完整手機畫面的 Frame 最下方，固定貼齊底部
- 每個畫面 Frame 僅出現一次

**避免：**
- 單一元件的獨立展示／spec 文件範例不需疊加

## 組裝規則

- HomeIndicator 直接作為置底元件（[Sticky Footer](sticky-footer.md)／[BottomNavBar](bottom-nav-bar.md)）的**內嵌 instance**，由各自的 `Reserve Home Indicator` Boolean 控制顯示／隱藏；[ChatInputBar](chat-input-bar.md) 沿用外層 Sticky Footer instance 曝露的同一個屬性，非獨立設定
- Style 判斷邏輯與 StatusBar 一致：置底元件為 Image 背景時，由暗化遮罩保證用 `Light`；Solid／Brand 依實際底色人工挑選

## 邊界情況

- 膠囊寬度固定 134pt，不因容器寬度（375 vs 393）縮放

## 已翻盤的舊規則

`sticky-footer.md`（2026-07-09）原本記載「底部安全區域（Home Indicator）純行為規則，Flutter 用 `SafeArea` 處理，不寫入 Figma 視覺規格」。此規則的前提是「畫面不畫 HomeIndicator」，現已因「所有完整畫面都要顯示 HomeIndicator」的決策不再成立，正式翻盤——改為 `Reserve Home Indicator` Boolean 直接內嵌 HomeIndicator instance。

## Flutter Widget

無對應 App 內元件——Home Indicator 為系統原生渲染（手勢導航裝置專屬），App 不控制其顏色，系統自動依畫面底色調整。此 Figma 元件純粹用於 Prototype 展示，不對應可實作的 Flutter widget。

## Figma 元件

**位置**：[TigerMaster-Design-System → Device → HomeIndicator](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=959-62)（Component Set，Style 共 2 個 variant）

---

## 待釐清事項（TBD）

- 無

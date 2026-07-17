# StatusBar

疊加於完整手機畫面最上層的系統列裝飾，顯示時間／訊號／Wi-Fi／電量，純視覺裝飾、不可互動。所有代表完整手機畫面的 Frame 都必須有（不論 375 或 393、不論是否為教學行銷用途），讓 Prototype／Mockup 看起來像真實裝置畫面。

> **元件邊界**：本元件永遠**無自身背景填色**（透明），對應真實 iOS 行為——底層內容（多為 [AppBar](app-bar.md)）透出來。詳見下方「組裝規則」。

_來源：本次 Frame 尺寸決策（375×812 → 393×852 並存）延伸出的系統 chrome 元件備料，Apple HIG 官方文件（iOS Status Bars 頁面）與 Figma 社群套件交叉驗證；Figma Component 已建立_
_最後更新：2026-07-17_

---

## Variants

| 維度 | 值 |
|------|-----|
| Frame Group | `375`（瀏海機型，44pt 高）／`393`（Dynamic Island 機型，59pt 高，額外含黑色 Dynamic Island 造型） |
| Style | `Light Content`（白色圖示／文字，用於深色背景畫面）／`Dark Content`（黑色圖示／文字，用於淺色背景畫面） |

時間固定顯示 **9:41**（Apple 行銷素材慣例），搭配滿格訊號／Wi-Fi／電量圖示，不做可變化內容。

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| Light Content 圖示／文字 | `Base/White` | ⚠ 刻意例外，見下方說明 |
| Dark Content 圖示／文字 | `Base/Black` | ⚠ 刻意例外，見下方說明 |
| Dynamic Island 本體（393 專屬） | `Base/Black`（固定，不隨 Style 變化） | 硬體造型，非語意色 |

⚠ **Primitive Token 例外**：`semantic-colors.md` 規定元件只能引用 Semantic token，不可直接引用 Primitive token。StatusBar 因需精準對應真實 OS 渲染色（純黑／純白，而非 App 慣用的近黑 `Icon/Default` #23242A），刻意允許直接引用 Primitive token `Base/White`／`Base/Black`，此為明確記錄的例外，非疏漏。

## 使用規則

**用於：**
- 所有代表完整手機畫面的 Frame 最上方，固定貼齊頂部，搭配 [HomeIndicator](home-indicator.md) 一起使用
- 每個畫面 Frame 僅出現一次

**避免：**
- 單一元件的獨立展示／spec 文件範例不需疊加

## 組裝規則

- StatusBar 直接作為 [AppBar](app-bar.md) 的**內嵌 instance**，由 AppBar 的 `Reserve Status Bar` Boolean 控制顯示／隱藏（開＝顯示 StatusBar；關＝不顯示）
- 內嵌 instance 固定使用其中一組 Frame Group（375 或 393），跨尺寸群組畫面需手動更換成對應的 instance，非自動切換
- **Image 背景對比**：`app-bar.md` 既有的 12% 暗化遮罩（`rgba(0,0,0,0.12)`）已保證白字／白圖示對比，Image 背景搭配時 Style 固定用 `Light Content`，不需人工判斷
- **Solid／Brand 背景**：底色為設計時已知的固定值，風險低，Style 由設計師依實際底色人工挑選（正常設計判斷，非懸而未決事項）

## 邊界情況

- 393 群組的 Dynamic Island 造型固定黑色橢圓，不隨 Style 變化，且不可被截圖／內容遮擋

## Flutter Widget

無對應 App 內元件——StatusBar 為 iOS 系統原生渲染，App 僅能透過 `SystemUiOverlayStyle`（如 `AppBar.systemOverlayStyle`）控制圖示明暗（對應 Style 變體）。此 Figma 元件純粹用於 Prototype 展示，不對應可實作的 Flutter widget。

## Figma 元件

**位置**：[TigerMaster-Design-System → Device → StatusBar](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=959-56)（Component Set，Frame Group × Style 共 4 個 variant）

---

## 待釐清事項（TBD）

- 無

# Layout / Frame 尺寸

_性質：專案規則文件，非 Figma variable/token，無對應 Figma 節點_
_最後更新：2026-07-17 — 補上 AppBar／Sticky Footer／BottomNavBar 內嵌 StatusBar／HomeIndicator instance 的組裝方式_

---

## 說明

既有畫面幾乎全數使用 375×812（對應 iPhone X／XS／11 Pro／12 mini／13 mini 等瀏海機型，mini 系列已停產）。iPhone 15 之後（含非 Pro）全數改用 Dynamic Island，瀏海比例已不符合主流機型現況，尤其影響畫面被拿來做教學或行銷素材時的觀感。

這份規則同時是為了讓 AI 生成介面有唯一可依循的標準——避免每次生成都要判斷該用哪個尺寸。

---

## Frame 尺寸標準

| 用途 | 尺寸 | 對應機型 |
|---|---|---|
| **新畫面標準尺寸**（含 AI 生成） | **393×852** | iPhone 14 Pro／15／15 Pro／16 等 Dynamic Island 機型 |
| 既有畫面現況尺寸（不強制遷移） | 375×812 | iPhone X／XS／11 Pro／12 mini／13 mini 等瀏海機型（mini 系列已停產） |

## 安全區高度差異

兩種尺寸不只寬高不同，StatusBar 高度也不同，不可直接套用：

| 機型群組 | StatusBar 高度 | Home Indicator 底部安全區 |
|---|---|---|
| 375×812（瀏海） | 44pt | 34pt |
| 393×852（Dynamic Island） | 59pt | 34pt |

---

## 使用規則

- 所有新畫面（不論人工繪製或 AI 生成）一律使用 **393×852**，不再新增 375×812 的新畫面
- 既有 375×812 畫面**不強制回頭改**，維持現況；除非該畫面被判斷為可能用於教學／行銷素材（對外展示），才優先排入遷移
- 兩種尺寸畫面會長期並存於同一 Figma 檔案中，非過渡期限定的暫時狀態
- 元件本身（Button／Card／TextField 等）多為 auto-layout、寬度隨容器彈性調整，不綁定特定 frame 寬度，遷移 Frame 尺寸對元件庫本身影響有限；真正需要跟著畫面尺寸分開定義的是 StatusBar／HomeIndicator 這類直接代表螢幕尺寸的元件
- StatusBar／HomeIndicator 元件規格需依畫面所屬尺寸群組分開定義，不可混用（例如 375 寬畫面不可搭配 59pt 高的 393 版 StatusBar）
- [AppBar](../components/app-bar.md)、[Sticky Footer](../components/sticky-footer.md)、[BottomNavBar](../components/bottom-nav-bar.md) 透過 `Reserve Status Bar`／`Reserve Home Indicator` Boolean 直接內嵌 [StatusBar](../components/status-bar.md)／[HomeIndicator](../components/home-indicator.md) instance；內嵌 instance 固定其中一組 Frame Group，跨尺寸群組需手動更換

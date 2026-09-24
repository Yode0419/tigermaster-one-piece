# Design Frame 尺寸標準：決策摘要

_整理日期：2026-09-24 ｜ 知識文件：[Layout / Frame 尺寸](../../../design-system/tokens/layout.md)_

## 最終做法

新畫面（人工繪製或 AI 生成）一律使用 393×852（Dynamic Island 機型）。StatusBar／HomeIndicator 依 375 與 393 兩個尺寸群組分開定義，不可混用；代表完整手機畫面的 Frame 都要顯示系統列，AppBar／Sticky Footer／BottomNavBar／ChatInputBar 為此加上 `Reserve Status Bar`／`Reserve Home Indicator` Boolean。既有 375×812 畫面不逐一遷移，由 figma-ssot 專案統一以 393 重畫進正式主檔。

## 關鍵決策

| 決策 | 為什麼這樣決定 | 出處 |
|---|---|---|
| 新畫面唯一標準尺寸 393×852 | AI 生成需要唯一、無歧義的尺寸；Dynamic Island 已是主流，瀏海 mini 系列已停產 | [frame-size-standard.md](frame-size-standard.md) |
| StatusBar／HomeIndicator 依尺寸群組分開定義（44pt／59pt） | 這兩個元件直接代表螢幕尺寸；Button、Card 等 auto-layout 元件不受 frame 寬度影響 | [frame-size-standard.md](frame-size-standard.md) |
| 完整手機畫面必須顯示系統列，四個元件加留白 Boolean | 讓畫面可直接用於教學／行銷素材；翻盤 Sticky Footer 原「安全區不進 Figma」舊規則 | [frame-size-standard.md](frame-size-standard.md) |
| 既有畫面改由 figma-ssot 全部以 393 重畫（2026-09-24） | figma-ssot 階段 3 本來就要重畫所有現行畫面，不需要另列優先遷移清單 | [figma-ssot 總覽](../../in-progress/figma-ssot/figma-ssot-overview.md) |

## 曾考慮但未採用

| 方案 | 為何放棄 |
|---|---|
| 暫定做法：375 寬但畫成 Dynamic Island 造型 | 不對應任何真實機型，只是讓 Prototype 看起來現代的妥協 |
| 方案 A：一次把所有既有畫面 resize 到 393 | 改 frame 邊界修不好內部排版（絕對定位、safe area 假設），工作量與風險過高 |
| 方案 B：只在畫面被觸碰時順便升級 | 低頻畫面可能永遠不會被汰換，解決不了教學／行銷素材的需求 |
| 方案 C：B 加上挑出教學／行銷畫面優先遷移 | 原本採用；2026-09-24 被 figma-ssot 全面重畫取代，清單未曾列出 |

## 設計與實作的落差

原決策寫「375 與 393 長期並存於同一 Figma 檔案，非過渡期限定」。因 figma-ssot 決定全面重畫，兩種尺寸並存改為過渡期狀態，正式主檔完成後只剩 393，舊畫面移入 Archive。

## 原始探索文件

- [Design Frame 尺寸標準：375×812 升級至 393×852](frame-size-standard.md)：2026-07-17 的決策記錄，含背景、替代方案與已知技術限制

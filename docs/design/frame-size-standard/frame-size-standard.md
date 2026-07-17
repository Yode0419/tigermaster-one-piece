# Design Frame 尺寸標準：375×812 升級至 393×852

**日期：** 2026-07-17
**狀態：** 已決定

---

## 背景

在幫 Design System 補「StatusBar／HomeIndicator」這兩個手機系統 chrome 子元件時發現，現有畫面幾乎全數使用 375×812 frame，對應的其實是 iPhone X／11 Pro／12 mini／13 mini 等「瀏海」機型，mini 系列已停產。查證後主流現況是：iPhone 15 之後（含非 Pro）全數改用 Dynamic Island，瀏海比例已偏過時，尤其影響畫面被拿去做教學或行銷素材時的觀感。

原本的暫定做法（記錄於 BACKLOG.md）是：StatusBar／HomeIndicator 先沿用 375 寬，但造型畫成 Dynamic Island——這是個不對應任何真實機型的妥協組合，純粹為了讓 Prototype 看起來現代一點。

討論過程中進一步釐清：這次整理 Design System 的主要動機之一，是要讓後續設計（含 AI 生成介面）都能有標準可循。若沒有唯一標準尺寸，AI 每次生成畫面時都得自行判斷或猜測該用哪個尺寸，等於沒有真正解決問題。

## 決定

- 新畫面（不論人工繪製或 AI 生成）一律採用 **393×852**（Dynamic Island 機型尺寸，對應 iPhone 14 Pro／15／15 Pro／16 等）
- 既有 375×812 畫面**不強制遷移**，維持現況；除非該畫面被判斷可能用於教學／行銷素材（對外展示），才優先排入遷移
- 兩種尺寸畫面長期並存於同一 Figma 檔案，非過渡期限定的暫時狀態
- StatusBar／HomeIndicator 元件依畫面所屬尺寸群組分開定義（375 群組維持 44pt 高、393 群組採真實的 59pt 高），不可混用
- 所有代表完整手機畫面的 Frame 都必須顯示 StatusBar／HomeIndicator（不論 375 或 393、不論用途），因此 AppBar／Sticky Footer／BottomNavBar／ChatInputBar 四個既有元件新增對應的留白 Boolean（`Reserve Status Bar`／`Reserve Home Indicator`），翻盤 Sticky Footer 原「安全區不進 Figma」的舊規則
- 規則落地為 [`docs/design-system/tokens/layout.md`](../design-system/tokens/layout.md)；元件規格見 [StatusBar](../design-system/components/status-bar.md)、[HomeIndicator](../design-system/components/home-indicator.md)；Figma 端「Layout Grid」基礎頁（node `174:66`）同步新增 393×852 規格範例，並修正原本 375 規格誤標為「iPhone SE」的錯誤（375×812 實際對應 iPhone X／11 Pro／12 mini／13 mini，iPhone SE 實際解析度為 375×667）

## 理由

- Dynamic Island 已是主流機型現況，瀏海機型（mini 系列）已停產，繼續以瀏海為預設值不利未來教學／行銷素材的觀感
- AI 生成介面需要唯一、無歧義的標準尺寸才能可靠依循；375／393 兩者並列可選會讓每次生成都要重新判斷，違背「整理 Design System 讓 AI 參與設計」的初衷
- 既有元件（Button／Card／TextField 等）多為 auto-layout、寬度隨容器彈性調整，不綁定固定 frame 寬度，因此把「新畫面預設尺寸」改為 393 對既有元件庫本身影響有限，真正需要跟著調整的是 StatusBar／HomeIndicator 這類直接代表螢幕尺寸的元件
- 一次性把所有既有畫面 resize（方案 A）風險過高：單純改 frame 邊界不會自動修好內部排版（絕對定位、safe area 假設等），對單人維護的知識庫而言是一筆龐大的一次性投入，且與本次動機（教學／行銷素材）不成比例

## 考慮過的替代方案

- **方案 A：一次性把所有既有畫面 resize 到 393×852** — 未採用，因為工作量與排版風險過高，且與「主要動機是行銷／教學素材」不成比例
- **方案 B：新畫面直接用 393，舊畫面完全不動、只在被觸碰到時才順便升級** — 未單獨採用，因為無法解決「教學／行銷素材」這個明確動機——低頻被觸碰的舊畫面可能永遠不會被汰換到
- **方案 C：B 的基礎上，額外挑出可能用於教學／行銷素材的少數關鍵流程優先排入遷移** — **採用（與 B 混合）**，在風險與一致性之間取得平衡

## 後果與取捨

- 好處：新畫面與 AI 生成介面自此有唯一、明確的尺寸標準；StatusBar／HomeIndicator 規格已同步在 Figma 與文件端落地，並回頭修正了 4 個既有元件的留白邏輯
- 取捨／代價：375 與 393 兩種尺寸的畫面會長期並存於同一份 Figma 檔案，瀏覽或複製既有畫面當範本時需留意所屬尺寸群組，避免拿錯 StatusBar／HomeIndicator 版本
- 已知技術限制：AppBar／Sticky Footer／BottomNavBar 的 `Reserve Status Bar`／`Reserve Home Indicator` Boolean 是直接內嵌 StatusBar／HomeIndicator instance，固定套用其中一組 Frame Group，無法自動切換，跨尺寸群組畫面需手動更換 instance
- 尚未進行的工作：哪些既有畫面屬於「教學／行銷素材」優先遷移清單，目前尚未列出

---

## 待釐清事項（TBD）

- [ ] 列出「可能用於教學／行銷素材」而應優先遷移到 393×852 的既有畫面／流程清單

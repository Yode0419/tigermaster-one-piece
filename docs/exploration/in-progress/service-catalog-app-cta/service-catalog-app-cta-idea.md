# 官網服務工項頁新增 App 導流構想

## 概述

- **類型**：既有功能優化（提升官網轉換，導流下單）
- **受影響角色**：客戶
- **狀態**：純初步構想，顧問來訪口頭提出，尚未定案、尚未進入正式設計階段
- **來源**：2026-08-31 顧問到公司拜訪時提出

---

## 問題定義

### 痛點

官網「服務工項」頁展示約 200 個工項的介紹與價格區間（見 `docs/wiki/product/service-catalog.md`），讓客戶查詢單一工項的服務範圍與參考價格。但頁面缺少引導客戶下載／前往 App 繼續叫修的設計，客戶查完資訊後容易在此流失，必須自行另外尋找 App 下載入口才能繼續下單。

### 現況（已核對前端程式碼，repo：`C:\Users\yode0\develop\source_code\fdtigermaster-offical-site`）

- 服務工項相關頁面實際上有兩個：
  - `/Service`（`src/views/Service.vue`）— 依 L1/L2/L3 分類篩選的互動清單，**完全沒有 App CTA**，未引入 `SitePromoBanner` 元件
  - `/ServiceItem`（`src/views/ServiceItem.vue`）— 約 50 項的靜態展示網格，有引入 `SitePromoBanner`（第 4 行），但用的是**預設變體**（招募師傅 CTA：「歡迎加入師虎團隊」），並非下載 App 的變體
  - 工項詳情彈窗 `src/components/Service/ServiceModal.vue`（展示價格區間、描述、保固資訊）本身也沒有 CTA
  - 全站頁尾 Footer.vue（第 60-84 行）有 App Store／Google Play 連結（「師虎來了！讓家更安心、更溫馨！」），兩個服務頁都看得到，但這是全站通用的品牌性連結，並未框定成「查完資訊、馬上叫修」的行動呼籲
- **參考發現（非現成解法）**：`SitePromoBanner.vue`（第 18-37 行）有一個 `mobileVariant="app"` 變體，文案是「立即下載 APP 叫修」，並依裝置導向 iOS App Store 或 Google Play，目前沒有用在任何服務頁面上。但這個元件原本可能是為其他用途設計，不代表能直接沿用在服務工項頁的導流情境，僅供設計時參考既有做法
- 工項資料為 API 驅動（`tigermaster.services.Level.download()`、`working_category` 查詢），非純靜態內容

### 成功標準

TBD — 尚未討論具體指標（例如：服務工項頁到 App Store／Google Play 的點擊率、後續 App 安裝轉換率等）。

---

## 設計方向

尚未進入正式設計階段，初步方向（基於現有元件推測，待確認）：

1. **`/Service` 清單頁加入 `SitePromoBanner`（app 變體）**：目前完全空白，加入成本最低。
2. **`/ServiceItem` 頁的 CTA 調整**：現有預設變體是招募師傅 CTA，需決定要替換成 app 變體、或兩者並存（雙 CTA），待確認是否會稀釋招募師傅的轉換。
3. **是否也在 `ServiceModal` 工項詳情彈窗中加入 CTA**：客戶查完單一工項細節（滾動深度較深）時可能是更即時的導流時機，但也可能與彈窗的核心功能（確認工項細節）互相干擾。
4. **需依裝置區分處理方式**：桌機瀏覽與手機瀏覽的引導下載情境不同（例如手機可直接導向對應的 App Store／Google Play，桌機無法直接安裝手機 App，可能需要 QR code 或其他轉換方式），後續設計此 CTA 流程時需要分別設計桌機與手機版的處理方式，不能套用同一套互動。

---

## 影響範圍

- `src/views/Service.vue`
- `src/views/ServiceItem.vue`
- `src/components/Service/ServiceModal.vue`（如決定加入）
- 前端 repo：`C:\Users\yode0\develop\source_code\fdtigermaster-offical-site`

---

## 待釐清事項（TBD）

- [ ] `SitePromoBanner` 的 app 變體實際設計用途為何、目前用在哪些頁面？確認後才能判斷能否參考或需另外設計
- [ ] 桌機與手機的下載引導分別要用什麼互動方式（QR code？導向對應商店？其他？）
- [ ] `ServiceItem.vue` 現有的招募師傅 CTA 是否要保留（雙 CTA）或替換
- [ ] 是否要在 `ServiceModal` 彈窗內也加 CTA，或只在頁面層級處理
- [ ] 成功標準／驗收指標
- [ ] 時間表與優先順序

---

## 決策記錄（如適用）

無正式決策，僅記錄構想方向與現況技術盤點（已核對前端程式碼確認現況屬實）。

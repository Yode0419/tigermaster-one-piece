# Figma SSOT 階段 3：畫面填入

## 概述

- **上層專案**：[Figma SSOT 專案總覽](../figma-ssot-overview.md)
- **狀態**：進行中。管理員端、師傅端全部完成並驗收；檢查點 3（流程精簡、客戶端切批次）已完成；客戶端批次 03a、03b、03c 已完成並驗收；DS 升級 2 已完成；下一步為 04a
- **開始**：2026-10-05
- **結構依據**：[建置交接包 r01](../figma-build-r01.md) 的完整結構表
- **Figma 檔案**：
  - [客戶端](https://www.figma.com/design/G3tNva2zGzIi74Aujg3cLB/APP_Client)：41 個 Section、178 個 Frame
  - [師傅端](https://www.figma.com/design/m0yuXFZN2fkivzTOcwiKJ4/APP_師傅)：23 個 Section、88 個 Frame
  - [管理員端](https://www.figma.com/design/M5DWva58qmX9Xx3V2O3c3x/APP_管理員)：6 個 Section、13 個 Frame

本文件只記進度與接下來要注意的事。填入做法在 [fill-figma-ssot Skill](../../../../../.claude/skills/fill-figma-ssot/SKILL.md)。

## 本資料夾的文件

| 文件 | 內容 | 什麼時候讀 |
|---|---|---|
| stage3.md（本文件） | 進度、客戶端待判斷 | Skill 開場整份讀 |
| [decisions.md](decisions.md) | 全部決策原文與核心原則 | 使用者與 Opus 回溯時；Skill 不讀 |
| [reference.md](reference.md) | Figma fileKey、元件與 token 的 Key | Skill 開場整份讀 |
| [approximations.md](approximations.md) | 近似對應表（使用者可填「改為」） | 程式值沒有對應 token 時用 Grep 查 |
| [components.md](components.md) | 元件候選、DS 待辦、pattern 候選 | 新增一列時；檢查點 |
| `batches/` | 一批一份紀錄 | 只讀當批 |

---

## 分批與進度

一列是一個對話（session row）。大型 Page 依 Section 切成約 12 到 15 格一段。▶ 列由 Opus 另開對話處理，沒完成前不開始後面的批次。

| 批次 | 角色 | Page：Section | Frame 數 | 狀態 | 紀錄 |
|---|---|---|---|---|---|
| 21 | 管理員端 | 1 客服聊天室 | 10 | 已完成（已驗收） | [21-admin-chatroom](batches/21-admin-chatroom.md) |
| 22 | 管理員端 | 2 帳號 | 3 | 已完成（已驗收） | [22-admin-account](batches/22-admin-account.md) |
| ▶ | 檢查點 1 | 檢討流程，整理成 Skill | — | 已完成 | |
| 12 | 師傅端 | 1 首頁與接案 | 11 | 已完成（已驗收） | [12-master-home](batches/12-master-home.md) |
| ▶ | 檢查點 2 | 一般資料頁的流程與品質 | — | 已完成 | |
| ▶ | DS 升級 | `Carousel`、`EmptyState`、`PriceRangeIndicator`、`WarrantyPill` | — | 已完成 | |
| 13a | 師傅端 | 2 訂單與報價：2.1 至 2.3 | 10 | 已完成（已驗收） | [13-master-order](batches/13-master-order.md) |
| 13b | 師傅端 | 2 訂單與報價：2.4 | 12 | 已完成（已驗收） | 同上 |
| 13c | 師傅端 | 2 訂單與報價：2.5、2.6 | 6 | 已完成（已驗收） | 同上 |
| 13d | 師傅端 | 2 訂單與報價：2.6.4、2.7、2.8 | 12 | 已完成（已驗收） | 同上 |
| 14 | 師傅端 | 3 我的收入 | 4 | 已完成（已驗收） | [14-master-income](batches/14-master-income.md) |
| 15 | 師傅端 | 4 帳號 | 13 | 已完成（已驗收） | [15-master-account](batches/15-master-account.md) |
| 16 | 師傅端 | 5 通訊 | 16 | 已完成（已驗收） | [16-master-chat](batches/16-master-chat.md) |
| 17 | 師傅端 | 6 通知 | 4 | 已完成（已驗收） | [17-master-notification](batches/17-master-notification.md) |
| ▶ | 檢查點 3 | 流程精簡（決策移出、查表與畫面類型改為按需讀取）、客戶端切批次 | — | 已完成 | |
| 03a | 客戶端 | 1 啟動與登入：1.1 啟動檢查、1.2 首次介紹 | 10 | 已完成（已驗收） | [03-client-onboarding](batches/03-client-onboarding.md) | |
| 03b | 客戶端 | 1 啟動與登入：1.3 開始與登入、1.4 簡訊驗證 | 9 | 已完成（已驗收） | 同上 |
| 03c | 客戶端 | 1 啟動與登入：1.5 註冊、1.6 忘記與重設密碼、1.7 進入 App | 13 | 已完成（已驗收） | 同上 |
| ▶ | DS 升級 2 | `DatePickerPanel` 升級進 DS（DS 待辦 11）、BottomSheet 底部雙按鈕（10）、標題列文字按鈕（12）；客戶端 2.5.3、6.1.3 會用到 | — | 已完成 | |
| 04a | 客戶端 | 2 首頁與叫修：2.1 首頁、2.2 搜尋服務、2.3 依修繕項目叫修、2.4 工項詳情 | 16 | 未開始 | |
| 04b | 客戶端 | 2 首頁與叫修：2.5 填寫叫修資訊 | 14 | 未開始 | 同上 |
| 04c | 客戶端 | 2 首頁與叫修：2.6 地址選用、2.7 確認與送出、2.8 內嵌網頁 | 8 | 未開始 | 同上 |
| 05a | 客戶端 | 3 訂單：3.1 訂單列表、3.2 媒合 | 14 | 未開始 | |
| 05b | 客戶端 | 3 訂單：3.3 媒合成功與派遣費、3.4 訂單資訊、3.5 報價確認 | 14 | 未開始 | 同上 |
| 05c | 客戶端 | 3 訂單：3.6 訂金支付、3.7 驗收 | 11 | 未開始 | 同上 |
| 05d | 客戶端 | 3 訂單：3.8 尾款支付、3.9 評價與小費 | 13 | 未開始 | 同上 |
| 05e | 客戶端 | 3 訂單：3.10 刷退、3.11 付款共用 | 8 | 未開始 | 同上 |
| 06＋07a | 客戶端 | 4 通知：4.1 通知列表（4 格）；5 帳號與會員：5.1 客戶資料與頭像、5.2 推播通知設定、5.3 常用地址（9 格） | 13 | 未開始 | 兩份紀錄（06、07） |
| 07b | 客戶端 | 5 帳號與會員：5.4 常用發票資料、5.5 更改密碼、5.6 刪除帳號、5.7 登出／角色切換、5.8 加入師傅 | 13 | 未開始 | 同 07 |
| 07c | 客戶端 | 5 帳號與會員：5.9 幫助與下單說明、5.10 Pro 介紹與升級、5.11 Pro 權益查詢 | 9 | 未開始 | 同 07 |
| 08 | 客戶端 | 6 通訊 | 13 | 未開始 | |

- 批次編號沿用交接包。Cover、Documentation、Archive 三個輔助 Page 不在階段 3 範圍內。
- 每批開始時在 `batches/` 新增一份紀錄，檔名為「批次編號-角色-Page 主題」（英文），同一批的各段共用一份。

---

## 客戶端待判斷

師傅端畫圖時留下「客戶端畫到再判斷」的事項，依批次列出。畫到該批時先看這裡；需要使用者決定的，畫那一格前先問。

- **全部批次**：本機元件不能跨檔案使用。師傅端檔案的本機元件（`OrderBasicInfo`、`OrderListCardBody`、`QuotationCategoryRow` 等）在客戶端檔案用不到；客戶端遇到相同內容時，停下來回報，由使用者決定在客戶端檔案重建本機元件，或排進 DS 升級。
- **04a（2.4 工項詳情）**：程式 `WorkingCategoryDetail` 頂部和師傅端的 `OrderCategoryCard` 相似但多一段描述，決定是否合併並升級進 DS。價格區間與保固直接用 DS `PriceRangeIndicator`、`WarrantyPill`。
- **04b（2.5.3）**、**08（6.1.3）**：日期時間選擇用 DS `Calendar`、`WheelPicker`，BottomSheet 用 Footer=None，做法見 Skill `types/bottom-sheets.md`。
- **05a（3.1 訂單列表）**：比較師傅端 `OrderListCardBody`（訂單卡）；客戶端保固訂單卡用 DS `WarrantyPill`。
- **05b（3.4、3.5）**：比較師傅端 `OrderBasicInfo`（訂單資訊卡）、`QuotationCategoryRow`、`StandardFeeItemForm`、`QuotationAmountBar`；兩個檔案都出現的，建議升級進 DS。訂單進度若需要步驟條，DS 的 StepIndicator 頁還是空的，記 DS 待辦。
- **05a（3.2 媒合失敗頁）**：用 DS `EmptyState` Size=Page，插圖在上、標題在下（照 DS，不照程式的標題在上）。
- **06（4.1）**：通知列和師傅端 `OrderNotificationItem`、`SystemNotificationItem` 是同一個程式 widget，決定是否升級進 DS。
- **08（6 通訊）**：通話用 DS `VoiceCallScreen`，看照片與傳送前確認用 DS `PhotoViewer`。

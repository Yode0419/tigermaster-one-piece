# B2B2C 串接專案：設計 Backlog

只放設計端的工作。後端與商務事項不列項目，只在依賴欄註明；待確認問題見 [open-questions.md](open-questions.md)。轉成 Jira 票後，在票號欄填入。

| # | 項目 | 產出 | 依賴 | 10/14 交付 | 狀態 | 票號 |
|---|---|---|---|---|---|---|
| D01 | 現況服務流程圖（註冊到保固） | 現況流程圖，整理自 wiki 的訂單流程文件。產出：[流程表](d01-current-flow/service-flow-table-20261008.md)、[流程圖](diagrams/b2b2c-service-flow.tldraw)（page「D01 現況服務流程圖」） | 無 | 是 | 已完成 | [SCRUM-112](https://tigermaster.atlassian.net/browse/SCRUM-112) |
| D02 | 企業串接訂單流程圖（合作企業下單到 App 付款） | 消費者、合作企業、師虎三條泳道的流程圖。涵蓋有帳號或沒帳號、要付派遣費或不用付、媒合成功或失敗、消費者到 App 登入並看到訂單；「App 登入認領」一步先標待設計 | D01 | 是 | 待開始 | [SCRUM-113](https://tigermaster.atlassian.net/browse/SCRUM-113) |
| D03 | 師虎 Web 下單與訂單追蹤設計 | 身分流程方案（先登入、SCRUM-35 方案 1、方案 2）、下單流程草圖、網頁訂單頁（狀態、聊天、引導到 App 付款）、Email 通知文案；手機版與桌機版 | D01 | 是 | 待開始 | [SCRUM-114](https://tigermaster.atlassian.net/browse/SCRUM-114) |
| D04 | 後台訂單欄位草圖 | 訂單來源（顯示企業名稱，可篩選）、外部訂單編號、會員狀態、分潤來源註記 | 無 | 是 | 待開始 | [SCRUM-115](https://tigermaster.atlassian.net/browse/SCRUM-115) |

## 項目補充

- **D03 下單表單範圍**：收單 API 欄位，加上 App 既有的派遣費說明與同意、預約或立即叫修、加成時段提醒、電梯、照片、確認頁。不做發票與優惠。
- **D03 通知**：只用 Email 與網頁訂單頁。Email 內放網頁訂單頁的專屬連結。
- **D04 企業設定**：第一版由工程師寫死，後台只顯示訂單來源。

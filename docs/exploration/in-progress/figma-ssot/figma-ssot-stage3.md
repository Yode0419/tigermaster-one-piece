# Figma SSOT 階段 3：畫面填入

## 概述

- **上層專案**：[Figma SSOT 專案總覽](figma-ssot-overview.md)
- **狀態**：進行中（管理員端試做尚未開始）
- **開始**：2026-10-05
- **結構依據**：[建置交接包 r01](figma-build-r01.md) 的完整結構表
- **Figma 檔案**：
  - [客戶端](https://www.figma.com/design/G3tNva2zGzIi74Aujg3cLB/APP_Client)：41 個 Section、179 個 Frame
  - [師傅端](https://www.figma.com/design/m0yuXFZN2fkivzTOcwiKJ4/APP_師傅)：24 個 Section、78 個 Frame
  - [管理員端](https://www.figma.com/design/M5DWva58qmX9Xx3V2O3c3x/APP_管理員)：6 個 Section、13 個 Frame

本文件記錄階段 3 的做法、進度、元件候選與決策。總覽只記階段層級的狀態。

---

## 決策

- 2026-10-05：分批順序為管理員 → 師傅 → 客戶，一批對應一個 Page（沿用交接包的批次），並設兩個檢查點：管理員端全部完成後、師傅端第一個 Page 完成後。Why：管理員端只有 13 個 Frame 且元件齊全，適合試做，但幾乎都是聊天室畫面，需要第二個檢查點涵蓋一般資料頁。
- 2026-10-05：畫面照現行 App（Flutter repo）畫，不照 Design System 規格修正。Why：這個專案的目標是讓 Figma 呈現現行 App。
- 2026-10-05：舊 Figma 稿不作為繪製來源。Why：舊稿內容已確認大致涵蓋在階段 1 盤點出的清單內。
- 2026-10-05：由 Claude Code 讀 Flutter 程式並直接操作 Figma 填入，不交給 Figma agent。Why：Figma agent 讀不到本機 repo，改用它就需要另外寫每個畫面的規格交接，而這份規格本身就是大部分的工作量。
- 2026-10-05：填入流程先手動試做，確認可行且順暢後才做成 Skill，預計在檢查點 1 整理，師傅端開始使用。Why：試做前寫的規則多半是猜測。
- 2026-10-05：階段 3 的決策記在本文件，不寫根目錄 DECISIONS.md。Why：與其他專案型探索的做法一致。

---

## 繪製原則

- **來源**：文案、欄位、狀態與流程以 Flutter 程式為準。結構表的「一句情境」說明畫面要呈現哪個狀態。
- **有元件的地方**：使用 Design System 元件實體（instance）。與現況不同的地方用覆寫（override）表現，不拆開元件（detach）。
- **沒有元件的地方**：直接排版，顏色、字級、間距、圓角一律綁定 token，不寫死數值。
- **重複區塊**：沒有元件的區塊出現第二次就記入下方「元件候選」。同一批內先在該角色檔案做成本機元件（local component），到檢查點再決定是否以 `/sanji` 升級進 Design System。
- **Frame**：維持 393×852，名稱與位置不變。畫完後刪除三行佔位文字。

---

## 分批與進度

| 批次 | 角色 | Page | Frame 數 | 狀態 |
|---|---|---|---|---|
| 21 | 管理員端 | 1 客服聊天室 | 10 | 未開始 |
| 22 | 管理員端 | 2 帳號 | 3 | 未開始 |
| ▶ | 檢查點 1 | 檢討流程，整理成 Skill，決定第一批元件候選 | — | 未開始 |
| 12 | 師傅端 | 1 首頁與接案 | 11 | 未開始 |
| ▶ | 檢查點 2 | 檢討一般資料頁的流程與品質 | — | 未開始 |
| 13 | 師傅端 | 2 訂單與報價 | 34 | 未開始 |
| 14 | 師傅端 | 3 收入與撥款 | 6 | 未開始 |
| 15 | 師傅端 | 4 帳號 | 10 | 未開始 |
| 16 | 師傅端 | 5 通訊 | 13 | 未開始 |
| 17 | 師傅端 | 6 通知 | 4 | 未開始 |
| 03 | 客戶端 | 1 啟動與登入 | 33 | 未開始 |
| 04 | 客戶端 | 2 首頁與叫修 | 38 | 未開始 |
| 05 | 客戶端 | 3 訂單 | 60 | 未開始 |
| 06 | 客戶端 | 4 通知 | 4 | 未開始 |
| 07 | 客戶端 | 5 帳號與會員 | 31 | 未開始 |
| 08 | 客戶端 | 6 通訊 | 13 | 未開始 |

批次編號沿用交接包。Cover、Documentation、Archive 三個輔助 Page 不在階段 3 範圍內。

---

## 元件狀況

**管理員端需要的元件，Figma 都已有**：BottomNavBar（Admin）、AppBar、ListItem、Avatar、Badge、ChatAppBar、ChatBackground、MessageBubble、ChatInputBar、BottomSheet、Dialog、StatusBar、HomeIndicator。

**Design System 檔案中的空白頁**：EmptyState、Carousel、StepIndicator 三頁目前沒有元件。客戶端的「1.2 首次介紹」和訂單進度相關畫面可能需要用到，輪到這些 Page 之前要先確認是否補建。

**文件與 Figma 不一致**：`docs/design-system/INDEX.md` 寫 ChatAppBar、ChatBackground「Figma 尚未建立正式 Component」，但 Figma Chatroom 頁已有這兩個元件組，待確認是否完成並更新索引。

### 元件候選

| 候選 | 出現位置 | 狀態 |
|---|---|---|
| 通話畫面（撥出中、通話中） | 客戶端 6.3、師傅端 5.3、管理員端 1.3 | 待試做時確認 |
| 全螢幕照片檢視 | 管理員端 1.2.6，其他角色的聊天室待確認 | 待試做時確認 |

---

## 驗收方式

每批完成時：

1. **結構檢查（腳本）**：Frame 名稱與數量不變，佔位文字已刪除，列出被拆開的元件與寫死顏色的數量。
2. **內容對照**：逐個 Frame 截圖，與 Flutter 程式對照文案與狀態。
3. **使用者確認**截圖後，才進行下一批。

檢查點另外交給 `verifier` 依清單完整檢查一次，再檢討流程。

---

## 試做紀錄

管理員端試做時記下實際步驟、遇到的問題與解法，作為檢查點 1 整理成 Skill 的依據。

（尚無紀錄）

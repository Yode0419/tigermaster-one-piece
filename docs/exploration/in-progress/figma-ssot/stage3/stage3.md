# Figma SSOT 階段 3：畫面填入

## 概述

- **上層專案**：[Figma SSOT 專案總覽](../figma-ssot-overview.md)
- **狀態**：進行中（管理員端試做中）
- **開始**：2026-10-05
- **結構依據**：[建置交接包 r01](../figma-build-r01.md) 的完整結構表
- **Figma 檔案**：
  - [客戶端](https://www.figma.com/design/G3tNva2zGzIi74Aujg3cLB/APP_Client)：41 個 Section、179 個 Frame
  - [師傅端](https://www.figma.com/design/m0yuXFZN2fkivzTOcwiKJ4/APP_師傅)：24 個 Section、78 個 Frame
  - [管理員端](https://www.figma.com/design/M5DWva58qmX9Xx3V2O3c3x/APP_管理員)：6 個 Section、13 個 Frame

本文件只記管理資訊：決策、分批進度與檢查點。總覽只記階段層級的狀態。

## 本資料夾的文件

| 文件 | 內容 | 什麼時候讀 |
|---|---|---|
| stage3.md（本文件） | 決策、分批進度、檢查點 | 每次開始新的一批 |
| [method.md](method.md) | 每個 Frame 的步驟、Frame 結構、繪製原則、驗收方式、Figma 操作注意事項 | 畫圖前；日後 Skill 的主體 |
| [reference.md](reference.md) | 常用元件與 token 的 Key、近似對應表 | 畫圖時查表 |
| [components.md](components.md) | 元件狀況、元件候選、DS 待辦 | 遇到沒有元件的區塊；檢查點時 |
| `batches/` | 一批一份紀錄：Frame 清單與狀態、每個 Frame 的判斷、問題、本機元件 | 畫該批時 |

---

## 決策

- 2026-10-05：分批順序為管理員 → 師傅 → 客戶，一批對應一個 Page（沿用交接包的批次），並設兩個檢查點：管理員端全部完成後、師傅端第一個 Page 完成後。Why：管理員端只有 13 個 Frame 且元件齊全，適合試做，但幾乎都是聊天室畫面，需要第二個檢查點涵蓋一般資料頁。
- 2026-10-05：畫面照現行 App（Flutter repo）畫，不照 Design System 規格修正。Why：這個專案的目標是讓 Figma 呈現現行 App。（視覺樣式部分已由下一條取代）
- 2026-10-05：內容（文案、欄位、狀態、流程）照 Flutter；視覺樣式能用 Design System 就用，元件維持原本樣式不覆寫，程式數值沒有對應 token 或文字樣式時，用 Design System 規格。Why：Flutter 本身沒有貫徹元件庫與 Design System，照抄只會把不一致搬進 Figma，未來再慢慢讓程式向 Design System 靠攏。
- 2026-10-05：本機元件放在該 Page 右側的「本機元件」Section。Why：同批元件就在畫面旁邊，比較好找。
- 2026-10-05：Frame 採三區 Auto Layout（固定頂部、可捲動的內容區、固定底部，浮層用絕對定位），維持 393×852。Why：改變尺寸時內容會自動調整，結構與 Flutter 的 Scaffold 一致。
- 2026-10-05：選用最接近的 token 時記入 [reference.md](reference.md) 的「近似對應表」，使用者在表上填「改為」即可介入，Claude 再回頭套用到已畫的 Frame。Why：集中一處修改，不必逐個 Frame 找。
- 2026-10-05：舊 Figma 稿不作為繪製來源。Why：舊稿內容已確認大致涵蓋在階段 1 盤點出的清單內。
- 2026-10-05：由 Claude Code 讀 Flutter 程式並直接操作 Figma 填入，不交給 Figma agent。Why：Figma agent 讀不到本機 repo，改用它就需要另外寫每個畫面的規格交接，而這份規格本身就是大部分的工作量。
- 2026-10-05：填入流程先手動試做，確認可行且順暢後才做成 Skill，預計在檢查點 1 整理，師傅端開始使用。Why：試做前寫的規則多半是猜測。
- 2026-10-05：試做（批次 21、22、12）用 Opus，做成 Skill 後的正式填入用 Sonnet；每個 Page 開新對話，大型 Page 依 Section 再拆。Why：試做要定下做法，正式填入是固定步驟，開新對話可以避免累積對話紀錄消耗 token。
- 2026-10-05：階段 3 的決策記在本文件，不寫根目錄 DECISIONS.md。Why：與其他專案型探索的做法一致。
- 2026-10-05：階段 3 文件拆進 `stage3/` 子資料夾，依用途分為管理（本文件）、做法、查表、元件、批次紀錄。Why：批次紀錄會隨 270 個 Frame 持續變長，拆開後 Skill 只需讀做法與查表，每批開新對話也只讀本文件加當批紀錄。
- 2026-10-05：批次紀錄在試做期間（批次 21、22、12）每個 Frame 寫完整對照表，檢查點 1 之後只記例外（非標準判斷、近似對應、使用者修改），其餘只在清單打勾。Why：試做要累積做 Skill 的素材，正式填入若每格都寫，紀錄太長沒人會讀。
- 2026-10-05：照 Flutter 與照 DS 的分界：有哪些選項、文字、順序、是否有取消、從哪裡跳出、是否擋住後方畫面，這些照 Flutter；用哪個元件、外觀、圓角、顏色、字級照 DS。換成 DS 元件只要不改到前者就不算違背 SSOT，差異記在批次紀錄的對照表。第一個案例：程式的 iOS 動作選單（CupertinoActionSheet）改用 BottomSheet（無標題列）＋ ListItem 選項＋「取消」按鈕。Why：SSOT 要的是每個現行畫面有固定位置且內容真實，不是逐像素複製；Flutter 未貫徹 DS 的地方由 Figma 先走 DS，程式再靠攏。
- 2026-10-05：動作選單參考 M3 Modal Bottom Sheet：頂部拖曳把手、選項列表、「取消」接在選項下方（Ghost Neutral 純文字按鈕，不做成選項之一），不用貼底按鈕區。為此擴充 DS 的 BottomSheet（Footer variant Sticky／Inline、hasDragHandle，hasStickyFooter 改名 hasFooter）。Why：短內容用貼底按鈕區時「取消」被隔成另一區、下方多出空白，看起來奇怪；M3 原樣沒有「取消」，但「是否有取消」照 Flutter，所以保留；取消是「不做任何事」，與選項性質不同，用按鈕區分。
- 2026-10-05：ListItem 補上 State（default／pressed，按下底色同 Button），左右 `Spacing/16` 收進元件，分隔線內縮。Why：DS 原本沒有定義按下樣式；外層包留白會讓按下底色不滿版，且目前只有 1.2.3 用到，現在改影響最小。
- 2026-10-05：聊天室訊息靠上對齊；訊息超出畫面時只畫進入時看到的最後一屏。Why：與 App 行為一致，訊息少時貼在頂部，訊息多時進入聊天室會停在最底部。
- 2026-10-05：全螢幕照片畫面的黑底綁原始色 `Base/Black`，不用語意 token `Background/Inverse`。Why：語意 token 沒有純黑，#2A2A2A 底上 AppBar 的 12% 遮罩會看出帶狀，純黑與程式一致。
- 2026-10-05：只有圖示、沒有文字的 FAB 用 Type=Slot 放圖示，第一個案例是 1.2.4 傳送鍵。Why：Default 一定帶文字，程式沒有文字，內容照 Flutter。
- 2026-10-05：1.2.5 確認重送訊息改用 Dialog（Standard），不照程式的 iOS 動作選單從底部出現。Why：程式的文字訊息只有網址有點擊事件，失敗訊息點了不會觸發重送，這個畫面現況是 bug、使用者看不到；既然沒有實際畫面可照，就畫預期行為，確認型動作依 DS 用 Dialog。程式有 bug 導致照不到現況時，回報使用者決定畫法。
- 2026-10-05：不在知識庫建立逐格的畫面索引，畫的期間也不收集 Figma 連結；專案結束時以 `/robin` 把結構表整理成 Page／Section 層級的「畫面地圖」並附三個 Figma 檔案連結，細節由 AI 到 Figma 依 Frame 名稱查找。Why：Figma 是唯一維護來源，逐格索引會多一處要同步；Frame 名稱帶編號，AI 可自行查到。若出現沒有 Figma 權限的使用者，或連不到 Figma 的 AI agent，再重新考慮。

---

## 分批與進度

| 批次 | 角色 | Page | Frame 數 | 狀態 | 紀錄 |
|---|---|---|---|---|---|
| 21 | 管理員端 | 1 客服聊天室 | 10 | 進行中（7/10） | [21-admin-chatroom](batches/21-admin-chatroom.md) |
| 22 | 管理員端 | 2 帳號 | 3 | 未開始 | |
| ▶ | 檢查點 1 | 檢討流程，整理成 Skill，決定第一批元件候選 | — | 未開始 | |
| 12 | 師傅端 | 1 首頁與接案 | 11 | 未開始 | |
| ▶ | 檢查點 2 | 檢討一般資料頁的流程與品質 | — | 未開始 | |
| 13 | 師傅端 | 2 訂單與報價 | 34 | 未開始 | |
| 14 | 師傅端 | 3 收入與撥款 | 6 | 未開始 | |
| 15 | 師傅端 | 4 帳號 | 10 | 未開始 | |
| 16 | 師傅端 | 5 通訊 | 13 | 未開始 | |
| 17 | 師傅端 | 6 通知 | 4 | 未開始 | |
| 03 | 客戶端 | 1 啟動與登入 | 33 | 未開始 | |
| 04 | 客戶端 | 2 首頁與叫修 | 38 | 未開始 | |
| 05 | 客戶端 | 3 訂單 | 60 | 未開始 | |
| 06 | 客戶端 | 4 通知 | 4 | 未開始 | |
| 07 | 客戶端 | 5 帳號與會員 | 31 | 未開始 | |
| 08 | 客戶端 | 6 通訊 | 13 | 未開始 | |

- 批次編號沿用交接包。Cover、Documentation、Archive 三個輔助 Page 不在階段 3 範圍內。
- 每批開始時在 `batches/` 新增一份紀錄，檔名為「批次編號-角色-Page 主題」（英文），格式比照 [21-admin-chatroom](batches/21-admin-chatroom.md)。

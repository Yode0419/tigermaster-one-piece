# Figma SSOT 階段 3：畫面填入

## 概述

- **上層專案**：[Figma SSOT 專案總覽](../figma-ssot-overview.md)
- **狀態**：進行中（管理員端、檢查點 1 與師傅端批次 12 已完成；下一步檢查點 2，檢討一般資料頁的流程與品質，再接批次 13）
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
| [reference.md](reference.md) | 常用元件與 token 的 Key、近似對應表 | 畫圖時查表 |
| [components.md](components.md) | 元件狀況、元件候選、pattern 候選、DS 待辦 | 遇到沒有元件的區塊；檢查點時 |
| `batches/` | 一批一份紀錄：Frame 清單與狀態、每個 Frame 的判斷、問題、本機元件 | 畫該批時 |

填入做法（步驟、繪製原則、畫面類型、程式片段、驗收）在 [fill-figma-ssot Skill](../../../../../.claude/skills/fill-figma-ssot/SKILL.md)，原本的 method.md 已併入並刪除。檢查點時另外交給 `verifier` 依清單完整檢查一次，再檢討流程。

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
- 2026-10-05：程式數值剛好有對應 token、但 DS 規格另有規定時，照 DS。第一個案例：帳號頁左右邊距程式為 8，依 DS 頁面左右邊距用 `Spacing/16`。Why：邊距屬於樣式，與「樣式照 DS」一致；「沒有對應 token 才用 DS」只是補空缺的規則，不代表有 token 就照程式。
- 2026-10-05：沒有 AppBar、頂部跟著內容捲動的頁面，頂部仍放在固定頂部區，捲動行為只用文字記錄。Why：只畫第一屏，靜止畫面相同；放進捲動區會讓 AppBar 內嵌的狀態列一起捲走，與 App 不符。
- 2026-10-05：DS 的 Outlined 按鈕（Primary／Secondary／Neutral）一律加白底 `Background/Surface`，規格見 `docs/design-system/components/button.md`。Why：頁面底色是灰色，透明底的 Outlined 在灰色頁面上幾乎看不見；程式在帳號頁等處也是白底。
- 2026-10-05：DS 的 Button lg 高度由 44 改為 48（內距維持 `Spacing/12`，加最小高度 `Spacing/48`），規格見 `docs/design-system/components/button.md`。Why：使用者指定。
- 2026-10-05：不在知識庫建立逐格的畫面索引，畫的期間也不收集 Figma 連結；專案結束時以 `/robin` 把結構表整理成 Page／Section 層級的「畫面地圖」並附三個 Figma 檔案連結，細節由 AI 到 Figma 依 Frame 名稱查找。Why：Figma 是唯一維護來源，逐格索引會多一處要同步；Frame 名稱帶編號，AI 可自行查到。若出現沒有 Figma 權限的使用者，或連不到 Figma 的 AI agent，再重新考慮。
- 2026-10-05：`PhotoViewer` 升級進 DS，下載鍵移出 AppBar、放在元件本身那層疊在右上，做成 Has Download 開關（與 Has Send 並列）。Why：程式的看照片與傳送前確認是三種角色共用的元件，客戶端、師傅端一定會用到；兩顆按鈕都是元件自己的開關，用法一致，也對應程式「有沒有下載網址」的條件。
- 2026-10-05：`VoiceCallScreen` 升級進 DS，放在 Chatroom 頁，結構照本機元件不改。Why：四種聊天室打電話都開同一個頁面 `IOSCallerControlPage`，客戶端 6.3、師傅端 5.3 與管理員端相同。
- 2026-10-05：`AdminChatroomListItem` 不升級進 DS，維持管理員檔案的本機元件。Why：客戶端、師傅端沒有聊天室列表（從訂單或客服入口直接進入單一聊天室），整個 App 只有管理員 1.1.1 用到。
- 2026-10-06：填入過程順便累積 design pattern：畫圖時發現重複出現的組合，在 components.md 的 pattern 候選記一行（組合、解決的問題、出現位置），到檢查點時，跨兩個以上檔案出現的候選以 `/sanji pattern` 寫進 `docs/design-system/patterns/`。Why：目標是讓未來 AI 協助設計時符合產品的結構與體驗；邊畫邊標記成本低且保留當下判斷脈絡，太早寫成文件容易重寫，等全部畫完再掃則失去脈絡。
- 2026-10-06：正式填入的確認節奏：Skill 已有做法的畫面，畫完整個 Section 才一起交截圖與「Claude 自己判斷的清單」給使用者確認；遇到沒寫過的畫面類型，先畫那一格並停下來確認，定案的做法補進 Skill 後再繼續。Why：試做時使用者的修改都集中在新類型的第一格，重複類型只有 API 問題，每格確認在 270 格下成本太高。
- 2026-10-06：正式填入時 Sonnet 不改 DS 檔案：DS 不夠用時先用現有元件或本機排版畫出來，在 components.md 的 DS 待辦記一行（哪一格、缺什麼、建議怎麼改）後繼續；DS 待辦在檢查點或批次之間另開 Opus 對話集中處理，再回頭更新受影響的格子。Why：改 DS 影響三個 App 檔案與 DS 文件，複製 variant、重建 Slot 等操作容易出錯，且每次都要中斷等使用者發布；「小改動」的界線 Sonnet 難以判斷。
- 2026-10-06：Figma 操作的常用動作（匯入與先試匯入、綁 token、設元件屬性、換圖示、建三區 Frame、批次結構檢查）寫成 Skill 裡的固定程式片段，每次呼叫貼上直接用；複製 variant、外露子元件等少見情況維持文字說明。Why：試做的 API 錯誤多發生在每格都要做的固定動作，寫成片段可從根本避免，Sonnet 自己把文字規則轉成程式容易出錯。
- 2026-10-06：批次 12 由 Sonnet 照 Skill 跑，批次紀錄仍寫完整對照表，作為檢查點 2 的素材；Sonnet 同一步驟連續失敗兩次時交給 Opus。取代 2026-10-05「試做（批次 21、22、12）用 Opus」中批次 12 的部分。Why：Skill 是寫給 Sonnet 用的，批次 12 只有 11 格且後面緊接檢查點 2，能在小批次就發現 Skill 寫不清楚的地方；新畫面類型有使用者逐格確認把關。
- 2026-10-06：填入流程的 Skill 命名為 `/fill-figma-ssot`，不用船員角色名。Why：這是針對階段 3 的任務型 Skill，名稱帶 ssot 才不會被誤認為通用的 Figma 填圖工具；未來若有讓 AI 生成畫面的通用 Skill，再參考它的內容並以船員角色命名。
- 2026-10-06：method.md 的內容搬進 `/fill-figma-ssot` Skill（SKILL.md 放流程與規則、`references/screen-types.md` 放畫面類型做法、`references/figma-notes.md` 放少見的 API 情況、`scripts/snippets.js` 放程式片段）後刪除；Key 與近似對應表、元件、批次紀錄等專案資料留在 `stage3/`。Why：做法只留一處才不會不同步；專案資料每批都會變動，使用者也要在近似對應表上填「改為」，不適合放進 Skill。
- 2026-10-06：製作本機元件時一律有 properties 的概念：會變的文字做成 TEXT 屬性、有或沒有的部分做成布林屬性、不同內容做成 variant，使用時直接改屬性，不覆寫圖層文字。需要使用者之後補素材（例如插圖）的位置，留一個命名清楚的佔位圖層。第一個案例：師傅端案件卡（Category、Mode、Address、Date、Status、Has Unread、Unread Count）與首頁空狀態（Type=Suitable／InProgress）。Why：使用者要在 Figma 自行維護與補素材，屬性比覆寫圖層文字好用，也方便日後升級進 DS。
- 2026-10-06：以內容為主的長頁面才拉長 Frame，其他畫面一律維持標準高度 852。以內容為主的長頁面指頁面本身就是在讀或填一大段資訊、而且會捲動，例如案件詳情、訂單詳情、表單、說明頁、可能超過一屏的帳號頁。這類頁面 Frame 寬維持 393，高度固定、手動拉長到剛好容納整頁內容（頂部＋內容總和＋底部，至少 852），`Content` 維持 Fill，所以固定底部（按鈕區、導覽列）永遠貼在最底。首頁、列表、空狀態、聊天室、浮層畫面（Dialog、BottomSheet）都維持 852，內容超出的部分由 `Content` 裁切。聊天室維持原決策（只畫進入時看到的最後一屏）。Why：使用者要在以讀內容為主的頁面看到整頁內容；其他畫面的重點不在內容，維持標準尺寸讓同一個 Section 內的畫面大小一致。第一個案例：師傅 1.2.1（高 1140）。取代「內容比畫面長時只畫第一屏」的做法。
- 2026-10-06：示意資料（服務名稱、價格、保固、案件內容）優先用官網與實際畫面的真實資料，不自己編。Why：使用者指示，讓 Figma 呈現真實產品。服務名稱來源：官網 repo `src/config/WorkingCategory.json`。
- 2026-10-06：自排任何區塊前，先到 DS 搜尋有沒有對應元件（含名稱查不到時用用途或文件搜尋）。Why：師傅 1.2.1 的保固徽章 DS 已有（`CornerBadge`），第一版誤用 Tag；使用者指出才改正。
- 2026-10-06：Frame 的 Auto Layout 堆疊順序採 First on top（`itemReverseZIndex = true`）。連帶影響：浮層（Dialog、`Scrim`）要放在最前面才會在最上層；BottomNavBar 排在 `Content` 之後時，中央 Logo 凸起的部分會被內容蓋住，所以 BottomNavBar 改成浮層（絕對定位貼底，排在 `AppBar` 之前），`Content` 底部 padding 設 82 讓內容不被蓋住（使用者選的做法，與程式裡 Logo 是浮在內容上的 FAB 一致）。其他固定底部（ChatInputBar、底部按鈕區）沒有凸起，維持在自動排列最後。Why：使用者指定的 Auto Layout 慣例（與 Figma 的 Auto Layout 面板選項一致）。
- 2026-10-06：長內容、需要捲動的 BottomSheet，原本那一格畫第一屏（852），並在旁邊加一格完整的長畫面，採用 BottomSheet 外殼、內容完整顯示。額外的一格命名為「<原本編號> <原本名稱>（完整內容）」，不編新號碼、不算在結構表的 Frame 數，結構檢查略過。Why：打開時看到的是第一屏，但完整內容也要能在 Figma 看到；加一格比拉長原本那一格更貼近實際畫面。

---

## 分批與進度

| 批次 | 角色 | Page | Frame 數 | 狀態 | 紀錄 |
|---|---|---|---|---|---|
| 21 | 管理員端 | 1 客服聊天室 | 10 | 已完成（10/10，已驗收） | [21-admin-chatroom](batches/21-admin-chatroom.md) |
| 22 | 管理員端 | 2 帳號 | 3 | 已完成（3/3，已驗收） | [22-admin-account](batches/22-admin-account.md) |
| ▶ | 檢查點 1 | 檢討流程，整理成 Skill，決定第一批元件候選 | — | 已完成（管理員端 13 個 Frame 驗收通過、PhotoViewer 與 VoiceCallScreen 升級進 DS、375 系統列淘汰；檢討出四項流程調整，整理成 `/fill-figma-ssot` Skill，新增 pattern 候選表） | |
| 12 | 師傅端 | 1 首頁與接案 | 11 | 已完成（11/11，已驗收） | [12-master-home](batches/12-master-home.md) |
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

# 階段 3 決策紀錄

階段 3 全部決策的原文，依時間排列，給使用者與 Opus 回溯「為什麼這樣做」。**`/fill-figma-ssot` 執行時不讀這份**：仍有效的做法都已寫進 Skill（`SKILL.md` 與 `references/`），做法只留一處。進度見 [stage3.md](stage3.md)。

新決策照原格式附加在「決策」最後。

---

## 核心原則（精煉）

從下方 80 多條決策歸納，方便快速掌握。細節以 Skill 為準。

1. **內容照 Flutter，樣式照 DS**：選項、文字、順序、有無取消、從哪裡出現、是否擋住後方照程式；元件、外觀、圓角、顏色、字級、邊距照 DS。程式值有 token 但 DS 另有規定時也照 DS。
2. **資料要真實**：不參考舊 Figma 稿；示意資料優先用官網與實際畫面，要符合觸發該畫面的狀態與商業規則。
3. **照不到現況就不猜**：程式有 bug 到不了、或沒有錯誤處理的畫面，不畫推測版本，回報使用者決定；程式讀不出來時以實機為準。
4. **一個畫面多個狀態不拆 Frame**，畫資訊最多的那個。例外：會遮住內容的暫時浮層（資訊提示），以及依使用者選擇走向不同後續畫面的流程。
5. **尺寸**：一律 393×852；只有以內容為主的長頁面拉長到容納整頁；長 BottomSheet 另加一格「（完整內容）」。
6. **Frame 結構**：三區 Auto Layout（固定頂部、`Content` 內含 `Scroll Content`、固定底部），堆疊 First on top，浮層絕對定位；BottomNavBar 是浮層。
7. **元件**：卡片外框一律 DS `Card`；先搜 DS 再自排；重複的自排區塊做成有 properties 的本機元件，放 Page 右側「本機元件」Section。
8. **分工**：Sonnet 照 Skill 畫圖、不改 DS 檔；DS 缺口記 DS 待辦，由 Opus 在檢查點或 DS 升級時集中處理。
9. **節奏**：一個對話一個 session row（約 12 到 15 格）；新畫面類型先畫一格停下確認；畫到一半的修正記「待寫規則」，對話結束才寫進 Skill。
10. **編號由使用者決定**：新增或順移 Frame 要同步結構表 `figma-build-r01.md`。
11. **舊畫面不回頭修**：新規則只套用在之後畫的畫面，除非使用者要求。
12. **紀錄位置**：階段 3 決策記本文件，不記根目錄 `DECISIONS.md`；不收集 Figma 連結，專案結束時由 `/robin` 整理畫面地圖。

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
- 2026-10-06：（檢查點 2）Skill 補三項檢查：每格畫之前先在回覆中列出該狀態的所有文字與元素，要追進子元件的預設參數、條件分支與後端加工的欄位；Section 結束的回報要附自排區塊的 DS 搜尋關鍵字、放大截圖、程式與 Figma 數值對照；結構檢查擴充（First on top、浮層順序、852 規則、本機元件屬性、文字傾印），改成每個 Section 結束跑一次、只回傳有問題的項目。Why：批次 12 的修正分三類，使用者的慣例未寫進 Skill（已補規則但沒有檢查）、程式讀得不夠深（保固說明、地址遮蔽）、自排區塊品質不穩（保固徽章、價格區間），後兩類在批次 13 的訂單頁風險更高。
- 2026-10-06：（檢查點 2）Skill 加省 token 規則：結構表只准 Grep、不讀其他批次紀錄、元件先查 reference.md 再用腳本只列名稱與 Key（`search_design_system` 只用於圖示）、一格用一到兩次呼叫建完、每格一張截圖、畫圖期間的修正只記進批次紀錄的「待寫規則」，對話結束時才一次寫進 Skill、對話超過約 25 萬 token 就收尾換新對話。Why：批次 12 實測 142 回合、對話長到 47 萬 token，累計讀取 4,500 萬 token；主要來自開場整份讀入 79 KB 的結構表、`search_design_system` 冗長的回傳、邊畫邊改規則約 50 次編輯，以及 33 張截圖。
- 2026-10-06：（檢查點 2）`CarouselBanner`、`PriceRangeIndicator`、`WarrantyPill` 升級進 DS，`MasterHomeEmptyState` 改做成通用的 DS `EmptyState`（插圖佔位＋標題＋說明＋可選按鈕）；兩種案件卡與 `OrderCategoryCard` 維持本機元件。Why：前三者在程式裡客戶端與師傅端共用同一個 widget；空狀態程式有三處（師傅首頁、師傅收入、客戶端媒合失敗），DS 也預留了 EmptyState；案件卡與分類卡目前只有一處使用，訂單列表（批次 13）與客戶端服務詳情畫到時再判斷。
- 2026-10-06：（檢查點 2）DS 待辦 6、7 的做法：價格區間與保固膠囊分成兩個元件，都加「是否顯示說明文字」開關與說明文字屬性；價格區間的三個程式原色（#40AEFE、#3449FF、#3A89F8）新增為 DS 原始色並綁定，取代「直接用程式原色、不綁 token」的特例，命名在 `/sanji` 寫規格時對照色彩規格提案；輪播分頁圓點維持固定 3 顆、variant 決定選中第幾顆。Why：程式的 `PriceRange` 與 `WarrantyDate` 是兩個 widget、客戶端保固訂單卡只用保固膠囊；新增原始色讓顏色與程式完全一致又沒有寫死的值；圓點目前只有輪播用到，客戶端首次介紹頁（批次 03）若重複再拆成獨立元件。
- 2026-10-06：（檢查點 2）DS 檔新增「Service」頁，放 `PriceRangeIndicator` 與 `WarrantyPill`；`Carousel`、`EmptyState` 放進既有的同名空白頁。Why：兩者只在服務與工項資訊的情境出現，程式也在同一個資料夾（`component/service/`），比照 `Chatroom` 頁同情境元件放一起的慣例。
- 2026-10-06：（檢查點 2）pattern 的達標條件改為「跨兩個以上 App 檔案，且是兩個以上元件的組合」；單一元件的用法規則補進該元件的規格文件。這次沒有候選達標，確認對話框的按鈕配置規則補進 `docs/design-system/components/dialog.md`。Why：確認對話框只有 Dialog 加遮罩，寫成 pattern 會和元件規格重疊；AI 查 Dialog 時一定會讀到元件規格。一般資料頁、動作選單、全螢幕媒體預計在師傅端批次 15、16 跨進第二個檔案，到時一起寫。
- 2026-10-06：（檢查點 2）批次 13 切成 4 個對話：13a（2.1 至 2.3，9 格）、13b（2.4，11 格）、13c（2.5、2.6，6 格）、13d（2.7、2.8，8 格）；DS 升級做完並發布後才開始 13a。Why：批次 12 只有 11 格就讓對話長到 47 萬 token，批次 13 的新畫面類型更多；2.4 報價編輯最重所以單獨一段；2.1.2、2.1.4 是空狀態、2.2.2 可能用到價格區間與保固膠囊，DS 沒先做好 Sonnet 會再畫出本機版本。
- 2026-10-06：（DS 升級）`Carousel` 的分頁圓點照本機元件（8px、間距 `Spacing/8`、距底 8，未選中 `Border/Default`），不照程式的 10px、間距 6、暖灰 #B3ACA2，差異記進 reference.md 近似對應表。Why：本機元件已在檢查點 2 驗收，數值都有 token；淺灰在照片上是否看不清楚要等真實 Banner 圖才知道。
- 2026-10-06：（DS 升級）`EmptyState` 涵蓋程式三處空狀態，分 Size=Compact（清單區，照本機元件數值）與 Page（整頁結果，插圖 200、`Heading/2` 標題）；排列一律插圖在上、標題在下，客戶端媒合失敗頁的標題在插圖上方也照此統一。Why：檢查點 2 已決定涵蓋三處，固定順序是通用元件的意義；文字內容不變，排列屬於樣式照 DS。
- 2026-10-06：（DS 升級）`EmptyState` 的插圖做成 Slot（粉紅 `Slot Rectangle` 佔位，比照 Card），不用圓形佔位；Has Action 預設開啟。Why：使用者指定，之後要能放入任意插圖；DS 的 Illustration 頁目前是一般 Frame 不是元件，無法做成下拉替換。
- 2026-10-06：（DS 升級）DS 元件的文字屬性預設值用通用佔位字（比照 Button「Button」、Dialog「Title」），不用實際產品文案；真實文案只出現在 App 檔案的畫面裡。Why：使用者指定；DS 是元件規格，實際文案屬於畫面內容。
- 2026-10-06：（DS 升級）價格區間只新增兩個原始色 `PriceGradient/Light`（#40AEFE）、`PriceGradient/Deep`（#3449FF），放 `Color/Primitive` 並註明僅限 `PriceRangeIndicator`；價格文字 #3A89F8 等於既有 `Blue/500`，直接綁原始色，不綁值相同但語意不符的 `Text/Link`、`Status/Info`。元件收進程式 `PriceRange` 的常見價格行與說明文字（Has Description），「件數最多」維持固定文字。取代檢查點 2「新增三個原始色」的部分。Why：比照既有 `ProGradient` 的功能專用漸層色組；開新色相群組只有一個顏色會變孤兒色票，塞進 Blue 色階則色相不連續。
- 2026-10-06：（批次 13a）卡片外框一律用 DS `Card`，不自己畫底色圓角；重複的卡片內容做成本機元件時只做內容、不含外框，使用時放進 Card 的 Slot。Why：使用者指出自畫外框沒有 DS 的陰影；Figma 不允許在元件裡把 Card 內部文字連到屬性，所以外框無法一起做進有文字屬性的本機元件。批次 12 的三個本機卡片（適合案件卡、進行中案件卡、案件分類卡）不回頭換成 DS Card（使用者決定舊畫面不回頭修）。
- 2026-10-06：（批次 13a）沒有任何固定底部列的畫面，底部也固定放 DS `HomeIndicator`；以內容為主的長頁面高度要把它的 34 算進去，再加 2（Frame 外框的 1px 描邊算進排版）。Why：2.2.1、2.2.2、2.2.3 底圖漏放，使用者指出；高度少 2 會讓 `Content` 比內容短，捲動範圍被截。
- 2026-10-06：（批次 13a）可捲動的畫面分兩層：`Content`（固定 Fill、裁切、不設 padding）裡只放一層 `Scroll Content`（Hug 高度），所有 padding 與內容都在內層；底部 padding 預設 `Spacing/16`，有浮動 BottomNavBar 時是 134（導覽列 82＋中央 Logo 凸出導覽列上緣的 36＋16）。Why：固定大小的 Auto Layout 框在內容超出時不把自己的底部 padding 算進捲動範圍，捲到底內容會被底部列遮住；Logo 凸出的 36 不在導覽列 82 的範圍內。批次 12 與管理員端已畫好的畫面仍是舊結構（padding 在 `Content`、底部只算 82），使用者決定不回頭修，新規則只用在批次 13 之後新畫的畫面。
- 2026-10-06：（批次 13b）同一個畫面有多個狀態（例如單位選「台」與選「式」、欄位正常與驗證錯誤）時，不新增 Frame：畫資訊較多的那個狀態（選「式」含提醒），其餘狀態寫進批次紀錄，欄位錯誤只記文字（使用 DS `TextField` 的 State=Error）。Why：`figma-build-r01.md` 暫緩表已規定相同版型的狀態變體合併在既有情境註記、不拆新 Frame；我先前提議新增一格與此規則不一致，使用者請我查原本的處理方式後採用。
- 2026-10-06：（批次 13b）報價分類列（`QuotationCategoryRow`）維持本機元件，不改用 DS `ListItem`；列高照程式實際算 64（上下 8＋右側點擊區 48）。標準報價項目表單（`StandardFeeItemForm`，展開／收合）補做成本機元件。Why：ListItem 只有單行標題，放不下標題旁的小字說明，字級也不同；程式的 `IconButton` 在 Material 2 最小 48，原本畫的 44 偏矮。`StandardFeeItemForm` 在 2.4.4 出現展開、收合各一次，並出現在 2.4.5、2.4.6 的底圖，2.5.3 報價明細可能重複。
- 2026-10-06：（批次 13b）DS `TextField` 新增 `Show Helper Row` 布林（預設開）：沒有說明文字、字數、錯誤訊息的欄位一律關閉，整列才會移除、高度才會縮短。Why：使用者在 DS 新增；關閉前每個欄位下方多一列空白（2.4.4 多出 104）。
- 2026-10-07：（批次 13c）師傅端新增 Frame「2.4.1 上傳報價單」（訂單狀態等待提交報價，含「開始報價」膠囊按鈕），原 2.4.1 至 2.4.11 順移為 2.4.2 至 2.4.12，結構表 `figma-build-r01.md` 一併更新，師傅端 Frame 數 78 改為 79、三檔合計 270 改為 271。Flutter repo 的證據文件與 handoff 沒有改，對照時師傅 2.4.x 加 1。Why：使用者發現漏了這個階段；程式在訂單狀態 30、35 顯示這個畫面，原結構表只收按下「開始報價」之後的報價單。
- 2026-10-07：（批次 13c）師傅端再新增 Frame「2.6.1 施工進行中」（客戶已同意報價並付訂金後的訂單資訊頁摘要，程式 `MasterOrderWorkInProgressSection` 預設畫面），原 2.6.1 至 2.6.3 的調整見下一條（最終 2.6 為三格）。Why：使用者確認；原結構表只有按下「上傳施工照片並驗收」之後的上傳畫面，漏了報價被同意後師傅看到的施工中摘要。
- 2026-10-07：（批次 13c）2.6 調整為三格：2.6.1 施工進行中、2.6.2 施工中有未同意報價（新增，施工中送出追加報價單後才會出現）、2.6.3 施工／完工照片上傳；原 2.6 的刪除照片確認與上傳失敗兩格不畫，改沿用 2.3 新增的 2.3.3 刪除照片確認與 2.3.2 照片上傳失敗（2.3.2 由「施工前照片上傳失敗」改名）。原則：同一個 Page 內重複的共用 Dialog 只留最早出現的位置，其他 Page 因為是獨立檔案頁，自有一份（4.4 照常畫）。師傅端 Frame 數維持 80，三檔合計 272，13a 改 10 格、13c 改 6 格。Why：使用者決定；「有未同意報價」後端只在施工中追加報價單後才標旗標，屬於 2.6 而不是 2.5；兩個 Dialog 文字與流程完全相同，沒必要在同一個 Page 畫兩份。
- 2026-10-07：（批次 13c）程式裡整寬、無左右邊距的白底帶（金額與工期區塊、查看報價資訊區塊、報價分類列、工程細項卡）Card 一律用 Layout=Fill 並填滿螢幕寬；使用者指出後 2.4.3、2.4.7、2.4.8（順移後 2.4.4、2.4.8、2.4.9）與 2.5.1、2.5.3 都已改。Why：使用者指出符合實際樣子。
- 2026-10-07：（批次 13c）訂單資訊、客戶資訊、對話按鈕做成本機元件 `OrderBasicInfo`，換進 2.2.1、2.2.3、2.3.1、2.3.2、2.5.1，之後同一張訂單資訊卡一律用它。Why：使用者提議，同一組內容在五個以上畫面重複。
- 2026-10-07：（批次 13d）驗收的三種方式（行動條碼 QR、簽名、直接驗收）各自是獨立流程，拆成各自的 Frame：2.7 由 6 格變 9 格，新增 2.7.2、2.7.6（進入提示的 QR 與簽名版）與 2.7.8（簽名確認，底圖是簽名板），原 2.7.2 至 2.7.6 順移為 2.7.3、2.7.4、2.7.5、2.7.7、2.7.9。Flutter repo 證據文件（T-0104）仍是舊編號，對照時 2.7.2 起要對照新表。Why：使用者指出各驗收方式的畫面與去向不同；程式在進入狀態 60 時就依客戶選的方式自動跳出不同文字的提示，按下「完成驗收」後開的畫面也不同。
- 2026-10-07：（批次 13d）師傅端新增 Frame「2.6.4 開始驗收」（施工照片送出後狀態變成等待開始驗收，上傳表單多出深藍「開始驗收」按鈕，送出鍵文字變「繼續上傳施工照片」），編號接在 2.6.3 之後、不動既有編號。師傅端 Frame 數 80 改 84、三檔合計 272 改 276，結構表同步。Why：使用者發現漏了；程式 `MasterOrderWorkInProgressSection` 在 `showUpload` 且狀態 58 時才顯示「開始驗收」。
- 2026-10-07：（批次 13d）2.7.1 畫客戶還沒選驗收方式的狀態，「完成驗收」按鈕停用，不另開 Frame；2.7.2 以後的畫面代表客戶已選方式，按鈕可按。Why：使用者實機確認，客戶未選時按鈕是停用（淡藍）的；程式與後端我讀不出這條路徑，以實機為準。
- 2026-10-07：（批次 13d）2.7.3 相機預覽維持黑色方塊佔位，圖層名稱「相機預覽（系統畫面，待補）」。Why：使用者確認；相機是系統鏡頭，沒有素材，也不加程式沒有的掃描框線。
- 2026-10-07：（批次 14）師傅端新增 Frame「3.1.2 收入說明提示」，展示年度收入、年度接案數、訂單明細三個資訊圖示的說明提示，使用 DS `Tooltip`（Open=true）；三個並列在同一格（程式一次只出現一個）。師傅端 Frame 數 84 改 85、三檔合計 276 改 277，結構表同步。Why：使用者決定；提示會遮住內容，不適合畫在 3.1.1，且 DS 已有 Tooltip 元件。這是「同一畫面多個狀態不拆 Frame」規則的例外：提示是遮擋內容的暫時浮層，獨立成格才看得到被遮的部分。
- 2026-10-07：（批次 14）原 3.2.2「尚無已完成案件」搬進 3.1 改為 3.1.3（接在 3.1.2 之後、不動既有編號），3.2 只剩 3.2.1；三檔 Frame 總數維持 277。Flutter repo 證據文件（T-0105）仍把它記成 3.2.2。Why：使用者指出；它是「我的收入」整頁在沒有訂單明細時的狀態，上方圖表與金額同一頁，屬於收入總覽。
- 2026-10-07：（批次 14）畫面上的資訊圖示一律用 DS `Tooltip`（收合 Open=false，展開 Open=true），會遮住內容的暫時浮層（提示）獨立成一格，其他格顯示收合的觸發圖示。規則已寫入 fill-figma-ssot Skill。Why：使用者決定；提示會遮擋內容，且 DS 已有 Tooltip 元件。
- 2026-10-07：（批次 15）師傅端 4 帳號改成 5 個 Section：帳號首頁（原 4.3.1）移到最前面成為 4.1.1，師傅資料與評價（原 4.1.1）改 4.1.2，Section 4.1 改名「帳號首頁與師傅資料」，原 4.3 推播通知設定刪除（推播開關是帳號首頁的一列）；原 4.4 至 4.6 順移為 4.3 至 4.5。Frame 數維持 10，師傅端 Section 24 改 23，結構表同步。Flutter repo 證據文件（T-0106、T-0107）仍是舊編號，對照時要看新表。Why：使用者指出帳號首頁是其他畫面的入口，應排在 Page 最前面；原 4.3 只剩這一格。
- 2026-10-07：（批次 15）帳號首頁的「帳號設定」「推播通知」圖示換成 Phosphor Duotone，淡色那層綁 `Brand/TigerYellow` 且不透明（Phosphor 預設淡色層 20% 透明，改為不透明），深色線條維持原圖示色。Why：使用者決定；程式原本是自家彩色圖片，沒有向量。
- 2026-10-07：（批次 15）師傅端「提前撥款申請」整個 Section（原 3.3.1 至 3.3.3，批次 14 已畫）搬到 4 帳號，成為 4.4.1 至 4.4.3；原 4.4 操作說明與規範順移為 4.5，原 4.5 登出與角色切換順移為 4.6。3 我的收入剩 3.1、3.2（4 格），4 帳號變 6 個 Section、13 格，師傅端 Section 與 Frame 總數不變。Flutter repo 證據文件 T-0105 仍把它記在 3.3。Why：使用者指出提前撥款只有帳號頁一個入口（4.1.1「提前撥款」），放在帳號 Page 較直觀。
- 2026-10-07：（批次 15）師傅端 Page「3 收入與撥款」改名「3 我的收入」，連同結構表、進度表同步。Why：使用者指出裡面已經沒有撥款內容；「我的收入」與導覽列分頁名稱、3.1.1 標題一致。
- 2026-10-07：（批次 15）證照上傳（4.3）與頭像上傳（4.2）不畫上傳失敗畫面。Why：程式沒有這類錯誤處理（證據文件 T-0106、T-0107：任一上傳失敗時沒有錯誤提示，證照頁只會停在「上傳中...」），沒有現況可照。
- 2026-10-07：（批次 16）師傅端新增 Frame「5.1.8 客戶回覆約施工時間」「5.1.9 同意客戶的約施工時間請求」「5.1.10 拒絕客戶的約施工時間請求」，放在照片系列（5.1.3 至 5.1.6）之後、日期選擇（5.1.7）之後，順序與輸入列「傳送照片、約施工時間」一致；原 5.1.3 日期選擇改 5.1.7，原 5.1.4 至 5.1.7 前移為 5.1.3 至 5.1.6。師傅端 Frame 數 85 改 88、三檔合計 277 改 280，結構表同步。Flutter repo 證據文件（T-0108）仍是舊編號，對照時 5.1.3 起要對照新表。Why：使用者發現約施工時間送出後的邀請、回覆流程沒有 Frame；查證後原請求不會改，回覆是新增訊息，同意時同一方的 App 還會自動送出「【系統訊息】施工時間更改至…」。
- 2026-10-07：（批次 16）日期時間選擇面板（程式 `DateSelectBottomSheet`）先做成本機元件 `DatePickerPanel`，之後升級進 DS（DS 待辦 11），客戶端 6.1 的約施工時間也會用到；BottomSheet 標題列右側的文字按鈕（「完成」）位置問題記為 DS 待辦 12。Why：DS 沒有日曆與時間滾輪；使用者決定升級，但要等客戶端批次前集中處理。
- 2026-10-07：（批次 16）客戶聊天室頂部的可關閉提醒用 DS `Banner`（Tone=Error），文字與關閉圖示綁 `Status/Error`。Why：使用者指定，程式是紅字紅圖示，DS 的 Error Banner 預設文字不是紅色。
- 2026-10-07：（批次 17）師傅 6.1.4「系統推播橫幅點擊」只畫手機系統的推播橫幅，底圖用灰色，不畫任何 App 畫面，點擊後的目的地也不畫；圖示用 DS `Logo-AppIcon`。往後類似的系統畫面邊界照此辦理。Why：使用者決定；橫幅是系統畫面不是 App 的，且點擊後去哪裡由後端 payload 決定，沒有固定畫面可畫。
- 2026-10-07：（批次 17）通知列（`OrderNotificationItem`、`SystemNotificationItem`）維持本機元件，不升級進 DS，客戶端批次 06 畫到時再判斷。Why：使用者同意；目前只有師傅端用到，客戶端 4.1 雖然用同一個程式 widget，但還沒畫。
- 2026-10-07：（檢查點 3）流程精簡：決策原文從 stage3.md 移到本文件，Skill 不讀；近似對應表從 reference.md 拆成 approximations.md，只用 Grep 查；`screen-types.md` 拆成每次讀的通則與依類型讀的 `references/types/`；結構檢查片段拆成獨立檔，Section 結束才讀。Why：開場要整份讀的量約 145 KB，其中大半與 Skill 重複或只跟師傅端有關；目標是省 token 並讓 Sonnet 更穩定。
- 2026-10-07：（檢查點 3）客戶端大批次預先切成 session row，一個對話約 12 到 15 格，依 Section 邊界切；批次 06（4 格）與 07a 併成一個對話。Why：開場變輕後，一個對話可以畫得比師傅端的約 10 格多一些；但每回合都重讀整段對話，成本隨格數平方成長，長對話也容易忘記規則，所以只適度放寬。
- 2026-10-07：（檢查點 3）`DatePickerPanel` 升級進 DS（DS 待辦 11）與 BottomSheet 雙按鈕（10）、標題列文字按鈕（12）合併為「DS 升級 2」，另開 Opus 對話，排在客戶端批次 04 之前。Why：三件都是 BottomSheet 相關；客戶端 2.5.3 叫修選日期就會用到；本機元件不能跨檔案使用，客戶端檔案用不到師傅檔裡的 `DatePickerPanel`。
- 2026-10-07：（檢查點 3）每段對話畫第一格之前做「開工檢查」，一則訊息交使用者確認：對照程式路由與狀態映射找出結構表漏格、可合併或該拆的格；每格對應的畫面類型與新類型；整段共用的示意資料計畫；由後端或 App 組出的文字與送出方。結果寫進批次紀錄的「開工檢查」，同一批的後續對話沿用。Why：師傅端返工多來自畫到一半才發現的事，8 次結構變動（2.4.1、2.6.x、2.7 拆格、3.1.2、3.3 搬移、4 重排、5.1.8 至 5.1.10）、批次 13 回頭改批次 12 的 5 格示意資料、13b 新類型沒先停下確認、約施工時間只查後端；客戶端訂單流程跨 5 個對話，示意資料要能沿用。

---

## 已完成的 DS 處理（自 components.md 移入）

### 元件狀況（截至檢查點 2）

**管理員端需要的元件，Figma 都已有**：BottomNavBar（Admin）、AppBar、ListItem、Avatar、Badge、ChatAppBar、ChatBackground、MessageBubble、ChatInputBar、BottomSheet、Dialog、StatusBar、HomeIndicator。

**Design System 檔案中的空白頁**：只剩 StepIndicator 頁沒有元件，訂單進度相關畫面可能需要用到，輪到這些 Page 之前要先確認是否補建。EmptyState、Carousel 兩頁已在 DS 升級補建（2026-10-06）。

**DS 升級（2026-10-06）**：`Carousel`、`EmptyState`、`PriceRangeIndicator`、`WarrantyPill` 升級進 DS（後兩者放新增的 Service 頁），新增原始色 `PriceGradient/Light`、`PriceGradient/Deep`。師傅 1.1.x、1.2.x、1.3.1 已換成 DS 版本，舊的本機元件已刪除。規格見 `docs/design-system/components/` 的 carousel.md、empty-state.md、price-range-indicator.md、warranty-pill.md。

**BottomSheet 已擴充（2026-10-05）**：原本底部按鈕區只能絕對定位貼底，內容短時會蓋住內容。已新增 Footer variant（Sticky／Inline）與 hasDragHandle，`hasStickyFooter` 改名為 `hasFooter`，規格見 `docs/design-system/components/bottom-sheet.md`。

**沒有 iOS 動作選單元件**：程式多處使用 CupertinoActionSheet，依決策改用 BottomSheet（Footer=Inline、拖曳把手）+ ListItem + Ghost Neutral「取消」，不另建元件。

**ListItem 已擴充（2026-10-05）**：新增 State variant（default／pressed，按下底色 `Overlay/Pressed/Neutral` 12%），左右 `Spacing/16` 收進元件，分隔線內縮。規格見 `docs/design-system/components/list-item.md`。

**Button 的 Outlined 加白底（2026-10-05）**：Primary、Secondary、Neutral Outlined 共 54 個 variant 最底層加 `Background/Surface`，按下狀態的 12% 疊色保留在上層。規格見 `docs/design-system/components/button.md`。

**Button lg 高度改為 48（2026-10-05）**：54 個 lg variant 加最小高度 `Spacing/48`，內距不變，內容垂直置中；原本一個高度固定 44 的 variant（Primary Filled／rect／default）改為依內容撐開。

**PhotoViewer、VoiceCallScreen 升級進 DS（2026-10-05）**：PhotoViewer 放 Image 頁，下載鍵移出 AppBar 做成 Has Download；VoiceCallScreen 放 Chatroom 頁，結構照本機元件。規格見 `docs/design-system/components/photo-viewer.md`、`voice-call-screen.md`。

**StatusBar、HomeIndicator 只保留 393（2026-10-05）**：StatusBar 刪除 375 變體並拿掉 Frame Group 屬性，HomeIndicator 改為 393 寬，放入時不必再手動拉寬。

### 已完成的 DS 待辦

| # | 項目 | 內容 | 狀態 |
|---|---|---|---|
| 1 | 接回 Phosphor 圖示庫 | DS 的 icon 元件引用的 Phosphor 元件顯示「Component removed from library」，既有圖示仍能顯示，但無法替換或新增。使用者把 Phosphor Icons（2.1，1,512 icons × 6 weights）復原到團隊的 Design System 資料夾並重新發布（2026-10-05）。復原後元件 Key 與原本相同（例如 Smiley Outline Regular 仍是 `c90b73f1…`），既有引用直接接回，不需要 Swap library。圖示庫已可用搜尋找到 | 已完成 |
| 2 | `PhotoViewer` 升級進 DS | 以 `/sanji` 升級。建議屬性：Has Send（右下傳送鍵）、Has Download（右上下載鍵）、Photo（外露 Image，可換照片或切載入中、失敗）。Has Download 的做法待使用者決定：A. 維持外露 AppBar 切 Has Action；B. 下載鍵移出 AppBar、放在元件本身那層疊在右上，才能做成真正的開關（Claude 建議 B）。使用者選 B，已建立於 DS 的 Image 頁 | 已完成 |
| 3 | 1.2.6 下載鍵換圖示 | 已把 1.2.6 下載鍵的 Smiley 佔位換成 Phosphor DownloadSimple（Regular、`Icon/Inverse`）。下載鍵在外露 AppBar 的 Slot 裡，不在 `PhotoViewer` 元件中；2 升級時若採做法 B，要把這顆鍵移進元件 | 已完成 |
| 4 | 375 系統列淘汰 | 依 [layout.md](../../../../design-system/tokens/layout.md)，目標全面使用 393。StatusBar 刪除 Frame Group=375 兩個變體並拿掉只剩一個值的 Frame Group 屬性；HomeIndicator 目前只有 375 寬，改為 393（現在每次放入都要手動拉寬）。刪除前已確認 DS 與三個 App 檔案（含 Archive、舊檔案頁）都沒有引用 375 變體；兩個 375 變體已刪除、Frame Group 屬性已拿掉，HomeIndicator 已改 393 寬 | 已完成 |
| 5 | 通話畫面換圖示 | 已在本機元件 `VoiceCallScreen` 兩個 State 把掛斷鍵的 Smiley 佔位換成 Phosphor PhoneDisconnect（Fill，對應程式 `call_end_rounded`，`Icon/Inverse`），1.3.1、1.3.2 跟著更新 | 已完成 |
| 6 | 價格區間指示條（含「件數最多」標籤）與保固膠囊 | 師傅 1.2.1 自己排：漸層條加向下尖角的標籤、灰色膠囊放兩組圖示加天數。DS 沒有對應元件。**做法已定（檢查點 2）**：分成 `PriceRangeIndicator` 與 `WarrantyPill` 兩個元件，放新增的 Service 頁；以本機元件的屬性為基礎（Position Low／Mid／High、Min Price、Max Price、Marker Label；Residential、Commercial），都加是否顯示說明文字的開關與說明文字屬性（程式 `PriceRange` 的 `showDescription`、`WarrantyDate` 預設顯示說明）；價格區間的三個程式原色 #40AEFE、#3449FF、#3A89F8 新增為 DS 原始色並綁定（命名寫規格時提案）。完成後更新 reference.md 近似對應表的價格區間特例。**結果**：#3A89F8 等於既有 `Blue/500`，只新增 `PriceGradient/Light`、`PriceGradient/Deep`；`PriceRangeIndicator` 收進常見價格行（Summary）與說明（Has Description），師傅 1.2.1 至 1.2.5 已換成 DS 版本（關說明），reference.md 已更新 | 已完成 |
| 7 | 輪播 Banner | 師傅 1.1.1 首頁已做成本機元件 `CarouselBanner`（Image 佔位照加三個分頁圓點）。**做法已定（檢查點 2）**：升級為 DS `Carousel`，放既有的 Carousel 頁；結構照本機元件（外露 Image、variant 決定選中第幾顆），圓點固定 3 顆，客戶端首次介紹頁若有相同圓點再拆成獨立元件。**結果**：已建 DS `Carousel`，師傅 1.1.1 至 1.1.5、1.3.1 已換成 DS 版本 | 已完成 |
| 8 | 通用空狀態 | 師傅 1.1.2、1.1.3 的 `MasterHomeEmptyState` 改做成通用的 DS `EmptyState`，放既有的 EmptyState 頁：插圖佔位（之後可從 Illustration 頁取用）＋標題＋說明＋可選按鈕。先看程式另外兩處空狀態（`master_income_page.dart`、`order_detail_match_fail_page.dart`），確認通用版能涵蓋。完成後師傅 1.1.2、1.1.3 改用 DS 版本。**結果**：已建 DS `EmptyState`（Size Compact／Page，插圖為 Slot），三處都能涵蓋；師傅 1.1.2、1.1.3 已換成 DS 版本，插圖沿用原本的向量 | 已完成 |

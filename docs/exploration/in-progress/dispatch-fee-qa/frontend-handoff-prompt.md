# 交接給前端 AI Agent：官網 QA 新增派遣費說明

## 給 Yode 的說明

前端 repo（`fdtigermaster-offical-site`）跟這個知識庫是不同專案。下面的提示指令會請
對方的 AI agent 直接讀 `qa-copy.md`（同一台機器，絕對路徑），文案以那份檔案為準，
這裡不重複貼文案內容，避免兩邊之後各自改、對不起來。

如果對方的 agent 沒有權限讀這個路徑，把 `qa-copy.md` 的內容貼給它就好。

之後文案若調整，只要改 `qa-copy.md`，不用回來動這份交接文件。

---

## 提示指令（複製下面整段給前端 repo 的 AI agent）

```
請協助修改這個官網 repo 裡的兩個檔案：
src/components/QA/Order.vue（orderList 陣列）
src/views/MobileQA.vue（MobileQAList 陣列）

目標：官網「常見問題」裡補齊派遣費（含加成時段）相關內容。客戶目前在官網 QA 查不到
派遣費依時段加成的規則（幾點到幾點、各多少錢），但 App 下單前已經有一份完整說明，
這次要讓官網 QA 的資訊跟 App 一致，並修正 QA 裡兩則既有問答中不準確或答非所問的地方。

最終要呈現的文案、每一則要放在清單的哪個位置、要新增/修改/刪除哪些既有問答，都寫在
這份文件裡，請你先讀過，作為文案的唯一依據：
C:\yode\tigermaster-one-piece\docs\exploration\in-progress\dispatch-fee-qa\qa-copy.md

如果需要更多背景（為什麼要改、跟 App／法律條款／後端計費規則的對照過程、有哪些已知
但這次不處理的問題），可以參考同資料夾的：
C:\yode\tigermaster-one-piece\docs\exploration\in-progress\dispatch-fee-qa\dispatch-fee-qa.md

請注意：

1. 讀完 qa-copy.md 後，如果有任何看不懂、跟目前程式碼對不起來、或需要我補充判斷的地方，
   直接提出來問我，不要自己假設或腦補。
2. 先不要動手改程式碼。請先列出你打算怎麼修改（改哪個檔案、哪一則問答、改成什麼內容、
   在清單裡的什麼位置），給我看過、我確認之後，你再實際執行修改。
3. 兩個檔案目前既有的標點符號風格不一樣（Order.vue 內文偏好半形逗號和半形括號，
   MobileQA.vue 用全形逗號和全形括號）。實際寫入時請照每個檔案自己現有的風格，
   不要照搬 qa-copy.md 裡的標點。
4. MobileQA.vue 目前的版面本身有一些既有問題（例如答案字串裡的換行超過一定數量會被
   截斷、答案區塊之間有分隔線、按鈕樣式跑掉），這些這次不在處理範圍內，不要順手修，
   只改資料內容。
5. 只改上面指定的兩個檔案裡跟派遣費相關的項目，不要動到其他既有問答、其他檔案，或
   任何元件的 template / script / 樣式邏輯。
```

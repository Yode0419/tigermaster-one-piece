# 後台操作指南建置 TODO

_搭配 `methodology.md` 使用：methodology.md 是規格，這份是目前的行動清單。新 session 兩份一起讀，就能接續進度。_

_最後更新：2026-09-17_

## 現況

`docs/wiki/operations/backoffice-guide/` 目前是空資料夾。原本的兩份試做文件(customer-data.md、login-record.md)跟 INDEX.md、overview.md 已經刪除，因為是架構定案前的舊 5 欄格式，架構穩定後直接重建更快，不用逐一改格式。

## Step 1：基礎建置(一次性準備工作，不是重複性 SOP)

- [ ] 委派 scout 盤點 `fdtigermaster-admin-web` 的路由與側邊選單，列出完整頁面清單，標出已知的巢狀複雜頁面群(目前已知：訂單詳情、使用者詳情、說明會，實際盤點可能不只這些)
- [ ] 依盤點結果建立 `docs/exploration/in-progress/backoffice-guide/build-tracker.md`(格式見 methodology.md「文件規格」)
- [ ] 依側邊選單分類，鋪出 `docs/wiki/operations/backoffice-guide/overview.md` 的分類骨架(讀者導覽用，不含風險表格，格式見 methodology.md)
- [ ] 建立 `docs/wiki/operations/backoffice-guide/INDEX.md`(純目錄，分「功能說明」「操作指南」兩區，目前都是空的)

## Step 2：手動試跑 2-3 個真實頁面(驗證 SOP，先不封裝 skill)

- [ ] 挑一個單純 flat 頁面，照 methodology.md「逐頁面建置流程」走一次
- [ ] 挑一個巢狀複雜頁面群(例如訂單詳情的其中幾個分頁)，照「巢狀頁面處理規則」走一次
- [ ] 跑完後檢查：4 欄格式、⚠ 標示、build-tracker.md／overview.md／INDEX.md 是否都正確更新，規格有沒有卡住或需要再調整的地方
- [ ] 規格如果因此調整，回頭同步更新 methodology.md 跟 DECISIONS.md

## Step 3：封裝成 skill

- [ ] SOP 跑順、規格穩定後，把逐頁建置流程封裝成 skill(暫定名稱與概述見下方)
- [ ] 更新專案 `CLAUDE.md` 與 `README.md` 的 skill 表

---

## 未來的 skill：`/franky`(命名已定)

**命名理由**：後台系統想像成一艘船，法蘭基是這艘船的輪機長，最懂船的內部構造怎麼運作，由他來寫這艘船的使用手冊——不是「照藍圖蓋一艘新船」，是「懂現有這艘船，寫出說明書」。跟現有的 Roger(挖掘知識)、Nami(導覽)、Luffy(設計討論)、Sanji(從既有輸入萃取元件規格)、Robin(考古／歸檔)相比，是缺的那個「理解既有系統、產出說明文件」的角色，跟 Sanji 是同一種形狀的工作(從既有產出物逆向萃取結構化文件)，只是對象換成後台功能頁面。

**互動方式**：不是全自動跑批次，是像 `/roger` 一樣**引導式問答**，讓建置過程自然順暢，不是丟一堆掃描結果就結束：

1. **選定範圍**：從 `build-tracker.md` 挑一個(或多個)「說明文件」欄位空白的頁面，或使用者直接指定
2. **找參考**：委派 scout 掃描該頁面對應的前端路由與後端 API，並對照既有 wiki／exploration 業務文件
3. **列出已知資訊**：把掃描結果整理成初步的功能清單給使用者看(這是什麼、目前看到哪些操作、風險初判)，不是直接寫成最終文件
4. **對答調整或補充**：使用者可能知道 scout 掃不出來的細節(例如某功能其實已經停用、某風險判斷需要修正)，這一步跟使用者來回確認
5. **精煉內容**：把確認後的資訊收斂成 methodology.md 的 4 欄格式(這是什麼／功能內容／需要注意的地方／相關連結)，巢狀頁面群依資料夾規則處理
6. **歸檔**：寫入功能說明文件，更新 `build-tracker.md`、`INDEX.md`；如果該頁面所屬分類還沒被列進 `overview.md`，一併補上；提示使用者 commit

**與其他 skill 的關係**：獨立運作，不串接 `/write-doc`、`/archive-doc`(格式與存放位置已被 methodology.md 完全定死，不需要它們的判斷邏輯)。`/robin` 是下游：等這個 skill 跑穩、方法論確定被實際採用後，`/robin` 才把 methodology.md 本身同步進 `docs/design-ops/`。

**暫不涵蓋**：操作指南文件(`procedures/`)那條線現階段仍不建置，等 PM 實際知道有哪些值得寫的操作情境後，可能需要另一個較不自動化的流程(靠 PM 熟悉度撰寫，而非掃程式碼驅動)，要不要也做成 skill 到時候再議。

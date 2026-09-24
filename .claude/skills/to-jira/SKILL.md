---
name: to-jira
description: Turns a product requirement or a bug report into a Jira ticket for the tigermaster SCRUM project, through a duplicate check against existing tickets, a short Q&A, a priority check for requirements, and a full text preview that the user must explicitly approve before anything is created. Can also rewrite an existing SCRUM ticket's title, description or priority, with the same preview-and-approve step and an automatic backup. Works standalone or drafts from a docs/exploration/ document. Invoke when the user runs /to-jira, or says things like 「開一張票」「建 Jira ticket」「這個需求丟進 Jira」「回報這個 bug 到 Jira」「把這份規劃拆成 ticket」「更新 SCRUM-34」「把這張票的描述改掉」. Not for Morph Inspect bugs (that is the separate bug-to-jira skill).
---

# to-jira：需求／Bug 轉 Jira ticket

**全程使用繁體中文。** 不使用破折號。

## 檔案

| 檔案 | 用途 |
|---|---|
| `config/<專案>.json` | 站台、專案 key、issue type、標題前綴。預設 `tigermaster` |
| `templates/story.md`、`templates/bug.md` | 描述模板，擬稿前先讀 |
| `references/priority-rules.md` | 分流測試與需求優先級評分，需要時才讀 |
| `scripts/jira.py` | `check`／`search`／`get`／`preview`／`create`／`update` |
| `.env` | 個人金鑰，gitignore。**不要讀取、印出或貼進對話** |
| `backups/` | `update` 寫入前自動存的原內容，每張票只留最近 3 份，gitignore |

路徑以本 skill 資料夾 `.claude/skills/to-jira/` 為準。

## 最重要的原則：簡潔

票是給工程師快速看懂用的，不是寫越多越好。
- 每段能一句話說完就不要列點；列點最多三到五條。
- 只留定位問題所需的資訊，刪掉背景鋪陳、重複的話、客套。
- 沒有內容的段落直接省略，不要寫「無」。

## 流程

### 0. 連線檢查
執行 `check`。失敗時告訴使用者原因（多半是 token 過期，請他到 https://id.atlassian.com/manage-profile/security/api-tokens 重新產生，貼進 `.env`），不要繼續。

### 1. 確認來源
- 使用者提到 exploration 文件或功能資料夾：先讀相關文件，能從文件得到的欄位就不再問。
- 否則直接進入問答。
- 一份規劃可能要拆成多張票時，先列出拆法讓使用者確認，再逐張進行。
- 描述中不附來源文件連結。

### 2. 分流：需求還是 Bug
依 `references/priority-rules.md` 的分流測試判斷，把判斷和理由用一句話告訴使用者確認。

### 3. 重複檢查
在詳細問答之前做，避免白問一輪。SCRUM 無法刪除票，重複建立收不回來。

1. `search`（不帶關鍵字）列出全部票的標題，判斷有沒有意思相近的，換了說法也算。
2. `search <關鍵字>` 挑 2 到 3 個關鍵字，比對標題與描述，抓標題沒寫到的票。
3. 所有狀態都算，包括已完成（可能早就處理過，或是問題復發）。

沒有相似的票：一句話帶過，繼續問答。

有相似的票：列出票號、狀態、標題、連結，請使用者選：
- A. 還是要建立（講的不是同一件事）
- B. 不建立，結束
- C. 不建立，改為更新既有的票：照下方「更新既有的票」進行。skill 不在票上留言。

### 4. 問答補齊
- 一次問一題，已知的不問。
- 需求：角色、想做到的事、好處、目前遇到的問題、目標。
- Bug：頁面／功能、重現步驟、預期、實際、環境。
- 標題前綴非必要。明顯屬於某個平台時才加，從 config 的 `title_prefixes` 選：【Web】【App】【後台】，跨平台或前後端都牽涉時用【系統】。
- Bug 只寫事實，不寫修法建議；沒測過的寫「尚未測試」。
- 不設負責人、Labels、Epic。

### 5. 優先級（只有需求票）
依 `references/priority-rules.md` 逐題問四個面向，每題附上你的建議分數與一句理由，讓使用者確認或修改。算出總分與對應的 High／Medium／Low。使用者要覆寫就照他的。業務決策還沒定案時，建議不設優先級。

Bug 票不評嚴重度。

### 6. 預覽
把草稿寫成 JSON 檔（用 Write 工具，放在 scratchpad），格式見 `scripts/jira.py` 開頭說明。執行 `preview` 做格式檢查，通過後在對話中顯示完整預覽：

```
類型：任務　優先級：High
標題：【後台】...

<描述全文，照模板排版>

重複檢查：已比對 N 張，無相似票（或：使用者確認與 SCRUM-xx 不同）
```

問答中如果內容方向明顯改變，預覽前用新的關鍵字再 `search` 一次。

問使用者：「確認建立嗎？」使用者要修改就改完再預覽一次。

### 7. 建立
**只有使用者明確回覆「建立」「確認」「OK」「可以」這類同意時才執行 `create`。** 模糊的回覆（例如「嗯」「看起來不錯吧」、或同時提出修改）不算同意。SCRUM 無法刪除票，建錯收不回來。

建立後回覆票號與連結。Bug 票提醒使用者自己補上截圖或影片附件。

不要在建立後自行修改或留言，需要改時先問使用者，再照「更新既有的票」進行。

## 更新既有的票

從重複檢查的 C 進來，或使用者直接要求改某張票時使用。可以改標題、描述、優先級；狀態、負責人、留言都不動。

1. **先讀現況**：`get <票號>`。覆寫前一定要知道票上原本有什麼。
2. **擬更新版**：沿用第 4～5 步（問答、優先級），已知的不問。原票內容不在新版裡的，要保留的就搬進新版，常見的有：舊 Jira 搬遷時留的「原始票」連結、真正提需求的人（身為）、票上已有的優先級。
3. **說清楚差異**：預覽時除了新版全文，另外列出「原票有、新版會拿掉」的內容，讓使用者決定要不要保留。描述是整段取代，不是追加。
4. **預覽**：草稿 JSON 放 `config`、`key`，加上要改的欄位（沒放的欄位不動）。執行 `preview` 會顯示將覆寫哪些欄位，以及標題、優先級的前後對照。問使用者：「確認更新嗎？」
5. **更新**：同意的判斷跟第 7 步一樣，要明確同意才執行 `update`。它會先把原內容存到 `backups/`，再寫入。
6. **讀回確認**：再執行一次 `get`，確認內容正確，回覆票號、連結與備份檔路徑。

## 指令

在 Bash 執行（Windows 印中文需要 UTF-8 設定）：

```
PYTHONUTF8=1 PYTHONIOENCODING=utf-8 python .claude/skills/to-jira/scripts/jira.py check
PYTHONUTF8=1 PYTHONIOENCODING=utf-8 python .claude/skills/to-jira/scripts/jira.py search [關鍵字 ...]
PYTHONUTF8=1 PYTHONIOENCODING=utf-8 python .claude/skills/to-jira/scripts/jira.py get <票號>
PYTHONUTF8=1 PYTHONIOENCODING=utf-8 python .claude/skills/to-jira/scripts/jira.py preview <draft.json>
PYTHONUTF8=1 PYTHONIOENCODING=utf-8 python .claude/skills/to-jira/scripts/jira.py create <draft.json>
PYTHONUTF8=1 PYTHONIOENCODING=utf-8 python .claude/skills/to-jira/scripts/jira.py update <draft.json>
```

描述支援的 markdown：`## 標題`、`---` 分隔線、`1.` 編號列點、`-` 項目列點、`**粗體**`、`` `程式碼` ``、網址。

## 換成其他 Jira 專案

複製 `config/tigermaster.json` 成新檔改內容，草稿的 `config` 欄位填新檔名。不同站台要不同金鑰時，在新 config 的 `env_file` 指定另一個檔名（例如 `.env.other`）。`.gitignore` 已排除所有 `.env` 與 `.env.*`（`.env.example` 除外）。

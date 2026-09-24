---
name: to-jira
description: Turns a product requirement or a bug report into a Jira ticket for the tigermaster SCRUM project, through a short Q&A, a priority check for requirements, and a full text preview that the user must explicitly approve before anything is created. Works standalone or drafts from a docs/exploration/ document. Invoke when the user runs /to-jira, or says things like 「開一張票」「建 Jira ticket」「這個需求丟進 Jira」「回報這個 bug 到 Jira」「把這份規劃拆成 ticket」. Not for Morph Inspect bugs (that is the separate bug-to-jira skill).
---

# to-jira：需求／Bug 轉 Jira ticket

**全程使用繁體中文。** 不使用破折號。

## 檔案

| 檔案 | 用途 |
|---|---|
| `config/<專案>.json` | 站台、專案 key、issue type、標題前綴。預設 `tigermaster` |
| `templates/story.md`、`templates/bug.md` | 描述模板，擬稿前先讀 |
| `references/priority-rules.md` | 分流測試與需求優先級評分，需要時才讀 |
| `scripts/jira.py` | `check`／`preview`／`create` |
| `.env` | 個人金鑰，gitignore。**不要讀取、印出或貼進對話** |

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

### 3. 問答補齊
- 一次問一題，已知的不問。
- 需求：角色、想做到的事、好處、目前遇到的問題、目標。
- Bug：頁面／功能、重現步驟、預期、實際、環境。
- 標題前綴非必要。明顯屬於某個平台時才加，從 config 的 `title_prefixes` 選：【Web】【App】【後台】，跨平台或前後端都牽涉時用【系統】。
- Bug 只寫事實，不寫修法建議；沒測過的寫「尚未測試」。
- 不設負責人、Labels、Epic。

### 4. 優先級（只有需求票）
依 `references/priority-rules.md` 逐題問四個面向，每題附上你的建議分數與一句理由，讓使用者確認或修改。算出總分與對應的 High／Medium／Low。使用者要覆寫就照他的。業務決策還沒定案時，建議不設優先級。

Bug 票不評嚴重度。

### 5. 預覽
把草稿寫成 JSON 檔（用 Write 工具，放在 scratchpad），格式見 `scripts/jira.py` 開頭說明。執行 `preview` 做格式檢查，通過後在對話中顯示完整預覽：

```
類型：任務　優先級：High
標題：【後台】...

<描述全文，照模板排版>
```

問使用者：「確認建立嗎？」使用者要修改就改完再預覽一次。

### 6. 建立
**只有使用者明確回覆「建立」「確認」「OK」「可以」這類同意時才執行 `create`。** 模糊的回覆（例如「嗯」「看起來不錯吧」、或同時提出修改）不算同意。SCRUM 無法刪除票，建錯收不回來。

建立後回覆票號與連結。Bug 票提醒使用者自己補上截圖或影片附件。

不要在建立後自行修改或留言，需要改時先問使用者。

## 指令

在 Bash 執行（Windows 印中文需要 UTF-8 設定）：

```
PYTHONUTF8=1 PYTHONIOENCODING=utf-8 python .claude/skills/to-jira/scripts/jira.py check
PYTHONUTF8=1 PYTHONIOENCODING=utf-8 python .claude/skills/to-jira/scripts/jira.py preview <draft.json>
PYTHONUTF8=1 PYTHONIOENCODING=utf-8 python .claude/skills/to-jira/scripts/jira.py create <draft.json>
```

描述支援的 markdown：`## 標題`、`---` 分隔線、`1.` 編號列點、`-` 項目列點、`**粗體**`、`` `程式碼` ``、網址。

## 換成其他 Jira 專案

複製 `config/tigermaster.json` 成新檔改內容，草稿的 `config` 欄位填新檔名。不同站台要不同金鑰時，在新 config 的 `env_file` 指定另一個檔名（例如 `.env.other`）。`.gitignore` 已排除所有 `.env` 與 `.env.*`（`.env.example` 除外）。

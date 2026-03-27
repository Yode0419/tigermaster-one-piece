---
name: write-doc
description: Turns accumulated knowledge — from /roger sessions, meeting notes, interviews, or raw discussion — into clean, structured Traditional Chinese Markdown documents. Use whenever the user wants to write, draft, or save a document from conversation content. Trigger on: "幫我寫成文件", "整理成文件", "記錄下來", "存成 markdown", "write a doc for this", "draft the doc", "save this as a document", or any similar intent to crystallize a conversation into a document.
---

# write-doc

Turn conversation content into a well-structured Markdown document.

**All document content is written in Traditional Chinese (繁體中文). File names and paths use English.**

---

## Workflow

### Step 1: Understand the content

Extract the key information from the current conversation (or material the user provides):

- What is the core topic?
- What are the key facts, decisions, or knowledge worth preserving?
- Are there open questions or unconfirmed details to mark as TBD?

### Step 2: Draft the document

Write the full draft using the appropriate structure (see templates below). **Show the draft to the user — do not write to disk yet.**

Present it like this:

```
## 草稿預覽

---
[document content]
---

內容 OK 嗎？確認後請告訴我要怎麼處理這份文件：
1. 存到草稿區（`docs/_drafts/`），之後再決定歸檔位置
2. 用 /archive-doc 幫我決定歸檔位置
3. 我自己指定路徑：___
```

### Step 3: Save based on user choice

- **Option 1 — Draft area**: Save to `docs/_drafts/[filename].md`. Use a descriptive filename in kebab-case. The draft will appear in `docs/INDEX.md` under the drafts section.
- **Option 2 — archive-doc**: Hand off the confirmed content to `archive-doc`, which will determine the right path, save the file, and update `docs/INDEX.md`.
- **Option 3 — Custom path**: Save directly to the path the user specifies. Create the directory if it doesn't exist.

---

## Document Structure

Choose the structure that best fits the content. Add or remove sections based on what was actually discussed — never leave a section empty to fill the template. If something wasn't covered, mark it TBD rather than leaving it blank or guessing.

### General knowledge document

For product descriptions, role explanations, feature overviews, or anything that doesn't fit a more specific type.

```markdown
# [Title]

## 概述

[One or two sentences on what this document covers]

---

## 背景與脈絡

[Why this exists or what problem it addresses]

## [Core content — title varies by topic]

[Main content]

---

## 待釐清事項（TBD）

- [ ] [Items that need follow-up or confirmation]
```

### Process / flow document

For step-by-step flows, SOPs, or anything describing how something works end-to-end.

```markdown
# [Process Name]

## 概述

[Purpose and when this process applies]

---

## 相關角色

| 角色 | 職責 |
|-----|-----|
| [Role] | [Responsibility] |

## 流程步驟

1. **[Step name]**
   [Description]

2. **[Step name]**
   [Description]

## 例外與邊界情況

[How non-standard situations are handled]

---

## 待釐清事項（TBD）

- [ ] [...]
```

### Decision record (ADR)

For decisions that have lasting impact and need to be traceable. All sections are required — write TBD rather than dropping a field.

```markdown
# [Decision Title]

**日期：** YYYY-MM-DD
**狀態：** 已決定 / 討論中 / 已棄用

---

## 背景

[What situation or problem prompted this decision]

## 決定

[What was decided, stated clearly and concisely]

## 理由

[Why this direction was chosen]

## 考慮過的替代方案

- **方案 A**：[description] — 未採用，因為 [reason]
- **方案 B**：[description] — 未採用，因為 [reason]

## 後果與取捨

[What this decision enables, and what it costs or constrains]

---

## 待釐清事項（TBD）

- [ ] [...]
```

---

## Writing principles

- **Structure over completeness**: A clear skeleton with TBDs is better than content filled with guesses.
- **TBD is valid information**: Explicitly mark what is unknown or unconfirmed — don't fill gaps with assumptions.
- **Preserve terminology**: Use the exact terms from the conversation. Don't substitute synonyms.
- **Only document what was said**: Do not add background knowledge or inferred details that weren't part of the discussion.
- **Tables for comparison, lists for steps**: Use tables when comparing across dimensions; use numbered lists for sequential steps.

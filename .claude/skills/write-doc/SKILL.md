---
name: write-doc
description: Turns accumulated knowledge — from /roger sessions, /luffy design sessions, meeting notes, interviews, or raw discussion — into clean, structured Traditional Chinese Markdown documents. Use whenever the user wants to write, draft, or save a document from conversation content. Trigger on: "幫我寫成文件", "整理成文件", "記錄下來", "存成 markdown", "write a doc for this", "draft the doc", "save this as a document", or any similar intent to crystallize a conversation into a document.
---

# write-doc

Turn conversation content into a well-structured Markdown document.

**All document content is written in Traditional Chinese (繁體中文). File names and paths use English.**

---

## Document Types

Choose the type that best fits the content, then read the corresponding reference file for the template:

| Type | When to use | Reference file |
|------|------------|----------------|
| 功能規劃文件 | Planning a new feature or optimization — from a /luffy session or direct discussion | `references/feature-plan.md` |
| 流程文件 | Step-by-step flows, SOPs, end-to-end process descriptions | `references/process-doc.md` |
| 決策記錄（ADR） | Decisions with lasting impact that need to be traceable | `references/decision-adr.md` |
| 一般知識文件 | Product descriptions, role explanations, feature overviews | `references/knowledge-doc.md` |

If unsure, ask the user which type fits — or propose one and let them confirm.

---

## Workflow

### Step 1: Understand the content

Extract the key information from the current conversation (or material the user provides):

- What is the core topic?
- What type of document does this call for?
- What are the key facts, decisions, or knowledge worth preserving?
- Are there open questions or unconfirmed details to mark as TBD?

### Step 2: Read the template

Read the appropriate reference file (see table above) to load the document template before drafting.

### Step 3: Draft the document

Write the full draft using the template. **Show the draft to the user — do not write to disk yet.**

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

### Step 4: Save based on user choice

- **Option 1 — Draft area**: Save to `docs/_drafts/[filename].md`. Use a descriptive filename in kebab-case.
- **Option 2 — archive-doc**: Hand off the confirmed content to `/archive-doc`, which will determine the right path, save the file, and update `docs/INDEX.md`.
- **Option 3 — Custom path**: Save directly to the path the user specifies. Create the directory if it doesn't exist.

---

## Writing Principles

- **Structure over completeness**: A clear skeleton with TBDs is better than content filled with guesses
- **TBD is valid information**: Explicitly mark what is unknown or unconfirmed — don't fill gaps with assumptions
- **Preserve terminology**: Use the exact terms from the conversation. Don't substitute synonyms
- **Only document what was said**: Do not add background knowledge or inferred details that weren't part of the discussion
- **Tables for comparison, lists for steps**: Use tables when comparing across dimensions; use numbered lists for sequential steps
- **Add or remove sections**: Never leave a template section empty — either fill it or mark it TBD. Remove sections that genuinely don't apply

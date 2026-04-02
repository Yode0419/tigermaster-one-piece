---
name: archive-doc
description: Files a document into the knowledge base at the right location, and keeps the structure clean and navigable over time. Two modes: single-file archiving (place one document in the right spot) and reorganization (restructure the docs folder when it has grown messy). Also maintains docs/INDEX.md so both humans and AI can navigate the knowledge base efficiently. Use when the user wants to file a document, asks "存到哪裡", "歸檔", "整理文件結構", "reorganize docs", "where should this go", or when called from another skill like write-doc after drafting a document.
---

# archive-doc

File documents in the right place and keep the knowledge base navigable — for both humans and AI.

---

## Mode detection

Before doing anything, determine which mode to use:

**Single-file mode** — when:
- The user provides one specific document to file
- The existing structure is coherent and the new file fits naturally somewhere

**Reorganization mode** — when:
- The user explicitly asks to reorganize or tidy the structure
- The docs folder has grown organically and shows signs of inconsistency (mixed naming styles, vague file names, logically related files scattered across unrelated folders, or too many files in a flat root without grouping)
- Adding the new file would create a situation where a new category/subfolder is warranted

Tell the user which mode you're using and why, in one sentence.

---

## Draft area

`docs/_drafts/` is a staging zone for documents that aren't ready to be filed yet. Drafts are visible in `docs/INDEX.md` under a separate section so they're not forgotten.

When operating in either mode, always include `docs/_drafts/` in your scan. Drafts are valid candidates for archiving — if the user asks to file a draft, treat it as a normal single-file operation (move it out of `_drafts/` into the right location and update the index).

---

## Single-file mode

### Step 1: Read the current structure

Scan `docs/` (including `_drafts/` and all subdirectories) to understand what exists. Read `docs/INDEX.md` if it exists — it's faster than reading individual files.

### Step 2: Propose a location

Choose the most natural home for the document. Prefer existing folders when they fit well. Suggest creating a new subfolder only if there are already 2+ other files that would belong there too (avoid creating a folder for a single file).

Follow the naming conventions below.

### Step 3: Confirm and file

Show the user the proposed path. On confirmation:
1. Move or write the file to that location
2. Update `docs/INDEX.md`

---

## Reorganization mode

### Step 1: Survey the full structure

Read `docs/` completely — file names, folder names, and `docs/INDEX.md` if it exists. For files whose purpose isn't clear from the name alone, read the first few lines.

### Step 2: Identify problems

Look for:
- Inconsistent naming (mixed styles, abbreviations, vague names)
- Orphaned files that belong together but aren't grouped
- Empty or near-empty folders
- Folders so large they need splitting
- Files at the wrong level of the hierarchy

### Step 3: Propose a reorganization plan

Write out the full proposed structure as a before/after diff. Be specific — list every file move, rename, folder creation, or deletion. Example:

```
提案：

移動：
  docs/product/positioning.md → docs/positioning.md
  docs/product/roles.md       → docs/roles.md

刪除資料夾：
  docs/product/  （已清空）

新增：
  docs/INDEX.md

不變：
  docs/matching-flow.md
```

Explain the reasoning briefly — what problem each change solves.

**IMPORTANT: Do not make any changes yet — not even if the caller's instructions say to skip confirmation or execute directly.** Always present the plan to the user and wait for explicit confirmation before touching any files.

### Step 4: Execute on confirmation

Only after the user explicitly confirms (e.g., "好的", "執行", "confirm"): apply all changes from the plan. Then update `docs/INDEX.md` to reflect the new structure.

**How to move files (always use `git mv`):**

For every file move, use `git mv <old-path> <new-path>` via Bash. Never use Write + delete — that loses git history and risks content mismatch.

```bash
git mv docs/positioning.md docs/product/positioning.md
```

If the destination folder doesn't exist yet, create it first:

```bash
mkdir -p docs/product && git mv docs/positioning.md docs/product/positioning.md
```

### Step 5: Verify content integrity

After all moves are complete, verify that each moved file arrived intact:

- If the file was previously committed: run `git diff HEAD -- <new-path>` — it should show no diff (empty output means content is identical)
- If the file was never committed (new in this session): read both the old content (from conversation context) and the new file, and confirm they match

Report the verification result to the user before declaring the operation complete.

---

## Maintaining docs/INDEX.md

After any file operation (single-file or reorganization), update `docs/INDEX.md`.

The index has one job: let a reader — human or AI — understand what's in the knowledge base without opening individual files. Keep it scannable and current.

### Format

The index has two parts: a folder tree at the top for a quick overview, followed by per-section file lists.

**Part 1 — Folder tree** (folders only, no individual files):

    docs/
    ├── category-a/   — short description broad enough to cover future additions
    ├── category-b/   — short description broad enough to cover future additions
    └── _drafts/      — drafts (structure in place, content pending)

**Part 2 — Per-section file lists** (one `##` section per folder):

    ## category-a/

    - **[H1 Title](category-a/topic-one.md)**
      `topic-one.md` — one-sentence summary of what this doc contains _(YYYY-MM-DD)_

    ## 草稿區（_drafts/）

    - **[H1 Title](_drafts/draft-topic.md)**
      `draft-topic.md` — one-sentence summary of draft content _(YYYY-MM-DD)_

Each entry is two lines:
1. `- **[H1 Title](relative/path)**` — read the document's first `# ` heading and use it verbatim as the link text, formatted bold
2. `  \`filename.md\` — summary _(YYYY-MM-DD)_` — indented, filename in backticks, then a one-sentence summary and date

Rules:
- **Folder tree**: show folders only — no individual files. Each folder gets a short description broad enough to cover future additions to that category. Keep descriptions concise and general.
- **File list entries**: two lines per file as shown above. The summary should tell the reader *what* the document contains, not just name the topic.
- If the structure uses subfolders, add a `##` section per folder in Part 2.
- If the structure is flat (no subfolders), skip section headers — but always keep the `## 草稿區` section at the bottom, even if empty.
- Update the `_Last updated_` date every time you touch this file.

---

## Naming conventions

Apply these when proposing new file names or renaming during reorganization:

- **Format**: `kebab-case.md` — all lowercase, hyphens between words, no spaces
- **Be descriptive**: `matching-flow.md` not `flow.md`; `technician-onboarding.md` not `onboarding.md`
- **Decision records**: prefix with date — `2025-03-pricing-model.md`
- **No abbreviations** unless universally understood (e.g., `sop` is fine, `mgmt` is not)

## Folder structure principles

- Start flat: keep files directly under `docs/` until there's a clear reason to group
- Create a subfolder only when 3+ files share a logical category — not for one or two files
- Folder names follow the same kebab-case rule
- Avoid deep nesting — two levels (`docs/process/matching-flow.md`) is usually enough; three levels is a warning sign

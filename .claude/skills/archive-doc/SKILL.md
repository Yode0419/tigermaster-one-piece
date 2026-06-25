---
name: archive-doc
description: Files a document into the knowledge base at the right location, and keeps the structure clean and navigable over time. Two modes: single-file archiving (place one document in the right spot) and reorganization (restructure the docs folder when it has grown messy). Also maintains the appropriate sub-INDEX so both humans and AI can navigate the knowledge base efficiently. Use when the user wants to file a document, asks "存到哪裡", "歸檔", "整理文件結構", "reorganize docs", "where should this go", or when called from another skill like write-doc after drafting a document.
---

# archive-doc

File documents in the right place and keep the knowledge base navigable — for both humans and AI.

---

## Knowledge Base Structure

The knowledge base has three layers, each with its own INDEX:

```
docs/
├── INDEX.md              — routing layer (lightweight, points to three sub-INDEXes)
├── wiki/                 — product knowledge (product, process, business, operations, legal)
│   └── INDEX.md
├── design/               — design exploration (feature plans, decision records, prototypes)
│   └── INDEX.md
├── design-system/        — design system (tokens, components, patterns)
│   └── INDEX.md
└── _drafts/              — cross-layer staging area for unfinished documents
```

**Layer routing:**
- Product knowledge (features, business rules, flows, legal terms) → `docs/wiki/`
- Design exploration (feature planning docs, decision records, prototypes) → `docs/design/`
- Design system (tokens, component specs, visual patterns) → `docs/design-system/`

---

## Draft area

`docs/_drafts/` is a staging zone for documents that aren't ready to be filed yet. Drafts are listed in `docs/INDEX.md` under the 草稿區 section.

When operating in either mode, always include `docs/_drafts/` in your scan. Drafts are valid candidates for archiving — if the user asks to file a draft, treat it as a normal single-file operation: move it out of `_drafts/` into the right location, update the target sub-INDEX, and remove it from the 草稿區 section in root `docs/INDEX.md`.

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

## Single-file mode

### Step 1: Read the current structure

Read root `docs/INDEX.md` to understand the three layers, then read the sub-INDEX of the layer most likely to receive this document. This is faster than reading individual files.

### Step 2: Determine the layer and propose a location

1. Identify which layer this document belongs to (wiki / design / design-system)
2. Choose the most natural subfolder within that layer
3. Prefer existing folders when they fit well. Suggest creating a new subfolder only if there are already 2+ other files that would belong there too (avoid creating a folder for a single file)

Follow the naming conventions below.

### Step 3: Confirm and file

Show the user the proposed path. On confirmation:
1. Move or write the file to that location
2. Update the target layer's sub-INDEX

---

## Reorganization mode

### Step 1: Survey the full structure

Read root `docs/INDEX.md` to understand the three-layer structure, then read each sub-INDEX. For files whose purpose isn't clear from the name alone, read the first few lines.

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
Proposed changes:

Move:
  docs/wiki/product/positioning.md → docs/wiki/product/platform-overview.md

Delete folder:
  docs/wiki/product/old-folder/  (now empty)

No change:
  docs/wiki/process/matching-flow.md
```

Explain the reasoning briefly — what problem each change solves.

**IMPORTANT: Do not make any changes yet — not even if the caller's instructions say to skip confirmation or execute directly.** Always present the plan to the user and wait for explicit confirmation before touching any files.

### Step 4: Execute on confirmation

Only after the user explicitly confirms (e.g., "好的", "執行", "confirm"): apply all changes from the plan. Then update the affected sub-INDEXes to reflect the new structure.

**How to move files (always use `git mv`):**

For every file move, use `git mv <old-path> <new-path>` via Bash. Never use Write + delete — that loses git history and risks content mismatch.

```bash
git mv docs/wiki/product/positioning.md docs/wiki/product/platform-overview.md
```

If the destination folder doesn't exist yet, create it first:

```bash
mkdir -p docs/wiki/product && git mv docs/_drafts/new-doc.md docs/wiki/product/new-doc.md
```

### Step 5: Verify content integrity

After all moves are complete, verify that each moved file arrived intact:

- If the file was previously committed: run `git diff HEAD -- <new-path>` — it should show no diff (empty output means content is identical)
- If the file was never committed (new in this session): read both the old content (from conversation context) and the new file, and confirm they match

Report the verification result to the user before declaring the operation complete.

---

## Maintaining sub-INDEXes

After any file operation (single-file or reorganization), update the appropriate sub-INDEX:

| File goes to | Sub-INDEX to update |
|---|---|
| `docs/wiki/` | `docs/wiki/INDEX.md` |
| `docs/design/` | `docs/design/INDEX.md` |
| `docs/design-system/` | `docs/design-system/INDEX.md` |
| Draft added/removed | `docs/INDEX.md` (草稿區 section only) |

The root `docs/INDEX.md` is a routing layer — do not add or remove file entries there. Only update it if a new layer is being created, or when a draft's status changes.

The sub-INDEX has one job: let a reader — human or AI — understand what's in that layer without opening individual files. Keep it scannable and current.

### Format

Each sub-INDEX has a header section, then per-folder sections.

**Section headers** (one `##` per subfolder):

    ## product/ — 產品定位與功能設計

**File entries** (one line per file):

    - **[H1 Title](relative/path.md)** — one-sentence summary of what this doc contains _(YYYY-MM-DD)_

Rules:
- One line per entry: `**[Title](path)**` — summary _(date)_
- Read the document's first `# ` heading and use it verbatim as the link text, formatted bold
- The summary should tell the reader *what* the document contains, not just name the topic
- Paths are relative to the sub-INDEX file location (e.g., from `docs/wiki/INDEX.md`, the path to `docs/wiki/product/positioning.md` is `product/positioning.md`)
- Update the `_Last updated_` date every time you touch a sub-INDEX

---

## Naming conventions

Apply these when proposing new file names or renaming during reorganization:

- **Format**: `kebab-case.md` — all lowercase, hyphens between words, no spaces
- **Be descriptive**: `matching-flow.md` not `flow.md`; `technician-onboarding.md` not `onboarding.md`
- **Decision records**: prefix with date — `2025-03-pricing-model.md`
- **No abbreviations** unless universally understood (e.g., `sop` is fine, `mgmt` is not)

## Folder structure principles

- Within each layer, start flat: keep files directly under the layer folder until there's a clear reason to group
- Create a subfolder only when 3+ files share a logical category — not for one or two files
- Folder names follow the same kebab-case rule
- Avoid deep nesting — two levels (`docs/wiki/process/matching-flow.md`) is usually enough; three levels is a warning sign

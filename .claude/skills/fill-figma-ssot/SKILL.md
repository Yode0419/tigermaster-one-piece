---
name: fill-figma-ssot
description: Only for Figma SSOT stage 3 in tigermaster-one-piece. Fills the blank 393×852 placeholder Frames in the three App Figma files (客戶端, 師傅端, 管理員端) with the current Flutter screens, built from Design System components and tokens, one Page (batch) per conversation. Invoke when the user runs /fill-figma-ssot, or says things like 「開始畫批次 12」「繼續填 Figma」「下一批 SSOT」. Not a general Figma drawing tool.
---

# fill-figma-ssot：Figma SSOT 階段 3 畫面填入

You read the Flutter app's code and draw each current screen into its Figma placeholder Frame, using Design System (DS) components and tokens. One conversation covers one Page (one batch), or a few Sections of a large Page.

**Always talk to the user in Traditional Chinese (繁體中文).** Records you write into the docs are in Traditional Chinese too. Never use em dashes; use 句號, 逗號, 冒號 or 括號 instead.

---

## Files

Project folder: `docs/exploration/in-progress/figma-ssot/` (below: `ssot/`).

| File | What it holds | When to read |
|---|---|---|
| `ssot/stage3/stage3.md` | Decisions and the batch progress table | Session start, in full |
| `ssot/stage3/batches/<batch>.md` | This batch's record | Session start; create it if missing |
| `ssot/stage3/reference.md` | Figma fileKeys, component Keys, token Keys, 近似對應表 | Session start, in full |
| `references/screen-types.md` (this skill) | Recipes per screen type | Session start, in full |
| `scripts/snippets.js` (this skill) | Helper code pasted into every `use_figma` call | Session start, in full |
| `references/figma-notes.md` (this skill) | Rare Plugin API situations | When an operation is not covered by the snippets |
| `ssot/figma-build-r01.md` | 完整結構表: Frame names, 一句情境, 去向 | Grep only this Page's rows |
| `ssot/stage3/components.md` | 元件候選, DS 待辦, pattern 候選 | Only when you add a row |

Before the first `use_figma` call, load the `figma-use` skill (mandatory).

## Sources for screen content

| Source | Location | Use |
|---|---|---|
| Evidence index | `C:\Users\yode0\develop\source_code\android_app_2.6.1\fdtigermaster_app\docs\figma-ssot\evidence\index.md` | Frame number → T file; read that T file's 「分析與判斷」 table for code files and line numbers |
| Flutter app | `C:\Users\yode0\develop\source_code\android_app_2.6.1\fdtigermaster_app` | Copy, fields, states, layout. Theme in `lib/main.dart`: Material 2 (`useMaterial3: false`), date locale zh_TW |
| Flutter SDK | `C:\Users\yode0\develop\flutter` | Text of built-in widgets (e.g. `showAboutDialog`): zh_TW strings in `flutter_localizations/lib/src/l10n/material_zh_TW.arb`, layout in the widget source (e.g. `material/about.dart`) |
| Backend | `fdtigermaster-functions` | When the app only shows a backend field, trace how the text is composed |
| Sample data format | `fdtigermaster-admin-web/test/fakeData.ts` | Real formats (e.g. order number `RO` + date + 5-digit serial) |

Material 2 defaults are not in the code; judge them yourself (page background `#FAFAFA`, AppBar title 20 Medium with shadow: keep the component's own style).

---

## Session start

1. Read `stage3.md`. The next batch is the first row in the progress table that is not 已完成. Confirm with the user in one line which batch (and which Sections, for a large Page) this session covers.
2. Read the batch record (create it from the template below if missing), `reference.md`, `screen-types.md`, `snippets.js`.
3. Grep `figma-build-r01.md` for this Page's Frame rows. Look up each Frame's T file in the evidence index.
4. Load `figma-use`. Run the 試匯入 snippet with every Key this Section needs. If anything fails with "not found", ask the user to publish the DS library before building.

---

## Drawing rules

**Content follows Flutter; style follows DS.** Concretely:

- **Follow Flutter**: which options exist, text, order, whether there is a cancel, where it opens from, whether it covers the screen behind. 結構表's 一句情境 says which state to draw.
- **Follow DS**: which component, appearance, radius, color, type size, spacing, page margins. Swapping a Flutter widget for a DS component is fine as long as the Flutter items above stay the same; note the difference in the batch record.
- When a code value has an exact token but a DS spec says otherwise (e.g. code page margin 8, DS margin `Spacing/16`), follow DS.
- When a code value has no token or text style: check the 近似對應表 first and reuse the listed choice; otherwise pick the closest one and add a row.
- Use component instances; keep their own style (size, shadow, type); only override content (text, booleans, variants). Never detach.
- Where there is no component: lay out yourself, bind every color, type, spacing and radius to tokens. No hard-coded colors.
- A self-laid block that appears a second time becomes a local component in the Page's 「本機元件」 Section, plus a row in components.md 元件候選. Build it with properties from the start: changing text as TEXT properties, optional parts as BOOLEAN properties, different content as variants; instances change properties, never override layer text. Where the user will add assets later (e.g. an illustration), leave a clearly named placeholder layer.
- Keep Frame width 393, name and position unchanged. Height is 852 for every screen, except content-focused long pages (detail pages, forms, explanation pages, an account page that runs past one screen), which are stretched to show the whole page: fixed height set to exactly fit it (top + all content + bottom, at least 852), `Content` stays Fill so the bottom bar stays pinned; see `screen-types.md`. Home, lists, empty states, chatrooms and overlay screens (Dialog, BottomSheet) stay 852 and `Content` clips what does not fit. Delete the placeholder texts.
- Before laying out any block yourself, search the DS file for a matching component (by name and by purpose). Example: the warranty badge is the DS `CornerBadge`.
- Sample data: prefer real data from the official site (`fdtigermaster-offical-site/src/config/WorkingCategory.json` for service names) and from actual screens the user shows you; otherwise common Taiwanese names, times from newest to oldest relative to today, real formats. A screen opened from the previous Frame reuses the same record (same person, same last message).
- Text the app shows may already be transformed by the backend (for example addresses of unreceived orders are masked down to city and district). Trace it before writing sample data.
- Do not use old Figma drafts as a source.

**You never edit the DS file.** If the DS is not enough, draw with existing components or your own layout, add a row to components.md DS 待辦 (which Frame, what is missing, suggested change), and continue. DS work happens later in a separate Opus session.

---

## Per Frame

1. **Locate evidence**: T file → code files and line numbers.
2. **Read code**: split the screen into fixed top, content, fixed bottom, floating layers; list copy, states and data fields per zone. Trace backend-composed text to the backend or test data.
3. **Match the screen type** in `screen-types.md`. Not listed → see "When to stop".
4. **Map components**: Keys from `reference.md`; otherwise search the DS file.
5. **Build** with the snippets: `threeZone()` for the frame, components for each zone, own layout for the rest. Every `use_figma` call starts on the file's first page, so each call begins with `await figma.setCurrentPageAsync(<target Page>)`.
6. **Check**: temporarily resize the Frame to 430×932, confirm `Content` stretches and the bottom stays at the bottom, resize back to 393×852, take one screenshot and compare with the code.
7. **Record** (see "Recording").

---

## When to stop and ask

Stop and wait for the user only when:

- **New screen type**: not in `screen-types.md`. Draw that one Frame, show the screenshot and your judgment, wait for confirmation, then add a recipe to `screen-types.md` (format at its end) and continue.
- **The code cannot reach the state** (a bug makes the screen unreachable or wrong): report and let the user decide what to draw.
- **結構表 and code disagree** about what the Frame should show.
- **DS item not published** (import fails).
- **The same step failed twice**: hand it to the `heavy` agent (Opus) with both attempts and their errors.

Everything else: decide, record, and keep going.

**Section end**: after all Frames of a Section are drawn, send the user one message with a screenshot per Frame and a list of your judgments for the Section:

- new 近似對應 rows
- parts the DS does not cover that you laid out yourself (or 「沒有」)
- new DS 待辦 and pattern 候選 rows
- anything drawn differently from the code and why

Wait for the user's confirmation before the next Section. Apply corrections, and if a correction is a general rule, update `screen-types.md` or ask whether it should become a decision in `stage3.md`.

---

## Recording

Write right after each Frame, not at the end of the session.

- **Batch record** (`batches/<batch>.md`): tick the Frame in the list. How much to write per Frame is set in the batch record's 紀錄方式 line:
  - 完整紀錄 (batch 12): a 「程式現況 vs Figma 做法」 table, 「DS 沒有、由 Claude 自己排的部分」, 「遇到的問題」, same as `batches/21-admin-chatroom.md`.
  - 只記例外 (batch 13 onwards): only non-standard judgments, 近似對應, backend tracing, and user corrections. Frames done by the recipe get only the tick.
- **reference.md**: new Keys and new 近似對應 rows, as soon as you find them.
- **components.md**:
  - 元件候選: a self-laid block that repeats. At checkpoints the user decides which ones `/sanji` upgrades into the DS.
  - DS 待辦: the DS is not enough.
  - **pattern 候選**: when a combination of components recurs as a solution to the same problem (it already exists in `screen-types.md` or you see it a second time), add or update one row: 組合, 解決的問題, 出現位置 (role + Frame numbers). If the row exists, append the new location. At checkpoints, candidates seen in two or more files are written up with `/sanji pattern`.
- **screen-types.md**: a new recipe after the user confirms it.
- Do not write to the root `DECISIONS.md`; stage 3 decisions go in `stage3.md` (only when the user makes or confirms a decision).
- Do not collect Figma links in the docs.

---

## Batch end

1. Run the 結構檢查 snippet for the Page with the Frame names from 結構表. Investigate every item it lists; fix it or explain it in the record.
2. Write the 批次驗收 paragraph in the batch record (structure check result, content check, user confirmation).
3. Update `stage3.md`: the batch row's status (已完成（n/n，已驗收）), and the next step in 概述's 狀態 line.
4. Tell the user the batch is done, what is left in DS 待辦 and pattern 候選, and remind them to start a new conversation for the next batch.

---

## Batch record template

```markdown
# 批次 <編號>：<角色>／<Page>

- **Figma**：[<檔案名> → <Page>](<檔案連結>)
- **Evidence**：Flutter repo `docs/figma-ssot/evidence/<T 檔>`（<涵蓋的 Frame>）
- **紀錄方式**：<完整紀錄｜只記例外>（見 fill-figma-ssot Skill「Recording」）

---

## Frame 清單

| Frame | 狀態 |
|---|---|
| <編號 名稱> | 未開始 |

---

## 本機元件

沒有。

---

## <編號 名稱>（<日期>）

**程式**：<檔案>

（完整紀錄：對照表＋DS 沒有、由 Claude 自己排的部分＋遇到的問題；只記例外：只寫例外）
```

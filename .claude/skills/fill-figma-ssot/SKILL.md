---
name: fill-figma-ssot
description: Only for Figma SSOT stage 3 in tigermaster-one-piece. Fills the blank 393×852 placeholder Frames in the three App Figma files (客戶端, 師傅端, 管理員端) with the current Flutter screens, built from Design System components and tokens, one batch (or one session row of a large batch) per conversation. Invoke when the user runs /fill-figma-ssot, or says things like 「開始畫批次 12」「繼續填 Figma」「下一批 SSOT」. Not a general Figma drawing tool.
---

# fill-figma-ssot：Figma SSOT 階段 3 畫面填入

You read the Flutter app's code and draw each current screen into its Figma placeholder Frame, using Design System (DS) components and tokens. One conversation covers one Page (one batch), or one session row of a large Page (a few Sections, e.g. 13a).

**Always talk to the user in Traditional Chinese (繁體中文).** Records you write into the docs are in Traditional Chinese too. Never use em dashes; use 句號, 逗號, 冒號 or 括號 instead.

---

## Files

Project folder: `docs/exploration/in-progress/figma-ssot/` (below: `ssot/`).

| File | What it holds | When to read |
|---|---|---|
| `ssot/stage3/stage3.md` | Decisions and the batch progress table | Session start, in full |
| `ssot/stage3/batches/<batch>.md` | This batch's record | Session start; create it if missing. Never read other batches' records (the template is at the end of this file) |
| `ssot/stage3/reference.md` | Figma fileKeys, component Keys, token Keys, 近似對應表 | Session start, in full |
| `references/screen-types.md` (this skill) | Recipes per screen type | Session start, in full |
| `scripts/snippets.js` (this skill) | Helper code pasted into every `use_figma` call | Session start, in full |
| `references/figma-notes.md` (this skill) | Rare Plugin API situations | When an operation is not covered by the snippets |
| `ssot/figma-build-r01.md` | 完整結構表: Frame names, 一句情境, 去向 | **Grep only** this session's rows (e.g. `^\| 師傅端 \| Frame \| 2\.1\.`). Never Read the whole file (79 KB) |
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

1. Read `stage3.md`. The next batch is the first row in the progress table that is not 已完成; a large Page is split into session rows (e.g. 13a to 13d), each listing its Sections. Confirm with the user in one line which batch and Sections this session covers. If an unfinished ▶ row (checkpoint or DS work) comes before it, stop: that work belongs to a separate Opus session and must be done first.
2. Read the batch record (create it from the template below if missing), `reference.md`, `screen-types.md`, `snippets.js`. Nothing else at startup.
3. Grep `figma-build-r01.md` for this session's Frame rows only. Look up each Frame's T file in the evidence index.
4. Load `figma-use`. Run the 試匯入 snippet with every Key this session needs. If anything fails with "not found", ask the user to publish the DS library before building.

## Token budget

Every turn re-reads the whole conversation, so a long conversation gets expensive fast (batch 12: 142 turns, the conversation grew to 470k tokens). Keep it short:

- Read only what the tables above say. Grep instead of Read whenever you only need a few lines.
- Components: look in `reference.md` first; if missing, run the DS 名稱查詢 snippet (names and keys only). Use `search_design_system` only for Phosphor icons and for variable Keys not in `reference.md`, and always pass `includeLibraryKeys` (Phosphor's key from `reference.md` for icons, the DS file's `lk-1316b9…` for variables); without it the result mixes in other libraries (one call returned about 30k characters).
- Build a Frame in one or two `use_figma` calls; for Frames sharing a base (dialogs over the same page), clone the base Frame and change only what differs. If a call fails, rerun only the failed part.
- One screenshot per Frame, taken inside the build call (`await frame.screenshot()`), reused in the Section-end report. Extra zoomed screenshots only for self-laid blocks.
- Do not edit the Skill, `screen-types.md` or `stage3.md` while drawing (see "User corrections").
- When the session's Sections are done, or `/context` passes about 250k, finish the current Frame, record, and tell the user to start a new conversation.

---

## Drawing rules

**Content follows Flutter; style follows DS.** Concretely:

- **Follow Flutter**: which options exist, text, order, whether there is a cancel, where it opens from, whether it covers the screen behind. 結構表's 一句情境 says which state to draw.
- **Cards and data rows**: a card's outer shell is always the DS `Card` (correct shadow and radius), never a self-drawn fill; a repeated card body becomes a local component of the content only, placed in the Card's Slot. In "label + value" rows the value is flush right. See `screen-types.md` 「卡片與資料列」.
- **HomeIndicator**: a frame with no fixed bottom bar still gets the DS `HomeIndicator` as its fixed bottom (bars like BottomNavBar and ChatInputBar already include one). Stretched long pages: height = top + Scroll Content + bottom (including the 34) + 2 for the frame's 1px stroke.
- **Sample data stays real and consistent**: lists show every status their query can return, not one. When only one service has real numbers (price, warranty) use it for the whole chain of frames and change the earlier frames (list, home) to match instead of inventing data. No icon asset (e.g. map app logos) means no icon, not a placeholder, unless the user asks.
- **Scroll structure and bottom padding**: `Content` (fixed Fill size, clips, no padding of its own) holds exactly one `Scroll Content` frame (vertical, width Fill, height Hug). All paddings, item spacing and the real content go in `Scroll Content`, because a fixed-size auto-layout frame does not count its own bottom padding in the scroll range. `Scroll Content` bottom padding is `Spacing/16` by default, 134 (nav 82 + the centre logo's 36 overhang above the nav + 16) when the BottomNavBar floats over it, so content scrolled to the end is neither hidden by nor flush against the bottom bar. `threeZone()` returns `{ frame, content, body }`: fill `body`. The structure check reports any frame that breaks this.
- **Follow DS**: which component, appearance, radius, color, type size, spacing, page margins. Swapping a Flutter widget for a DS component is fine as long as the Flutter items above stay the same; note the difference in the batch record.
- When a code value has an exact token but a DS spec says otherwise (e.g. code page margin 8, DS margin `Spacing/16`), follow DS.
- When a code value has no token or text style: check the 近似對應表 first and reuse the listed choice; otherwise pick the closest one and add a row.
- Use component instances; keep their own style (size, shadow, type); only override content (text, booleans, variants). Never detach.
- Where there is no component: lay out yourself, bind every color, type, spacing and radius to tokens. No hard-coded colors.
- A self-laid block that appears a second time becomes a local component in the Page's 「本機元件」 Section, plus a row in components.md 元件候選. Build it with properties from the start: changing text as TEXT properties, optional parts as BOOLEAN properties, different content as variants; instances change properties, never override layer text. Where the user will add assets later (e.g. an illustration), leave a clearly named placeholder layer.
- Keep Frame width 393, name and position unchanged. Height is 852 for every screen, except content-focused long pages (detail pages, forms, explanation pages, an account page that runs past one screen), which are stretched to show the whole page: fixed height set to exactly fit it (top + all content + bottom, at least 852), `Content` stays Fill so the bottom bar stays pinned; see `screen-types.md`. Home, lists, empty states, chatrooms and overlay screens (Dialog, BottomSheet) stay 852 and `Content` clips what does not fit. Delete the placeholder texts.
- Before laying out any block yourself, search the DS file for a matching component (by name and by purpose). Example: the warranty badge is the DS `CornerBadge`.
- Sample data: prefer real data from the official site (`fdtigermaster-offical-site/src/config/WorkingCategory.json` for service names) and from actual screens the user shows you; otherwise common Taiwanese names, times from newest to oldest relative to today, real formats. A screen opened from the previous Frame reuses the same record (same person, same last message). Sample data must also match the state that triggers the screen (e.g. a Dialog that only opens for 「等待支付派遣費」 orders sits over a card in that status).
- Dates follow the code's `DateFormat` pattern rendered in zh_TW (intl `date_symbol_data_local.dart`): `EEE` is 「週三」 (not 「三」), `EEEE` is 「星期三」, `a` is 「上午」／「下午」. Example: `MM/dd(EEE) a hh:mm` → 「10/08(週四) 下午 02:00」. Get the weekday from a real calendar (e.g. `python -c "import datetime; print(datetime.date(2026,10,8).strftime('%a'))"`), never by counting in your head.
- Text the app shows may already be transformed by the backend (for example addresses of unreceived orders are masked down to city and district). Trace it before writing sample data.
- Do not use old Figma drafts as a source.

**You never edit the DS file.** If the DS is not enough, draw with existing components or your own layout, add a row to components.md DS 待辦 (which Frame, what is missing, suggested change), and continue. DS work happens later in a separate Opus session.

---

## Per Frame

1. **Locate evidence**: T file → code files and line numbers.
2. **Read code and write the content list**: split the screen into fixed top, content, fixed bottom, floating layers. In your reply (not in the docs), list every text and element visible in this state, per zone. Follow each custom child widget into its own file and check:
   - default parameter values (e.g. `WarrantyDate` shows its description text unless told not to; `PriceRange` is called with `showDescription: false`)
   - conditional branches (`if`, ternaries, `FutureBuilder` states): which branch this Frame's 一句情境 is in
   - text composed or transformed by the backend (e.g. unreceived orders' addresses are masked to city and district): trace it to the backend or test data
3. **Match the screen type** in `screen-types.md`. Not listed → see "When to stop".
4. **Map components**: Keys from `reference.md`; otherwise the DS 名稱查詢 snippet. Before laying out any block yourself, check the DS by name and by purpose.
5. **Build** with the snippets: `threeZone()` for the frame, components for each zone, own layout for the rest. Every `use_figma` call starts on the file's first page, so each call begins with `await figma.setCurrentPageAsync(<target Page>)`. At the end of the build call, resize the Frame to 430×932, return `Content` height and the bottom bar's y, resize back, and return `await frame.screenshot()`.
6. **Check** the screenshot against the content list: nothing missing, nothing extra.
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

**Section end**: after all Frames of a Section are drawn:

1. Run the 結構檢查 snippet with this Section's Frame names. Fix every issue it lists, or explain it. Compare its text dump with your content lists from step 2.
2. Send the user one message with the screenshot per Frame and your judgments for the Section:
   - new 近似對應 rows
   - parts the DS does not cover that you laid out yourself (or 「沒有」). For each self-laid block: the DS search terms you tried, a zoomed screenshot of the block, and a small table of code value vs Figma value (colors and gradient stops, position or ratio formulas, radius, type size)
   - new DS 待辦 and pattern 候選 rows
   - anything drawn differently from the code and why

Wait for the user's confirmation before the next Section.

**User corrections**: apply them to Figma right away. If a correction is a general rule, do not edit the Skill, `screen-types.md` or `stage3.md` mid-session; add one line to the batch record's 「待寫規則」 list. At session end, write the 待寫規則 into `screen-types.md` or this Skill in one pass, and ask the user which ones should also become decisions in `stage3.md`. A new screen-type recipe the user confirmed counts as a 待寫規則 too; until session end, follow it from memory.

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
  - **pattern 候選**: when a combination of **two or more components** recurs as a solution to the same problem (it already exists in `screen-types.md` or you see it a second time), add or update one row: 組合, 解決的問題, 出現位置 (role + Frame numbers). If the row exists, append the new location. At checkpoints, candidates seen in two or more files are written up with `/sanji pattern`. A usage rule of a single component (e.g. Dialog button placement) is not a pattern: add a DS 待辦 row to put it in that component's spec.
- **screen-types.md**: a new recipe after the user confirms it.
- Do not write to the root `DECISIONS.md`; stage 3 decisions go in `stage3.md` (only when the user makes or confirms a decision).
- Do not collect Figma links in the docs.

---

## Batch end

For a batch split into session rows, steps 1 to 3 run at the end of each session for its Sections, and the 批次驗收 paragraph is written when the last session row is done.

1. Run the 結構檢查 snippet with all Frame names of this session (the Section-end runs already passed, so this is a final confirmation). Investigate every item it lists; fix it or explain it in the record.
2. Write the 待寫規則 (see "User corrections"), then the 批次驗收 paragraph in the batch record (structure check result, content check, user confirmation).
3. Update `stage3.md`: the row's status (已完成（n/n，已驗收）), and the next step in 概述's 狀態 line.
4. Tell the user what is done, what is left in DS 待辦 and pattern 候選, and remind them to start a new conversation for the next session.

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

## 待寫規則

使用者修正中屬於通則的部分，每個對話結束時一次寫進 Skill，寫完標「已寫入」。

沒有。

---

## <編號 名稱>（<日期>）

**程式**：<檔案>

（完整紀錄：對照表＋DS 沒有、由 Claude 自己排的部分＋遇到的問題；只記例外：只寫例外）
```

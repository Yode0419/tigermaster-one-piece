---
name: fill-figma-ssot
description: Only for Figma SSOT stage 3 in tigermaster-one-piece. Fills the blank 393×852 placeholder Frames in the three App Figma files (客戶端, 師傅端, 管理員端) with the current Flutter screens, built from Design System components and tokens, one batch (or one session row of a large batch) per conversation. Invoke when the user runs /fill-figma-ssot, or says things like 「開始畫批次 12」「繼續填 Figma」「下一批 SSOT」. Not a general Figma drawing tool.
---

# fill-figma-ssot：Figma SSOT 階段 3 畫面填入

You read the Flutter app's code and draw each current screen into its Figma placeholder Frame, using Design System (DS) components and tokens. One conversation covers one session row of the progress table (one Page, a few Sections of a large Page such as 05a, or two small Pages such as 06＋07a).

**Always talk to the user in Traditional Chinese (繁體中文).** Records you write into the docs are in Traditional Chinese too. Never use em dashes; use 句號, 逗號, 冒號 or 括號 instead.

---

## Files

Project folder: `docs/exploration/in-progress/figma-ssot/` (below: `ssot/`).

| File | What it holds | When to read |
|---|---|---|
| `ssot/stage3/stage3.md` | Progress table, 客戶端待判斷 | Session start, in full |
| `ssot/stage3/batches/<batch>.md` | This batch's record | Session start; create it if missing. Never read other batches' records (the template is at the end of this file) |
| `ssot/stage3/reference.md` | Figma fileKeys, component Keys, token Keys | Session start, in full |
| `references/screen-types.md` (this skill) | General layout rules for every screen, plus the screen-type index | Session start, in full |
| `scripts/snippets.js` (this skill) | Helper code pasted into every `use_figma` call | Session start, in full |
| `references/types/<file>.md` (this skill) | Recipes per screen type | When a Frame matches that type in the index; once per conversation |
| `ssot/stage3/approximations.md` | 近似對應表: code values without an exact token | **Grep only**, by the code value (e.g. `#9E9E9E`, `20 Bold`) |
| `scripts/structure-check.js` (this skill) | Structure check | At each Section end |
| `references/figma-notes.md` (this skill) | Rare Plugin API situations | When an operation is not covered by the snippets, or a call fails unexpectedly |
| `ssot/figma-build-r01.md` | 完整結構表: Frame names, 一句情境, 去向 | **Grep only** this session's rows (e.g. `^\| 客戶端 \| Frame \| 1\.1\.`). Never Read the whole file (79 KB) |
| `ssot/stage3/components.md` | 元件候選, DS 待辦, pattern 候選 | Only when you add a row |
| `ssot/stage3/decisions.md` | Decision history | Never. Every rule you need is in this skill |

Before the first `use_figma` call, load the `figma-use` skill (mandatory).

## Sources for screen content

| Source | Location | Use |
|---|---|---|
| Evidence index | `C:\Users\yode0\develop\source_code\android_app_2.6.1\fdtigermaster_app\docs\figma-ssot\evidence\index.md` | Frame number → T file; read that T file's 「分析與判斷」 table for code files and line numbers. Some T files still use old Frame numbers; 結構表 wins |
| Flutter app | `C:\Users\yode0\develop\source_code\android_app_2.6.1\fdtigermaster_app` | Copy, fields, states, layout. Theme in `lib/main.dart`: Material 2 (`useMaterial3: false`), date locale zh_TW |
| Flutter SDK | `C:\Users\yode0\develop\flutter` | Text of built-in widgets (e.g. `showAboutDialog`): zh_TW strings in `flutter_localizations/lib/src/l10n/material_zh_TW.arb`, layout in the widget source (e.g. `material/about.dart`) |
| Backend | `fdtigermaster-functions` | When the app only shows a backend field, trace how the text is composed |
| Sample data format | `fdtigermaster-admin-web/test/fakeData.ts` | Real formats (e.g. order number `RO` + date + 5-digit serial) |
| Service names | `C:\Users\yode0\develop\source_code\fdtigermaster-offical-site\src\config\WorkingCategory.json` | Real service names for sample data |

Material 2 defaults are not in the code; judge them yourself (page background `#FAFAFA`, AppBar title 20 Medium with shadow: keep the component's own style).

---

## Session start

1. Read `stage3.md`. The next session row is the first row in the progress table that is not 已完成. If an unfinished ▶ row (checkpoint or DS work) comes before it, stop: that work belongs to a separate Opus session and must be done first. Confirm with the user in one line which row and Sections this session covers, and mention any 客戶端待判斷 items for them.
2. Read the batch record (create it from the template below if missing), `reference.md`, `screen-types.md`, `snippets.js`. Nothing else at startup.
3. Grep `figma-build-r01.md` for this session's Frame rows only. Look up each Frame's T file in the evidence index.
4. **開工檢查** (before drawing the first Frame). In master batches most rework came from things found halfway: 8 structure changes (missing Frames, splits, moves) that each forced renaming in Figma and the docs, sample data that forced redrawing a previous batch, and new screen types drawn without stopping. Settle them now, in one message to the user:
   1. **Structure**: from the code's routes and state mapping (e.g. a bloc's status switch), list every screen this session's Sections can show and compare with the 結構表 rows. Report Frames that seem missing, mergeable (same layout, only content differs) or that should be split (different follow-up screens). The user decides; renumber before drawing, never mid-session unless something new turns up.
   2. **Screen types**: for each Frame, the matching type from the `screen-types.md` index, or 「新類型」. New types are where you will stop for confirmation (see "When to stop"); the user sees them in advance.
   3. **Sample data plan**: the records the whole session uses (service with real price and warranty, customer and master names, order number, dates relative to today, statuses). If the batch record already has a plan from an earlier session row of the same batch, reuse it and only add to it.
   4. **Composed text**: texts built by the backend or by app code (masked names, system messages, status titles). Note where each is composed and which side sends it; check both the app and the backend, not just one.

   Write the confirmed results into the batch record's 「開工檢查」 section (types and sample data plan; structure changes go through "Renumbering Frames").
5. Load `figma-use`. Run the 試匯入 snippet with every Key this session needs. If anything fails with "not found", ask the user to publish the DS library before building. Then start drawing.

## Token budget

Every turn re-reads the whole conversation, so a long conversation gets expensive fast (batch 12: 142 turns, the conversation grew to 470k tokens). Keep it short:

- Read only what the Files table says. Grep instead of Read whenever you only need a few lines.
- Components: look in `reference.md` first; if missing, run the DS 名稱查詢 snippet (names and keys only). Use `search_design_system` only for Phosphor icons and for variable Keys not in `reference.md`, and always pass `includeLibraryKeys` (Phosphor's key from `reference.md` for icons, the DS file's `lk-1316b9…` for variables); without it the result mixes in other libraries (one call returned about 30k characters).
- Build a Frame in one or two `use_figma` calls; for Frames sharing a base (dialogs over the same page), clone the base Frame and change only what differs. If a call fails, rerun only the failed part.
- One screenshot per Frame, taken inside the build call (`await frame.screenshot()`), reused in the Section-end report. Extra zoomed screenshots only for self-laid blocks.
- Do not edit the Skill, `screen-types.md`, `types/` or `stage3.md` while drawing (see "User corrections").
- When the session row is done, or `/context` passes about 250k, finish the current Frame, record, and tell the user to start a new conversation.

---

## Drawing rules

**Content follows Flutter; style follows DS.** Layout details (three zones, scroll structure, heights, cards, dialogs, icons) are in `screen-types.md`; the rules below are the ones that apply across all of them.

- **Follow Flutter**: which options exist, text, order, whether there is a cancel, where it opens from, whether it covers the screen behind. 結構表's 一句情境 says which state to draw.
- **Follow DS**: which component, appearance, radius, color, type size, spacing, page margins. Swapping a Flutter widget for a DS component is fine as long as the Flutter items above stay the same; note the difference in the batch record. When a code value has an exact token but a DS spec says otherwise (e.g. code page margin 8, DS margin `Spacing/16`), follow DS.
- **No exact token or text style**: Grep `approximations.md` for the code value and reuse the listed choice; otherwise pick the closest one and add a row.
- **Components first**: before laying out any block yourself, search the DS by name and by purpose (example: the warranty badge is the DS `CornerBadge`, not a Tag). Use instances; keep their own style (size, shadow, type); only override content (text, booleans, variants). Never detach. A card's outer shell is always the DS `Card`.
- **Self-laid blocks**: bind every color, type, spacing and radius to tokens; no hard-coded colors. Hand-built rows follow the code's real height, including minimum touch targets (Material 2 `IconButton` is at least 48, so a row with an icon button is about 64).
- **Local components**: a self-laid block that appears a second time becomes a local component in the Page's 「本機元件」 Section, plus a row in components.md 元件候選. Build it with properties from the start: changing text as TEXT properties, optional parts as BOOLEAN properties, different content as variants; instances change properties, never override layer text. Where the user will add assets later (e.g. an illustration), leave a clearly named placeholder layer.
- **Local components do not cross files.** A local component from another App file (e.g. the 師傅端 `OrderBasicInfo`) cannot be used here. When this file needs the same block, stop and ask the user: rebuild it as a local component in this file, or queue a DS upgrade.
- **Frame size**: width 393, name and position unchanged; height 852, except content-focused long pages (see `screen-types.md`). Delete the placeholder texts.
- **One screen, several states**: do not add a Frame. Draw the state with the most information and note the others in the batch record; field validation errors are text only (DS `TextField` State=Error). This is the 暫緩 rule in `figma-build-r01.md`. Exceptions: a transient overlay that covers content (info tooltips, see `screen-types.md` 「資訊提示」), and flows that branch to different follow-up screens by the user's choice (each branch gets its own Frames).
- **No current screen to copy**: when the code has no handling for a state (e.g. no error message when an upload fails), do not draw an invented failure screen; note it in the batch record. When a bug makes a screen unreachable, or you cannot tell from the code what the app does, report to the user; what the user sees on a real device wins over your reading of the code.
- **TextField helper row**: DS `TextField` has `Show Helper Row` (default on). Turn it off for any field with no helper text, counter or error. After any change that shrinks or grows content, recompute stretched long pages.
- **Sample data is real and consistent**: prefer the official site's service names and the actual screens the user shows you; otherwise common Taiwanese names, times from newest to oldest relative to today, real formats. Lists show every status their query can return, not one. When only one service has real numbers (price, warranty), use it for the whole chain of Frames and change the earlier Frames (list, home) to match instead of inventing data. A screen opened from the previous Frame reuses the same record (same person, same last message), and the data must match the state that triggers the screen. Follow real business rules (no income paid out in the future). No icon asset (e.g. map app logos) means no icon, not a placeholder, unless the user asks.
- **Dates** follow the code's `DateFormat` pattern rendered in zh_TW (intl `date_symbol_data_local.dart`): `EEE` is 「週三」 (not 「三」), `EEEE` is 「星期三」, `a` is 「上午」／「下午」. Example: `MM/dd(EEE) a hh:mm` → 「10/08(週四) 下午 02:00」. Get the weekday from a real calendar (e.g. `python -c "import datetime; print(datetime.date(2026,10,8).strftime('%a'))"`), never by counting in your head.
- Do not use old Figma drafts as a source.

**You never edit the DS file.** If the DS is not enough, draw with existing components or your own layout, add a row to components.md DS 待辦 (which Frame, what is missing, suggested change), and continue. DS work happens later in a separate Opus session.

---

## Per Frame

1. **Locate evidence**: T file → code files and line numbers.
2. **Read code and write the content list**: split the screen into fixed top, content, fixed bottom, floating layers. In your reply (not in the docs), list every text and element visible in this state, per zone. Follow each custom child widget into its own file and check:
   - default parameter values (e.g. `WarrantyDate` shows its description text unless told not to; `PriceRange` is called with `showDescription: false`)
   - conditional branches (`if`, ternaries, `FutureBuilder` states): which branch this Frame's 一句情境 is in
   - text composed or transformed by the backend or by app code (e.g. unreceived orders' addresses are masked to city and district; the 【系統訊息】 after accepting a time request is sent by the app, not the backend): trace both sides, starting from the 開工檢查 notes
3. **Match the screen type** in the `screen-types.md` index and read that `types/` file if you have not yet in this conversation. Not listed → see "When to stop".
4. **Map components**: Keys from `reference.md`; otherwise the DS 名稱查詢 snippet.
5. **Build** with the snippets: `threeZone()` for the frame (fill the returned `body`, never `content`), components for each zone, own layout for the rest. Every `use_figma` call starts on the file's first page, so each call begins with `await figma.setCurrentPageAsync(<target Page>)`. At the end of the build call, resize the Frame to 430×932, return `Content` height and the bottom bar's y, resize back, and return `await frame.screenshot()`.
6. **Check** the screenshot against the content list: nothing missing, nothing extra.
7. **Record** (see "Recording").

---

## When to stop and ask

Stop and wait for the user only when:

- **New screen type**: not in the `screen-types.md` index (flagged in 開工檢查). Draw only the first Frame of that type, even if several Frames share it (batch 13b drew three new types in full before showing them), show the screenshot and your judgment, wait for confirmation, then continue (the recipe is written at session end, see "User corrections").
- **No current screen to copy**: a bug makes the screen unreachable or wrong, or the code does not tell you what the app does.
- **結構表 and code disagree** about what the Frame should show, or the code's state mapping shows a screen the 結構表 has no Frame for. The user decides Frame numbers.
- **A local component from another App file is needed** (see Drawing rules).
- **A 客戶端待判斷 item** in `stage3.md` applies to the Frame and needs the user's decision.
- **DS item not published** (import fails).
- **The same step failed twice**: hand it to the `heavy` agent (Opus) with both attempts and their errors.

Everything else: decide, record, and keep going.

**Section end**: after all Frames of a Section are drawn:

1. Read `structure-check.js` (once per conversation) and run it with this Section's Frame names. Fix every issue it lists, or explain it. Compare its text dump with your content lists from step 2.
2. Send the user one message with the screenshot per Frame and your judgments for the Section:
   - new 近似對應 rows
   - parts the DS does not cover that you laid out yourself (or 「沒有」). For each self-laid block: the DS search terms you tried, a zoomed screenshot of the block, and a small table of code value vs Figma value (colors and gradient stops, position or ratio formulas, radius, type size)
   - new DS 待辦 and pattern 候選 rows
   - anything drawn differently from the code and why

Wait for the user's confirmation before the next Section.

**User corrections**: apply them to Figma right away. If a correction is a general rule, do not edit the Skill, `screen-types.md`, `types/` or `stage3.md` mid-session; add one line to the batch record's 「待寫規則」 list. At session end, write the 待寫規則 into the right place in one pass (a layout rule for every screen → `screen-types.md`; a screen-type recipe → its `types/` file plus an index row; a cross-cutting rule → this Skill), and ask the user which ones should also become decisions in `decisions.md`. A new screen-type recipe the user confirmed counts as a 待寫規則 too; until session end, follow it from memory.

---

## Recording

Write right after each Frame, not at the end of the session.

- **Batch record** (`batches/<batch>.md`): tick the Frame in the list, then write only exceptions: non-standard judgments, 近似對應, backend tracing, states noted instead of drawn, and user corrections. Frames done by the recipe get only the tick.
- **approximations.md**: a new row as soon as you pick a token for a code value that has none.
- **reference.md**: new Keys as soon as you find them.
- **components.md**:
  - 元件候選: a self-laid block that repeats. At checkpoints the user decides which ones `/sanji` upgrades into the DS.
  - DS 待辦: the DS is not enough.
  - **pattern 候選**: when a combination of **two or more components** recurs as a solution to the same problem (it already exists in `screen-types.md`/`types/` or you see it a second time), add or update one row: 組合, 解決的問題, 出現位置 (role + Frame numbers). If the row exists, append the new location. At checkpoints, candidates seen in two or more files are written up with `/sanji pattern`. A usage rule of a single component (e.g. Dialog button placement) is not a pattern: add a DS 待辦 row to put it in that component's spec.
- Do not write to the root `DECISIONS.md`; stage 3 decisions go in `decisions.md` (only when the user makes or confirms a decision).
- Do not collect Figma links in the docs.
- **Renumbering Frames** (new Frame inserted, order changed): the user decides the numbers; report and wait. Then rename and reposition in Figma, update `figma-build-r01.md` (rows, totals, 去向 references), the batch record, components.md, reference.md and approximations.md, then grep the old numbers to make sure no reference was missed.

---

## Session end

1. Run the structure check with all Frame names of this session (the Section-end runs already passed, so this is a final confirmation). Investigate every item it lists; fix it or explain it in the record.
2. Write the 待寫規則 (see "User corrections"). When this is the last session row of the batch, write the 批次驗收 paragraph in the batch record (structure check result, content check, user confirmation).
3. Update `stage3.md`: the row's status (已完成（已驗收）), the next step in 概述's 狀態 line, and remove 客戶端待判斷 items that are now settled.
4. Tell the user what is done, what is left in DS 待辦 and pattern 候選, and remind them to start a new conversation for the next row.

---

## Batch record template

```markdown
# 批次 <編號>：<角色>／<Page>

- **Figma**：[<檔案名> → <Page>](<檔案連結>)
- **Evidence**：Flutter repo `docs/figma-ssot/evidence/<T 檔>`（<涵蓋的 Frame>）

---

## 開工檢查

每段對話開工前確認，後續各段沿用並補充（見 fill-figma-ssot Skill「Session start」第 4 步）。

**示意資料計畫**：
- 工項：<名稱>（真實價格、保固來源）
- 人物：客戶 <姓名>、師傅 <姓名>
- 訂單：<編號>、<日期時間>、<狀態>

**畫面類型**：

| Frame | 類型 | 備註 |
|---|---|---|
| <編號 名稱> | <screen-types 索引的類型｜新類型> | <程式或後端組字的來源> |

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

（只寫例外：非標準判斷、近似對應、後端追查、只記不畫的狀態、使用者修正）
```

# Vue2 官網搬遷提示詞(分階段版)

給 AI coding agent 用的搬遷指令,拆成 7 個獨立階段,每個階段各自是一份完整、可單獨貼給一個新 session 執行的提示詞(不依賴前面階段還留在對話記憶裡)。內容是英文,因為是直接貼給執行的 AI agent 用。

## 使用方式

- 這些提示詞是設計給你直接在 `fdtigermaster-offical-site` repo 裡開的 Claude Code session 用——也就是 session 的工作目錄本身就是那個 Vue2 專案,不需要另外告訴它 repo 在哪裡。Prototype 檔案在另一個 repo(`tigermaster-one-piece`),所以提示詞裡用絕對路徑指向它,讓 session 讀取當作內容參考來源。
- 按順序執行,每做完一個階段就跑 `npm run lint` + 開發伺服器實際看一下畫面、commit 一次,再進下一階段。哪個階段出問題,只會影響那一個階段的改動,回溯也只需要 revert 那一個 commit。
- 每個階段的提示詞都是自包含的(重複必要的專案背景),可以分別貼到不同的新 session,不用擔心對方沒有前面階段的記憶。
- 階段 2 會建立一個共用元件 `StatsCounter.vue`,階段 7 會重用它——執行到階段 7 前必須先完成階段 2。其餘階段彼此獨立,順序可以依你想先看到什麼效果調整,但建議照 1→7 的順序做,因為視覺上也是由上到下組裝首頁。
- 每個階段結尾都有「本階段驗收標準」,執行的 agent 應該對照這個清單自我檢查,不要只回報「應該完成了」。

---

## Phase 1 — Home.vue: 品牌宣言 Brand Statement

```
GOAL: Add a new "品牌宣言" (Brand Statement) section to the production Vue2 homepage.

CONTEXT: You're already working inside this Vue2 project (Vue 2.7, TypeScript, class-based
components via vue-property-decorator, Bootstrap Vue) — no need to locate or change into
the repo. Do not touch any route other than `/` (Home.vue). Read `src/views/Home.vue` in
full before editing — the line numbers below are from a prior read and may have drifted.

SOURCE CONTENT: Read `C:\yode\tigermaster-one-piece\docs\design\website-optimization\prototype\home.html`,
the section commented `<!-- 3 品牌宣言區 Brand Statement（stmtSplit） -->` (around line 74-90).
Port its markup/copy faithfully: left column heading "找師傅，不該靠運氣。", body copy, two
CTA buttons ("立即下載 APP" and "看看師虎哪裡不一樣"), right column image. For background
on why this content/wording was chosen, see decision #7 and #13 in
`C:\yode\tigermaster-one-piece\docs\design\website-optimization\homepage-about-optimization.md`.

WHERE TO INSERT: right after the Hero Carousel block (`<Carousel .../>` / `<MobileSwiper .../>`,
currently around `Home.vue:40-41`) and before the "HOW IT WORK"/五大優勢 section (currently
starts around `Home.vue:43`).

CTA BEHAVIOR: the "看看師虎哪裡不一樣" button should scroll/link to an anchor id
`biz-model` — that target section doesn't exist yet (it lands in a later migration phase),
so it's fine if this anchor doesn't resolve to anything yet; use `href="#biz-model"` (or
the Vue-idiomatic equivalent already used elsewhere in this codebase for in-page anchors,
check how other CTAs in Home.vue link to `#app-download` if such a pattern exists) so it
will start working automatically once that later phase adds the target section. The
"立即下載 APP" button should link to the existing app-download band's anchor if one
already exists (`Home.vue:237-267` region) — check for an existing id/ref there and reuse
it rather than inventing a new one.

STYLING:
- This section is purely additive markup+scoped styles; put its styles in a new SCSS
  partial (e.g. `src/style/components/BrandStatement.scss` or inline in a new
  `<style lang="scss" scoped>` block if you choose to extract this section as its own
  component — see "component or inline" note below) and `@import "../var";` (or the
  correct relative path to `src/style/_var.scss`) to use `$theme-color` (#fabf13) and
  `$secondary-color` (#1f286f) instead of hardcoding those hex values.
- Existing Home.vue sections import a compiled `.css` file rather than a `.scss` source
  directly (`Home.vue` currently has `@import "../style/views/Home.css";` in its
  `<style scoped>` block, sourced from `Home.scss`, with no automatic sass build step).
  For this NEW section, prefer switching to `<style lang="scss" scoped>` and importing the
  `.scss` source directly instead of manually keeping a compiled `.css` in sync — this is
  a deliberate small deviation from the existing convention; mention it explicitly in your
  summary so the human maintainer is aware the pattern changed for new code.

COMPONENT OR INLINE: every other content section in Home.vue (五大優勢, steps, services,
etc.) is written as inline template markup directly in Home.vue, not split into
sub-components (only Carousel/MobileSwiper are separate components, because of their
complex JS behavior). Follow that convention — write this as inline markup in Home.vue's
template, not a new component file.

ASSETS: the right-column image is a piece of real content imagery — put it under
`public/fdtiger-offical-site-img/home/` (matching existing files there) and reference it
as a plain relative path string in the template (e.g.
`src="../../public/fdtiger-offical-site-img/home/xxx.jpg"`), NOT `require()` — that's the
existing convention for every other image in this file.

ACCEPTANCE CRITERIA FOR THIS PHASE:
1. `/` route renders the new Brand Statement section between the hero carousel and HOW IT
   WORK, matching the prototype's copy/layout.
2. Both CTA buttons are present with the hrefs described above (even if `#biz-model`
   doesn't resolve to anything yet — that's expected at this phase).
3. No hardcoded `#1f286f`/`#fabf13` hex values — uses `$secondary-color`/`$theme-color`.
4. `npm run lint` passes; dev server boots with no new console errors.
5. No other section/route was touched.
```

---

## Phase 2 — Home.vue: 里程碑數字條 + 共用 StatsCounter 元件

```
GOAL: Add a milestone-stats strip with count-up animation to the homepage, built as a
reusable component (it will be reused on the About page in a later migration phase).

CONTEXT: You're already working inside this Vue2 project (Vue 2.7, TypeScript, class-based
components via vue-property-decorator). Read `src/views/Home.vue` in full before editing.
Confirmed via prior search: this repo has NO existing count-up/number-animation utility or
library (no vue-count-to, no custom helper in `src/utility/`) — check again yourself in
case that's changed since, but don't assume you need to search from scratch.

SOURCE CONTENT: `C:\yode\tigermaster-one-piece\docs\design\website-optimization\prototype\home.html`,
section commented `<!-- NEW 里程碑數字條 Milestone Stats Strip -->` (around line 92-108),
and its supporting JS at `...\prototype\count-up.js` (IntersectionObserver-triggered,
requestAnimationFrame-based, ~1.4s ease-out, comma-formatted output). Three stats:
25,000+ 完成交易 / 20,000+ 平台會員 / 2,200+ 合作師傅.

BUILD A REUSABLE COMPONENT: create `src/components/Home/StatsCounter.vue` (class-based,
`<script lang="ts">`, `vue-property-decorator`) with `@Prop()` inputs for `target: number`,
`suffix: string`, `label: string`. Port the prototype's count-up logic (IntersectionObserver
+ requestAnimationFrame) into its `mounted()` hook — this matches this repo's existing
pattern of writing behavior directly in class-component lifecycle hooks (see
`src/components/Home/Carousel.vue`'s `created()` using `setInterval` for autoplay as a
precedent). Render the final number as static text content first so it's not blank if JS
fails, matching the prototype's graceful-degradation approach.

WHERE TO INSERT IN Home.vue: directly after the Brand Statement section (added in a
previous migration phase — if that phase hasn't run yet in this session, insert right
after the Hero Carousel block instead, before HOW IT WORK) and before the Business Model
section (added in a later phase). Use `v-for` over an array of 3 `{ target, suffix, label }`
objects (a class field on Home.vue) rendering three `<StatsCounter>` instances, rather than
hardcoding 3 near-identical blocks.

STYLING: use `$secondary-color`/`$theme-color` from `src/style/_var.scss` for colors, no
new hardcoded hex. Prefer `<style lang="scss" scoped>` importing `../../style/_var` (adjust
relative path) directly in the new component file, rather than a separate compiled `.css`.

REGISTER the component in Home.vue's `@Component({ components: { ... } })` block.

ACCEPTANCE CRITERIA FOR THIS PHASE:
1. Homepage shows the 3-stat strip with the exact numbers/labels above.
2. Scrolling the strip into view triggers a count-up animation once (not on every
   scroll-into-view re-trigger — confirm the observer unobserves after firing).
3. `StatsCounter.vue` is a genuinely reusable, prop-driven component (no hardcoded numbers
   inside it) — verify by checking it takes `target`/`suffix`/`label` as props.
4. `npm run lint` passes; dev server boots with no new console errors.
5. No other section/route was touched.
```

---

## Phase 3 — Home.vue: 商業模式差異化 Business Model

```
GOAL: Add the "商業模式差異化" (business model differentiation) section to the homepage —
the big deposit-ratio number, 4 guarantee cards, and comparison table.

CONTEXT: You're already working inside this Vue2 project. Read `src/views/Home.vue` in
full before editing.

SOURCE CONTENT: `C:\yode\tigermaster-one-piece\docs\design\website-optimization\prototype\home.html`,
section commented `<!-- 4 商業模式區 Business Model（bizNumbers） -->` (around line 220-265).
Port verbatim: the "訂金:尾款 = 3:7" headline number, the 4 guarantee cards, and the
comparison table (5 rows as they actually appear in the prototype file — read it directly,
don't assume the row count/labels from memory, a prior summary of this table was found to
be inaccurate). Background: decisions #5 and #6 in
`C:\yode\tigermaster-one-piece\docs\design\website-optimization\homepage-about-optimization.md`
explain why this framing was chosen (avoid vague/competitor-specific marketing terms like
"安心支付").

WHERE TO INSERT: after the Milestone Stats Strip (previous phase) and before the existing
HOW IT WORK/五大優勢 section (`Home.vue:43` region, unchanged). Give the section's wrapper
element `id="biz-model"` (or the Vue-idiomatic anchor equivalent used elsewhere in this
file) — this is the scroll target for the Brand Statement CTA added in Phase 1, so once
this lands that button will start working.

STYLING: `$secondary-color`/`$theme-color` from `src/style/_var.scss`, no new hex.
Inline markup in Home.vue's template (not a separate component), consistent with how
五大優勢/steps/services sections are written in this file.

ACCEPTANCE CRITERIA FOR THIS PHASE:
1. Homepage shows Business Model section with the correct headline number, 4 cards, and
   the comparison table exactly matching the prototype's rows (read and compare directly,
   don't assume).
2. Section has `id="biz-model"`; if Phase 1 already ran, clicking its CTA button now
   scrolls here correctly.
3. `npm run lint` passes; dev server boots with no new console errors.
4. No other section/route was touched.
```

---

## Phase 4 — Home.vue: 移除客戶案例／合作夥伴，改為企業福委會

```
GOAL: Remove the existing "客戶案例" and "合作夥伴" sections (including their data-fetching
and pagination logic) and replace that slot with a new "企業福委會" (Enterprise Welfare)
section.

CONTEXT: You're already working inside this Vue2 project. Read `src/views/Home.vue` in
full before editing — this phase touches both template AND script (data/methods), so read
the whole file carefully, not just the template region.

REMOVE — 客戶案例 (Customer Cases):
- Template block (was around `Home.vue:397-421`).
- The `articleList` data field (was around `Home.vue:540`).
- The `async mounted()` fetch call using `SelectedArticle().selectedArticleGetByDevice(0)`
  from `fdtigermaster-client-sdk` (was around `Home.vue:569-578`) — remove the call; if
  `SelectedArticle`/the SDK import is unused anywhere else in the file after this removal,
  remove the import too. Double-check nothing else in the file depends on `articleList`
  before deleting it.

REMOVE — 合作夥伴 (Partners):
- Template block, both desktop and mobile variants (was around `Home.vue:423-474`).
- The `cooperationlist` data array (was around `Home.vue:541-559`).
- The `pageslist`/`totalpage` computed properties, `changePages()`/`moveOnePage()` methods,
  and `nowpage`/`isActive`/`prepage` data fields (were around `Home.vue:562-564, 582-629`)
  — these exist ONLY to drive the Partners carousel's pagination; confirm they're not used
  anywhere else in the file, then delete all of them.

ADD — 企業福委會 (Enterprise Welfare), in the same template position: read
`C:\yode\tigermaster-one-piece\docs\design\website-optimization\prototype\home.html`,
section commented `<!-- 10 企業福委會區 Enterprise Welfare（welCards） -->` (around line
434-455). This section was recently simplified — it's now: heading "企業福委會特約廠商",
one subtitle paragraph, a row of 5 partner-name pill/chip buttons (white rounded boxes,
NOT plain inline text and NOT a 3-card benefit grid — an earlier grid version was dropped),
then a CTA row with the button next to a short helper line. Port the current prototype
markup as-is rather than any earlier version you may have seen referenced elsewhere.
- CTA `href` must be the real Google Form URL:
  `https://docs.google.com/forms/d/e/1FAIpQLSfiSAoRjo2t17BMcRZ20uDt_BuNgBsPHjBonmr6CIE_29rjpQ/viewform`,
  opened in a new tab. CTA label is "洽詢企業特約合作", with helper text "想成為特約企業？
  留下聯絡方式，專人與您聯繫。" displayed next to it.
- Give the section's wrapper `id="welfare"` (or the equivalent in-page anchor convention).
- The 5 partner pills should be individual rounded-box elements (border-radius ~8px, white
  background, subtle shadow — match the prototype's exact styling, don't fall back to plain
  inline text), laid out in a wrapping flex row.
- **IMPORTANT — do not silently resolve this**: the prototype (and the source draft it
  came from) lists 5 partner names: 統一證券、崇越科技、英濟科技、中華電信職工福委會、
  遠傳電信. The decision log (`homepage-about-optimization.md`, decisions #10 and #16)
  says only 重樂、育達科大、中華電信福委會 are actually confirmed 企業福委會 partners —
  統一證券/崇越科技/英濟科技 look like investors (see the About page's milestone copy),
  not welfare clients, and 遠傳電信 usage isn't authorized yet. Port the list exactly as
  it is in the prototype (5 names, unchanged) and add a code comment flagging this
  discrepancy — same as the prototype does — so a human resolves it later. Do not trim or
  "fix" the list yourself.

NAVBAR/FOOTER: add a "企業福委會" entry to `src/components/Utility/Navbar.vue` (follow the
existing hardcoded inline link pattern, mix of `router-link`/`<a>` — since this points to
an in-page anchor on the homepage, use `<a href="/#welfare">` or the equivalent), and check
whether `src/components/Utility/Footer.vue` needs an updated/new link pointing to `#welfare`
too (the decision log calls this navbar entry a "test", not a hard requirement — flag it as
such rather than treating it as unquestionably final).

STYLING: `$secondary-color`/`$theme-color` from `src/style/_var.scss`, no new hex. Inline
markup in Home.vue's template, consistent with existing sections.

ACCEPTANCE CRITERIA FOR THIS PHASE:
1. 客戶案例 and 合作夥伴 are both fully gone from the rendered page AND from the component's
   script (no dead data fields, computed properties, or methods left behind — grep the file
   afterward for `articleList`, `cooperationlist`, `pageslist`, `changePages`, `moveOnePage`
   and confirm zero remaining references).
2. 企業福委會 section renders in their place with working CTA link to the real Google Form.
3. Navbar has a working 企業福委會 link; report whether Footer was also updated.
4. The partner-list discrepancy is flagged via code comment, not silently resolved.
5. `npm run lint` passes; dev server boots with no new console errors.
6. No other section/route was touched.
```

---

## Phase 5 — Home.vue: 客戶評價／真實留言跑馬燈

```
GOAL: Add a new customer-reviews marquee section to the homepage, in the slot vacated by
客戶案例 (removed in a previous phase).

CONTEXT: You're already working inside this Vue2 project. Read `src/views/Home.vue` in
full before editing. This phase assumes the 客戶案例/合作夥伴 removal from a previous
migration phase already happened — if it hasn't, insert this new section directly after
whatever section currently precedes where 客戶案例 used to be (around `Home.vue:395`,
i.e. right after the "8個步驟" process section), and before 企業福委會 if that phase has
also already run, matching the prototype's section order (企業福委會 comes first, then
客戶評價 — see the prototype file's own ordering for reference).

SOURCE CONTENT: `C:\yode\tigermaster-one-piece\docs\design\website-optimization\prototype\home.html`,
section commented `<!-- 11 客戶評價／真實留言 Customer Reviews -->` (around line 111-219).
This is a CSS-only marquee: 8 unique review cards, each duplicated once in the DOM (16
total) for a seamless `@keyframes marquee` loop, pausing on hover
(`.review-track:hover { animation-play-state: paused; }`). Each card has: masked reviewer
name, star rating (Font Awesome icons — confirm this repo already has Font Awesome
available via `@fortawesome/vue-fontawesome`, already a dependency per package.json),
service-category tag, 2-3 line review text, "已完工" badge + relative date.

BUILD AS ITS OWN COMPONENT: create `src/components/Home/ReviewsMarquee.vue` (class-based,
`<script lang="ts">`) — this repo's convention extracts sections with nontrivial
self-contained behavior (like `Carousel.vue`) into their own components, and this section's
CSS animation + repeatable card data array fits that pattern well. Store the 8 review
objects as a class field (array of `{ reviewer, stars, tag, body, date }`), `v-for` over it
twice (or once with a computed doubled array) to produce the 16-card duplicated DOM needed
for the seamless loop.

IMPORTANT — mark this as placeholder content: the prototype's review text is explicitly
sample/illustrative, not real customer reviews (see the `SAMPLE CONTENT` HTML comment in
the source file). Carry an equivalent comment into the new Vue component's template or a
code comment near the data array, so nobody mistakes it for real reviews later. Decision
log reference: decisions #8 and #15 in
`C:\yode\tigermaster-one-piece\docs\design\website-optimization\homepage-about-optimization.md`
describe the real intended source (curated real App/platform reviews) for a future update.

STYLING: `$secondary-color`/`$theme-color` from `src/style/_var.scss`. Use
`<style lang="scss" scoped>` in the new component file importing `_var.scss` directly.

REGISTER the component in Home.vue's `@Component({ components: { ... } })` block.

ACCEPTANCE CRITERIA FOR THIS PHASE:
1. Homepage shows the reviews marquee in the correct slot, auto-scrolling, pausing on
   hover, with 16 card DOM elements (8 unique × 2).
2. A clear "this is sample content" marker exists in the code (comment), not just in this
   prompt.
3. `npm run lint` passes; dev server boots with no new console errors.
4. No other section/route was touched.
```

---

## Phase 6 — About.vue: 內容區塊置換

```
GOAL: Replace About.vue's current 核心價值／核心人物／品牌故事／未來展望 content sections
with the new 創辦人的話／我們相信／願景 content, per the locked redesign decisions. This is
a content rewrite, not a small patch — treat it as replacing those sections wholesale.

CONTEXT: You're already working inside this Vue2 project. Read `src/views/About.vue` in
full before editing (it's short, ~140 lines).

KEEP UNCHANGED:
- `<JoinusTop />` (currently `About.vue:4`) — unrelated recruiting banner, out of scope.
- The top banner section (currently `About.vue:5-10`) — update only its heading/subtext if
  the prototype's wording differs (e.g. "每一個家，都值得被好好照顧。"), keep the same
  structural slot/background-image mechanism.

REMOVE AND REPLACE: the intro + mobile-only 核心價值 + 核心人物/創辦人 member card +
desktop 核心價值 + 品牌故事 + 未來展望 blocks (currently `About.vue:11-117`, i.e.
everything between the banner and the trailing `<Footer />` call). Replace with content
ported from `C:\yode\tigermaster-one-piece\docs\design\website-optimization\prototype\about.html`,
specifically the sections commented `<!-- intro -->`, `<!-- 創辦人的話 -->`,
`<!-- 我們相信 -->`, `<!-- 願景 -->` (around lines 50-106 in that file). Note this content
is an agreed interim draft — the decision log
(`C:\yode\tigermaster-one-piece\docs\design\website-optimization\homepage-about-optimization.md`,
待釐清事項 section) flags that some copy details are still pending a future meeting; migrate
the current draft as-is anyway, don't block on that.

ALSO REMOVE: the stray `<Footer />` call at the end of the file (currently `About.vue:120`)
— its component import is already commented out (`About.vue:125-126,130-131`), meaning it's
dead/broken leftover code; Footer is already rendered globally via `src/App.vue`, so this
local call is redundant at best. Delete it while you're in this file.

FOUNDER PHOTO: the prototype uses a placeholder `<image-slot>` for the founder photo — no
real image file exists anywhere in the design asset bundle. Keep a placeholder image (reuse
whatever placeholder/fallback image pattern this codebase already uses elsewhere, or a
simple gray box) and flag in your summary that a real photo still needs to be supplied —
don't block the migration on it.

ASSETS: content imagery goes under `public/fdtiger-offical-site-img/about/` (existing
convention), referenced as plain relative path strings, not `require()`.

STYLING: `$secondary-color`/`$theme-color` from `src/style/_var.scss` — note `about.scss`
also has its own local `.font-sm/.font-md/.font-lg/.font-xl` utility classes with DIFFERENT
pixel values than `_var.scss`'s `$font-sm/$font-md/$font-lg` — check both and use whichever
is contextually correct, don't assume one is canonical.

ACCEPTANCE CRITERIA FOR THIS PHASE:
1. `/About` route renders: JoinusTop → banner → 創辦人的話 → 我們相信 → 願景, matching the
   prototype's copy.
2. The stray `<Footer/>` call is gone; page still shows exactly one Footer (the global one
   from `App.vue`) — verify by inspecting the rendered DOM, not just the source.
3. Founder photo placeholder is in place with an explicit flag in your report that it's a
   placeholder needing a real asset.
4. `npm run lint` passes; dev server boots with no new console errors.
5. No other section/route was touched.
```

---

## Phase 7 — About.vue: 里程碑時間軸

```
GOAL: Add a new "里程碑" (milestone) timeline section to the About page — this section
doesn't exist in the current file at all. Depends on Phase 2 (must run after it): reuses
the `StatsCounter.vue` component built there.

CONTEXT: You're already working inside this Vue2 project. Read `src/views/About.vue` in
full before editing, and confirm `src/components/Home/StatsCounter.vue` already exists
(built in a previous migration phase) — if it doesn't exist yet, stop and say so rather than
rebuilding a duplicate count-up implementation.

SOURCE CONTENT: `C:\yode\tigermaster-one-piece\docs\design\website-optimization\prototype\about.html`,
section commented `<!-- 里程碑 -->` (around line 107-131): 3 stat cards (25,000+ 完成交易 /
20,000+ 平台會員 / 2,200+ 合作師傅 — must exactly match the homepage's Milestone Stats Strip
numbers/labels from Phase 2) followed by a full 2019–2028 timeline, with "未來藍圖" tags on
the 2027/2028 future entries.

WHERE TO INSERT: directly after the 願景 section (added in Phase 6, or wherever the About
page's content currently ends if Phase 6 hasn't run yet), before the trailing Footer area.

IMPLEMENTATION: for the 3 stat cards, reuse `<StatsCounter>` (imported from
`src/components/Home/StatsCounter.vue`) with `v-for` over the same 3
`{ target, suffix, label }` values used on the homepage — do not hardcode a second copy of
these numbers; if practical, share the same source array (e.g. a small shared TS constant
file, or duplicate the literal array but keep values byte-identical) so the two pages can
never drift out of sync. The timeline itself (2019-2028 rows) is static markup, no
componentization needed — port it directly from the prototype.

STYLING: `$secondary-color`/`$theme-color` from `src/style/_var.scss`, consistent with the
rest of the file.

ACCEPTANCE CRITERIA FOR THIS PHASE:
1. `/About` shows the milestone section with 3 count-up stats matching the homepage's
   values exactly, followed by the full 2019-2028 timeline including the two 未來藍圖-tagged
   future entries.
2. `StatsCounter.vue` was reused, not reimplemented — confirm by checking the import.
3. `npm run lint` passes; dev server boots with no new console errors.
4. No other section/route was touched.
```

# Tiger Master (師虎來了) Design System

**Company:** 飛達智能股份有限公司 (FD Intelligence Co., Ltd.), Taiwan.
**Product:** 師虎來了 ("Tiger Master") — Taiwan's home-repair matching/sharing platform. Customers book vetted repair masters (師傅) through an app/website across 8 repair categories (安裝, 水電, 清潔, 裝潢整修, 搬運, 家電, 房屋漏水, 消毒病媒) with ~200+ service items. Adjacent surfaces: 師虎學院 (Tiger Academy training courses), 師虎商城 (shop), blog, and an internal quotation (報價) system.

## Sources
- Codebase: `fdtigermaster-offical-site/` (mounted local folder) — Vue 2.7 + TypeScript + Bootstrap Vue official marketing site, deployed at https://www.fdtigermaster.com/. Tokens extracted from `src/style/_var.scss` and component/view SCSS.
- No Figma or brand PDF was provided. No decks provided.

## CONTENT FUNDAMENTALS
- **Language:** Traditional Chinese (zh-TW), full-width punctuation (，。？「」). English appears only as oversized decorative background words ("HOW IT WORK", "PRICE RANGE", "WARRANTY", "APP") and in UI initials (Q&A).
- **Voice:** Warm, reassuring consumer voice. Addresses the reader as 您 (formal "you"); the brand refers to itself as 師虎/師虎平台/我們. Masters are 師傅.
- **Tone:** Benefit-led, anxiety-relieving. Sells trust and protection against getting ripped off: 「讓您不再當冤大頭」, 「售後保固由師虎為您承擔」. Rhetorical questions as hooks: 「為什麼一定要在師虎上叫修?」.
- **Style patterns:** Short slogan + longer supporting sentence. Numbered processes (01–08 steps). Everyday analogies: 「找師傅跟叫外送一樣簡單」. Exclamation marks used freely in slogans: 「師虎來了！讓家更安心、更溫馨！」, 「立即下載『師虎來了』APP！」.
- **CTAs:** Imperative + immediate: 立即加入, 立即下載, 開啟APP, 更多服務, 查看更多.
- **Numbers as proof:** 平均錄取率只有36%, 八大修繕類別, 200種服務工項, 24小時.
- **No emoji** anywhere in product copy.

## VISUAL FOUNDATIONS
- **Colors:** Tiger yellow `#fabf13` (navbar, step numbers, active dots, footer link headings) + navy `#1f286f` (buttons, links, logo glyphs; variant `#2d2d70`). Footer/dark surfaces `#333333`. Body text `#4a4a4a`, secondary `#6f6f6f`, ink `#23242a`, muted `#727276`. Light-blue tints `#eff3fe`/`#f0f3fd` for announcement bars and search chips. Neutral grays `#f5f5f5`, `#eeeeee`. Accent blue `#3a89f8` (select hover, search icon); price gauge gradient `rgb(64,174,254)→rgb(52,73,255)`. Errors are plain `red`.
- **Type:** System stack `arial, "Microsoft JhengHei", 微軟正黑體, sans-serif` — no webfonts shipped (Noto Sans TC added here as nearest Google-Fonts fallback; see CAVEATS). Section titles 36px/500. Banner h1 48px bold white. Body 18–22px. Step numbers 64px/700 yellow. Ghost background words 100px/800 in `#f6f6f6`, positioned absolutely behind content — a signature motif.
- **Backgrounds:** Mostly white; alternating full-bleed photo strips (real repair photography, warm/neutral, no filters or grain) and a navy band for the app-download section. Gray `#f5f5f5` page background on Q&A. Banners are full-width 435px photos with a dark multiply overlay and white centered/left h1.
- **Motifs:** Oversized ghost English words behind sections; big yellow step numerals; dotted vertical dividers between how-it-works items with black triangle "down arrows"; line-art illustrations (tiger mascot) for steps.
- **Buttons:** Navy `#1f286f`, white text, small radius (2–4px). Hover = black overlay at 0.1 opacity fading in over .5s (not a color swap). Outline variant: white bg, 0.5px navy border, fills navy on hover.
- **Links/nav:** Navbar links 18px bold `#333` (external product links in navy) with an animated underline that grows from left on hover (.5s, .1s delay). Footer links white → yellow on hover.
- **Cards (.board):** White, radius 4px, ambient shadow `0 0 4px rgba(0,0,0,.15)` — shadows are always offset-free and soft.
- **Forms:** Underline-only inputs (no box): 0.5px bottom border `#6c6c6c`, no radius, placeholder `#c4c4c4`. Error state turns text, placeholder and border plain red. Capsule checkboxes: `#f5f5f5` pill (radius 20px) → navy fill + white text when checked. Custom select: white, 1px `#d1d1d1`, radius 5px, tiny layered shadow, options hover `#3a89f8`.
- **Motion:** Gentle and slow — .5s hover transitions, .2s dot transitions, .3s ease-in-out panels/back-to-top, .5s carousel slide. No bounces or springs.
- **Pagination dots:** 12px `#ccc` circles; active = yellow, scaleX(2) squash into a pill (radius 40%).
- **Radii:** Small everywhere (2–8px); capsules only for tag-pills. Circles for dots/back-to-top.
- **Layout:** Max content width 1100px (nav) / 1400px (footer); generous vertical whitespace (80–150px section padding); fixed yellow navbar; fixed announcement bar in light blue `#eff3fe`; floating circular back-to-top in translucent `#333` at 50%→70% opacity on hover.
- **Transparency/blur:** No blur. Transparency only for the back-to-top button and the button hover overlay.

## ICONOGRAPHY
- **Icon fonts (CDN):** FontAwesome 5 (solid/regular/brands: arrow-right, arrow-left, times, chevrons) and Bootstrap Icons via Bootstrap Vue (chevron-up on BackToTop). Use FontAwesome/Bootstrap Icons from CDN, thin/solid to match. No custom icon font.
- **Project SVGs:** `assets/icons/` — Close, Download, Save, Trash, Vector (chevron), VectorDown, WarningCircle, FolderNotchOpen, Group, course-title-icon (quotation-system icons, Phosphor-style outline), avatar.png.
- **Illustrations:** `assets/illustrations/` — line-art tiger-mascot步驟插圖 (HowItWork_item_01–05) and 8-step app frames (Frame_01–08). These, not stock icons, carry the brand personality.
- **Logos:** `assets/logo.svg` (yellow rounded-rect 師虎來了 wordmark, from footer source), `assets/text_logo.png` (navbar), `assets/square_logo.png` (app icon), `assets/logo.png` (OG image). Store badges in `assets/store/`, social SVGs in `assets/social/`.
- **No emoji, no unicode-as-icon.** Decorative arrows are CSS border triangles.

## INDEX
- `styles.css` → `tokens/` (fonts, colors, typography, effects)
- `assets/` — logo, logo.svg, text_logo, square_logo, store/, social/, icons/, illustrations/, services/ (8 category photos), banners/, imagery/
- `guidelines/` — foundation specimen cards (Design System tab)
- `components/core/` — Button, Banner, Board, SimpleTable, Loading
- `components/forms/` — FormInput, FormSelect, CapsuleCheckbox
- `components/navigation/` — Navbar, Footer, Breadcrumb, PageDots, BackToTop
- `ui_kits/website/` — official-site recreation (Home, Service, QA screens; interactive index.html)
- `SKILL.md` — agent skill entry point

## Intentional additions
- None. Component inventory mirrors the codebase (`src/components/Utility`, `src/style/components`).

## CAVEATS
- No font binaries exist in the source; system-font stack is authoritative. Noto Sans TC (Google Fonts) added as fallback — replace with corporate font files if any exist.
- The real logo assets were copied from the codebase verbatim; nothing was redrawn.

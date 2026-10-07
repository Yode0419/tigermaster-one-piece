// fill-figma-ssot structure check. Read at the end of each Section, not at session start.
// Paste the commented block alone into one use_figma call (no helpers needed).

// ===== STRUCTURE CHECK（結構檢查，end of every Section, and once more at session end） =====
// Paste alone (no helpers needed). Returns only the problems found, plus a text dump per Frame
// to compare with your content lists. Empty lists are dropped from the result.
/*
const PAGE_NAME = '2 訂單與報價';
const PREFIX = '2.1.';   // frame number prefix of the Section ('2.' for the whole Page)
const EXPECTED = [];     // frame names from r01 for that prefix
const LONG_PAGES = [];   // content-focused long pages, allowed to be taller than 852
const page = figma.root.children.find(p => p.name === PAGE_NAME);
await figma.setCurrentPageAsync(page);
figma.skipInvisibleInstanceChildren = true;
// Extra "（完整內容）" frames (full view of a long BottomSheet) are not in the structure table.
const frames = page.findAll(n => n.type === 'FRAME' && n.parent.type === 'SECTION'
  && n.name.startsWith(PREFIX) && !n.name.endsWith('（完整內容）'));
const names = frames.map(f => f.name);
const r = {
  missing: EXPECTED.filter(n => !names.includes(n)),
  extra: names.filter(n => !EXPECTED.includes(n)),
  size: [], layout: [], order: [], bottomPadding: [], noHomeIndicator: [], textOverride: [], localNoTextProps: [],
  placeholderLeft: [], hardcodedColor: [], clipping: [], texts: {},
};
const insideInstance = n => { for (let p = n.parent; p; p = p.parent) if (p.type === 'INSTANCE') return true; return false; };
const shown = n => { for (let p = n; p && p.type !== 'PAGE'; p = p.parent) if (p.visible === false) return false; return true; };
// First on top: Dialog/BottomSheet, then Scrim, then BottomNavBar, all above the auto-layout children.
const RANK = [/^(Dialog|BottomSheet)/, /^Scrim/, /^BottomNavBar/];
for (const f of frames) {
  const long = LONG_PAGES.includes(f.name);
  if (f.width !== 393 || (long ? f.height < 852 : f.height !== 852)) r.size.push(`${f.name} ${f.width}x${f.height}`);
  if (f.layoutMode !== 'VERTICAL' || f.itemReverseZIndex !== true)
    r.layout.push(`${f.name}: layoutMode=${f.layoutMode}, firstOnTop=${f.itemReverseZIndex}`);
  const firstFlow = f.children.findIndex(k => k.layoutPositioning !== 'ABSOLUTE');
  let last = -1;
  f.children.forEach((k, i) => {
    const rank = RANK.findIndex(re => re.test(k.name));
    if (rank < 0) return;
    if (firstFlow >= 0 && i > firstFlow) r.order.push(`${f.name} > ${k.name} is below the auto-layout children`);
    if (rank < last) r.order.push(`${f.name} > ${k.name} is out of order`);
    last = Math.max(last, rank);
  });
  // Scroll structure: Content (no padding) > Scroll Content (hug height, holds the paddings and the real content).
  // Bottom padding of Scroll Content: at least 16, and nav height + logo overhang (36) + 16 = 134 when a BottomNavBar floats over it.
  const cont = f.children.find(k => k.name === 'Content');
  const body = cont && cont.children.find(k => k.name === 'Scroll Content');
  const navEl = f.children.find(k => /^BottomNavBar/.test(k.name));
  const needPad = navEl ? navEl.height + 36 + 16 : 16;
  if (cont && !body) r.bottomPadding.push(`${f.name}: Content has no "Scroll Content" frame inside`);
  else if (cont) {
    if (cont.children.length !== 1) r.bottomPadding.push(`${f.name}: Content has ${cont.children.length} children, expected only Scroll Content`);
    if (cont.paddingBottom || cont.paddingTop || cont.paddingLeft || cont.paddingRight) r.bottomPadding.push(`${f.name}: Content itself must have no padding`);
    if (body.layoutSizingVertical !== 'HUG') r.bottomPadding.push(`${f.name}: Scroll Content height is ${body.layoutSizingVertical}, expected HUG`);
    if (body.paddingBottom < needPad) r.bottomPadding.push(`${f.name}: Scroll Content paddingBottom=${body.paddingBottom}, need >= ${needPad}`);
    // Stretched long page: the frame's 1px stroke counts in the layout, so height needs +2 or Content ends up shorter than its content.
    if (long && cont.height < body.height - 0.5) r.bottomPadding.push(`${f.name}: long page Content ${cont.height} < Scroll Content ${body.height} (add 2 for the frame stroke)`);
  }
  // Every frame needs a visible HomeIndicator (bars such as BottomNavBar and ChatInputBar contain one).
  if (!f.findOne(n => n.name === 'HomeIndicator' && shown(n))) r.noHomeIndicator.push(f.name);
  const texts = [];
  for (const n of [f, ...f.findAll(() => true)]) {
    if (n.type === 'TEXT' && shown(n)) texts.push(n.characters.replace(/\s+/g, ' '));
    // Local component instances must change text through properties, not layer overrides.
    if (n.type === 'INSTANCE' && !insideInstance(n)) {
      const main = await n.getMainComponentAsync();
      if (main && !main.remote) for (const o of n.overrides) {
        if (!o.overriddenFields.includes('characters')) continue;
        const t = await figma.getNodeByIdAsync(o.id);
        if (t && t.type === 'TEXT' && !t.componentPropertyReferences?.characters)
          r.textOverride.push(`${f.name} > ${n.name} > ${t.name}`);
      }
    }
    if (insideInstance(n)) continue;
    if (n.type === 'TEXT' && n.characters.includes('尚未填入畫面')) r.placeholderLeft.push(f.name);
    for (const field of ['fills', 'strokes']) {
      const paints = n[field];
      if (Array.isArray(paints) && paints.some(p => p.type === 'SOLID' && p.visible !== false && !p.boundVariables?.color))
        r.hardcodedColor.push(`${f.name} > ${n.name} (${field})`);
    }
    if (n !== f && n.type === 'FRAME' && n.clipsContent && n.name !== 'Content' && n.children.length)
      r.clipping.push(`${f.name} > ${n.name}`);
  }
  r.texts[f.name] = texts.join(' | ');
}
// Standalone local components with text but no TEXT property (variant sets may fix text per variant).
const lib = page.findOne(n => n.type === 'SECTION' && n.name === '本機元件');
if (lib) for (const c of lib.findAllWithCriteria({ types: ['COMPONENT'] })) {
  if (c.parent.type === 'COMPONENT_SET') continue;
  const defs = Object.values(c.componentPropertyDefinitions);
  if (c.findOne(n => n.type === 'TEXT') && !defs.some(d => d.type === 'TEXT')) r.localNoTextProps.push(c.name);
}
for (const k of Object.keys(r)) if (Array.isArray(r[k]) && !r[k].length) delete r[k];
return r;
*/

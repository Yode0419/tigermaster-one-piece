// fill-figma-ssot helpers for use_figma.
// use_figma keeps no state between calls: paste the HELPERS block at the top of
// every call that needs it, then write the frame-specific code below it.
// Keys come from docs/exploration/in-progress/figma-ssot/stage3/reference.md.

// ===== HELPERS (paste from here) =====
const _cache = {};

// Import a single component (a variant) or a whole component set by key.
async function comp(key) {
  return _cache[key] ??= await figma.importComponentByKeyAsync(key);
}
async function compSet(key) {
  return _cache[key] ??= await figma.importComponentSetByKeyAsync(key);
}

// Pick a variant from a component set: variant(set, { Style: 'Ghost Neutral', Size: 'lg' }).
// Unlisted properties keep the set's default value.
function variant(set, props) {
  const want = { ...set.defaultVariant.variantProperties, ...props };
  const hit = set.children.find(c =>
    Object.entries(want).every(([k, v]) => c.variantProperties[k] === v));
  if (!hit) throw new Error(`No variant ${JSON.stringify(want)} in ${set.name}`);
  return hit;
}

// Variables: figma.variables.importVariableByKeyAsync (figma.importVariableByKeyAsync does not exist).
async function v(key) {
  return _cache[key] ??= await figma.variables.importVariableByKeyAsync(key);
}

// Set instance properties by name without the #id suffix:
// setProps(inst, { 'Has Leading': false, Label: '取消' }).
// Text values are loaded with fonts first. Do NOT use this to switch the variant
// of a cloned instance that has text overrides: delete it and create a new
// instance of the target variant instead (text width does not recompute).
async function setProps(inst, props) {
  const defs = inst.componentProperties;
  const out = {};
  for (const [name, value] of Object.entries(props)) {
    const full = Object.keys(defs).find(k => k === name || k.split('#')[0] === name);
    if (!full) throw new Error(`No property "${name}" on ${inst.name}: ${Object.keys(defs).join(', ')}`);
    out[full] = value;
  }
  for (const t of inst.findAllWithCriteria({ types: ['TEXT'] })) await loadFonts(t);
  inst.setProperties(out);
  return inst;
}

async function loadFonts(textNode) {
  const fonts = textNode.getStyledTextSegments(['fontName']).map(s => s.fontName);
  for (const f of fonts) await figma.loadFontAsync(f);
}

// Change the text of an existing text layer (also inside instances).
async function setText(textNode, chars) {
  await loadFonts(textNode);
  textNode.characters = chars;
  return textNode;
}

// Bind a color variable to fills (or strokes). setBoundVariableForPaint returns a new paint.
async function bindFill(node, varKey, field = 'fills') {
  const variable = await v(varKey);
  const base = { type: 'SOLID', color: { r: 0, g: 0, b: 0 } };
  node[field] = [figma.variables.setBoundVariableForPaint(base, 'color', variable)];
  return node;
}

// Bind spacing/radius variables: bindNum(frame, { itemSpacing: KEY, paddingLeft: KEY }).
async function bindNum(node, map) {
  for (const [field, key] of Object.entries(map)) node.setBoundVariable(field, await v(key));
  return node;
}

// New text with a DS text style and color token.
async function text(chars, styleKey, colorKey) {
  const style = _cache[styleKey] ??= await figma.importStyleByKeyAsync(styleKey);
  await figma.loadFontAsync(style.fontName);
  const t = figma.createText();
  await t.setTextStyleIdAsync(style.id);
  t.characters = chars;
  if (colorKey) await bindFill(t, colorKey);
  return t;
}

// Auto Layout container that does not clip (Card shadows survive). Only `Content` clips.
function box(direction = 'VERTICAL', props = {}) {
  const f = figma.createAutoLayout(direction, { fills: [], ...props });
  f.clipsContent = false;
  return f;
}

// Turn a placeholder Frame into the three-zone layout:
// [top] + Content (fills, clips, scrolls vertically) + [bottom]; floating layers go on top later.
// Removes the placeholder texts. Returns { frame, content, body }.
// With no BottomNavBar, ChatInputBar or button bar, pass the DS HomeIndicator (Style=Dark, key in reference.md) as `bottom`.
// Scrolling needs two layers: `content` (fixed Fill size, clips, scrolls, NO padding) holds `body`
// ("Scroll Content", width Fill, height Hug). Put ALL padding and the real content in `body`, never in `content`:
// a fixed-size auto-layout frame leaves its own bottom padding out of the scroll range, so content scrolled to
// the end would sit under the bottom bar. Body's paddingBottom = Spacing/16, or 134 (nav 82 + logo overhang 36 + 16)
// when a floating BottomNavBar covers it. Set the other paddings on `body`; never overwrite paddingBottom with a smaller value.
// BottomNavBar exception: pass it as `bottom` and also `navBottom: true`; it becomes a floating
// layer pinned to the bottom (its centre logo sticks up over Content).
const NAV_LOGO_OVERHANG = 36; // the centre logo bump sticks 36 above the BottomNavBar's top edge (outside its 82 bounds)
async function threeZone(frame, { top, bottom, bgKey, navBottom = false } = {}) {
  const { x, y } = frame;
  for (const n of [...frame.children]) n.remove();
  frame.layoutMode = 'VERTICAL';
  frame.primaryAxisSizingMode = 'FIXED';
  frame.counterAxisSizingMode = 'FIXED';
  frame.itemSpacing = 0;
  frame.itemReverseZIndex = true; // "First on top" (user rule): earlier children draw above later ones
  frame.paddingTop = frame.paddingBottom = frame.paddingLeft = frame.paddingRight = 0;
  frame.resize(393, 852);
  if (bgKey) await bindFill(frame, bgKey);
  const content = figma.createAutoLayout('VERTICAL', { name: 'Content', fills: [] });
  if (top) { frame.appendChild(top); top.layoutSizingHorizontal = 'FILL'; }
  frame.appendChild(content);
  content.layoutSizingHorizontal = 'FILL';
  content.layoutSizingVertical = 'FILL';
  content.clipsContent = true;
  content.overflowDirection = 'VERTICAL';
  const body = figma.createAutoLayout('VERTICAL', { name: 'Scroll Content', fills: [] });
  body.clipsContent = false;
  content.appendChild(body);
  body.layoutSizingHorizontal = 'FILL';
  body.layoutSizingVertical = 'HUG';
  if (bottom && navBottom) {
    // First on top: put the floating nav before the top bar so it draws above Content.
    frame.insertChild(0, bottom);
    bottom.layoutPositioning = 'ABSOLUTE';
    bottom.constraints = { horizontal: 'STRETCH', vertical: 'MAX' };
    bottom.x = 0; bottom.y = frame.height - bottom.height;
    // Not a token (nav height + Spacing/16): keeps the last item clear of the floating nav when scrolled to the end.
    body.paddingBottom = bottom.height + NAV_LOGO_OVERHANG + 16; // 82 + 36 + 16 = 134
  } else {
    // Every body keeps breathing room at the bottom, so scrolled-to-end content never touches the bar.
    await bindNum(body, { paddingBottom: 'd83cd74d5f15f468c9a0b21f1b921aea1498c990' }); // Spacing/16
    if (bottom) { frame.appendChild(bottom); bottom.layoutSizingHorizontal = 'FILL'; }
  }
  frame.x = x; frame.y = y;
  return { frame, content, body };
}

// Floating layer (Scrim, Dialog, BottomSheet, chat background) outside Auto Layout.
// With "First on top", floating layers must be the FIRST children to draw on top
// (stack them so the Dialog is first, then the Scrim: float the Scrim, then the Dialog).
function float(frame, node, { h = 'STRETCH', v = 'STRETCH' } = {}) {
  frame.insertChild(0, node);
  node.layoutPositioning = 'ABSOLUTE';
  node.constraints = { horizontal: h, vertical: v };
  return node;
}

// Scrim covering the whole Frame (status bar included), bound to Background/Overlay.
async function scrim(frame) {
  const s = figma.createFrame();
  s.name = 'Scrim';
  await bindFill(s, '2be39c9de6a074c0b3b0462231ef9a4eb423a5f2');
  float(frame, s);
  s.resize(frame.width, frame.height);
  s.x = 0; s.y = 0;
  return s;
}

// Swap the Smiley inside an icon instance for a Phosphor icon.
// setKey: the Phosphor component set key (search_design_system with the Phosphor libraryKey).
// variantProps e.g. { Format: 'Outline', Weight: 'Regular' }. colorKey optional (e.g. Icon/Inverse).
async function swapIcon(iconInst, setKey, variantProps, colorKey) {
  figma.skipInvisibleInstanceChildren = false;
  const inner = iconInst.findOne(n => n.type === 'INSTANCE' && n !== iconInst);
  if (!inner) throw new Error(`No inner icon instance in ${iconInst.name}`);
  inner.swapComponent(variant(await compSet(setKey), variantProps));
  if (colorKey) {
    for (const vec of inner.findAll(n => 'fills' in n && n.fills.length)) await bindFill(vec, colorKey);
  }
  return inner;
}

// Find a layer by name inside a node, including hidden instance children.
function find(node, name) {
  figma.skipInvisibleInstanceChildren = false;
  return node.findOne(n => n.name === name);
}
// ===== HELPERS (end) =====


// ===== TRY-IMPORT CHECK（試匯入） =====
// Run once before building a Section: import every key it needs without creating
// anything. Any "not found" means the DS item is not published: ask the user to
// publish the library, do not copy the component.
/*
const keys = {
  components: [],   // importComponentByKeyAsync
  sets: [],         // importComponentSetByKeyAsync
  variables: [],
  styles: [],
};
const failed = [];
for (const k of keys.components) await figma.importComponentByKeyAsync(k).catch(e => failed.push(['component', k, e.message]));
for (const k of keys.sets) await figma.importComponentSetByKeyAsync(k).catch(e => failed.push(['set', k, e.message]));
for (const k of keys.variables) await figma.variables.importVariableByKeyAsync(k).catch(e => failed.push(['variable', k, e.message]));
for (const k of keys.styles) await figma.importStyleByKeyAsync(k).catch(e => failed.push(['style', k, e.message]));
return { ok: failed.length === 0, failed };
*/


// ===== DS NAME LOOKUP（DS 名稱查詢） =====
// Use when a component is not in reference.md. Runs on the DS file (fileKey X00A5f1Ohj9BhgbMXwzNuM),
// one page per call (several pages: parallel calls). Returns names and keys only.
// DS component pages (2026-10-06): Avatar Badge Banner BottomSheet Button Card Carousel Chatroom Checkbox
// Chip Dialog EmptyState Icon Image ListItem Navigation PasswordField Radio Rating SearchBar
// SegmentedControl Service Snackbar StepIndicator StickyFooter Switch Tag TextField Tooltip.
// Unsure where something lives: `return figma.root.children.map(p => p.name)` first.
/*
const PAGE_NAME = 'Card';
const page = figma.root.children.find(p => p.name === PAGE_NAME);
await figma.setCurrentPageAsync(page);
return page.findAllWithCriteria({ types: ['COMPONENT_SET', 'COMPONENT'] })
  .filter(n => n.type === 'COMPONENT_SET' || n.parent.type !== 'COMPONENT_SET')
  .map(n => `${n.name} | ${n.type === 'COMPONENT_SET' ? 'set' : 'component'} | ${n.key}`).join('\n');
*/


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

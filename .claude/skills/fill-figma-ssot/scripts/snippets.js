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
// Removes the placeholder texts. Returns { frame, content }.
// BottomNavBar exception: pass it as `bottom` and also `navBottom: true`; it becomes a floating
// layer pinned to the bottom (its centre logo sticks up over Content) and Content gets paddingBottom = its height.
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
  if (bottom && navBottom) {
    // First on top: put the floating nav before the top bar so it draws above Content.
    frame.insertChild(0, bottom);
    bottom.layoutPositioning = 'ABSOLUTE';
    bottom.constraints = { horizontal: 'STRETCH', vertical: 'MAX' };
    bottom.x = 0; bottom.y = frame.height - bottom.height;
    content.paddingBottom = bottom.height;
  } else if (bottom) { frame.appendChild(bottom); bottom.layoutSizingHorizontal = 'FILL'; }
  frame.x = x; frame.y = y;
  return { frame, content };
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


// ===== STRUCTURE CHECK（結構檢查，end of batch, one call per Page） =====
// Paste alone (no helpers needed). Set PAGE_NAME and EXPECTED (frame names from r01).
/*
const PAGE_NAME = '1 首頁與接案';
const EXPECTED = [];
const page = figma.root.children.find(p => p.name === PAGE_NAME);
await figma.setCurrentPageAsync(page);
figma.skipInvisibleInstanceChildren = true;
// Extra "（完整內容）" frames (full view of a long BottomSheet) are not in the structure table.
const frames = page.findAll(n => n.type === 'FRAME' && n.parent.type === 'SECTION' && /^\d+\.\d+\.\d+ /.test(n.name) && !n.name.endsWith('（完整內容）'));
const names = frames.map(f => f.name);
const report = {
  missing: EXPECTED.filter(n => !names.includes(n)),
  extra: names.filter(n => !EXPECTED.includes(n)),
  // Long pages grow taller than 852 on purpose; only width and a height below 852 are errors.
  wrongSize: frames.filter(f => f.width !== 393 || f.height < 852).map(f => `${f.name} ${f.width}x${f.height}`),
  longPages: frames.filter(f => f.height > 852).map(f => `${f.name} ${f.height}`),
  placeholderLeft: [], hardcodedColor: [], notAutoLayout: [], clipping: [],
};
const insideInstance = n => { for (let p = n.parent; p; p = p.parent) if (p.type === 'INSTANCE') return true; return false; };
for (const f of frames) {
  if (f.layoutMode !== 'VERTICAL') report.notAutoLayout.push(f.name);
  for (const n of [f, ...f.findAll(() => true)]) {
    if (insideInstance(n)) continue;
    if (n.type === 'TEXT' && n.characters.includes('尚未填入畫面')) report.placeholderLeft.push(f.name);
    for (const field of ['fills', 'strokes']) {
      const paints = n[field];
      if (Array.isArray(paints) && paints.some(p => p.type === 'SOLID' && p.visible !== false && !p.boundVariables?.color))
        report.hardcodedColor.push(`${f.name} > ${n.name} (${field})`);
    }
    if (n.type === 'FRAME' && n.clipsContent && n.name !== 'Content' && n.children.length)
      report.clipping.push(`${f.name} > ${n.name}`);
  }
}
return report;
*/

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
// A floating layer that must sit BELOW the floating BottomNavBar (e.g. the IncomePanel): after float(), call
// frame.insertChild(2, node) (insertChild(1, ...) leaves it on top) and check frame.children order.
function float(frame, node, { h = 'STRETCH', v = 'STRETCH' } = {}) {
  frame.insertChild(0, node);
  node.layoutPositioning = 'ABSOLUTE';
  node.constraints = { horizontal: h, vertical: v };
  return node;
}

// Copy every child (and the frame-level layout settings) of `src` into the placeholder Frame `dst`,
// keeping dst's id, name and position. Floating layers keep their constraints and position.
// Use it for "same base screen, different state" Frames (chat rooms, dialogs over a base).
// Bind the page background yourself afterwards if the frame fill is not Background/Page.
async function cloneInto(src, dst, bgKey = 'c2ad73f62adb2d8740ca6993cf4e7107ec7f8486') {
  for (const n of [...dst.children]) n.remove();
  for (const k of ['layoutMode', 'primaryAxisSizingMode', 'counterAxisSizingMode', 'itemSpacing', 'itemReverseZIndex',
    'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'clipsContent']) dst[k] = src[k];
  dst.resize(src.width, src.height);
  await bindFill(dst, bgKey);
  for (const c of src.children) {
    const k = c.clone(); dst.appendChild(k);
    if (c.layoutPositioning === 'ABSOLUTE') {
      k.layoutPositioning = 'ABSOLUTE'; k.constraints = c.constraints; k.x = c.x; k.y = c.y; k.resize(c.width, c.height);
    } else { k.layoutSizingHorizontal = c.layoutSizingHorizontal; k.layoutSizingVertical = c.layoutSizingVertical; }
  }
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


// STRUCTURE CHECK（結構檢查）: see structure-check.js, read at the end of each Section.

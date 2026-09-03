# tigermaster-one-piece

This repo is the product knowledge base for a home repair matching platform (修繕媒合平台). The goal is to progressively document product features, operational models, and decision records so that team members can use AI assistance to understand the product and support future development decisions.

## Product Background

- **Product**: Home repair matching platform — already live
- **Core roles**: 客戶 (customers with repair needs), 師傅 (repair technicians), 客服 (internal customer service)

## Documentation Conventions

- Folder and file names use **English** (to avoid path encoding issues)
- Document content is written in **Traditional Chinese (繁體中文)**
- Read `docs/INDEX.md` for the top-level routing. Four layers, each with its own INDEX:
  - `docs/wiki/INDEX.md` — product knowledge (features, flows, business rules, legal)
  - `docs/exploration/INDEX.md` — design exploration (feature plans, decision records, prototypes)
  - `docs/design-system/INDEX.md` — design system (tokens, components, patterns)
  - `docs/design-ops/INDEX.md` — how the design team itself operates (file maintenance, and other topics as real need arises)
- `README.md` duplicates the layer structure and skill table for GitHub display. Whenever `docs/INDEX.md`'s layer structure or the skill table changes (a layer added/removed, a skill's behavior changes), update `README.md` to match in the same change — it's easy to forget and silently drifts out of sync otherwise.

## Skill Workflow

Seven skills work together to build and evolve this knowledge base:

| Skill | Purpose |
|-------|---------|
| `/roger` | Guided interview to excavate and summarize product knowledge |
| `/nami` | Product knowledge tour guide — proactively leads users through the knowledge base, one topic at a time |
| `/luffy` | Guided design sessions to plan new features or optimize existing ones |
| `/sanji` | Design system component chef — extracts a structured component brief from any input (Figma URL, Flutter code, screenshot, or description) |
| `/robin` | Syncs a shipped feature's exploration docs into `docs/wiki/`, leaves a decision summary behind, and marks the feature 已完成 |
| `/write-doc` | Turns discussion content into a structured Markdown document (supports: 一般知識文件, 流程文件, 決策記錄, 功能規劃文件, 元件規格文件) |
| `/archive-doc` | Files documents in the right location and maintains `docs/INDEX.md` |

## How to Contribute

This repo is initially maintained by a UIUX designer taking a PM perspective to build out the knowledge base. It will be opened to the broader team over time.

Run `/roger` to document existing product knowledge, or `/luffy` to start a feature design session.

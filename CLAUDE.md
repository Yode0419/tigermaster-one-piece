# tigermaster-one-piece

This repo is the product knowledge base for a home repair matching platform (修繕媒合平台). The goal is to progressively document product features, operational models, and decision records so that team members can use AI assistance to understand the product and support future development decisions.

## Product Background

- **Product**: Home repair matching platform — already live
- **Core roles**: 客戶 (customers with repair needs), 師傅 (repair technicians), 客服 (internal customer service)

## Documentation Conventions

- Folder and file names use **English** (to avoid path encoding issues)
- Document content is written in **Traditional Chinese (繁體中文)**
- Read `docs/INDEX.md` for a navigable overview of all knowledge documents

## Skill Workflow

Three skills work together to build this knowledge base:

| Skill | Purpose |
|-------|---------|
| `/roger` | Guided interview to excavate and summarize product knowledge |
| `/write-doc` | Turns discussion content into a structured Markdown document |
| `/archive-doc` | Files documents in the right location and maintains `docs/INDEX.md` |

## How to Contribute

This repo is initially maintained by a UIUX designer taking a PM perspective to build out the knowledge base. It will be opened to the broader team over time.

Run `/roger` to start a guided knowledge-building session.

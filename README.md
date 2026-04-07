# tigermaster-one-piece

修繕媒合平台的產品知識庫。

將產品功能、營運模式、決策脈絡整理為結構化文件，供團隊透過 AI 輔助理解產品全貌與支援開發決策。

## 開始使用

在此專案目錄下開啟 Claude Code，使用以下指令建立知識內容：

| 指令 | 用途 |
|------|------|
| `/roger` | 引導式訪談，挖掘並摘要產品知識 |
| `/luffy` | 引導式設計討論，規劃新功能或優化既有功能 |
| `/write-doc` | 將討論內容整理成結構化的 Markdown 文件 |
| `/archive-doc` | 將文件歸檔到適當位置，維護 `docs/INDEX.md` |

### 使用流程

**記錄產品知識**：`/roger` → `/write-doc` → `/archive-doc`

**規劃功能設計**：`/luffy` → `/write-doc` → `/archive-doc`

想到要寫的主題，記錄在根目錄的 `BACKLOG.md`。文件中的待釐清事項（TBD）使用 `- [ ]` checkbox 格式，搭配 VSCode [Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree) 插件可快速瀏覽全專案的待辦項目。

（以航海王為命名主軸：`/roger` 建立了大秘寶，`/luffy` 則在偉大的航道上探索它。專案名稱 tigermaster-one-piece 亦源於此。）

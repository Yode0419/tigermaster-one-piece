# Figma 操作注意事項（少見情況）

常用動作（匯入、綁 token、設屬性、改文字、換圖示、建三區 Frame、結構檢查）已寫成 `../scripts/snippets.js`，照片段用就不會踩到。這裡只記片段沒涵蓋、遇到才需要看的情況。

---

## 匯入與元件版本

- DS 檔案裡看得到、但還沒發布的元件，匯入時會出現「not found」。先跑片段的「試匯入」確認每個 Key 都能匯入，再組畫面；失敗就請使用者發布 DS 元件庫，不要自己複製一份。
- DS 元件發布新版後，目標檔案裡既有的 instance 不一定會馬上更新。用到新版的屬性或結構時，先檢查 instance 是否已是新版，沒有就重新匯入新版重建。
- 查 DS 元件：`search_design_system` 一次只能查一筆；要看很多元件時，用 `use_figma` 在 DS 檔案逐頁列出元件、屬性與 key 比較快。
- 不熟的元件先在目標檔案暫時建立 instance，讀出圖層結構與屬性名稱，看完刪除。

## Instance 操作

- 複製來的 instance 如果有文字覆寫，不要用 `setProperties` 切換 variant（覆寫文字的寬度不會重算、超出外框）。刪掉後直接建立目標 variant 的新 instance，再重新覆寫。
- Instance 內部的子圖層不能刪掉再插入新的（`Cannot move node … inside of an instance`）。要換成別的元件或 variant，用 `swapComponent`。
- 找 instance 裡被隱藏的圖層前，先設 `figma.skipInvisibleInstanceChildren = false`（片段的 `find()` 已處理）。
- Slot（例如 BottomSheet、Card、Dialog 的 `Content`）放內容前先刪掉 `Slot Rectangle`。

- DS `Card` 的 Slot 預設裁切內容。需要凸出 Slot 的元素（例如疊在按鈕右上角、凸出 6px 的未讀標記），把那個 instance 的 Slot `clipsContent` 設為 `false`（可以直接覆寫）。
- 在 instance 的 Slot 裡新增的絕對定位子圖層（例如 AppBar 動作區的 Badge）可以刪除；但 instance 內建的絕對定位圖層（`Bubble Background`、`Dynamic Island`）不能刪（`Removing this node is not allowed`），用名稱篩選再刪。
- 失敗的 `use_figma` 呼叫不會留下半成品，同一段程式可以直接修正後重跑。
- 複製畫面部件到另一個 Page（同一個檔案內）：在來源 Page 對節點 `clone()`，切到目標 Page 後 `appendChild` 即可（會搬過去，來源 Page 不留複本）。複本裡指向本機元件的 instance，要先把主元件 `clone()` 進目標 Page 的「本機元件」Section，再對 instance `swapComponent`。
- 改 instance 尺寸：`resize()` 可用（例如 `PhotoUpload` 預設 80×80，縮到 78.75 填滿一列），內部的圖片會跟著，圖示維持原尺寸。

## 本機元件

- 本機元件放在該 Page 右側的「本機元件」Section。
- 本機元件的布林屬性只能控制自己的直接圖層，不能控制子元件 instance 內部的圖層（`Cannot set component property references on instance sublayer`）。要切換子元件的開關，把該子元件設為外露（`isExposedInstance = true`）。
- 文字屬性用 `componentPropertyReferences` 連到文字圖層；instance 裡要換的子元件（例如 Avatar）設為外露，或用 `swapComponent`。
- 把畫好的 Frame 內容做成本機元件後，原本那一格改成它的 instance，外觀要不變。

## 版面

- 把既有 Frame 改成 Auto Layout 時，先建立 `Content` 並調整圖層順序，再設 `layoutMode`；最後確認 Frame 的 x、y 沒有跑掉（片段的 `threeZone()` 已處理）。
- 絕對定位的座標不能綁變數，照程式的預設邊距寫數值，並在批次紀錄註明。
- 單行截斷：`textTruncation = 'ENDING'` 加 `maxLines = 1`，寬度設 Fill。

- 漸層填色的色標也能綁變數：`gradientStops` 每一項加 `boundVariables: { color: figma.variables.createVariableAlias(variable) }`（`color` 仍要給解析後的色值）。
- 重建 Frame 後背景綁定 `Background/Page` 卻顯示黑色（備援色未解析）時，把一個正常 Frame 的 `fills` 深拷貝過來。原因未查明。

- `float()` 把節點插到最前面；要放在第二層（導覽列之下）時再 `frame.insertChild(2, node)`，`insertChild(1, …)` 對已在第 0 層的節點不會生效，事後一定檢查 `frame.children.map(c => c.name)`。
- 用 `toLocaleString` 格式化金額在 Plugin 環境不會加千分位，要手動加逗號或直接寫字串。
- `getMainComponentAsync` 之外，巢狀 instance 的 `parent.children.indexOf(node)` 可能回 -1（物件參照不同），改用 `findIndex(c => c.id === node.id)`。
- DS `Tooltip` 展開與圖層順序做法見 `screen-types.md` 「資訊提示」。

## 照片

- `use_figma` 不支援 `createImageAsync`，無法放入新照片，只能用 DS Image 元件內建的佔位照片。需要符合情境的照片時，在回報中請使用者手動換圖。

## 呼叫與元件操作

- 失敗的 `use_figma` 呼叫**不保證**整段回復：批次 13c 看起來有回復，但批次 16 的一次失敗（程式在最後一行才報錯）留下了已建好的本機元件與新 Frame，重跑就產生重複。報錯後先檢查有沒有半成品，重跑的腳本開頭先刪掉同名的 Frame 與元件（批次 16）；順移編號這類不能重複執行的操作要先確認上一次有沒有成功。
- 對 Card instance 改 variant 屬性（例如 `Padding: 'None'` 改 `'Standard'`）會重建內部的 Slot，改完要重新 `findOne` 取得 Slot，舊的 Slot 參照會報「node does not exist」（13c）。
- 複製整個 Frame（`clone()`）到同一個 Section 後，用 `section.insertChild(0, frame)` 可以放到第一個位置；Section 不會自動撐大，順移 Frame 後要用 `resizeWithoutConstraints` 調寬（13c）。
- 隱藏元件內不需要的部分（例如表單裡的「刪除」鈕、列尾的箭頭圖示）可以直接把 instance 內該圖層設 `visible = false`，不必拆開 instance（13c）。
- 實例內的子層不能改座標（報錯 `relative-transform`），只能改尺寸、可見度與屬性；例如 BottomSheet 標題列右側 48×48 的框，換進比它寬的按鈕只能把按鈕高度設 48 讓文字垂直置中，要根治得改 DS（批次 16）。只有實例的 Slot 內可以新增或刪除子層。
- 在實例內的節點上用 `parent === node` 比較可能失敗（`findOne` 的條件拿不到預期的節點），改比 `id` 或名稱；先 `clone()` 到一般位置再整理結構最穩（批次 16）。
- `figma.createComponentFromNode()` 不能用在實例內的節點：把節點 `clone()` 到本機元件 Section 再轉成元件，然後用該元件的 instance 換回原處（批次 16，日期選擇面板）。
- 元件加文字屬性：`comp.addComponentProperty('Month', 'TEXT', '預設文字')` 取得 key，再 `textNode.componentPropertyReferences = { characters: key }`（批次 16）。
- Pattern 填色（DS 的 `ChatBackground` Watermark）靠另一個來源節點，經函式庫引用後 API 截圖畫不出來，DS 已改成不依賴來源節點的做法（批次 16，使用者自行修正）；新增 DS 元件時避免用 Pattern 填色。

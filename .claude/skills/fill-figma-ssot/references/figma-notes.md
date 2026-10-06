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

## 本機元件

- 本機元件放在該 Page 右側的「本機元件」Section。
- 本機元件的布林屬性只能控制自己的直接圖層，不能控制子元件 instance 內部的圖層（`Cannot set component property references on instance sublayer`）。要切換子元件的開關，把該子元件設為外露（`isExposedInstance = true`）。
- 文字屬性用 `componentPropertyReferences` 連到文字圖層；instance 裡要換的子元件（例如 Avatar）設為外露，或用 `swapComponent`。
- 把畫好的 Frame 內容做成本機元件後，原本那一格改成它的 instance，外觀要不變。

## 版面

- 把既有 Frame 改成 Auto Layout 時，先建立 `Content` 並調整圖層順序，再設 `layoutMode`；最後確認 Frame 的 x、y 沒有跑掉（片段的 `threeZone()` 已處理）。
- 絕對定位的座標不能綁變數，照程式的預設邊距寫數值，並在批次紀錄註明。
- 單行截斷：`textTruncation = 'ENDING'` 加 `maxLines = 1`，寬度設 Fill。

## 照片

- `use_figma` 不支援 `createImageAsync`，無法放入新照片，只能用 DS Image 元件內建的佔位照片。需要符合情境的照片時，在回報中請使用者手動換圖。

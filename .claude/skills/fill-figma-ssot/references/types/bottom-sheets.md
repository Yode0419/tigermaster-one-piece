# 畫面類型：BottomSheet

動作選單與選項清單、長內容 BottomSheet、底部兩顆按鈕的選擇器、相機與簽名、日期時間選擇。

元件 Key 見 `docs/exploration/in-progress/figma-ssot/stage3/reference.md`，三區結構、卡片、Dialog、圖示等通則見 `../screen-types.md`。

---

## 動作選單（程式的 CupertinoActionSheet）

第一個案例：管理員 1.2.3。

- BottomSheet：hasHeader=false、Footer=Inline、開啟 hasDragHandle。內容短的 BottomSheet 一律用 Inline，不要用 Sticky 再手動固定高度。
- 選項：ListItem（Trailing=None、關閉前方圖示、最後一列關閉分隔線），直接放進 `Content` Slot、寬度 Fill；Slot 間距改為 0。
- 「取消」用按鈕區的 Button，Style 改為 Ghost Neutral，接在選項下方，不做成選項之一。
- 有標題的選項清單：hasHeader=true，關閉左右圖示。
- 遮罩：`scrim()`。
- **長內容、需要捲動的 BottomSheet**（使用者決定）：原本那一格畫第一屏，也就是使用者打開時看到的畫面（Frame 852，BottomSheet 用元件的最大高度，內容超出的部分裁切）；再在它**右邊旁邊加一格完整的長畫面**，採用 BottomSheet 外殼，內容完整顯示：Frame 拉長，底圖與遮罩照第一格，BottomSheet 往上長到內容完整、貼在底部。額外這一格命名為「<原本編號> <原本名稱>（完整內容）」，不編新號碼、不算在結構表的 Frame 數，結構檢查要略過名稱以「（完整內容）」結尾的 Frame。批次紀錄用一句話說明哪一格有加。**兩格的內容框設定不同**（師傅 4.5.1）：第一屏（852）要把 BottomSheet 內建的 `Content` 框與內層 Slot 都設 Fill 高度並開裁切，內建 HomeIndicator 才會貼在 Sheet 底部（不設的話 `Content` 框會跟著內容撐到數千高，把 HomeIndicator 擠到 Sheet 外面）；「（完整內容）」那格相反，`Content` 框與 Slot 設 Hug、關裁切，Sheet 高度＝標題列＋`Content` 框＋HomeIndicator（先把 Sheet 暫設很高再量），Frame 高度再加 85（露出底圖頂部），Scrim 與導覽列跟著調整，所在 Section 也要拉高、下方 Section 往下移。內容裡的插圖若使用者已做成本機元件，直接用元件 instance，寬度 Fill。
- **只有一個動作的確認**（例如「重送訊息？」＋確認／取消）不是選項清單，改用 Dialog（見通則 `../screen-types.md`）。
- **沒有標題、沒有取消的選項清單**（師傅 2.2.3 選擇導航 App）：hasHeader=false、Footer=Inline、關閉 hasFooter、開 hasDragHandle，選項用 ListItem。選項的圖示若沒有素材（例如地圖 App 的 logo），使用者決定先不放：關閉 ListItem 的 Has Leading Icon，不留 Smiley 佔位。

## 底部兩顆按鈕的選擇器 BottomSheet

第一個案例：師傅 2.4.5（程式 `UnitPickerBottomSheet`）。

- BottomSheet 有標題與右上 X，高度照程式比例（90% 約 767）；內容用 Slot：分類名稱加一排 DS `Chip`（Tone=info，選中 Selected），列本身自排。
- 底部「取消」「確認」兩顆並排：把 BottomSheet 內建的 Sticky Footer 換成 Flexible Slot 變體，Slot 放兩顆 Button（取消 Secondary Outlined lg、確認 Primary Filled lg，間距 `Spacing/16`），DS 待辦 10 處理前的做法。
- 同一格有多個狀態（例如選「台」與選「式」）時畫資訊較多的那個，不另開 Frame；選「式」的提醒用 DS `Banner`（Tone=Notice、Leading=Icon、Closable 關，圖示換 Phosphor Warning），放在內容下方、左右 `Spacing/16`。
- 只有標題與選項、沒有底部按鈕、點選項即選定的選項清單（師傅 2.4.3）：BottomSheet Footer=Inline，右上 X，內容放 ListItem，做法同動作選單的「有標題的選項清單」。

## 相機與簽名 BottomSheet

第一個案例：師傅 2.7.3（掃 QR 碼）、2.7.7（簽名板）。

- BottomSheet（hasHeader、右上 X、Footer=Inline、不放底部按鈕），高度照程式 `RoundedBottomSheet` 的 90%（767），貼底；內層 `Content` 與 Slot 內的內容框都設 Fill 高度，內建 HomeIndicator 才會貼在底部。從 2.4.3 的 BottomSheet 複製最快。
- 相機預覽沒有素材：393×393 `Base/Black` 黑色方塊，圖層名稱「相機預覽（系統畫面，待補）」，不加程式沒有的掃描框（使用者確認）。標題到預覽空 `Spacing/48`，下方藍字 `Body/S`＋`Text/Link`。
- 簽名區：虛線框（1px 虛線 4／4，`Text/Primary` 綁定）填滿剩餘高度，外層左右 24、上下 10；「清除」Button Secondary Outlined sm pill 靠左；送出鍵 Primary Filled lg，未簽名時 State=disabled 文字「請於上方虛線框中簽名」。簽完名的畫面（確認 Dialog 的底圖）放一條示意筆跡 Vector（`Text/Primary` 綁定 3px 圓端），圖層名稱註明「示意」，送出鍵換「送出簽名」。

## 日期時間選擇 BottomSheet

第一個案例：師傅 5.1.7（程式 `DateSelectBottomSheet`，`CalendarDatePicker` 加 `CupertinoDatePicker`）。

- DS 沒有日曆與時間滾輪，做成本機元件 `DatePickerPanel`（TEXT 屬性 Month），放進 BottomSheet 的 `Content` Slot，寬度 Fill；日後升級進 DS（DS 待辦 11）。BottomSheet 高度照程式 `RoundedBottomSheet` 比例（70% ＝ 596），`Content` 框與 Slot 設 Fill 高度並裁切。
- 面板內結構：`Calendar`（月份標題列高 52：月份文字加下拉箭頭，右側上下月箭頭，可選範圍以外的箭頭用 `Icon/Subtle`；星期列與日期列都高 42，七欄等寬；日期 `Title/M`，今天以前停用用 `Text/Hint`，今天選取是 1px `Interactive/Action` 圓框加同色字）；日曆與時間列之間 `Spacing/16`；`Time Row`（高 70，「時間」`Heading/4`＋三欄滾輪）。
- 時間滾輪：欄位順序**時、分、上下午（上下午在最右，使用者指定）**；每欄三項（上、選取、下），選取條 `Border/Default`＋`Radius/8`，外層裁切 70 高。
- 標題列右側「完成」是文字按鈕：把 BottomSheet 標題列的 IconButton `swapComponent` 成 Button Ghost Action sm，再把該 instance 高度設 48 讓文字與標題垂直置中（實例內不能改座標；DS 待辦 12）。左側關閉 `leadingIcon`。
- 底圖沿用打開前那一格（從展開的輸入列打開，複製 5.1.2）。

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
- **長內容、需要捲動的 BottomSheet**（使用者決定）：原本那一格畫第一屏，也就是使用者打開時看到的畫面（Frame 852，BottomSheet 用元件的最大高度，內容超出的部分裁切）；再在它**右邊旁邊加一格完整的長畫面**，採用 BottomSheet 外殼，內容完整顯示：Frame 拉長，底圖與遮罩照第一格，BottomSheet 往上長到內容完整、貼在底部。額外這一格命名為「<原本編號> <原本名稱>（完整內容）」，不編新號碼、不算在結構表的 Frame 數，結構檢查要略過名稱以「（完整內容）」結尾的 Frame。批次紀錄用一句話說明哪一格有加。**兩格的內容框設定不同**（師傅 4.5.1）：BottomSheet 只有 Footer=Sticky 是固定高度，Inline、None 隨內容。沒有按鈕列時，第一屏把 Slot 裡的內容框設固定高度（讓 Sheet 剛好到程式的比例高度）並開裁切；「（完整內容）」那格內容框設 Hug、關裁切，內容完整撐開，Frame 高度再加 85（露出底圖頂部），Scrim 與導覽列跟著調整，所在 Section 也要拉高、下方 Section 往下移。內容裡的插圖若使用者已做成本機元件，直接用元件 instance，寬度 Fill。
- **只有一個動作的確認**（例如「重送訊息？」＋確認／取消）不是選項清單，改用 Dialog（見通則 `../screen-types.md`）。
- **沒有標題、沒有取消的選項清單**（師傅 2.2.3 選擇導航 App）：hasHeader=false、Footer=None、開 hasDragHandle，選項用 ListItem。選項的圖示若沒有素材（例如地圖 App 的 logo），使用者決定先不放：關閉 ListItem 的 Has Leading Icon，不留 Smiley 佔位。

## 底部兩顆按鈕的選擇器 BottomSheet

第一個案例：師傅 2.4.5（程式 `UnitPickerBottomSheet`）。

- BottomSheet 有標題與右上 X，高度照程式比例（90% 約 767）；內容用 Slot：分類名稱加一排 DS `Chip`（Tone=info，選中 Selected），列本身自排。
- 底部「取消」「確認」兩顆並排：把 BottomSheet 內建的 Sticky Footer 切成 `Buttons=Pair`（左「取消」、右「確認」，改兩顆的 Label）。
- 同一格有多個狀態（例如選「台」與選「式」）時畫資訊較多的那個，不另開 Frame；選「式」的提醒用 DS `Banner`（Tone=Notice、Leading=Icon、Closable 關，圖示換 Phosphor Warning），放在內容下方、左右 `Spacing/16`。
- 單選清單加底部「取消」「確認」（程式 `PickerBottomSheet` 的滾輪，客戶端 1.5.2，使用者決定不畫滾輪）：BottomSheet hasHeader=false、開 hasDragHandle、高 596；Slot 內垂直放 ListItem（Trailing=None、關 Has Leading Icon、開 Has Divider），超出的選項被裁切表示可捲動；底部 Sticky Footer 切成 `Buttons=Pair`（「取消」「確認」）。
- 只有標題與選項、沒有底部按鈕、點選項即選定的選項清單（師傅 2.4.3）：BottomSheet Footer=Inline，右上 X，內容放 ListItem，做法同動作選單的「有標題的選項清單」。

## 相機與簽名 BottomSheet

第一個案例：師傅 2.7.3（掃 QR 碼）、2.7.7（簽名板）。

- BottomSheet（hasHeader、右上 X、Footer=None），貼底；Footer=None 隨內容，所以把 Slot 內的內容框設固定高度，讓 Sheet 剛好是程式 `RoundedBottomSheet` 的 90%（767）。從 2.4.3 的 BottomSheet 複製最快。
- 相機預覽沒有素材：393×393 `Base/Black` 黑色方塊，圖層名稱「相機預覽（系統畫面，待補）」，不加程式沒有的掃描框（使用者確認）。標題到預覽空 `Spacing/48`，下方藍字 `Body/S`＋`Text/Link`。
- 簽名區：虛線框（1px 虛線 4／4，`Text/Primary` 綁定）填滿剩餘高度，外層左右 24、上下 10；「清除」Button Secondary Outlined sm pill 靠左；送出鍵 Primary Filled lg，未簽名時 State=disabled 文字「請於上方虛線框中簽名」。簽完名的畫面（確認 Dialog 的底圖）放一條示意筆跡 Vector（`Text/Primary` 綁定 3px 圓端），圖層名稱註明「示意」，送出鍵換「送出簽名」。

## 日期時間選擇 BottomSheet

用在：師傅 5.1.7、客戶端 2.5.3、6.1.3（程式 `DateSelectBottomSheet`，`CalendarDatePicker` 加 `CupertinoDatePicker`）。

- 用 DS `Calendar` 與 `WheelPicker`（DS 升級 2），依序放進 BottomSheet 的 `Content` Slot，寬度 Fill，Slot 間距 32。BottomSheet：hasHeader、Footer=None、關 leadingIcon；高度隨內容（5 週的月份約 536，程式的 70% ＝ 596，差距接受），不另外設定。
- `Calendar`：改 Month；日期格逐格改 `_CalendarDay` 的 Day 與 State，空格清空 Day，月份跨 6 週開 Show Week 6。可選範圍（現在加 2 小時起到 30 天後）以外用 State=Disabled；打開時預設選今天（State=Selected、Today=true）。
- `WheelPicker`：Label「時間」；欄位順序**時、分、上午／下午（上下午在最右，使用者指定）**，分鐘間隔 30。
- 標題列右側「完成」：把 BottomSheet 的 `Trailing` 換成 Button Ghost Action sm，在該 instance 上改 Label。
- 底圖沿用打開前那一格（從展開的輸入列打開，複製 5.1.2）。

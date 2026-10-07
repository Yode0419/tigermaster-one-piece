# 畫面類型：訂單與表單

訂單詳情頁、唯讀資料頁、報價總覽頁、表單編輯頁、上傳照片表單、證照上傳頁。

元件 Key 見 `docs/exploration/in-progress/figma-ssot/stage3/reference.md`，三區結構、卡片、Dialog、圖示等通則見 `../screen-types.md`。

---

## 訂單詳情頁（AppBar 疊一張資訊卡）

第一個案例：師傅 2.2.1、2.3.1（程式 `MasterOrderDetail`＋`StackSliverAppBar`）。

- AppBar（Standard／Overlay／Brand），開啟 Has Leading；有動作鍵時開 Has Action，放 `IconLabelButton`（例如「聯繫客服」，圖示 Phosphor）。資訊卡用 DS `Card`（Inset／Standard）放進 `Extension Content`，寬度 Fill，並刪掉殘留的 `Slot Rectangle`。
- `Scroll Content` 上方 padding ＝ 卡片高 − 延伸列高（32）＋ 8 到 16，讓下方內容接在卡片之後。卡片下方的階段內容（報價、施工、驗收…）屬各自的 Section，這一格只畫共用資訊區時下方留灰底。
- 標題用程式 `titleParser` 對該訂單狀態的輸出。
- 未讀標記用 DS `Badge`（Count），絕對定位疊在目標右上角；要凸出 Card 的 Slot 時，把那個 instance 的 Slot `clipsContent` 關掉。該訂單沒有未讀就不放。
- 同一訂單的不同 Frame（2.2.1、2.3.1）頂部從已畫好的那格 `clone()` 再改字，不重建。資訊卡內容用本機元件 `OrderBasicInfo`（改 Category、Date、Customer Name、Address、Has Unread，巢狀按鈕的 Label 與未讀數字在巢狀 instance 上改）。
- **訂單階段內容**（卡片下方，依訂單狀態映射，師傅端 `master_order_detail_bloc.dart`）：金額與工期摘要（`OrderQuoteTimeSummary`，放 Card Fill／Standard）加該階段的內容：等待提交報價（狀態 30、35，2.4.1）是「請點選下方按鍵以進行報價」加 Button Secondary Filled md pill「開始報價」；等待客戶確認（40、45、50，2.5.1）是 ListItem「查看報價資訊」加等待說明加「先看其他案件」；施工中（55、58，2.6.1）是「查看報價資訊」、「新增一筆報價」pill、完工提醒文字、Button Primary Filled lg「上傳施工照片並驗收」；有未同意報價時兩顆按鈕改 State=disabled，文字「有未同意報價」（2.6.2）。按下「上傳施工照片並驗收」後同一個區塊換成上傳表單（2.6.3）；照片送出後狀態變 58，再進上傳表單會多一顆 Primary Filled lg「開始驗收」，送出鍵文字變「繼續上傳施工照片」並停用、照片格只剩「＋」（2.6.4）。驗收中（狀態 60，2.7.1）是金額與工期摘要＋「查看報價資訊」列＋提示文字（`Label/L`＋`Text/Brand`、`Body/XS`＋`Text/Hint`，置中）＋Button Secondary Filled md pill「完成驗收」（客戶還沒選驗收方式時停用，實機確認）＋代理人說明文字。
- **同一入口依客戶選項走不同流程**（例如驗收方式 QR、簽名、直接）時，每個流程各自成 Frame，包括進入時自動跳出、只差文字的提示 Dialog（使用者決定，師傅 2.7.2、2.7.6、2.7.9）。與「同一畫面多個狀態不拆 Frame」的差別：後者是同一版型的內容變體，前者是不同的後續畫面與去向。
- **狀態映射的漏格核對已移到 SKILL.md「開工檢查」**：對照程式的狀態映射（bloc 的 `checkOrderStatus`）列出每個階段會看到的畫面，再核對結構表有沒有漏格（13c 因為這樣查出漏了 2.4.1 上傳報價單與 2.6.1 施工進行中）；漏了就停下來回報使用者，由使用者決定編號。

## 唯讀資料頁（價格與保固、客戶資訊、問題描述）

第一個案例：師傅 2.2.2（結構與 1.2.1 相同）。

- 頂部 AppBar（Standard／Overlay／Brand）加 `OrderCategoryCard`；`Scroll Content` 上方 padding 48、左右 `Spacing/16`、區段間距 `Spacing/16`；每個區段是「`Title/M` 標題＋DS Card」。
- 直接從已畫好的同類畫面（例如 1.2.1）`clone()` 頂部與各區段，只改字。跨 Page 複製：在來源 Page 複製、切到目標 Page 後 `appendChild`；本機元件的 instance 要先把主元件複製進目標 Page 的「本機元件」再 `swapComponent`。
- 以內容為主，是長頁面，高度見三區結構。

## 報價總覽頁（頂部分頁＋多張分類卡＋底部金額列）

第一個案例：師傅 2.4.2、2.4.7（程式 `StandardQuotationOverviewSection`、`SimpleQuotationOverviewSection`）。

- 頂部 AppBar（Standard／Slot／Brand）加 `SegmentedControl`，做法同 `pages.md` 的分頁列表頁；浮層畫面的底圖沿用打開前那一格。
- 每個分類是一張 DS `Card`（Inset／None）放本機元件 `QuotationCategoryRow`（標題＋小字說明＋小計＋箭頭或加號），列高 64（上下 8＋右側點擊區 48，程式用 Material 2 的 `IconButton`，最小 48）。展開的分類在列下方加 1px 分隔線與 Button Secondary Outlined md pill（例如「新增一筆工種工程」）。不要改用 `ListItem`：ListItem 只有單行標題，放不下小字說明。
- 底部用 DS `Sticky Footer`（Button + Slot），Slot 放本機元件 `QuotationAmountBar`（兩個 DS `Tag` 加提示文字），送出鍵 Button Primary Filled lg。
- 以內容為主，長頁面高度見三區結構。

## 表單編輯頁（卡片內多個欄位，確認後返回）

第一個案例：師傅 2.4.4、2.4.8、2.4.9（程式 `StandardFeeEditSection`、`SimpleFeeEditSection`、`OtherFeeEditSection`）。

- 每筆資料是一張 DS `Card`（Inset／Standard），Slot 放表單內容的本機元件（例如 `StandardFeeItemForm` 的展開、收合 variant，`OtherFeeItemForm`），欄位用 DS `TextField`。
- **TextField 沒有說明文字、字數、錯誤訊息時，把 `Show Helper Row` 關掉**，整列才會移除；不關的話每個欄位下方多一列空白，長頁面高度也會算錯。
- 驗證錯誤（空欄位在按「確認」後一次顯示紅字）不另畫一格，記在批次紀錄；要表示時用 TextField 的 State=Error，唯讀欄位出錯時也改 Error。
- 「確認」鍵在捲動內容最下方（Button Primary Filled lg、寬度 Fill），沒有固定底部列時底部放 HomeIndicator。長頁面。

## 上傳照片表單

第一個案例：師傅 2.3.1（程式 `MasterOrderUploadImageSection`、`GridImageView`）。

- 區段標題 `Heading/4`、提示文字 `Body/M`＋`Text/Hint`、DS Card 放照片格，格子用 DS `PhotoUpload`（已上傳 State=uploaded，新增格 State=default）。
- 程式固定 4 欄、格子填滿一列：一列 4 格，間距固定 `Spacing/4`，每格縮小到 (一列寬 − 3×4)／4 填滿（約 78.75），不要用兩端對齊撐滿（間距會被拉得很大）。超過 4 格換行，最多 10 張。
- 送出鍵 Button Primary Filled lg、寬度 Fill；沒有選照片時程式是半透明的 `DISABLE_STYLE`，兩種輸入狀態合併一格時畫已選照片的狀態。處理中文字不另建格。

## 證照／大張照片上傳頁

第一個案例：師傅 4.3.1（程式 `AccountImageUpload`）。

- 整寬白底帶用 Card Layout=Fill／Standard（見通則的「卡片與資料列」）；照片格用 DS `PhotoUpload` Type=Certificate（16:9，已選 State=uploaded 帶刪除圖示、新增格 State=default），寬度 Fill 後高度手動設為寬的 9/16。畫已選兩張加新增格的狀態；上傳中不另畫。
- 底部 `Sticky Footer`（Button only）「上傳證照」。程式為了避開底部按鈕留的大空白（110）不照抄，Scroll Content 底部用 `Spacing/16`。以內容為主，長頁面。

# BottomSheet

模態式（Modal）從螢幕底部滑出的容器，會變暗背景並阻擋頁面其餘互動，用於選項清單選擇、需說明文字的多個動作、表單填寫、說明性內容等中量任務。

> **元件邊界**：與 Dialog（置中疊加、需要立即決策的阻斷式對話框）及 Sticky Footer（非模態、置底常駐、不變暗背景的操作列，可獨立使用或嵌入 BottomSheet 內搭配）明確區分，詳見下方使用規則。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，`RoundedBottomSheet`（`lib/component/bottom_sheet/rounded_bottom_sheet.dart`）、`BottomSheetHeader`（`lib/component/bottom_sheet/bottom_sheet_header.dart`）為代表案例，掃描 20 個 `RoundedBottomSheet` 呼叫點確認 Header 使用率；Figma Component 已建立_
_最後更新：2026-10-08（標題列兩側改為 64 寬、新增 Trailing 可換文字按鈕；Footer 新增 None、移除 hasFooter）_

---

## Variants

| 維度 | 值 |
|------|-----|
| hasHeader | `有` / `無`（Figma Variant）。有：leading/tailing 用 [IconButton](icon-button.md)（`ghost/sm/default`）instance，各自 boolean 開關，Title 固定顯示。右側另有 `Trailing`（Instance swap），可換成 [Button](button.md) `Ghost Action sm` 放文字按鈕（例如「完成」）。無：Header 節點整個移除，Content 直接從頂部圓角下方開始，供 ListItem（後續新建）組 Action Sheet 使用 |
| Content | 彈性 slot（列表／表單／說明文字皆可） |
| Footer | `Sticky` / `Inline` / `None`（Figma Variant，預設 Sticky）。Sticky：底部按鈕區（[Sticky Footer](sticky-footer.md) instance）絕對定位貼底、帶 `Elevation/Rise` 陰影，蓋在可捲動的內容上，用於長內容。Inline：按鈕區排在內容後面、無陰影，Sheet 高度隨內容，用於短內容（例如 Action Sheet）。None：沒有按鈕區，只有 Home Indicator（例如日期選擇，「完成」在標題列）。Sticky 與 Inline 只差排列方式 |
| hasDragHandle | `有` / `無`（Figma Boolean property，預設無）。頂部拖曳把手，參考 M3 Modal Bottom Sheet |

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 圓角 | `Radius/16`（僅上緣） | ⚠️ 現況硬編碼 12px，屬既有技術債，待整併 |
| 陰影 | `Elevation/Ambient` | 比照 Dialog |
| 卡片背景 | `Background/Surface` | |
| 背景遮罩 | `Background/Overlay` | 既有 token，本就用於 Modal／Dialog 遮罩，不新增 |
| Header padding | `Spacing/12`（四邊統一） | 左右因 IconButton 熱區已比圖示本身大，不需額外留白 |
| Header 兩側欄 | 各寬 64、高 48，Auto Layout，左欄靠左、右欄靠右對齊 | 兩側固定等寬，Title 才能維持置中；64 接近程式 1:3:1 分欄的側欄寬（約 68），放得下兩個字的文字按鈕 |
| Content padding | `hasHeader=有`：僅底部 `Spacing/24`（頂部貼齊 Header，無額外留白）；`hasHeader=無`：上下皆 `Spacing/24`。`Footer=Inline` 時底部改為 `Spacing/8`（按鈕區本身上方已有 `Spacing/16`）；`Footer=None` 維持 `Spacing/24` | 無 Header 時內容不可直接貼死圓角邊緣 |
| 高度 | 只有 `Footer=Sticky` 是固定高度：`Content` 填滿並裁切，內容可捲動，按鈕列貼底。`Inline`、`None` 一律隨內容（Sheet、`Content`、Slot 都是 Hug）；程式是固定比例高度但沒有按鈕列時，讓 Slot 裡的內容自己設成需要的高度 | 程式 `RoundedBottomSheet` 用螢幕比例（預設 90%，另有 70%、40%） |
| 拖曳把手 | 32×4，圓角 `Radius/Full`，填色 `Border/Default`；把手區上方 `Spacing/16`、下方 `Spacing/4` | |
| Home Indicator | 永遠顯示。`Sticky`、`Inline`：用 Sticky Footer 內建的那條；`None`：BottomSheet 自己放在最底部 | 不在 BottomSheet 裡隱藏 Sticky Footer 的 Home Indicator |

## 使用規則

**用於：**
- 可挑選清單、需說明文字的多個動作選項
- 表單填寫
- 說明性、中量內容的暫時性任務
- 需要暫時中斷主畫面互動的情境

**避免：**
- 單句是非題／簡短通知，需使用者立即決策才能繼續 → 改用 [Dialog](dialog.md)
- 非阻斷、置底常駐的操作列（不變暗背景）→ 改用 Sticky Footer
- 非阻斷、非時效性的次要提示（如操作成功通知）→ 用 Snackbar
- 若內容需要底部固定操作列（按鈕），嵌入 Sticky Footer 元件搭配使用（combo 用法）
- Action Sheet（無標題純選項清單）不另建元件，`hasHeader=無`、`Footer=Inline`、開啟拖曳把手，Content 直接放 [ListItem](list-item.md)（寬度填滿，元件自帶左右留白），「取消」用按鈕區的 Button（`Ghost Neutral`）
- 內容長、需要捲動且有按鈕列時用 `Footer=Sticky`（固定高度）；其餘用 `Inline` 或 `None`（隨內容）
- 底部要「取消」「確認」兩顆按鈕時，把內層 Sticky Footer 切成 `Buttons=Pair`
- 日期時間選擇放 [DatePicker](date-picker.md) 的 Calendar 與 WheelPicker

## 邊界情況

- **內容過長（超過螢幕 90% 高度）** → 限制 max-height 並允許內部捲動；Figma 端僅加 max-height 約束，不特別強調視覺樣式（比照 Dialog）
- **點擊遮罩是否可關閉** → 不定義，交由使用場景自行決定（比照 Dialog）
- **標題過長** → 不處理換行／截斷，由文案端自行精簡
- **單側 IconButton 關閉時** → Title 仍須相對於整個 Sheet 寬度水平置中，不因單側 IconButton 隱藏而偏移；leading/tailing 兩側需保留對稱寬度（即使該側 IconButton 關閉，版位仍需佔位），不可用單純 3 欄 auto-layout hug 寬度實作

## Flutter Widget

| Flutter Class | 對應角色 |
|--------------|---------|
| `RoundedBottomSheet` | 主容器 |
| `BottomSheetHeader` | Header（必備） |

## Figma 元件

**位置**：[TigerMaster-Design-System → BottomSheet](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=695-538)

---

## 待釐清事項（TBD）

- 無

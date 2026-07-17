# AppBar

頁面最上層的標題列角色元件，不限定 Flutter 原生 `AppBar` widget 實作，只要是「頁面頂部負責標題/導覽/品牌識別」的區塊都屬於此範疇。由 `Type`（外型）、`Background`（底色來源）、`Extension`（下方擴充內容）三個彼此獨立的屬性組合表達。

> **元件邊界**：帳號/登入頁的自訂高頭部區塊雖不透過 `Scaffold.appBar` 實作，但功能角色等同 AppBar，歸類為 `Type=Tall` + `Extension=Overlay`（靜態不收合）。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1`）審查，共 66 處 AppBar 相關呼叫；`stack_sliver_app_bar.dart`、`client_account_page.dart`、`phone_input_section.dart`、`select_l1l2_display_section.dart`、`select_l3_display_section.dart`、`search_working_categories.dart` 等為代表案例；Figma Component 已建立_
_最後更新：2026-07-17 — 新增 `Reserve Status Bar` Boolean（內嵌 [StatusBar](status-bar.md) instance，非留白）_

---

## Variants

| 維度 | 值 |
|------|-----|
| Type | `Standard`（單列，最精簡的基礎形式）／`Tall`（多列，較高，本體下方多一段內容空間） |
| Background | `Solid`（純色）／`Brand`（品牌漸層裝飾圖，固定素材）／`Image`（呼叫端提供的內容照片） |
| Extension | `None`（無擴充）／`Slot`（可切換式擴充內容，如 [SegmentedControl](segmented-control.md)、SearchBar）／`Overlay`（固定疊加浮動內容，多為 Card） |
| Leading | 預設返回鍵／自訂／無 |
| Title（Slot） | `Standard`：與 Leading/Actions 同列，置中，`Title/M`；`Tall`：獨立第二列，左對齊全寬，`Heading/3`；若 `Extension≠None`，其內容為緊接 Title 之下的第三列 |
| Actions（Slot） | 無／單一 icon／icon+文字按鈕 |
| Reserve Status Bar（Boolean） | 開＝內嵌 [StatusBar](status-bar.md) instance（固定其中一組 Frame Group，跨尺寸群組需手動更換 instance）；關＝不顯示 |

`Type` 與 `Extension` 相互獨立，任一 `Type` 皆可搭配任一 `Extension`（例：師傅端首頁是 `Standard`+`Brand`+`None`，通知列表是 `Standard`+`Brand`+`Slot`）。實際高度由 `Type`／`Extension` 組合與內容決定，數值以 Figma 元件為準，不在此重複列出。

## 使用規則

**怎麼選 Type：**
- `Standard` 是最精簡、視覺份量最輕的基礎形式，用於一般內容頁、不需特別強調頁面重要性的情境
- `Tall` 本體更高更厚，視覺份量更強烈，用於需要強調頁面重要性／品牌識別的情境
- 若 AppBar 會隨頁面捲動收合，收合的終點視覺樣式就是 `Standard`——**不需要為收合行為另建 variant**，這純屬互動行為（見邊界情況）

**怎麼選 Background：**
- `Solid`：內容本身是重點、不需要品牌強調的頁面（設定、聊天室、表單、webview）
- `Brand`：需要品牌識別、但頁面內容尚未載入具體照片的情境（首頁、通知列表）
- `Image`：頁面本身圍繞一張具體照片展開（分類詳情、任何以照片為核心內容的頁面）

**怎麼選 Extension：**
- `None`：不需要額外內容
- `Slot`：需要一個「切換式」的次要內容區——分頁切換用 SegmentedControl、搜尋用 SearchBar、簡短說明用文字
- `Overlay`：需要「疊加式」的浮動內容，且該內容持續存在（不是切換的）——多為 Card

**避免：**
- 非頁面頂層的局部區塊標題（卡片內、區塊內的小標題）
- Dialog／BottomSheet 內部的標題列（已有自己的標題規則）

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| `Background=Solid` | 預設 `Brand/TigerYellow`，可依情境換成既有 token（`Base/White`、`Background/Surface`、`Background/Page`） | 不新增專屬中性色 token |
| `Background=Brand` | 固定素材，非 token（`appbar_bg.png`／`appbar_bg_pro.png`） | |
| `Background=Image` | 呼叫端內容，非 token | 疊加固定暗化遮罩 `rgba(0,0,0,0.12)`，確保白字對比 |
| Title 文字樣式 | `Standard`＝`Title/M`；`Tall`＝`Heading/3` | |
| Title 文字色 | `Text/Primary`（`Solid`／`Brand`）；`Text/Inverse`（`Image`，白色，已寫入 `semantic-colors.md`） | `Brand` 黃底現況為黑字，對比已足夠 |
| Leading icon | `Icon/Default`（`Solid`／`Brand`）；`Icon/Inverse`（`Image`） | |
| Actions icon | 複用 [IconButton](icon-button.md) 既有 token | |

## 邊界情況

- **與 StatusBar 的組裝關係**：[StatusBar](status-bar.md) 為 AppBar 內嵌的 instance（由 `Reserve Status Bar` Boolean 控制顯示／隱藏），非獨立疊加元件。`Background=Image` 現有的 12% 暗化遮罩保證 StatusBar 用 `Light Content` 時對比足夠，不需人工判斷

- **捲動收合行為不做 Figma variant**：`Extension=Overlay` 的部分頁面（訂單詳情、L3、叫修需求頁）捲動時會漸變收合成 `Standard` 的樣子，部分（帳號/登入頁首）維持靜態不收合。兩者靜止畫面相同，差異純屬互動行為，比照 Dialog 規格處理方式僅文字記錄
- **客戶端首頁**：極窄的本體，搭配頁面層級（非 AppBar 內、非捲動連動）的獨立浮動卡片（進行中訂單），屬刻意設計的首頁專屬特例
- **`Extension=Overlay` 現況 3 套獨立 Flutter 實作**：`StackSliverAppBar`、`pro_membership_intro_page.dart`（原生 `SliverAppBar`）、`select_l3_display_section.dart`（原生 `SliverAppBar`+`FlexibleSpaceBar`）。三者在 Figma 已統一為同一元件，Flutter 端整併為工程排程議題
- **Flutter 現況落差**：登入手機號碼頁、分類 L2 頁的大標題文字實際寫在 Extension 內容裡，未使用獨立 Title slot，與本規格的 Title/Extension 分列結構不完全一致，暫不強制統一

## Flutter Widget

| Flutter Class | 對應組合 | 備註 |
|--------------|----------|------|
| 原生 `AppBar`（多處各自實作） | `Standard`（任何 Background）／`Tall`+`Extension=Slot` | 41+ 處呼叫，待整併為統一元件 |
| `StackSliverAppBar` | `Tall`+`Extension=Overlay`（捲動收合） | 含浮動卡片 |
| 原生 `SliverAppBar`（`pro_membership_intro_page.dart`） | `Tall`+`Extension=Overlay`（捲動收合） | 獨立第二套收合實作 |
| 原生 `SliverAppBar`+`FlexibleSpaceBar`（`select_l3_display_section.dart`） | `Tall`+`Extension=Overlay`（捲動收合） | 獨立第三套收合實作，背景帶真實照片 |
| `ClientAccountHeaderSection` 等（不使用 `Scaffold.appBar`） | `Tall`+`Extension=Overlay`（靜態不收合） | 帳號頁自訂高頭部 |

## Figma 元件

**位置**：[TigerMaster-Design-System → Navigation](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=833-153)

---

## 待釐清事項（TBD）

- 無

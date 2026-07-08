# IconLabelButton

獨立、緊湊的圖示+文字標籤可點擊單元（icon 在上、文字在下垂直排列），用於導覽分頁、功能選單選項、次要操作入口。

> **元件邊界**：此規格僅涵蓋垂直排列（icon 在上、文字在下）的圖示+文字按鈕。水平排列的 icon+文字請見 `Button` 的 `hasIconStart` / `hasIconEnd` 修飾詞。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，`FABBottomNavBar._buildTabItem`、`chatroom_input_Bar.dart`、`master_order_detail.dart` 三處現況比對；Figma 尚未建立對應 Component_
_最後更新：2026-07-08_

---

## Variants

參照 `IconButton` 的 variant 結構（拿掉 size，因為固定單一尺寸）：

| 維度 | 值 |
|------|-----|
| `tone` | `default`（淺色底）／`inverse`（深色底，未選中）／`brand`（深色底，選中）|
| `state` | `default` / `pressed` / `disabled` |

**尺寸固定為單一規格**：icon 24px，不分 `lg`/`md`/`sm`——現況三處案例僅出現 2 種尺寸（~24px 與 36px），且都可歸一為 24px，暫不建立多尺寸 variant，待未來出現真實需求再擴充。

**`tone` 說明**：`brand` 併入 `tone` 而非獨立的 `selected` 維度，三個值剛好對應現況三種真實顏色狀態（一般獨立操作／導覽未選中／導覽選中），避免「selected + tone」交叉出現不存在的無效組合。`brand` 僅在導覽切換情境（如 BottomNavBar 分頁）下使用；獨立操作按鈕（聊天室選單、AppBar 客服）只會用到 `default`。

## Design Tokens

| 屬性 | tone: default | tone: inverse | tone: brand |
|------|---------------|---------------|-------------|
| Icon 色 | `Icon/Default` | `Icon/Inverse` | `Icon/Brand` |
| 文字色 | `Text/Primary` | `Interactive/OnFilled` | `Interactive/Brand` |

**文字跟著 icon 一起變色**：`brand` 狀態下文字與 icon 同步變黃，視覺上是同一個「選中」訊號。現況 `FABBottomNavBar` 呼叫端（`client_main_page.dart:136-139`）文字沒有跟著 `selectedColor` 切換，判定為現況實作遺漏（非刻意設計），本規格予以修正，待整併時一併處理（見「Flutter Widget」技術債）。

> **設計系統備註**：`inverse`／`brand` 兩種深色底文字色皆直接複用既有 `Interactive` 群組 token，不新增也不改名任何 token：
> - `Interactive/OnFilled`（白）— 與 `Button.md` 的 `primary filled` 用法邏輯一致（BottomNavBar 背景色 `rgba(31,40,111,1)` 與 `Interactive/Primary`／`Brand/TigerBlue` 同色系，填色背景配 OnFilled 文字）
> - `Interactive/Brand`（黃）— 比照 `Chip.md` Info tone「選中文字」複用 Interactive 群組 token 當前景色的既有用法

| 屬性 | Token | 備註 |
|------|-------|------|
| Icon 尺寸 | 24px | 固定值 |
| Icon 與文字間距 | `Spacing/4` | 對齊聊天室選單現況做法；BottomNavBar 現況為 0，視為需一併修正對齊 |
| Disabled | 整體 `opacity: 40%` | 與 Button/IconButton/Chip 慣例一致，不使用獨立色票 |
| 背景 | 無填色（transparent） | 純 tap target，無底色/邊框 |

**無新增 token**：`tone` 三種文字色皆複用既有 semantic token（`Text/Primary`、`Interactive/OnFilled`、`Interactive/Brand`），不需異動 `semantic-colors.md`。

## 使用規則

**用於：**
- 導覽分頁項目（如底部導覽列）
- 功能選單選項（如聊天室附加功能：傳送照片、約施工時間）
- 次要操作入口（如師傅端 AppBar 客服按鈕）

**避免：**
- 頁面主要行動呼籲（改用 `Button`）
- 需要較長說明文字的情境（文案應控制在約 4 字以內，由文案端把關，非放大元件因應）

## 邊界情況

- **文字長度**：元件本身不處理換行/省略號，由呼叫端文案控制在約 4 字以內
- **`tone: brand`**：僅在導覽/切換語境下出現，一般獨立操作按鈕維持 `default`（無選中狀態）視覺

## Flutter Widget

| Flutter Class | 對應 Variant | 現況說明 |
|--------------|-------------|------|
| （待新建）`IconLabelButton` | 全部 | 目前 codebase 無專屬 widget，以下三處各自手刻 |

**現況待整併：**
- `FABBottomNavBar._buildTabItem`（`lib/component/bottom_navigator_bar/fab_bottom_nav_bar.dart:72`）— BottomNavBar 分頁項目；現況 icon/文字間距為 0，待整併時修正為 `Spacing/8`
- `chatroom_input_Bar.dart:127-181` — 聊天室附加功能選單（傳送照片／約施工時間），2 個選項水平並排，現況 icon+文字間距已是 8px
- `master_order_detail.dart:68-103` — 師傅端 AppBar 客服按鈕，現況為 `Image.asset` 36×36（非 Material Icon）+ 文字 12px，外層包 `ChatroomUnreadBadge`

**不整併：**
- `CustomerServiceFab`（`lib/component/button/customer_service_fab.dart`）— icon 44px，浮動主要行動情境，尺寸與定位不同，維持獨立於 [FAB](fab.md) 規格管轄

**技術債：**
- `FABBottomNavBar` 現況選中時只有 icon 變黃（`selectedColor`），文字仍固定用未選中色（`color`），判定為現況實作遺漏。待整併為 `IconLabelButton` 時修正：文字須與 icon 同步套用 `tone: brand`（`Interactive/Brand`）

## Figma 元件

**位置**：[TigerMaster-Design-System → IconLabelButton](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=640-22)（Component Set，涵蓋 `Tone`(default/inverse/brand) × `State`(default/pressed/disabled) 共 9 種變體，token 綁定與 IconButton 命名慣例一致）

---

## 待釐清事項（TBD）

- 無

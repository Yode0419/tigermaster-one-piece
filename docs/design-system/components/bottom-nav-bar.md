# BottomNavBar

App 最底部的主導覽列，依角色（客戶／師傅／Admin）提供 4 個分頁項目的切換入口，中央為固定品牌 Logo。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，`FABBottomNavBar`（`lib/component/bottom_navigator_bar/fab_bottom_nav_bar.dart`）為共用容器，`master_main_page.dart`／`client_main_page.dart`／`admin_main_page.dart` 三處呼叫比對；Figma Component 已建立_
_最後更新：2026-07-17 — 新增 `Reserve Home Indicator` Boolean_

---

## Variants

| 維度 | 值 |
|------|-----|
| Role | Client／Master／Admin（三個變體＝各角色實際 tab 內容組合，非通用 TabCount 維度）|
| Reserve Home Indicator（Boolean） | 開＝內嵌 [HomeIndicator](home-indicator.md) instance；關＝不顯示 |

分頁項目由專屬子元件 `NavBarItem` 組成（`Tab`：Home／Order／Notification／Account／Income／Chatroom／None(佔位) × `Toggle`：on/off 選中狀態），內部沿用 [IconLabelButton](icon-label-button.md) 的圖示+文字視覺基礎。中央為固定 Logo，下方視角色顯示對應文字（英雄榜／下單流程／Admin 無文字）。

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 容器底色 | `Interactive/Primary`（`Brand/TigerBlue` #1F286F） | 現況 `Color.fromRGBO(31,40,111,1)` 完全吻合，零落差 |
| 分頁項目 | 複用 `IconLabelButton` 視覺（選中／未選中對應 `Toggle` on/off） | 零新增 token |
| 陰影 | `Elevation/Rise` | 置底區塊陰影，方向與 [Sticky Footer](sticky-footer.md) 一致 |
| Icon 尺寸 | 24px（`Icon/Size=24`） | |
| 中央 Logo | 固定素材圖片（`center_float_button.png`） | 純裝飾用 Logo，非既有 [FAB](fab.md) 元件實例，不套用 FAB 規格 |

**技術債**：Flutter 現況分頁選中色為內建 `Colors.yellow`（`#FFFF00`），未對到 `Interactive/Brand`（`#FABF13`），規格定調應改用 `Interactive/Brand`（呼應 `icon-label-button.md` 已記載的技術債：文字未隨 icon 同步變色）。

## 使用規則

**用於：**
- App 最上層導覽殼層，每個角色恰好一個實例，全程可見（除非被系統元素如鍵盤遮蔽）

**避免：**
- 子頁面內的次要切換（改用 [SegmentedControl](segmented-control.md)）

## 邊界情況

- **Tab 文字長度**：複用 IconLabelButton 規則，文案控制在約 4 字內
- **Admin 佔位 tab**：目前只有 2 個功能 tab + 2 個佔位（icon=`close`、label=「無」），視為 Admin variant 現況內容，非正式 disabled state
- **中央文字為空（Admin）**：Admin 的中央 Logo 下方不顯示文字，屬現況內容差異，非缺漏
- **中央 Logo 按鈕 no-op（Admin）**：現況按下無反應，視為超出本規格範圍（頁面邏輯層級問題）
- **與 HomeIndicator 的組裝關係**：[HomeIndicator](home-indicator.md) 為 BottomNavBar 內嵌的 instance（由 `Reserve Home Indicator` Boolean 控制顯示／隱藏），與 Sticky Footer 邏輯一致

## Flutter Widget

| Flutter Class | 對應 Variant | 現況說明 |
|--------------|-------------|------|
| `FABBottomNavBar` | Role（Client/Master/Admin） | 三處呼叫（`master_main_page.dart`／`client_main_page.dart`／`admin_main_page.dart`）視覺樣式相同，僅 `items`／`centerItemText` 內容不同 |

**待整併：**
- 分頁項目（`FABBottomNavBar._buildTabItem`）待整併為 `IconLabelButton` 實例（技術債已記載於 [icon-label-button.md](icon-label-button.md)）
- 中央按鈕維持獨立客製 Logo 圖片，不整併入 FAB 規格

## Figma 元件

**位置**：[TigerMaster-Design-System → BottomNavBar](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=933-328)

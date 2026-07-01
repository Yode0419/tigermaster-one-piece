# 元件清單

依 Flutter codebase 掃描結果整理，作為 `/sanji` 備料的工作清單。  
`完成` 打勾後，元件名稱改為連結指向 spec 文件。

_Flutter codebase：`C:\Users\yode0\develop\source_code\android_app_2.6.1\fdtigermaster_app`_
_最後更新：2026-07-01_

---

## Atoms

Atoms 是最小單位，不依賴其他自訂元件，由 Token 驅動。

| 完成 | 元件名稱 | Figma 頁面 | 對應 Flutter Class |
|---|---|---|---|
| [ ] | Badge | `Badge` | `ChatroomUnreadBadge` |
| [x] | [Button](components/button.md) | `Button` | `PillButton`, `FutureButton`, `ToggleDisableButton`, `ButtonShareStyle` |
| [ ] | Checkbox | `Checkbox` | `Checkbox`（Flutter, Material 2） |
| [ ] | Chip | `Chip` | `ChoiceChip`（Flutter, Material 2） |
| [x] | [FAB](components/fab.md) | `Button` | `FloatingActionButton`（Flutter） |
| [x] | [Icon](components/icon.md) | `Icon` | `Icon`（Flutter） |
| [x] | [IconButton](components/icon-button.md) | `Button` | `IconButton`（Flutter） |
| [ ] | Image | `Image` | `CustomNetworkImage` |
| [ ] | LabeledIconButton | `Button` | —（需新建）|
| [ ] | Radio | `Radio` | `Radio`（Flutter） |
| [ ] | Rating | `Rating` | `RatingBar`, `RatingBarIndicator`（flutter_rating_bar） |
| [ ] | Switch | `Switch` | `Switch`（Flutter, Material 2） |
| [ ] | Tag | `Tag` | `PillText` |
| [ ] | Tooltip | `Tooltip` | `TapTooltip` |

---

## Molecules

Molecules 以 Atoms 為主要組成，部分會依賴其他 Molecule（標註 ★）。

| 完成 | 元件名稱 | Figma 頁面 | 對應 Flutter Class | 相依元件（參考用） |
|---|---|---|---|---|
| [ ] | Avatar | `Avatar` | `HeadshotImage` | `Image` |
| [ ] | BottomSheet | `BottomSheet` | `ScaffoldBottomSheet`, `RoundedBottomSheet`, `BottomSheetHeader` | `Icon` |
| [ ] | Card | `Card` | `CloseableCard` | — |
| [ ] | Dialog | `Dialog` | `PlatformAlertDialog`, `ImportantOrderActionDialog` | `Button` |
| [ ] | EmptyState | `EmptyState` | —（需新建） | `Button`（選填） |
| [ ] | MessageBubble | `MessageBubble` | `TextMessage`, `ImageMessage`, `FileMessage` | `Badge`, `Avatar` ★ |
| [ ] | SearchBar | `SearchBar` | —（需新建）；codebase 內至少 2 種視覺型態（緊湊型／全螢幕大標題型），備料時需一併納入 | `Icon`, `TextField` ★ |
| [ ] | SegmentedControl | `SegmentedControl` | `TwoTabPreferredSizeTabBar` | `Icon`（選填） |
| [ ] | Snackbar | `Snackbar` | `SnackBar`（Flutter） | `Icon`（選填）, `Button`（選填） |
| [ ] | StepIndicator | `StepIndicator` | `ProgressTimelineIndicator` | `Icon`, `Badge` |
| [x] | [TextField](components/text-field.md) | `TextField` | `IconButtonTextFormField` | `Icon`, `IconButton` |
| [x] | [PasswordField](components/password-field.md) | `PasswordField` | `ObscureTextFormField` | `Icon`, `IconButton` |

★ 依賴另一個 Molecule

---

## Organisms

Organisms 由 Atoms 與 Molecules 混合組成，或佔據固定版面位置。

| 完成 | 元件名稱 | Figma 頁面 | 對應 Flutter Class | 相依元件（參考用） |
|---|---|---|---|---|
| [ ] | AppBar | `Navigation` | `StackSliverAppBar` | `Icon`, `Button` |
| [ ] | BottomNavBar | `Navigation` | `FABBottomNavBar` | `Icon`, `Badge`, `Button` |
| [ ] | Carousel | `Carousel` | `CarouselBannerSwiper` | `Image`（Slot）, `Icon` |
| [ ] | CategoryCard | `Card` | `L2Card`（Row）, `L3Card`（Stacked） | `Image`, `Badge`（選填） |
| [ ] | CompactOrderCard | `Card` | `MasterSuitableOrderCard` | — |
| [ ] | OrderCard | `Card` | `ClientOnGoingOrderCard`, `ClientWarrantyOrderCard`, `MasterOnGoingOrderCard`, `MasterInProgressOrderCard`, `MasterWarrantyOrderCard` | `Badge`, `Tag`, `Avatar` ★, `Button`（選填） |

★ 依賴 Molecule

---

## 已完成

<!-- 完成 spec 後移至此區 -->

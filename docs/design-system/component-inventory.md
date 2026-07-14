# 元件清單

依 Flutter codebase 掃描結果整理，作為 `/sanji` 備料的工作清單。  
`完成` 打勾後，元件名稱改為連結指向 spec 文件。

_Flutter codebase：`C:\Users\yode0\develop\source_code\android_app_2.6.1\fdtigermaster_app`_
_最後更新：2026-07-14 — Card 完成備料；新增 Banner 候選_

---

## Atoms

Atoms 是最小單位，不依賴其他自訂元件，由 Token 驅動。

| 完成 | 元件名稱 | Figma 頁面 | 對應 Flutter Class |
|---|---|---|---|
| [x] | [Badge](components/badge.md) | `Badge` | `ChatroomUnreadBadge`, `package:badges`（直接使用） |
| [x] | [Button](components/button.md) | `Button` | `PillButton`, `FutureButton`, `ToggleDisableButton`, `ButtonShareStyle` |
| [x] | [Checkbox](components/checkbox.md) | `Checkbox` | `TitledCheckBox` |
| [x] | [Chip](components/chip.md) | `Chip` | `InvoiceCategoryPicker`, `WorkingDateTypeSwitch`, `ChoiceChip`（Flutter, Material 2） |
| [x] | [CornerBadge](components/corner-badge.md) | `Badge` | `WarrantyDayBadge` |
| [x] | [FAB](components/fab.md) | `Button` | `FloatingActionButton`（Flutter） |
| [x] | [Icon](components/icon.md) | `Icon` | `Icon`（Flutter） |
| [x] | [IconButton](components/icon-button.md) | `Button` | `IconButton`（Flutter） |
| [x] | [Image](components/image.md) | `Image` | `CustomNetworkImage` |
| [x] | [IconLabelButton](components/icon-label-button.md) | `Button` | —（需新建；待整併 `FABBottomNavBar._buildTabItem`、`chatroom_input_Bar.dart`、`master_order_detail.dart`）|
| [x] | [Radio](components/radio.md) | `Radio` | `Radio`（Flutter） |
| [x] | [Rating](components/rating.md) | `Rating` | `RatingBar`, `RatingBarIndicator`（flutter_rating_bar） |
| [x] | [Switch](components/switch.md) | `Switch` | `Switch`（Flutter, Material 2） |
| [x] | [Tag](components/tag.md) | `Tag` | `PillText` |
| [x] | [Tooltip](components/tooltip.md) | `Tooltip` | `TapTooltip` |

---

## Molecules

Molecules 以 Atoms 為主要組成，部分會依賴其他 Molecule（標註 ★）。

| 完成 | 元件名稱 | Figma 頁面 | 對應 Flutter Class | 相依元件（參考用） |
|---|---|---|---|---|
| [x] | [Avatar](components/avatar.md) | `Avatar` | `HeadshotImage` | `Image` |
| [ ] | Banner | —（需新建） | `CloseableCard`（現況僅此一個實作，4 處呼叫） | — |
| [x] | [BottomSheet](components/bottom-sheet.md) | `BottomSheet` | `RoundedBottomSheet`, `BottomSheetHeader` | `Icon` |
| [x] | [Sticky Footer](components/sticky-footer.md) | `Sticky Footer`（獨立頁面） | `ScaffoldBottomSheet`, `QuotationSubmitBottomSection` | — |
| [x] | [Card](components/card.md) | `Card` | —（需新建 `AppCard`；待整併 `L2Card`、`L3Card`、`ClientOnGoingOrderCard`、`MasterOnGoingOrderCard`、`MasterSuitableOrderCard`、`MasterInProgressOrderCard`、`ProMemberFaqCard`） | — |
| [x] | [Dialog](components/dialog.md) | `Dialog` | `PlatformAlertDialog`, `ImportantOrderActionDialog` | `Button` |
| [ ] | EmptyState | `EmptyState` | —（需新建） | `Button`（選填） |
| [x] | [ListItem](components/list-item.md) | `ListItem` | —（需新建；待整併 `SettingTile`、`MemberInfoTile`） | `Icon` |
| [ ] | MessageBubble | `MessageBubble` | `TextMessage`, `ImageMessage`, `FileMessage` | `Badge`, `Avatar` ★ |
| [x] | [PhotoUpload](components/photo-upload.md) | `PhotoUpload` | `GridImageView`, `AccountImageUpload` | `Image`, `IconButton`（取消鈕疊加）|
| [ ] | SearchBar | `SearchBar` | —（需新建）；codebase 內至少 2 種視覺型態（緊湊型／全螢幕大標題型），備料時需一併納入 | `Icon`, `TextField` ★ |
| [x] | [SegmentedControl](components/segmented-control.md) | `SegmentedControl` | `TwoTabPreferredSizeTabBar` | — |
| [x] | [Snackbar](components/snackbar.md) | `Snackbar` | `SnackBar`（Flutter）；現況分散於 `showSaveResultSnackBar()` + 6 處 inline，待整併 | `Icon`（Success/Error 才有） |
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

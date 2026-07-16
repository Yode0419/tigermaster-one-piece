# 元件清單

依 Flutter codebase 掃描結果整理，作為 `/sanji` 備料的工作清單。  
`完成` 打勾後，元件名稱改為連結指向 spec 文件。

_Flutter codebase：`C:\Users\yode0\develop\source_code\android_app_2.6.1\fdtigermaster_app`_
_最後更新：2026-07-16 — SearchBar 完成備料（Type：Boxed/Lined，僅涵蓋全螢幕大標題搜尋與地址自動完成搜尋兩種，MasterShop 緊湊型搜尋暫不處理，Figma 尚未建立正式 Component）_

_2026-07-15 — ChatAppBar 完成備料（Chat 情境 variant：To Client/To Master/To Admin/Admin Mode，修正先前「對話對象頭像」的錯誤描述，實際無頭像依賴，Figma 尚未建立正式 Component）；ChatBackground 完成備料（Type：Default/Watermark，Watermark 僅限與客服對話情境，修正先前「一般聊天室純白」的描述誤差，實際底色為 `Background/Page`）；AppBar 完成備料並建立 Figma Component（Type：Standard/Tall × Background：Solid/Brand/Image × Extension：None/Slot/Overlay，三者完全獨立）；MessageBubble 完成備料；Figma page 改名為 `Chatroom`（比照 `Button` page 慣例，同頁納入聊天室系列元件）；Banner 完成備料；Card 完成備料_

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
| [x] | [Banner](components/banner.md) | `Banner` | `CloseableCard`、`NewVersionCard`、`unit_picker_bottom_sheet.dart` | — |
| [x] | [BottomSheet](components/bottom-sheet.md) | `BottomSheet` | `RoundedBottomSheet`, `BottomSheetHeader` | `Icon` |
| [x] | [Sticky Footer](components/sticky-footer.md) | `Sticky Footer`（獨立頁面） | `ScaffoldBottomSheet`, `QuotationSubmitBottomSection` | — |
| [x] | [Card](components/card.md) | `Card` | —（需新建 `AppCard`；待整併 `L2Card`、`L3Card`、`ClientOnGoingOrderCard`、`MasterOnGoingOrderCard`、`MasterSuitableOrderCard`、`MasterInProgressOrderCard`、`ProMemberFaqCard`） | — |
| [x] | [Dialog](components/dialog.md) | `Dialog` | `PlatformAlertDialog`, `ImportantOrderActionDialog` | `Button` |
| [ ] | EmptyState | `EmptyState` | —（需新建） | `Button`（選填） |
| [x] | [ListItem](components/list-item.md) | `ListItem` | —（需新建；待整併 `SettingTile`、`MemberInfoTile`） | `Icon` |
| [x] | [MessageBubble](components/message-bubble.md) | `Chatroom` | `TextMessage`, `ImageMessage`, `FileMessage`, `DayMarkMessage`, `CallLogMessage`, `TimeRequestMessage`, `MessageBuilder`, `PendingMessageBuilder` | `Avatar` ★ |
| [ ] | ChatInputBar | `Chatroom`（空白區塊已建立） | —（需新建；參考 `chatroom_input_Bar.dart`） | `TextField` ★, `IconButton` |
| [x] | [ChatBackground](components/chat-background.md) | `Chatroom` | Type（Default/Watermark）：`to_admin_chatroom.dart`（`DecorationImage` + `to_admin_chatroom_watermark.png`，repeat、透明度 0.05、scale 1.2）＝`Watermark`，僅限與客服對話情境；其餘聊天室頁面純色背景＝`Default` | — |
| [x] | [PhotoUpload](components/photo-upload.md) | `PhotoUpload` | `GridImageView`, `AccountImageUpload` | `Image`, `IconButton`（取消鈕疊加）|
| [x] | [SearchBar](components/search-bar.md) | `SearchBar` | Boxed → `search_working_categories.dart`；Lined → `address_select_bottom_sheet.dart`（`MasterShop` 第三種實作暫不處理） | `Icon`, `TextField` ★ |
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
| [x] | [AppBar](components/app-bar.md) | `Navigation` | Type（Standard/Tall）× Background（Solid/Brand/Image）× Extension（None/Slot/Overlay）三個完全獨立的正交屬性：Standard 與 Tall+Slot 用原生 `AppBar`（41+ 處各自實作）；Tall+Overlay（捲動收合）用 `StackSliverAppBar` + 2 套獨立原生 `SliverAppBar` 實作（3 套待整併，屬工程排程議題）；Tall+Overlay（靜態不收合）為帳號頁自訂高頭部（不用 `Scaffold.appBar`）；捲動收合純屬互動行為不做 variant。Figma Component 已建立 | `Icon`, `Button` |
| [x] | [ChatAppBar](components/chat-app-bar.md) | `Chatroom` | Chat（情境）：`to_client_chatroom.dart`、`to_master_chatroom.dart`、`to_admin_chatroom.dart`、`from_admin_chatroom.dart` 四個獨立 class 各自手刻，無共用元件，待整併 | `IconButton`, `IconLabelButton`（顏色覆寫） |
| [ ] | BottomNavBar | `Navigation` | `FABBottomNavBar` | `Icon`, `Badge`, `Button` |
| [ ] | Carousel | `Carousel` | `CarouselBannerSwiper` | `Image`（Slot）, `Icon` |
| [ ] | CategoryCard | `Card` | `L2Card`（Row）, `L3Card`（Stacked） | `Image`, `Badge`（選填） |
| [ ] | CompactOrderCard | `Card` | `MasterSuitableOrderCard` | — |
| [ ] | OrderCard | `Card` | `ClientOnGoingOrderCard`, `ClientWarrantyOrderCard`, `MasterOnGoingOrderCard`, `MasterInProgressOrderCard`, `MasterWarrantyOrderCard` | `Badge`, `Tag`, `Avatar` ★, `Button`（選填） |

★ 依賴 Molecule

---

## 已完成

<!-- 完成 spec 後移至此區 -->

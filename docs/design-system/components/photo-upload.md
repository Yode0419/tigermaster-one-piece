# PhotoUpload

可增減的圖片上傳插槽元件，支援使用者新增、預覽、刪除多張圖片；涵蓋施工照片（格狀多張）與證件照片（清單式）兩種使用情境。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，`GridImageView`（`lib/component/image/grid_image_view.dart`）+ `AccountImageUpload`（`lib/page/master_mode/account/account_image_upload.dart`）兩處現況比對；Figma 元件 `PhotoUpload`（node-id 609:139）_
_最後更新：2026-07-08_

---

## Variants

| 屬性 | 值 |
|------|-----|
| Type | `Photo`（1:1 正方形，格狀排列，用於施工照片）／`Certificate`（16:9 橫向卡片，清單排列，用於證件照片）|
| State | `default`（空插槽，可點擊新增）／`loading`（選圖後上傳中的過渡態）／`uploaded`（縮圖 + 刪除鈕）／`disabled`（整頁唯讀情境）|

Type 與 State 為兩個獨立的 variant 屬性，可任意交叉組成。

**尺寸為比例制，非固定 px**：
- `Photo`：`crossAxisCount: 4`、`childAspectRatio: 1.0` 的格狀 GridView，單格寬度 = `(螢幕寬度 - 60) / 4`（正方形），隨裝置寬度變動
- `Certificate`：`AspectRatio(16/9)`，寬度撐滿容器（頁面扣除左右 `Spacing/16` padding），高度依比例計算

**現況與規格落差**：
- `loading` 為規格新增的插槽層級狀態，現況 codebase 兩處實作皆未在插槽層級顯示上傳中；`AccountImageUpload` 現況是在頁面底部送出鈕整體顯示「上傳中...」文字動畫（批次上傳，非單一插槽）
- `disabled` 對應「整頁唯讀」情境（如已審核完成的證照頁），現況 codebase 尚無此用法，屬預留 variant

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 邊框（default） | `Border/Interactive` | 藍色，現況 codebase hardcode `Color.fromRGBO(58, 137, 248, 1)`，與此 token 色值一致 |
| Icon（default「+」） | `Icon/Interactive` | 與邊框同色系 |
| 文字（Certificate default 文案「選擇欲上傳的證件照」） | `Text/Link` + `Label/M` | `Text/Link` 語意為「可點擊行動文字」，與此處用途相符；字級現況 hardcode 14px，對應 `Label/M` |
| 刪除鈕（uploaded） | 複用 IconButton（`filled` / `sm`）→ `Background/Surface` + `Icon/Default` | 現況 codebase 為裸 `Icon`（白色 `cancel_outlined`，無底色圓圈），與此規格不一致，列為技術債 |
| Loading 遮罩 | `Background/OverlaySubtle` | 與 [Image](image.md) 元件 Loading 狀態一致 |
| Disabled | 整體 `opacity: 40%` | 與 Button／IconButton／Chip 慣例一致，不使用獨立色票 |
| 圓角 | `Radius/4` | 現況 codebase 為 `BorderRadius.circular(5)`（Photo、Certificate 皆同），5px 非既有 token 值，採最接近的 `Radius/4`，列為既有設計債 |

## 使用規則

**用於：**
- 需要使用者上傳多張圖片並可個別刪除的情境（施工照片、證件照片）

**避免：**
- 單張大頭貼／個人照片編輯（屬於 `Avatar` 元件範疇，非本元件）

**數量上限：**
- 不由元件強制規定，由呼叫端指定 `maxLimit`（Photo 現況三處實作皆為 10；Certificate 現況無上限）
- 達上限時：新增插槽（+ 按鈕）直接隱藏消失，**非**顯示為 `disabled`

## 邊界情況

- **刪除確認**：點擊縮圖上的 X 鈕不會直接刪除，會先跳出二次確認 Alert Dialog（「請確認是否刪除選取照片」），確認後才實際刪除
- **上傳失敗**：退回 `default` 空插槽 + Snackbar 錯誤提示，不設專屬 error 視覺變體
- **長列表（Certificate）**：外層 `SingleChildScrollView` 捲動，元件本身不處理捲動邏輯

## Flutter Widget

| Flutter Class | 對應 Variant | 現況說明 |
|--------------|-------------|------|
| `GridImageView`（`lib/component/image/grid_image_view.dart`） | Type=Photo | 4 欄格狀排列，`maxLimit` 預設 10；達上限時新增插槽回傳空 `Container()` |
| `AccountImageUpload`（`lib/page/master_mode/account/account_image_upload.dart`） | Type=Certificate | 垂直清單排列，無數量上限；`isLoading` 為頁面級批次上傳狀態，非插槽級 |

**技術債**：
- 兩者為獨立實作，尚未整併為統一的 `PhotoUpload` widget
- 刪除鈕現況為裸 `Icon`（白色 `cancel_outlined`，無底色圓圈），與規格定義的 IconButton `filled`/`sm`（白底圓圈疊圖）不一致，待整併時修正
- 圓角現況 5px，待整併時修正為 `Radius/4`（4px）

## Figma 元件

**位置**：[TigerMaster-Design-System → PhotoUpload](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=609-139)

---

## 待釐清事項（TBD）

- 無

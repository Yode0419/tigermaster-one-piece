# Switch

即時生效的單一設定開關，用於使用者切換某項設定時立刻生效的情境（如推播通知、留言公開/不公開）。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，原生 `Switch` 使用於 `client_account_page.dart`、`account_top_nav_section.dart`、`to_master_comment.dart`（一致用法）、`invoice_default_toggle.dart`（disabled 特例，色彩配置視為技術債）_
_最後更新：2026-07-02 — 建立 Figma Component；改為 Selected（true/false）× State（enabled/disabled）兩個獨立 variant 屬性；尺寸修正為 Flutter SDK `_SwitchConfigM2` 實際常數（track 34×14、thumb 20×20），初版尺寸曾誤植過大_

---

## Variants

Switch 採用兩個獨立 variant 屬性，因為 on／off 皆可能各自呈現 disabled 樣式：

| 屬性 | 值 |
|------|-----|
| `Selected` | true / false（對應 on / off） |
| `State` | enabled / disabled |

四種組合：Selected=true+State=enabled、Selected=true+State=disabled、Selected=false+State=enabled、Selected=false+State=disabled。

不含 error 狀態——Switch 用於單一即時生效設定，無「必選但未選擇」的驗證情境，與 Checkbox/Radio 不同。

## 視覺樣式

尺寸取自 Flutter SDK 原生 Material 2 Switch 實作（`_SwitchConfigM2`，`useMaterial3: false` 時生效，與 `main.dart:48` 設定一致）：trackWidth 33dp／trackHeight 14dp／thumbRadius 10dp（直徑 20dp）。Thumb 直徑大於 track 高度，垂直置中並上下溢出 track 邊緣，靠 on/off 端也些微溢出左右邊緣；Thumb 疊加陰影製造浮起層次。

| 元素 | 規格 | 對應 Flutter M2 常數 |
|------|------|---------------------|
| Track | 34×14px，圓角 `Radius/Full`（Pill） | `trackWidth: 33.0`／`trackHeight: 14.0`（取整 34 便於對齊像素網格） |
| Thumb | 20×20px 圓形，垂直置中於元件（上下各溢出 track 3px），靠 on/off 端左右各溢出 track 3px | `activeThumbRadius`／`inactiveThumbRadius: 10.0` |
| Thumb 陰影 | `Elevation/Drop`（既有 Figma Effect Style：陰影 (0,2) blur 4，黑 9%） | Flutter 原生為 `kElevationToShadow[1]`，未逐一對應token，取現有陰影 token 近似值 |

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| Selected=true track | `Interactive/Brand` | `#FABF13`（Brand/TigerYellow），與 codebase 實際色值精確相符 |
| Selected 皆適用 thumb | `Base/White`（primitive） | 目前無對應「元件內部對比色」的 semantic token，TBD |
| Selected=false track | `Neutral/500`（建議值） | `#9E9E9E`，對應 Flutter Material 2 預設視覺效果，codebase 未覆寫，TBD 待設計確認 |
| State=disabled（Selected 任一值） | 整體 `opacity: 40%` | 與 Button/Checkbox/Radio/IconButton 一致，套用在各自 enabled 版本的顏色上（非獨立色票），因此 selected+disabled 呈現淡黃、unselected+disabled 呈現淡灰，兩者視覺不同 |

## 使用規則

**用於：**
- 即時生效的單一設定開關（如推播通知、隱私設定）

**避免：**
- 表單中需要提交確認的多選——應改用 `Checkbox`
- 互斥選項——應改用 `Radio`

## 邊界情況

- 可點擊區域僅限 Switch 本體，不含整行文字/icon（與 Checkbox/Radio「整行可點」不同，因外層 `SettingTile` 未設定 `onTap`）
- `invoice_default_toggle.dart` 是目前唯一的 disabled 使用案例，其四色 hardcode 配色（`#FABF13`／`#FFD866`／`#E0E0E0`／`#F5F5F5`）與系統一致的 40% opacity 處理方式衝突，視為技術債，未來應改為 opacity-based 處理

## Flutter Widget

| Flutter Class | 對應 Variant |
|--------------|-------------|
| `Switch`（Flutter 原生，無封裝元件） | Selected=true/false、State=enabled/disabled |

## Figma 狀態

- [x] 已建立為 Figma Component（TigerMaster-Design-System）
- **目前位置**：[TigerMaster-Design-System → Switch](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=328-1453)
- **下一步**：無，Component Set 已建立完成（`Selected` × `State` 兩個 variant 屬性，共 4 組合），顏色與圓角皆綁定 Figma variable

---

## 待釐清事項（TBD）

- [ ] On 狀態 thumb 的 `Base/White` 是否應升級為正式 semantic token
- [ ] Off 狀態 track/thumb 的精確色票（目前為建議值，非設計確認值）

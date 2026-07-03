# Switch

即時生效的單一設定開關，用於使用者切換某項設定時立刻生效的情境（如推播通知、留言公開/不公開）。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，原生 `Switch` 使用於 `client_account_page.dart`、`account_top_nav_section.dart`、`to_master_comment.dart`（一致用法）、`invoice_default_toggle.dart`（disabled 特例，色彩配置視為技術債）_
_最後更新：2026-07-03 — 建立 Figma Component；改為 Selected（true/false）× State（enabled/disabled）兩個獨立 variant 屬性；尺寸修正為 Flutter SDK `_SwitchConfigM2` 實際常數（track 34×14、thumb 20×20），初版尺寸曾誤植過大_

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

尺寸取自 Flutter SDK 原生 Material 2 Switch 實作（`useMaterial3: false`）：

| 元素 | 規格 | 對應 Flutter M2 常數 |
|------|------|---------------------|
| Track | 34×14px，圓角 `Radius/Full`（Pill） | `trackWidth: 33.0`／`trackHeight: 14.0`（取整 34 便於對齊像素網格） |
| Thumb | 20×20px 圓形，垂直置中於元件（上下各溢出 track 3px），靠 on/off 端左右各溢出 track 3px | `activeThumbRadius`／`inactiveThumbRadius: 10.0` |
| Thumb 陰影 | `Elevation/Drop`（既有 Figma Effect Style：陰影 (0,2) blur 4，黑 9%） | Flutter 原生為 `kElevationToShadow[1]`，未逐一對應token，取現有陰影 token 近似值 |

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| Selected=true track | `Interactive/Brand` | `#FABF13`（Brand/TigerYellow），與 codebase 實際色值精確相符 |
| Selected 皆適用 thumb | `Base/White`（primitive） | on/off 共用同一色值 |
| Selected=false track | `Neutral/500` | `#9E9E9E`，對應 Flutter Material 2 預設視覺效果 |
| State=disabled（Selected 任一值） | 整體 `opacity: 40%` | 與 Button/Checkbox/Radio/IconButton 一致，套用在各自 enabled 版本的顏色上（非獨立色票），因此 selected+disabled 呈現淡黃、unselected+disabled 呈現淡灰，兩者視覺不同 |

## 使用規則

**用於：**
- 即時生效的單一設定開關（如推播通知、隱私設定）

**避免：**
- 表單中需要提交確認的多選——應改用 `Checkbox`
- 互斥選項——應改用 `Radio`

## 邊界情況

- 可點擊區域僅限 Switch 本體，不含整行文字/icon（與 Checkbox/Radio「整行可點」不同，因外層 `SettingTile` 未設定 `onTap`）
- 目前有一個 disabled 使用案例（`invoice_default_toggle.dart`）採用色票 hardcode，未套用系統一致的 40% opacity 處理，視為技術債，未來應改為 opacity-based

## Flutter Widget

| Flutter Class | 對應 Variant |
|--------------|-------------|
| `Switch`（Flutter 原生，無封裝元件） | Selected=true/false、State=enabled/disabled |

## Figma 元件

**位置**：[TigerMaster-Design-System → Switch](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=328-1453)

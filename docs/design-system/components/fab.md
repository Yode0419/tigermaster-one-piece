# FAB（Floating Action Button）

浮動於畫面固定位置的主要行動按鈕，不隨頁面捲動消失。
用於頁面上最重要的單一行動，且該行動需要在任意捲動位置都能觸及。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查_
_最後更新：2026-06-29_

---

## Variants

| 維度 | 值 |
|------|-----|
| Content | `icon-only` / `icon+label`（圖示加標籤文字）|
| Position | `endFloat`（右下角）/ `centerDocked`（底部導覽列中央，屬於 Bottom Nav Bar 元件）|

> `centerDocked` 為 Bottom Nav Bar 元件的一部分，不在此規格範圍內。

## Design Tokens

### FAB 本體

| 屬性 | Token | 備註 |
|------|-------|------|
| 背景色 | `Background/Surface` | 白色底，適合淺色頁面背景 |
| 形狀 | `Radius/Full` | 圓形，Flutter FAB 預設 |
| 陰影 | `Elevation/Drop` | |
| 尺寸 | TBD | Flutter FAB 預設 56×56px；可自訂，需維持圓形比例 |
| 圖示色 | TBD | 依情境決定，參考 `Icon/*` token |
| 標籤文字 | `Label/M` | `icon+label` variant 使用；14px / 500 Medium |
| 標籤色 | TBD | 依情境決定，參考 `Text/*` token |

### 引導 Tooltip（選用）

FAB 可搭配一次性引導 Tooltip，協助使用者在首次看見 FAB 時理解其用途。

| 屬性 | Token | 備註 |
|------|-------|------|
| 背景色 | `Status/Info` | |
| 文字色 | `Interactive/OnFilled` | |
| 文字樣式 | `Body/S` | |
| 圓角 | `Radius/4` | |
| 陰影 | `Elevation/Drop` | |

## 使用規則

**用於：**
- 頁面上最重要的單一行動，且需在任意捲動位置都能觸及
- 行動無法自然放入頁面主要內容區時

**避免：**
- 一般次要操作（改用 Button）
- 可放入頁面主要內容區的行動（改用 Button 或 IconButton）
- 同一頁面出現兩個以上的 FAB
- 每個頁面都放 FAB——使用門檻高，不是所有頁面都需要

## 邊界情況

- **與 BottomSheet 共存**：FAB 外層需加 `padding: EdgeInsets.only(bottom: 64)` 以避免遮擋頁面底部操作區
- **引導 Tooltip 行為**（若使用）：建議進入頁面短暫延遲後出現，數秒後自動消失；每次進入頁面都觸發

## 目前實作案例

### CustomerServiceFab（客服聊天室入口）

- **出現頁面**：客戶端的訂單詳情頁、報價總覽頁
- **Content variant**：`icon+label`（headset 圖示 44×44 + 「聯繫客服」文字）
- **尺寸**：78×78px
- **動作**：導航至客服聊天室（`/to_admin_chatroom`）
- **Tooltip 文字**：「使用客服聊天室／解決您的問題」

## Flutter Widget

| Flutter Class | 說明 |
|--------------|------|
| `FloatingActionButton` | 底層 widget |
| `CustomerServiceFab` | 自訂 `StatefulWidget`，封裝圖示、標籤、Tooltip 動畫邏輯 |

**位置參數**：`FloatingActionButtonLocation.endFloat`

## Figma 狀態

- [ ] 已建立為 Figma Component（TigerMaster-Design-System）
- **目前位置**：尚未確認
- **下一步**：TBD — 確認 Figma 中是否需要建立 FAB Component 節點

---

## 待釐清事項（TBD）

- [ ] FAB 本體標準尺寸：維持 Flutter 預設 56px，或以 78px 為 TigerMaster 標準？
- [ ] Figma 中是否已有 FAB Component 節點？

# Sticky Footer

非模態、置底常駐的操作列，不變暗背景、頁面仍可互動，用於承載頁面主要 CTA（送出報價、確認付款等）。可獨立掛在頁面底部，也可嵌入 [BottomSheet](bottom-sheet.md) 內作為底部操作列（combo 用法，`hasStickyFooter` property）。

> **元件邊界**：與 BottomSheet（模態、變暗背景、可關閉的置底容器）明確區分；Sticky Footer 不阻斷頁面互動，也不具備開關/關閉行為。

_來源：Flutter codebase（`fdtigermaster_app` v2.6.1）審查，`ScaffoldBottomSheet`（`lib/component/bottom_sheet/scaffold_bottom_sheet.dart`）為主容器，`QuotationSubmitBottomSection` 為 `Button + Slot` 代表案例（3 個報價相關畫面共用）；Figma Component 已建立_
_最後更新：2026-07-17 — 新增 `Reserve Home Indicator` Boolean，翻盤原「安全區不進 Figma」的舊規則_

---

## Variants

| 維度 | 值 |
|------|-----|
| Content | `Button only`（純按鈕）／`Button + Slot`（按鈕固定於下，上方彈性 slot 放輔助內容，如金額摘要 Pill）／`Flexible Slot`（完全自訂內容，不含固定按鈕，例外情況逃生艙） |
| Button | 固定滿版寬度，複用 [Button](button.md) `primary filled` variant |
| Reserve Home Indicator（Boolean） | 開＝內嵌 [HomeIndicator](home-indicator.md) instance；關＝不顯示 |

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 陰影 | `Elevation/Rise` | 現況 `ScaffoldBottomSheet` 硬編碼 grey 0.15 opacity，屬既有技術債，`elevation.md` 已記錄 |
| 背景 | `Background/Surface` | |
| Padding | `Spacing/16`（四邊統一） | 現況硬編碼 top:16/bottom:28，28px 不對應任何 token，改用統一 16px；`Button + Slot` 內 Slot 與 Button 間距另用 `Spacing/16` |

## 使用規則

**用於：**
- 頁面主要 CTA 置底常駐、需要保持頁面其餘互動的情境
- 嵌入 BottomSheet 內當底部操作列（combo 用法）

**避免：**
- 需要阻斷頁面互動並變暗背景的情境 → 改用 [BottomSheet](bottom-sheet.md) 或 Dialog

## 邊界情況

- **`Button + Slot` 內容過寬** → Slot 撐滿全寬，內容超出自動換行，無需特別處理

## 已翻盤的舊規則

原（2026-07-09）：「底部安全區域（Home Indicator）純行為規則，`Spacing/16` 之外疊加安全區域內距，Flutter 用 `SafeArea` 處理，不寫入 Figma 視覺規格（比照 Dialog 鍵盤避讓規則）」。此規則前提是「畫面不畫 HomeIndicator」，現已因「所有完整畫面都要顯示 HomeIndicator」的決策不再成立，正式翻盤——改用 `Reserve Home Indicator` Boolean 直接內嵌 HomeIndicator instance。詳見 [HomeIndicator](home-indicator.md)。

## Flutter Widget

| Flutter Class | 對應角色 |
|--------------|---------|
| `ScaffoldBottomSheet` | 主容器（掛 `Scaffold.bottomSheet`） |
| `QuotationSubmitBottomSection` | `Button + Slot` 現況參考實作（金額 Pill + CTA） |

## Figma 元件

**位置**：[TigerMaster-Design-System → Sticky Footer](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=706-2421)

---

## 待釐清事項（TBD）

- 無

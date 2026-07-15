# ChatBackground

聊天室頁面的背景層，位於訊息泡泡下方；`Watermark` 變體用於防止客服對話截圖遭假冒。

_來源：Figma（TigerMaster-Design-System → Chatroom 頁面）＋ Flutter codebase（`fdtigermaster_app` v2.6.1）`to_admin_chatroom.dart` 浮水印實作比對；Figma 現況為 2 個獨立 symbol，尚未建立正式 Component_
_最後更新：2026-07-15_

---

## Variants

| 維度 | 值 |
|------|-----|
| Type | `Default`（純底色）／`Watermark`（疊加品牌浮水印：「師傅來了 客服」字樣+品牌 icon，重複平鋪）|

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 底色 | `Background/Page` | `Default`／`Watermark` 共用 |
| Watermark 素材 | 固定資產（非 token） | 重複平鋪、透明度 0.05、scale 1.2 |

## 使用規則

**用於：**
- 聊天室頁面最底層背景

**`Watermark` 使用時機：**
- 僅限「與客服對話」情境（對應 [ChatAppBar](chat-app-bar.md) 的 `To Admin` variant），用途為防假冒／識別客服對話
- 其餘三種情境（`To Client`／`To Master`／`Admin Mode`）一律用 `Default`

## 邊界情況

- `Admin Mode`（客服端自己的畫面）現況背景色為 `rgba(250,250,250,1)`，與 `Background/Page`（`#F5F5F5`）非常接近但非完全一致 token 值，屬現況實作落差（技術債）

## Flutter Widget

| Flutter Class | 對應 Variant |
|--------------|-------------|
| `to_admin_chatroom.dart:50-56`（`DecorationImage` + `assets/images/to_admin_chatroom_watermark.png`） | `Watermark` |
| 其餘聊天室頁面（純色背景，無共用元件） | `Default` |

## Figma 元件

**位置**：[TigerMaster-Design-System → Chatroom](https://www.figma.com/design/X00A5f1Ohj9BhgbMXwzNuM/TigerMaster-Design-System?node-id=831-61)

---

## 待釐清事項（TBD）

- 無

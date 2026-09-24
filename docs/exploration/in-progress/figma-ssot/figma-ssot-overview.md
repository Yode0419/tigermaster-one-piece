# Figma SSOT：App 正式畫面的唯一維護來源

## 概述

- **類型**：設計方法論／Design Ops
- **受影響角色**：設計團隊；間接影響工程與客服查閱畫面的方式
- **狀態**：進行中（階段 1）
- **開始**：2026-09-17

---

## 背景

- App 正式畫面在 Figma 沒有單一維護位置，無法確定哪一份才是現行版本。
- 既有盤點（WIDGET_AUDIT）只是線索清單，不能直接當 Figma 分類依據。

## 目標

讓 Figma 成為 App 正式畫面的唯一維護來源：每個現行畫面在 Figma 有一個固定位置，新功能在迭代稿設計，上架後依實際結果更新回主檔。

## 範圍

- 納入：客戶端、師傅端、App 管理員模式（不等於 Web 後台）。
- 檔案慣例沿用 [File Handbook](../../../design-ops/file-maintenance/figma-file-handbook.md)。
- 畫面尺寸依 [Frame 尺寸標準](../../completed/frame-size-standard/frame-size-standard.md) 採 393×852：階段 1 的 placeholder 與階段 3 重畫的畫面都用此尺寸；既有 375×812 畫面不搬進主檔，移入 Archive。

---

## 階段

本文件只記錄階段層級的狀態，階段開始或結束時才更新。階段內的細節（任務、待解問題、確認紀錄、提案版本）一律看該階段自己的進度位置。

| 階段 | 內容 | 進行位置 | 狀態 |
|---|---|---|---|
| 1. 盤點與架構制定 | 以 Flutter 程式為依據盤點 App，定出三個角色檔案的 `Page → Section → Frame` 架構，產出給 Figma agent 的建置交接包 | Flutter repo `docs/figma-ssot/`，進度見其 `TODO.md` | 進行中 |
| 2. Figma 建立架構 | Figma agent 依交接包建立角色檔案與空白 placeholders | Figma | 未開始 |
| 3. 畫面填入 | 用 Design System 元件把現行 App 畫面以 393×852 全部重畫進各 placeholder；接手 frame-size-standard 的舊畫面遷移工作 | Figma；分批方式待定 | 未開始 |
| 4. 上架後維護流程 | 新版上架後從迭代稿更新回主檔的流程；Flutter repo README 第 10 節已有草稿 | 定案後整理進 `docs/design-ops/` | 未開始 |

Flutter repo 本機路徑：`C:\Users\yode0\develop\source_code\android_app_2.6.1\fdtigermaster_app`

---

## 關聯

- [Figma 檔案整理與 Design Ops 方法論](../../completed/figma-organization/decision-summary.md)：本專案的前一步，建立了 File Handbook
- 全部階段完成後，以 `/robin` 將定案的維護規則整理進 `docs/design-ops/`

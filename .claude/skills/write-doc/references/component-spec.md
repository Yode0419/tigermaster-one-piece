# Component Specification Template

For a single UI component — its variants, design token mapping, usage rules, Flutter widget mapping, and Figma library status.

One document per component. File under `docs/design-system/components/`.

```markdown
# [元件名稱]

[一句話說明：這個元件是什麼、它解決什麼使用者問題。]

## Variants

| 維度 | 值 |
|------|-----|
| Style | Primary / Secondary / Ghost |
| Size | Large / Medium / Small |
| State | Default / Disabled / Loading / Error |

## Design Tokens

| 屬性 | Token | 備註 |
|------|-------|------|
| 背景色 | `color.brand.primary` | Primary style only |
| 文字色 | `color.text.on-primary` | |
| 圓角 | `radius.md` | |
| 水平 padding | `spacing.16` | |

## 使用規則

**用於：**
- [適用情境]

**避免：**
- [不適用情境或錯誤用法]

## 邊界情況

- [邊界情境與處理方式]

## Flutter Widget

| Flutter Class | 對應 Variant |
|--------------|-------------|
| `ElevatedButton` | Primary |
| `OutlinedButton` | Secondary |

## Figma 狀態

- [ ] 已建立為 Figma Component（TigerMaster-Design-System）
- **目前位置**：[現有位置，或「尚未建立」]
- **下一步**：[Figma 中需要做的具體動作]

---

## 待釐清事項（TBD）

- [ ] [需要後續確認的規格]
```

# ldr-marketing 项目说明（指针文件，刻意不复制正文）

本仓库是 LDR（Lighting Design Rendering）平台的**营销站**（Astro，GitHub Desktop push → 自动部署）。
跨仓库纪律的**唯一真值在平台仓库**，这里只放指针——两站文案曾因"各自维护、无同步机制"漂移过（2026-07-30 有效期文案），复制一份到这里就是再造一个漂移源。

平台仓库同机路径：`C:\Users\yuying\Desktop\Lighting Design Rendering\`（相对本仓库 `../Lighting Design Rendering/`）。

## 改以下内容前，先读平台仓库 `.claude/rules/` 里对应文件

| 你要改的 | 先读 | 本仓库涉及的文件 |
|---|---|---|
| 🔴 定价 / FAQ / 支付方式 / 条款 / 退款 / 隐私文案（对外承诺，两仓一起改） | `cross-repo-pricing-legal.md` | `src/i18n/ui.ts`（`faq.*` / `pricing.*` / `announcement.text`，五语各改各的键，ja/ko/de 不列支付宝）、`src/pages/{terms,refund,privacy}.astro`（只有英文版，平台的法务页外链到这里）、`src/components/PricingTable.astro` |
| logo / favicon / og-image / apple-touch-icon | `cross-repo-brand.md` | `public/` 下 5 个文件是从平台 `npm run gen:logo` 产物**拷来的**，本仓库没有几何源也没有生成脚本，不要在这里手改；Nav/Footer 内联的是 `logo-mark.svg`（白壳，暗底专用），不要换成 `favicon.svg` |
| showcase 缩略图 | `cross-repo-thumbnails.md` | `src/lib/supabase.ts` 的 `toThumbUrl()` 靠字符串把原图 URL 推导成 `_thumb.jpg`，规则由平台 `api/showcase.ts` 定义；营销站只展示官方案例（`submitted_by IS NULL`）；用途页分类过滤"看似坏了"是刻意保留的回退，别修 |
| 术语 / 新语言 | 平台 `i18n.md` | `src/i18n/glossary.md` 是两站唯一术语来源（96 条 × 7 语），新术语先加这里 |

## 本仓库自身的固定事实

- 强制暗色（`<html class="dark">`），`theme-color` 单值 `#0D0D0D`，不要照搬平台的亮/暗 media-query 对。
- 营销站 → 产品站链接带 `?lng=<lang>`（`appUrl.ts`）。
- **验证必须看构建产物**：`npm run build` 后 grep `dist/**/*.html`，只 grep 源码会漏掉硬编码。
- 有 `ar` 页面，但产品站 `?lng=ar` 会回落英文（RTL 另立期）。

## 协作约定

称呼用户为「老余」；改前先给计划再动手；改动超过 3 个文件先确认；收尾给变更文件清单供 GitHub Desktop 核对。

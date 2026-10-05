import type { Lang } from "../i18n/ui";

/**
 * 指向产品站的所有入口链接都从这里生成。
 *
 * 收敛之前这个域名在 5 个组件里各写了一遍（Nav / Hero / CTABanner /
 * PricingTable / Footer），换域名要改 5 处，而且没有任何东西会提醒你漏了哪处。
 */
const APP_ORIGIN = "https://app.ldr-design.com";

/**
 * 是否给产品站链接附加 UTM 参数。**2026-10-05 起打开。**
 *
 * 产品站（另一个仓库）已接住信号：`src/lib/attribution.ts` 在用户**首次**访问时把
 * referrer 类别 + utm_* + lng + 落地页类型记进 localStorage `ldr_first_touch`（不存完整 URL），
 * 登录后随 `identify` 埋点上报一次（meta.ft_*），周报 `funnel-report.mjs`「来源」节按注册队列归类。
 * 产品站自 2026-09-13 起整站 `noindex`，带参数的 URL 不会被当成重复页面收录。
 *
 * 取值（产品站会清洗为小写 [a-z0-9_-]、≤40 字符，改取值请守住这个字符集）：
 *   utm_source   = "ldr-website"（固定：来自营销站）
 *   utm_medium   = "cta"（固定：站内入口按钮 / 链接）
 *   utm_campaign = 链接位置 placement（nav / hero / cta-banner / footer / pricing-<套餐>）
 * 语区不进 utm：`?lng=` 已带上且产品站同样记录（ft_lng），重复一份只会让 URL 变长。
 *
 * 为什么非得用 UTM，不能只靠 referrer：
 * 浏览器默认的 Referrer-Policy: strict-origin-when-cross-origin 在跨 origin
 * 跳转时只发 origin、不发路径，产品站拿到的 referrer 永远是
 * https://www.ldr-design.com/ —— 区分不出是哪个按钮、哪个语区。
 * （Nav 和 Footer 的产品站链接 2026-10-05 起由 rel="noopener noreferrer" 改为 rel="noopener"，
 * 不再抹掉 origin；外链第三方站点的 noreferrer 不动。）
 *
 * 注意：这个开关只管**站内**链接。在站外投放时手写 UTM
 * （LinkedIn、行业社群、投稿）不依赖本文件，随时可用，且是 UTM 更主要的用途 ——
 * 站外渠道只能靠 UTM 区分；手写时同样只用小写字母数字与 - _。
 */
const UTM_ENABLED = true;

/**
 * 链接在页面上的位置，启用 UTM 后作为 utm_campaign。
 * 写成类型而不是注释里的约定，是为了在编辑器里能补全、改名时能被找到。
 */
export type CtaPlacement =
  | "nav"
  | "hero"
  | "cta-banner"
  | "footer"
  | `pricing-${string}`;

/**
 * 生成指向产品站的链接。
 *
 * @param path      产品站上的路径，如 "/" 或 "/pricing"
 * @param lang      当前页面语言，作为 ?lng= 交给产品站（i18n + 首触归因的 ft_lng）
 * @param placement 链接位置，启用 UTM 后作为 utm_campaign
 */
export function appLink(
  path: string,
  lang: Lang,
  placement: CtaPlacement
): string {
  const url = new URL(path, APP_ORIGIN);

  // 语言交接（2026-08-26 多语言第一期）：两个域的 localStorage 互不相通，产品站靠 ?lng=
  // 接住用户在营销站选的语言（产品站 i18n 检测顺序 querystring → localStorage → navigator，
  // 命中即写入 localStorage，之后不再依赖 URL）。产品站尚未开放的语言会回落英文，无副作用。
  url.searchParams.set("lng", lang);

  if (UTM_ENABLED) {
    url.searchParams.set("utm_source", "ldr-website");
    url.searchParams.set("utm_medium", "cta");
    url.searchParams.set("utm_campaign", placement);
  }

  return url.href;
}

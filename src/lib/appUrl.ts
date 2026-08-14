import type { Lang } from "../i18n/ui";

/**
 * 指向产品站的所有入口链接都从这里生成。
 *
 * 收敛之前这个域名在 5 个组件里各写了一遍（Nav / Hero / CTABanner /
 * PricingTable / Footer），换域名要改 5 处，而且没有任何东西会提醒你漏了哪处。
 */
const APP_ORIGIN = "https://app.ldr-design.com";

/**
 * 是否给产品站链接附加 UTM 参数。**现在关着。**
 *
 * UTM 只是「发信号」——产品站不读它，参数就只是让 URL 变长，
 * 还可能被 Google 当成重复页面索引（若产品站落地页没有 canonical）。
 * 打开它之前，产品站（另一个仓库）要先接住信号：
 *   1. 落地时读 location.search 里的 utm_*
 *   2. 存进 sessionStorage —— 用户通常要逛几页才注册
 *   3. 注册时写进 Supabase 的 user metadata
 * 这三步做完，才能回答「韩语站带来了几个注册」。在那之前开启 UTM 是纯负债。
 *
 * 为什么非得用 UTM，不能靠 referrer 判断来源语区：
 * 浏览器默认的 Referrer-Policy: strict-origin-when-cross-origin 在跨 origin
 * 跳转时只发 origin、不发路径，产品站拿到的 referrer 永远是
 * https://www.ldr-design.com/ —— 区分不出 /ko/ 还是 /de/。
 * 而 Nav 和 Footer 的链接另外带了 rel="noreferrer"，那两处索性连 origin 都没有。
 *
 * 注意：这个开关只管**站内**链接。在站外投放时手写 UTM
 * （LinkedIn、行业社群、投稿）不依赖产品站，随时可用，且是 UTM 更主要的用途 ——
 * 站内语区 Vercel Analytics 看路径就知道了，站外渠道只能靠 UTM 区分。
 */
const UTM_ENABLED = false;

/**
 * 链接在页面上的位置，启用 UTM 后作为 utm_content。
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
 * @param lang      当前页面语言，启用 UTM 后作为 utm_campaign（分析时按语区分组）
 * @param placement 链接位置，启用 UTM 后作为 utm_content
 */
export function appLink(
  path: string,
  lang: Lang,
  placement: CtaPlacement
): string {
  const url = new URL(path, APP_ORIGIN);

  if (UTM_ENABLED) {
    url.searchParams.set("utm_source", "marketing");
    url.searchParams.set("utm_medium", "referral");
    url.searchParams.set("utm_campaign", lang);
    url.searchParams.set("utm_content", placement);
  }

  return url.href;
}

import { ui, defaultLang, languages, type Lang } from "./ui";
import { routeExistsIn } from "./routes";
import {
  assertTranslationsComplete,
  assertCoversAllLangs,
} from "./validate";

/** 非默认语言的 URL 前缀，如 ["zh", "ja", "de"]。默认语言 en 无前缀。 */
const prefixedLangs = (Object.keys(languages) as Lang[]).filter(
  (l) => l !== defaultLang
);

/**
 * 匹配路径开头的语言前缀。
 *
 * `(?=\/|$)` 这个前瞻是必须的：没有它，`/dexter` 会被当成 `/de` 前缀 + `xter`，
 * 静默把德语前缀吃掉。前缀列表从 languages 生成，新增语言不用改这里。
 */
const LANG_PREFIX_RE = new RegExp(`^/(${prefixedLangs.join("|")})(?=/|$)`);

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return (ui[lang] as Record<string, string>)[key] ?? ui[defaultLang][key];
  };
}

/** 去掉语言前缀，得到与语言无关的路径（`/ja/pricing` → `/pricing`，`/` → `/`）。 */
export function stripLangPrefix(pathname: string): string {
  return pathname.replace(LANG_PREFIX_RE, "") || "/";
}

/** 当前语言之外的其他语言，用于语言切换菜单。顺序沿用 languages 的声明顺序。 */
export function getOtherLangs(lang: Lang): Lang[] {
  return (Object.keys(languages) as Lang[]).filter((l) => l !== lang);
}

/**
 * 该语言是否有博客（无对应页面就不放导航入口，避免点进 404）。
 * 判据是 src/pages/<lang>/blog 是否存在，不是手工维护的语言清单。
 */
export function hasBlog(lang: Lang): boolean {
  return routeExistsIn("/blog", lang);
}

/**
 * 把任意路径转换成指定语言的路径。传入路径可带可不带语言前缀，
 * 内部一律先剥再拼，因此 `getLocalizedPath("/zh/pricing", "de")` → `/de/pricing`。
 */
export function getLocalizedPath(path: string, lang: Lang): string {
  const clean = stripLangPrefix(path).replace(/\/$/, "") || "/";
  if (lang === defaultLang) return clean;
  return `/${lang}${clean === "/" ? "" : clean}`;
}

/**
 * `<html lang>` 的值。zh 用 zh-CN（简体，与 sitemap 声明一致）；
 * ja/de 用无地区码的形式 —— 内容面向整个语区（de 覆盖 DE/AT/CH），
 * 加地区码反而会让搜索引擎把其他地区排除在外。
 */
const HTML_LANG: Record<Lang, string> = {
  en: "en",
  zh: "zh-CN",
  ja: "ja",
  de: "de",
};

/** Open Graph 的 og:locale 需要 language_TERRITORY 格式，这里必须带地区码。 */
const OG_LOCALE: Record<Lang, string> = {
  en: "en_US",
  zh: "zh_CN",
  ja: "ja_JP",
  de: "de_DE",
};

/** toLocaleDateString 用的 BCP 47 标签（日期格式：de 是 "10. August 2026"，ja 是 "2026年8月10日"）。 */
const DATE_LOCALE: Record<Lang, string> = {
  en: "en-US",
  zh: "zh-CN",
  ja: "ja-JP",
  de: "de-DE",
};

/**
 * 构建期自检。这三张表和 ui.ts 的文案表漏了语言都是**静默降级**
 * （新语言的页面会标成 `<html lang="en">`、译文里混进英文句子），
 * 而 astro build 不做类型检查，Record<Lang, …> 挡不住。所以在这里断言。
 * 见 ./validate.ts 的说明。
 */
assertTranslationsComplete();
assertCoversAllLangs("HTML_LANG", HTML_LANG);
assertCoversAllLangs("OG_LOCALE", OG_LOCALE);
assertCoversAllLangs("DATE_LOCALE", DATE_LOCALE);

export function htmlLang(lang: Lang): string {
  return HTML_LANG[lang];
}

export function ogLocale(lang: Lang): string {
  return OG_LOCALE[lang];
}

export function dateLocale(lang: Lang): string {
  return DATE_LOCALE[lang];
}

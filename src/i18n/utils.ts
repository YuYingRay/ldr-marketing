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
  ko: "ko",
  de: "de",
};

/**
 * `<html dir>`。当前七种语言里还没有从右往左书写的，这张表先立起来，
 * 是为了让版式层能提前变成方向感知的。
 *
 * 不设 dir 的后果不是"排版略歪"：RTL 语言下标点会跑到句子另一端、
 * 列表符号和引用竖线全在错误的一侧，而逻辑属性（start-/end-、margin-inline）
 * 会失去判断依据按 LTR 解析。
 *
 * 这张表正是 start-/end- 这类逻辑类名生效的前提：Tailwind 生成的
 * `inset-inline-start` 由浏览器按 dir 解析，dir 不对就等于写死了 left。
 *
 * 加阿拉伯语（ar）、希伯来语（he）、波斯语（fa）、乌尔都语（ur）时，
 * 在这里写 "rtl" 即可，版式无需再改 —— 站点的布局用的是 flex gap
 * 与对称内边距，本身方向中立。
 */
const TEXT_DIR: Record<Lang, "ltr" | "rtl"> = {
  en: "ltr",
  zh: "ltr",
  ja: "ltr",
  ko: "ltr",
  de: "ltr",
};

/** Open Graph 的 og:locale 需要 language_TERRITORY 格式，这里必须带地区码。 */
const OG_LOCALE: Record<Lang, string> = {
  en: "en_US",
  zh: "zh_CN",
  ja: "ja_JP",
  ko: "ko_KR",
  de: "de_DE",
};

/** toLocaleDateString 用的 BCP 47 标签（日期格式：de 是 "10. August 2026"，ja 是 "2026年8月10日"）。 */
const DATE_LOCALE: Record<Lang, string> = {
  en: "en-US",
  zh: "zh-CN",
  ja: "ja-JP",
  ko: "ko-KR",
  de: "de-DE",
};

/**
 * 构建期自检。这三张表和 ui.ts 的文案表漏了语言都是**静默降级**
 * （韩语页会标成 `<html lang="en">`、韩文里混进英文句子），
 * 而 astro build 不做类型检查，Record<Lang, …> 挡不住。所以在这里断言。
 * 见 ./validate.ts 的说明。
 */
assertTranslationsComplete();
assertCoversAllLangs("HTML_LANG", HTML_LANG);
assertCoversAllLangs("TEXT_DIR", TEXT_DIR);
assertCoversAllLangs("OG_LOCALE", OG_LOCALE);
assertCoversAllLangs("DATE_LOCALE", DATE_LOCALE);

export function htmlLang(lang: Lang): string {
  return HTML_LANG[lang];
}

/** `<html dir>` 的值。见上方 TEXT_DIR 的说明。 */
export function textDir(lang: Lang): "ltr" | "rtl" {
  return TEXT_DIR[lang];
}

export function ogLocale(lang: Lang): string {
  return OG_LOCALE[lang];
}

export function dateLocale(lang: Lang): string {
  return DATE_LOCALE[lang];
}

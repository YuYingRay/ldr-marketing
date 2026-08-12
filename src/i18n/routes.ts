import { defaultLang, languages, type Lang } from "./ui";

/**
 * 「这条路由在哪些语言下真实存在」—— 从 src/pages 下的**实际文件**推导，不手工维护。
 *
 * 为什么必须这样做：站点里并非每个页面都有全部语言版本。博客只有 en/zh，
 * 法律页（/privacy、/terms、/refund）只有 en。之前这件事是靠 Head.astro 里
 * 一句 `isBlogPath` 特判处理的 —— 结果加日语/德语时漏掉了法律页那一类，
 * 三个法律页对外声明了 /zh/privacy/、/ja/privacy/ 等**四个不存在的 URL**：
 * 用户在页脚点语言切换会 404，Google 抓到 404 的 alternate 会把整组
 * hreflang 声明作废。特判清单每加一种语言、每加一类页面就会再漏一次。
 *
 * 现在改为唯一事实来源：页面文件在，语言就在；文件不在，就不声明。
 * 以后补韩语博客，只要新建 src/pages/ko/blog/ 下的文件，
 * hreflang、sitemap 互链、导航里的博客入口会同时自动生效。
 *
 * import.meta.glob 由 Vite 在构建期静态展开成文件名列表，不会真的加载模块，
 * 运行时零成本。
 */
const PAGE_FILES = Object.keys(import.meta.glob("/src/pages/**/*.astro"));

const LANG_CODES = new Set(Object.keys(languages));

/** "/src/pages/zh/use-cases/[slug].astro" → { lang: "zh", route: "/use-cases/[slug]" } */
function parsePageFile(file: string): { lang: Lang; route: string } {
  const stripped = file
    .replace(/^\/src\/pages\//, "")
    .replace(/\.astro$/, "")
    .replace(/(^|\/)index$/, "$1"); // 目录下的 index 就是目录本身

  const segments = stripped.split("/").filter(Boolean);
  let lang: Lang = defaultLang;
  if (segments.length > 0 && LANG_CODES.has(segments[0])) {
    lang = segments.shift() as Lang;
  }
  return { lang, route: "/" + segments.join("/") };
}

const routeLangs = new Map<string, Set<Lang>>();
for (const file of PAGE_FILES) {
  const { lang, route } = parsePageFile(file);
  const key = route.replace(/\/$/, "") || "/";
  if (!routeLangs.has(key)) routeLangs.set(key, new Set());
  routeLangs.get(key)!.add(lang);
}

if (routeLangs.size === 0) {
  // glob 失效会让全站 hreflang 静默退化成"只有英文"，宁可构建失败
  throw new Error(
    "[i18n] 未能从 src/pages 读取到任何页面文件，路由语言表为空。"
  );
}

/** 按 languages 的声明顺序输出，保证 hreflang 与语言菜单的顺序稳定 */
function inDeclaredOrder(set: Set<Lang>): Lang[] {
  return (Object.keys(languages) as Lang[]).filter((l) => set.has(l));
}

/**
 * 给定**已去掉语言前缀**的路径，返回该页面真实存在的语言列表。
 *
 * 动态路由要还原成文件名里的形式再查表：
 *   /use-cases/architectural-lighting → /use-cases/[slug]
 *   /blog/how-to-create-…             → /blog/[...slug]
 */
export function getLangsForRoute(path: string): Lang[] {
  const clean = path.replace(/\/$/, "") || "/";

  const exact = routeLangs.get(clean);
  if (exact) return inDeclaredOrder(exact);

  const segments = clean.split("/").filter(Boolean);

  // 末段是动态参数：/use-cases/[slug]
  if (segments.length > 0) {
    const asSlug = "/" + [...segments.slice(0, -1), "[slug]"].join("/");
    const hit = routeLangs.get(asSlug);
    if (hit) return inDeclaredOrder(hit);
  }

  // rest 参数，从最深一级往上找：/blog/[...slug]
  for (let i = segments.length - 1; i >= 0; i--) {
    const asRest = "/" + [...segments.slice(0, i), "[...slug]"].join("/");
    const hit = routeLangs.get(asRest);
    if (hit) return inDeclaredOrder(hit);
  }

  return [defaultLang];
}

/** 某条路由在该语言下是否存在（导航要不要放这个入口、语言切换要不要指向本页）。 */
export function routeExistsIn(path: string, lang: Lang): boolean {
  return getLangsForRoute(path).includes(lang);
}

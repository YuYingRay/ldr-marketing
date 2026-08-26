import { getCollection } from "astro:content";
import { languages, type Lang } from "./ui";
import { assertCoversAllLangs } from "./validate";

/**
 * 「**这一篇**文章有哪些语言版本」—— 逐篇推导。
 *
 * 为什么不能沿用 routes.ts：那里回答的是「这条**路由**在哪些语言下存在」，
 * 判据是 src/pages 下有没有对应文件。对 /pricing 这种一页一文件的静态页是对的，
 * 但博客是 [...slug] 动态路由 —— 一个路由文件对应几十篇文章，
 * 存在性是**逐篇**的，不是逐路由的。
 *
 * 沿用路由级答案的后果很具体：只要建出 src/pages/ja/blog/[...slug].astro，
 * 那些只有 en/zh 版本的旧文章会立刻对外声明 hreflang="ja"，
 * 指向一个根本不存在的 URL。Google 抓到 404 的 alternate 会**作废整组互链声明**，
 * 连本来正确的 en↔zh 一起废掉；用户在语言菜单点日语则直接 404。
 * 这正是 routes.ts 当初要解决的那类问题，只是换了一层 —— 路由级已经修好了，
 * 条目级还没有。
 *
 * 结论：静态页问 routes.ts，博客文章问这里。
 */

/** 语言 → 该语言的博客集合名。与 content.config.ts 的 collections 必须一致。 */
const BLOG_COLLECTIONS = {
  en: "blog",
  zh: "blog-zh",
  ja: "blog-ja",
  ko: "blog-ko",
  de: "blog-de",
  ar: "blog-ar",
  tr: "blog-tr",
} as const;

// astro build 不做类型检查，Record<Lang, …> 挡不住漏配；漏了会静默少声明一种语言
assertCoversAllLangs("BLOG_COLLECTIONS", BLOG_COLLECTIONS);

/**
 * 索引只建一次。缓存的是 Promise 而不是结果 —— 页面是并发渲染的，
 * 缓存结果会让多个页面同时进入构建流程，各建一遍。
 */
let indexPromise: Promise<Map<string, Set<Lang>>> | null = null;

async function buildIndex(): Promise<Map<string, Set<Lang>>> {
  const index = new Map<string, Set<Lang>>();

  for (const lang of Object.keys(languages) as Lang[]) {
    // 集合名是运行期字符串，astro:content 的类型签名要求字面量，这里断言绕过
    const posts = await getCollection(BLOG_COLLECTIONS[lang] as "blog");
    for (const post of posts) {
      // 不过滤 draft：判据是「这个 URL 会不会被构建出来」，而 [...slug] 的
      // getStaticPaths 并不过滤 draft（draft 只影响列表页是否收录）。
      // 这里跟着实际产物走，否则会漏声明一个真实存在的页面。
      if (!index.has(post.id)) index.set(post.id, new Set());
      index.get(post.id)!.add(lang);
    }
  }

  return index;
}

/**
 * 给定 slug，返回**真实拥有**这篇文章的语言，按 languages 的声明顺序。
 * 结果直接喂给 Head.astro 的 hreflang 和 Nav.astro 的语言切换器。
 */
export async function getBlogPostLangs(slug: string): Promise<Lang[]> {
  indexPromise ??= buildIndex();
  const index = await indexPromise;
  const langs = index.get(slug);
  if (!langs) return [];
  return (Object.keys(languages) as Lang[]).filter((l) => langs.has(l));
}

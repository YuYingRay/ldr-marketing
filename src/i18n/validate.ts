import { ui, defaultLang, languages, type Lang } from "./ui";

/**
 * 多语言配置的构建期自检。
 *
 * 为什么需要：加一种语言要同时改 6 处结构（ui.ts 的文案块、utils.ts 的三张
 * locale 映射表、useCases.ts 的场景长文案、页面壳……），其中**三处漏配是静默的**——
 * `ui[lang][key] ?? ui.en[key]` 会把漏掉的文案悄悄换成英文，
 * `HTML_LANG[lang] ?? HTML_LANG.en` 会把漏配的语言悄悄标成 `<html lang="en">`。
 * 构建照常通过，线上韩语页里混着英文句子，没人会发现。
 *
 * TypeScript 的 `Record<Lang, …>` 本来能挡住其中一部分，但 `astro build` 不做类型
 * 检查（只做转译），所以类型约束在真实的部署路径上等于不存在。这里改用运行期断言：
 * 这些模块在构建时一定会被页面 import，断言失败 = 构建失败 = 错误上不了线。
 *
 * 允许缺失的结构不在这里校验（例如 i18n/showcase.ts 的案例词典是
 * `Partial<Record<Lang, …>>`，查不到就回落英文原文，这是有意设计）。
 */

/**
 * 允许取空串的键。空串在 useTranslations 里**不会**触发 fallback，
 * 它是"这一条不渲染"的显式表达，与"忘了翻译"必须区分开。
 */
const MAY_BE_EMPTY = [
  "announcement.text", // 空 = 整条公告条不渲染（只有中文站在用）
  ".localPrice", // 空 = 不显示本币参考价（英文站以 USD 为准）
];

function mayBeEmpty(key: string): boolean {
  return MAY_BE_EMPTY.some((p) => key === p || key.endsWith(p));
}

function fail(problems: string[]): never {
  throw new Error(
    `[i18n] 多语言配置不完整，构建中止：\n  - ${problems.join("\n  - ")}\n` +
      `修复后重新构建。新增语言的完整清单见 src/i18n/ui.ts 的 languages 注释。`
  );
}

/** ui.ts：每种语言的键集合必须与默认语言**完全一致**（既不缺也不多）。 */
export function assertTranslationsComplete(): void {
  const reference = Object.keys(ui[defaultLang]);
  const referenceSet = new Set(reference);
  const problems: string[] = [];

  for (const lang of Object.keys(languages) as Lang[]) {
    const table = ui[lang] as Record<string, string>;

    const missing = reference.filter((k) => !(k in table));
    if (missing.length) {
      problems.push(
        `ui.${lang} 缺 ${missing.length} 个键：${missing.slice(0, 8).join(", ")}` +
          (missing.length > 8 ? " …" : "")
      );
    }

    // 多出来的键是死文案：写了却没有任何页面会读到它（拼错键名时最常见）
    const extra = Object.keys(table).filter((k) => !referenceSet.has(k));
    if (extra.length) {
      problems.push(
        `ui.${lang} 多出 ${extra.length} 个键（${defaultLang} 里没有，不会被渲染）：${extra.join(", ")}`
      );
    }

    const blank = Object.keys(table).filter(
      (k) => referenceSet.has(k) && table[k].trim() === "" && !mayBeEmpty(k)
    );
    if (blank.length) {
      problems.push(
        `ui.${lang} 有 ${blank.length} 个键是空串（会渲染成空白，而不是回落英文）：${blank.join(", ")}`
      );
    }
  }

  if (problems.length) fail(problems);
}

/** 按语言索引的映射表（locale 码、场景长文案……）必须覆盖每一种语言。 */
export function assertCoversAllLangs(
  label: string,
  record: Partial<Record<Lang, unknown>>
): void {
  const missing = (Object.keys(languages) as Lang[]).filter(
    (l) => record[l] == null
  );
  if (missing.length) {
    fail([`${label} 缺少语言：${missing.join(", ")}`]);
  }
}

/** 二维表（语言 × 条目）必须每种语言都覆盖全部条目。 */
export function assertCoversAllLangsAndKeys(
  label: string,
  record: Partial<Record<Lang, Record<string, unknown>>>,
  innerKeys: readonly string[]
): void {
  assertCoversAllLangs(label, record);
  const problems: string[] = [];
  for (const lang of Object.keys(languages) as Lang[]) {
    const inner = record[lang]!;
    const missing = innerKeys.filter((k) => inner[k] == null);
    if (missing.length) {
      problems.push(`${label}.${lang} 缺条目：${missing.join(", ")}`);
    }
  }
  if (problems.length) fail(problems);
}

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export interface Showcase {
  id: string;
  sort_order: number;
  prompt: string;
  prompt_zh?: string;
  category: string;
  day_image_url: string;
  night_image_url: string;
}

const BASE_COLUMNS =
  "id, sort_order, prompt, category, day_image_url, night_image_url";

/**
 * 营销站案例数量硬上限。
 * 3 列网格（ShowcaseGrid 的 lg:grid-cols-3）下 18 = 6 个整行，无残缺行。
 * 目前官方案例只有 9 个，这个上限是防御性的：将来官方案例增多时，
 * 营销站首页不会又变成超长页面。
 */
const MARKETING_LIMIT = 18;

/** 平台站 api/showcase.ts 给用户提交的案例硬编码的 sort_order（降级过滤用） */
const USER_SUBMISSION_SORT_ORDER = 9999;

/**
 * 原图 URL → 缩略图 URL。
 *
 * ⚠️ 跨仓库约定（改动前必读）
 * 路径规则由**平台站** `api/showcase.ts` 的 makeShowcaseThumb 决定：
 *     const thumbPath = dest.replace(/\.[^.]+$/, "_thumb.jpg");
 * 缩略图规格见平台站 `api/_lib/thumbnail.ts`：宽 1200px（fit inside，不放大）+ JPEG q75。
 *
 * 营销站靠**字符串推导**拿到这个 URL，属跨仓库隐式耦合。平台站若改路径规则，
 * 这里必须同步 —— 否则营销站会静默退回原图（有 onerror 兜底，页面不会坏，
 * 但会白丢约 76 倍的流量收益，且没人会发现）。平台站 CLAUDE.md 已记录此约定。
 *
 * 2026-07-25 实测：官方 9 个案例的 day+night 缩略图 100% 存在；
 * 原图合计 82.4 MB → 缩略图 1.09 MB。
 *
 * 无扩展名的 URL 不匹配正则、原样返回 → 退化为请求原图，安全。
 */
export function toThumbUrl(url: string): string {
  if (!url) return url;
  return url.replace(/\.[^./?]+(\?.*)?$/, "_thumb.jpg");
}

type OfficialFilter = "submittedByNull" | "sortOrderBelowUserRange";

/**
 * 单次查询尝试。成功返回数组，失败返回 null（由调用方降级）。
 *
 * 排序：sort_order 升序为主；再按 created_at 升序做 tie-breaker ——
 * 若两条案例 sort_order 相同，PostgreSQL 返回顺序是**未定义**的，
 * 那会导致每次 build 顺序漂移，连 Hero 用的 showcases[0] 都会跳变。
 */
async function attempt(
  columns: string,
  filter: OfficialFilter
): Promise<Showcase[] | null> {
  let query = supabase!.from("showcases").select(columns).eq("is_active", true);

  query =
    filter === "submittedByNull"
      ? query.is("submitted_by", null)
      : query.lt("sort_order", USER_SUBMISSION_SORT_ORDER);

  const { data, error } = await query
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true })
    .limit(MARKETING_LIMIT);

  if (error) {
    console.warn(
      `[LDR] showcase query failed (columns=${columns === BASE_COLUMNS ? "base" : "with_zh"}, filter=${filter}): ${error.message}`
    );
    return null;
  }
  return (data as unknown as Showcase[]) ?? [];
}

/**
 * 取营销站要展示的案例。
 *
 * **只取官方/管理员手动上传的案例**，用户在产品站分享的案例不进营销站。
 * 判定依据 = `submitted_by IS NULL`，这是 platform migration
 * `008_showcase_submissions.sql` 明文定义的语义：
 *   「向后兼容：现有管理员手动上传的记录 submitted_by = NULL, status = 'approved'」
 * 相比 `sort_order < 9999`（依赖平台站魔数）或 `limit(9)`（硬编码数量），
 * 这个判定语义正确且自适应 —— 以后在 Supabase 手工加官方案例会自动出现在营销站。
 *
 * 为什么营销站不展示用户案例（2026-07-25 决策）：营销站是品牌门面，需要可控的
 * 精选内容；产品站才是作品社区。用户案例的 category 为 null（平台站
 * api/showcase.ts 硬编码）、prompt 是长篇 AI 提示词甚至为空，混进营销站会
 * 出现空白分类标签 + 技术提示词，拉低门面。产品站首页仍照常展示它们。
 *
 * 三层降级，任一增强项出问题都不会让整站案例区空白；
 * **两种过滤路径都只会返回官方案例**（用户案例 sort_order 恒为 9999）：
 *   1. 中文列 + submitted_by 过滤   ← 理想
 *   2. 基础列 + submitted_by 过滤   ← prompt_zh 列有问题时，宁可丢中文文案
 *   3. 基础列 + sort_order 过滤     ← submitted_by 列不可读时（权限/schema 变更）
 */
export async function getShowcases(lang?: string): Promise<Showcase[]> {
  if (!supabase) {
    console.warn("[LDR] Supabase not configured, returning empty showcases");
    return [];
  }

  const columnsWithZh = `${BASE_COLUMNS}, prompt_zh`;
  const preferred = lang === "zh" ? columnsWithZh : BASE_COLUMNS;

  const ladder: Array<[string, OfficialFilter]> = [
    [preferred, "submittedByNull"],
    ...(preferred === BASE_COLUMNS
      ? []
      : ([[BASE_COLUMNS, "submittedByNull"]] as Array<[string, OfficialFilter]>)),
    [BASE_COLUMNS, "sortOrderBelowUserRange"],
  ];

  for (const [columns, filter] of ladder) {
    const rows = await attempt(columns, filter);
    if (rows) return rows;
  }

  console.error("[LDR] All showcase queries failed, returning empty list");
  return [];
}

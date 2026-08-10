import type { Lang } from "./ui";

/**
 * 案例卡片的 category / prompt 翻译。
 *
 * 这两个字段存在 Supabase 的 showcases 表里，只有英文（中文另有 prompt_zh 列，
 * 由管理员手工填写）。营销站在渲染时按语言查表翻译；**查不到就原样显示英文** ——
 * 新案例上线时不会因为少一条翻译而出现空标签。补翻译＝在下面对应语言的字典里加一行。
 *
 * Hero（首屏对比图的 alt）与 ShowcaseGrid（案例卡片）共用这里，避免两处各写一份
 * 字典后慢慢漂移。
 */

interface ShowcaseLike {
  prompt: string;
  prompt_zh?: string;
  category?: string;
}

const categoryDict: Partial<Record<Lang, Record<string, string>>> = {
  zh: {
    Architecture: "建筑",
    Commercial: "商业",
    Landscape: "景观",
    Urban: "城市",
    Hospitality: "酒店",
    Residential: "住宅",
    Cultural: "文化",
    Industrial: "工业",
    Sports: "体育",
    Public: "公共",
    Park: "公园",
    Bridge: "桥梁",
    Road: "道路",
    Plaza: "广场",
    Waterfront: "滨水",
    Transportation: "交通",
    Art: "艺术",
    Municipal: "市政",
    Education: "教育",
    Healthcare: "医疗",
    Religious: "宗教",
    Heritage: "文保",
    Garden: "园林",
    Retail: "零售",
    Office: "办公",
  },
  ja: {
    Architecture: "建築",
    Commercial: "商業",
    Landscape: "ランドスケープ",
    Urban: "都市",
    Hospitality: "ホスピタリティ",
    Residential: "住宅",
    Cultural: "文化",
    Industrial: "産業",
    Sports: "スポーツ",
    Public: "公共",
    Park: "公園",
    Bridge: "橋梁",
    Road: "道路",
    Plaza: "広場",
    Waterfront: "ウォーターフロント",
    Transportation: "交通",
    Art: "アート",
    Municipal: "行政",
    Education: "教育",
    Healthcare: "医療",
    Religious: "宗教",
    Heritage: "文化財",
    Garden: "庭園",
    Retail: "商業施設",
    Office: "オフィス",
  },
  de: {
    Architecture: "Architektur",
    Commercial: "Gewerbe",
    Landscape: "Landschaft",
    Urban: "Stadtraum",
    Hospitality: "Hotellerie",
    Residential: "Wohnbau",
    Cultural: "Kultur",
    Industrial: "Industrie",
    Sports: "Sport",
    Public: "Öffentlich",
    Park: "Park",
    Bridge: "Brücke",
    Road: "Straße",
    Plaza: "Platz",
    Waterfront: "Uferzone",
    Transportation: "Verkehr",
    Art: "Kunst",
    Municipal: "Kommunal",
    Education: "Bildung",
    Healthcare: "Gesundheit",
    Religious: "Sakralbau",
    Heritage: "Denkmal",
    Garden: "Garten",
    Retail: "Handel",
    Office: "Büro",
  },
};

const promptDict: Partial<Record<Lang, Record<string, string>>> = {
  zh: {
    "Building facade night lighting": "建筑立面夜景照明",
    "Commercial plaza lighting design": "商业广场灯光设计",
    "Airport & transit hub lighting": "机场与交通枢纽照明",
    "Light art installation": "灯光艺术装置",
    "Landscape garden lighting": "景观园林照明",
    "Urban night scene planning": "城市夜景规划",
    "Hotel exterior lighting": "酒店外立面照明",
    "Residential community lighting": "住宅社区照明",
    "Bridge night lighting": "桥梁夜景照明",
    "Park pathway lighting": "公园步道照明",
    "Waterfront promenade lighting": "滨水步道照明",
    "Sports venue lighting": "体育场馆照明",
    "Cultural building lighting": "文化建筑照明",
    "Road & street lighting": "道路街道照明",
    "Plaza public lighting": "广场公共照明",
    "Industrial facility lighting": "工业设施照明",
    "Residential landscape lighting": "住宅景观照明",
    "Cultural tourism night scene": "文旅夜景",
    "Office building facade lighting": "办公楼立面照明",
    "Hotel architecture night rendering": "酒店建筑夜景渲染",
    "Urban planning night vision": "城市规划夜景方案",
  },
  ja: {
    "Building facade night lighting": "建築ファサードの夜景照明",
    "Commercial plaza lighting design": "商業広場の照明デザイン",
    "Airport & transit hub lighting": "空港・交通結節点の照明",
    "Light art installation": "ライトアートインスタレーション",
    "Landscape garden lighting": "庭園ランドスケープの照明",
    "Urban night scene planning": "都市夜景計画",
    "Hotel exterior lighting": "ホテル外観の照明",
    "Residential community lighting": "住宅地の照明",
    "Bridge night lighting": "橋梁の夜景照明",
    "Park pathway lighting": "公園園路の照明",
    "Waterfront promenade lighting": "水辺プロムナードの照明",
    "Sports venue lighting": "スポーツ施設の照明",
    "Cultural building lighting": "文化施設の照明",
    "Road & street lighting": "道路・街路の照明",
    "Plaza public lighting": "広場の公共照明",
    "Industrial facility lighting": "産業施設の照明",
    "Residential landscape lighting": "住宅外構の照明",
    "Cultural tourism night scene": "文化観光の夜景",
    "Office building facade lighting": "オフィスビルのファサード照明",
    "Hotel architecture night rendering": "ホテル建築の夜景レンダリング",
    "Urban planning night vision": "都市計画の夜景ビジョン",
  },
  de: {
    "Building facade night lighting": "Fassadenbeleuchtung bei Nacht",
    "Commercial plaza lighting design": "Lichtkonzept für einen Geschäftsplatz",
    "Airport & transit hub lighting": "Beleuchtung von Flughafen und Verkehrsknoten",
    "Light art installation": "Lichtkunst-Installation",
    "Landscape garden lighting": "Gartenbeleuchtung in der Landschaft",
    "Urban night scene planning": "Planung des städtischen Nachtbildes",
    "Hotel exterior lighting": "Außenbeleuchtung eines Hotels",
    "Residential community lighting": "Beleuchtung einer Wohnanlage",
    "Bridge night lighting": "Brückenbeleuchtung bei Nacht",
    "Park pathway lighting": "Wegebeleuchtung im Park",
    "Waterfront promenade lighting": "Beleuchtung der Uferpromenade",
    "Sports venue lighting": "Sportstättenbeleuchtung",
    "Cultural building lighting": "Beleuchtung eines Kulturbaus",
    "Road & street lighting": "Straßenbeleuchtung",
    "Plaza public lighting": "Öffentliche Platzbeleuchtung",
    "Industrial facility lighting": "Beleuchtung einer Industrieanlage",
    "Residential landscape lighting": "Außenbeleuchtung im Wohnumfeld",
    "Cultural tourism night scene": "Nachtbild im Kulturtourismus",
    "Office building facade lighting": "Fassadenbeleuchtung eines Bürogebäudes",
    "Hotel architecture night rendering": "Nachtrendering einer Hotelarchitektur",
    "Urban planning night vision": "Nachtkonzept in der Stadtplanung",
  },
};

export function localCategory(cat: string | undefined, lang: Lang): string {
  if (!cat) return "";
  return categoryDict[lang]?.[cat] ?? cat;
}

export function localPrompt(item: ShowcaseLike, lang: Lang): string {
  // 中文优先用数据库里的 prompt_zh（管理员手填，比查表准确）
  if (lang === "zh" && item.prompt_zh) return item.prompt_zh;
  return promptDict[lang]?.[item.prompt] ?? item.prompt;
}

/**
 * 图片 alt。category 缺失时不能拼进模板字符串 —— `${null}` 会渲染成字面量
 * "null"（2026-07-25 线上实测：27 张卡片的 alt 都是 "null — …"，读屏软件会念出来）。
 */
export function showcaseAlt(item: ShowcaseLike, lang: Lang): string {
  const cat = localCategory(item.category, lang);
  const desc = localPrompt(item, lang);
  return cat ? `${cat} — ${desc}` : desc;
}

import type { Lang } from "./ui";

/**
 * 应用场景详情页的全部文案。
 *
 * 为什么放这里而不是各自的 .astro 页面：这四个页面结构完全相同
 * （3 段引言 + 案例栅格 + 应用清单 + 其他场景导航 + CTA），只有文案不同。
 * 语言从 2 种增加到 4 种后，"每语言每场景一个页面文件"意味着 16 份几乎一样的
 * HTML —— 改一次版式要改 16 处。现在页面只剩 src/pages/**\/use-cases/[slug].astro
 * 四个薄壳，共用 components/UseCaseDetail.astro 渲染。
 *
 * URL 保持不变：/use-cases/<slug>、/zh/use-cases/<slug>、/ja/…、/de/…
 *
 * en 与 zh 的文案原样搬自改造前的页面，未作改写（不影响既有 SEO 权重）。
 */

export const useCaseSlugs = [
  "architectural-lighting",
  "landscape-lighting",
  "urban-night-planning",
  "hospitality-lighting",
] as const;

export type UseCaseSlug = (typeof useCaseSlugs)[number];

/** slug → Supabase showcases.category 的过滤值（筛不到就退回全部案例）。 */
export const useCaseCategory: Record<UseCaseSlug, string> = {
  "architectural-lighting": "architectural",
  "landscape-lighting": "landscape",
  "urban-night-planning": "urban",
  "hospitality-lighting": "hospitality",
};

/**
 * slug → ui.ts 里的翻译键。场景索引页的卡片和详情页底部的"其他场景"按钮
 * 都从这里取名，保证同一个场景在全站叫法一致。
 * as const 保住字面量类型，这样 t(useCaseUiKeys[slug].title) 不需要类型断言。
 */
export const useCaseUiKeys = {
  "architectural-lighting": {
    title: "useCases.arch.title",
    desc: "useCases.arch.desc",
    keywords: "useCases.arch.keywords",
  },
  "landscape-lighting": {
    title: "useCases.landscape.title",
    desc: "useCases.landscape.desc",
    keywords: "useCases.landscape.keywords",
  },
  "urban-night-planning": {
    title: "useCases.urban.title",
    desc: "useCases.urban.desc",
    keywords: "useCases.urban.keywords",
  },
  "hospitality-lighting": {
    title: "useCases.hospitality.title",
    desc: "useCases.hospitality.desc",
    keywords: "useCases.hospitality.keywords",
  },
} as const;

export interface UseCaseApplication {
  /** 加粗的小标题，含冒号（各语言标点不同：中文用「：」，德语用「:」） */
  term: string;
  desc: string;
}

export interface UseCaseDetail {
  /** 页面 h1 */
  h1: string;
  /** <title> 与 og:title */
  metaTitle: string;
  /** meta description、og:description、JSON-LD description */
  metaDesc: string;
  /** 引言，固定 3 段 */
  intro: [string, string, string];
  applicationsHeading: string;
  applications: UseCaseApplication[];
}

export const useCaseDetails: Record<
  Lang,
  Record<UseCaseSlug, UseCaseDetail>
> = {
  en: {
    "architectural-lighting": {
      h1: "Architectural Lighting Design Rendering",
      metaTitle: "Architectural Lighting Design Rendering — AI Visualization",
      metaDesc:
        "Visualize architectural lighting designs before installation. Transform daytime building photos into professional nightscape renderings with AI.",
      intro: [
        "Architects and lighting designers face a persistent challenge: clients need to see the finished lighting scheme before a single fixture is installed. Traditional rendering workflows require days of 3D modeling, expensive software licenses, and skilled visualization artists — all before a single construction decision is made.",
        "LDR changes that equation. Upload a daytime photo of the building or site, describe your lighting intent — warm uplighting on the facade, cool-white accent strips along the roofline, a lantern-lit entry canopy — and the AI produces a photorealistic nightscape rendering in seconds. The result is a client-ready visual that communicates the design intent clearly, accelerating approval and reducing costly mid-project revisions.",
        "LDR is used by architectural lighting consultants, facade engineers, and design-build contractors to validate fixture placement, evaluate color temperature choices, and present multiple lighting scenarios side by side — all without a 3D model.",
      ],
      applicationsHeading: "Common Architectural Lighting Applications",
      applications: [
        {
          term: "Facade illumination:",
          desc: "Preview wash lighting, grazing effects, and dynamic color scenarios on building exteriors before specifying fixtures.",
        },
        {
          term: "Entry and lobby approaches:",
          desc: "Evaluate how pathway lighting, bollards, and canopy downlights interact at the building threshold.",
        },
        {
          term: "Historic preservation projects:",
          desc: "Test sensitive uplighting approaches on listed buildings without committing to intrusive installations.",
        },
        {
          term: "Competition submissions:",
          desc: "Generate compelling nightscape boards quickly for design competition entries and planning applications.",
        },
      ],
    },
    "landscape-lighting": {
      h1: "Landscape Lighting Design Rendering",
      metaTitle: "Landscape Lighting Design Rendering — AI Night Visualization",
      metaDesc:
        "Preview landscape lighting designs with AI-powered day-to-night rendering. See how gardens, parks, and outdoor spaces look illuminated at night.",
      intro: [
        "Landscape lighting transforms outdoor spaces after dark — but communicating that transformation to clients and planning committees has always been difficult. Daytime site photos show the existing conditions; nothing shows what happens when the sun goes down and the designed lighting takes over.",
        "LDR bridges that gap. Upload a daytime photo of a garden, park, courtyard, or residential exterior and describe the lighting scheme: pathway bollards at 2700K, accent uplighting on specimen trees, a softly lit water feature. The AI renders a realistic nightscape that captures the mood and atmosphere of the finished design, giving clients a clear picture of what they are commissioning.",
        "Landscape architects, horticultural lighting specialists, and garden designers use LDR to iterate quickly through lighting scenarios, compare warm and cool color temperatures, and build compelling client presentations — without waiting for on-site mock-up sessions or hiring visualization studios.",
      ],
      applicationsHeading: "Common Landscape Lighting Applications",
      applications: [
        {
          term: "Residential gardens:",
          desc: "Show homeowners how accent lighting, pathway illumination, and feature lighting will look together at night.",
        },
        {
          term: "Public parks and plazas:",
          desc: "Visualize how pedestrian lighting, tree uplighting, and feature illumination interact across large open spaces.",
        },
        {
          term: "Water features and pools:",
          desc: "Preview underwater and perimeter lighting to evaluate color rendering and spill control before construction.",
        },
        {
          term: "Hospitality exteriors:",
          desc: "Create nightscape visuals for hotel courtyards, resort gardens, and restaurant terraces to support F&B marketing.",
        },
      ],
    },
    "urban-night-planning": {
      h1: "Urban Night Planning & Nightscape Visualization",
      metaTitle: "Urban Night Planning & Nightscape Visualization Tool",
      metaDesc:
        "Plan urban night lighting with AI visualization. Transform cityscapes from day to night to evaluate lighting strategies before implementation.",
      intro: [
        "Urban lighting master plans shape how millions of people experience a city after dark. Street safety, visual identity, light pollution management, and energy efficiency all depend on getting the lighting strategy right — yet traditional planning tools make it hard to communicate nightscape vision to stakeholders who are not technical specialists.",
        "LDR gives urban planners, city lighting designers, and municipal authorities a fast way to generate photorealistic nightscape visualizations from existing street-level and aerial photography. Upload a daytime cityscape, describe the intended lighting approach — pedestrian scale warm-white LEDs, cooler functional road lighting, accent illumination on civic landmarks — and receive a rendered nightscape that accurately conveys the atmosphere and hierarchy of the proposed scheme.",
        "These visualizations are used to support public consultation, planning committee presentations, developer briefings, and international design competitions. Being able to show a credible nightscape quickly — rather than commissioning a specialist visualization studio — compresses the feedback loop and keeps planning processes moving.",
      ],
      applicationsHeading: "Common Urban Night Planning Applications",
      applications: [
        {
          term: "Street lighting upgrade programs:",
          desc: "Compare LED retrofit scenarios against existing sodium lamp conditions to justify capital expenditure to councils and boards.",
        },
        {
          term: "Civic landmark and bridge lighting:",
          desc: "Visualize feature lighting on monuments, bridges, and public buildings as part of city identity strategies.",
        },
        {
          term: "Mixed-use district activation:",
          desc: "Show how coordinated lighting between retail, residential, and public realm can create vibrant night-time economies.",
        },
        {
          term: "Dark-sky and light pollution assessment:",
          desc: "Generate low-intensity nightscape scenarios to illustrate responsible lighting approaches for sensitive environments.",
        },
      ],
    },
    "hospitality-lighting": {
      h1: "Hospitality Lighting Design Rendering",
      metaTitle:
        "Hospitality Lighting Design Rendering — Hotels, Resorts, Restaurants",
      metaDesc:
        "Visualize hospitality lighting designs before installation. Transform daytime photos of hotels, resorts, and restaurants into evening nightscape renderings with AI.",
      intro: [
        "In hospitality, lighting is brand. A hotel's porte-cochère after sunset, the warm glow of a rooftop bar, the layered ambiance of a poolside terrace — these moments decide whether a guest feels arrived, or just checked-in. Yet lighting designers for hotels, resorts, and restaurants face the same problem as every other discipline: clients approve a vision they cannot yet see.",
        "LDR closes that gap. Upload a daytime photo of a hotel facade, a restaurant courtyard, or a resort pool deck, describe the evening mood — candle-warm 2700K accent lighting along the bar, soft uplights grazing palm trunks, a signature entrance glow — and the AI returns a photorealistic nightscape in seconds. Designers use the output to validate fixture placement, compare color temperatures side by side, and secure client buy-in before a single luminaire is installed.",
        "LDR is used by hospitality lighting consultants, boutique hotel operators, and restaurant brand teams to preview atmosphere, test multiple evening scenarios against a single daytime reference photo, and present coherent night-scene storyboards to ownership and management.",
      ],
      applicationsHeading: "Common Hospitality Lighting Applications",
      applications: [
        {
          term: "Hotel facade and porte-cochère:",
          desc: "Preview the arrival sequence — signage glow, entry canopy downlights, valet-drive uplighting — to create the guest's first evening impression.",
        },
        {
          term: "Pool decks and outdoor terraces:",
          desc: "Evaluate underwater pool lighting, cabana accent strips, and pathway bollards together, balancing function and atmosphere.",
        },
        {
          term: "Rooftop bars and al fresco dining:",
          desc: "Test string lights, bar-back illumination, and warm low-level table lighting to dial in the signature evening mood.",
        },
        {
          term: "Resort landscaping and paths:",
          desc: "Visualize tree uplighting, garden moon-glow, and signage lighting across sprawling resort grounds before specifying miles of fixture runs.",
        },
        {
          term: "Boutique restaurants and wine bars:",
          desc: "Render multiple mood options — intimate warm, theatrical accent, airy minimal — for the same space, then present the final three to the operator.",
        },
      ],
    },
  },

  zh: {
    "architectural-lighting": {
      h1: "建筑照明设计渲染",
      metaTitle: "建筑照明设计渲染 — AI 可视化",
      metaDesc:
        "在安装前可视化建筑照明设计。用 AI 将建筑白天照片转化为专业夜景渲染图。",
      intro: [
        "建筑师和灯光设计师面临一个长期挑战：客户需要在任何灯具安装之前看到完整的照明方案效果。传统渲染工作流需要数天的三维建模、昂贵的软件授权费用和专业可视化人员——而这一切都发生在任何施工决策之前。",
        "LDR 改变了这一方程式。上传建筑或场地的白天照片，描述您的照明意图——幕墙暖色上照、屋顶线冷白装饰条、灯笼式入口雨篷——AI 即可在几秒内生成照片级夜景渲染图。结果是一张可直接交付客户的视觉图，清晰传达设计意图，加速审批并减少项目中途的高成本返工。",
        "建筑照明顾问、幕墙工程师和设计施工一体化承包商使用 LDR 来验证灯具位置、评估色温选择，以及并排展示多种照明方案——无需任何三维模型。",
      ],
      applicationsHeading: "常见建筑照明应用场景",
      applications: [
        {
          term: "幕墙照明：",
          desc: "在确定灯具规格前，预览建筑外立面的洗墙效果、掠射效果和动态色彩方案。",
        },
        {
          term: "入口与大堂通道：",
          desc: "评估路径照明、矮柱灯和雨篷筒灯在建筑入口处的综合交互效果。",
        },
        {
          term: "历史建筑保护项目：",
          desc: "在不采用侵入性安装的前提下，对登录建筑测试敏感的上照灯方案。",
        },
        {
          term: "竞赛投标：",
          desc: "快速生成引人注目的夜景图版，用于设计竞赛参赛作品和规划申请材料。",
        },
      ],
    },
    "landscape-lighting": {
      h1: "景观照明设计渲染",
      metaTitle: "景观照明设计渲染 — AI 可视化",
      metaDesc:
        "用 AI 驱动的白天转夜景渲染预览景观照明设计效果。查看花园、公园和户外空间在夜晚灯光下的真实面貌。",
      intro: [
        "景观照明在夜幕降临后彻底改变户外空间——但将这种转变传达给客户和规划委员会一直是个难题。白天的现场照片只能呈现现有条件；没有什么能展示太阳落山后设计照明方案接管空间的样子。",
        "LDR 弥合了这一差距。上传花园、公园、庭院或住宅外部的白天照片，描述照明方案：2700K 路径矮柱灯、标本树木的重点上照灯、柔和的水景灯光。AI 渲染出捕捉成品设计情感与氛围的真实夜景图，让客户清晰看到他们所委托的成果。",
        "景观建筑师、园艺照明专家和花园设计师使用 LDR 快速迭代照明方案、比较暖冷色温，并构建引人入胜的客户演示材料——无需等待现场样品测试或委托可视化工作室。",
      ],
      applicationsHeading: "常见景观照明应用场景",
      applications: [
        {
          term: "私人花园：",
          desc: "向业主展示重点照明、路径照明和特色照明在夜晚的整体效果。",
        },
        {
          term: "公共公园与广场：",
          desc: "可视化步行照明、树木上照灯和特色照明在大型开放空间中的交互效果。",
        },
        {
          term: "水景与泳池：",
          desc: "在施工前预览水下及周边照明，评估显色性和溢光控制效果。",
        },
        {
          term: "酒店外部空间：",
          desc: "为酒店庭院、度假村花园和餐厅露台创建夜景效果图，支持餐饮营销材料制作。",
        },
      ],
    },
    "urban-night-planning": {
      h1: "城市夜景规划与可视化",
      metaTitle: "城市夜景规划渲染 — AI 可视化",
      metaDesc:
        "用 AI 可视化工具规划城市夜景照明。将城市景观从白天转化为夜景，在实施前评估照明策略。",
      intro: [
        "城市照明总体规划塑造了数百万人在夜间体验一座城市的方式。街道安全、视觉形象、光污染管理和能源效率都依赖于正确的照明策略——然而传统规划工具难以将夜景愿景传达给非技术专业的利益相关方。",
        "LDR 为城市规划师、城市灯光设计师和市政当局提供了一种快捷方式，可从现有的街景和航拍照片生成照片级夜景效果图。上传白天城市景观，描述预期的照明方案——步行尺度暖白 LED、较冷色调功能性道路照明、市政地标的重点照明——即可获得准确传达方案氛围和层次的夜景渲染图。",
        "这些效果图被用于支持公众咨询、规划委员会演示、开发商简报和国际设计竞赛。能够快速展示可信的夜景效果——而非委托专业可视化工作室——压缩了反馈周期，使规划流程保持顺畅推进。",
      ],
      applicationsHeading: "常见城市夜景规划应用场景",
      applications: [
        {
          term: "街道照明升级方案：",
          desc: "对比 LED 改造方案与现有钠灯条件，向委员会和董事会论证资本支出的合理性。",
        },
        {
          term: "市政地标与桥梁照明：",
          desc: "作为城市形象战略的一部分，可视化纪念碑、桥梁和公共建筑的特色照明方案。",
        },
        {
          term: "混合功能区活化：",
          desc: "展示零售、住宅和公共空间之间协调统一的照明如何创造充满活力的夜间经济。",
        },
        {
          term: "暗天空与光污染评估：",
          desc: "生成低强度夜景方案，为敏感环境展示负责任的照明做法。",
        },
      ],
    },
    "hospitality-lighting": {
      h1: "酒店照明设计渲染",
      metaTitle: "酒店照明设计渲染 — AI 可视化",
      metaDesc:
        "在安装前可视化酒店照明设计。用 AI 将酒店、度假村和餐厅的白天照片转化为夜景渲染图。",
      intro: [
        "在酒店业，照明即品牌。酒店车道在日落后的光晕、屋顶酒吧的暖意、泳池露台的层叠氛围——这些瞬间决定了宾客是感受到“宾至如归”，还是只是“办理入住”。然而为酒店、度假村和餐厅服务的照明设计师面临与其他领域相同的难题：客户需要批准一个他们尚无法看见的愿景。",
        "LDR 弥合这一差距。上传酒店外立面、餐厅庭院或度假村泳池甲板的白天照片，描述傍晚氛围——吧台沿线的烛光暖色 2700K 重点照明、柔和的棕榈树干洗墙灯、标志性的入口光晕——AI 在几秒内返回照片级夜景渲染图。设计师使用成果验证灯具位置、并排比较色温，并在安装任何一盏灯具之前获得客户认可。",
        "酒店照明顾问、精品酒店运营商和餐厅品牌团队使用 LDR 预览氛围、针对同一张白天参考照片测试多种傍晚方案，并向业主和管理层呈现连贯的夜景故事板。",
      ],
      applicationsHeading: "常见酒店照明应用场景",
      applications: [
        {
          term: "酒店外立面与车道：",
          desc: "预览迎宾序列——标识光晕、入口雨篷筒灯、泊车道上照灯——打造宾客的第一个夜间印象。",
        },
        {
          term: "泳池甲板与户外露台：",
          desc: "综合评估泳池水下照明、沙发椅重点装饰条和路径矮柱灯，在功能与氛围之间取得平衡。",
        },
        {
          term: "屋顶酒吧与露天餐饮：",
          desc: "测试串灯、吧台背部照明和低位暖色桌面照明，精准调出标志性的夜间氛围。",
        },
        {
          term: "度假村景观与路径：",
          desc: "在确定大面积灯具安装方案前，可视化树木上照、花园月光效果和指示牌照明在整个度假村场地的综合效果。",
        },
        {
          term: "精品餐厅与酒窖吧：",
          desc: "为同一空间渲染多种氛围方案——私密暖调、戏剧性重点、通透简约——再将最终三个方案呈交运营者决策。",
        },
      ],
    },
  },

  ja: {
    "architectural-lighting": {
      h1: "建築照明デザインのレンダリング",
      metaTitle: "建築照明デザインのレンダリング — AI 夜景可視化",
      metaDesc:
        "施工前に建築照明デザインを可視化。建物の昼間の写真を AI でプロ品質の夜景パースに変換します。",
      intro: [
        "建築家と照明デザイナーには、いつも同じ壁があります。器具を 1 台も設置していない段階で、施主に完成後の照明を判断してもらわなければならない。従来のワークフローでは、数日がかりの 3D モデリング、高価なソフトウェアライセンス、そして専門のビジュアライザーが必要でした — しかもそれは、施工上の決定が下される前の話です。",
        "LDR はその前提を変えます。建物や敷地の昼間の写真をアップロードし、照明の意図を言葉で伝えるだけ — 石張りファサードへの暖色アッパーライト、パラペット沿いの冷白色のライン、ランタンのように灯るエントランスキャノピー — AI が数秒でフォトリアルな夜景パースを生成します。得られるのは施主にそのまま提示できる 1 枚で、設計意図が即座に伝わり、承認が早まり、着工後の高くつく修正を減らせます。",
        "建築照明コンサルタント、ファサードエンジニア、設計施工会社が、器具配置の検証、色温度の比較検討、複数案の並列提示に LDR を使っています — 3D モデルは一切必要ありません。",
      ],
      applicationsHeading: "建築照明でよくある用途",
      applications: [
        {
          term: "ファサード照明：",
          desc: "器具を確定する前に、ウォールウォッシュ、グレージング、演出用のカラーシーンを外装で検証。",
        },
        {
          term: "エントランスとアプローチ：",
          desc: "園路灯、ボラード、キャノピーのダウンライトが建物の入口でどう重なるかを評価。",
        },
        {
          term: "歴史的建造物の保存：",
          desc: "侵襲的な設置を決める前に、登録文化財に対する控えめなライトアップ手法を試す。",
        },
        {
          term: "コンペ提出：",
          desc: "設計競技や申請図書向けの夜景ボードを短時間で用意。",
        },
      ],
    },
    "landscape-lighting": {
      h1: "ランドスケープ照明のレンダリング",
      metaTitle: "ランドスケープ照明のレンダリング — AI 夜景可視化",
      metaDesc:
        "AI の昼夜変換レンダリングで屋外照明計画を事前確認。庭園・公園・屋外空間が夜どう見えるかを可視化します。",
      intro: [
        "ランドスケープ照明は、日が落ちてから屋外空間を一変させます。ところが、その変化を施主や審査会に伝えるのは常に難題でした。昼間の現況写真が示せるのは今の姿だけで、日没後に計画照明が空間を引き継いだ状態は、どこにも写っていません。",
        "LDR はその隔たりを埋めます。庭園、公園、中庭、住宅外構の昼間の写真をアップロードし、照明計画を書くだけです — 2700K の園路ボラード、シンボルツリーへのアッパーライト、柔らかく照らされた水景。AI が仕上がりの雰囲気まで捉えた現実的な夜景を描き出し、施主は自分が発注しようとしているものをはっきり把握できます。",
        "ランドスケープアーキテクト、植栽照明の専門家、庭園デザイナーが、案の反復検討、暖色と寒色の色温度比較、説得力のあるプレゼン資料づくりに LDR を使っています — 現地でのモックアップ待ちも、可視化スタジオへの外注も不要です。",
      ],
      applicationsHeading: "ランドスケープ照明でよくある用途",
      applications: [
        {
          term: "住宅の庭：",
          desc: "アクセント照明、園路照明、シンボル照明が夜にどう見えるかを施主に提示。",
        },
        {
          term: "公園・公共広場：",
          desc: "歩行者照明、樹木のアッパーライト、演出照明が広い屋外空間でどう干渉し合うかを可視化。",
        },
        {
          term: "水景・プール：",
          desc: "施工前に水中照明と外周照明を確認し、演色性と漏れ光のコントロールを評価。",
        },
        {
          term: "ホスピタリティの屋外空間：",
          desc: "ホテル中庭、リゾートの庭園、レストランテラスの夜景ビジュアルを制作し、飲食部門の販促に活用。",
        },
      ],
    },
    "urban-night-planning": {
      h1: "都市夜景計画と可視化",
      metaTitle: "都市夜景計画・夜景可視化ツール",
      metaDesc:
        "AI 可視化で都市の夜間照明を計画。街並みを昼から夜へ変換し、実施前に照明戦略を検証します。",
      intro: [
        "都市の照明マスタープランは、何百万人もの人が夜の街をどう体験するかを左右します。通りの安全性、景観としての個性、光害の抑制、省エネルギー — そのすべてが照明戦略の的確さにかかっています。ところが従来の計画ツールでは、専門家でない関係者に夜景のビジョンを伝えるのが困難でした。",
        "LDR は都市計画者、都市照明のデザイナー、自治体に、既存の街路写真や航空写真からフォトリアルな夜景を短時間で起こす手段を提供します。昼間の街並みをアップロードし、意図する照明の方向性を書くだけ — 歩行者スケールの暖白色 LED、やや寒色の機能的な道路照明、シビックランドマークへのアクセント照明 — 計画の雰囲気と優先順位が正確に伝わる夜景パースが得られます。",
        "こうしたビジュアルは、住民説明会、都市計画審議会での説明、デベロッパー向け資料、国際設計競技を支えます。専門の可視化スタジオに発注せずに信頼できる夜景をすぐ示せることが、フィードバックの周期を縮め、計画プロセスを止めずに進めます。",
      ],
      applicationsHeading: "都市夜景計画でよくある用途",
      applications: [
        {
          term: "街路照明の更新事業：",
          desc: "既存のナトリウム灯と LED 改修案を比較し、議会や理事会に投資の妥当性を示す。",
        },
        {
          term: "シビックランドマークと橋梁の照明：",
          desc: "都市のアイデンティティ戦略の一環として、記念建造物・橋梁・公共建築の演出照明を可視化。",
        },
        {
          term: "複合用途地区の活性化：",
          desc: "商業・住宅・公共空間の照明を調和させることで、活気ある夜間経済がどう生まれるかを提示。",
        },
        {
          term: "ダークスカイと光害の評価：",
          desc: "低照度の夜景シナリオを生成し、環境に配慮した照明のあり方を示す。",
        },
      ],
    },
    "hospitality-lighting": {
      h1: "ホスピタリティ照明のレンダリング",
      metaTitle:
        "ホスピタリティ照明のレンダリング — ホテル・リゾート・レストラン",
      metaDesc:
        "施工前にホスピタリティ施設の照明計画を可視化。ホテル・リゾート・レストランの昼間の写真を AI で夜景パースに変換します。",
      intro: [
        "ホスピタリティにおいて、照明はブランドそのものです。日没後のホテル車寄せ、ルーフトップバーの暖かな灯り、プールサイドテラスの重なり合う陰影 — こうした瞬間が、宿泊客に「到着した」と感じさせるか、単に「チェックインした」だけに終わるかを分けます。それでもホテル・リゾート・レストランの照明デザイナーは、他の領域とまったく同じ問題に直面します。施主は、まだ見えていないものを承認しなければならないのです。",
        "LDR はその隔たりを埋めます。ホテルのファサード、レストランの中庭、リゾートのプールデッキの昼間の写真をアップロードし、夜の雰囲気を書くだけ — バーカウンター沿いのキャンドルのような 2700K のアクセント照明、ヤシの幹を柔らかく撫でるアッパーライト、象徴的なエントランスの光 — AI が数秒でフォトリアルな夜景を返します。器具位置の検証、色温度の並列比較、そして 1 台も設置しないうちに施主の合意を得るために使われています。",
        "ホスピタリティ照明コンサルタント、ブティックホテルの運営者、レストランのブランドチームが、雰囲気の事前確認、同じ 1 枚の昼間写真に対する複数の夜間シナリオの検証、オーナーやマネジメントへの一貫した夜景ストーリーボードの提示に LDR を使っています。",
      ],
      applicationsHeading: "ホスピタリティ照明でよくある用途",
      applications: [
        {
          term: "ホテルファサードと車寄せ：",
          desc: "サインの光、キャノピーのダウンライト、車寄せのアッパーライト — 到着シークエンスを事前に組み立て、宿泊客の第一印象をつくる。",
        },
        {
          term: "プールデッキと屋外テラス：",
          desc: "水中照明、カバナのアクセントライン、園路ボラードをまとめて評価し、機能と雰囲気のバランスを取る。",
        },
        {
          term: "ルーフトップバーと屋外ダイニング：",
          desc: "ストリングライト、バックバーの照明、低い位置の暖色テーブル照明を試し、その店らしい夜の空気に追い込む。",
        },
        {
          term: "リゾートのランドスケープと園路：",
          desc: "広大な敷地に器具を大量に配置する前に、樹木のアッパーライト、庭のムーンライティング、サイン照明を可視化。",
        },
        {
          term: "ブティックレストランとワインバー：",
          desc: "同じ空間に複数の雰囲気案 — 親密な暖色、演出的なアクセント、軽やかなミニマル — をレンダリングし、最終 3 案を運営者に提示。",
        },
      ],
    },
  },

  de: {
    "architectural-lighting": {
      h1: "Rendering für die Architektur­beleuchtung",
      metaTitle: "Architekturbeleuchtung rendern – KI-Nachtvisualisierung",
      metaDesc:
        "Lichtkonzepte für Fassaden vor der Montage sichtbar machen. Tagesfotos von Gebäuden werden mit KI zu professionellen Nachtvisualisierungen.",
      intro: [
        "Architektinnen und Lichtplaner kennen das Problem: Der Bauherr soll ein Beleuchtungskonzept freigeben, von dem noch keine einzige Leuchte zu sehen ist. Klassische Visualisierungswege verlangen tagelange 3D-Modellierung, teure Softwarelizenzen und spezialisierte Visualisierer – und das alles, bevor überhaupt eine Ausführungsentscheidung gefallen ist.",
        "LDR verschiebt dieses Verhältnis. Laden Sie ein Tagesfoto des Gebäudes oder des Grundstücks hoch und beschreiben Sie Ihre Lichtabsicht – warme Anstrahlung der Steinfassade, kaltweiße Lichtlinien entlang der Attika, ein laternenhaft ausgeleuchtetes Vordach. Die KI erzeugt daraus in Sekunden eine fotorealistische Nachtvisualisierung: ein präsentationsfertiges Bild, das die Entwurfsabsicht unmittelbar vermittelt, Freigaben beschleunigt und teure Änderungen mitten im Projekt vermeidet.",
        "Lichtplanungsbüros, Fassadeningenieure und Generalunternehmer nutzen LDR, um Leuchtenpositionen zu prüfen, Farbtemperaturen gegeneinander abzuwägen und mehrere Lichtszenarien nebeneinander zu präsentieren – ganz ohne 3D-Modell.",
      ],
      applicationsHeading: "Typische Aufgaben in der Architekturbeleuchtung",
      applications: [
        {
          term: "Fassadenanstrahlung:",
          desc: "Wandfluter, Streiflicht und dynamische Farbszenarien am Baukörper beurteilen, bevor Leuchten ausgeschrieben werden.",
        },
        {
          term: "Eingang und Vorfahrt:",
          desc: "Prüfen, wie Wegeleuchten, Poller und Vordach-Downlights an der Gebäudeschwelle zusammenwirken.",
        },
        {
          term: "Denkmalpflege:",
          desc: "Zurückhaltende Anstrahlungskonzepte an denkmalgeschützten Bauten testen, ohne sich auf eingriffsintensive Installationen festzulegen.",
        },
        {
          term: "Wettbewerbsbeiträge:",
          desc: "Überzeugende Nachtbilder für Wettbewerbe und Bauanträge kurzfristig erzeugen.",
        },
      ],
    },
    "landscape-lighting": {
      h1: "Rendering für die Landschafts­beleuchtung",
      metaTitle: "Landschaftsbeleuchtung rendern – KI-Nachtvisualisierung",
      metaDesc:
        "Konzepte für die Außenbeleuchtung mit KI-gestütztem Tag-Nacht-Rendering vorab beurteilen: Gärten, Parks und Freiräume bei Nacht.",
      intro: [
        "Licht verwandelt Freiräume nach Einbruch der Dunkelheit – nur lässt sich diese Verwandlung Bauherren und Gremien nur schwer vermitteln. Tagesaufnahmen zeigen den Bestand; was passiert, wenn die Sonne untergeht und das geplante Licht übernimmt, zeigt keine davon.",
        "LDR schließt diese Lücke. Laden Sie ein Tagesfoto von Garten, Park, Innenhof oder Wohnumfeld hoch und beschreiben Sie das Lichtkonzept: Wegepoller mit 2700 K, Anstrahlung ausgewählter Solitärbäume, ein weich beleuchtetes Wasserbecken. Die KI erzeugt daraus ein glaubwürdiges Nachtbild, das Stimmung und Atmosphäre des fertigen Entwurfs greifbar macht.",
        "Landschaftsarchitektinnen, Fachplaner für Vegetationsbeleuchtung und Gartengestalter nutzen LDR, um Varianten schnell durchzuspielen, warme und kalte Farbtemperaturen zu vergleichen und überzeugende Präsentationen aufzubauen – ohne Bemusterung vor Ort abzuwarten oder ein Visualisierungsbüro zu beauftragen.",
      ],
      applicationsHeading: "Typische Aufgaben in der Landschaftsbeleuchtung",
      applications: [
        {
          term: "Privatgärten:",
          desc: "Bauherren zeigen, wie Akzentlicht, Wegebeleuchtung und Objektanstrahlung nachts zusammenwirken.",
        },
        {
          term: "Parks und öffentliche Plätze:",
          desc: "Das Zusammenspiel von Wegebeleuchtung, Baumanstrahlung und Objektlicht über große Freiflächen hinweg beurteilen.",
        },
        {
          term: "Wasserflächen und Pools:",
          desc: "Unterwasser- und Randbeleuchtung vorab prüfen – Farbwiedergabe und Streulichtkontrolle noch vor der Ausführung.",
        },
        {
          term: "Außenanlagen im Gastgewerbe:",
          desc: "Nachtbilder für Hotelhöfe, Resortgärten und Restaurantterrassen erzeugen und im Marketing einsetzen.",
        },
      ],
    },
    "urban-night-planning": {
      h1: "Städtische Nachtplanung und Nacht­visualisierung",
      metaTitle: "Städtische Nachtplanung – Werkzeug zur Nachtvisualisierung",
      metaDesc:
        "Stadtbeleuchtung mit KI-Visualisierung planen. Stadträume vom Tag in die Nacht überführen und Lichtstrategien vor der Umsetzung bewerten.",
      intro: [
        "Lichtmasterpläne prägen, wie Millionen Menschen eine Stadt nach Einbruch der Dunkelheit erleben. Sicherheit im Straßenraum, visuelle Identität, Begrenzung der Lichtverschmutzung und Energieeffizienz hängen an der richtigen Lichtstrategie – doch klassische Planungswerkzeuge vermitteln diese Vision kaum an Beteiligte ohne fachlichen Hintergrund.",
        "LDR gibt Stadtplanerinnen, städtischen Lichtplanern und Kommunen ein schnelles Mittel an die Hand, aus vorhandenen Straßen- und Luftaufnahmen fotorealistische Nachtbilder zu erzeugen. Tagesaufnahme hochladen, das beabsichtigte Lichtkonzept beschreiben – warmweiße LED im Fußgängermaßstab, kühlere funktionale Straßenbeleuchtung, Akzentlicht auf stadtbildprägenden Bauten – und Sie erhalten ein Nachtbild, das Atmosphäre und Hierarchie des Entwurfs verständlich transportiert.",
        "Solche Visualisierungen tragen Bürgerbeteiligungen, Sitzungen von Planungsausschüssen, Investorengespräche und internationale Wettbewerbe. Ein glaubwürdiges Nachtbild kurzfristig zeigen zu können – statt ein spezialisiertes Visualisierungsbüro zu beauftragen – verkürzt die Abstimmungsschleifen erheblich.",
      ],
      applicationsHeading: "Typische Aufgaben in der städtischen Nachtplanung",
      applications: [
        {
          term: "Erneuerung der Straßenbeleuchtung:",
          desc: "LED-Umrüstungsvarianten dem Bestand mit Natriumdampflampen gegenüberstellen und Investitionen gegenüber Rat und Gremien begründen.",
        },
        {
          term: "Brücken und stadtbildprägende Bauten:",
          desc: "Effektbeleuchtung an Denkmälern, Brücken und öffentlichen Gebäuden als Teil der Stadtidentität durchspielen.",
        },
        {
          term: "Aktivierung gemischt genutzter Quartiere:",
          desc: "Zeigen, wie abgestimmtes Licht zwischen Handel, Wohnen und öffentlichem Raum eine lebendige Nachtökonomie entstehen lässt.",
        },
        {
          term: "Lichtverschmutzung und Dark-Sky-Vorgaben:",
          desc: "Zurückhaltende Nachtszenarien erzeugen, um verantwortungsvolle Beleuchtung in empfindlichen Umgebungen zu veranschaulichen.",
        },
      ],
    },
    "hospitality-lighting": {
      h1: "Lichtplanung für Hotellerie und Gastronomie",
      metaTitle: "Lichtplanung für Hotels, Resorts und Restaurants rendern",
      metaDesc:
        "Lichtkonzepte im Gastgewerbe vor der Montage sichtbar machen. Tagesfotos von Hotels, Resorts und Restaurants werden mit KI zu abendlichen Nachtvisualisierungen.",
      intro: [
        "Im Gastgewerbe ist Licht Teil der Marke. Die Vorfahrt eines Hotels nach Sonnenuntergang, das warme Leuchten einer Rooftop-Bar, die geschichtete Atmosphäre einer Poolterrasse – diese Momente entscheiden, ob ein Gast ankommt oder nur eincheckt. Und doch stehen Lichtplaner für Hotels, Resorts und Restaurants vor demselben Problem wie alle anderen Disziplinen: Der Bauherr soll etwas freigeben, das er noch nicht sehen kann.",
        "LDR schließt diese Lücke. Laden Sie ein Tagesfoto der Hotelfassade, des Restauranthofs oder der Poolterrasse hoch und beschreiben Sie die Abendstimmung – kerzenwarmes Akzentlicht mit 2700 K entlang der Bar, weiche Anstrahlung der Palmenstämme, ein unverwechselbares Leuchten am Eingang. Die KI liefert in Sekunden ein fotorealistisches Nachtbild. Planerinnen prüfen damit Leuchtenpositionen, vergleichen Farbtemperaturen nebeneinander und holen die Freigabe ein, bevor die erste Leuchte montiert wird.",
        "Lichtplaner im Gastgewerbe, Betreiber von Boutiquehotels und Markenteams aus der Gastronomie nutzen LDR, um Atmosphäre vorab zu prüfen, mehrere Abendszenarien gegen dieselbe Tagesaufnahme zu testen und Eigentümern wie Management ein stimmiges Nacht-Storyboard vorzulegen.",
      ],
      applicationsHeading: "Typische Aufgaben in Hotellerie und Gastronomie",
      applications: [
        {
          term: "Hotelfassade und Vorfahrt:",
          desc: "Die Ankunftssequenz durchspielen – leuchtende Beschilderung, Downlights im Vordach, Anstrahlung der Zufahrt – und so den ersten Abendeindruck des Gastes gestalten.",
        },
        {
          term: "Poolterrassen und Außenbereiche:",
          desc: "Unterwasserbeleuchtung, Akzentlinien an Cabanas und Wegepoller gemeinsam beurteilen und Funktion gegen Atmosphäre abwägen.",
        },
        {
          term: "Rooftop-Bars und Außengastronomie:",
          desc: "Lichterketten, Rückbuffet-Beleuchtung und warmes Tischlicht ausprobieren, bis die charakteristische Abendstimmung sitzt.",
        },
        {
          term: "Resortanlagen und Wege:",
          desc: "Baumanstrahlung, Moonlighting im Garten und Beschilderung über weitläufige Anlagen hinweg visualisieren, bevor kilometerlange Leuchtenreihen ausgeschrieben werden.",
        },
        {
          term: "Boutique-Restaurants und Weinbars:",
          desc: "Mehrere Stimmungen für denselben Raum rendern – intim-warm, theatralisch akzentuiert, luftig-reduziert – und dem Betreiber die besten drei vorlegen.",
        },
      ],
    },
  },
};

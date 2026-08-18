import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
      },
      boxShadow: {
        subtle: "var(--shadow-sm)",
        card: "var(--shadow-md)",
        elevated: "var(--shadow-lg)",
        float: "var(--shadow-xl)",
      },
      /**
       * 博客正文（prose）的排版规则集中在这里，而不是散在两个
       * blog/[...slug].astro 里 —— 中英文两套路由页此前各写了一串
       * prose-headings:… / prose-p:… 修饰类，改一处必然漏另一处。
       *
       * 颜色一律走设计系统的 CSS 变量。变量本身在 .dark 下会换值，
       * 所以这里不需要 dark:prose-invert —— 深浅色自动跟随，
       * 也不会出现「invert 的灰阶」和「站点的灰阶」两套色。
       */
      typography: {
        DEFAULT: {
          css: {
            // 正文 0.86 而不是 muted-foreground(60%)：此前整篇正文都用次要色，
            // 深色底上长文读起来发灰、发累。标题保持满值，层次靠对比而不是靠把正文压暗。
            "--tw-prose-body": "hsl(var(--foreground) / 0.86)",
            "--tw-prose-headings": "hsl(var(--foreground))",
            "--tw-prose-lead": "hsl(var(--muted-foreground))",
            "--tw-prose-links": "hsl(var(--primary))",
            "--tw-prose-bold": "hsl(var(--foreground))",
            "--tw-prose-counters": "hsl(var(--muted-foreground))",
            "--tw-prose-bullets": "hsl(var(--border))",
            "--tw-prose-hr": "hsl(var(--border))",
            "--tw-prose-quotes": "hsl(var(--foreground))",
            "--tw-prose-quote-borders": "hsl(var(--primary))",
            "--tw-prose-captions": "hsl(var(--muted-foreground))",
            "--tw-prose-code": "hsl(var(--foreground))",
            "--tw-prose-pre-code": "hsl(var(--foreground))",
            "--tw-prose-pre-bg": "hsl(var(--muted) / 0.4)",
            "--tw-prose-th-borders": "hsl(var(--border))",
            "--tw-prose-td-borders": "hsl(var(--border))",

            // 让浏览器把标题的几行拆匀，避免末行只剩一个孤零零的单词
            "h2, h3, h4": {
              textWrap: "balance",
            },

            /**
             * 站点是单色设计：--primary 是 0 0% 98%，--foreground 是 0 0% 95% ——
             * 正文里的链接和正文几乎同色，颜色帮不上忙，下划线是唯一的信号。
             * 所以用 text-decoration 而不是若隐若现的 border：underline-offset
             * 让它离基线远一点，读起来是链接而不是排版噪点，且链接换行时
             * 每一段各自带线（border-bottom 在这件事上表现不对）。
             */
            a: {
              fontWeight: "inherit",
              textDecoration: "underline",
              textDecorationColor: "hsl(var(--primary) / 0.55)",
              textDecorationThickness: "1px",
              textUnderlineOffset: "0.22em",
              transition: "text-decoration-color 150ms",
              "&:hover": {
                textDecorationColor: "hsl(var(--primary))",
              },
              /**
               * 浏览器默认的 outline: auto 解析成 rgb(16,16,16)，而页面背景是
               * rgb(13,13,13) —— 键盘 Tab 过去等于看不见焦点在哪。
               */
              "&:focus-visible": {
                outline: "2px solid hsl(var(--primary))",
                outlineOffset: "3px",
                borderRadius: "2px",
              },
            },

            // 配图：与站点其它卡片同一套圆角和描边，不再是贴着文字的裸图
            img: {
              width: "100%",
              borderRadius: "0.75rem",
              border: "1px solid hsl(var(--border))",
            },
            // 图注用 <figure>/<figcaption>：语义正确，且能与正文拉开字号和颜色，
            // 读者一眼能分清哪句在描述图、哪句是行文
            // 撑出正文的那条规则在 globals.css 的 .blog-bleed 里 ——
            // 封面图不在 prose 内，两边共用同一份数值
            figure: {
              marginTop: "2.5em",
              marginBottom: "2.5em",
            },
            // 连着放的两张图是要被对照着看的（白天/夜景），默认的 2.5em
            // 会把它们推得太开，读者得来回滚动才能比
            "figure + figure": {
              marginTop: "1em",
            },
            "figure > img": {
              marginTop: "0",
              marginBottom: "0",
            },
            figcaption: {
              marginTop: "0.85em",
              fontSize: "0.875em",
              lineHeight: "1.6",
              textAlign: "center",
              color: "hsl(var(--muted-foreground))",
            },

            code: {
              backgroundColor: "hsl(var(--muted) / 0.4)",
              padding: "0.15em 0.4em",
              borderRadius: "0.25rem",
              fontWeight: "500",
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },

            /**
             * 代码块。站内此前 8 篇文章一个代码块都没有，这套样式是为提示词
             * 模板准备的 —— 那是**自然语言**，不是代码：
             *   - pre-wrap 而不是默认的横向滚动：读者要通读并复制整段提示词，
             *     一行 60 多个汉字横着滚是没法读的；这类文本也没有靠缩进表意。
             *   - break-words 兜底，防止超长 URL 之类撑破容器。
             *
             * 字号不在这里定：prose-lg 自己的 pre 规则排在后面，会覆盖掉
             * DEFAULT 里的任何 fontSize（实测生效值是 16px，中文读着正好）。
             */
            pre: {
              whiteSpace: "pre-wrap",
              overflowWrap: "break-word",
              lineHeight: "1.7",
              padding: "1.2em 1.4em",
              borderRadius: "0.75rem",
              border: "1px solid hsl(var(--border))",
            },
            // 行内 code 的底色/内边距会被继承到 pre 里，在深色块上叠出第二层背景
            "pre code": {
              backgroundColor: "transparent",
              padding: "0",
              fontWeight: "400",
              fontSize: "inherit",
            },

            // 表格：complete-guide 和 traditional-vs-ai 里都有对比表，
            // 插件缺失时它们是没有边框的裸 table
            "thead th": {
              fontWeight: "600",
            },
            "tbody td, tfoot td": {
              paddingTop: "0.7em",
              paddingBottom: "0.7em",
            },
          },
        },
      },
    },
  },
  /**
   * typography 提供 `prose` 系列类。博客详情页（src/pages/**\/blog/[...slug].astro）
   * 早就写满了 prose-headings / prose-p / prose-table 之类的修饰类，但插件一直没装，
   * 那些类名不产生任何 CSS —— 8 篇文章全部退化成没有标题层级、没有段落间距、
   * 没有列表符号、表格没有边框的一堵文字墙。
   */
  plugins: [typography],
} satisfies Config;

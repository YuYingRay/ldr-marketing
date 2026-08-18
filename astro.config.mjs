import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://www.ldr-design.com",
  output: "static",
  // 新增语言时这里和 src/i18n/ui.ts 的 languages 必须同步改
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh", "ja", "ko", "de"],
    routing: { prefixDefaultLocale: false },
  },
  markdown: {
    /**
     * Shiki 默认用 github-dark 主题，并把配色**写成行内样式**打在 <pre> 上：
     *   style="background-color:#24292e;color:#e1e4e8"
     * 行内样式压过设计系统的 token，于是代码块是 GitHub 那种偏蓝的灰，
     * 而站点背景是纯中性的 #0d0d0d —— 一眼能看出是两套色。
     *
     * css-variables 主题改为吐 var(--astro-code-*)，实际取值在
     * globals.css 里绑到本站的设计变量上。这样既拿回配色控制权，
     * 又保留了将来贴真代码时的语法高亮能力。
     */
    shikiConfig: { theme: "css-variables" },
  },
  integrations: [
    tailwind(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/404"),
      i18n: {
        defaultLocale: "en",
        // 值是写进 sitemap 的 hreflang，与 Head.astro 的声明保持一致
        locales: { en: "en", zh: "zh-Hans", ja: "ja", ko: "ko", de: "de" },
      },
    }),
  ],
});

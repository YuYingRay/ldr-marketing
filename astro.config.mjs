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

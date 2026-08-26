import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  author: z.string().default("LDR Team"),
  image: z.object({ url: z.string(), alt: z.string() }).optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

/**
 * 每种语言一个集合，目录名与集合名一一对应。
 * 新增语言的博客时：这里加一行 + 建 src/data/blog-<lang>/ +
 * 建 src/pages/<lang>/blog/ 两个页面 + 在 src/i18n/blogLangs.ts 的映射里加一行。
 */
const blogCollection = (dir: string) =>
  defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: `./src/data/${dir}` }),
    schema: blogSchema,
  });

export const collections = {
  blog: blogCollection("blog"),
  "blog-zh": blogCollection("blog-zh"),
  "blog-ja": blogCollection("blog-ja"),
  "blog-ko": blogCollection("blog-ko"),
  "blog-de": blogCollection("blog-de"),
};

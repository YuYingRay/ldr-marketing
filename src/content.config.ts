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

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/data/blog" }),
  schema: blogSchema,
});

const blogZh = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/data/blog-zh" }),
  schema: blogSchema,
});

export const collections = { blog, "blog-zh": blogZh };

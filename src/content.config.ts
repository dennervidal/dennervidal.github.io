import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    publishedAt: z.coerce.date(),
    lang: z.enum(['en', 'pt-BR']).default('en'),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string().trim().regex(/^[\p{L}\p{N}]+(?:[ -][\p{L}\p{N}]+)*$/u)).min(1),
    category: z.string().trim().regex(/^[\p{L}\p{N}]+(?:[ -][\p{L}\p{N}]+)*$/u),
    draft: z.boolean().default(false),
    cover: z.string().startsWith('/').refine(value => !value.startsWith('//')).optional(),
  }).refine(data => !data.updatedAt || data.updatedAt >= data.publishedAt, {
    path: ['updatedAt'], message: 'A atualização não pode anteceder a publicação.',
  }),
});
export const collections = { blog };

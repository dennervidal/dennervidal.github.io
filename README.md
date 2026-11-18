# Denner Vidal — personal site

A personal site with a professional profile and articles on software architecture, tools, and engineering practices.

## Development

Use Node.js 24 LTS (minimum supported version: 22.23.4). Dependency versions are pinned in the manifest and lockfile. The project uses TypeScript 6.x for compatibility with Astro's type checker.

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

Astro generates static HTML in `dist/`, and Pagefind adds the search index. Search works in the production preview and on the deployed site; the development server does not generate the index.

## Publish an article

Create a Markdown or MDX file in `src/content/blog/`. The filename determines the URL, so avoid renaming it after publication. Use descriptive slugs such as `build-caching`; numeric-only slugs are reserved for pagination.

The article archive lives at `/articles/`, relative to the Pages base path. Articles default to English. To publish in Portuguese, set `lang: pt-BR` in the frontmatter. Search uses one index for both languages.

```md
---
title: Build caching
description: When it makes sense to reuse build artifacts.
publishedAt: 2026-11-17
tags: [publishing, performance]
category: Software Engineering
draft: true
---

Start writing here. The layout uses the article title as the H1,
so start sections in the body with H2.
```

Astro's content collection validates the frontmatter. `updatedAt` and `cover` are optional. For a cover, use a path such as `/images/cache.webp` and save the file in `public/images/`. For images in the body, prefer paths relative to the Markdown file or imports in MDX so Astro can process them. MDX can also import Astro components.

Drafts appear in development but are excluded from production pages, categories, tags, RSS, the sitemap, and search. **Do not put private content in drafts**: the source files are visible in this public repository. To publish, remove `draft` or set `draft: false`.

## Deploy to GitHub Pages

The site is hosted at [dennervidal.github.io](https://dennervidal.github.io/). Every push to `main` runs `.github/workflows/deploy.yml`. To deploy manually, run **Publicar no GitHub Pages** from the Actions tab. If setting up a new repository, first select **GitHub Actions** under **Settings → Pages → Build and deployment**.

The workflow uses the origin and base path reported by GitHub Pages. For a production preview of this site:

```sh
export SITE_URL=https://dennervidal.github.io BASE_PATH=/
npm run build
npm run preview
```

Set the same base path for both build and preview. A project site hosted under a repository name uses a path such as `/my-repository` instead of `/`.

To use a custom domain, configure it in GitHub Pages, update the DNS records with your provider, and rerun the workflow to refresh canonical URLs, RSS, and the sitemap. No deployment secrets or production Node.js server are required.

Before publishing changes, check the build and open the home page, an article, and search in the preview. For a mobile Lighthouse audit, aim for at least 95 in Performance, Accessibility, and SEO.

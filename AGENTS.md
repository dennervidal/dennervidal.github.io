# Repository instructions

- This is Denner Vidal’s personal site. Keep it static: Astro generates the HTML and Pagefind indexes `dist/` at build time. No backend or runtime content API.
- Write site UI and documentation in English. Keep articles in their original language unless asked to translate them; use `lang: pt-BR` for Portuguese articles. Do not invent or silently change profile facts, publication dates, or attribution.
- Keep articles in `src/content/blog/` and follow the frontmatter schema in `src/content.config.ts`. Preserve published slugs. Keep the newest articles first on the home page and in the archive. Drafts must stay out of production output; never put private material in this public repository.
- Use `sitePath()` from `src/blog.ts` for internal URLs so they work both at `/` and under a GitHub Pages base path. Keep article text, title, and subtitle the same width and left-aligned unless asked to change the design.
- Use `npm ci` to install pinned dependencies. For code changes, run `npm run check` and `npm run build`. Use `npm run preview` to test production pages and search; the dev server does not build the Pagefind index. Verify visual changes in the browser.
- The GitHub Actions workflow deploys pushes to `main` to GitHub Pages. Do not push without explicit authorization.

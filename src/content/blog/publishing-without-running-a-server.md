---
title: Publishing without running a server
description: What changes when Git stores the articles and the host only serves static files.
publishedAt: 2026-11-16
tags: [Astro, Publishing]
category: Architecture
---

The first decision I made for this blog was to take the application server out of the picture. To publish a piece, I don’t need a dashboard or an API. I need a file, a review, and a build.

## Git stores the content; the build assembles the site

With the articles in Git, a review can show changes to the text and the layout in the same diff. The build validates the metadata, generates the HTML, and creates a search index. The host just serves the result.

| Lives in the repository | Generated at build time |
| --- | --- |
| Markdown and MDX | HTML for each article |
| Layouts and styles | Pages and CSS |
| Titles and tags | RSS feed and search index |

This choice doesn’t solve everything. If readers needed different permissions or fresh data on each request, I’d reconsider the architecture. For a public collection of articles, rebuilding the site whenever the content changes is a straightforward trade-off.

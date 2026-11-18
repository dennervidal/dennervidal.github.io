import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { posts, postPath, siteDescription, siteTitle } from '../blog';

export const GET: APIRoute = async ({ site }) => rss({
  title: siteTitle, description: siteDescription, site: site!,
  customData: '<language>en</language>',
  items: (await posts()).filter(({ data }) => !data.draft).map(post => ({
    title: post.data.title, description: post.data.description,
    pubDate: post.data.publishedAt, link: new URL(postPath(post), site).href,
    categories: [post.data.category, ...post.data.tags],
  })),
});

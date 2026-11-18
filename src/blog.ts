import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;
export const siteTitle = 'Denner Vidal';
export const siteDescription = 'Software engineer and tech lead building web and mobile products. Notes on software engineering and technical decisions.';
export const sitePath = (path = '') => import.meta.env.BASE_URL.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
export const postPath = (post: Post) => sitePath('articles/' + post.id + '/');
export const dateLabel = (date: Date, locale = 'en') => new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(date);

export async function posts() {
  const entries = await getCollection('blog', ({ data }) => !data.draft || import.meta.env.DEV);
  return entries.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime() || a.id.localeCompare(b.id));
}

export function taxonomySlug(label: string) {
  return encodeURIComponent(label.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[ -]+/g, '-'));
}

export function groups(entries: Post[], kind: 'tags' | 'categories') {
  const result = new Map<string, { label: string; entries: Post[] }>();
  for (const post of entries) {
    const labels = kind === 'tags' ? post.data.tags : [post.data.category];
    for (const [slug, label] of new Map(labels.map(label => [taxonomySlug(label), label]))) {
      const group = result.get(slug);
      if (group) group.entries.push(post);
      else result.set(slug, { label, entries: [post] });
    }
  }
  return [...result].sort((a, b) => a[1].label.localeCompare(b[1].label, 'en'));
}

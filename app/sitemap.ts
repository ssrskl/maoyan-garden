import type { MetadataRoute } from 'next';
import { posts } from '@/.velite';
import { siteConfig } from '@/config/site';

function getBaseUrl() {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL;
  return envUrl && envUrl.length > 0 ? envUrl : siteConfig.url;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl().replace(/\/$/, '');

  const staticRoutes: MetadataRoute.Sitemap = [
    '/',
    '/blog',
    '/tags',
    '/archive',
    '/about',
    '/moments',
    '/gallery',
    '/record',
    '/search',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts
    .filter((p) => p.published)
    .map((p) => ({
      url: `${base}/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  return [...staticRoutes, ...postRoutes];
}
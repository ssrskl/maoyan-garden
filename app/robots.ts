import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

function getBaseUrl() {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL;
  return envUrl && envUrl.length > 0 ? envUrl : siteConfig.url;
}

export default function robots(): MetadataRoute.Robots {
  const base = getBaseUrl().replace(/\/$/, '');
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
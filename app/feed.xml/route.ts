import { NextResponse } from 'next/server';
import { posts } from '@/.velite';
import { siteConfig } from '@/config/site';

function getBaseUrl() {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL;
  return envUrl && envUrl.length > 0 ? envUrl : siteConfig.url;
}

function escape(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const base = getBaseUrl().replace(/\/$/, '');
  const items = posts
    .filter((p) => p.published)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .map((p) => {
      const link = `${base}/${p.slug}`;
      const title = escape(p.title);
      const description = escape(p.description || '');
      const pubDate = new Date(p.date).toUTCString();
      const categories = (p.tags || []).map((t) => `<category>${escape(t)}</category>`).join('');
      return `\n    <item>\n      <title>${title}</title>\n      <link>${link}</link>\n      <guid>${link}</guid>\n      <pubDate>${pubDate}</pubDate>\n      <description><![CDATA[${p.description || ''}]]></description>\n      ${categories}\n    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>${escape(siteConfig.name)}</title>\n    <link>${base}</link>\n    <description>${escape(siteConfig.description)}</description>\n    ${items}\n  </channel>\n</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600',
    },
  });
}
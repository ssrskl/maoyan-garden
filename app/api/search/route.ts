import { NextResponse } from 'next/server';
import { posts } from '@/.velite';
import type { Post } from '@/.velite';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get('q') || '').trim();
  const tagsParam = (searchParams.get('tags') || '').trim();
  const sort = (searchParams.get('sort') || 'relevance').toLowerCase();
  const tagFilters = tagsParam ? tagsParam.split(',').map((t) => t.toLowerCase()) : [];

  const q = query.toLowerCase();

  const base = posts.filter((p: Post) => p.published);

  const scored = base
    .map((p: Post) => {
      const title = p.title.toLowerCase();
      const desc = (p.description || '').toLowerCase();
      const ptags = (p.tags || []).map((t) => t.toLowerCase());
      const body = (p.body || '').toLowerCase();

      const matchTitle = q ? (title.includes(q) ? 1 : 0) : 0;
      const matchDesc = q ? (desc.includes(q) ? 1 : 0) : 0;
      const matchTags = q ? (ptags.some((t) => t.includes(q)) ? 1 : 0) : 0;
      const matchBody = q ? (body.includes(q) ? 1 : 0) : 0;
      const score = matchTitle * 4 + matchDesc * 2 + matchTags * 2 + matchBody * 2;

      const passTags = tagFilters.length
        ? ptags.some((t) => tagFilters.includes(t))
        : true;

      const passQuery = q ? score > 0 : true;

      return { p, score, pass: passTags && passQuery };
    })
    .filter((x) => x.pass)
    .sort((a, b) => {
      if (sort === 'date') {
        return +new Date(b.p.date) - +new Date(a.p.date);
      }
      if (b.score !== a.score) return b.score - a.score;
      return +new Date(b.p.date) - +new Date(a.p.date);
    })
    .map(({ p }) => ({
      slug: p.slug,
      title: p.title,
      description: p.description || '',
      date: p.date,
      tags: p.tags || [],
    }));

  return NextResponse.json({ results: scored });
}
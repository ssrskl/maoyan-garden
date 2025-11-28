import { NextResponse } from 'next/server';
import { posts } from '@/.velite';

export async function GET() {
  const map: Record<string, number> = {};
  posts.forEach((p) => {
    if (!p.published) return;
    (p.tags || []).forEach((t) => {
      map[t] = (map[t] || 0) + 1;
    });
  });
  const tags = Object.keys(map)
    .sort((a, b) => map[b] - map[a])
    .map((name) => ({ name, count: map[name] }));
  return NextResponse.json({ tags });
}

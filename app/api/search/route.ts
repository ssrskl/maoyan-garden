import { NextResponse } from 'next/server';
import { posts } from '@/.velite';
import type { Post } from '@/.velite';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const lowercaseQuery = query.toLowerCase();
  
  // 搜索文章标题、描述和标签
  const results = posts
    .filter((post: Post) => post.published)
    .filter((post: Post) => {
      return (
        post.title.toLowerCase().includes(lowercaseQuery) ||
        (post.description && post.description.toLowerCase().includes(lowercaseQuery)) ||
        (post.tags && post.tags.some((tag: string) => tag.toLowerCase().includes(lowercaseQuery)))
      );
    })
    .map((post: Post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description || '',
      date: post.date,
      tags: post.tags || [],
    }));

  return NextResponse.json({ results });
} 
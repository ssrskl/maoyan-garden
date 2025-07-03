'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from '@/components/search';
import { PostItem } from '@/components/post-item';
import { Skeleton } from '@/components/ui/skeleton';

interface SearchResult {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchResults() {
      if (!query) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.error('搜索出错:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [query]);

  return (
    <main className="container relative py-6 lg:py-10">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">搜索</h1>
        <p className="text-muted-foreground">搜索博客内容</p>
        <div className="max-w-md">
          <Search />
        </div>
      </div>

      <div className="mb-4 mt-8">
        {query ? (
          <p className="text-lg text-muted-foreground">
            搜索 "{query}" 的结果: {results.length} 个
          </p>
        ) : (
          <p className="text-lg text-muted-foreground">请输入搜索关键词</p>
        )}
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
        </div>
      ) : (
        <div className="divide-y divide-border rounded-md border">
          {results.length > 0 ? (
            results.map((post) => (
              <PostItem
                key={post.slug}
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
              />
            ))
          ) : query ? (
            <p className="p-4 text-center text-muted-foreground">没有找到相关结果</p>
          ) : null}
        </div>
      )}
    </main>
  );
} 
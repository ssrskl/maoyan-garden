// 这是客户端组件
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from '@/components/search';
import { PostItem } from '@/components/post-item';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchResult {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [allTags, setAllTags] = useState<{ name: string; count: number }[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sort, setSort] = useState<'relevance' | 'date'>('relevance');

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (query) params.set('q', query);
        if (selectedTags.length) params.set('tags', selectedTags.join(','));
        if (sort) params.set('sort', sort);
        const response = await fetch(`/api/search?${params.toString()}`);
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
  }, [query, selectedTags, sort]);

  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch('/api/tags');
        const data = await res.json();
        setAllTags(data.tags || []);
      } catch {}
    }
    fetchTags();
  }, []);

  return (
    <>
      <div className="max-w-md mb-8">
        <Search />
      </div>

      <div className="mb-4 mt-8">
        {query ? (
          <p className="text-lg text-muted-foreground">
            搜索 {query} 的结果: {results.length} 个
          </p>
        ) : (
          <p className="text-lg text-muted-foreground">请输入搜索关键词</p>
        )}
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {allTags.map((t) => (
            <Button
              key={t.name}
              size="sm"
              variant={selectedTags.includes(t.name) ? 'default' : 'outline'}
              className={cn('rounded-full')}
              onClick={() =>
                setSelectedTags((prev) =>
                  prev.includes(t.name)
                    ? prev.filter((x) => x !== t.name)
                    : [...prev, t.name]
                )
              }
            >
              {t.name} {t.count}
            </Button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-muted-foreground">排序</span>
          <select
            className="border rounded px-2 py-1 text-sm bg-background"
            value={sort}
            onChange={(e) => setSort(e.target.value as 'relevance' | 'date')}
          >
            <option value="relevance">相关度</option>
            <option value="date">时间</option>
          </select>
        </div>
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
                query={query}
              />
            ))
          ) : query ? (
            <p className="p-4 text-center text-muted-foreground">没有找到相关结果</p>
          ) : null}
        </div>
      )}
    </>
  );
}
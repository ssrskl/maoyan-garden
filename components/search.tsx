'use client';
import { useState, useCallback, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';

export function Search() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  // 使用debounce优化搜索性能
  const debouncedNavigate = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    }, 300),
    [router]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  useEffect(() => {
    if (query.trim()) {
      debouncedNavigate(query);
    }
    return () => {
      debouncedNavigate.cancel();
    };
  }, [query, debouncedNavigate]);

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
      <div className="relative flex-1">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="搜索文章..."
          className="w-full pl-8"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        />
      </div>
      <Button type="submit" variant="outline" size="icon">
        <SearchIcon className="h-4 w-4" />
        <span className="sr-only">搜索</span>
      </Button>
    </form>
  );
} 
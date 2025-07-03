import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { SearchContent } from './search-content';

export default function SearchPage() {
  return (
    <main className="container relative py-6 lg:py-10">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">搜索</h1>
        <p className="text-muted-foreground">搜索博客内容</p>
      </div>
      <Suspense fallback={<SearchSkeleton />}>
        <SearchContent />
      </Suspense>
    </main>
  );
}

function SearchSkeleton() {
  return (
    <div>
      <div className="max-w-md mb-8">
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-6 w-48 mb-8" />
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
    </div>
  );
}

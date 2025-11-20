"use client";
import { posts } from "#site/content";
import Link from "next/link";
import { useMemo } from "react";
import type { Post } from "#site/content";

export default function Backlinks({ post }: { post: Post }) {
  const list = useMemo(() => {
    const target = `/${post.slug}`;
    return posts
      .filter((p) => p.published && p.slug !== post.slug)
      .filter((p) => {
        const body = p.body || "";
        return body.includes(target) || body.includes(post.title);
      })
      .slice(0, 8)
      .map((p) => ({ slug: p.slug, title: p.title, description: p.description || "", date: p.date }));
  }, [post]);

  if (!list.length) return null;
  return (
    <div className="mt-8">
      <div className="text-lg font-semibold mb-3 text-muted-foreground">被引用于</div>
      <div className="rounded-md border divide-y divide-border">
        {list.map((p) => (
          <div key={p.slug} className="px-2 py-1">
            <Link href={`/${p.slug}`} className="text-sm font-medium hover:underline">
              {p.title}
            </Link>
            {p.description && <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{p.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
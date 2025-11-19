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
    <div className="mt-12">
      <div className="text-2xl font-bold mb-4">被引用于</div>
      <div className="divide-y divide-border rounded-md border">
        {list.map((p) => (
          <div key={p.slug} className="p-4">
            <Link href={`/${p.slug}`} className="font-medium hover:underline">
              {p.title}
            </Link>
            {p.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{p.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
"use client";
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

interface P {
  slug: string;
  title: string;
  tags: string[];
  status: string;
  date: string;
}

export default function MapContent({ posts }: { posts: P[] }) {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [hoverNode, setHoverNode] = useState<string | null>(null);
  const tagStats = useMemo(() => {
    const m: Record<string, number> = {};
    posts.forEach((p) => p.tags.forEach((t) => (m[t] = (m[t] || 0) + 1)));
    return Object.entries(m)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  }, [posts]);

  const visiblePosts = useMemo(() => {
    if (!activeTags.length) return posts;
    return posts.filter((p) => p.tags.some((t) => activeTags.includes(t)));
  }, [posts, activeTags]);

  const tags = useMemo(() => {
    const set = new Set<string>();
    visiblePosts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [visiblePosts]);

  const layout = useMemo(() => {
    const W = 1200;
    const H = 700;
    const centerX = W / 2;
    const centerY = H / 2;
    const R = Math.min(W, H) / 2 - 60;
    const tagPos: Record<string, { x: number; y: number }> = {};
    const nTags = tags.length || 1;
    tags.forEach((t, i) => {
      const ang = (2 * Math.PI * i) / nTags;
      tagPos[t] = { x: centerX + R * Math.cos(ang), y: centerY + R * Math.sin(ang) };
    });
    const postPos: Record<string, { x: number; y: number }> = {};
    visiblePosts.forEach((p, i) => {
      const t = p.tags.find((x) => tags.includes(x)) || tags[i % nTags];
      const base = tagPos[t];
      const rx = 120 + (i % 5) * 10;
      const ry = 80 + ((i >> 2) % 5) * 10;
      postPos[p.slug] = { x: base.x + (i % 2 === 0 ? rx : -rx), y: base.y + (i % 3 === 0 ? ry : -ry) };
    });
    const edges: Array<{ a: string; b: string; type: 'pt' | 'pp'; tag?: string }> = [];
    visiblePosts.forEach((p) => {
      p.tags.forEach((t) => {
        if (tags.includes(t)) edges.push({ a: p.slug, b: t, type: 'pt', tag: t });
      });
    });
    for (let i = 0; i < visiblePosts.length; i++) {
      for (let j = i + 1; j < visiblePosts.length; j++) {
        const a = visiblePosts[i];
        const b = visiblePosts[j];
        const shared = a.tags.find((t) => b.tags.includes(t));
        if (shared) edges.push({ a: a.slug, b: b.slug, type: 'pp', tag: shared });
      }
    }
    return { W, H, tagPos, postPos, edges };
  }, [tags, visiblePosts]);

  return (
    <div className="px-6 py-10">
      <div className="flex items-center gap-2 flex-wrap mb-4">
        {tagStats.map((t) => (
          <button
            key={t.name}
            className={`text-sm border rounded-full px-3 py-1 ${activeTags.includes(t.name) ? 'bg-primary text-primary-foreground' : ''}`}
            onClick={() =>
              setActiveTags((prev) =>
                prev.includes(t.name) ? prev.filter((x) => x !== t.name) : [...prev, t.name]
              )
            }
          >
            {t.name} {t.count}
          </button>
        ))}
        {!!activeTags.length && (
          <button
            className="text-sm border rounded-full px-3 py-1"
            onClick={() => setActiveTags([])}
          >
            重置
          </button>
        )}
      </div>

      <div className="relative w-full overflow-auto border rounded">
        <svg width={layout.W} height={layout.H}>
          {layout.edges.map((e, idx) => {
            const aPos = e.a in layout.postPos ? layout.postPos[e.a] : layout.tagPos[e.a];
            const bPos = e.b in layout.postPos ? layout.postPos[e.b] : layout.tagPos[e.b];
            const active = hoverNode && (e.a === hoverNode || e.b === hoverNode);
            return (
              <line
                key={idx}
                x1={aPos.x}
                y1={aPos.y}
                x2={bPos.x}
                y2={bPos.y}
                stroke={active ? '#ef4444' : '#9ca3af'}
                strokeWidth={active ? 2.5 : 1.2}
                opacity={active ? 0.9 : 0.6}
              />
            );
          })}

          {tags.map((t) => (
            <g key={t}>
              <circle cx={layout.tagPos[t].x} cy={layout.tagPos[t].y} r={16} fill="#3b82f6" />
              <text x={layout.tagPos[t].x + 20} y={layout.tagPos[t].y + 4} fontSize={12} fill="#1f2937">
                {t}
              </text>
            </g>
          ))}

          {visiblePosts.map((p) => (
            <motion.g key={p.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <circle
                cx={layout.postPos[p.slug].x}
                cy={layout.postPos[p.slug].y}
                r={10}
                fill={p.status === 'evergreen' ? '#10b981' : p.status === 'growing' ? '#f59e0b' : '#6366f1'}
                onMouseEnter={() => setHoverNode(p.slug)}
                onMouseLeave={() => setHoverNode(null)}
                onClick={() => (window.location.href = `/${p.slug}`)}
              />
              <text x={layout.postPos[p.slug].x + 14} y={layout.postPos[p.slug].y + 4} fontSize={12} fill="#111827">
                {p.title}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>
    </div>
  );
}
"use client";
import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

interface P {
  slug: string;
  title: string;
  tags: string[];
  status: string;
  date: string;
}

type N = { id: string; label: string; type: "post" | "tag"; status?: string };
type L = { source: string; target: string };

export default function MapContent({ posts }: { posts: P[] }) {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 900, h: 600 });

  useEffect(() => {
    const update = () => {
      const w = wrapRef.current?.clientWidth || 900;
      const h = Math.max(500, Math.min(720, Math.round(w * 0.6)));
      setSize({ w, h });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const tagStats = useMemo(() => {
    const m: Record<string, number> = {};
    posts.forEach((p) => p.tags.forEach((t) => (m[t] = (m[t] || 0) + 1)));
    return Object.entries(m)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!activeTags.length) return posts;
    return posts.filter((p) => p.tags.some((t) => activeTags.includes(t)));
  }, [posts, activeTags]);

  const data = useMemo(() => {
    const tags = new Set<string>();
    filteredPosts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    const nodes: N[] = [];
    const links: L[] = [];
    Array.from(tags).forEach((t) => nodes.push({ id: `tag:${t}`, label: t, type: "tag" }));
    filteredPosts.forEach((p) => nodes.push({ id: `post:${p.slug}`, label: p.title, type: "post", status: p.status }));
    filteredPosts.forEach((p) => {
      p.tags.forEach((t) => {
        if (tags.has(t)) links.push({ source: `post:${p.slug}`, target: `tag:${t}` });
      });
    });
    for (let i = 0; i < filteredPosts.length; i++) {
      for (let j = i + 1; j < filteredPosts.length; j++) {
        const a = filteredPosts[i], b = filteredPosts[j];
        if (a.tags.some((t) => b.tags.includes(t))) links.push({ source: `post:${a.slug}`, target: `post:${b.slug}` });
      }
    }
    return { nodes, links };
  }, [filteredPosts]);

  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const el = mountRef.current;
    el.innerHTML = "";
    const svg = d3.select(el).append("svg").attr("width", size.w).attr("height", size.h);
    const g = svg.append("g");
    const color = (n: N) => (n.type === "tag" ? "#3b82f6" : n.status === "evergreen" ? "#10b981" : n.status === "growing" ? "#f59e0b" : "#6366f1");
    const link = g.append("g").attr("stroke", "#9ca3af").attr("stroke-opacity", 0.6).selectAll("line").data(data.links).join("line").attr("stroke-width", 1.2);
    const node = g.append("g").selectAll("g").data(data.nodes).join("g").call(
      d3.drag<SVGGElement, N>()
        .on("start", (event) => {
          if (!event.active) sim.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        })
        .on("drag", (event: d3.D3DragEvent<SVGGElement, N, N>) => {
          (event.subject as any).fx = event.x;
          (event.subject as any).fy = event.y;
        })
        .on("end", (event) => {
          if (!event.active) sim.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
        }) as any
    );
    node.append("circle").attr("r", (d: any) => (d.type === "tag" ? 12 : 8)).attr("fill", (d: any) => color(d)).on("dblclick", (_: any, d: any) => {
      if (d.type === "post") {
        const slug = d.id.replace("post:", "");
        window.location.href = `/${slug}`;
      }
    });
    node.append("text").text((d: any) => d.label).attr("x", 14).attr("y", 4).attr("font-size", 12).attr("fill", "#111827");
    const sim = d3
      .forceSimulation(data.nodes as any)
      .force("link", d3.forceLink(data.links as any).id((d: any) => d.id).distance(90).strength(0.4))
      .force("charge", d3.forceManyBody().strength(-90))
      .force("center", d3.forceCenter(size.w / 2, size.h / 2))
      .on("tick", () => {
        link.attr("x1", (d: any) => d.source.x).attr("y1", (d: any) => d.source.y).attr("x2", (d: any) => d.target.x).attr("y2", (d: any) => d.target.y);
        node.attr("transform", (d: any) => `translate(${d.x}, ${d.y})`);
      });
    const zoom = d3.zoom<SVGSVGElement, unknown>().scaleExtent([0.5, 4]).on("zoom", (e) => g.attr("transform", e.transform.toString()));
    svg.call(zoom as any);
    return () => {
      svg.remove();
      sim.stop();
    };
  }, [data, size]);

  return (
    <div className="px-6 py-10">
      <div className="flex items-center gap-2 flex-wrap mb-4">
        {tagStats.map((t) => (
          <button
            key={t.name}
            className={`text-sm border rounded-full px-3 py-1 ${activeTags.includes(t.name) ? 'bg-primary text-primary-foreground' : ''}`}
            onClick={() =>
              setActiveTags((prev) => (prev.includes(t.name) ? prev.filter((x) => x !== t.name) : [...prev, t.name]))
            }
          >
            {t.name} {t.count}
          </button>
        ))}
        {!!activeTags.length && (
          <button className="text-sm border rounded-full px-3 py-1" onClick={() => setActiveTags([])}>重置</button>
        )}
      </div>
      <div ref={wrapRef} className="relative w-full overflow-auto border rounded">
        <div ref={mountRef} style={{ width: size.w, height: size.h }} />
      </div>
    </div>
  );
}
"use client";
import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Post } from "#site/content";

type Node = { id: string; label: string; type: "post" | "tag"; status?: string };
type Link = { source: string; target: string };

function buildData(post: Post, all: Array<Post>) {
  const tagSet = new Set(post.tags || []);
  const related = all
    .filter((p) => p.published && p.slug !== post.slug)
    .map((p) => ({ p, score: (p.tags || []).reduce((a, t) => (tagSet.has(t) ? a + 1 : a), 0) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map((x) => x.p);

  const nodes: Node[] = [{ id: `post:${post.slug}`, label: post.title, type: "post", status: post.status }];
  (post.tags || []).forEach((t) => nodes.push({ id: `tag:${t}`, label: t, type: "tag" }));
  related.forEach((p) => nodes.push({ id: `post:${p.slug}`, label: p.title, type: "post", status: p.status }));

  const links: Link[] = [];
  (post.tags || []).forEach((t) => links.push({ source: `post:${post.slug}`, target: `tag:${t}` }));
  related.forEach((p) => {
    (p.tags || []).forEach((t) => {
      if (tagSet.has(t)) links.push({ source: `post:${p.slug}`, target: `tag:${t}` });
    });
    links.push({ source: `post:${post.slug}`, target: `post:${p.slug}` });
  });
  return { nodes, links };
}

function renderGraph(el: HTMLDivElement, data: { nodes: Node[]; links: Link[] }, size: { w: number; h: number }) {
  el.innerHTML = "";
  const svg = d3.select(el).append("svg").attr("width", size.w).attr("height", size.h);
  const g = svg.append("g");

  const color = (n: Node) =>
    n.type === "tag"
      ? "hsl(var(--graph-tag))"
      : n.id.startsWith("post:") && n.status === "evergreen"
      ? "hsl(var(--graph-evergreen))"
      : "hsl(var(--graph-default))";

  const link = g
    .append("g")
    .attr("stroke", "hsl(var(--graph-link))")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(data.links)
    .join("line")
    .attr("stroke-width", 1.2);

  const node = g
    .append("g")
    .selectAll("g")
    .data(data.nodes)
    .join("g")
    .call(
      d3
        .drag<SVGGElement, Node>()
        .on("start", (event) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        })
        .on("drag", (event) => {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        })
        .on("end", (event) => {
          if (!event.active) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
        }) as any
    );

  node
    .append("circle")
    .attr("r", (d) => (d.type === "tag" ? 12 : 8))
    .attr("fill", (d) => color(d))
    .on("dblclick", (_, d) => {
      if (d.type === "post") {
        const slug = d.id.replace("post:", "");
        window.location.href = `/${slug}`;
      }
    });

  node
    .append("text")
    .text((d) => d.label)
    .attr("x", 14)
    .attr("y", 4)
    .attr("font-size", 12)
    .attr("fill", "hsl(var(--graph-label))");

  const simulation = d3
    .forceSimulation(data.nodes as any)
    .force(
      "link",
      d3
        .forceLink(data.links as any)
        .id((d: any) => d.id)
        .distance(80)
        .strength(0.4)
    )
    .force("charge", d3.forceManyBody().strength(-80))
    .force("center", d3.forceCenter(size.w / 2, size.h / 2))
    .on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);
      node.attr("transform", (d: any) => `translate(${d.x}, ${d.y})`);
    });

  const zoom = d3.zoom<SVGSVGElement, unknown>().scaleExtent([0.5, 4]).on("zoom", (e) => {
    g.attr("transform", e.transform.toString());
  });
  svg.call(zoom as any);
}

export default function D3RelatedGraph({ post, allPosts }: { post: Post; allPosts: Array<Post> }) {
  const [expanded, setExpanded] = useState(false);
  const smallRef = useRef<HTMLDivElement | null>(null);
  const bigRef = useRef<HTMLDivElement | null>(null);
  const data = useMemo(() => buildData(post, allPosts), [post, allPosts]);

  useEffect(() => {
    if (!smallRef.current) return;
    renderGraph(smallRef.current, data, { w: 320, h: 220 });
  }, [data]);

  useEffect(() => {
    if (!expanded || !bigRef.current) return;
    renderGraph(bigRef.current, data, { w: 900, h: 600 });
  }, [expanded, data]);

  return (
    <div className="mt-4">
      <div className="text-sm text-muted-foreground mb-2">知识图谱</div>
      <div className="rounded-md cursor-zoom-in" onClick={() => setExpanded(true)}>
        <div ref={smallRef} />
      </div>
      {expanded && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setExpanded(false)}>
          <div className="bg-background rounded-lg shadow-lg p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end mb-2">
              <button className="px-3 py-1 border rounded" onClick={() => setExpanded(false)}>关闭</button>
            </div>
            <div ref={bigRef} />
          </div>
        </div>
      )}
    </div>
  );
}

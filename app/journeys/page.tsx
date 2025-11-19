"use client"

import { posts } from "#site/content";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { containerVariants, fadeInUp, itemVariants } from "@/styles/animation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

type Status = "seedling" | "growing" | "evergreen";

export default function JourneysPage() {
  const tagsStats = useMemo(() => {
    const m: Record<string, number> = {};
    posts.forEach((p) => {
      if (!p.published) return;
      (p.tags || []).forEach((t) => (m[t] = (m[t] || 0) + 1));
    });
    return Object.entries(m)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  }, []);

  const [activeTag, setActiveTag] = useState<string>(tagsStats[0]?.name || "");
  const [readSet, setReadSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    const key = `journeys:${activeTag}`;
    try {
      const raw = localStorage.getItem(key);
      setReadSet(new Set(raw ? JSON.parse(raw) : []));
    } catch {
      setReadSet(new Set());
    }
  }, [activeTag]);

  const path = useMemo(() => {
    const rank: Record<Status, number> = { evergreen: 3, growing: 2, seedling: 1 };
    return posts
      .filter((p) => p.published && (p.tags || []).includes(activeTag))
      .sort((a, b) => {
        const rs = (rank[(a.status as Status) || "seedling"] || 0) - (rank[(b.status as Status) || "seedling"] || 0);
        if (rs !== 0) return -rs;
        return +new Date(a.date) - +new Date(b.date);
      });
  }, [activeTag]);

  const progress = path.length ? Math.round((readSet.size / path.length) * 100) : 0;

  const toggleRead = (slug: string) => {
    const next = new Set(readSet);
    if (next.has(slug)) next.delete(slug); else next.add(slug);
    setReadSet(next);
    try {
      localStorage.setItem(`journeys:${activeTag}`, JSON.stringify(Array.from(next)));
    } catch {}
  };

  const startTag = (t: string) => setActiveTag(t);

  const copyPlan = async () => {
    const lines = path.map((p, i) => `${i + 1}. ${p.title} (${p.slug})`).join("\n");
    const text = `修行路径 · ${activeTag}\n\n${lines}`;
    try { await navigator.clipboard.writeText(text); } catch {}
  };

  return (
    <motion.div
      className="flex justify-center pt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex md:w-2/3 sm:w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="gap-5 flex flex-col justify-center px-6 w-full">
          <motion.div className="gap-5 flex flex-col justify-center" variants={fadeInUp}>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">首页</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/journeys" className="font-bold text-black">修行路径</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <motion.h1 className="text-4xl font-bold my-4" variants={itemVariants}>修行路径</motion.h1>
            <motion.p variants={itemVariants}>从一个主题出发，按路径逐篇修行，记录你的成长进度</motion.p>
          </motion.div>

          <motion.div className="my-3 border-b" variants={itemVariants} />

          <motion.div className="flex flex-wrap gap-2" variants={itemVariants}>
            {tagsStats.slice(0, 20).map((t) => (
              <Button key={t.name} size="sm" variant={activeTag === t.name ? "default" : "outline"} className="rounded-full" onClick={() => startTag(t.name)}>
                {t.name} {t.count}
              </Button>
            ))}
          </motion.div>

          <motion.div className="mt-6 space-y-4" variants={itemVariants}>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">主题：{activeTag || "未选择"}</Badge>
              <div className="flex-1">
                <Progress value={progress} />
              </div>
              <span className="text-sm text-muted-foreground">{progress}%</span>
              <Button size="sm" variant="outline" onClick={copyPlan}>复制路径</Button>
            </div>

            <ul className="list-none space-y-3">
              {path.map((p, i) => (
                <li key={p.slug} className="p-4 border rounded-lg flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary grid place-items-center font-mono">{i + 1}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <a href={`/${p.slug}`} className="font-medium text-lg hover:text-primary transition-colors">{p.title}</a>
                      <Badge variant="outline">{p.status}</Badge>
                    </div>
                    {!!p.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{p.description}</p>}
                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                      {(p.tags || []).map((t) => (
                        <Badge key={t} variant="secondary" className="rounded-full">{t}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Button size="sm" variant={readSet.has(p.slug) ? "default" : "outline"} onClick={() => toggleRead(p.slug)}>
                      {readSet.has(p.slug) ? "已读" : "标记已读"}
                    </Button>
                    <Button size="sm" variant="link" onClick={() => (window.location.href = `/${p.slug}`)}>开始</Button>
                  </div>
                </li>
              ))}
              {!path.length && <div className="p-4 text-center text-muted-foreground">请选择一个标签开始修行</div>}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
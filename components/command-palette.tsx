"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import * as React from "react";
import { Command } from "cmdk";
import { posts } from "#site/content";
import { useRouter } from "next/navigation";
import { SiSearxng } from "react-icons/si";
import { FaHome, FaBookOpen, FaTags, FaImages, FaArchive, FaInfoCircle, FaMap } from "react-icons/fa";
import { slug as slugify } from "github-slugger";

export default function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [value, setValue] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      if ((isMac && e.metaKey && e.key.toLowerCase() === "k") || (!isMac && e.ctrlKey && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        onOpenChange(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onOpenChange]);

  const go = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const highlight = (text?: string, q?: string) => {
    if (!text || !q) return text;
    const re = new RegExp(`(${escapeRegExp(q)})`, "gi");
    const parts = text.split(re);
    return parts.map((part, i) =>
      re.test(part) ? (
        <mark key={i} className="bg-yellow-200 text-inherit px-0.5 rounded-sm">{part}</mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  const filtered = posts
    .filter((p) => p.published)
    .filter((p) => {
      if (!value) return true;
      const q = value.toLowerCase();
      const title = p.title.toLowerCase();
      const desc = (p.description || "").toLowerCase();
      const body = (p.body || "").toLowerCase();
      const tagHit = (p.tags || []).some((t) => t.toLowerCase().includes(q));
      return title.includes(q) || desc.includes(q) || tagHit || body.includes(q);
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, value ? 50 : 12);

  const tagMap: Record<string, number> = {};
  posts.forEach((p) => {
    if (!p.published) return;
    (p.tags || []).forEach((t) => {
      tagMap[t] = (tagMap[t] || 0) + 1;
    });
  });
  const tagResults = Object.entries(tagMap)
    .map(([name, count]) => ({ name, count }))
    .filter((t) => {
      if (!value) return true;
      const q = value.toLowerCase();
      return t.name.toLowerCase().includes(q);
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, value ? 30 : 10);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden sm:max-w-xl border rounded-xl shadow-xl">
        <Command label="命令面板" className="bg-background px-4">
          <div className="flex items-center gap-2 px-4 py-3 border-b">
            <SiSearxng className="w-5 h-5 text-muted-foreground" />
            <Command.Input
              autoFocus
              value={value}
              onValueChange={setValue}
              placeholder="搜索文章、跳转页面"
              className="w-full px-0 py-0 outline-none bg-transparent text-sm"
            />
          </div>
          <Command.List className="max-h-[60vh] overflow-auto py-2">
            <Command.Empty className="px-4 py-6 text-center text-sm text-muted-foreground">没有找到相关内容</Command.Empty>
            <Command.Group heading="导航" className="px-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  { label: "主页", href: "/", icon: <FaHome />, desc: "回到首页" },
                  { label: "文章", href: "/blog", icon: <FaBookOpen />, desc: "浏览全部文章" },
                  { label: "搜索", href: "/search", icon: <SiSearxng />, desc: "全站检索" },
                  { label: "标笺", href: "/tags", icon: <FaTags />, desc: "标签导览" },
                  { label: "藏籍", href: "/archive", icon: <FaArchive />, desc: "归档与时间线" },
                  { label: "影函", href: "/gallery", icon: <FaImages />, desc: "照片与相册" },
                  { label: "瞬华", href: "/moments", icon: <FaImages />, desc: "片刻与记事" },
                  { label: "关于我", href: "/about", icon: <FaInfoCircle />, desc: "简介与联系" },
                  { label: "地图", href: "/map", icon: <FaMap />, desc: "知识图谱" },
                ].map((item) => (
                  <Command.Item
                    key={item.href}
                    onSelect={() => go(item.href)}
                    className="px-4 py-3 cursor-pointer rounded-md border flex items-center gap-3 hover:bg-accent aria-selected:bg-accent aria-selected:text-accent-foreground"
                  >
                    <span className="text-muted-foreground">
                      {item.icon}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{item.label}</span>
                      <span className="text-xs text-muted-foreground">{item.desc}</span>
                    </div>
                  </Command.Item>
                ))}
              </div>
            </Command.Group>
            <Command.Separator className="my-2" />
            <Command.Group heading={value ? "标签" : "热门标签"} className="px-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {tagResults.map((t) => (
                  <Command.Item
                    key={t.name}
                    onSelect={() => go(`/tags/${slugify(t.name)}`)}
                    className="px-3 py-2 cursor-pointer rounded-md border flex items-center gap-2 hover:bg-accent aria-selected:bg-accent aria-selected:text-accent-foreground"
                  >
                    <FaTags className="text-muted-foreground" />
                    <span className="text-sm">{highlight(t.name, value)}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{t.count}</span>
                  </Command.Item>
                ))}
              </div>
            </Command.Group>
            <Command.Separator className="my-2" />
            <Command.Group heading={value ? "文章" : "最新文章"} className="px-2">
              {filtered.map((p) => (
                <Command.Item
                  key={p.slug}
                  onSelect={() => go(`/${p.slug}`)}
                  className="px-4 py-2 cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground rounded"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{highlight(p.title, value)}</span>
                    {!!p.description && (
                      <span className="text-xs text-muted-foreground line-clamp-1">{highlight(p.description, value)}</span>
                    )}
                  </div>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
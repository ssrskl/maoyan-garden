"use client";

import { useEffect, useRef, useState } from "react";
import { MDXContent } from "@/components/mdx-components";

const DEFAULT_SOURCE = `# 在线编辑器\n\n这是一个 **Markdown/MDX** 在线编辑示例。\n\n> 你可以在左侧输入内容，右侧会实时编译并预览。\n\n## 自定义组件示例\n\n<Callout>\n  这是一个 Callout 组件。\n</Callout>\n\n<Tabs defaultValue=\"a\">\n  <TabsList>\n    <TabsTrigger value=\"a\">A</TabsTrigger>\n    <TabsTrigger value=\"b\">B</TabsTrigger>\n  </TabsList>\n  <TabsContent value=\"a\">内容 A</TabsContent>\n  <TabsContent value=\"b\">内容 B</TabsContent>\n</Tabs>\n\n\`\`\`ts\nconst hello = "world";\nconsole.log(hello);\n\`\`\`\n`;

export default function EditorClient() {
  const [source, setSource] = useState(DEFAULT_SOURCE);
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isCompiling, setIsCompiling] = useState(false);
  const requestIdRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    const requestId = ++requestIdRef.current;
    const controller = new AbortController();
    setIsCompiling(true);

    const timer = setTimeout(async () => {
      try {
        const response = await fetch("/api/mdx/compile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ source }),
          signal: controller.signal,
        });

        if (cancelled || requestId !== requestIdRef.current) {
          return;
        }

        const payload = (await response.json()) as {
          code?: string;
          error?: string;
        };

        if (!response.ok || payload.error) {
          setError(payload.error ?? "编译失败");
          setCode("");
          return;
        }

        setCode(payload.code ?? "");
        setError("");
      } catch (err) {
        if (cancelled || requestId !== requestIdRef.current) {
          return;
        }

        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        const message = err instanceof Error ? err.message : "编译失败";
        setError(message);
      } finally {
        if (!cancelled && requestId === requestIdRef.current) {
          setIsCompiling(false);
        }
      }
    }, 250);

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timer);
    };
  }, [source]);

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 py-10">
      <div className="mb-6 flex flex-col gap-2">
        <div className="text-2xl font-bold text-foreground">在线 MDX 编辑器</div>
        <div className="text-sm text-muted-foreground">
          左侧编写 Markdown/MDX，右侧实时预览编译效果。支持项目内自定义组件。
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-foreground">编辑区</div>
            <div className="text-xs text-muted-foreground">
              {isCompiling ? "编译中..." : "已就绪"}
            </div>
          </div>
          <textarea
            value={source}
            onChange={(event) => setSource(event.target.value)}
            className="h-[70vh] w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-sm leading-relaxed text-foreground shadow-sm outline-none transition focus:border-ring"
            spellCheck={false}
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-foreground">预览区</div>
            {error ? (
              <div className="text-xs text-red-600">编译错误</div>
            ) : (
              <div className="text-xs text-muted-foreground">实时预览</div>
            )}
          </div>

          <div className="relative h-[70vh] overflow-auto rounded-lg border border-border bg-card p-6 shadow-sm">
            {error ? (
              <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <div className="font-semibold">编译失败</div>
                <div className="mt-2 whitespace-pre-wrap break-words">{error}</div>
              </div>
            ) : code ? (
              <div className="prose prose-slate max-w-none dark:prose-invert prose-p:text-foreground prose-headings:text-foreground prose-li:text-foreground prose-strong:text-foreground">
                <MDXContent code={code} />
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">等待输入...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client"
import React, { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

type PreProps = React.HTMLAttributes<HTMLPreElement> & { children: React.ReactNode };

export default function CodeBlock({ children, className, ...props }: PreProps) {
  const preRef = useRef<HTMLPreElement | null>(null);
  const [copied, setCopied] = useState(false);

  const language = useMemo(() => {
    const codeEl = preRef.current?.querySelector("code") as HTMLElement | null;
    return (codeEl?.getAttribute("data-language") || "").toUpperCase();
  }, [children]);

  const handleCopy = async () => {
    const codeEl = preRef.current?.querySelector("code") as HTMLElement | null;
    const text = (codeEl?.innerText || preRef.current?.innerText || "").trim();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      setCopied(false);
    }
  };

  return (
    <div className="relative group">
      <pre ref={preRef} className={className} {...props}>
        {children}
      </pre>
      <div className="absolute top-2 right-2 flex items-center gap-2 
                opacity-0 group-hover:opacity-100 focus-within:opacity-100 
                transition-opacity duration-200 group"> {/* 新增 group 类 */}
        <Button
          type="button"
          size="icon"
          variant="ghost"
          aria-label={copied ? "已复制" : "复制代码"}
          onClick={handleCopy}
          className="h-7 w-7 rounded-full 
              hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800" // 补充交互样式
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-500" />
          ) : (
            // 修正：group-hover 指向父容器的 group，hover 是自身悬浮
            <Copy className="h-4 w-4 text-gray-500 group-hover:text-white hover:text-gray-800 dark:text-gray-400 dark:hover:text-white" />
          )}
        </Button>
      </div>
    </div>
  );
}

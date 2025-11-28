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
      <div className="absolute top-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200 pointer-events-none">
        {language ? (
          <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground border opacity-80 group-hover:opacity-100">{language}</span>
        ) : null}
        <Button
          type="button"
          size="icon"
          variant="ghost"
          aria-label={copied ? "已复制" : "复制代码"}
          onClick={handleCopy}
          className="h-7 w-7 rounded-full pointer-events-auto"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />}
        </Button>
      </div>
    </div>
  );
}

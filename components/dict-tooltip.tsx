import { useState, useCallback } from "react";
import { glossary } from "@/content/dict/glossary";
import { track } from "@/lib/analytics";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export function DictTooltip({ children }: { children: React.ReactNode }) {
  const text = typeof children === "string" ? children : String(children);
  const base = glossary.find((item) => item.term === text || (item.aliases || []).includes(text));

  const [open, setOpen] = useState(false);
  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      setOpen(true);
      track("dict_open", { term: base?.term, source: "keyboard" });
    }
    if (e.key === "Escape") setOpen(false);
  }, [base?.term]);

  if (!base) return <>{children}</>;

  return (
    <HoverCard openDelay={150} closeDelay={100} open={open} onOpenChange={setOpen}>
      <HoverCardTrigger asChild>
        <span
          role="button"
          tabIndex={0}
          onClick={() => {
            setOpen((v) => !v);
            track("dict_open", { term: base.term, source: "click" });
          }}
          onKeyDown={onKeyDown}
          className="underline decoration-dotted cursor-pointer hover:text-black focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          {children}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="z-40">
        <div className="flex flex-col">
          <div className="font-bold">{base.term}</div>
          <div className="flex items-center space-x-2">
            <img className="flex h-6 w-6 shrink-0 overflow-hidden rounded-full my-2" src='/avatar.png' alt='avatar' />
            <div className="text-xs text-zinc-500 ml-2">{base.contributors} 贡献</div>
          </div>
          <div className="rounded-md text-sm bg-secondary max-w-fit px-2 my-2">{base.type}</div>
          <div className="text-xs my-2">{base.definition}</div>
          {base.links?.length ? (
            <>
              <div className="text-sm font-bold">相关链接</div>
              <div className="text-sm my-2">
                {base.links.map((link) => (
                  <div key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track("dict_link_click", { term: base.term, name: link.name, url: link.url })}
                      className="text-primary"
                    >
                      {link.name}
                    </a>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
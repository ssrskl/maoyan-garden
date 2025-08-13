import { glossary } from "@/content/dict/glossary";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export function DictTooltip({ children }: { children: React.ReactNode }) {
  const term = glossary.find((item) => item.term === children);

  if (!term) {
    return <>{children}</>;
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="underline decoration-dotted cursor-pointer">{children}</span>
      </HoverCardTrigger>
      <HoverCardContent className="z-40">
        <div className="flex flex-col">
          <div className="font-bold">{term.term}</div>
          <div className="flex items-center space-x-2">
            <img className="flex h-6 w-6 shrink-0 overflow-hidden rounded-full my-2" src='/avatar.png' alt='avatar' />
            <div className="text-xs text-zinc-500 ml-2">
              {term.contributors} 贡献
            </div>
          </div>
          <div className="rounded-md text-sm bg-secondary max-w-fit px-2 my-2">{term.type}</div>
          <div className="text-xs my-2">{term.definition}</div>
          <div className="text-sm font-bold">相关链接</div>
          <div className="text-sm my-2">
            {term.links.map((link) => (
              <div key={link.name}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-primary">
                  {link.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Leaf, Flower2, TreePine } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status?: "seedling" | "growing" | "evergreen"; // Make status optional to prevent type errors
}

const statusConfig = {
  seedling: {
    icon: <Leaf className="h-4 w-4 text-green-500" />,
    label: "幼苗",
    tooltip: "这篇文章是一个初步的想法或草稿，还在萌芽阶段。",
    className: "border-green-500/50 bg-green-500/10 text-green-700",
  },
  growing: {
    icon: <Flower2 className="h-4 w-4 text-yellow-500" />,
    label: "生长中",
    tooltip: "这篇文章正在积极地补充和完善中，内容会不断更新。",
    className: "border-yellow-500/50 bg-yellow-500/10 text-yellow-700",
  },
  evergreen: {
    icon: <TreePine className="h-4 w-4 text-teal-500" />,
    label: "常青",
    tooltip: "这篇文章已经比较完整和成熟，但仍会定期回顾和更新。",
    className: "border-teal-500/50 bg-teal-500/10 text-teal-700",
  },
};

export function StatusBadge({ status = "seedling" }: StatusBadgeProps) {
  const currentStatus = status && statusConfig[status] ? status : 'seedling';
  const config = statusConfig[currentStatus];
  
  // This check handles any unexpected edge cases, though the default parameter should prevent it.
  if (!config) {
    return null; // Or return a default badge
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium cursor-help",
              config.className
            )}
          >
            {config.icon}
            <span>{config.label}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{config.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
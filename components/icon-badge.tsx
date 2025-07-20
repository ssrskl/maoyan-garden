
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface IconBadgeProps {
  icon: ReactNode;
  label: string;
  className?: string;
}

export function IconBadge({ icon, label, className }: IconBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm text-card-foreground shadow-sm",
        "transition-all duration-300 ease-in-out hover:shadow-md hover:border-primary/50 hover:-translate-y-1",
        className
      )}
    >
      <div className="text-primary">{icon}</div>
      <span className="font-medium">{label}</span>
    </div>
  );
}
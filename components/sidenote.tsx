import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

export function Sidenote({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    // 使用 <small> 标签，因为它在语义上适合用于旁注
    // "sidenote" 类名是关键，我们将用它来应用样式
    <small className={cn("sidenote font-normal", className)}>{children}</small>
  );
}
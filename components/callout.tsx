import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { MdInfoOutline, MdOutlineDangerous, MdOutlineWarning } from "react-icons/md";

interface CalloutProps {
  children?: ReactNode;
  type?: "default" | "warning" | "danger" | "info";
}

export function Callout({
  children,
  type = "info",
  ...props
}: CalloutProps) {
  return (
    <div className="relative pb-8 mr-6">
      <div className="absolute top-0 left-0 z-10">
        <div className="w-12 h-12 flex justify-center items-center">
          {type === "info" && <MdInfoOutline className="w-8 h-8 text-callout-info drop-shadow-icon-bg-light dark:drop-shadow-icon-bg-dark" />}
          {type === "warning" && <MdOutlineWarning className="w-8 h-8 text-callout-warning drop-shadow-icon-bg-light dark:drop-shadow-icon-bg-dark" />}
          {type === "danger" && <MdOutlineDangerous className="w-8 h-8 text-callout-danger drop-shadow-icon-bg-light dark:drop-shadow-icon-bg-dark" />}
        </div>
      </div>
      <div className={cn("relative top-6 left-6  border-l-4 py-1 px-4 dark:bg-primary/10 rounded-md",
        {
          "border-callout-info bg-callout-info-bg": type === "info",
          "border-callout-warning bg-callout-warning-bg": type === "warning",
          "border-callout-danger bg-callout-danger-bg": type === "danger",
        }
      )}  >
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}

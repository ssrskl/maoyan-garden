import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { MdInfoOutline, MdOutlineDangerous, MdOutlineError, MdOutlineWarning } from "react-icons/md";

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
    <div className="relative mb-12 mr-6">
      <div className="absolute top-0 left-0 z-10">
        <div className="w-12 h-12 flex justify-center items-center">
          {type === "info" && <MdInfoOutline className="w-8 h-8 text-[#4433FF] drop-shadow-icon-bg-light dark:drop-shadow-icon-bg-dark" />}
          {type === "warning" && <MdOutlineWarning className="w-8 h-8 text-[#FF9900] drop-shadow-icon-bg-light dark:drop-shadow-icon-bg-dark" />}
          {type === "danger" && <MdOutlineDangerous className="w-8 h-8 text-[#FF0000] drop-shadow-icon-bg-light dark:drop-shadow-icon-bg-dark" />}
        </div>
      </div>
      <div className={cn("relative top-6 left-6  border-l-4 py-2 px-4 dark:bg-primary/10 rounded-md",
        {
          "border-[#4433FF] bg-[#E8F1FC]": type === "info",
          "border-[#FF9900] bg-[#FFF3E0]": type === "warning",
          "border-[#FF0000] bg-[#FFE8E6]": type === "danger",
        }
      )}  >
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { slug } from "github-slugger";
import { badgeVariants } from "./ui/badge";
import { cn } from "@/lib/utils"; // 1. 导入 cn 工具函数

interface TagProps {
  tag: string;
  current?: boolean;
  count?: number;
}
export function Tag({ tag, current, count }: TagProps) {
  return (
    <Link
      className={cn(
        badgeVariants({
          variant: current ? "default" : "secondary",
        }),
        "no-underline rounded-md transition-transform duration-200 ease-in-out hover:scale-110"
      )}
      href={`/tags/${slug(tag)}`}
    >
      {tag} {count ? `(${count})` : null}
    </Link>
  );
}
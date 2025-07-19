import { Calendar } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn, formatDate } from "@/lib/utils";
import { Tag } from "./tag";
import { toFromNow } from "@/lib/time";
import { StatusBadge } from "./status-badge"; // --- 1. 导入组件 ---

interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags?: Array<string>;
  status: "seedling" | "growing" | "evergreen"; // --- 2. 添加 status 属性 ---
}

export function PostItem({
  slug,
  title,
  description,
  date,
  tags,
}: PostItemProps) {
  return (
    <article className="flex flex-col gap-2 border-border border-b py-3 mx-4">
      <div>
        {/* --- 4. 在标题旁边显示状态 --- */}
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">
            <Link href={"/" + slug}>{title}</Link>
          </h2>
        </div>
      </div>
      <div className="flex gap-2">
        {tags?.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>
      <div className="max-w-none text-muted-foreground line-clamp-4">
        {description}
      </div>
      <div className="flex justify-between items-center">
        <dl>
          <dt className="sr-only">Published On</dt>
          <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {toFromNow(Date.parse(date))}
          </dd>
        </dl>
        <Link
          href={"/" + slug}
          className={cn(buttonVariants({ variant: "link" }), "py-0")}
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
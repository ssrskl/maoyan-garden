import Image from "next/image";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

/**
 * Dialogue 组件
 * 作为整个对话的容器，负责提供一个统一的垂直间距和布局。
 */
export function Dialogue({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("my-6 flex flex-col gap-6", className)}>{children}</div>
  );
}

/**
 * SpeechBubble 组件
 * 代表单条发言，包含头像、发言人和内容。
 */
interface SpeechBubbleProps {
  children: ReactNode;
  speaker: string;
  avatar: string;
  side?: "left" | "right";
}

export function SpeechBubble({
  children,
  speaker,
  avatar,
  side = "left",
}: SpeechBubbleProps) {
  const isRight = side === "right";

  return (
    <div
      className={cn(
        "flex w-full max-w-[90%] items-start gap-3",
        isRight ? "flex-row-reverse self-end" : "flex-row self-start"
      )}
    >
      {/* 头像 */}
      <div className="relative h-10 w-10 flex-shrink-0">
        <Image
          src={avatar}
          alt={speaker}
          fill
          className="rounded-full object-cover"
        />
      </div>
      
      {/* 姓名和内容气泡 */}
      <div
        className={cn(
          "flex flex-col gap-1",
          isRight ? "items-end" : "items-start"
        )}
      >
        <p className="text-sm font-semibold text-card-foreground">{speaker}</p>
        <div
          // 我们使用了 prose a чтобы确保气泡内的 Markdown 内容样式正确
          className={cn(
            "prose prose-slate dark:prose-invert max-w-none rounded-lg p-3 text-sm",
            "bg-muted text-muted-foreground"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
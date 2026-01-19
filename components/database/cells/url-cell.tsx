"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

// URL 类型可以是字符串（仅 URL）或对象（包含 text 和 url）
type UrlValue = string | { text: string; url: string };

interface UrlCellProps {
    initialValue: UrlValue;
    onUpdate: (value: UrlValue) => void;
    className?: string;
}

export function UrlCell({ initialValue, onUpdate, className }: UrlCellProps) {
    const [value, setValue] = useState(initialValue);
    const [isEditing, setIsEditing] = useState(false);

    const handleBlur = () => {
        setIsEditing(false);
        if (value !== initialValue) {
            onUpdate(value);
        }
    };

    // 获取显示文本和 URL
    const getDisplayText = (): string => {
        if (typeof value === "string") {
            return value;
        }
        return value?.text || "";
    };

    const getUrl = (): string => {
        if (typeof value === "string") {
            return value;
        }
        return value?.url || "";
    };

    if (isEditing) {
        return (
            <Input
                autoFocus
                value={getDisplayText()}
                onChange={(e) => {
                    // 如果是对象格式，保持对象格式
                    if (typeof value === "object" && value !== null) {
                        setValue({ ...value, text: e.target.value });
                    } else {
                        setValue(e.target.value);
                    }
                }}
                onBlur={handleBlur}
                className={cn(
                    "h-full w-full border-none bg-transparent px-2 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
                    className
                )}
            />
        );
    }

    const displayText = getDisplayText();
    const url = getUrl();

    // 判断是否为内部链接或锚点链接
    const isInternalLink = (href: string): boolean => {
        if (!href) return false;

        // 锚点链接（以 # 开头）
        if (href.startsWith("#")) return true;

        try {
            const linkUrl = new URL(href, window.location.origin);
            const currentUrl = new URL(window.location.href);

            // 同域名的链接被视为内部链接
            return linkUrl.origin === currentUrl.origin;
        } catch {
            // 如果不是有效的 URL，假定为相对路径，视为内部链接
            return !href.startsWith("http://") && !href.startsWith("https://");
        }
    };

    const isInternal = isInternalLink(url);

    return (
        <div
            onClick={() => setIsEditing(true)}
            className={cn(
                "flex h-full w-full cursor-text items-center justify-between px-2 hover:bg-muted/50",
                className
            )}
        >
            {url ? (
                <a
                    href={url}
                    {...(!isInternal && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                    })}
                    onClick={(e) => e.stopPropagation()}
                    className="truncate text-sm text-foreground/80 underline hover:text-foreground"
                >
                    {displayText}
                </a>
            ) : (
                <span className="truncate text-sm text-foreground/80">
                    {displayText}
                </span>
            )}
            {url && (
                <ExternalLink className="ml-2 h-3 w-3 shrink-0 text-muted-foreground" />
            )}
        </div>
    );
}

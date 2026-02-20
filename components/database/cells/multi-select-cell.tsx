"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList, // Added CommandList
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Option } from "../database-schema";
import { Check, Plus, ExternalLink } from "lucide-react";

interface MultiSelectCellProps {
    initialValue: string[]; // Array of option IDs
    options: Option[];
    onUpdate: (value: string[]) => void;
    className?: string;
}

export function MultiSelectCell({
    initialValue = [],
    options,
    onUpdate,
    className,
}: MultiSelectCellProps) {
    const [open, setOpen] = useState(false);
    const selectedOptions = options.filter((opt) =>
        initialValue.includes(opt.id)
    );

    const handleSelect = (optionId: string) => {
        const newValue = initialValue.includes(optionId)
            ? initialValue.filter((id) => id !== optionId)
            : [...initialValue, optionId];
        onUpdate(newValue);
    };

    const removeOption = (e: React.MouseEvent, optionId: string) => {
        e.stopPropagation();
        onUpdate(initialValue.filter((id) => id !== optionId));
    };

    // 判断是否为内部链接或锚点链接
    const isInternalLink = (href: string): boolean => {
        if (!href) return false;

        // 锚点链接（以 # 开头）
        if (href.startsWith("#")) return true;

        // 在服务器端渲染时，window 可能不存在
        if (typeof window === "undefined") return false;

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

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div
                    className={cn(
                        "flex min-h-full w-full cursor-pointer flex-wrap items-center gap-1 px-2 py-1.5 hover:bg-muted/50",
                        className
                    )}
                >
                    {selectedOptions.length > 0 ? (
                        selectedOptions.map((option) =>
                            option.url ? (
                                <a
                                    key={option.id}
                                    href={option.url}
                                    {...(!isInternalLink(option.url) && {
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                    })}
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex"
                                >
                                    <Badge
                                        variant="secondary"
                                        className="group/badge rounded-sm px-1.5 font-normal hover:bg-secondary/80 cursor-pointer"
                                        style={
                                            option.bg_color ? { backgroundColor: option.bg_color, color: option.text_color } : undefined
                                        }
                                    >
                                        <span>{option.label}</span>
                                        <ExternalLink className="ml-1 h-3 w-3 opacity-60 group-hover/badge:opacity-100" />
                                    </Badge>
                                </a>
                            ) : (
                                <Badge
                                    key={option.id}
                                    variant="secondary"
                                    className="rounded-sm px-1.5 font-normal hover:bg-secondary/80 text-primary"
                                    style={
                                        option.bg_color ? { backgroundColor: option.bg_color, color: option.text_color } : undefined
                                    }
                                >
                                    {option.label}
                                </Badge>
                            )
                        )
                    ) : (
                        <span className="text-muted-foreground/50">Empty</span>
                    )}
                    <Plus className="ml-auto h-3 w-3 opacity-0 transition-opacity group-hover:opacity-50" />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandInput placeholder="Search options..." />
                    <CommandList> {/* Wrapped in CommandList */}
                        <CommandEmpty>No option found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.id}
                                    value={option.label}
                                    onSelect={() => handleSelect(option.id)}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            initialValue.includes(option.id)
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    <Badge
                                        variant="secondary"
                                        className="mr-1 rounded-sm px-1.5 font-normal"
                                        style={
                                            option.bg_color ? { backgroundColor: option.bg_color, color: option.text_color } : undefined
                                        }
                                    >
                                        {option.label}
                                    </Badge>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

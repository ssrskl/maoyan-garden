"use client";

import { Column } from "./database-schema";
import { cn } from "@/lib/utils";
import { Type, Hash, List, CheckSquare, Link as LinkIcon, MoreHorizontal } from "lucide-react";

interface TableHeaderProps {
    columns: Column[];
    className?: string;
}

const getIcon = (type: string) => {
    switch (type) {
        case "text":
            return <Type className="mr-2 h-4 w-4 text-muted-foreground" />;
        case "number":
            return <Hash className="mr-2 h-4 w-4 text-muted-foreground" />;
        case "select":
            return <List className="mr-2 h-4 w-4 text-muted-foreground" />;
        case "multi-select":
            return <CheckSquare className="mr-2 h-4 w-4 text-muted-foreground" />;
        case "url":
            return <LinkIcon className="mr-2 h-4 w-4 text-muted-foreground" />;
        default:
            return <MoreHorizontal className="mr-2 h-4 w-4 text-muted-foreground" />;
    }
};

export function TableHeader({ columns, className }: TableHeaderProps) {
    return (
        <div
            className={cn(
                "flex h-9 w-full items-center border-b bg-muted/40 text-sm font-medium text-muted-foreground",
                className
            )}
        >
            {columns.map((column) => (
                <div
                    key={column.id}
                    className="flex h-full shrink-0 items-center px-3 border-r last:border-r-0 hover:bg-muted/60 cursor-pointer transition-colors"
                    style={{ width: column.width || 150 }}
                >
                    {getIcon(column.type)}
                    <span className="truncate">{column.title}</span>
                </div>
            ))}
            <div className="flex-1" />
        </div>
    );
}

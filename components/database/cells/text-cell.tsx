"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TextCellProps {
    initialValue: string;
    onUpdate: (value: string) => void;
    className?: string;
}

export function TextCell({ initialValue, onUpdate, className }: TextCellProps) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleBlur = () => {
        if (value !== initialValue) {
            onUpdate(value);
        }
    };

    return (
        <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
            className={cn(
                "h-full w-full border-none bg-transparent px-2 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
                className
            )}
        />
    );
}

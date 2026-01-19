"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface NumberCellProps {
    initialValue: number | "";
    onUpdate: (value: number | "") => void;
    className?: string;
}

export function NumberCell({ initialValue, onUpdate, className }: NumberCellProps) {
    const [value, setValue] = useState<string | number>(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleBlur = () => {
        const numValue = value === "" ? "" : Number(value);
        if (numValue !== initialValue) {
            onUpdate(numValue);
        }
    };

    return (
        <Input
            type="number"
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

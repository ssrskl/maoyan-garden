"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Check, ChevronDown } from "lucide-react";

interface SelectCellProps {
    initialValue: string | null;
    options: Option[];
    onUpdate: (value: string | null) => void;
    className?: string;
}

export function SelectCell({
    initialValue,
    options,
    onUpdate,
    className,
}: SelectCellProps) {
    const [open, setOpen] = useState(false);
    const selectedOption = options.find((opt) => opt.id === initialValue);

    const handleSelect = (optionId: string) => {
        onUpdate(optionId === initialValue ? null : optionId);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div
                    className={cn(
                        "flex h-full w-full cursor-pointer items-center justify-between px-2 hover:bg-muted/50",
                        className
                    )}
                >
                    {selectedOption ? (
                        <Badge
                            variant="secondary"
                            className="mr-1 rounded-sm px-1.5 font-normal"
                            style={
                                selectedOption.color
                                    ? { backgroundColor: selectedOption.color }
                                    : undefined
                            }
                        >
                            {selectedOption.label}
                        </Badge>
                    ) : (
                        <span className="text-muted-foreground/50">Select...</span>
                    )}
                    <ChevronDown className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-50" />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandInput placeholder="Search option..." />
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
                                            initialValue === option.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    <Badge
                                        variant="secondary"
                                        className="mr-1 rounded-sm px-1.5 font-normal"
                                        style={
                                            option.color ? { backgroundColor: option.color } : undefined
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

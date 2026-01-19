"use client";

import { Column, Row } from "./database-schema";
import { TextCell } from "./cells/text-cell";
import { NumberCell } from "./cells/number-cell";
import { SelectCell } from "./cells/select-cell";
import { MultiSelectCell } from "./cells/multi-select-cell";
import { UrlCell } from "./cells/url-cell";
import { cn } from "@/lib/utils";

interface TableCellProps {
    column: Column;
    row: Row;
    onUpdate: (value: any) => void;
    className?: string;
}

export function TableCell({ column, row, onUpdate, className }: TableCellProps) {
    const value = row.cells[column.id];

    const renderCell = () => {
        switch (column.type) {
            case "text":
                return <TextCell initialValue={value || ""} onUpdate={onUpdate} />;
            case "number":
                return <NumberCell initialValue={value} onUpdate={onUpdate} />;
            case "select":
                return (
                    <SelectCell
                        initialValue={value}
                        options={column.options || []}
                        onUpdate={onUpdate}
                    />
                );
            case "multi-select":
                return (
                    <MultiSelectCell
                        initialValue={value || []}
                        options={column.options || []}
                        onUpdate={onUpdate}
                    />
                );
            case "url":
                return <UrlCell initialValue={value || ""} onUpdate={onUpdate} />;
            default:
                return <div className="px-2 text-sm text-muted-foreground">Unsupported</div>;
        }
    };

    return (
        <div className={cn("h-full border-r last:border-r-0", className)}>
            {renderCell()}
        </div>
    );
}

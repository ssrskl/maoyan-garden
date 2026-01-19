"use client";

import { Column, Row } from "./database-schema";
import { TableCell } from "./table-cell";
import { cn } from "@/lib/utils";

interface TableRowProps {
    row: Row;
    columns: Column[];
    onUpdateRow: (rowId: string, columnId: string, value: any) => void;
    className?: string;
}

export function TableRow({ row, columns, onUpdateRow, className }: TableRowProps) {
    return (
        <div
            className={cn(
                "flex min-h-10 w-full items-center border-b hover:bg-muted/30",
                className
            )}
        >
            {columns.map((column) => (
                <div
                    key={column.id}
                    className="h-full shrink-0"
                    style={{ width: column.width || 150 }}
                >
                    <TableCell
                        column={column}
                        row={row}
                        onUpdate={(value) => onUpdateRow(row.id, column.id, value)}
                    />
                </div>
            ))}
            {/* Spacer for remaining width if needed */}
            <div className="flex-1" />
        </div>
    );
}

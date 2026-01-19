"use client";

import { useState } from "react";
import { Column, Row, DatabaseData, Option } from "./database-schema";
import { TableHeader } from "./table-header";
import { TableRow } from "./table-row";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatabaseTableProps {
    initialData: DatabaseData;
    className?: string;
}

export function DatabaseTable({ initialData, className }: DatabaseTableProps) {
    const [data, setData] = useState<DatabaseData>(initialData);

    const handleUpdateRow = (rowId: string, columnId: string, value: any) => {
        setData((prev) => ({
            ...prev,
            rows: prev.rows.map((row) =>
                row.id === rowId
                    ? { ...row, cells: { ...row.cells, [columnId]: value } }
                    : row
            ),
        }));
    };

    const handleAddRow = () => {
        const newRow: Row = {
            id: Math.random().toString(36).substr(2, 9),
            cells: {},
        };
        setData((prev) => ({
            ...prev,
            rows: [...prev.rows, newRow],
        }));
    };

    return (
        <div className={cn("w-full overflow-hidden rounded-md border", className)}>
            <div className="overflow-x-auto">
                <div className="min-w-max">
                    <TableHeader columns={data.columns} />
                    <div className="flex flex-col">
                        {data.rows.map((row) => (
                            <TableRow
                                key={row.id}
                                row={row}
                                columns={data.columns}
                                onUpdateRow={handleUpdateRow}
                            />
                        ))}
                    </div>
                    <div
                        className="flex h-10 w-full cursor-pointer items-center border-t px-3 text-muted-foreground hover:bg-muted/50"
                        onClick={handleAddRow}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        <span className="text-sm">New</span>
                    </div>
                </div>
            </div>
            <div className="border-t bg-muted/10 px-3 py-2 text-xs text-muted-foreground">
                {data.rows.length} records
            </div>
        </div>
    );
}

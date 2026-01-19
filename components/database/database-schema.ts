export type ColumnType = 'text' | 'number' | 'select' | 'multi-select' | 'url';

export interface Option {
    id: string;
    label: string;
    color?: string; // hex or tailwind class
    url?: string; // Optional URL for clickable badges
}

export interface Column {
    id: string;
    title: string;
    type: ColumnType;
    width?: number;
    options?: Option[]; // For select/multi-select
}

export interface Cell {
    columnId: string;
    value: any;
}

export interface Row {
    id: string;
    cells: Record<string, any>; // Keyed by columnId
}

export interface DatabaseData {
    columns: Column[];
    rows: Row[];
}

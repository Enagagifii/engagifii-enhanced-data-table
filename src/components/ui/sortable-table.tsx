import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

interface SortableTableHeaderProps {
  column: {
    key: string;
    label: React.ReactNode;
    className?: string;
  };
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  style?: React.CSSProperties;
  className?: string;
}

export const SortableTableHeader: React.FC<SortableTableHeaderProps> = ({
  column,
  sortConfig,
  onSort,
  style,
  className
}) => {
  const isSorted = sortConfig.key === column.key;
  
  return (
    <TableHead 
      className={cn(
        "cursor-pointer hover:bg-slate-100/50 transition-colors",
        isSorted ? "font-bold text-primary active-sort-column" : "",
        column.className,
        className
      )}
      onClick={() => onSort(column.key)}
      style={style}
    >
      <div className="flex items-center justify-between">
        <span>{column.label}</span>
        {isSorted && (
          <span className="ml-1">
            {sortConfig.direction === 'asc' ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
          </span>
        )}
      </div>
    </TableHead>
  );
};

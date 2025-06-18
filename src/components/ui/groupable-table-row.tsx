import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GroupedRecord } from '@/hooks/useTableGrouping';

interface GroupableTableRowProps {
  record: any & GroupedRecord;
  columns: any[];
  isSelected: boolean;
  onSelect: (id: string, checked: boolean) => void;
  onRowClick?: (record: any) => void;
  onToggleGroup?: (groupKey: string) => void;
}

export const GroupableTableRow: React.FC<GroupableTableRowProps> = ({
  record,
  columns,
  isSelected,
  onSelect,
  onRowClick,
  onToggleGroup
}) => {
  console.log(`[DEBUG] Rendering row:`, {
    id: record.id,
    isGroupHeader: record.isGroupHeader,
    groupKey: record.groupKey,
    groupName: record.groupName
  });

  if (record.isGroupHeader) {
    return (
      <TableRow className="bg-gray-50 hover:bg-gray-100 border-b border-gray-200">
        <TableCell className="py-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => onToggleGroup?.(record.groupKey!)}
          >
            {record.isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </TableCell>
        <TableCell colSpan={columns.length} className="py-2">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-gray-900 text-sm">
              {record.groupName} ({record.groupSummary?.recordCount || 0} items)
            </div>
            {record.groupSummary && (
              <div className="flex items-center gap-4 text-sm">
                <span>Total: {record.groupSummary.totalExpected}</span>
                <span>Active: {record.groupSummary.totalActual}</span>
                <span>Inactive: {record.groupSummary.totalVacancy}</span>
                <Badge className={`${record.groupSummary.totalVacancy > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                  {record.groupSummary.fillRate}% filled
                </Badge>
              </div>
            )}
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow 
      className="cursor-pointer hover:bg-muted/50 h-10"
      onClick={() => onRowClick?.(record.originalRecord || record)}
    >
      <TableCell onClick={(e) => e.stopPropagation()} className="py-2 pl-8">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked: boolean) => onSelect(record.id, checked)}
        />
      </TableCell>
      {columns.map(column => (
        <TableCell key={column.key} className={`${column.className} py-2`}>
          {column.render ? column.render(record[column.key], record.originalRecord || record) : record[column.key]}
        </TableCell>
      ))}
    </TableRow>
  );
};

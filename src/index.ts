// Main enhanced data table component
export { default as EnhancedDataTable } from './components/ui/enhanced-data-table';
export { default as SimpleDataTable } from './components/ui/simple-data-table';
export { default as AdvancedDataTableDemo } from './components/ui/advanced-data-table-demo';

// Individual UI components
export { Button, buttonVariants } from './components/ui/button';
export { Input } from './components/ui/input';
export { Checkbox } from './components/ui/checkbox';
export { Badge, badgeVariants } from './components/ui/badge';
export { Label } from './components/ui/label';

// Dropdown menu components
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './components/ui/dropdown-menu';

// Popover components
export { Popover, PopoverTrigger, PopoverContent } from './components/ui/popover';

// Scroll area components
export { ScrollArea, ScrollBar } from './components/ui/scroll-area';

// Table components
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './components/ui/table';

// Pagination components
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './components/ui/pagination';

// Select components
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from './components/ui/select';

// Enhanced data table specific components
export { SortableTableHeader } from './components/ui/sortable-table';
export { default as ColumnConfigurator } from './components/ui/column-configurator';
export { default as DataTablePagination } from './components/ui/data-table-pagination';
export { GroupableTableRow } from './components/ui/groupable-table-row';

// Hooks
export { useTableGrouping } from './hooks/useTableGrouping';

// Types
export type {
  DataTableColumn,
  DataTableFilter,
  DataTableBulkAction,
  DataTableConfig
} from './components/ui/enhanced-data-table';

export type { SortConfig } from './components/ui/sortable-table';
export type { GroupedRecord, GroupSummary } from './hooks/useTableGrouping';
export type { ColumnItem } from './components/ui/column-configurator';
export type { ButtonProps } from './components/ui/button';
export type { BadgeProps } from './components/ui/badge';

// Define DataTableRecord here since it's a simple type
export type DataTableRecord = Record<string, unknown> & {
  id: string;
};

// Utilities
export { cn, formatCurrency, formatDate } from './lib/utils';

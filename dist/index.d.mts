import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import React__default from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ClassValue } from 'clsx';

interface SortConfig {
    key: string;
    direction: 'asc' | 'desc';
}
interface SortableTableHeaderProps {
    column: {
        key: string;
        label: React__default.ReactNode;
        className?: string;
    };
    sortConfig: SortConfig;
    onSort: (key: string) => void;
    style?: React__default.CSSProperties;
    className?: string;
}
declare const SortableTableHeader: React__default.FC<SortableTableHeaderProps>;

type DataTableRecord$1 = Record<string, unknown> & {
    id: string;
};
interface DataTableColumn<T = DataTableRecord$1> {
    key: string;
    label: string;
    enabled: boolean;
    position: number;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    frozen?: boolean;
    sortable?: boolean;
    resizable?: boolean;
    groupable?: boolean;
    render?: (value: unknown, record: T) => React__default.ReactNode;
    className?: string;
}
interface DataTableFilter {
    key: string;
    label: string;
    type: 'multi-select' | 'date-range' | 'text' | 'number';
    searchable?: boolean;
    statusColors?: boolean;
    options?: {
        value: string;
        label: string;
        color?: string;
    }[];
}
interface DataTableBulkAction {
    key: string;
    label: string;
    icon?: React__default.ComponentType<{
        className?: string;
    }>;
    onClick: (selectedIds: string[]) => void;
    requiresSelection?: boolean;
}
interface GroupingConfig {
    enabled: boolean;
    showDropdown?: boolean;
    position?: 'toolbar' | 'filters' | 'next-to-filters' | 'top';
    options?: string[];
    defaultGroupBy?: string | null;
    summaryCalculator?: (records: any[]) => Record<string, unknown>;
}
interface DataTableConfig<T = DataTableRecord$1> {
    tableId: string;
    data: T[];
    columns?: DataTableColumn<T>[];
    searchableFields?: string[];
    searchPlaceholder?: string;
    filters?: DataTableFilter[];
    activeFilters?: Record<string, string[]>;
    onFilterChange?: (filterKey: string, values: string[]) => void;
    onClearAllFilters?: () => void;
    enableSelection?: boolean;
    selectedRows?: string[];
    onSelectionChange?: (selectedIds: string[]) => void;
    enableSelectAllPages?: boolean;
    defaultSort?: SortConfig;
    onSortChange?: (sortConfig: SortConfig) => void;
    enablePagination?: boolean;
    currentPage?: number;
    rowsPerPage?: number;
    onPageChange?: (page: number) => void;
    onRowsPerPageChange?: (rowsPerPage: number) => void;
    bulkActions?: DataTableBulkAction[];
    rowActions?: (record: T) => React__default.ReactNode;
    enableFullScreen?: boolean;
    enableColumnConfiguration?: boolean;
    enableColumnResizing?: boolean;
    grouping?: boolean | 'auto' | GroupingConfig;
    showGroupingDropdown?: boolean;
    groupingDropdownPosition?: 'toolbar' | 'filters' | 'next-to-filters' | 'top';
    groupingOptions?: string[] | 'auto';
    defaultGroupBy?: string | 'auto';
    enableGrouping?: boolean;
    groupBy?: string | null;
    onGroupByChange?: (groupBy: string | null) => void;
    groupSummaryCalculator?: (records: T[]) => Record<string, unknown>;
    dynamicHeight?: boolean;
    minHeight?: number;
    maxHeight?: number;
    rowHeight?: number;
    emptyState?: React__default.ReactNode;
    customToolbar?: React__default.ComponentType<Record<string, unknown>>;
    onRowClick?: (record: T) => void;
    onColumnsChange?: (columns: DataTableColumn<T>[]) => void;
    onColumnWidthsChange?: (widths: Record<string, string>) => void;
}
declare const EnhancedDataTable: <T extends DataTableRecord$1 = DataTableRecord$1>({ tableId, data, columns: initialColumns, searchableFields, searchPlaceholder, filters, activeFilters, onFilterChange, onClearAllFilters, enableSelection, selectedRows, onSelectionChange, enableSelectAllPages, defaultSort, onSortChange, enablePagination, currentPage, rowsPerPage, onPageChange, onRowsPerPageChange, bulkActions, rowActions, enableFullScreen, enableColumnConfiguration, enableColumnResizing, grouping, showGroupingDropdown, groupingDropdownPosition, groupingOptions, defaultGroupBy, enableGrouping, groupBy, onGroupByChange, groupSummaryCalculator, dynamicHeight, minHeight, maxHeight, rowHeight, emptyState, customToolbar: CustomToolbar, onRowClick, onColumnsChange, onColumnWidthsChange }: DataTableConfig<T>) => react_jsx_runtime.JSX.Element;

declare const SimpleDataTable: ({ data, columns }: {
    data: any[];
    columns: {
        key: string;
        label: string;
    }[];
}) => react_jsx_runtime.JSX.Element;

interface AdvancedDataTableDemoProps {
    data: any[];
}
declare const AdvancedDataTableDemo: React__default.FC<AdvancedDataTableDemoProps>;

declare const buttonVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

declare const Input: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref"> & React.RefAttributes<HTMLInputElement>>;

declare const Checkbox: React.ForwardRefExoticComponent<Omit<CheckboxPrimitive.CheckboxProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;

declare const badgeVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}
declare function Badge({ className, variant, ...props }: BadgeProps): react_jsx_runtime.JSX.Element;

declare const Label: React.ForwardRefExoticComponent<Omit<LabelPrimitive.LabelProps & React.RefAttributes<HTMLLabelElement>, "ref"> & VariantProps<(props?: class_variance_authority_types.ClassProp | undefined) => string> & React.RefAttributes<HTMLLabelElement>>;

declare const DropdownMenu: React.FC<DropdownMenuPrimitive.DropdownMenuProps>;
declare const DropdownMenuTrigger: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DropdownMenuGroup: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuPortal: React.FC<DropdownMenuPrimitive.DropdownMenuPortalProps>;
declare const DropdownMenuSub: React.FC<DropdownMenuPrimitive.DropdownMenuSubProps>;
declare const DropdownMenuRadioGroup: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuRadioGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubTrigger: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubTriggerProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubContent: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuContent: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuItem: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuCheckboxItem: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuCheckboxItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuRadioItem: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuRadioItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuLabel: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuLabelProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSeparator: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuShortcut: {
    ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};

declare const Popover: React.FC<PopoverPrimitive.PopoverProps>;
declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const PopoverContent: React.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

declare const ScrollArea: React.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ScrollBar: React.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaScrollbarProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

declare const Table: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableElement> & React.RefAttributes<HTMLTableElement>>;
declare const TableHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableBody: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableRow: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableRowElement> & React.RefAttributes<HTMLTableRowElement>>;
declare const TableHead: React.ForwardRefExoticComponent<React.ThHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>>;
declare const TableCell: React.ForwardRefExoticComponent<React.TdHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>>;
declare const TableCaption: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableCaptionElement> & React.RefAttributes<HTMLTableCaptionElement>>;

declare const Pagination: {
    ({ className, ...props }: React.ComponentProps<"nav">): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const PaginationContent: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> & React.RefAttributes<HTMLUListElement>>;
declare const PaginationItem: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React.RefAttributes<HTMLLIElement>>;
type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<ButtonProps, "size"> & React.ComponentProps<"a">;
declare const PaginationLink: {
    ({ className, isActive, size, ...props }: PaginationLinkProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const PaginationPrevious: {
    ({ className, ...props }: React.ComponentProps<typeof PaginationLink>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const PaginationNext: {
    ({ className, ...props }: React.ComponentProps<typeof PaginationLink>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const PaginationEllipsis: {
    ({ className, ...props }: React.ComponentProps<"span">): react_jsx_runtime.JSX.Element;
    displayName: string;
};

declare const Select: React.FC<SelectPrimitive.SelectProps>;
declare const SelectGroup: React.ForwardRefExoticComponent<SelectPrimitive.SelectGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const SelectValue: React.ForwardRefExoticComponent<SelectPrimitive.SelectValueProps & React.RefAttributes<HTMLSpanElement>>;
declare const SelectTrigger: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const SelectScrollUpButton: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollUpButtonProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectScrollDownButton: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollDownButtonProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectContent: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectLabel: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectLabelProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectItem: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectSeparator: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

interface ColumnItem {
    key: string;
    label: string;
    enabled: boolean;
    position: number;
}
interface ColumnConfiguratorProps {
    columns: ColumnItem[];
    onChange: (columns: ColumnItem[]) => void;
}
declare const ColumnConfigurator: React__default.FC<ColumnConfiguratorProps>;

interface DataTablePaginationProps {
    currentPage: number;
    totalPages: number;
    filteredCount: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rowsPerPage: number) => void;
    itemName?: string;
}
declare const DataTablePagination: React__default.FC<DataTablePaginationProps>;

interface GroupedRecord {
    id: string;
    isGroupHeader: boolean;
    groupKey?: string;
    groupName?: string;
    isExpanded?: boolean;
    groupSummary?: any;
    originalRecord?: any;
}
interface GroupSummary {
    recordCount: number;
    [key: string]: any;
}
declare const useTableGrouping: <T extends Record<string, any>>(data: T[], groupBy: string | null, summaryCalculator?: (records: T[]) => any) => {
    groupedData: T[];
    expandedGroups: Set<string>;
    toggleGroup: (groupKey: string) => void;
    collapseAllGroups: () => void;
    expandAllGroups: () => void;
    groupCount: number;
};

interface GroupableTableRowProps {
    record: any & GroupedRecord;
    columns: any[];
    isSelected: boolean;
    onSelect: (id: string, checked: boolean) => void;
    onRowClick?: (record: any) => void;
    onToggleGroup?: (groupKey: string) => void;
}
declare const GroupableTableRow: React__default.FC<GroupableTableRowProps>;

declare function cn(...inputs: ClassValue[]): string;
declare function formatCurrency(value: number): string;
declare function formatDate(date: Date): string;

type DataTableRecord = Record<string, unknown> & {
    id: string;
};

export { AdvancedDataTableDemo, Badge, type BadgeProps, Button, type ButtonProps, Checkbox, ColumnConfigurator, type ColumnItem, type DataTableBulkAction, type DataTableColumn, type DataTableConfig, type DataTableFilter, DataTablePagination, type DataTableRecord, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, EnhancedDataTable, type GroupSummary, GroupableTableRow, type GroupedRecord, Input, Label, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, Popover, PopoverContent, PopoverTrigger, ScrollArea, ScrollBar, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, SimpleDataTable, type SortConfig, SortableTableHeader, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, badgeVariants, buttonVariants, cn, formatCurrency, formatDate, useTableGrouping };

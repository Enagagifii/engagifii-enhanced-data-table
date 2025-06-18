import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Button } from "./button";
import { Input } from "./input";
import { Checkbox } from "./checkbox";
import { Badge } from "./badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuGroup } from "./dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { Search, Filter, FileText, Maximize, Minimize, ChevronDown, Bell, FileDown, FileSpreadsheet, Settings, MoreHorizontal, Columns, Pin, Group, ChevronRight } from 'lucide-react';
import { SortableTableHeader, SortConfig } from './sortable-table';
import ColumnConfigurator from './column-configurator';
import DataTablePagination from './data-table-pagination';
import { useTableGrouping, type GroupedRecord } from '../../hooks/useTableGrouping';
import { GroupableTableRow } from './groupable-table-row';

// ====================== TYPE DEFINITIONS ======================

type DataTableRecord = Record<string, unknown> & {
  id: string;
};
export interface DataTableColumn<T = DataTableRecord> {
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
  groupable?: boolean; // New: Allow grouping by this column
  render?: (value: unknown, record: T) => React.ReactNode;
  className?: string;
}
export interface DataTableFilter {
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
export interface DataTableBulkAction {
  key: string;
  label: string;
  icon?: React.ComponentType<{
    className?: string;
  }>;
  onClick: (selectedIds: string[]) => void;
  requiresSelection?: boolean;
}
export interface DataTableConfig<T = DataTableRecord> {
  // Table identification
  tableId: string;

  // Data and columns
  data: T[];
  columns?: DataTableColumn<T>[]; // Optional - will auto-generate if not provided

  // Search configuration
  searchableFields?: string[]; // Optional - will auto-detect if not provided
  searchPlaceholder?: string;

  // Filter configuration
  filters?: DataTableFilter[];
  activeFilters?: Record<string, string[]>;
  onFilterChange?: (filterKey: string, values: string[]) => void;
  onClearAllFilters?: () => void;

  // Selection configuration
  enableSelection?: boolean;
  selectedRows?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  enableSelectAllPages?: boolean;

  // Sorting configuration
  defaultSort?: SortConfig;
  onSortChange?: (sortConfig: SortConfig) => void;

  // Pagination configuration
  enablePagination?: boolean;
  currentPage?: number;
  rowsPerPage?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;

  // Actions configuration
  bulkActions?: DataTableBulkAction[];
  rowActions?: (record: T) => React.ReactNode;

  // Display configuration
  enableFullScreen?: boolean;
  enableColumnConfiguration?: boolean;
  
  // Grouping configuration
  enableGrouping?: boolean;
  groupBy?: string | null;
  onGroupByChange?: (groupBy: string | null) => void;
  groupSummaryCalculator?: (records: T[]) => Record<string, unknown>;

  // Height configuration
  dynamicHeight?: boolean;
  minHeight?: number;
  maxHeight?: number;
  rowHeight?: number;

  // Custom rendering
  emptyState?: React.ReactNode;
  customToolbar?: React.ComponentType<Record<string, unknown>>;

  // Event handlers
  onRowClick?: (record: T) => void;
  onColumnsChange?: (columns: DataTableColumn<T>[]) => void;
  onColumnWidthsChange?: (widths: Record<string, string>) => void;
}

// ====================== AUTO-GENERATION UTILITIES ======================

// Smart column generator - automatically creates columns from data structure
const generateColumnsFromData = <T extends DataTableRecord>(data: T[], existingColumns?: DataTableColumn<T>[]): DataTableColumn<T>[] => {
  if (data.length === 0) return existingColumns || [];
  
  const sampleRecord = data[0];
  const autoColumns: DataTableColumn<T>[] = [];
  
  Object.keys(sampleRecord).forEach((key, index) => {
    // Skip if column already exists
    if (existingColumns?.some(col => col.key === key)) return;
    
    const value = sampleRecord[key];
    const values = data.slice(0, 10).map(r => r[key]); // Sample first 10 records
    
    // Determine column properties based on data type and content
    const column: DataTableColumn<T> = {
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim(),
      enabled: key !== 'id', // Hide ID by default
      position: index,
      sortable: true,
      resizable: true,
      groupable: typeof value === 'string' || typeof value === 'boolean',
    };
    
    // Set appropriate width based on content
    if (key === 'id') {
      column.width = '80px';
    } else if (typeof value === 'boolean') {
      column.width = '100px';
    } else if (typeof value === 'number') {
      column.width = '120px';
      column.className = 'text-right';
    } else if (key.toLowerCase().includes('email')) {
      column.width = '200px';
    } else if (key.toLowerCase().includes('name')) {
      column.width = '180px';
      column.frozen = true; // Names are often good frozen columns
    } else if (key.toLowerCase().includes('date')) {
      column.width = '140px';
      // Auto-format dates
      column.render = (value: unknown) => {
        if (!value) return '';
        const date = new Date(value as string);
        return isNaN(date.getTime()) ? String(value) : date.toLocaleDateString();
      };
    } else if (typeof value === 'string') {
      // Estimate width based on content length
      const maxLength = Math.max(...values.map(v => String(v || '').length));
      column.width = `${Math.min(Math.max(maxLength * 8 + 40, 120), 300)}px`;
    }
    
    // Auto-render for common field types
    if (key.toLowerCase().includes('status') && typeof value === 'string') {
      column.render = (value: unknown) => {
        const statusColors: Record<string, string> = {
          active: 'bg-green-100 text-green-800',
          inactive: 'bg-red-100 text-red-800',
          pending: 'bg-yellow-100 text-yellow-800',
          completed: 'bg-blue-100 text-blue-800',
          draft: 'bg-gray-100 text-gray-800'
        };
        const colorClass = statusColors[String(value).toLowerCase()] || 'bg-gray-100 text-gray-800';
        return React.createElement('span', { 
          className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}` 
        }, String(value));
      };
    }
    
    if (typeof value === 'number' && key.toLowerCase().includes('amount') || key.toLowerCase().includes('price') || key.toLowerCase().includes('salary')) {
      column.render = (value: unknown) => {
        return new Intl.NumberFormat('en-US', { 
          style: 'currency', 
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(Number(value) || 0);
      };
    }
    
    if (typeof value === 'boolean') {
      column.render = (value: unknown) => {
        return React.createElement('span', { 
          className: `inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
            value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }` 
        }, value ? 'Yes' : 'No');
      };
    }
    
    autoColumns.push(column);
  });
  
  return [...(existingColumns || []), ...autoColumns];
};

// Smart filter generator - automatically creates filters from data
const generateFiltersFromData = <T extends DataTableRecord>(data: T[], columns: DataTableColumn<T>[]): DataTableFilter[] => {
  if (data.length === 0) return [];
  
  const filters: DataTableFilter[] = [];
  
  columns.forEach(column => {
    const values = data.map(r => r[column.key]).filter(v => v != null);
    const uniqueValues = [...new Set(values.map(v => String(v)))];
    
    // Only create filters for columns with reasonable number of unique values
    if (uniqueValues.length > 1 && uniqueValues.length <= 20) {
      if (typeof data[0][column.key] === 'string' || typeof data[0][column.key] === 'boolean') {
        filters.push({
          key: column.key,
          label: column.label,
          type: 'multi-select',
          searchable: uniqueValues.length > 5,
          statusColors: column.key.toLowerCase().includes('status'),
          options: uniqueValues.sort().map(value => ({
            value: String(value),
            label: String(value),
            color: column.key.toLowerCase().includes('status') ? (
              value.toLowerCase() === 'active' ? 'green' :
              value.toLowerCase() === 'inactive' ? 'red' :
              value.toLowerCase() === 'pending' ? 'yellow' :
              'gray'
            ) : undefined
          }))
        });
      }
    }
  });
  
  return filters;
};

// ====================== ENHANCED DATA TABLE COMPONENT ======================

const EnhancedDataTable = <T extends DataTableRecord = DataTableRecord,>({
  tableId,
  data,
  columns: initialColumns = [], // Default to empty array for auto-generation
  searchableFields = [], // Default to empty array for auto-detection
  searchPlaceholder = "Search...",
  filters = [],
  activeFilters = {},
  onFilterChange,
  onClearAllFilters,
  enableSelection = true,
  selectedRows = [],
  onSelectionChange,
  enableSelectAllPages = true,
  defaultSort = {
    key: 'id',
    direction: 'desc'
  },
  onSortChange,
  enablePagination = true,
  currentPage = 1,
  rowsPerPage = 20,
  onPageChange,
  onRowsPerPageChange,
  bulkActions = [],
  rowActions,
  enableFullScreen = true,
  enableColumnConfiguration = true,
  enableGrouping = false,
  groupBy = null,
  onGroupByChange,
  groupSummaryCalculator,
  dynamicHeight = true,
  minHeight = 200,
  maxHeight = 400,
  rowHeight = 48,
  emptyState,
  customToolbar: CustomToolbar,
  onRowClick,
  onColumnsChange,
  onColumnWidthsChange
}: DataTableConfig<T>) => {
  // ====================== STATE MANAGEMENT ======================

  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>(defaultSort);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [filterSearchTerms, setFilterSearchTerms] = useState<Record<string, string>>({});
  const [selectAllPages, setSelectAllPages] = useState(false);
  
  // Internal filter state management when not controlled externally
  const [internalActiveFilters, setInternalActiveFilters] = useState<Record<string, string[]>>({});
  const effectiveActiveFilters = activeFilters && Object.keys(activeFilters).length > 0 ? activeFilters : internalActiveFilters;
  
  const handleInternalFilterChange = useCallback((filterKey: string, values: string[]) => {
    if (onFilterChange) {
      onFilterChange(filterKey, values);
    } else {
      setInternalActiveFilters(prev => ({
        ...prev,
        [filterKey]: values
      }));
    }
  }, [onFilterChange]);
  
  const handleInternalClearAllFilters = useCallback(() => {
    if (onClearAllFilters) {
      onClearAllFilters();
    } else {
      setInternalActiveFilters({});
    }
  }, [onClearAllFilters]);
  // Auto-generate columns if none or minimal columns provided
  const autoGeneratedColumns = useMemo(() => {
    if (initialColumns.length === 0 && data.length > 0) {
      console.log('🤖 Auto-generating columns from data structure');
      return generateColumnsFromData(data);
    }
    if (initialColumns.length > 0 && data.length > 0) {
      // Enhance existing columns with auto-generated ones for missing fields
      return generateColumnsFromData(data, initialColumns);
    }
    return initialColumns;
  }, [data, initialColumns]);

  const [columns, setColumns] = useState<DataTableColumn<T>[]>(autoGeneratedColumns);

  // Update columns when auto-generated columns change
  useEffect(() => {
    setColumns(autoGeneratedColumns);
  }, [autoGeneratedColumns]);

  // Auto-detect searchable fields if not provided
  const effectiveSearchableFields = useMemo(() => {
    if (searchableFields.length > 0) return searchableFields;
    
    // Auto-detect searchable fields from columns
    return columns
      .filter(col => {
        const sampleValue = data[0]?.[col.key];
        return typeof sampleValue === 'string' && 
               !col.key.toLowerCase().includes('id') &&
               col.enabled;
      })
      .map(col => col.key)
      .slice(0, 5); // Limit to first 5 string fields
  }, [searchableFields, columns, data]);

  // Auto-generate filters if none provided
  const effectiveFilters = useMemo(() => {
    if (filters.length > 0) return filters;
    if (data.length === 0) return [];
    
    console.log('🤖 Auto-generating filters from data structure');
    return generateFiltersFromData(data, columns);
  }, [filters, data, columns]);

  // ====================== COLUMN RESIZING STATE ======================
  const [columnWidths, setColumnWidths] = useState<Record<string, string>>(() => {
    const initialWidths: Record<string, string> = {};
    initialColumns.forEach(col => {
      initialWidths[col.key] = col.width || '140px';
    });
    return initialWidths;
  });
  const [isResizing, setIsResizing] = useState(false);
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const resizeStartX = useRef<number>(0);
  const resizeStartWidth = useRef<number>(0);

  // ====================== EXPERIMENTAL FREEZING STATE ======================
  const [experimentalFrozenColumns, setExperimentalFrozenColumns] = useState<string[]>([]);
  const [freezeHeaderRow, setFreezeHeaderRow] = useState(false);
  const [frozenRowIds, setFrozenRowIds] = useState<string[]>([]);

  // ====================== GROUPING INTEGRATION ======================
  const {
    groupedData,
    expandedGroups,
    toggleGroup,
    collapseAllGroups,
    expandAllGroups,
    groupCount
  } = useTableGrouping(
    data,
    enableGrouping ? groupBy : null,
    groupSummaryCalculator
  );

  // ====================== COMPUTED VALUES ======================

  // Get enabled columns and separate frozen from regular columns
  const enabledColumns = useMemo(() => columns.filter(col => col.enabled).sort((a, b) => a.position - b.position), [columns]);

  // Enhanced frozen columns logic - combines original frozen + experimental frozen
  const frozenColumns = useMemo(() => {
    return enabledColumns.filter(col => col.frozen || experimentalFrozenColumns.includes(col.key));
  }, [enabledColumns, experimentalFrozenColumns]);
  const scrollableColumns = useMemo(() => enabledColumns.filter(col => !col.frozen && !experimentalFrozenColumns.includes(col.key)), [enabledColumns, experimentalFrozenColumns]);

  // Calculate column widths
  const getColumnWidth = useCallback((key: string) => {
    return columnWidths[key] || '140px';
  }, [columnWidths]);

  // Calculate total table width
  const totalTableWidth = useMemo(() => {
    if (isFullScreen) {
      // In fullscreen, calculate the actual width needed vs viewport width
      const checkboxWidth = enableSelection ? 48 : 0;
      const actionWidth = rowActions ? 64 : 0;
      const minDataColumnsWidth = enabledColumns.length * 120; // Minimum 120px per column
      const minTotalWidth = checkboxWidth + actionWidth + minDataColumnsWidth + 50;
      const viewportWidth = Math.max(window.innerWidth - 100, 1400);

      // Use the larger of minimum required width or viewport width
      return Math.max(minTotalWidth, viewportWidth);
    }
    const checkboxWidth = enableSelection ? 48 : 0;
    const actionWidth = rowActions ? 64 : 0;
    const frozenWidth = frozenColumns.reduce((acc, col) => acc + parseInt(getColumnWidth(col.key)), 0);
    const scrollableWidth = scrollableColumns.reduce((acc, col) => acc + parseInt(getColumnWidth(col.key)), 0);
    return checkboxWidth + actionWidth + frozenWidth + scrollableWidth + 50;
  }, [enableSelection, rowActions, frozenColumns, scrollableColumns, getColumnWidth, isFullScreen, enabledColumns.length]);

  // Calculate actual column width for rendering (handles fullscreen distribution)
  const getActualColumnWidth = useCallback((key: string) => {
    if (!isFullScreen) {
      return getColumnWidth(key);
    }

    // In fullscreen mode, distribute available width among columns
    const fixedWidth = (enableSelection ? 48 : 0) + (rowActions ? 64 : 0);
    const availableWidth = totalTableWidth - fixedWidth - 50; // Account for borders and padding

    // For checkbox and actions, use fixed width
    if (key === 'checkbox') return '48px';
    if (key === 'actions') return '64px';

    // For data columns, try to distribute evenly but respect minimum widths
    const dataColumns = enabledColumns.length;
    const distributedWidth = Math.floor(availableWidth / dataColumns);
    const originalWidth = parseInt(getColumnWidth(key));

    // Use the larger of distributed width or original width, with a minimum of 120px
    const columnWidth = Math.max(distributedWidth, originalWidth, 120);
    return `${columnWidth}px`;
  }, [isFullScreen, getColumnWidth, enableSelection, rowActions, enabledColumns.length, totalTableWidth]);

  // Filter and search data
  const filteredData = useMemo(() => {
    // Use grouped data if grouping is enabled, otherwise use original data
    const sourceData = enableGrouping ? groupedData : data;
    
    return sourceData.filter(record => {
      // Skip filtering group headers - they should always be visible
      if (enableGrouping && (record as T & GroupedRecord).isGroupHeader) {
        return true;
      }
      
      // For grouped data, filter based on original record
      const recordToFilter = enableGrouping ? (record as T & GroupedRecord).originalRecord || record : record;
      
      // Search filter
      const matchesSearch = searchQuery === '' || effectiveSearchableFields.some(field => 
        String(recordToFilter[field]).toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Active filters
      const matchesFilters = Object.entries(effectiveActiveFilters).every(([key, values]) => {
        if (values.length === 0) return true;
        return values.includes(String(recordToFilter[key]));
      });
      return matchesSearch && matchesFilters;
    });
  }, [data, groupedData, enableGrouping, searchQuery, effectiveSearchableFields, effectiveActiveFilters]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    
    // Don't sort when grouping is enabled - preserve group structure
    if (enableGrouping) {
      return filteredData;
    }
    
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key] as any;
      const bVal = b[sortConfig.key] as any;
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig, enableGrouping]);

  // Paginate data with enhanced grouping support
  const totalPages = useMemo(() => {
    const dataLength = sortedData.length;
    if (dataLength === 0) {
      // During grouping transitions, ensure we always have at least 1 page
      return enableGrouping ? 1 : 0;
    }
    return Math.ceil(dataLength / rowsPerPage);
  }, [sortedData.length, rowsPerPage, enableGrouping]);
  
  // Ensure current page is within bounds - smart adjustment for grouping
  const adjustedCurrentPage = useMemo(() => {
    if (totalPages === 0) return 1;
    if (currentPage > totalPages) {
      // If current page exceeds total pages, go to last page
      return totalPages;
    }
    return currentPage;
  }, [currentPage, totalPages]);
  
  // Use adjusted page for pagination
  const paginatedData = enablePagination ? sortedData.slice((adjustedCurrentPage - 1) * rowsPerPage, adjustedCurrentPage * rowsPerPage) : sortedData;
  
  // Sync the adjusted page back to the parent if it changed
  useEffect(() => {
    if (adjustedCurrentPage !== currentPage && onPageChange) {
      onPageChange(adjustedCurrentPage);
    }
  }, [adjustedCurrentPage, currentPage, onPageChange]);

  // Calculate dynamic height
  const tableBodyHeight = useMemo(() => {
    if (!dynamicHeight) return maxHeight;

    // In fullscreen mode, allow table to expand to fit all rows without vertical scroll
    if (isFullScreen) {
      const dataRowsCount = paginatedData.length || 1;
      const frozenRowsHeight = frozenRowIds.length * rowHeight;
      return dataRowsCount * rowHeight + frozenRowsHeight;
    }
    const dataRowsCount = paginatedData.length || 1;
    const calculatedHeight = dataRowsCount * rowHeight;
    return Math.min(Math.max(calculatedHeight, minHeight), maxHeight);
  }, [dynamicHeight, paginatedData.length, rowHeight, minHeight, maxHeight, isFullScreen, frozenRowIds.length]);

  // ====================== SCROLL SYNCHRONIZATION ======================

  const headerScrollRef = useRef<HTMLDivElement>(null);
  const bodyScrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const syncHorizontalScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    if (isScrollingRef.current) return;
    const sourceElement = e.currentTarget;
    const scrollLeft = sourceElement.scrollLeft;
    isScrollingRef.current = true;

    // Sync scroll positions between header and body containers
    if (sourceElement === headerScrollRef.current && bodyScrollRef.current) {
      bodyScrollRef.current.scrollLeft = scrollLeft;
    } else if (sourceElement === bodyScrollRef.current && headerScrollRef.current) {
      headerScrollRef.current.scrollLeft = scrollLeft;
    }

    // Reset flag after a brief delay
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 10);
  }, []);

  // ====================== COLUMN RESIZING HANDLERS ======================

  const handleResizeStart = useCallback((e: React.MouseEvent, columnKey: string) => {
    console.log('🔧 Resize start:', columnKey, 'clientX:', e.clientX);
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    setResizingColumn(columnKey);
    resizeStartX.current = e.clientX;
    resizeStartWidth.current = parseInt(getColumnWidth(columnKey)) || 140;
    
    // console.log('🔧 Initial width:', resizeStartWidth.current);
    
    // Force update the cursor immediately
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    
    // Add event listeners
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!columnKey) return;
      
      const deltaX = moveEvent.clientX - resizeStartX.current;
      const newWidth = Math.max(80, resizeStartWidth.current + deltaX);
      
      // console.log('🔧 Resize move:', columnKey, 'deltaX:', deltaX, 'newWidth:', newWidth);
      
      const newWidths = {
        ...columnWidths,
        [columnKey]: `${newWidth}px`
      };
      
      setColumnWidths(newWidths);
      onColumnWidthsChange?.(newWidths);
    };
    
    const handleMouseUp = () => {
      // console.log('🔧 Resize end:', columnKey);
      
      setIsResizing(false);
      setResizingColumn(null);
      
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [getColumnWidth, columnWidths, onColumnWidthsChange]);

  const handleToggleFrozenColumn = useCallback((columnKey: string, checked: boolean) => {
    setExperimentalFrozenColumns(prev => {
      if (checked) {
        // Enforce maximum of 2 frozen columns
        if (prev.length >= 2) {
          return [prev[1], columnKey]; // Replace oldest with newest
        }
        return [...prev, columnKey];
      } else {
        return prev.filter(key => key !== columnKey);
      }
    });
  }, []);
  const handleClearFrozenColumns = useCallback(() => {
    setExperimentalFrozenColumns([]);
  }, []);
  const handleToggleFrozenRow = useCallback((rowId: string, checked: boolean) => {
    setFrozenRowIds(prev => {
      if (checked) {
        // Enforce maximum of 2 frozen rows
        if (prev.length >= 2) {
          return [prev[1], rowId]; // Replace oldest with newest
        }
        return [...prev, rowId];
      } else {
        return prev.filter(id => id !== rowId);
      }
    });
  }, []);

  // ====================== EVENT HANDLERS ======================

  const handleSort = useCallback((key: string) => {
    const newSortConfig = {
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    } as SortConfig;
    setSortConfig(newSortConfig);
    onSortChange?.(newSortConfig);
  }, [sortConfig, onSortChange]);
  const handleSelectRow = useCallback((id: string, checked: boolean) => {
    let newSelection: string[];
    if (checked) {
      newSelection = [...selectedRows, id];
    } else {
      newSelection = selectedRows.filter(rowId => rowId !== id);
      setSelectAllPages(false);
    }
    onSelectionChange?.(newSelection);
  }, [selectedRows, onSelectionChange]);
  const handleSelectAllCurrent = useCallback((checked: boolean) => {
    if (checked) {
      const currentPageIds = paginatedData.map(record => record.id);
      onSelectionChange?.(currentPageIds);
    } else {
      onSelectionChange?.([]);
      setSelectAllPages(false);
    }
  }, [paginatedData, onSelectionChange]);
  const handleSelectAllPages = useCallback(() => {
    const allIds = sortedData.map(record => record.id);
    onSelectionChange?.(allIds);
    setSelectAllPages(true);
  }, [sortedData, onSelectionChange]);
  const handleColumnsChange = useCallback((newColumns: DataTableColumn<T>[]) => {
    setColumns(newColumns);
    onColumnsChange?.(newColumns);
  }, [onColumnsChange]);

  // ====================== SELECTION STATE ======================

  const areAllCurrentPageSelected = paginatedData.length > 0 && paginatedData.every(record => selectedRows.includes(record.id));
  const selectionCount = selectAllPages ? sortedData.length : selectedRows.length;

  // ====================== HELPER FUNCTIONS ======================

  const getColumnStyle = useCallback((column: DataTableColumn<T>, index: number, isFrozen: boolean) => {
    const isExperimentallyFrozen = experimentalFrozenColumns.includes(column.key);
    const baseStyle = {
      width: getActualColumnWidth(column.key),
      minWidth: isFullScreen ? 'auto' : getColumnWidth(column.key),
      maxWidth: isFullScreen ? 'none' : getColumnWidth(column.key)
    };
    if (isFrozen) {
      const leftPosition = enableSelection ? 48 + frozenColumns.slice(0, index).reduce((acc, col) => acc + parseInt(getActualColumnWidth(col.key)), 0) : frozenColumns.slice(0, index).reduce((acc, col) => acc + parseInt(getActualColumnWidth(col.key)), 0);
      return {
        ...baseStyle,
        left: `${leftPosition}px`,
        backgroundColor: isExperimentallyFrozen ? '#f8fafc' : 'white',
        // Subtle tint for experimental columns
        borderRight: isExperimentallyFrozen ? '2px solid #e2e8f0' : '1px solid #e5e7eb'
      };
    }
    return baseStyle;
  }, [experimentalFrozenColumns, enableSelection, frozenColumns, getActualColumnWidth, isFullScreen, getColumnWidth]);

  // ====================== TOOLBAR COMPONENTS ======================

  const searchBar = <div className="relative w-96">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input placeholder={searchPlaceholder} className="pl-9 w-full" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
    </div>;
  const filtersButton = effectiveFilters.length > 0 && <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2 bg-[#0097ee] hover:bg-[#0097ee]/90 text-white border-[#0097ee]">
          <Filter className="h-4 w-4" /> 
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-white z-50" align="end">
        <div className="space-y-4">
          <h4 className="font-medium leading-none">Filters</h4>
          {effectiveFilters.map(filter => <div key={filter.key} className="space-y-2">
              <label className="text-sm font-medium">{filter.label}</label>
              {filter.type === 'multi-select' && filter.options && <div className="space-y-1">
                  {filter.searchable && <Input placeholder={`Search ${filter.label.toLowerCase()}...`} value={filterSearchTerms[filter.key] || ''} onChange={e => setFilterSearchTerms(prev => ({
              ...prev,
              [filter.key]: e.target.value
            }))} className="text-sm" />}
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {filter.options.filter(option => !filter.searchable || !filterSearchTerms[filter.key] || option.label.toLowerCase().includes(filterSearchTerms[filter.key].toLowerCase())).map(option => <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox id={`${filter.key}-${option.value}`} checked={effectiveActiveFilters[filter.key]?.includes(option.value) || false} onCheckedChange={(checked: boolean) => {
                    const current = effectiveActiveFilters[filter.key] || [];
                    if (checked) {
                      handleInternalFilterChange(filter.key, [...current, option.value]);
                    } else {
                      handleInternalFilterChange(filter.key, current.filter(v => v !== option.value));
                    }
                }} />
                          <label htmlFor={`${filter.key}-${option.value}`} className="text-sm cursor-pointer flex items-center gap-2">
                            {filter.statusColors && option.color && <Badge className={`${option.color} text-xs`}>
                                {option.label}
                              </Badge>}
                            {(!filter.statusColors || !option.color) && option.label}
                          </label>
                        </div>)}
                  </div>
                </div>}
            </div>)}
          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={() => {
            handleInternalClearAllFilters();
            setFilterSearchTerms({});
          }}>
              Clear All
            </Button>
            <Button size="sm" className="bg-[#0097ee] hover:bg-[#0097ee]/90" onClick={() => setIsFilterOpen(false)}>
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>;
  const actionsDropdown = bulkActions.length > 0 && <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Actions ({selectionCount}) <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {bulkActions.map((action, index) => <DropdownMenuItem key={action.key} className="flex items-center gap-2" disabled={action.requiresSelection !== false && selectionCount === 0} onClick={() => action.onClick(selectAllPages ? sortedData.map(r => r.id) : selectedRows)}>
            {action.icon && <action.icon className="h-4 w-4" />}
            <span>{action.label}</span>
          </DropdownMenuItem>)}
        
        <DropdownMenuSeparator />
        
        {/* Grouping Feature */}
        {enableGrouping && (
          <DropdownMenuGroup>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 w-full px-2 py-1.5 text-sm hover:bg-accent rounded-sm">
                <Group className="h-4 w-4" />
                <span>Group By</span>
                {groupBy && <Badge variant="secondary" className="ml-auto text-xs">
                  {enabledColumns.find(col => col.key === groupBy)?.label || groupBy}
                </Badge>}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" side="right">
                <DropdownMenuLabel className="text-xs">
                  Group data by column
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {/* No grouping option */}
                <DropdownMenuCheckboxItem 
                  checked={!groupBy} 
                  onCheckedChange={() => onGroupByChange?.(null)}
                >
                  No Grouping
                </DropdownMenuCheckboxItem>
                
                <DropdownMenuSeparator />
                
                {/* Groupable columns */}
                {enabledColumns
                  .filter(column => column.groupable !== false)
                  .map(column => (
                    <DropdownMenuCheckboxItem 
                      key={column.key}
                      checked={groupBy === column.key} 
                      onCheckedChange={(checked) => {
                        if (checked) {
                          onGroupByChange?.(column.key);
                        } else {
                          onGroupByChange?.(null);
                        }
                      }}
                    >
                      {column.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                
                {groupBy && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={expandAllGroups}>
                      <ChevronDown className="h-4 w-4 mr-2" />
                      Expand All Groups
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={collapseAllGroups}>
                      <ChevronRight className="h-4 w-4 mr-2" />
                      Collapse All Groups
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </DropdownMenuGroup>
        )}
        
        {/* Column Freezing Feature - Available in All Modes */}
        <DropdownMenuGroup>
          
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 w-full px-2 py-1.5 text-sm hover:bg-accent rounded-sm">
              <Columns className="h-4 w-4" />
              <span>Freeze Columns</span>
              {experimentalFrozenColumns.length > 0 && <Badge variant="secondary" className="ml-auto text-xs">
                  {experimentalFrozenColumns.length}
                </Badge>}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" side="right">
              <DropdownMenuLabel className="text-xs">
                Select up to 2 columns to freeze
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {enabledColumns.map(column => <DropdownMenuCheckboxItem key={column.key} checked={experimentalFrozenColumns.includes(column.key)} onCheckedChange={checked => handleToggleFrozenColumn(column.key, checked)} disabled={!experimentalFrozenColumns.includes(column.key) && experimentalFrozenColumns.length >= 2}>
                  {column.label}
                </DropdownMenuCheckboxItem>)}
              
              {experimentalFrozenColumns.length > 0 && <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleClearFrozenColumns}>
                    Clear Frozen Columns
                  </DropdownMenuItem>
                </>}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Row Freezing Feature - Only Available in Fullscreen Mode */}
          {isFullScreen && <DropdownMenuGroup>
              
              
              
              
              <DropdownMenu>
                
                
              </DropdownMenu>
            </DropdownMenuGroup>}
        </DropdownMenuGroup>

        {enableColumnConfiguration && <>
            <DropdownMenuSeparator />
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 w-full px-2 py-1.5 text-sm hover:bg-accent rounded-sm">
                <Settings className="h-4 w-4" />
                <span>Configure Columns</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-auto p-0" side="right">
                <ColumnConfigurator columns={columns} onChange={handleColumnsChange} />
              </DropdownMenuContent>
            </DropdownMenu>
          </>}
      </DropdownMenuContent>
    </DropdownMenu>;
  const fullScreenToggle = enableFullScreen && <Button variant="outline" onClick={() => setIsFullScreen(!isFullScreen)} className="gap-2" title={isFullScreen ? "Exit full screen" : "Enter full screen"}>
      {isFullScreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
    </Button>;

  // ====================== RENDER TABLE ======================

  const renderTableContent = () => <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex-shrink-0 space-y-4 bg-white">
        {CustomToolbar ? <CustomToolbar selectedCount={selectionCount} searchBar={searchBar} filtersButton={filtersButton} actionsDropdown={actionsDropdown} fullScreenToggle={fullScreenToggle} columns={columns} onColumnsChange={handleColumnsChange} /> : <div className="flex items-center justify-between p-1 bg-gray-50 border-b border-gray-200 gap-2">
            <div className="flex items-center gap-4 mx-0 my-1">
              {actionsDropdown}
              {searchBar}
            </div>
            <div className="flex items-center gap-2">
              {filtersButton}
              {fullScreenToggle}
            </div>
          </div>}

        {/* Select all pages banner */}
        {areAllCurrentPageSelected && !selectAllPages && enableSelectAllPages && sortedData.length > paginatedData.length && <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex items-center justify-between">
            <span className="text-sm text-blue-700">
              All {paginatedData.length} items on this page are selected.
            </span>
            <Button variant="link" className="text-[#0097ee] hover:text-[#0097ee]/80 p-0 h-auto" onClick={handleSelectAllPages}>
              Select all {sortedData.length} items across all pages
            </Button>
          </div>}

        {selectAllPages && <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex items-center justify-between">
            <span className="text-sm text-blue-700">
              All {sortedData.length} items across all pages are selected.
            </span>
            <Button variant="link" className="text-[#0097ee] hover:text-[#0097ee]/80 p-0 h-auto" onClick={() => {
          onSelectionChange?.([]);
          setSelectAllPages(false);
        }}>
              Clear selection
            </Button>
          </div>}

        {/* Pagination */}
        {enablePagination && <DataTablePagination currentPage={adjustedCurrentPage} totalPages={totalPages} filteredCount={sortedData.length} rowsPerPage={rowsPerPage} onPageChange={onPageChange || (() => {})} onRowsPerPageChange={onRowsPerPageChange || (() => {})} />}
      </div>

      {/* Table */}
      <div className={isFullScreen ? "flex-1" : "flex-1 min-h-0"}>
        <div className="border border-gray-200 rounded-md overflow-hidden flex flex-col">
          {/* Fixed Header */}
          <div className={`bg-white border-b border-gray-200 flex-shrink-0 ${isFullScreen && freezeHeaderRow ? 'sticky top-0 z-50' : ''}`}>
            <div ref={headerScrollRef} className="overflow-y-hidden overflow-x-auto" style={{
            height: '48px'
          }} onScroll={syncHorizontalScroll}>
              <div style={{
              minWidth: `${totalTableWidth}px`,
              width: isFullScreen ? `${totalTableWidth}px` : 'max-content'
            }}>
                <table className={`w-full border-collapse ${isFullScreen ? 'table-fixed' : ''}`} style={{
                width: '100%'
              }}>
                  <thead>
                    <tr className="h-12">
                      {/* Selection checkbox */}
                      {enableSelection && <th className="sticky left-0 bg-white z-40 border-r border-gray-200 px-3 text-left font-medium text-muted-foreground text-sm" style={{
                      width: '48px',
                      minWidth: '48px',
                      maxWidth: '48px'
                    }}>
                          <Checkbox checked={areAllCurrentPageSelected} onCheckedChange={handleSelectAllCurrent} />
                        </th>}

                      {/* Frozen columns */}
                      {frozenColumns.map((column, index) => <th key={column.key} className={`relative sticky bg-white z-30 border-r border-gray-200 px-3 py-2 text-left font-medium text-muted-foreground text-sm ${experimentalFrozenColumns.includes(column.key) ? 'bg-slate-50' : ''}`} style={getColumnStyle(column, index, true)}>
                          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleSort(column.key)}>
                            {column.label}
                            {experimentalFrozenColumns.includes(column.key) && <Pin className="h-3 w-3 text-blue-500" />}
                            {sortConfig.key === column.key && <span className="text-xs">
                                {sortConfig.direction === 'asc' ? '↑' : '↓'}
                              </span>}
                          </div>
                          {/* Resize handle */}
                          {(column.resizable !== false) && (
                            <div
                              className={`absolute top-1/2 -translate-y-1/2 right-0 w-0.5 h-6 cursor-col-resize transition-all duration-150 z-[70] ${
                                isResizing && resizingColumn === column.key 
                                  ? 'bg-blue-500 opacity-100' 
                                  : 'bg-gray-300 opacity-50 hover:bg-blue-400 hover:opacity-100'
                              }`}
                              onMouseDown={(e) => {
                                console.log('🔧 Frozen resize handle mousedown:', column.key);
                                e.stopPropagation();
                                e.preventDefault();
                                handleResizeStart(e, column.key);
                              }}
                              onClick={(e) => {
                                console.log('🔧 Frozen resize handle click:', column.key);
                                e.stopPropagation();
                                e.preventDefault();
                              }}
                              onMouseEnter={() => console.log('🔧 Frozen resize handle hover:', column.key)}
                              title="Drag to resize column"
                            />
                          )}
                        </th>)}

                      {/* Scrollable columns */}
                      {scrollableColumns.map(column => <th key={column.key} className="relative border-r border-gray-200 px-3 py-2 text-left font-medium text-muted-foreground text-sm" style={getColumnStyle(column, 0, false)}>
                          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleSort(column.key)}>
                            {column.label}
                            {sortConfig.key === column.key && <span className="text-xs">
                                {sortConfig.direction === 'asc' ? '↑' : '↓'}
                              </span>}
                          </div>
                          {/* Resize handle */}
                          {(column.resizable !== false) && (
                            <div
                              className={`absolute top-1/2 -translate-y-1/2 right-0 w-0.5 h-6 cursor-col-resize transition-all duration-150 z-[70] ${
                                isResizing && resizingColumn === column.key 
                                  ? 'bg-blue-500 opacity-100' 
                                  : 'bg-gray-300 opacity-50 hover:bg-blue-400 hover:opacity-100'
                              }`}
                              onMouseDown={(e) => {
                                console.log('🔧 Scrollable resize handle mousedown:', column.key);
                                e.stopPropagation();
                                e.preventDefault();
                                handleResizeStart(e, column.key);
                              }}
                              onClick={(e) => {
                                console.log('🔧 Scrollable resize handle click:', column.key);
                                e.stopPropagation();
                                e.preventDefault();
                              }}
                              onMouseEnter={() => console.log('🔧 Scrollable resize handle hover:', column.key)}
                              title="Drag to resize column"
                            />
                          )}
                        </th>)}

                      {/* Row actions column */}
                      {rowActions && <th className="border-r border-gray-200 px-3 text-left font-medium text-muted-foreground text-sm" style={{
                      width: '64px',
                      minWidth: '64px',
                      maxWidth: '64px'
                    }}>
                          Actions
                        </th>}
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>

          {/* Scrollable Body */}
          <div ref={bodyScrollRef} className="flex-1 min-h-0 overflow-auto" style={{
          height: isFullScreen ? 'auto' : dynamicHeight ? `${tableBodyHeight}px` : `${maxHeight}px`,
          maxHeight: isFullScreen ? 'none' : `${maxHeight}px`
        }} onScroll={syncHorizontalScroll}>
            <div style={{
            minWidth: `${totalTableWidth}px`,
            width: isFullScreen ? `${totalTableWidth}px` : 'max-content'
          }}>
              <table className={`w-full border-collapse ${isFullScreen ? 'table-fixed' : ''}`} style={{
              width: '100%'
            }}>
                <tbody>
                  {/* Frozen Rows - Only in Fullscreen Mode */}
                  {isFullScreen && frozenRowIds.length > 0 && <>
                      {frozenRowIds.map((frozenId, frozenIndex) => {
                    const frozenRecord = paginatedData.find(record => record.id === frozenId);
                    if (!frozenRecord) return null;
                    return <tr key={`frozen-${frozenRecord.id}`} className={`sticky bg-blue-50 border-b-2 border-blue-200 cursor-pointer h-12 text-sm text-muted-foreground z-20`} style={{
                      top: `${48 + frozenIndex * rowHeight}px`
                    }} onClick={() => onRowClick?.(frozenRecord)}>
                            {/* Selection checkbox */}
                            {enableSelection && <td className="sticky left-0 bg-blue-50 z-30 border-r border-gray-200 px-3" style={{
                        width: '48px',
                        minWidth: '48px',
                        maxWidth: '48px'
                      }} onClick={e => e.stopPropagation()}>
                                <div className="flex items-center gap-1">
                                  <Checkbox checked={selectedRows.includes(frozenRecord.id)} onCheckedChange={(checked: boolean) => handleSelectRow(frozenRecord.id, checked)} />
                                  <Pin className="h-3 w-3 text-blue-500" />
                                </div>
                              </td>}

                            {/* Frozen columns */}
                            {frozenColumns.map((column, index) => <td key={column.key} className={`sticky bg-blue-50 z-20 border-r border-gray-200 px-3 whitespace-nowrap overflow-hidden text-ellipsis text-sm ${experimentalFrozenColumns.includes(column.key) ? 'bg-slate-50' : ''} ${column.className || ''}`} style={getColumnStyle(column, index, true)}>
                                {column.render ? column.render(frozenRecord[column.key], frozenRecord) : String(frozenRecord[column.key] ?? '')}
                              </td>)}

                            {/* Scrollable columns */}
                            {scrollableColumns.map(column => <td key={column.key} className={`bg-blue-50 border-r border-gray-100 px-3 whitespace-nowrap overflow-hidden text-ellipsis text-sm ${column.className || ''}`} style={getColumnStyle(column, 0, false)}>
                                {column.render ? column.render(frozenRecord[column.key], frozenRecord) : String(frozenRecord[column.key] ?? '')}
                              </td>)}

                            {/* Row actions */}
                            {rowActions && <td className="bg-blue-50 border-r border-gray-100 px-3" style={{
                        width: '64px',
                        minWidth: '64px',
                        maxWidth: '64px'
                      }} onClick={e => e.stopPropagation()}>
                                {rowActions(frozenRecord)}
                              </td>}
                          </tr>;
                  })}
                    </>}

                  {/* Regular Data Rows */}
                  {paginatedData.length > 0 ? paginatedData.filter(record => !frozenRowIds.includes(record.id)) // Exclude frozen rows from regular display
                .map(record => {
                  const typedRecord = record as T & GroupedRecord;
                  
                  // Handle grouped rows
                  if (enableGrouping && typedRecord.isGroupHeader) {
                    const totalColumns = (enableSelection ? 1 : 0) + enabledColumns.length + (rowActions ? 1 : 0);
                    
                    return (
                      <tr key={record.id} className="bg-gray-50 hover:bg-gray-100 border-b border-gray-200">
                        {/* Selection checkbox with expand/collapse button */}
                        {enableSelection && <td className="sticky left-0 bg-gray-50 z-20 border-r border-gray-200 px-3 py-2" style={{
                          width: '48px',
                          minWidth: '48px',
                          maxWidth: '48px'
                        }}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => toggleGroup(typedRecord.groupKey!)}
                          >
                            {expandedGroups.has(typedRecord.groupKey!) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        </td>}

                        {/* Group header with colspan to merge across all data columns */}
                        <td 
                          colSpan={enabledColumns.length + (rowActions ? 1 : 0)} 
                          className="bg-gray-50 border-r border-gray-100 px-3 py-2"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {/* Expand/collapse button if no selection column */}
                              {!enableSelection && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={() => toggleGroup(typedRecord.groupKey!)}
                                >
                                  {expandedGroups.has(typedRecord.groupKey!) ? (
                                    <ChevronDown className="h-4 w-4" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4" />
                                  )}
                                </Button>
                              )}
                              <div className="font-semibold text-gray-900 text-sm">
                                {typedRecord.groupName} ({typedRecord.groupSummary?.recordCount || 0} items)
                              </div>
                            </div>
                            {/* Group summary stats */}
                            {typedRecord.groupSummary && (
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>Total: {typedRecord.groupSummary.recordCount}</span>
                                {typedRecord.groupSummary.totalInvoiceAmount && (
                                  <span>Amount: ${typedRecord.groupSummary.totalInvoiceAmount.toLocaleString()}</span>
                                )}
                                {typedRecord.groupSummary.totalAmount && (
                                  <span>Amount: ${typedRecord.groupSummary.totalAmount.toLocaleString()}</span>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  }

                  // Handle regular data rows (including child rows in groups)
                  return (
                    <tr key={record.id} className={`hover:bg-muted/50 border-b border-gray-100 cursor-pointer h-12 text-sm text-muted-foreground ${
                      enableGrouping && !typedRecord.isGroupHeader ? 'pl-4' : ''
                    }`} onClick={() => onRowClick?.(record)}>
                      {/* Selection checkbox */}
                      {enableSelection && <td className={`sticky left-0 bg-white z-20 border-r border-gray-200 px-3 ${
                        enableGrouping && !typedRecord.isGroupHeader ? 'pl-8' : ''
                      }`} style={{
                        width: '48px',
                        minWidth: '48px',
                        maxWidth: '48px'
                      }} onClick={e => e.stopPropagation()}>
                        <Checkbox checked={selectedRows.includes(record.id)} onCheckedChange={(checked: boolean) => handleSelectRow(record.id, checked)} />
                      </td>}

                      {/* Frozen columns */}
                      {frozenColumns.map((column, index) => <td key={column.key} className={`sticky bg-white z-10 border-r border-gray-200 px-3 whitespace-nowrap overflow-hidden text-ellipsis text-sm ${experimentalFrozenColumns.includes(column.key) ? 'bg-slate-50' : ''} ${column.className || ''}`} style={getColumnStyle(column, index, true)}>
                        {column.render ? column.render(record[column.key], record) : String(record[column.key] ?? '')}
                      </td>)}

                      {/* Scrollable columns */}
                      {scrollableColumns.map((column, colIdx) => <td key={column.key} className={`border-r border-gray-100 px-3 whitespace-nowrap overflow-hidden text-ellipsis text-sm ${column.className || ''}`} style={getColumnStyle(column, colIdx, false)}>
                        {column.render ? column.render(record[column.key], record) : String(record[column.key] ?? '')}
                      </td>)}

                      {/* Row actions */}
                      {rowActions && <td className="border-r border-gray-100 px-3" style={{
                        width: '64px',
                        minWidth: '64px',
                        maxWidth: '64px'
                      }} onClick={e => e.stopPropagation()}>
                        {rowActions(record)}
                      </td>}
                    </tr>
                  );
                }) : <tr>
                      <td colSpan={(enableSelection ? 1 : 0) + enabledColumns.length + (rowActions ? 1 : 0)} className="text-center py-8 text-muted-foreground text-sm">
                        {emptyState || "No data found matching your criteria"}
                      </td>
                    </tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Pagination */}
      {enablePagination && <div className="flex-shrink-0 mt-4 bg-white">
          <DataTablePagination currentPage={adjustedCurrentPage} totalPages={totalPages} filteredCount={sortedData.length} rowsPerPage={rowsPerPage} onPageChange={onPageChange || (() => {})} onRowsPerPageChange={onRowsPerPageChange || (() => {})} />
        </div>}
    </div>;

  // ====================== RENDER COMPONENT ======================

  if (isFullScreen) {
    return <div className="fixed inset-0 bg-white z-50 overflow-auto p-4">
        {renderTableContent()}
      </div>;
  }
  return <div className="container mx-auto h-full">
      {renderTableContent()}
    </div>;
};
export default EnhancedDataTable;
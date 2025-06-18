import React, { useState } from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious, PaginationLink, PaginationEllipsis } from "./pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Input } from "./input";
import { Button } from "./button";

interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  filteredCount: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  itemName?: string; // Generic item name (e.g., "records", "items", "entries")
}

const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  currentPage,
  totalPages,
  filteredCount,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  itemName = "records"
}) => {
  const [jumpToPage, setJumpToPage] = useState('');

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              isActive={currentPage === i} 
              onClick={() => onPageChange(i)} 
              className="h-5 min-w-5 px-1.5 text-xs"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Always show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink 
            isActive={currentPage === 1} 
            onClick={() => onPageChange(1)} 
            className="h-5 min-w-5 px-1.5 text-xs"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Calculate start and end of visible range
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, startPage + 2);

      // Adjust range if at edges
      if (currentPage <= 3) {
        startPage = 2;
        endPage = Math.min(4, totalPages - 1);
      } else if (currentPage >= totalPages - 2) {
        endPage = totalPages - 1;
        startPage = Math.max(2, endPage - 2);
      }

      // Show ellipsis if needed after first page
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis className="h-5 w-5" />
          </PaginationItem>
        );
      }

      // Show middle pages
      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              isActive={currentPage === i} 
              onClick={() => onPageChange(i)} 
              className="h-5 min-w-5 px-1.5 text-xs"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Show ellipsis if needed before last page
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis className="h-5 w-5" />
          </PaginationItem>
        );
      }

      // Always show last page
      if (totalPages > 1) {
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink 
              isActive={currentPage === totalPages} 
              onClick={() => onPageChange(totalPages)} 
              className="h-5 min-w-5 px-1.5 text-xs"
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }
    return items;
  };

  // Handle page jump
  const handleJumpToPage = () => {
    const page = parseInt(jumpToPage);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page);
      setJumpToPage('');
    }
  };

  // Handle key press on jump input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleJumpToPage();
    }
  };
  
  // Always show pagination to maintain consistent UX
  // Only hide if there's truly no data at all
  if (totalPages === 0 && filteredCount === 0) {
    return null;
  }

  return (
    <div className="pt-0 pb-0">
      {/* Compact single row with display info on the left */}
      <div className="flex items-center justify-between gap-4 text-xs px-[2px] py-0 my-[5px]">
        {/* Left: Display info and rows per page */}
        <div className="flex items-center gap-4">
          <div className="text-gray-500 whitespace-nowrap">
            Displaying {Math.min((currentPage - 1) * rowsPerPage + 1, Math.max(filteredCount, 1))} to {Math.min(currentPage * rowsPerPage, Math.max(filteredCount, 1))} of {Math.max(filteredCount, 1)} {itemName}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-gray-500 whitespace-nowrap">Show</span>
            <Select 
              value={rowsPerPage.toString()} 
              onValueChange={value => onRowsPerPageChange(parseInt(value))}
            >
              <SelectTrigger className="w-14 h-5 text-xs border-gray-300 pl-2 pr-1">
                <SelectValue>{rowsPerPage}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-gray-500 whitespace-nowrap px-[4px]">per page</span>
          </div>
        </div>
        
        {/* Right: Navigation and jump controls */}
        <div className="flex items-center gap-3">
          <Pagination>
            <PaginationContent className="gap-0.5">
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => onPageChange(Math.max(1, currentPage - 1))} 
                  className={`h-5 px-1.5 text-xs gap-1 ${currentPage === 1 || totalPages === 0 ? 'pointer-events-none opacity-50' : ''}`} 
                />
              </PaginationItem>
              
              {renderPaginationItems()}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => onPageChange(Math.min(Math.max(totalPages, 1), currentPage + 1))} 
                  className={`h-5 px-1.5 text-xs gap-1 ${currentPage >= Math.max(totalPages, 1) ? 'pointer-events-none opacity-50' : ''}`} 
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          
          <div className="flex items-center gap-1">
            <span className="text-gray-500 whitespace-nowrap">Go to</span>
            <Input 
              className="w-10 h-5 text-center text-xs border-gray-300" 
              value={jumpToPage} 
              onChange={e => setJumpToPage(e.target.value)} 
              onKeyDown={handleKeyPress} 
              aria-label="Jump to page" 
              type="text" 
              inputMode="numeric" 
              pattern="[0-9]*" 
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="h-5 px-1.5 text-xs border-gray-300" 
              onClick={handleJumpToPage} 
              disabled={!jumpToPage || isNaN(parseInt(jumpToPage)) || parseInt(jumpToPage) < 1 || parseInt(jumpToPage) > totalPages}
            >
              Go
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTablePagination;

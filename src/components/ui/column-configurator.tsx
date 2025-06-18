import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ColumnItem {
  key: string;
  label: string;
  enabled: boolean;
  position: number;
}

interface ColumnConfiguratorProps {
  columns: ColumnItem[];
  onChange: (columns: ColumnItem[]) => void;
}

const ColumnConfigurator: React.FC<ColumnConfiguratorProps> = ({ columns, onChange }) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(columns);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update positions
    const reorderedItems = items.map((item, index) => ({
      ...item,
      position: index + 1
    }));
    
    onChange(reorderedItems);
  };

  const handleColumnToggle = (key: string) => {
    const updatedColumns = columns.map(column => {
      if (column.key === key) {
        return {
          ...column,
          enabled: !column.enabled
        };
      }
      return column;
    });
    
    onChange(updatedColumns);
  };

  return (
    <div className="w-80 max-h-96 overflow-y-auto">
      <div className="p-3 border-b">
        <h3 className="font-medium">Configure Columns</h3>
        <p className="text-sm text-muted-foreground">Drag to reorder, toggle to show/hide</p>
      </div>
      <div className="p-3 space-y-1">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="columns">
            {(provided) => (
              <div 
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-2"
              >
                {columns.map((column, index) => (
                  <Draggable key={column.key} draggableId={column.key} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={cn(
                          "flex items-center p-2 rounded-md border transition-all",
                          column.enabled ? "bg-white" : "bg-gray-50 text-gray-500",
                          snapshot.isDragging ? "border-[#0097ee] shadow-lg bg-white z-50 transform rotate-1" : "border-gray-200"
                        )}
                        style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? 0.9 : 1,
                          transform: snapshot.isDragging 
                            ? `${provided.draggableProps.style?.transform} rotate(1deg)` 
                            : provided.draggableProps.style?.transform
                        }}
                      >
                        <div {...provided.dragHandleProps} className="mr-2 cursor-grab active:cursor-grabbing">
                          <GripVertical className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="flex items-center space-x-2 flex-1">
                          <Checkbox 
                            id={column.key} 
                            checked={column.enabled}
                            onCheckedChange={() => handleColumnToggle(column.key)}
                          />
                          <Label 
                            htmlFor={column.key} 
                            className={cn("cursor-pointer flex-1", !column.enabled && "text-gray-500")}
                          >
                            {column.label}
                          </Label>
                          <span className="text-xs text-gray-400 font-mono min-w-[2rem] text-center">
                            #{column.position}
                          </span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ColumnConfigurator;

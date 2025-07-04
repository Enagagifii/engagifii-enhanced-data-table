"use client";

// src/components/ui/enhanced-data-table.tsx
import React10, { useState as useState3, useMemo as useMemo2, useCallback, useRef, useEffect } from "react";

// src/components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}
function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  }).format(date);
}

// src/components/ui/button.tsx
import { jsx } from "react/jsx-runtime";
var buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

// src/components/ui/input.tsx
import * as React2 from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var Input = React2.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx2(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

// src/components/ui/checkbox.tsx
import * as React3 from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { jsx as jsx3 } from "react/jsx-runtime";
var Checkbox = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx3(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx3(
      CheckboxPrimitive.Indicator,
      {
        className: cn("flex items-center justify-center text-current"),
        children: /* @__PURE__ */ jsx3(Check, { className: "h-4 w-4" })
      }
    )
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// src/components/ui/badge.tsx
import { cva as cva2 } from "class-variance-authority";
import { jsx as jsx4 } from "react/jsx-runtime";
var badgeVariants = cva2(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx4("div", { className: cn(badgeVariants({ variant }), className), ...props });
}

// src/components/ui/dropdown-menu.tsx
import * as React4 from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check as Check2, ChevronRight, Circle } from "lucide-react";
import { jsx as jsx5, jsxs } from "react/jsx-runtime";
var DropdownMenu = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuGroup = DropdownMenuPrimitive.Group;
var DropdownMenuPortal = DropdownMenuPrimitive.Portal;
var DropdownMenuSub = DropdownMenuPrimitive.Sub;
var DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
var DropdownMenuSubTrigger = React4.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx5(ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = React4.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx5(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenuContent = React4.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx5(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx5(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = React4.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx5(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuCheckboxItem = React4.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx5("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx5(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx5(Check2, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioItem = React4.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx5("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx5(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx5(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuLabel = React4.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx5(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuSeparator = React4.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx5(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
var DropdownMenuShortcut = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx5(
    "span",
    {
      className: cn("ml-auto text-xs tracking-widest opacity-60", className),
      ...props
    }
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// src/components/ui/popover.tsx
import * as React5 from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { jsx as jsx6 } from "react/jsx-runtime";
var Popover = PopoverPrimitive.Root;
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverContent = React5.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx6(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx6(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      "whitespace-pre-line break-words",
      // Added for multi-line support
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// src/components/ui/enhanced-data-table.tsx
import { Search, Filter, Maximize, Minimize, ChevronDown as ChevronDown2, Settings, Columns, Pin, Group as Group3, ChevronRight as ChevronRight3 } from "lucide-react";

// src/components/ui/column-configurator.tsx
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// src/components/ui/label.tsx
import * as React6 from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva as cva3 } from "class-variance-authority";
import { jsx as jsx7 } from "react/jsx-runtime";
var labelVariants = cva3(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
var Label2 = React6.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx7(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label2.displayName = LabelPrimitive.Root.displayName;

// src/components/ui/column-configurator.tsx
import { GripVertical } from "lucide-react";
import { jsx as jsx8, jsxs as jsxs2 } from "react/jsx-runtime";
var ColumnConfigurator = ({ columns, onChange }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(columns);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const reorderedItems = items.map((item, index) => ({
      ...item,
      position: index + 1
    }));
    onChange(reorderedItems);
  };
  const handleColumnToggle = (key) => {
    const updatedColumns = columns.map((column) => {
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
  return /* @__PURE__ */ jsxs2("div", { className: "w-80 max-h-96 overflow-y-auto", children: [
    /* @__PURE__ */ jsxs2("div", { className: "p-3 border-b", children: [
      /* @__PURE__ */ jsx8("h3", { className: "font-medium", children: "Configure Columns" }),
      /* @__PURE__ */ jsx8("p", { className: "text-sm text-muted-foreground", children: "Drag to reorder, toggle to show/hide" })
    ] }),
    /* @__PURE__ */ jsx8("div", { className: "p-3 space-y-1", children: /* @__PURE__ */ jsx8(DragDropContext, { onDragEnd: handleDragEnd, children: /* @__PURE__ */ jsx8(Droppable, { droppableId: "columns", children: (provided) => /* @__PURE__ */ jsxs2(
      "div",
      {
        ref: provided.innerRef,
        ...provided.droppableProps,
        className: "space-y-2",
        children: [
          columns.map((column, index) => /* @__PURE__ */ jsx8(Draggable, { draggableId: column.key, index, children: (provided2, snapshot) => /* @__PURE__ */ jsxs2(
            "div",
            {
              ref: provided2.innerRef,
              ...provided2.draggableProps,
              className: cn(
                "flex items-center p-2 rounded-md border transition-all",
                column.enabled ? "bg-white" : "bg-gray-50 text-gray-500",
                snapshot.isDragging ? "border-[#0097ee] shadow-lg bg-white z-50 transform rotate-1" : "border-gray-200"
              ),
              style: {
                ...provided2.draggableProps.style,
                opacity: snapshot.isDragging ? 0.9 : 1,
                transform: snapshot.isDragging ? `${provided2.draggableProps.style?.transform} rotate(1deg)` : provided2.draggableProps.style?.transform
              },
              children: [
                /* @__PURE__ */ jsx8("div", { ...provided2.dragHandleProps, className: "mr-2 cursor-grab active:cursor-grabbing", children: /* @__PURE__ */ jsx8(GripVertical, { className: "h-4 w-4 text-gray-400" }) }),
                /* @__PURE__ */ jsxs2("div", { className: "flex items-center space-x-2 flex-1", children: [
                  /* @__PURE__ */ jsx8(
                    Checkbox,
                    {
                      id: column.key,
                      checked: column.enabled,
                      onCheckedChange: () => handleColumnToggle(column.key)
                    }
                  ),
                  /* @__PURE__ */ jsx8(
                    Label2,
                    {
                      htmlFor: column.key,
                      className: cn("cursor-pointer flex-1", !column.enabled && "text-gray-500"),
                      children: column.label
                    }
                  ),
                  /* @__PURE__ */ jsxs2("span", { className: "text-xs text-gray-400 font-mono min-w-[2rem] text-center", children: [
                    "#",
                    column.position
                  ] })
                ] })
              ]
            }
          ) }, column.key)),
          provided.placeholder
        ]
      }
    ) }) }) })
  ] });
};
var column_configurator_default = ColumnConfigurator;

// src/components/ui/data-table-pagination.tsx
import { useState } from "react";

// src/components/ui/pagination.tsx
import * as React7 from "react";
import { ChevronLeft, ChevronRight as ChevronRight2, MoreHorizontal } from "lucide-react";
import { jsx as jsx9, jsxs as jsxs3 } from "react/jsx-runtime";
var Pagination = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx9(
  "nav",
  {
    role: "navigation",
    "aria-label": "pagination",
    className: cn("mx-auto flex w-full justify-center", className),
    ...props
  }
);
Pagination.displayName = "Pagination";
var PaginationContent = React7.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx9(
  "ul",
  {
    ref,
    className: cn("flex flex-row items-center gap-1", className),
    ...props
  }
));
PaginationContent.displayName = "PaginationContent";
var PaginationItem = React7.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx9("li", { ref, className: cn("", className), ...props }));
PaginationItem.displayName = "PaginationItem";
var PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}) => /* @__PURE__ */ jsx9(
  "a",
  {
    "aria-current": isActive ? "page" : void 0,
    className: cn(
      "inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      {
        "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground": isActive
      },
      className
    ),
    ...props
  }
);
PaginationLink.displayName = "PaginationLink";
var PaginationPrevious = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxs3(
  PaginationLink,
  {
    "aria-label": "Go to previous page",
    size: "default",
    className: cn("gap-1 pl-2.5", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx9(ChevronLeft, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx9("span", { children: "Previous" })
    ]
  }
);
PaginationPrevious.displayName = "PaginationPrevious";
var PaginationNext = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxs3(
  PaginationLink,
  {
    "aria-label": "Go to next page",
    size: "default",
    className: cn("gap-1 pr-2.5", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx9("span", { children: "Next" }),
      /* @__PURE__ */ jsx9(ChevronRight2, { className: "h-4 w-4" })
    ]
  }
);
PaginationNext.displayName = "PaginationNext";
var PaginationEllipsis = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxs3(
  "span",
  {
    "aria-hidden": true,
    className: cn("flex h-9 w-9 items-center justify-center", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx9(MoreHorizontal, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx9("span", { className: "sr-only", children: "More pages" })
    ]
  }
);
PaginationEllipsis.displayName = "PaginationEllipsis";

// src/components/ui/select.tsx
import * as React8 from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check as Check3, ChevronDown, ChevronUp } from "lucide-react";
import { jsx as jsx10, jsxs as jsxs4 } from "react/jsx-runtime";
var Select = SelectPrimitive.Root;
var SelectGroup = SelectPrimitive.Group;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React8.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs4(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx10(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx10(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx10(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx10(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx10(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx10(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React8.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx10(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs4(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx10(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx10(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx10(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx10(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React8.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs4(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx10("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx10(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx10(Check3, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx10(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx10(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// src/components/ui/data-table-pagination.tsx
import { jsx as jsx11, jsxs as jsxs5 } from "react/jsx-runtime";
var DataTablePagination = ({
  currentPage,
  totalPages,
  filteredCount,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  itemName = "records"
}) => {
  const [jumpToPage, setJumpToPage] = useState("");
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          /* @__PURE__ */ jsx11(PaginationItem, { children: /* @__PURE__ */ jsx11(
            PaginationLink,
            {
              isActive: currentPage === i,
              onClick: () => onPageChange(i),
              className: "h-5 min-w-5 px-1.5 text-xs",
              children: i
            }
          ) }, i)
        );
      }
    } else {
      items.push(
        /* @__PURE__ */ jsx11(PaginationItem, { children: /* @__PURE__ */ jsx11(
          PaginationLink,
          {
            isActive: currentPage === 1,
            onClick: () => onPageChange(1),
            className: "h-5 min-w-5 px-1.5 text-xs",
            children: "1"
          }
        ) }, 1)
      );
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, startPage + 2);
      if (currentPage <= 3) {
        startPage = 2;
        endPage = Math.min(4, totalPages - 1);
      } else if (currentPage >= totalPages - 2) {
        endPage = totalPages - 1;
        startPage = Math.max(2, endPage - 2);
      }
      if (startPage > 2) {
        items.push(
          /* @__PURE__ */ jsx11(PaginationItem, { children: /* @__PURE__ */ jsx11(PaginationEllipsis, { className: "h-5 w-5" }) }, "ellipsis1")
        );
      }
      for (let i = startPage; i <= endPage; i++) {
        items.push(
          /* @__PURE__ */ jsx11(PaginationItem, { children: /* @__PURE__ */ jsx11(
            PaginationLink,
            {
              isActive: currentPage === i,
              onClick: () => onPageChange(i),
              className: "h-5 min-w-5 px-1.5 text-xs",
              children: i
            }
          ) }, i)
        );
      }
      if (endPage < totalPages - 1) {
        items.push(
          /* @__PURE__ */ jsx11(PaginationItem, { children: /* @__PURE__ */ jsx11(PaginationEllipsis, { className: "h-5 w-5" }) }, "ellipsis2")
        );
      }
      if (totalPages > 1) {
        items.push(
          /* @__PURE__ */ jsx11(PaginationItem, { children: /* @__PURE__ */ jsx11(
            PaginationLink,
            {
              isActive: currentPage === totalPages,
              onClick: () => onPageChange(totalPages),
              className: "h-5 min-w-5 px-1.5 text-xs",
              children: totalPages
            }
          ) }, totalPages)
        );
      }
    }
    return items;
  };
  const handleJumpToPage = () => {
    const page = parseInt(jumpToPage);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page);
      setJumpToPage("");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleJumpToPage();
    }
  };
  if (totalPages === 0 && filteredCount === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx11("div", { className: "pt-0 pb-0", children: /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between gap-4 text-xs px-[2px] py-0 my-[5px]", children: [
    /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxs5("div", { className: "text-gray-500 whitespace-nowrap", children: [
        "Displaying ",
        Math.min((currentPage - 1) * rowsPerPage + 1, Math.max(filteredCount, 1)),
        " to ",
        Math.min(currentPage * rowsPerPage, Math.max(filteredCount, 1)),
        " of ",
        Math.max(filteredCount, 1),
        " ",
        itemName
      ] }),
      /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsx11("span", { className: "text-gray-500 whitespace-nowrap", children: "Show" }),
        /* @__PURE__ */ jsxs5(
          Select,
          {
            value: rowsPerPage.toString(),
            onValueChange: (value) => onRowsPerPageChange(parseInt(value)),
            children: [
              /* @__PURE__ */ jsx11(SelectTrigger, { className: "w-14 h-5 text-xs border-gray-300 pl-2 pr-1", children: /* @__PURE__ */ jsx11(SelectValue, { children: rowsPerPage }) }),
              /* @__PURE__ */ jsxs5(SelectContent, { children: [
                /* @__PURE__ */ jsx11(SelectItem, { value: "10", children: "10" }),
                /* @__PURE__ */ jsx11(SelectItem, { value: "20", children: "20" }),
                /* @__PURE__ */ jsx11(SelectItem, { value: "50", children: "50" }),
                /* @__PURE__ */ jsx11(SelectItem, { value: "100", children: "100" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx11("span", { className: "text-gray-500 whitespace-nowrap px-[4px]", children: "per page" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx11(Pagination, { children: /* @__PURE__ */ jsxs5(PaginationContent, { className: "gap-0.5", children: [
        /* @__PURE__ */ jsx11(PaginationItem, { children: /* @__PURE__ */ jsx11(
          PaginationPrevious,
          {
            onClick: () => onPageChange(Math.max(1, currentPage - 1)),
            className: `h-5 px-1.5 text-xs gap-1 ${currentPage === 1 || totalPages === 0 ? "pointer-events-none opacity-50" : ""}`
          }
        ) }),
        renderPaginationItems(),
        /* @__PURE__ */ jsx11(PaginationItem, { children: /* @__PURE__ */ jsx11(
          PaginationNext,
          {
            onClick: () => onPageChange(Math.min(Math.max(totalPages, 1), currentPage + 1)),
            className: `h-5 px-1.5 text-xs gap-1 ${currentPage >= Math.max(totalPages, 1) ? "pointer-events-none opacity-50" : ""}`
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx11("span", { className: "text-gray-500 whitespace-nowrap", children: "Go to" }),
        /* @__PURE__ */ jsx11(
          Input,
          {
            className: "w-10 h-5 text-center text-xs border-gray-300",
            value: jumpToPage,
            onChange: (e) => setJumpToPage(e.target.value),
            onKeyDown: handleKeyPress,
            "aria-label": "Jump to page",
            type: "text",
            inputMode: "numeric",
            pattern: "[0-9]*"
          }
        ),
        /* @__PURE__ */ jsx11(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-5 px-1.5 text-xs border-gray-300",
            onClick: handleJumpToPage,
            disabled: !jumpToPage || isNaN(parseInt(jumpToPage)) || parseInt(jumpToPage) < 1 || parseInt(jumpToPage) > totalPages,
            children: "Go"
          }
        )
      ] })
    ] })
  ] }) });
};
var data_table_pagination_default = DataTablePagination;

// src/hooks/useTableGrouping.ts
import { useState as useState2, useMemo } from "react";
var createAutoSummaryCalculator = (records) => {
  const summary = {
    recordCount: records.length
  };
  if (records.length === 0) return summary;
  const firstRecord = records[0];
  Object.keys(firstRecord).forEach((key) => {
    const values = records.map((r) => r[key]).filter((v) => v != null);
    if (values.length === 0) return;
    if (typeof firstRecord[key] === "number") {
      const numbers = values.filter((v) => typeof v === "number");
      if (numbers.length > 0) {
        summary[`total_${key}`] = numbers.reduce((sum, val) => sum + val, 0);
        summary[`avg_${key}`] = Math.round(summary[`total_${key}`] / numbers.length * 100) / 100;
        summary[`min_${key}`] = Math.min(...numbers);
        summary[`max_${key}`] = Math.max(...numbers);
      }
    }
    if (typeof firstRecord[key] === "string") {
      const statusCounts = values.reduce((acc, val) => {
        const strVal = String(val);
        acc[strVal] = (acc[strVal] || 0) + 1;
        return acc;
      }, {});
      Object.entries(statusCounts).forEach(([status, count]) => {
        const safeKey = `count_${key}_${status.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
        summary[safeKey] = count;
      });
      const mostCommon = Object.entries(statusCounts).reduce((a, b) => a[1] > b[1] ? a : b);
      summary[`most_common_${key}`] = mostCommon[0];
    }
    if (typeof firstRecord[key] === "boolean") {
      const boolValues = values.filter((v) => typeof v === "boolean");
      summary[`count_${key}_true`] = boolValues.filter((v) => v).length;
      summary[`count_${key}_false`] = boolValues.filter((v) => !v).length;
    }
  });
  return summary;
};
var useTableGrouping = (data, groupBy, summaryCalculator) => {
  const [expandedGroups, setExpandedGroups] = useState2(/* @__PURE__ */ new Set());
  const toggleGroup = (groupKey) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupKey)) {
        newSet.delete(groupKey);
      } else {
        newSet.add(groupKey);
      }
      return newSet;
    });
  };
  const collapseAllGroups = () => {
    setExpandedGroups(/* @__PURE__ */ new Set());
  };
  const expandAllGroups = () => {
    if (!groupBy) return;
    const allGroups = new Set(data.map((record) => String(record[groupBy])));
    setExpandedGroups(allGroups);
  };
  const groupedData = useMemo(() => {
    if (!groupBy) return data;
    const groups = data.reduce((acc, record) => {
      const groupKey = String(record[groupBy]);
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(record);
      return acc;
    }, {});
    const result = [];
    Object.entries(groups).forEach(([groupKey, records]) => {
      const groupSummary = summaryCalculator ? summaryCalculator(records) : createAutoSummaryCalculator(records);
      result.push({
        ...records[0],
        id: `group-header-${groupKey}`,
        isGroupHeader: true,
        groupKey,
        groupName: groupKey,
        isExpanded: expandedGroups.has(groupKey),
        groupSummary,
        originalRecord: null
      });
      if (expandedGroups.has(groupKey)) {
        console.log(`[DEBUG] Adding ${records.length} child records for expanded group: ${groupKey}`);
        records.forEach((record, index) => {
          result.push({
            ...record,
            id: `${record.id}-child-${index}`,
            // Ensure unique IDs for child rows
            isGroupHeader: false,
            groupKey,
            originalRecord: record
          });
        });
      } else {
        console.log(`[DEBUG] Group ${groupKey} is collapsed, not adding child records`);
      }
    });
    console.log(`[DEBUG] Final grouped data length: ${result.length}`);
    return result;
  }, [data, groupBy, expandedGroups, summaryCalculator]);
  return {
    groupedData,
    expandedGroups,
    toggleGroup,
    collapseAllGroups,
    expandAllGroups,
    groupCount: groupBy ? new Set(data.map((record) => String(record[groupBy]))).size : 0
  };
};

// src/components/ui/enhanced-data-table.tsx
import { Fragment, jsx as jsx12, jsxs as jsxs6 } from "react/jsx-runtime";
var generateColumnsFromData = (data, existingColumns) => {
  if (data.length === 0) return existingColumns || [];
  const sampleRecord = data[0];
  const autoColumns = [];
  Object.keys(sampleRecord).forEach((key, index) => {
    if (existingColumns?.some((col) => col.key === key)) return;
    const value = sampleRecord[key];
    const values = data.slice(0, 10).map((r) => r[key]);
    const column = {
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1").trim(),
      enabled: key !== "id",
      // Hide ID by default
      position: index,
      sortable: true,
      resizable: true,
      groupable: typeof value === "string" || typeof value === "boolean"
    };
    if (key === "id") {
      column.width = "80px";
    } else if (typeof value === "boolean") {
      column.width = "100px";
    } else if (typeof value === "number") {
      column.width = "120px";
      column.className = "text-right";
    } else if (key.toLowerCase().includes("email")) {
      column.width = "200px";
    } else if (key.toLowerCase().includes("name")) {
      column.width = "180px";
      column.frozen = true;
    } else if (key.toLowerCase().includes("date")) {
      column.width = "140px";
      column.render = (value2) => {
        if (!value2) return "";
        const date = new Date(value2);
        return isNaN(date.getTime()) ? String(value2) : date.toLocaleDateString();
      };
    } else if (typeof value === "string") {
      const maxLength = Math.max(...values.map((v) => String(v || "").length));
      column.width = `${Math.min(Math.max(maxLength * 8 + 40, 120), 300)}px`;
    }
    if (key.toLowerCase().includes("status") && typeof value === "string") {
      column.render = (value2) => {
        const statusColors = {
          active: "bg-green-100 text-green-800",
          inactive: "bg-red-100 text-red-800",
          pending: "bg-yellow-100 text-yellow-800",
          completed: "bg-blue-100 text-blue-800",
          draft: "bg-gray-100 text-gray-800"
        };
        const colorClass = statusColors[String(value2).toLowerCase()] || "bg-gray-100 text-gray-800";
        return React10.createElement("span", {
          className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`
        }, String(value2));
      };
    }
    if (typeof value === "number" && key.toLowerCase().includes("amount") || key.toLowerCase().includes("price") || key.toLowerCase().includes("salary")) {
      column.render = (value2) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(Number(value2) || 0);
      };
    }
    if (typeof value === "boolean") {
      column.render = (value2) => {
        return React10.createElement("span", {
          className: `inline-flex items-center px-2 py-1 rounded text-xs font-medium ${value2 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`
        }, value2 ? "Yes" : "No");
      };
    }
    autoColumns.push(column);
  });
  return [...existingColumns || [], ...autoColumns];
};
var generateFiltersFromData = (data, columns) => {
  if (data.length === 0) return [];
  const filters = [];
  columns.forEach((column) => {
    const values = data.map((r) => r[column.key]).filter((v) => v != null);
    const uniqueValues = [...new Set(values.map((v) => String(v)))];
    if (uniqueValues.length > 1 && uniqueValues.length <= 20) {
      if (typeof data[0][column.key] === "string" || typeof data[0][column.key] === "boolean") {
        filters.push({
          key: column.key,
          label: column.label,
          type: "multi-select",
          searchable: uniqueValues.length > 5,
          statusColors: column.key.toLowerCase().includes("status"),
          options: uniqueValues.sort().map((value) => ({
            value: String(value),
            label: String(value),
            color: column.key.toLowerCase().includes("status") ? value.toLowerCase() === "active" ? "green" : value.toLowerCase() === "inactive" ? "red" : value.toLowerCase() === "pending" ? "yellow" : "gray" : void 0
          }))
        });
      }
    }
  });
  return filters;
};
var generateGroupingOptionsFromData = (data, columns) => {
  if (data.length === 0) return [];
  const groupableFields = [];
  columns.forEach((column) => {
    if (!column.enabled || !column.groupable) return;
    const values = data.map((r) => r[column.key]).filter((v) => v != null);
    const uniqueValues = [...new Set(values)];
    if (uniqueValues.length >= 2 && uniqueValues.length <= Math.max(10, data.length / 5)) {
      const firstValue = values[0];
      if (typeof firstValue === "string" || typeof firstValue === "boolean") {
        groupableFields.push(column.key);
      }
    }
  });
  return groupableFields.sort((a, b) => {
    const priority = (field) => {
      const lower = field.toLowerCase();
      if (lower.includes("status")) return 1;
      if (lower.includes("department")) return 2;
      if (lower.includes("position") || lower.includes("role")) return 3;
      if (lower.includes("type") || lower.includes("category")) return 4;
      if (lower.includes("location")) return 5;
      return 10;
    };
    return priority(a) - priority(b);
  });
};
var detectDefaultGroupBy = (data, options) => {
  if (options.length === 0) return null;
  const statusField = options.find((field) => field.toLowerCase().includes("status"));
  if (statusField) return statusField;
  const deptField = options.find((field) => field.toLowerCase().includes("department"));
  if (deptField) return deptField;
  return options[0];
};
var parseGroupingConfig = (data, columns, config, showGroupingDropdown, groupingDropdownPosition, groupingOptions, defaultGroupBy) => {
  if (config === false || config === void 0) {
    return { enabled: false };
  }
  if (config === true || config === "auto") {
    const autoOptions = generateGroupingOptionsFromData(data, columns);
    const autoDefault = defaultGroupBy === "auto" ? detectDefaultGroupBy(data, autoOptions) : defaultGroupBy || detectDefaultGroupBy(data, autoOptions);
    return {
      enabled: autoOptions.length > 0,
      showDropdown: showGroupingDropdown !== false,
      position: groupingDropdownPosition || "toolbar",
      options: groupingOptions === "auto" ? autoOptions : groupingOptions || autoOptions,
      defaultGroupBy: autoDefault || void 0
    };
  }
  return {
    enabled: config.enabled,
    showDropdown: config.showDropdown !== false,
    position: config.position || "toolbar",
    options: config.options || generateGroupingOptionsFromData(data, columns),
    defaultGroupBy: config.defaultGroupBy || detectDefaultGroupBy(data, config.options || []),
    summaryCalculator: config.summaryCalculator
  };
};
var GroupingSelector = ({
  groupingConfig,
  columns,
  currentGroupBy,
  onGroupByChange,
  expandAllGroups,
  collapseAllGroups
}) => {
  if (!groupingConfig.enabled || !groupingConfig.showDropdown) return null;
  const groupableColumns = columns.filter(
    (col) => groupingConfig.options?.includes(col.key) || groupingConfig.options?.length === 0 && col.groupable !== false
  );
  return /* @__PURE__ */ jsxs6(DropdownMenu, { children: [
    /* @__PURE__ */ jsx12(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs6(Button, { variant: "outline", size: "sm", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx12(Group3, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx12("span", { children: "Group By" }),
      currentGroupBy && /* @__PURE__ */ jsx12(Badge, { variant: "secondary", className: "text-xs", children: columns.find((col) => col.key === currentGroupBy)?.label || currentGroupBy }),
      /* @__PURE__ */ jsx12(ChevronDown2, { className: "h-4 w-4" })
    ] }) }),
    /* @__PURE__ */ jsxs6(DropdownMenuContent, { className: "w-56", children: [
      /* @__PURE__ */ jsx12(DropdownMenuLabel, { className: "text-xs", children: "Group data by column" }),
      /* @__PURE__ */ jsx12(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsx12(
        DropdownMenuCheckboxItem,
        {
          checked: !currentGroupBy,
          onCheckedChange: () => onGroupByChange(null),
          children: "No Grouping"
        }
      ),
      /* @__PURE__ */ jsx12(DropdownMenuSeparator, {}),
      groupableColumns.map((column) => /* @__PURE__ */ jsx12(
        DropdownMenuCheckboxItem,
        {
          checked: currentGroupBy === column.key,
          onCheckedChange: (checked) => {
            if (checked) {
              onGroupByChange(column.key);
            } else {
              onGroupByChange(null);
            }
          },
          children: column.label
        },
        column.key
      )),
      currentGroupBy && expandAllGroups && collapseAllGroups && /* @__PURE__ */ jsxs6(Fragment, { children: [
        /* @__PURE__ */ jsx12(DropdownMenuSeparator, {}),
        /* @__PURE__ */ jsxs6(DropdownMenuItem, { onClick: expandAllGroups, children: [
          /* @__PURE__ */ jsx12(ChevronDown2, { className: "h-4 w-4 mr-2" }),
          "Expand All Groups"
        ] }),
        /* @__PURE__ */ jsxs6(DropdownMenuItem, { onClick: collapseAllGroups, children: [
          /* @__PURE__ */ jsx12(ChevronRight3, { className: "h-4 w-4 mr-2" }),
          "Collapse All Groups"
        ] })
      ] })
    ] })
  ] });
};
var EnhancedDataTable = ({
  tableId,
  data,
  columns: initialColumns = [],
  // Default to empty array for auto-generation
  searchableFields = [],
  // Default to empty array for auto-detection
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
    key: "id",
    direction: "desc"
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
  // New improved grouping API
  grouping,
  showGroupingDropdown,
  groupingDropdownPosition,
  groupingOptions,
  defaultGroupBy,
  // Legacy grouping API (backward compatibility)
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
}) => {
  const [searchQuery, setSearchQuery] = useState3("");
  const [sortConfig, setSortConfig] = useState3(defaultSort);
  const [isFilterOpen, setIsFilterOpen] = useState3(false);
  const [isFullScreen, setIsFullScreen] = useState3(false);
  const [filterSearchTerms, setFilterSearchTerms] = useState3({});
  const [selectAllPages, setSelectAllPages] = useState3(false);
  const [internalActiveFilters, setInternalActiveFilters] = useState3({});
  const effectiveActiveFilters = activeFilters && Object.keys(activeFilters).length > 0 ? activeFilters : internalActiveFilters;
  const handleInternalFilterChange = useCallback((filterKey, values) => {
    if (onFilterChange) {
      onFilterChange(filterKey, values);
    } else {
      setInternalActiveFilters((prev) => ({
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
  const autoGeneratedColumns = useMemo2(() => {
    if (initialColumns.length === 0 && data.length > 0) {
      console.log("\u{1F916} Auto-generating columns from data structure");
      return generateColumnsFromData(data);
    }
    if (initialColumns.length > 0 && data.length > 0) {
      return generateColumnsFromData(data, initialColumns);
    }
    return initialColumns;
  }, [data, initialColumns]);
  const [columns, setColumns] = useState3(autoGeneratedColumns);
  useEffect(() => {
    setColumns(autoGeneratedColumns);
  }, [autoGeneratedColumns]);
  const effectiveSearchableFields = useMemo2(() => {
    if (searchableFields.length > 0) return searchableFields;
    return columns.filter((col) => {
      const sampleValue = data[0]?.[col.key];
      return typeof sampleValue === "string" && !col.key.toLowerCase().includes("id") && col.enabled;
    }).map((col) => col.key).slice(0, 5);
  }, [searchableFields, columns, data]);
  const effectiveFilters = useMemo2(() => {
    if (filters.length > 0) return filters;
    if (data.length === 0) return [];
    console.log("\u{1F916} Auto-generating filters from data structure");
    return generateFiltersFromData(data, columns);
  }, [filters, data, columns]);
  const [columnWidths, setColumnWidths] = useState3(() => {
    const initialWidths = {};
    initialColumns.forEach((col) => {
      initialWidths[col.key] = col.width || "140px";
    });
    return initialWidths;
  });
  const [isResizing, setIsResizing] = useState3(false);
  const [resizingColumn, setResizingColumn] = useState3(null);
  const resizeStartX = useRef(0);
  const resizeStartWidth = useRef(0);
  const activeColumnKey = useRef(null);
  const [experimentalFrozenColumns, setExperimentalFrozenColumns] = useState3([]);
  const [freezeHeaderRow, setFreezeHeaderRow] = useState3(false);
  const [frozenRowIds, setFrozenRowIds] = useState3([]);
  const groupingConfig = useMemo2(() => {
    return parseGroupingConfig(
      data,
      columns,
      grouping,
      showGroupingDropdown,
      groupingDropdownPosition,
      groupingOptions,
      defaultGroupBy
    );
  }, [data, columns, grouping, showGroupingDropdown, groupingDropdownPosition, groupingOptions, defaultGroupBy]);
  const [internalGroupBy, setInternalGroupBy] = useState3(
    groupingConfig.defaultGroupBy || null
  );
  const effectiveGroupBy = onGroupByChange ? groupBy : internalGroupBy;
  const effectiveEnableGrouping = groupingConfig.enabled || enableGrouping;
  const handleGroupByChange = useCallback((newGroupBy) => {
    if (onGroupByChange) {
      onGroupByChange(newGroupBy);
    } else {
      setInternalGroupBy(newGroupBy);
    }
  }, [onGroupByChange]);
  const {
    groupedData,
    expandedGroups,
    toggleGroup,
    collapseAllGroups,
    expandAllGroups,
    groupCount
  } = useTableGrouping(
    data,
    effectiveEnableGrouping ? effectiveGroupBy : null,
    groupingConfig.summaryCalculator || groupSummaryCalculator
  );
  const enabledColumns = useMemo2(() => columns.filter((col) => col.enabled).sort((a, b) => a.position - b.position), [columns]);
  const frozenColumns = useMemo2(() => {
    return enabledColumns.filter((col) => col.frozen || experimentalFrozenColumns.includes(col.key));
  }, [enabledColumns, experimentalFrozenColumns]);
  const scrollableColumns = useMemo2(() => enabledColumns.filter((col) => !col.frozen && !experimentalFrozenColumns.includes(col.key)), [enabledColumns, experimentalFrozenColumns]);
  const getColumnWidth = useCallback((key) => {
    return columnWidths[key] || "140px";
  }, [columnWidths]);
  const totalTableWidth = useMemo2(() => {
    if (isFullScreen) {
      const checkboxWidth2 = enableSelection ? 48 : 0;
      const actionWidth2 = rowActions ? 64 : 0;
      const minDataColumnsWidth = enabledColumns.length * 120;
      const minTotalWidth = checkboxWidth2 + actionWidth2 + minDataColumnsWidth + 50;
      const viewportWidth = Math.max(window.innerWidth - 100, 1400);
      return Math.max(minTotalWidth, viewportWidth);
    }
    const checkboxWidth = enableSelection ? 48 : 0;
    const actionWidth = rowActions ? 64 : 0;
    const frozenWidth = frozenColumns.reduce((acc, col) => acc + parseInt(getColumnWidth(col.key)), 0);
    const scrollableWidth = scrollableColumns.reduce((acc, col) => acc + parseInt(getColumnWidth(col.key)), 0);
    return checkboxWidth + actionWidth + frozenWidth + scrollableWidth + 50;
  }, [enableSelection, rowActions, frozenColumns, scrollableColumns, getColumnWidth, isFullScreen, enabledColumns.length]);
  const getActualColumnWidth = useCallback((key) => {
    if (!isFullScreen) {
      return getColumnWidth(key);
    }
    const fixedWidth = (enableSelection ? 48 : 0) + (rowActions ? 64 : 0);
    const availableWidth = totalTableWidth - fixedWidth - 50;
    if (key === "checkbox") return "48px";
    if (key === "actions") return "64px";
    const dataColumns = enabledColumns.length;
    const distributedWidth = Math.floor(availableWidth / dataColumns);
    const originalWidth = parseInt(getColumnWidth(key));
    const columnWidth = Math.max(distributedWidth, originalWidth, 120);
    return `${columnWidth}px`;
  }, [isFullScreen, getColumnWidth, enableSelection, rowActions, enabledColumns.length, totalTableWidth]);
  const filteredData = useMemo2(() => {
    const sourceData = effectiveEnableGrouping ? groupedData : data;
    return sourceData.filter((record) => {
      if (effectiveEnableGrouping && record.isGroupHeader) {
        return true;
      }
      const recordToFilter = effectiveEnableGrouping ? record.originalRecord || record : record;
      const matchesSearch = searchQuery === "" || effectiveSearchableFields.some(
        (field) => String(recordToFilter[field]).toLowerCase().includes(searchQuery.toLowerCase())
      );
      const matchesFilters = Object.entries(effectiveActiveFilters).every(([key, values]) => {
        if (values.length === 0) return true;
        return values.includes(String(recordToFilter[key]));
      });
      return matchesSearch && matchesFilters;
    });
  }, [data, groupedData, effectiveEnableGrouping, searchQuery, effectiveSearchableFields, effectiveActiveFilters]);
  const sortedData = useMemo2(() => {
    if (!sortConfig.key) return filteredData;
    if (effectiveEnableGrouping) {
      return filteredData;
    }
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig, effectiveEnableGrouping]);
  const totalPages = useMemo2(() => {
    const dataLength = sortedData.length;
    if (dataLength === 0) {
      return effectiveEnableGrouping ? 1 : 0;
    }
    return Math.ceil(dataLength / rowsPerPage);
  }, [sortedData.length, rowsPerPage, effectiveEnableGrouping]);
  const adjustedCurrentPage = useMemo2(() => {
    if (totalPages === 0) return 1;
    if (currentPage > totalPages) {
      return totalPages;
    }
    return currentPage;
  }, [currentPage, totalPages]);
  const paginatedData = enablePagination ? sortedData.slice((adjustedCurrentPage - 1) * rowsPerPage, adjustedCurrentPage * rowsPerPage) : sortedData;
  useEffect(() => {
    if (adjustedCurrentPage !== currentPage && onPageChange) {
      onPageChange(adjustedCurrentPage);
    }
  }, [adjustedCurrentPage, currentPage, onPageChange]);
  const tableBodyHeight = useMemo2(() => {
    if (!dynamicHeight) return maxHeight;
    if (isFullScreen) {
      const dataRowsCount2 = paginatedData.length || 1;
      const frozenRowsHeight = frozenRowIds.length * rowHeight;
      return dataRowsCount2 * rowHeight + frozenRowsHeight;
    }
    const dataRowsCount = paginatedData.length || 1;
    const calculatedHeight = dataRowsCount * rowHeight;
    return Math.min(Math.max(calculatedHeight, minHeight), maxHeight);
  }, [dynamicHeight, paginatedData.length, rowHeight, minHeight, maxHeight, isFullScreen, frozenRowIds.length]);
  const headerScrollRef = useRef(null);
  const bodyScrollRef = useRef(null);
  const isScrollingRef = useRef(false);
  const syncHorizontalScroll = useCallback((e) => {
    if (isScrollingRef.current) return;
    const sourceElement = e.currentTarget;
    const scrollLeft = sourceElement.scrollLeft;
    isScrollingRef.current = true;
    if (sourceElement === headerScrollRef.current && bodyScrollRef.current) {
      bodyScrollRef.current.scrollLeft = scrollLeft;
    } else if (sourceElement === bodyScrollRef.current && headerScrollRef.current) {
      headerScrollRef.current.scrollLeft = scrollLeft;
    }
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 10);
  }, []);
  const handleResizeStart = useCallback((e, columnKey) => {
    e.preventDefault();
    e.stopPropagation();
    activeColumnKey.current = columnKey;
    setIsResizing(true);
    setResizingColumn(columnKey);
    resizeStartX.current = e.clientX;
    const currentWidth = getColumnWidth(columnKey);
    resizeStartWidth.current = parseInt(currentWidth.replace("px", "")) || 140;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, [getColumnWidth, setIsResizing, setResizingColumn]);
  const handleGlobalMouseMove = useCallback((moveEvent) => {
    if (!isResizing || !activeColumnKey.current) {
      return;
    }
    moveEvent.preventDefault();
    moveEvent.stopPropagation();
    const columnKey = activeColumnKey.current;
    const deltaX = moveEvent.clientX - resizeStartX.current;
    const newWidth = Math.max(80, resizeStartWidth.current + deltaX);
    const newWidths = {
      ...columnWidths,
      [columnKey]: `${newWidth}px`
    };
    setColumnWidths(newWidths);
    onColumnWidthsChange?.(newWidths);
  }, [isResizing, columnWidths, onColumnWidthsChange]);
  const handleGlobalMouseUp = useCallback((upEvent) => {
    if (!isResizing || !activeColumnKey.current) {
      return;
    }
    upEvent.preventDefault();
    upEvent.stopPropagation();
    setIsResizing(false);
    setResizingColumn(null);
    activeColumnKey.current = null;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, [isResizing, setIsResizing, setResizingColumn]);
  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleGlobalMouseMove);
        document.removeEventListener("mouseup", handleGlobalMouseUp);
      };
    }
  }, [isResizing, handleGlobalMouseMove, handleGlobalMouseUp]);
  const handleToggleFrozenColumn = useCallback((columnKey, checked) => {
    setExperimentalFrozenColumns((prev) => {
      if (checked) {
        if (prev.length >= 2) {
          return [prev[1], columnKey];
        }
        return [...prev, columnKey];
      } else {
        return prev.filter((key) => key !== columnKey);
      }
    });
  }, []);
  const handleClearFrozenColumns = useCallback(() => {
    setExperimentalFrozenColumns([]);
  }, []);
  const handleToggleFrozenRow = useCallback((rowId, checked) => {
    setFrozenRowIds((prev) => {
      if (checked) {
        if (prev.length >= 2) {
          return [prev[1], rowId];
        }
        return [...prev, rowId];
      } else {
        return prev.filter((id) => id !== rowId);
      }
    });
  }, []);
  const handleSort = useCallback((key) => {
    const newSortConfig = {
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc"
    };
    setSortConfig(newSortConfig);
    onSortChange?.(newSortConfig);
  }, [sortConfig, onSortChange]);
  const handleSelectRow = useCallback((id, checked) => {
    let newSelection;
    if (checked) {
      newSelection = [...selectedRows, id];
    } else {
      newSelection = selectedRows.filter((rowId) => rowId !== id);
      setSelectAllPages(false);
    }
    onSelectionChange?.(newSelection);
  }, [selectedRows, onSelectionChange]);
  const handleSelectAllCurrent = useCallback((checked) => {
    if (checked) {
      const currentPageIds = paginatedData.map((record) => record.id);
      onSelectionChange?.(currentPageIds);
    } else {
      onSelectionChange?.([]);
      setSelectAllPages(false);
    }
  }, [paginatedData, onSelectionChange]);
  const handleSelectAllPages = useCallback(() => {
    const allIds = sortedData.map((record) => record.id);
    onSelectionChange?.(allIds);
    setSelectAllPages(true);
  }, [sortedData, onSelectionChange]);
  const handleColumnsChange = useCallback((newColumns) => {
    setColumns(newColumns);
    onColumnsChange?.(newColumns);
  }, [onColumnsChange]);
  const areAllCurrentPageSelected = paginatedData.length > 0 && paginatedData.every((record) => selectedRows.includes(record.id));
  const selectionCount = selectAllPages ? sortedData.length : selectedRows.length;
  const getColumnStyle = useCallback((column, index, isFrozen) => {
    const isExperimentallyFrozen = experimentalFrozenColumns.includes(column.key);
    const baseStyle = {
      width: getActualColumnWidth(column.key),
      minWidth: isFullScreen ? "auto" : getColumnWidth(column.key),
      maxWidth: isFullScreen ? "none" : getColumnWidth(column.key)
    };
    if (isFrozen) {
      const leftPosition = enableSelection ? 48 + frozenColumns.slice(0, index).reduce((acc, col) => acc + parseInt(getActualColumnWidth(col.key)), 0) : frozenColumns.slice(0, index).reduce((acc, col) => acc + parseInt(getActualColumnWidth(col.key)), 0);
      return {
        ...baseStyle,
        left: `${leftPosition}px`,
        backgroundColor: isExperimentallyFrozen ? "#f8fafc" : "white",
        // Subtle tint for experimental columns
        borderRight: isExperimentallyFrozen ? "2px solid #e2e8f0" : "1px solid #e5e7eb"
      };
    }
    return baseStyle;
  }, [experimentalFrozenColumns, enableSelection, frozenColumns, getActualColumnWidth, isFullScreen, getColumnWidth]);
  const searchBar = /* @__PURE__ */ jsxs6("div", { className: "relative w-96", children: [
    /* @__PURE__ */ jsx12(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" }),
    /* @__PURE__ */ jsx12(Input, { placeholder: searchPlaceholder, className: "pl-9 w-full", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })
  ] });
  const filtersButton = effectiveFilters.length > 0 && /* @__PURE__ */ jsxs6(Popover, { open: isFilterOpen, onOpenChange: setIsFilterOpen, children: [
    /* @__PURE__ */ jsx12(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs6(Button, { variant: "outline", className: "gap-2 bg-[#0097ee] hover:bg-[#0097ee]/90 text-white border-[#0097ee]", children: [
      /* @__PURE__ */ jsx12(Filter, { className: "h-4 w-4" }),
      "Filters"
    ] }) }),
    /* @__PURE__ */ jsx12(PopoverContent, { className: "w-80 bg-white z-50", align: "end", children: /* @__PURE__ */ jsxs6("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx12("h4", { className: "font-medium leading-none", children: "Filters" }),
      effectiveFilters.map((filter) => /* @__PURE__ */ jsxs6("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx12("label", { className: "text-sm font-medium", children: filter.label }),
        filter.type === "multi-select" && filter.options && /* @__PURE__ */ jsxs6("div", { className: "space-y-1", children: [
          filter.searchable && /* @__PURE__ */ jsx12(Input, { placeholder: `Search ${filter.label.toLowerCase()}...`, value: filterSearchTerms[filter.key] || "", onChange: (e) => setFilterSearchTerms((prev) => ({
            ...prev,
            [filter.key]: e.target.value
          })), className: "text-sm" }),
          /* @__PURE__ */ jsx12("div", { className: "max-h-40 overflow-y-auto space-y-1", children: filter.options.filter((option) => !filter.searchable || !filterSearchTerms[filter.key] || option.label.toLowerCase().includes(filterSearchTerms[filter.key].toLowerCase())).map((option) => /* @__PURE__ */ jsxs6("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx12(Checkbox, { id: `${filter.key}-${option.value}`, checked: effectiveActiveFilters[filter.key]?.includes(option.value) || false, onCheckedChange: (checked) => {
              const current = effectiveActiveFilters[filter.key] || [];
              if (checked) {
                handleInternalFilterChange(filter.key, [...current, option.value]);
              } else {
                handleInternalFilterChange(filter.key, current.filter((v) => v !== option.value));
              }
            } }),
            /* @__PURE__ */ jsxs6("label", { htmlFor: `${filter.key}-${option.value}`, className: "text-sm cursor-pointer flex items-center gap-2", children: [
              filter.statusColors && option.color && /* @__PURE__ */ jsx12(Badge, { className: `${option.color} text-xs`, children: option.label }),
              (!filter.statusColors || !option.color) && option.label
            ] })
          ] }, option.value)) })
        ] })
      ] }, filter.key)),
      /* @__PURE__ */ jsxs6("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx12(Button, { variant: "outline", size: "sm", onClick: () => {
          handleInternalClearAllFilters();
          setFilterSearchTerms({});
        }, children: "Clear All" }),
        /* @__PURE__ */ jsx12(Button, { size: "sm", className: "bg-[#0097ee] hover:bg-[#0097ee]/90", onClick: () => setIsFilterOpen(false), children: "Apply" })
      ] })
    ] }) })
  ] });
  const actionsDropdown = bulkActions.length > 0 && /* @__PURE__ */ jsxs6(DropdownMenu, { children: [
    /* @__PURE__ */ jsx12(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs6(Button, { variant: "outline", children: [
      "Actions (",
      selectionCount,
      ") ",
      /* @__PURE__ */ jsx12(ChevronDown2, { className: "h-4 w-4 ml-1" })
    ] }) }),
    /* @__PURE__ */ jsxs6(DropdownMenuContent, { align: "start", children: [
      bulkActions.map((action, index) => /* @__PURE__ */ jsxs6(DropdownMenuItem, { className: "flex items-center gap-2", disabled: action.requiresSelection !== false && selectionCount === 0, onClick: () => action.onClick(selectAllPages ? sortedData.map((r) => r.id) : selectedRows), children: [
        action.icon && /* @__PURE__ */ jsx12(action.icon, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx12("span", { children: action.label })
      ] }, action.key)),
      /* @__PURE__ */ jsx12(DropdownMenuSeparator, {}),
      enableGrouping && !groupingConfig.enabled && /* @__PURE__ */ jsx12(DropdownMenuGroup, { children: /* @__PURE__ */ jsxs6(DropdownMenu, { children: [
        /* @__PURE__ */ jsxs6(DropdownMenuTrigger, { className: "flex items-center gap-2 w-full px-2 py-1.5 text-sm hover:bg-accent rounded-sm", children: [
          /* @__PURE__ */ jsx12(Group3, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx12("span", { children: "Group By" }),
          effectiveGroupBy && /* @__PURE__ */ jsx12(Badge, { variant: "secondary", className: "ml-auto text-xs", children: enabledColumns.find((col) => col.key === effectiveGroupBy)?.label || effectiveGroupBy })
        ] }),
        /* @__PURE__ */ jsxs6(DropdownMenuContent, { className: "w-56", side: "right", children: [
          /* @__PURE__ */ jsx12(DropdownMenuLabel, { className: "text-xs", children: "Group data by column" }),
          /* @__PURE__ */ jsx12(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsx12(
            DropdownMenuCheckboxItem,
            {
              checked: !effectiveGroupBy,
              onCheckedChange: () => handleGroupByChange(null),
              children: "No Grouping"
            }
          ),
          /* @__PURE__ */ jsx12(DropdownMenuSeparator, {}),
          enabledColumns.filter((column) => column.groupable !== false).map((column) => /* @__PURE__ */ jsx12(
            DropdownMenuCheckboxItem,
            {
              checked: effectiveGroupBy === column.key,
              onCheckedChange: (checked) => {
                if (checked) {
                  handleGroupByChange(column.key);
                } else {
                  handleGroupByChange(null);
                }
              },
              children: column.label
            },
            column.key
          )),
          effectiveGroupBy && /* @__PURE__ */ jsxs6(Fragment, { children: [
            /* @__PURE__ */ jsx12(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsxs6(DropdownMenuItem, { onClick: expandAllGroups, children: [
              /* @__PURE__ */ jsx12(ChevronDown2, { className: "h-4 w-4 mr-2" }),
              "Expand All Groups"
            ] }),
            /* @__PURE__ */ jsxs6(DropdownMenuItem, { onClick: collapseAllGroups, children: [
              /* @__PURE__ */ jsx12(ChevronRight3, { className: "h-4 w-4 mr-2" }),
              "Collapse All Groups"
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs6(DropdownMenuGroup, { children: [
        /* @__PURE__ */ jsxs6(DropdownMenu, { children: [
          /* @__PURE__ */ jsxs6(DropdownMenuTrigger, { className: "flex items-center gap-2 w-full px-2 py-1.5 text-sm hover:bg-accent rounded-sm", children: [
            /* @__PURE__ */ jsx12(Columns, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx12("span", { children: "Freeze Columns" }),
            experimentalFrozenColumns.length > 0 && /* @__PURE__ */ jsx12(Badge, { variant: "secondary", className: "ml-auto text-xs", children: experimentalFrozenColumns.length })
          ] }),
          /* @__PURE__ */ jsxs6(DropdownMenuContent, { className: "w-56", side: "right", children: [
            /* @__PURE__ */ jsx12(DropdownMenuLabel, { className: "text-xs", children: "Select up to 2 columns to freeze" }),
            /* @__PURE__ */ jsx12(DropdownMenuSeparator, {}),
            enabledColumns.map((column) => /* @__PURE__ */ jsx12(DropdownMenuCheckboxItem, { checked: experimentalFrozenColumns.includes(column.key), onCheckedChange: (checked) => handleToggleFrozenColumn(column.key, checked), disabled: !experimentalFrozenColumns.includes(column.key) && experimentalFrozenColumns.length >= 2, children: column.label }, column.key)),
            experimentalFrozenColumns.length > 0 && /* @__PURE__ */ jsxs6(Fragment, { children: [
              /* @__PURE__ */ jsx12(DropdownMenuSeparator, {}),
              /* @__PURE__ */ jsx12(DropdownMenuItem, { onClick: handleClearFrozenColumns, children: "Clear Frozen Columns" })
            ] })
          ] })
        ] }),
        isFullScreen && /* @__PURE__ */ jsx12(DropdownMenuGroup, { children: /* @__PURE__ */ jsx12(DropdownMenu, {}) })
      ] }),
      enableColumnConfiguration && /* @__PURE__ */ jsxs6(Fragment, { children: [
        /* @__PURE__ */ jsx12(DropdownMenuSeparator, {}),
        /* @__PURE__ */ jsxs6(DropdownMenu, { children: [
          /* @__PURE__ */ jsxs6(DropdownMenuTrigger, { className: "flex items-center gap-2 w-full px-2 py-1.5 text-sm hover:bg-accent rounded-sm", children: [
            /* @__PURE__ */ jsx12(Settings, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx12("span", { children: "Configure Columns" })
          ] }),
          /* @__PURE__ */ jsx12(DropdownMenuContent, { className: "w-auto p-0", side: "right", children: /* @__PURE__ */ jsx12(column_configurator_default, { columns, onChange: handleColumnsChange }) })
        ] })
      ] })
    ] })
  ] });
  const fullScreenToggle = enableFullScreen && /* @__PURE__ */ jsx12(Button, { variant: "outline", onClick: () => setIsFullScreen(!isFullScreen), className: "gap-2", title: isFullScreen ? "Exit full screen" : "Enter full screen", children: isFullScreen ? /* @__PURE__ */ jsx12(Minimize, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx12(Maximize, { className: "h-4 w-4" }) });
  const renderTableContent = () => /* @__PURE__ */ jsxs6("div", { className: "flex flex-col h-full", children: [
    groupingConfig.position === "top" && /* @__PURE__ */ jsx12("div", { className: "flex-shrink-0 p-2 bg-white border-b border-gray-200", children: /* @__PURE__ */ jsx12(
      GroupingSelector,
      {
        groupingConfig,
        columns: enabledColumns,
        currentGroupBy: effectiveGroupBy,
        onGroupByChange: handleGroupByChange,
        expandAllGroups,
        collapseAllGroups
      }
    ) }),
    /* @__PURE__ */ jsxs6("div", { className: "flex-shrink-0 space-y-4 bg-white", children: [
      CustomToolbar ? /* @__PURE__ */ jsx12(CustomToolbar, { selectedCount: selectionCount, searchBar, filtersButton, actionsDropdown, fullScreenToggle, columns, onColumnsChange: handleColumnsChange }) : /* @__PURE__ */ jsxs6("div", { className: "flex items-center justify-between p-1 bg-gray-50 border-b border-gray-200 gap-2", children: [
        /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-4 mx-0 my-1", children: [
          actionsDropdown,
          searchBar,
          groupingConfig.position === "next-to-filters" && /* @__PURE__ */ jsx12(
            GroupingSelector,
            {
              groupingConfig,
              columns: enabledColumns,
              currentGroupBy: effectiveGroupBy,
              onGroupByChange: handleGroupByChange,
              expandAllGroups,
              collapseAllGroups
            }
          )
        ] }),
        /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-2", children: [
          groupingConfig.position === "toolbar" && /* @__PURE__ */ jsx12(
            GroupingSelector,
            {
              groupingConfig,
              columns: enabledColumns,
              currentGroupBy: effectiveGroupBy,
              onGroupByChange: handleGroupByChange,
              expandAllGroups,
              collapseAllGroups
            }
          ),
          groupingConfig.position === "filters" && /* @__PURE__ */ jsx12(
            GroupingSelector,
            {
              groupingConfig,
              columns: enabledColumns,
              currentGroupBy: effectiveGroupBy,
              onGroupByChange: handleGroupByChange,
              expandAllGroups,
              collapseAllGroups
            }
          ),
          filtersButton,
          fullScreenToggle
        ] })
      ] }),
      areAllCurrentPageSelected && !selectAllPages && enableSelectAllPages && sortedData.length > paginatedData.length && /* @__PURE__ */ jsxs6("div", { className: "bg-blue-50 border border-blue-200 rounded-md p-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs6("span", { className: "text-sm text-blue-700", children: [
          "All ",
          paginatedData.length,
          " items on this page are selected."
        ] }),
        /* @__PURE__ */ jsxs6(Button, { variant: "link", className: "text-[#0097ee] hover:text-[#0097ee]/80 p-0 h-auto", onClick: handleSelectAllPages, children: [
          "Select all ",
          sortedData.length,
          " items across all pages"
        ] })
      ] }),
      selectAllPages && /* @__PURE__ */ jsxs6("div", { className: "bg-blue-50 border border-blue-200 rounded-md p-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs6("span", { className: "text-sm text-blue-700", children: [
          "All ",
          sortedData.length,
          " items across all pages are selected."
        ] }),
        /* @__PURE__ */ jsx12(Button, { variant: "link", className: "text-[#0097ee] hover:text-[#0097ee]/80 p-0 h-auto", onClick: () => {
          onSelectionChange?.([]);
          setSelectAllPages(false);
        }, children: "Clear selection" })
      ] }),
      enablePagination && /* @__PURE__ */ jsx12(data_table_pagination_default, { currentPage: adjustedCurrentPage, totalPages, filteredCount: sortedData.length, rowsPerPage, onPageChange: onPageChange || (() => {
      }), onRowsPerPageChange: onRowsPerPageChange || (() => {
      }) })
    ] }),
    /* @__PURE__ */ jsx12("div", { className: isFullScreen ? "flex-1" : "flex-1 min-h-0", children: /* @__PURE__ */ jsxs6("div", { className: "border border-gray-200 rounded-md overflow-hidden flex flex-col", children: [
      /* @__PURE__ */ jsx12("div", { className: `bg-white border-b border-gray-200 flex-shrink-0 ${isFullScreen && freezeHeaderRow ? "sticky top-0 z-50" : ""}`, children: /* @__PURE__ */ jsx12("div", { ref: headerScrollRef, className: "overflow-y-hidden overflow-x-auto", style: {
        height: "48px"
      }, onScroll: syncHorizontalScroll, children: /* @__PURE__ */ jsx12("div", { style: {
        minWidth: `${totalTableWidth}px`,
        width: isFullScreen ? `${totalTableWidth}px` : "max-content"
      }, children: /* @__PURE__ */ jsx12("table", { className: `w-full border-collapse ${isFullScreen ? "table-fixed" : ""}`, style: {
        width: "100%"
      }, children: /* @__PURE__ */ jsx12("thead", { children: /* @__PURE__ */ jsxs6("tr", { className: "h-12", children: [
        enableSelection && /* @__PURE__ */ jsx12("th", { className: "sticky left-0 bg-white z-40 border-r border-gray-200 px-3 text-left font-medium text-muted-foreground text-sm", style: {
          width: "48px",
          minWidth: "48px",
          maxWidth: "48px"
        }, children: /* @__PURE__ */ jsx12(Checkbox, { checked: areAllCurrentPageSelected, onCheckedChange: handleSelectAllCurrent }) }),
        frozenColumns.map((column, index) => /* @__PURE__ */ jsxs6("th", { className: `relative sticky bg-white z-30 border-r border-gray-200 px-3 py-2 text-left font-medium text-muted-foreground text-sm ${experimentalFrozenColumns.includes(column.key) ? "bg-slate-50" : ""}`, style: getColumnStyle(column, index, true), children: [
          /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-2 cursor-pointer", onClick: () => handleSort(column.key), children: [
            column.label,
            experimentalFrozenColumns.includes(column.key) && /* @__PURE__ */ jsx12(Pin, { className: "h-3 w-3 text-blue-500" }),
            sortConfig.key === column.key && /* @__PURE__ */ jsx12("span", { className: "text-xs", children: sortConfig.direction === "asc" ? "\u2191" : "\u2193" })
          ] }),
          column.resizable !== false && /* @__PURE__ */ jsx12(
            "div",
            {
              className: `absolute inset-y-0 right-0 w-2 cursor-col-resize z-[100] transition-all duration-200 ${isResizing && resizingColumn === column.key ? "bg-blue-500" : "bg-transparent hover:bg-blue-100"}`,
              onMouseDown: (e) => {
                e.stopPropagation();
                e.preventDefault();
                handleResizeStart(e, column.key);
              },
              onClick: (e) => {
                e.stopPropagation();
                e.preventDefault();
              },
              title: "Drag to resize column",
              children: /* @__PURE__ */ jsx12(
                "div",
                {
                  className: `absolute inset-y-0 right-0 w-0.5 transition-all duration-200 ${isResizing && resizingColumn === column.key ? "bg-blue-600" : "bg-gray-300 opacity-40 group-hover:opacity-100 hover:bg-blue-500"}`
                }
              )
            }
          )
        ] }, column.key)),
        scrollableColumns.map((column) => /* @__PURE__ */ jsxs6("th", { className: "relative border-r border-gray-200 px-3 py-2 text-left font-medium text-muted-foreground text-sm", style: getColumnStyle(column, 0, false), children: [
          /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-2 cursor-pointer", onClick: () => handleSort(column.key), children: [
            column.label,
            sortConfig.key === column.key && /* @__PURE__ */ jsx12("span", { className: "text-xs", children: sortConfig.direction === "asc" ? "\u2191" : "\u2193" })
          ] }),
          column.resizable !== false && /* @__PURE__ */ jsx12(
            "div",
            {
              className: `absolute inset-y-0 right-0 w-2 cursor-col-resize z-[100] transition-all duration-200 ${isResizing && resizingColumn === column.key ? "bg-blue-500" : "bg-transparent hover:bg-blue-100"}`,
              onMouseDown: (e) => {
                e.stopPropagation();
                e.preventDefault();
                handleResizeStart(e, column.key);
              },
              onClick: (e) => {
                e.stopPropagation();
                e.preventDefault();
              },
              title: "Drag to resize column",
              children: /* @__PURE__ */ jsx12(
                "div",
                {
                  className: `absolute inset-y-0 right-0 w-0.5 transition-all duration-200 ${isResizing && resizingColumn === column.key ? "bg-blue-600" : "bg-gray-300 opacity-40 group-hover:opacity-100 hover:bg-blue-500"}`
                }
              )
            }
          )
        ] }, column.key)),
        rowActions && /* @__PURE__ */ jsx12("th", { className: "border-r border-gray-200 px-3 text-left font-medium text-muted-foreground text-sm", style: {
          width: "64px",
          minWidth: "64px",
          maxWidth: "64px"
        }, children: "Actions" })
      ] }) }) }) }) }) }),
      /* @__PURE__ */ jsx12("div", { ref: bodyScrollRef, className: "flex-1 min-h-0 overflow-auto", style: {
        height: isFullScreen ? "auto" : dynamicHeight ? `${tableBodyHeight}px` : `${maxHeight}px`,
        maxHeight: isFullScreen ? "none" : `${maxHeight}px`
      }, onScroll: syncHorizontalScroll, children: /* @__PURE__ */ jsx12("div", { style: {
        minWidth: `${totalTableWidth}px`,
        width: isFullScreen ? `${totalTableWidth}px` : "max-content"
      }, children: /* @__PURE__ */ jsx12("table", { className: `w-full border-collapse ${isFullScreen ? "table-fixed" : ""}`, style: {
        width: "100%"
      }, children: /* @__PURE__ */ jsxs6("tbody", { children: [
        isFullScreen && frozenRowIds.length > 0 && /* @__PURE__ */ jsx12(Fragment, { children: frozenRowIds.map((frozenId, frozenIndex) => {
          const frozenRecord = paginatedData.find((record) => record.id === frozenId);
          if (!frozenRecord) return null;
          return /* @__PURE__ */ jsxs6("tr", { className: `sticky bg-blue-50 border-b-2 border-blue-200 cursor-pointer h-12 text-sm text-muted-foreground z-20`, style: {
            top: `${48 + frozenIndex * rowHeight}px`
          }, onClick: () => onRowClick?.(frozenRecord), children: [
            enableSelection && /* @__PURE__ */ jsx12("td", { className: "sticky left-0 bg-blue-50 z-30 border-r border-gray-200 px-3", style: {
              width: "48px",
              minWidth: "48px",
              maxWidth: "48px"
            }, onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx12(Checkbox, { checked: selectedRows.includes(frozenRecord.id), onCheckedChange: (checked) => handleSelectRow(frozenRecord.id, checked) }),
              /* @__PURE__ */ jsx12(Pin, { className: "h-3 w-3 text-blue-500" })
            ] }) }),
            frozenColumns.map((column, index) => /* @__PURE__ */ jsx12("td", { className: `sticky bg-blue-50 z-20 border-r border-gray-200 px-3 whitespace-nowrap overflow-hidden text-ellipsis text-sm ${experimentalFrozenColumns.includes(column.key) ? "bg-slate-50" : ""} ${column.className || ""}`, style: getColumnStyle(column, index, true), children: column.render ? column.render(frozenRecord[column.key], frozenRecord) : String(frozenRecord[column.key] ?? "") }, column.key)),
            scrollableColumns.map((column) => /* @__PURE__ */ jsx12("td", { className: `bg-blue-50 border-r border-gray-100 px-3 whitespace-nowrap overflow-hidden text-ellipsis text-sm ${column.className || ""}`, style: getColumnStyle(column, 0, false), children: column.render ? column.render(frozenRecord[column.key], frozenRecord) : String(frozenRecord[column.key] ?? "") }, column.key)),
            rowActions && /* @__PURE__ */ jsx12("td", { className: "bg-blue-50 border-r border-gray-100 px-3", style: {
              width: "64px",
              minWidth: "64px",
              maxWidth: "64px"
            }, onClick: (e) => e.stopPropagation(), children: rowActions(frozenRecord) })
          ] }, `frozen-${frozenRecord.id}`);
        }) }),
        paginatedData.length > 0 ? paginatedData.filter((record) => !frozenRowIds.includes(record.id)).map((record) => {
          const typedRecord = record;
          if (effectiveEnableGrouping && typedRecord.isGroupHeader) {
            const totalColumns = (enableSelection ? 1 : 0) + enabledColumns.length + (rowActions ? 1 : 0);
            return /* @__PURE__ */ jsxs6("tr", { className: "bg-gray-50 hover:bg-gray-100 border-b border-gray-200", children: [
              enableSelection && /* @__PURE__ */ jsx12("td", { className: "sticky left-0 bg-gray-50 z-20 border-r border-gray-200 px-3 py-2", style: {
                width: "48px",
                minWidth: "48px",
                maxWidth: "48px"
              }, children: /* @__PURE__ */ jsx12(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "h-6 w-6 p-0",
                  onClick: () => toggleGroup(typedRecord.groupKey),
                  children: expandedGroups.has(typedRecord.groupKey) ? /* @__PURE__ */ jsx12(ChevronDown2, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx12(ChevronRight3, { className: "h-4 w-4" })
                }
              ) }),
              /* @__PURE__ */ jsx12(
                "td",
                {
                  colSpan: enabledColumns.length + (rowActions ? 1 : 0),
                  className: "bg-gray-50 border-r border-gray-100 px-3 py-2",
                  children: /* @__PURE__ */ jsxs6("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-2", children: [
                      !enableSelection && /* @__PURE__ */ jsx12(
                        Button,
                        {
                          variant: "ghost",
                          size: "sm",
                          className: "h-6 w-6 p-0",
                          onClick: () => toggleGroup(typedRecord.groupKey),
                          children: expandedGroups.has(typedRecord.groupKey) ? /* @__PURE__ */ jsx12(ChevronDown2, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx12(ChevronRight3, { className: "h-4 w-4" })
                        }
                      ),
                      /* @__PURE__ */ jsxs6("div", { className: "font-semibold text-gray-900 text-sm", children: [
                        typedRecord.groupName,
                        " (",
                        typedRecord.groupSummary?.recordCount || 0,
                        " items)"
                      ] })
                    ] }),
                    typedRecord.groupSummary && /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-4 text-sm text-gray-600", children: [
                      /* @__PURE__ */ jsxs6("span", { children: [
                        "Total: ",
                        typedRecord.groupSummary.recordCount
                      ] }),
                      typedRecord.groupSummary.totalInvoiceAmount && /* @__PURE__ */ jsxs6("span", { children: [
                        "Amount: $",
                        typedRecord.groupSummary.totalInvoiceAmount.toLocaleString()
                      ] }),
                      typedRecord.groupSummary.totalAmount && /* @__PURE__ */ jsxs6("span", { children: [
                        "Amount: $",
                        typedRecord.groupSummary.totalAmount.toLocaleString()
                      ] })
                    ] })
                  ] })
                }
              )
            ] }, record.id);
          }
          return /* @__PURE__ */ jsxs6("tr", { className: `hover:bg-muted/50 border-b border-gray-100 cursor-pointer h-12 text-sm text-muted-foreground ${effectiveEnableGrouping && !typedRecord.isGroupHeader ? "pl-4" : ""}`, onClick: () => onRowClick?.(record), children: [
            enableSelection && /* @__PURE__ */ jsx12("td", { className: `sticky left-0 bg-white z-20 border-r border-gray-200 px-3 ${effectiveEnableGrouping && !typedRecord.isGroupHeader ? "pl-8" : ""}`, style: {
              width: "48px",
              minWidth: "48px",
              maxWidth: "48px"
            }, onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx12(Checkbox, { checked: selectedRows.includes(record.id), onCheckedChange: (checked) => handleSelectRow(record.id, checked) }) }),
            frozenColumns.map((column, index) => /* @__PURE__ */ jsx12("td", { className: `sticky bg-white z-10 border-r border-gray-200 px-3 whitespace-nowrap overflow-hidden text-ellipsis text-sm ${experimentalFrozenColumns.includes(column.key) ? "bg-slate-50" : ""} ${column.className || ""}`, style: getColumnStyle(column, index, true), children: column.render ? column.render(record[column.key], record) : String(record[column.key] ?? "") }, column.key)),
            scrollableColumns.map((column, colIdx) => /* @__PURE__ */ jsx12("td", { className: `border-r border-gray-100 px-3 whitespace-nowrap overflow-hidden text-ellipsis text-sm ${column.className || ""}`, style: getColumnStyle(column, colIdx, false), children: column.render ? column.render(record[column.key], record) : String(record[column.key] ?? "") }, column.key)),
            rowActions && /* @__PURE__ */ jsx12("td", { className: "border-r border-gray-100 px-3", style: {
              width: "64px",
              minWidth: "64px",
              maxWidth: "64px"
            }, onClick: (e) => e.stopPropagation(), children: rowActions(record) })
          ] }, record.id);
        }) : /* @__PURE__ */ jsx12("tr", { children: /* @__PURE__ */ jsx12("td", { colSpan: (enableSelection ? 1 : 0) + enabledColumns.length + (rowActions ? 1 : 0), className: "text-center py-8 text-muted-foreground text-sm", children: emptyState || "No data found matching your criteria" }) })
      ] }) }) }) })
    ] }) }),
    enablePagination && /* @__PURE__ */ jsx12("div", { className: "flex-shrink-0 mt-4 bg-white", children: /* @__PURE__ */ jsx12(data_table_pagination_default, { currentPage: adjustedCurrentPage, totalPages, filteredCount: sortedData.length, rowsPerPage, onPageChange: onPageChange || (() => {
    }), onRowsPerPageChange: onRowsPerPageChange || (() => {
    }) }) })
  ] });
  if (isFullScreen) {
    return /* @__PURE__ */ jsx12("div", { className: "fixed inset-0 bg-white z-50 overflow-auto p-4", children: renderTableContent() });
  }
  return /* @__PURE__ */ jsx12("div", { className: "container mx-auto h-full", children: renderTableContent() });
};
var enhanced_data_table_default = EnhancedDataTable;

// src/components/ui/simple-data-table.tsx
import { jsx as jsx13, jsxs as jsxs7 } from "react/jsx-runtime";
var SimpleDataTable = ({ data, columns }) => {
  return /* @__PURE__ */ jsxs7("div", { className: "p-4 border rounded-lg", children: [
    /* @__PURE__ */ jsx13("h3", { className: "text-lg font-semibold mb-4", children: "Simple Data Table (Package Test)" }),
    /* @__PURE__ */ jsxs7("table", { className: "w-full border-collapse border", children: [
      /* @__PURE__ */ jsx13("thead", { children: /* @__PURE__ */ jsx13("tr", { children: columns.map((col) => /* @__PURE__ */ jsx13("th", { className: "border p-2 bg-gray-100 text-left", children: col.label }, col.key)) }) }),
      /* @__PURE__ */ jsx13("tbody", { children: data.map((row, idx) => /* @__PURE__ */ jsx13("tr", { children: columns.map((col) => /* @__PURE__ */ jsx13("td", { className: "border p-2", children: row[col.key] }, col.key)) }, idx)) })
    ] }),
    /* @__PURE__ */ jsxs7("p", { className: "mt-2 text-sm text-gray-600", children: [
      "\u2705 Package successfully imported and rendered! (",
      data.length,
      " rows, ",
      columns.length,
      " columns)"
    ] })
  ] });
};
var simple_data_table_default = SimpleDataTable;

// src/components/ui/advanced-data-table-demo.tsx
import { jsx as jsx14, jsxs as jsxs8 } from "react/jsx-runtime";
var AdvancedDataTableDemo = ({ data }) => {
  return /* @__PURE__ */ jsxs8("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs8("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxs8("div", { className: "p-4 bg-blue-50 border border-blue-200 rounded-lg", children: [
        /* @__PURE__ */ jsx14("h3", { className: "font-semibold text-blue-800 mb-2", children: "\u{1F4CA} Core Features" }),
        /* @__PURE__ */ jsxs8("ul", { className: "text-sm text-blue-700 space-y-1", children: [
          /* @__PURE__ */ jsx14("li", { children: "\u2705 Advanced Search & Filtering" }),
          /* @__PURE__ */ jsx14("li", { children: "\u2705 Multi-column Sorting" }),
          /* @__PURE__ */ jsx14("li", { children: "\u2705 Row Selection (Single/Multiple)" }),
          /* @__PURE__ */ jsx14("li", { children: "\u2705 Pagination with Custom Page Sizes" }),
          /* @__PURE__ */ jsx14("li", { children: "\u2705 Data Export (CSV, Excel)" }),
          /* @__PURE__ */ jsx14("li", { children: "\u2705 Column Visibility Toggle" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs8("div", { className: "p-4 bg-green-50 border border-green-200 rounded-lg", children: [
        /* @__PURE__ */ jsx14("h3", { className: "font-semibold text-green-800 mb-2", children: "\u{1F680} Advanced Features" }),
        /* @__PURE__ */ jsxs8("ul", { className: "text-sm text-green-700 space-y-1", children: [
          /* @__PURE__ */ jsx14("li", { children: "\u2705 Column Freezing/Pinning" }),
          /* @__PURE__ */ jsx14("li", { children: "\u2705 Header Row Freezing" }),
          /* @__PURE__ */ jsx14("li", { children: "\u2705 Row Freezing" }),
          /* @__PURE__ */ jsx14("li", { children: "\u2705 Column Resizing" }),
          /* @__PURE__ */ jsx14("li", { children: "\u2705 Data Grouping" }),
          /* @__PURE__ */ jsx14("li", { children: "\u2705 Group Expand/Collapse" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs8("div", { className: "p-4 bg-purple-50 border border-purple-200 rounded-lg", children: [
        /* @__PURE__ */ jsx14("h3", { className: "font-semibold text-purple-800 mb-2", children: "\u{1F3A8} UI Features" }),
        /* @__PURE__ */ jsxs8("ul", { className: "text-sm text-purple-700 space-y-1", children: [
          /* @__PURE__ */ jsx14("li", { children: "\u2705 Full-screen Mode" }),
          /* @__PURE__ */ jsx14("li", { children: "\u2705 Dynamic Height" }),
          /* @__PURE__ */ jsx14("li", { children: "\u2705 Responsive Design" }),
          /* @__PURE__ */ jsx14("li", { children: "\u2705 Custom Toolbar" }),
          /* @__PURE__ */ jsx14("li", { children: "\u2705 Bulk Actions" }),
          /* @__PURE__ */ jsx14("li", { children: "\u2705 Row Actions Menu" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs8("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs8("div", { className: "p-4 border rounded-lg", children: [
        /* @__PURE__ */ jsx14("h3", { className: "font-semibold mb-3", children: "Column Configuration Options" }),
        /* @__PURE__ */ jsxs8("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 text-sm", children: [
          /* @__PURE__ */ jsxs8("div", { className: "p-2 bg-gray-50 rounded", children: [
            /* @__PURE__ */ jsx14("strong", { children: "Sortable:" }),
            " Enable/disable sorting per column"
          ] }),
          /* @__PURE__ */ jsxs8("div", { className: "p-2 bg-gray-50 rounded", children: [
            /* @__PURE__ */ jsx14("strong", { children: "Resizable:" }),
            " Drag to resize column widths"
          ] }),
          /* @__PURE__ */ jsxs8("div", { className: "p-2 bg-gray-50 rounded", children: [
            /* @__PURE__ */ jsx14("strong", { children: "Frozen:" }),
            " Pin columns to left/right"
          ] }),
          /* @__PURE__ */ jsxs8("div", { className: "p-2 bg-gray-50 rounded", children: [
            /* @__PURE__ */ jsx14("strong", { children: "Groupable:" }),
            " Allow grouping by column"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs8("div", { className: "p-4 border rounded-lg", children: [
        /* @__PURE__ */ jsx14("h3", { className: "font-semibold mb-3", children: "Supported Data Types & Formatting" }),
        /* @__PURE__ */ jsxs8("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs8("div", { children: [
            /* @__PURE__ */ jsx14("h4", { className: "font-medium text-sm mb-2", children: "Numeric Data" }),
            /* @__PURE__ */ jsxs8("ul", { className: "text-xs space-y-1", children: [
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Currency formatting ($85,000)" }),
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Percentage values (95.5%)" }),
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Number formatting (1,234.56)" }),
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Custom numeric renderers" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs8("div", { children: [
            /* @__PURE__ */ jsx14("h4", { className: "font-medium text-sm mb-2", children: "Date & Time" }),
            /* @__PURE__ */ jsxs8("ul", { className: "text-xs space-y-1", children: [
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Date formatting (MM/DD/YYYY)" }),
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Relative dates (2 days ago)" }),
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Date range filtering" }),
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Custom date renderers" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs8("div", { children: [
            /* @__PURE__ */ jsx14("h4", { className: "font-medium text-sm mb-2", children: "Status & Tags" }),
            /* @__PURE__ */ jsxs8("ul", { className: "text-xs space-y-1", children: [
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Colored status badges" }),
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Multi-select filters" }),
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Custom tag renderers" }),
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Status-based styling" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs8("div", { className: "p-4 border rounded-lg", children: [
        /* @__PURE__ */ jsx14("h3", { className: "font-semibold mb-3", children: "Data Grouping Capabilities" }),
        /* @__PURE__ */ jsxs8("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx14("p", { className: "text-sm", children: "Group by any column (Department, Status, etc.)" }),
          /* @__PURE__ */ jsxs8("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm", children: [
            /* @__PURE__ */ jsxs8("div", { children: [
              /* @__PURE__ */ jsx14("strong", { children: "Group by Department:" }),
              /* @__PURE__ */ jsxs8("div", { className: "ml-4 mt-1 space-y-1", children: [
                /* @__PURE__ */ jsx14("div", { children: "\u{1F4C1} Engineering (3 employees)" }),
                /* @__PURE__ */ jsx14("div", { children: "\u{1F4C1} Marketing (1 employee)" }),
                /* @__PURE__ */ jsx14("div", { children: "\u{1F4C1} HR (1 employee)" }),
                /* @__PURE__ */ jsx14("div", { children: "\u{1F4C1} Finance (1 employee)" }),
                /* @__PURE__ */ jsx14("div", { children: "\u{1F4C1} Sales (1 employee)" }),
                /* @__PURE__ */ jsx14("div", { children: "\u{1F4C1} Design (1 employee)" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs8("div", { children: [
              /* @__PURE__ */ jsx14("strong", { children: "Group by Status:" }),
              /* @__PURE__ */ jsxs8("div", { className: "ml-4 mt-1 space-y-1", children: [
                /* @__PURE__ */ jsx14("div", { children: "\u{1F4C1} Active (6 employees)" }),
                /* @__PURE__ */ jsx14("div", { children: "\u{1F4C1} Pending (1 employee)" }),
                /* @__PURE__ */ jsx14("div", { children: "\u{1F4C1} Inactive (1 employee)" })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs8("div", { className: "p-4 border rounded-lg", children: [
        /* @__PURE__ */ jsx14("h3", { className: "font-semibold mb-3", children: "Pagination & Performance" }),
        /* @__PURE__ */ jsxs8("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm", children: [
          /* @__PURE__ */ jsxs8("div", { children: [
            /* @__PURE__ */ jsx14("strong", { children: "Pagination Options:" }),
            /* @__PURE__ */ jsxs8("ul", { className: "mt-1 space-y-1", children: [
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Configurable page sizes (5, 10, 20, 50, 100)" }),
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Quick page navigation" }),
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Total records display" }),
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Go-to-page functionality" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs8("div", { children: [
            /* @__PURE__ */ jsx14("strong", { children: "Performance Features:" }),
            /* @__PURE__ */ jsxs8("ul", { className: "mt-1 space-y-1", children: [
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Virtual scrolling for large datasets" }),
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Dynamic height adjustment" }),
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Optimized re-rendering" }),
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Memory-efficient grouping" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs8("div", { className: "p-4 border rounded-lg", children: [
        /* @__PURE__ */ jsx14("h3", { className: "font-semibold mb-3", children: "Export & Action Capabilities" }),
        /* @__PURE__ */ jsxs8("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm", children: [
          /* @__PURE__ */ jsxs8("div", { children: [
            /* @__PURE__ */ jsx14("strong", { children: "Export Options:" }),
            /* @__PURE__ */ jsxs8("ul", { className: "mt-1 space-y-1", children: [
              /* @__PURE__ */ jsx14("li", { children: "\u2022 CSV export with custom formatting" }),
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Excel export with styling" }),
              /* @__PURE__ */ jsx14("li", { children: "\u2022 PDF export (via custom renderer)" }),
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Export filtered/selected data only" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs8("div", { children: [
            /* @__PURE__ */ jsx14("strong", { children: "Actions:" }),
            /* @__PURE__ */ jsxs8("ul", { className: "mt-1 space-y-1", children: [
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Bulk actions on selected rows" }),
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Individual row action menus" }),
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Custom action buttons" }),
              /* @__PURE__ */ jsx14("li", { children: "\u2022 Keyboard shortcuts" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs8("div", { className: "p-4 border rounded-lg", children: [
      /* @__PURE__ */ jsxs8("h3", { className: "font-semibold mb-3", children: [
        "Sample Data Structure (",
        data.length,
        " records)"
      ] }),
      /* @__PURE__ */ jsx14("div", { className: "text-sm bg-gray-50 p-3 rounded overflow-x-auto", children: /* @__PURE__ */ jsx14("pre", { children: JSON.stringify(data[0], null, 2) }) })
    ] })
  ] });
};
var advanced_data_table_demo_default = AdvancedDataTableDemo;

// src/components/ui/scroll-area.tsx
import * as React11 from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { jsx as jsx15, jsxs as jsxs9 } from "react/jsx-runtime";
var ScrollArea = React11.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs9(
  ScrollAreaPrimitive.Root,
  {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx15(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]", children }),
      /* @__PURE__ */ jsx15(ScrollBar, {}),
      /* @__PURE__ */ jsx15(ScrollAreaPrimitive.Corner, {})
    ]
  }
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
var ScrollBar = React11.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx15(
  ScrollAreaPrimitive.ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx15(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

// src/components/ui/table.tsx
import * as React12 from "react";
import { jsx as jsx16 } from "react/jsx-runtime";
var Table = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx16("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx16(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
) }));
Table.displayName = "Table";
var TableHeader = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx16("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
var TableBody = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx16(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
var TableFooter = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx16(
  "tfoot",
  {
    ref,
    className: cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
var TableRow = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx16(
  "tr",
  {
    ref,
    className: cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted h-8",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
var TableHead = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx16(
  "th",
  {
    ref,
    className: cn(
      "h-8 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
var TableCell = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx16(
  "td",
  {
    ref,
    className: cn("p-2 align-middle [&:has([role=checkbox])]:pr-0", className),
    ...props
  }
));
TableCell.displayName = "TableCell";
var TableCaption = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx16(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";

// src/components/ui/sortable-table.tsx
import { ArrowUp, ArrowDown } from "lucide-react";
import { jsx as jsx17, jsxs as jsxs10 } from "react/jsx-runtime";
var SortableTableHeader = ({
  column,
  sortConfig,
  onSort,
  style,
  className
}) => {
  const isSorted = sortConfig.key === column.key;
  return /* @__PURE__ */ jsx17(
    TableHead,
    {
      className: cn(
        "cursor-pointer hover:bg-slate-100/50 transition-colors",
        isSorted ? "font-bold text-primary active-sort-column" : "",
        column.className,
        className
      ),
      onClick: () => onSort(column.key),
      style,
      children: /* @__PURE__ */ jsxs10("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx17("span", { children: column.label }),
        isSorted && /* @__PURE__ */ jsx17("span", { className: "ml-1", children: sortConfig.direction === "asc" ? /* @__PURE__ */ jsx17(ArrowUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx17(ArrowDown, { className: "h-4 w-4" }) })
      ] })
    }
  );
};

// src/components/ui/groupable-table-row.tsx
import { ChevronRight as ChevronRight4, ChevronDown as ChevronDown3 } from "lucide-react";
import { jsx as jsx18, jsxs as jsxs11 } from "react/jsx-runtime";
var GroupableTableRow = ({
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
    return /* @__PURE__ */ jsxs11(TableRow, { className: "bg-gray-50 hover:bg-gray-100 border-b border-gray-200", children: [
      /* @__PURE__ */ jsx18(TableCell, { className: "py-2", children: /* @__PURE__ */ jsx18(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "h-6 w-6 p-0",
          onClick: () => onToggleGroup?.(record.groupKey),
          children: record.isExpanded ? /* @__PURE__ */ jsx18(ChevronDown3, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx18(ChevronRight4, { className: "h-4 w-4" })
        }
      ) }),
      /* @__PURE__ */ jsx18(TableCell, { colSpan: columns.length, className: "py-2", children: /* @__PURE__ */ jsxs11("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs11("div", { className: "font-semibold text-gray-900 text-sm", children: [
          record.groupName,
          " (",
          record.groupSummary?.recordCount || 0,
          " items)"
        ] }),
        record.groupSummary && /* @__PURE__ */ jsxs11("div", { className: "flex items-center gap-4 text-sm", children: [
          /* @__PURE__ */ jsxs11("span", { children: [
            "Total: ",
            record.groupSummary.totalExpected
          ] }),
          /* @__PURE__ */ jsxs11("span", { children: [
            "Active: ",
            record.groupSummary.totalActual
          ] }),
          /* @__PURE__ */ jsxs11("span", { children: [
            "Inactive: ",
            record.groupSummary.totalVacancy
          ] }),
          /* @__PURE__ */ jsxs11(Badge, { className: `${record.groupSummary.totalVacancy > 0 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`, children: [
            record.groupSummary.fillRate,
            "% filled"
          ] })
        ] })
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxs11(
    TableRow,
    {
      className: "cursor-pointer hover:bg-muted/50 h-10",
      onClick: () => onRowClick?.(record.originalRecord || record),
      children: [
        /* @__PURE__ */ jsx18(TableCell, { onClick: (e) => e.stopPropagation(), className: "py-2 pl-8", children: /* @__PURE__ */ jsx18(
          Checkbox,
          {
            checked: isSelected,
            onCheckedChange: (checked) => onSelect(record.id, checked)
          }
        ) }),
        columns.map((column) => /* @__PURE__ */ jsx18(TableCell, { className: `${column.className} py-2`, children: column.render ? column.render(record[column.key], record.originalRecord || record) : record[column.key] }, column.key))
      ]
    }
  );
};
export {
  advanced_data_table_demo_default as AdvancedDataTableDemo,
  Badge,
  Button,
  Checkbox,
  column_configurator_default as ColumnConfigurator,
  data_table_pagination_default as DataTablePagination,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  enhanced_data_table_default as EnhancedDataTable,
  GroupableTableRow,
  Input,
  Label2 as Label,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  ScrollBar,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  simple_data_table_default as SimpleDataTable,
  SortableTableHeader,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  badgeVariants,
  buttonVariants,
  cn,
  formatCurrency,
  formatDate,
  useTableGrouping
};
//# sourceMappingURL=index.mjs.map
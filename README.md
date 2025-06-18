# @engagifii/enhanced-data-table

A comprehensive, feature-rich data table component built with React, TypeScript, and shadcn/ui. This package provides advanced filtering, sorting, pagination, grouping, and column management capabilities.

## Features

- 🔍 **Advanced Search & Filtering**: Multi-field search with customizable filters
- 📊 **Sorting**: Column-based sorting with visual indicators
- 📄 **Pagination**: Flexible pagination with configurable page sizes
- 👥 **Grouping**: Group data by columns with collapsible groups
- 🎛️ **Column Management**: Show/hide, reorder, and resize columns
- ✅ **Row Selection**: Single and multi-row selection with bulk actions
- 📱 **Responsive**: Works on desktop and mobile devices
- 🎨 **Customizable**: Highly customizable with Tailwind CSS
- 🚀 **Performance**: Optimized for large datasets
- 💪 **TypeScript**: Full TypeScript support with type safety

## Installation

```bash
npm install @engagifii/enhanced-data-table
```

### Peer Dependencies

Make sure you have these peer dependencies installed:

```bash
npm install react react-dom
```

### CSS Dependencies

This package requires Tailwind CSS. Make sure you have it configured in your project.

## Quick Start

```jsx
import React from 'react';
import { EnhancedDataTable } from '@engagifii/enhanced-data-table';

const data = [
  { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
];

const columns = [
  { key: 'name', label: 'Name', enabled: true, position: 1 },
  { key: 'email', label: 'Email', enabled: true, position: 2 },
  { key: 'status', label: 'Status', enabled: true, position: 3 },
];

function App() {
  return (
    <EnhancedDataTable
      tableId="users-table"
      data={data}
      columns={columns}
      searchableFields={['name', 'email']}
      enablePagination={true}
      enableSelection={true}
    />
  );
}
```

## API Reference

### EnhancedDataTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tableId` | `string` | Required | Unique identifier for the table |
| `data` | `T[]` | Required | Array of data objects |
| `columns` | `DataTableColumn<T>[]` | Required | Column configuration |
| `searchableFields` | `string[]` | Required | Fields to include in search |
| `searchPlaceholder` | `string` | "Search..." | Placeholder text for search input |
| `enablePagination` | `boolean` | `true` | Enable pagination |
| `enableSelection` | `boolean` | `true` | Enable row selection |
| `enableGrouping` | `boolean` | `false` | Enable data grouping |
| `enableFullScreen` | `boolean` | `true` | Enable fullscreen mode |
| `itemName` | `string` | "records" | Name for items in pagination |

### Column Configuration

```typescript
interface DataTableColumn<T> {
  key: string;                    // Data field key
  label: string;                  // Column header label
  enabled: boolean;               // Show/hide column
  position: number;               // Column order
  width?: string;                 // Column width
  sortable?: boolean;             // Enable sorting
  resizable?: boolean;            // Enable resizing
  groupable?: boolean;            // Enable grouping
  render?: (value: any, record: T) => React.ReactNode; // Custom renderer
  className?: string;             // CSS classes
}
```

## Advanced Usage

### Custom Filters

```jsx
const filters = [
  {
    key: 'status',
    label: 'Status',
    type: 'multi-select',
    options: [
      { value: 'active', label: 'Active', color: 'green' },
      { value: 'inactive', label: 'Inactive', color: 'red' },
    ]
  }
];

<EnhancedDataTable
  // ... other props
  filters={filters}
  activeFilters={{ status: ['active'] }}
  onFilterChange={(key, values) => console.log(key, values)}
/>
```

### Bulk Actions

```jsx
const bulkActions = [
  {
    key: 'delete',
    label: 'Delete Selected',
    icon: TrashIcon,
    onClick: (selectedIds) => console.log('Delete:', selectedIds),
  }
];

<EnhancedDataTable
  // ... other props
  bulkActions={bulkActions}
/>
```

### Grouping

```jsx
<EnhancedDataTable
  // ... other props
  enableGrouping={true}
  groupBy="department"
  onGroupByChange={(field) => console.log('Group by:', field)}
  groupSummaryCalculator={(records) => ({
    count: records.length,
    // Add custom calculations
  })}
/>
```

## Styling

The component uses Tailwind CSS classes and CSS custom properties for theming. Make sure your Tailwind configuration includes the required colors:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... other CSS variables */
}
```

## TypeScript Support

The package is built with TypeScript and provides full type safety:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  department: string;
}

<EnhancedDataTable<User>
  data={users}
  columns={columns}
  // ... other props
/>
```

## Dependencies

This package includes all necessary dependencies:

- `@radix-ui/react-*` - UI primitives
- `@hello-pangea/dnd` - Drag and drop functionality
- `lucide-react` - Icons
- `class-variance-authority` - CSS variant management
- `clsx` & `tailwind-merge` - CSS class utilities

## Migration from Other Tables

If you're migrating from other data table libraries, check our [migration guide](./MIGRATION.md).

## Contributing

Contributions are welcome! Please read our [contributing guidelines](./CONTRIBUTING.md) before submitting a PR.

## License

MIT License - see [LICENSE](./LICENSE) file for details.

## Support

For questions and support:
- 📧 Email: support@engagifii.com
- 🐛 Issues: [GitHub Issues](https://github.com/engagifii/enhanced-data-table/issues)
- 📖 Documentation: [Full Documentation](https://docs.engagifii.com/enhanced-data-table)

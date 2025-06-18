# @engagifii/enhanced-data-table

A production-ready, enterprise-grade data table component for React applications. Built with TypeScript, Tailwind CSS, and modern UI patterns. Perfect for dashboards, admin panels, and data-heavy applications.

## 🚀 Quick Demo

Experience all features instantly:

```bash
# Clone and run the demo
git clone https://github.com/engagifii/enhanced-data-table
cd enhanced-data-table/demo
python3 -m http.server 8080
# Visit http://localhost:8080
```

## ✨ Key Features

### 📊 **Data Management**
- **Advanced Search**: Global search across multiple fields with customizable search logic
- **Smart Filtering**: Multi-select filters with searchable options and color-coded badges
- **Column Sorting**: Click headers to sort ascending/descending with visual indicators
- **Data Grouping**: Group by any column with collapsible groups and summary calculations
- **Pagination**: Configurable page sizes (10, 20, 50, 100) with total record counts

### 🎛️ **Table Controls**
- **Frozen Columns**: Pin important columns that stay visible during horizontal scrolling
- **Column Resizing**: Drag column borders to adjust widths with visual feedback
- **Column Management**: Show/hide columns and save preferences
- **Dynamic Height**: Auto-adjust table height or set min/max constraints
- **Full-Screen Mode**: Maximize table for better data viewing

### ✅ **Selection & Actions**
- **Row Selection**: Single or multi-row selection with visual checkboxes
- **Bulk Actions**: Perform operations on selected rows (export, delete, edit, etc.)
- **Row Actions**: Individual row menus with custom actions
- **Select All Pages**: Select all records across pagination

### 🎨 **UI & UX**
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Professional Styling**: Clean, modern interface following design system principles
- **Loading States**: Smooth loading indicators and skeleton screens
- **Accessibility**: Full keyboard navigation and screen reader support
- **Dark Mode Ready**: CSS variables for easy theme customization

## 📦 Installation

```bash
npm install @engagifii/enhanced-data-table
```

### Required Dependencies

```bash
npm install react react-dom tailwindcss
```

### Optional UI Dependencies (for enhanced features)
```bash
npm install @radix-ui/react-checkbox @radix-ui/react-dropdown-menu @radix-ui/react-popover @radix-ui/react-scroll-area @radix-ui/react-select lucide-react
```

## 🔥 Quick Start

### Basic Usage

```jsx
import React, { useState } from 'react';
import { EnhancedDataTable } from '@engagifii/enhanced-data-table';

const BasicExample = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  
  const data = [
    { id: '1', name: 'John Doe', email: 'john@example.com', status: 'Active', department: 'Engineering' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive', department: 'Design' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', status: 'Active', department: 'Marketing' }
  ];

  const columns = [
    {
      key: 'name',
      label: 'Full Name',
      enabled: true,
      position: 1,
      width: '200px',
      sortable: true,
      frozen: true, // Pin this column
      render: (value, record) => (
        <div className="font-medium text-gray-900">{value}</div>
      )
    },
    {
      key: 'email',
      label: 'Email Address',
      enabled: true,
      position: 2,
      width: '250px',
      sortable: true
    },
    {
      key: 'status',
      label: 'Status',
      enabled: true,
      position: 3,
      width: '120px',
      sortable: true,
      groupable: true, // Enable grouping for this column
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'department',
      label: 'Department',
      enabled: true,
      position: 4,
      width: '150px',
      sortable: true,
      groupable: true
    }
  ];

  return (
    <EnhancedDataTable
      tableId="users-table"
      data={data}
      columns={columns}
      searchableFields={['name', 'email', 'department']}
      searchPlaceholder="Search users..."
      enablePagination={true}
      enableSelection={true}
      selectedRows={selectedRows}
      onSelectionChange={setSelectedRows}
      enableGrouping={true}
      enableFullScreen={true}
      enableColumnConfiguration={true}
      rowHeight={48}
      minHeight={300}
      maxHeight={600}
    />
  );
};
```

## 🛠️ Advanced Configuration

### Smart Filtering System

```jsx
const filters = [
  {
    key: 'status',
    label: 'User Status',
    type: 'multi-select',
    statusColors: true, // Enable color-coded options
    options: [
      { value: 'active', label: 'Active', color: 'green' },
      { value: 'inactive', label: 'Inactive', color: 'red' },
      { value: 'pending', label: 'Pending', color: 'yellow' }
    ]
  },
  {
    key: 'department',
    label: 'Department',
    type: 'multi-select',
    searchable: true, // Enable search within options
    options: [
      { value: 'engineering', label: 'Engineering' },
      { value: 'design', label: 'Design' },
      { value: 'marketing', label: 'Marketing' }
    ]
  }
];

const [activeFilters, setActiveFilters] = useState({});

<EnhancedDataTable
  // ... other props
  filters={filters}
  activeFilters={activeFilters}
  onFilterChange={(filterKey, values) => {
    setActiveFilters(prev => ({ ...prev, [filterKey]: values }));
  }}
  onClearAllFilters={() => setActiveFilters({})}
/>
```

### Bulk Actions Configuration

```jsx
import { FileDownload, Delete, Edit, Send } from 'lucide-react';

const bulkActions = [
  {
    key: 'export',
    label: 'Export Selected',
    icon: FileDownload,
    onClick: (selectedIds) => {
      console.log('Exporting users:', selectedIds);
      // Implement export logic
    },
    requiresSelection: true
  },
  {
    key: 'sendEmail',
    label: 'Send Welcome Email',
    icon: Send,
    onClick: (selectedIds) => {
      console.log('Sending emails to:', selectedIds);
      // Implement email sending
    },
    requiresSelection: true
  },
  {
    key: 'delete',
    label: 'Delete Selected',
    icon: Delete,
    onClick: (selectedIds) => {
      if (confirm(`Delete ${selectedIds.length} users?`)) {
        console.log('Deleting users:', selectedIds);
        // Implement delete logic
      }
    },
    requiresSelection: true
  }
];

<EnhancedDataTable
  // ... other props
  bulkActions={bulkActions}
/>
```

### Data Grouping with Summary Calculations

```jsx
const [groupBy, setGroupBy] = useState(null);

const groupSummaryCalculator = (records) => ({
  recordCount: records.length,
  activeUsers: records.filter(r => r.status === 'Active').length,
  totalSalary: records.reduce((sum, r) => sum + (r.salary || 0), 0),
  avgAge: Math.round(records.reduce((sum, r) => sum + (r.age || 0), 0) / records.length)
});

<EnhancedDataTable
  // ... other props
  enableGrouping={true}
  groupBy={groupBy}
  onGroupByChange={setGroupBy}
  groupSummaryCalculator={groupSummaryCalculator}
/>
```

### Row-Level Actions

```jsx
import { MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';

const rowActions = (record) => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <MoreHorizontal className="h-4 w-4" />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onClick={() => viewUser(record.id)}>
        <Eye className="mr-2 h-4 w-4" />
        View Details
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => editUser(record.id)}>
        <Edit className="mr-2 h-4 w-4" />
        Edit User
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => deleteUser(record.id)}>
        <Trash2 className="mr-2 h-4 w-4" />
        Delete User
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

<EnhancedDataTable
  // ... other props
  rowActions={rowActions}
/>
```

## 📋 Complete Props Reference

### Core Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `tableId` | `string` | ✅ | - | Unique identifier for the table |
| `data` | `T[]` | ✅ | - | Array of data objects |
| `columns` | `DataTableColumn<T>[]` | ✅ | - | Column configuration array |
| `searchableFields` | `string[]` | ✅ | - | Fields to include in global search |

### Search & Filtering
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `searchPlaceholder` | `string` | `"Search..."` | Placeholder text for search input |
| `filters` | `DataTableFilter[]` | `[]` | Filter configuration |
| `activeFilters` | `Record<string, string[]>` | `{}` | Currently active filters |
| `onFilterChange` | `(key: string, values: string[]) => void` | - | Filter change handler |
| `onClearAllFilters` | `() => void` | - | Clear all filters handler |

### Selection & Actions
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableSelection` | `boolean` | `false` | Enable row selection |
| `selectedRows` | `string[]` | `[]` | Currently selected row IDs |
| `onSelectionChange` | `(ids: string[]) => void` | - | Selection change handler |
| `enableSelectAllPages` | `boolean` | `false` | Enable select all across pages |
| `bulkActions` | `DataTableBulkAction[]` | `[]` | Bulk action configuration |
| `rowActions` | `(record: T) => React.ReactNode` | - | Row-level actions renderer |

### Pagination
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enablePagination` | `boolean` | `true` | Enable pagination |
| `currentPage` | `number` | `1` | Current page number |
| `rowsPerPage` | `number` | `20` | Rows per page |
| `onPageChange` | `(page: number) => void` | - | Page change handler |
| `onRowsPerPageChange` | `(rows: number) => void` | - | Rows per page change handler |

### Grouping
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableGrouping` | `boolean` | `false` | Enable data grouping |
| `groupBy` | `string \| null` | `null` | Current grouping field |
| `onGroupByChange` | `(field: string \| null) => void` | - | Group by change handler |
| `groupSummaryCalculator` | `(records: T[]) => Record<string, any>` | - | Group summary calculator |

### Sorting
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultSort` | `SortConfig` | - | Default sort configuration |
| `onSortChange` | `(config: SortConfig) => void` | - | Sort change handler |

### Layout & Styling
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableFullScreen` | `boolean` | `false` | Enable fullscreen mode |
| `enableColumnConfiguration` | `boolean` | `false` | Enable column management |
| `dynamicHeight` | `boolean` | `false` | Auto-adjust table height |
| `minHeight` | `number` | `200` | Minimum table height |
| `maxHeight` | `number` | `600` | Maximum table height |
| `rowHeight` | `number` | `48` | Height of each row |
| `onRowClick` | `(record: T) => void` | - | Row click handler |

## 🎯 Use Cases for AI Assistants

When implementing this component, AI assistants should consider these common patterns:

### 1. **User Management Dashboard**
```jsx
// Perfect for: Admin panels, HR systems, customer lists
const columns = [
  { key: 'avatar', label: '', width: '60px', render: (_, user) => <UserAvatar src={user.avatar} /> },
  { key: 'name', label: 'Name', frozen: true, sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', groupable: true },
  { key: 'status', label: 'Status', groupable: true, render: StatusBadge },
  { key: 'lastLogin', label: 'Last Login', sortable: true, render: DateCell }
];
```

### 2. **Financial Data Table**
```jsx
// Perfect for: Invoices, transactions, payments
const columns = [
  { key: 'id', label: 'Invoice #', frozen: true },
  { key: 'amount', label: 'Amount', sortable: true, render: CurrencyCell, className: 'text-right' },
  { key: 'status', label: 'Status', groupable: true, render: PaymentStatusBadge },
  { key: 'dueDate', label: 'Due Date', sortable: true },
  { key: 'customer', label: 'Customer', groupable: true }
];
```

### 3. **Product Catalog**
```jsx
// Perfect for: E-commerce, inventory, catalog management
const columns = [
  { key: 'image', label: '', width: '80px', render: ProductImage },
  { key: 'name', label: 'Product Name', frozen: true, sortable: true },
  { key: 'category', label: 'Category', groupable: true },
  { key: 'price', label: 'Price', sortable: true, render: PriceCell },
  { key: 'stock', label: 'Stock', sortable: true, render: StockIndicator },
  { key: 'rating', label: 'Rating', render: StarRating }
];
```

### 4. **Analytics Dashboard**
```jsx
// Perfect for: Reports, metrics, analytics data
const columns = [
  { key: 'metric', label: 'Metric', frozen: true },
  { key: 'value', label: 'Value', render: MetricValue },
  { key: 'change', label: 'Change', render: ChangeIndicator },
  { key: 'trend', label: 'Trend', render: TrendChart },
  { key: 'period', label: 'Period', groupable: true }
];
```

## 🎨 Styling Guide

### Tailwind CSS Integration

The component uses Tailwind CSS and requires these CSS variables:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
}
```

### Custom Cell Renderers

```jsx
// Currency formatting
const CurrencyCell = (value) => (
  <div className="text-right font-medium">
    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)}
  </div>
);

// Status badges
const StatusBadge = (status) => (
  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
    status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }`}>
    {status}
  </span>
);

// Date formatting
const DateCell = (date) => (
  <div className="text-sm text-gray-900">
    {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(date))}
  </div>
);
```

## 🔧 TypeScript Support

Full TypeScript support with generic types:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  department: string;
  salary?: number;
  joinDate: string;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  
  const columns: DataTableColumn<User>[] = [
    {
      key: 'name',
      label: 'Name',
      enabled: true,
      position: 1,
      sortable: true,
      render: (name: string, user: User) => (
        <div className="font-medium">{name}</div>
      )
    }
    // ... more columns
  ];

  return (
    <EnhancedDataTable<User>
      tableId="users"
      data={users}
      columns={columns}
      searchableFields={['name', 'email']}
      // ... other props
    />
  );
};
```

## ⚡ Performance Tips

1. **Memoize Data**: Use `useMemo` for data transformations
2. **Optimize Renders**: Use `useCallback` for event handlers
3. **Virtual Scrolling**: For 1000+ rows, consider implementing virtual scrolling
4. **Lazy Loading**: Load data on-demand for better initial performance

```jsx
const MemoizedTable = React.memo(({ data, ...props }) => {
  const memoizedData = useMemo(() => data, [data]);
  
  const handleFilterChange = useCallback((key, values) => {
    // Handle filter change
  }, []);

  return (
    <EnhancedDataTable
      data={memoizedData}
      onFilterChange={handleFilterChange}
      {...props}
    />
  );
});
```

## 🚀 Migration from Other Libraries

### From React Table v8
- Replace `useTable` with `<EnhancedDataTable>`
- Convert column definitions to our format
- Move sorting/filtering logic to props

### From Ant Design Table
- Convert `columns` array format
- Replace `dataSource` with `data`
- Update selection handling

### From Material-UI DataGrid
- Convert column configuration
- Update event handlers
- Replace styling approach

## 📚 Examples & Demos

Visit our [demo collection](./demo) for complete examples:
- **Basic Usage**: Simple table setup
- **Advanced Features**: All features enabled
- **Custom Styling**: Themed examples
- **Real-world Use Cases**: Industry-specific examples

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 💬 Support

- 📖 [Documentation](https://docs.engagifii.com/enhanced-data-table)
- 🐛 [Report Issues](https://github.com/engagifii/enhanced-data-table/issues)
- 💬 [Discussions](https://github.com/engagifii/enhanced-data-table/discussions)
- 📧 [Email Support](mailto:support@engagifii.com)

---

**Built with ❤️ by the Engagifii Team**
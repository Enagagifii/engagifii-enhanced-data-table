# Enhanced Data Table Copy Guide

This guide explains how to integrate the `@engagifii/enhanced-data-table` package into your projects.

## Installation Options

### Option 1: GitHub Packages (Recommended for Lovable Projects)

```bash
# Configure npm for GitHub Packages (add to .npmrc)
echo "@engagifii:registry=https://npm.pkg.github.com" >> .npmrc
echo "//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}" >> .npmrc

# Set your GitHub token (get from GitHub Settings → Developer settings → Personal access tokens)
export GITHUB_TOKEN=your_github_token_here

# Install the package
npm install @engagifii/enhanced-data-table
```

### Option 2: Local Package Development

If you want to use the local version for development:

```bash
cd /path/to/engagifii-enhanced-data-table
npm run build
npm pack

# In your target project
npm install /path/to/engagifii-enhanced-data-table-1.0.0.tgz
```

## GitHub Packages Setup for Team Members

### 1. Generate Personal Access Token

Each team member needs to create a GitHub Personal Access Token:

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Select scopes:
   - `read:packages` (required for installing packages)
   - `repo` (if working with private repositories)
4. Copy the token (you won't see it again!)

### 2. Configure Local Environment

Add to your shell profile (`.bashrc`, `.zshrc`, etc.):

```bash
export GITHUB_TOKEN=your_personal_access_token_here
```

### 3. Project Configuration

Each Lovable project should have a `.npmrc` file:

```
@engagifii:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### 4. Production Deployment

For production builds (Vercel, Netlify, etc.), add the `GITHUB_TOKEN` as an environment variable in your deployment platform.

## Setup Requirements

### 1. Tailwind CSS Configuration

Ensure your `tailwind.config.js` includes the package content:

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@engagifii/enhanced-data-table/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}
```

### 2. CSS Variables

Add these CSS variables to your global CSS file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}
```

## Basic Usage

### 1. Import the Component

```jsx
import { EnhancedDataTable } from '@engagifii/enhanced-data-table';
// Or import specific components
import { 
  EnhancedDataTable, 
  DataTablePagination,
  ColumnConfigurator 
} from '@engagifii/enhanced-data-table';
```

### 2. Define Your Data Structure

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}

const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    department: 'Engineering',
    status: 'active',
    createdAt: new Date('2023-01-15'),
  },
  // ... more users
];
```

### 3. Configure Columns

```typescript
import type { DataTableColumn } from '@engagifii/enhanced-data-table';

const columns: DataTableColumn<User>[] = [
  {
    key: 'name',
    label: 'Name',
    enabled: true,
    position: 1,
    sortable: true,
    resizable: true,
    groupable: true,
  },
  {
    key: 'email',
    label: 'Email',
    enabled: true,
    position: 2,
    sortable: true,
  },
  {
    key: 'department',
    label: 'Department',
    enabled: true,
    position: 3,
    groupable: true,
  },
  {
    key: 'status',
    label: 'Status',
    enabled: true,
    position: 4,
    render: (value, record) => (
      <Badge variant={value === 'active' ? 'default' : 'secondary'}>
        {value}
      </Badge>
    ),
  },
];
```

### 4. Implement the Component

```jsx
import React, { useState } from 'react';
import { EnhancedDataTable } from '@engagifii/enhanced-data-table';

function UsersTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  return (
    <EnhancedDataTable<User>
      tableId="users-table"
      data={users}
      columns={columns}
      searchableFields={['name', 'email', 'department']}
      searchPlaceholder="Search users..."
      
      // Pagination
      enablePagination={true}
      currentPage={currentPage}
      rowsPerPage={rowsPerPage}
      onPageChange={setCurrentPage}
      onRowsPerPageChange={setRowsPerPage}
      
      // Selection
      enableSelection={true}
      selectedRows={selectedRows}
      onSelectionChange={setSelectedRows}
      
      // Other features
      enableFullScreen={true}
      enableColumnConfiguration={true}
      enableGrouping={true}
      
      // Custom item name for pagination
      itemName="users"
    />
  );
}
```

## Advanced Features

### Filters

```typescript
const filters = [
  {
    key: 'status',
    label: 'Status',
    type: 'multi-select' as const,
    options: [
      { value: 'active', label: 'Active', color: 'green' },
      { value: 'inactive', label: 'Inactive', color: 'red' },
    ],
  },
  {
    key: 'department',
    label: 'Department',
    type: 'multi-select' as const,
    searchable: true,
    options: [
      { value: 'engineering', label: 'Engineering' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'sales', label: 'Sales' },
    ],
  },
];
```

### Bulk Actions

```typescript
const bulkActions = [
  {
    key: 'activate',
    label: 'Activate Selected',
    icon: CheckIcon,
    onClick: (selectedIds: string[]) => {
      console.log('Activating users:', selectedIds);
    },
  },
  {
    key: 'deactivate',
    label: 'Deactivate Selected',
    icon: XIcon,
    onClick: (selectedIds: string[]) => {
      console.log('Deactivating users:', selectedIds);
    },
  },
];
```

## Project-Specific Integration

### For Each Engagifii Project

1. **Install the package**:
   ```bash
   npm install @engagifii/enhanced-data-table
   ```

2. **Update your existing data table imports**:
   ```diff
   - import EnhancedDataTable from '@/components/ui/enhanced-data-table';
   + import { EnhancedDataTable } from '@engagifii/enhanced-data-table';
   ```

3. **Update pagination imports**:
   ```diff
   - import InvoicePagination from '../reports/transactions/invoice-components/InvoicePagination';
   + import { DataTablePagination } from '@engagifii/enhanced-data-table';
   ```

4. **Update component usage**:
   ```diff
   - <InvoicePagination
   + <DataTablePagination
       currentPage={currentPage}
       totalPages={totalPages}
       filteredCount={filteredCount}
       rowsPerPage={rowsPerPage}
       onPageChange={onPageChange}
       onRowsPerPageChange={onRowsPerPageChange}
   +   itemName="invoices"
     />
   ```

## Migration Checklist

- [ ] Install `@engagifii/enhanced-data-table` package
- [ ] Update Tailwind configuration
- [ ] Add CSS variables
- [ ] Update imports in existing files
- [ ] Replace project-specific pagination with `DataTablePagination`
- [ ] Update column configurations to use new interface
- [ ] Test all data table functionality
- [ ] Remove old component files (optional)

## Troubleshooting

### Common Issues

1. **Styling not working**: Make sure Tailwind CSS is configured correctly and CSS variables are defined.

2. **TypeScript errors**: Ensure you're using the correct types from the package exports.

3. **Component not rendering**: Check that all peer dependencies are installed.

4. **Performance issues**: For large datasets, consider implementing server-side pagination and filtering.

### Getting Help

If you encounter issues:

1. Check the package documentation
2. Look at existing implementations in other Engagifii projects
3. Create an issue in the package repository
4. Contact the development team

## Benefits of Using the Package

✅ **Consistency**: Same data table experience across all projects
✅ **Maintenance**: Central location for bug fixes and updates
✅ **Performance**: Optimized and tested implementation
✅ **Type Safety**: Full TypeScript support
✅ **Documentation**: Comprehensive docs and examples
✅ **Flexibility**: Highly configurable for different use cases

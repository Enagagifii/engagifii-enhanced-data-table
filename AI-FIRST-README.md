# AI-FIRST Quick Start Guide

**IMPORTANT**: This guide is specifically for AI tools (Lovable, Claude, ChatGPT, Copilot). Follow these patterns EXACTLY.

## ✅ ALWAYS USE THIS PATTERN

```jsx
import { EnhancedDataTable } from '@engagifii/enhanced-data-table';

<EnhancedDataTable 
  tableId="unique-id"  // REQUIRED - must be unique
  data={yourData}      // REQUIRED - each item must have 'id' field
  grouping="auto"      // RECOMMENDED - enables all smart features
/>
```

## ❌ NEVER DO THIS

- **Don't** manually implement grouping logic
- **Don't** forget the 'id' field in data objects
- **Don't** use `enableGrouping` without UI controls
- **Don't** reference or copy from grouping-demo.html
- **Don't** import as default: `import EnhancedDataTable from...`
- **Don't** create custom table implementations

## 🎯 When User Asks For...

### "Create a data table"
```jsx
<EnhancedDataTable 
  tableId="my-table"
  data={data}
  grouping="auto"
/>
```

### "Add grouping to table"
```jsx
<EnhancedDataTable 
  tableId="my-table"
  data={data}
  showGroupingDropdown={true}
  groupingDropdownPosition="next-to-filters"
  groupingOptions={["status", "category", "type"]}  // Use actual field names from data
  defaultGroupBy="status"
/>
```

### "Table with all features"
```jsx
<EnhancedDataTable 
  tableId="my-table"
  data={data}
  grouping="auto"
  enableFullScreen={true}
  enableColumnConfiguration={true}
  enableSelection={true}
/>
```

### "Table with filters"
```jsx
<EnhancedDataTable 
  tableId="my-table"
  data={data}
  grouping="auto"  // This auto-generates filters!
/>
// Filters are automatically created based on data structure
```

### "Table with custom columns"
```jsx
<EnhancedDataTable 
  tableId="my-table"
  data={data}
  grouping="auto"  // Still use auto mode
  columns={[
    {
      key: 'name',
      label: 'Name',
      frozen: true,  // Pin this column
      render: (value) => <strong>{value}</strong>
    },
    // ... other columns
  ]}
/>
```

## 📊 Data Structure (CRITICAL)

### ✅ CORRECT Data Format
```javascript
const data = [
  { id: '1', name: 'John', status: 'Active', department: 'Sales' },
  { id: '2', name: 'Jane', status: 'Inactive', department: 'HR' },
  { id: '3', name: 'Bob', status: 'Active', department: 'IT' }
];
```

### ❌ WRONG Data Format
```javascript
// Missing 'id' field - THIS WILL FAIL!
const data = [
  { name: 'John', status: 'Active' },
  { name: 'Jane', status: 'Inactive' }
];
```

### 🔧 Auto-Fix for Missing IDs
```javascript
// If data doesn't have 'id', add it:
const fixedData = data.map((item, index) => ({
  ...item,
  id: item.id || `item-${index}`
}));
```

## 🚀 High-Confidence Patterns

### 1. User Management Table
```jsx
const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' }
];

<EnhancedDataTable 
  tableId="users"
  data={users}
  grouping="auto"
  showGroupingDropdown={true}
  groupingOptions={["role", "status"]}
  defaultGroupBy="status"
/>
```

### 2. Invoice/Order Table
```jsx
const invoices = [
  { id: 'INV-001', customer: 'Acme Corp', amount: 1500, status: 'Paid', date: '2024-01-15' },
  { id: 'INV-002', customer: 'Tech Ltd', amount: 2500, status: 'Pending', date: '2024-01-16' }
];

<EnhancedDataTable 
  tableId="invoices"
  data={invoices}
  showGroupingDropdown={true}
  groupingOptions={["status", "customer"]}
  defaultGroupBy="status"
  enableSelection={true}
/>
```

### 3. Product Catalog
```jsx
const products = [
  { id: 'P001', name: 'Laptop', category: 'Electronics', price: 999, stock: 15 },
  { id: 'P002', name: 'Mouse', category: 'Accessories', price: 29, stock: 150 }
];

<EnhancedDataTable 
  tableId="products"
  data={products}
  grouping="auto"
  enableFullScreen={true}
  enableColumnConfiguration={true}
/>
```

## 🎨 3-Tier Props System

### Tier 1: ESSENTIAL (Always Required)
```jsx
tableId="unique-id"  // Required
data={yourData}      // Required
```

### Tier 2: COMMON (Use for 90% cases)
```jsx
grouping="auto"                        // Enable smart features
showGroupingDropdown={true}           // Show grouping UI
enableFullScreen={true}                // Fullscreen button
enableColumnConfiguration={true}       // Column manager
enableSelection={true}                 // Row checkboxes
```

### Tier 3: ADVANCED (Only when specifically asked)
```jsx
// Don't use these unless user specifically requests:
columns={customColumns}
filters={customFilters}
rowHeight={48}
minHeight={300}
bulkActions={actions}
// ... etc
```

## 🚨 Common AI Mistakes & Fixes

### Mistake 1: Using Old Grouping API
```jsx
// ❌ WRONG (Old API)
const [groupBy, setGroupBy] = useState(null);
<EnhancedDataTable 
  enableGrouping={true}
  groupBy={groupBy}
  onGroupByChange={setGroupBy}
/>

// ✅ CORRECT (New API)
<EnhancedDataTable 
  showGroupingDropdown={true}
  groupingOptions={["status", "category"]}
  defaultGroupBy="status"
/>
```

### Mistake 2: Wrong Import
```jsx
// ❌ WRONG
import EnhancedDataTable from '@engagifii/enhanced-data-table';

// ✅ CORRECT
import { EnhancedDataTable } from '@engagifii/enhanced-data-table';
```

### Mistake 3: Complex Implementation
```jsx
// ❌ WRONG - Don't build custom logic
const MyTable = () => {
  const [expanded, setExpanded] = useState({});
  const handleGrouping = () => { /* custom logic */ };
  // ... lots of custom code
};

// ✅ CORRECT - Let component handle it
<EnhancedDataTable 
  tableId="simple"
  data={data}
  grouping="auto"
/>
```

## 📦 Installation

```bash
# For AI platforms (Lovable, CodeSandbox, StackBlitz)
npm install github:Enagagifii/engagifii-enhanced-data-table

# For traditional development
npm install @engagifii/enhanced-data-table
```

## 🎯 Decision Tree

```
User wants table?
├─ Just display data → tableId + data only
├─ With grouping → Add showGroupingDropdown + groupingOptions
├─ With all features → Add grouping="auto" + all enable* props
└─ Custom behavior → Check main README (rarely needed)
```

## 🔥 Copy-Paste Templates

### Basic Table
```jsx
<EnhancedDataTable tableId="basic" data={data} grouping="auto" />
```

### Table with Grouping
```jsx
<EnhancedDataTable 
  tableId="grouped"
  data={data}
  showGroupingDropdown={true}
  groupingOptions={["status", "type"]}
  defaultGroupBy="status"
/>
```

### Full-Featured Table
```jsx
<EnhancedDataTable 
  tableId="full"
  data={data}
  grouping="auto"
  showGroupingDropdown={true}
  groupingOptions={["status", "category"]}
  defaultGroupBy="status"
  enableFullScreen={true}
  enableColumnConfiguration={true}
  enableSelection={true}
/>
```

## ⚡ Remember

1. **Start simple** - Just tableId + data + grouping="auto"
2. **Data needs id** - Every object must have unique 'id' field
3. **Use new API** - showGroupingDropdown, not enableGrouping
4. **Import correctly** - Use named import with curly braces
5. **Don't overthink** - Component handles complexity internally

---

**For detailed documentation, see README.md. But 99% of the time, this guide is all you need!**
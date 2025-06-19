# 🤖 AI Tools Quick Reference Guide

*This guide is specifically designed for AI assistants, code generators, and automated tools.*

## ⚡ Simplest Usage (Copy-Paste Ready)

```jsx
import { EnhancedDataTable } from '@engagifii/enhanced-data-table';

// Just pass your data - everything else auto-generates!
<EnhancedDataTable 
  tableId="my-table"
  data={yourData}
  grouping="auto"
  enableFullScreen={true}
/>
```

## 🎯 Lovable-Style API (What AI Tools Expect)

```jsx
<EnhancedDataTable 
  tableId="my-table"
  data={yourData}
  
  // Intuitive grouping props
  showGroupingDropdown={true}
  groupingDropdownPosition="next-to-filters"
  groupingOptions={["status", "department", "position"]}
  defaultGroupBy="status"
  
  enableFullScreen={true}
  enableColumnConfiguration={true}
  enableSelection={true}
/>
```

## 📋 Essential Props Checklist

**Required:**
- ✅ `tableId`: string (unique identifier)
- ✅ `data`: Array with `id` field on each object

**Common (Optional):**
- ⚡ `grouping`: "auto" | boolean | config object
- 🎯 `showGroupingDropdown`: boolean
- 📍 `groupingDropdownPosition`: "toolbar" | "filters" | "next-to-filters" | "top"
- 📝 `groupingOptions`: string[] (field names)
- 🎯 `defaultGroupBy`: string (field name)
- 🖥️ `enableFullScreen`: boolean
- ⚙️ `enableColumnConfiguration`: boolean
- ✅ `enableSelection`: boolean

## 🚨 Data Requirements

```typescript
// Your data MUST have this structure:
interface DataType {
  id: string;           // Required!
  [key: string]: any;   // Any other fields
}

// Example:
const data = [
  { id: '1', name: 'John', status: 'Active', department: 'Engineering' },
  { id: '2', name: 'Jane', status: 'Inactive', department: 'Design' }
];
```

## 🔧 Installation for AI Platforms

```bash
# For Lovable, CodeSandbox, StackBlitz, etc.
npm install github:Enagagifii/engagifii-enhanced-data-table
```

**OR add to package.json:**
```json
{
  "dependencies": {
    "@engagifii/enhanced-data-table": "github:Enagagifii/engagifii-enhanced-data-table"
  }
}
```

## 🎨 Common Use Cases

```jsx
// 1. User Management
<EnhancedDataTable tableId="users" data={users} grouping="auto" />

// 2. Orders/Invoices  
<EnhancedDataTable tableId="orders" data={orders} grouping="auto" />

// 3. Products/Inventory
<EnhancedDataTable tableId="products" data={products} grouping="auto" />

// 4. Custom Grouping
<EnhancedDataTable 
  tableId="employees" 
  data={employees}
  showGroupingDropdown={true}
  groupingOptions={["department", "status"]}
  defaultGroupBy="department"
/>
```

## ⚠️ Common Mistakes to Avoid

❌ Missing `id` field in data  
❌ Wrong import: `import EnhancedDataTable from...`  
❌ Using non-existent field names in `groupingOptions`  

✅ Correct import: `import { EnhancedDataTable } from...`  
✅ Ensure each data object has unique `id`  
✅ Use field names that actually exist in your data  

## 🚀 Auto-Features (Zero Config Needed)

- ✅ **Columns**: Auto-created from data structure
- ✅ **Filters**: Smart filters based on data types
- ✅ **Search**: Auto-detects searchable fields
- ✅ **Grouping**: Auto-calculates summaries
- ✅ **Formatting**: Auto-formats dates, currency, status
- ✅ **Sizing**: Intelligent column widths

---

**Perfect for:** Lovable, GitHub Copilot, Claude, ChatGPT, Cursor, and other AI development tools.
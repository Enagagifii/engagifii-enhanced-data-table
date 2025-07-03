# Migration Guide - Enhanced Data Table API Updates

## Overview
This guide helps you migrate from the old API to the new AI-friendly API.

## Key Changes

### 1. Grouping API
The grouping API has been redesigned to be more intuitive for AI tools.

#### ❌ Old API (Still works but not recommended)
```jsx
const [groupBy, setGroupBy] = useState(null);

<EnhancedDataTable 
  enableGrouping={true}
  groupBy={groupBy}
  onGroupByChange={setGroupBy}
/>
```

#### ✅ New API (Recommended)
```jsx
<EnhancedDataTable 
  showGroupingDropdown={true}
  groupingDropdownPosition="next-to-filters"
  groupingOptions={["status", "department"]}
  defaultGroupBy="status"
/>
```

### 2. Auto Configuration
Use `grouping="auto"` for smart auto-configuration:

```jsx
<EnhancedDataTable 
  tableId="my-table"
  data={data}
  grouping="auto"  // Enables all smart features
/>
```

### 3. Import Statement
Always use named imports:

```jsx
// ✅ Correct
import { EnhancedDataTable } from '@engagifii/enhanced-data-table';

// ❌ Wrong
import EnhancedDataTable from '@engagifii/enhanced-data-table';
```

## Quick Migration Checklist

1. **Replace grouping props**:
   - `enableGrouping={true}` → `showGroupingDropdown={true}`
   - `groupBy={state}` → `defaultGroupBy="fieldname"`
   - `onGroupByChange={handler}` → Remove (handled internally)

2. **Add auto-configuration**:
   - Add `grouping="auto"` for smart features

3. **Simplify props**:
   - Remove unnecessary state management
   - Let the component handle complexity

## Example Migration

### Before:
```jsx
const [groupBy, setGroupBy] = useState(null);
const [selectedRows, setSelectedRows] = useState([]);

<EnhancedDataTable 
  tableId="notices"
  data={noticesData}
  columns={columns}
  searchableFields={['title', 'description']}
  enableGrouping={true}
  groupBy={groupBy}
  onGroupByChange={setGroupBy}
  enableSelection={true}
  selectedRows={selectedRows}
  onSelectionChange={setSelectedRows}
/>
```

### After:
```jsx
<EnhancedDataTable 
  tableId="notices"
  data={noticesData}
  grouping="auto"
  showGroupingDropdown={true}
  groupingOptions={["status", "category", "priority"]}
  defaultGroupBy="status"
  enableSelection={true}
/>
```

## Benefits of New API

1. **Less code** - No state management needed
2. **AI-friendly** - Intuitive prop names
3. **Auto-configuration** - Smart defaults
4. **Better UX** - Grouping dropdown is more visible

## Need Help?

Refer to:
- `AI-FIRST-README.md` - For AI tools
- `README.md` - For detailed documentation
- Demo files in `demo/` folder
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a React component library (@engagifii/enhanced-data-table) that provides a comprehensive, enterprise-grade data table component with advanced features. The library is built with TypeScript, React 18+, and Tailwind CSS, and is published as a private package to GitHub Packages.

## Common Development Commands

```bash
# Install dependencies
npm install

# Build the library (creates dist/ folder)
npm run build

# Development mode with watch
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Run demo server (requires Python)
npm run demo              # Starts server on port 3001
npm run demo:browse       # Opens browser to demo
```

## Architecture and Key Concepts

### Component Structure
The library exports a main `EnhancedDataTable` component that auto-generates most configuration from data:
- **Auto-detection**: Columns, filters, search fields, and grouping options are auto-generated from data structure
- **Zero-config mode**: Works with just `tableId` and `data` props
- **AI-friendly API**: Designed with intuitive prop names for AI tools like Lovable

### Key Features
1. **Grouping System**: Advanced data grouping with auto-summaries via `useTableGrouping` hook
2. **Column Management**: Drag-and-drop reordering, show/hide, frozen columns
3. **Filtering**: Smart filters based on data types (text, number, date, select)
4. **Bulk Actions**: Configurable actions for selected rows
5. **Custom Rendering**: Support for custom cell components

### Build System
- **tsup**: Builds both CommonJS and ES modules, plus IIFE for browser usage
- **Dual format**: NPM package + standalone browser script
- **Dist included**: The `dist/` folder is committed for GitHub installation compatibility

## Important Development Notes

### Publishing Workflow
1. Make changes and test locally
2. Build with `npm run build`
3. Commit changes (including `dist/` folder)
4. Push to GitHub - the package is automatically available via GitHub Packages

### Demo System
- Static HTML demos in `demo/` folder use IIFE builds
- Demos load the component from `../dist/index.iife.js`
- Python HTTP server required for local demo viewing

### Type Safety
- All data must have an `id` field of type string
- TypeScript strict mode is enabled
- ESLint configured with TypeScript and React rules

### Testing
**Note**: No test framework is currently configured. When implementing tests:
1. Consider adding Vitest or Jest
2. Focus on testing the `useTableGrouping` hook and data transformations
3. Test auto-generation logic for columns and filters

### Component Dependencies
- Uses Radix UI primitives for accessibility
- Tailwind CSS for styling (custom config included)
- @hello-pangea/dnd for drag-and-drop functionality

## API Design Philosophy

The component is designed to be AI-friendly with:
1. **Intuitive prop names**: `showGroupingDropdown`, `enableFullScreen`
2. **Auto-generation**: Most configuration is derived from data
3. **Flexible grouping**: String-based config (`grouping="auto"`) or detailed objects
4. **Progressive enhancement**: Simple usage scales to complex configurations

## Common Patterns

```typescript
// Simple usage - everything auto-configured
<EnhancedDataTable tableId="users" data={userData} grouping="auto" />

// With grouping controls
<EnhancedDataTable 
  tableId="orders"
  data={orderData}
  showGroupingDropdown={true}
  groupingDropdownPosition="next-to-filters"
  groupingOptions={["status", "customer", "date"]}
/>

// Full configuration
<EnhancedDataTable
  tableId="advanced"
  data={data}
  columns={customColumns}
  filters={customFilters}
  bulkActions={customActions}
  enableSelection={true}
  enableColumnConfiguration={true}
/>
```

## File Structure
- `src/components/ui/`: All UI components
- `src/hooks/`: Custom React hooks (notably `useTableGrouping`)
- `src/lib/`: Utility functions
- `src/index.ts`: Main exports file
- `demo/`: HTML demo files
- `dist/`: Built files (committed to repo)
# Enhanced Data Table Demo Guide

This package includes a comprehensive demo that showcases all the advanced features of the Enhanced Data Table component.

## Running the Demo

### Option 1: Quick Start
```bash
npm run demo
```
Then visit http://localhost:3001 in your browser.

### Option 2: Auto-open Browser (macOS/Linux)
```bash
npm run demo:browse
```
This will start the server and automatically open your default browser.

## Demo Features

### 1. Main Demo Hub (`http://localhost:3001`)
- **Feature Overview**: Complete list of all capabilities
- **Installation Guide**: Copy-paste installation commands
- **Quick Start Examples**: Ready-to-use code snippets
- **Navigation**: Links to interactive demo and documentation

### 2. Interactive Demo (`http://localhost:3001/demo-app.html`)
The interactive demo includes:

#### Data Features
- **200+ Transaction Records**: Realistic financial transaction data
- **Multiple Data Types**: Invoices, payments, credit notes, refunds
- **Rich Cell Content**: Custom rendering for amounts, dates, statuses
- **Tab-based Filtering**: Filter by transaction type

#### Table Features
- **Frozen Columns**: First 2 columns remain visible while scrolling
- **Sticky Header**: Header stays at top during vertical scrolling
- **Column Sorting**: Click any header to sort ascending/descending
- **Global Search**: Search across all data fields
- **Row Selection**: Select individual rows or use bulk selection
- **Pagination**: Navigate through pages with configurable page sizes

#### Interactive Elements
- **Bulk Actions**: Export or delete selected rows
- **Tab Navigation**: Switch between filtered views
- **Responsive Design**: Test on different screen sizes
- **Performance**: Smooth scrolling with large datasets

## Testing Workflow

1. **Start with Feature Overview**: Visit the main demo page to understand capabilities
2. **Explore Interactive Demo**: Click "Launch Interactive Demo" to see features in action
3. **Test Core Features**:
   - Scroll horizontally to see frozen columns
   - Click column headers to sort data
   - Use search to filter results
   - Select rows and try bulk actions
   - Navigate between pages
   - Switch tabs to filter by type

4. **Test Responsive Design**: Resize browser window or test on mobile
5. **Review Code Examples**: Go back to main demo for implementation examples

## Integration Testing

Use this demo to:
- **Verify Features**: Ensure all needed features work correctly
- **Test Performance**: See how the table handles 200+ records
- **UI/UX Validation**: Confirm the design meets your requirements
- **Copy Implementation**: Use demo code as starting point for integration

## Demo Data Structure

The demo uses transaction data with fields:
- `id`: Unique transaction identifier
- `type`: Transaction type (invoice, payment, credit_note, refund)
- `amount`: Financial amount with currency formatting
- `status`: Transaction status with colored badges
- `date`: Formatted date display
- `customer`: Customer name
- `organization`: Organization name
- `referenceNumber`: Reference number

This structure demonstrates:
- Custom cell rendering
- Badge components for status
- Currency formatting
- Date formatting
- Complex data relationships

## Browser Compatibility

The demo works in:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Demo Won't Start
```bash
# Ensure you're in the package directory
cd engagifii-enhanced-data-table

# Check if Python is available
python --version || python3 --version

# Alternative: Use Node.js server
npx http-server demo -p 3001
```

### Browser Issues
- Clear browser cache if styles don't load
- Disable browser extensions if JavaScript errors occur
- Use browser developer tools to check console for errors

### Performance Issues
- The demo intentionally uses 200+ records to test performance
- On slower devices, reduce the dataset size in demo-app.html
- Check browser developer tools for performance bottlenecks

## Next Steps

After exploring the demo:
1. Read the full README.md for implementation details
2. Check the API documentation for all available props
3. Look at the source code in `/src` for customization options
4. Follow the installation guide to integrate into your project

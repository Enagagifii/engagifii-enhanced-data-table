import React from 'react';

interface AdvancedDataTableDemoProps {
  data: any[];
}

const AdvancedDataTableDemo: React.FC<AdvancedDataTableDemoProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Feature Overview */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">📊 Core Features</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>✅ Advanced Search & Filtering</li>
            <li>✅ Multi-column Sorting</li>
            <li>✅ Row Selection (Single/Multiple)</li>
            <li>✅ Pagination with Custom Page Sizes</li>
            <li>✅ Data Export (CSV, Excel)</li>
            <li>✅ Column Visibility Toggle</li>
          </ul>
        </div>

        {/* Advanced Features */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">🚀 Advanced Features</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>✅ Column Freezing/Pinning</li>
            <li>✅ Header Row Freezing</li>
            <li>✅ Row Freezing</li>
            <li>✅ Column Resizing</li>
            <li>✅ Data Grouping</li>
            <li>✅ Group Expand/Collapse</li>
          </ul>
        </div>

        {/* UI Features */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-2">🎨 UI Features</h3>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>✅ Full-screen Mode</li>
            <li>✅ Dynamic Height</li>
            <li>✅ Responsive Design</li>
            <li>✅ Custom Toolbar</li>
            <li>✅ Bulk Actions</li>
            <li>✅ Row Actions Menu</li>
          </ul>
        </div>

      </div>

      {/* Feature Demonstrations */}
      <div className="space-y-4">
        
        {/* Column Configuration Demo */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-3">Column Configuration Options</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="p-2 bg-gray-50 rounded">
              <strong>Sortable:</strong> Enable/disable sorting per column
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <strong>Resizable:</strong> Drag to resize column widths
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <strong>Frozen:</strong> Pin columns to left/right
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <strong>Groupable:</strong> Allow grouping by column
            </div>
          </div>
        </div>

        {/* Data Types Demo */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-3">Supported Data Types & Formatting</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Numeric Data</h4>
              <ul className="text-xs space-y-1">
                <li>• Currency formatting ($85,000)</li>
                <li>• Percentage values (95.5%)</li>
                <li>• Number formatting (1,234.56)</li>
                <li>• Custom numeric renderers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Date & Time</h4>
              <ul className="text-xs space-y-1">
                <li>• Date formatting (MM/DD/YYYY)</li>
                <li>• Relative dates (2 days ago)</li>
                <li>• Date range filtering</li>
                <li>• Custom date renderers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Status & Tags</h4>
              <ul className="text-xs space-y-1">
                <li>• Colored status badges</li>
                <li>• Multi-select filters</li>
                <li>• Custom tag renderers</li>
                <li>• Status-based styling</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Grouping Demo */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-3">Data Grouping Capabilities</h3>
          <div className="space-y-2">
            <p className="text-sm">Group by any column (Department, Status, etc.)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Group by Department:</strong>
                <div className="ml-4 mt-1 space-y-1">
                  <div>📁 Engineering (3 employees)</div>
                  <div>📁 Marketing (1 employee)</div>
                  <div>📁 HR (1 employee)</div>
                  <div>📁 Finance (1 employee)</div>
                  <div>📁 Sales (1 employee)</div>
                  <div>📁 Design (1 employee)</div>
                </div>
              </div>
              <div>
                <strong>Group by Status:</strong>
                <div className="ml-4 mt-1 space-y-1">
                  <div>📁 Active (6 employees)</div>
                  <div>📁 Pending (1 employee)</div>
                  <div>📁 Inactive (1 employee)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination & Performance */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-3">Pagination & Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Pagination Options:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Configurable page sizes (5, 10, 20, 50, 100)</li>
                <li>• Quick page navigation</li>
                <li>• Total records display</li>
                <li>• Go-to-page functionality</li>
              </ul>
            </div>
            <div>
              <strong>Performance Features:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Virtual scrolling for large datasets</li>
                <li>• Dynamic height adjustment</li>
                <li>• Optimized re-rendering</li>
                <li>• Memory-efficient grouping</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Export & Actions */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-3">Export & Action Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Export Options:</strong>
              <ul className="mt-1 space-y-1">
                <li>• CSV export with custom formatting</li>
                <li>• Excel export with styling</li>
                <li>• PDF export (via custom renderer)</li>
                <li>• Export filtered/selected data only</li>
              </ul>
            </div>
            <div>
              <strong>Actions:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Bulk actions on selected rows</li>
                <li>• Individual row action menus</li>
                <li>• Custom action buttons</li>
                <li>• Keyboard shortcuts</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* Sample Data Display */}
      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold mb-3">Sample Data Structure ({data.length} records)</h3>
        <div className="text-sm bg-gray-50 p-3 rounded overflow-x-auto">
          <pre>{JSON.stringify(data[0], null, 2)}</pre>
        </div>
      </div>

    </div>
  );
};

export default AdvancedDataTableDemo;

import React from 'react';

const SimpleDataTable = ({ data, columns }: { 
  data: any[], 
  columns: { key: string; label: string }[] 
}) => {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Simple Data Table (Package Test)</h3>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="border p-2 bg-gray-100 text-left">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col.key} className="border p-2">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-sm text-gray-600">
        ✅ Package successfully imported and rendered! 
        ({data.length} rows, {columns.length} columns)
      </p>
    </div>
  );
};

export default SimpleDataTable;

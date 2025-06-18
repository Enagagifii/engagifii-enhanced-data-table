import { useState, useMemo } from 'react';

export interface GroupedRecord {
  id: string;
  isGroupHeader: boolean;
  groupKey?: string;
  groupName?: string;
  isExpanded?: boolean;
  groupSummary?: any;
  originalRecord?: any;
}

export interface GroupSummary {
  recordCount: number;
  [key: string]: any; // Allow additional computed properties
}

// Default auto-summary calculator that works with any data structure
const createAutoSummaryCalculator = <T extends Record<string, any>>(records: T[]): GroupSummary => {
  const summary: GroupSummary = {
    recordCount: records.length
  };

  if (records.length === 0) return summary;

  // Automatically detect and calculate numeric aggregations
  const firstRecord = records[0];
  Object.keys(firstRecord).forEach(key => {
    const values = records.map(r => r[key]).filter(v => v != null);
    
    if (values.length === 0) return;
    
    // Handle numeric fields
    if (typeof firstRecord[key] === 'number') {
      const numbers = values.filter(v => typeof v === 'number') as number[];
      if (numbers.length > 0) {
        summary[`total_${key}`] = numbers.reduce((sum, val) => sum + val, 0);
        summary[`avg_${key}`] = Math.round(summary[`total_${key}`] / numbers.length * 100) / 100;
        summary[`min_${key}`] = Math.min(...numbers);
        summary[`max_${key}`] = Math.max(...numbers);
      }
    }
    
    // Handle status/string fields - count occurrences
    if (typeof firstRecord[key] === 'string') {
      const statusCounts = values.reduce((acc, val) => {
        const strVal = String(val);
        acc[strVal] = (acc[strVal] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      // Add individual status counts with safe property names
      Object.entries(statusCounts).forEach(([status, count]) => {
        const safeKey = `count_${key}_${status.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
        summary[safeKey] = count;
      });
      
      // Add most common value
      const mostCommon = Object.entries(statusCounts).reduce((a, b) => (a[1] as number) > (b[1] as number) ? a : b);
      summary[`most_common_${key}`] = mostCommon[0];
    }
    
    // Handle boolean fields
    if (typeof firstRecord[key] === 'boolean') {
      const boolValues = values.filter(v => typeof v === 'boolean') as boolean[];
      summary[`count_${key}_true`] = boolValues.filter(v => v).length;
      summary[`count_${key}_false`] = boolValues.filter(v => !v).length;
    }
  });

  return summary;
};

export const useTableGrouping = <T extends Record<string, any>>(
  data: T[],
  groupBy: string | null,
  summaryCalculator?: (records: T[]) => any
) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupKey)) {
        newSet.delete(groupKey);
      } else {
        newSet.add(groupKey);
      }
      return newSet;
    });
  };

  const collapseAllGroups = () => {
    setExpandedGroups(new Set());
  };

  const expandAllGroups = () => {
    if (!groupBy) return;
    const allGroups = new Set(data.map(record => String(record[groupBy])));
    setExpandedGroups(allGroups);
  };

  const groupedData = useMemo(() => {
    if (!groupBy) return data;

    const groups = data.reduce((acc, record) => {
      const groupKey = String(record[groupBy]);
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(record);
      return acc;
    }, {} as Record<string, T[]>);

    const result: (T & GroupedRecord)[] = [];

    Object.entries(groups).forEach(([groupKey, records]) => {
      // Use custom calculator if provided, otherwise use auto-calculator
      const groupSummary = summaryCalculator ? summaryCalculator(records) : createAutoSummaryCalculator(records);
      
      // Add group header
      result.push({
        ...records[0],
        id: `group-header-${groupKey}`,
        isGroupHeader: true,
        groupKey,
        groupName: groupKey,
        isExpanded: expandedGroups.has(groupKey),
        groupSummary,
        originalRecord: null
      } as T & GroupedRecord);

      // Add group records immediately after group header if expanded
      if (expandedGroups.has(groupKey)) {
        console.log(`[DEBUG] Adding ${records.length} child records for expanded group: ${groupKey}`);
        records.forEach((record, index) => {
          result.push({
            ...record,
            id: `${record.id}-child-${index}`, // Ensure unique IDs for child rows
            isGroupHeader: false,
            groupKey,
            originalRecord: record
          } as T & GroupedRecord);
        });
      } else {
        console.log(`[DEBUG] Group ${groupKey} is collapsed, not adding child records`);
      }
    });

    console.log(`[DEBUG] Final grouped data length: ${result.length}`);
    return result;
  }, [data, groupBy, expandedGroups, summaryCalculator]);

  return {
    groupedData,
    expandedGroups,
    toggleGroup,
    collapseAllGroups,
    expandAllGroups,
    groupCount: groupBy ? new Set(data.map(record => String(record[groupBy]))).size : 0
  };
};

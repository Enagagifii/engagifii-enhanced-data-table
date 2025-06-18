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
  totalExpected: number;
  totalActual: number;
  totalVacancy: number;
  fillRate: string;
  status: string;
  recordCount: number;
}

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
      const groupSummary = summaryCalculator ? summaryCalculator(records) : null;
      
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

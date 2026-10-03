import React from 'react';
import type { Column } from '@/types/common';
import { EmptyState } from '@/components/common/EmptyState';
import { Loader } from '@/components/common/Loader';

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  emptyTitle?: string;
  rowKey: keyof T;
  actions?: (row: T) => React.ReactNode;
  onRowClick?: (row: T) => void;
  stickyHeader?: boolean;
}

export function DataTable<T>({
  columns,
  data,
  loading = false,
  emptyMessage,
  emptyTitle,
  rowKey,
  actions,
  onRowClick,
  stickyHeader = false,
}: DataTableProps<T>) {
  if (loading) {
    return <Loader />;
  }

  if (data.length === 0) {
    return <EmptyState title={emptyTitle} message={emptyMessage} />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">
        <thead className={stickyHeader ? 'sticky top-0 z-10' : ''}>
          <tr className="bg-primary text-white">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`
                  px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap
                  ${col.className || ''}
                `}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.label}
              </th>
            ))}
            {actions && (
              <th className="px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap w-[100px]">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((row, rowIdx) => (
            <tr
              key={String(row[rowKey])}
              onClick={() => onRowClick?.(row)}
              className={`
                table-row-hover
                ${rowIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}
                ${onRowClick ? 'cursor-pointer hover:bg-blue-50/60' : 'hover:bg-slate-50'}
              `}
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className={`px-4 py-3 text-text-primary ${col.className || ''}`}
                  style={{ minHeight: '48px' }}
                >
                  {col.render
                    ? col.render(
                        typeof col.key === 'string' && col.key in (row as Record<string, unknown>)
                          ? (row as Record<string, unknown>)[col.key as string]
                          : undefined,
                        row
                      )
                    : String(
                        typeof col.key === 'string' && col.key in (row as Record<string, unknown>)
                          ? (row as Record<string, unknown>)[col.key as string] ?? ''
                          : ''
                      )}
                </td>
              ))}
              {actions && (
                <td className="px-4 py-3 text-center">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

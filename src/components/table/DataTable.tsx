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
  /** Fixed width of the actions column (px). Keep it compact. */
  actionsWidth?: number;
  onRowClick?: (row: T) => void;
  stickyHeader?: boolean;
}

const DEFAULT_MIN_COL = 120;

const alignClass = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

function getValue<T>(row: T, key: Column<T>['key']): unknown {
  if (typeof key === 'string' && key in (row as Record<string, unknown>)) {
    return (row as Record<string, unknown>)[key];
  }
  return undefined;
}

export function DataTable<T>({
  columns,
  data,
  loading = false,
  emptyMessage,
  emptyTitle,
  rowKey,
  actions,
  actionsWidth = 110,
  onRowClick,
  stickyHeader = false,
}: DataTableProps<T>) {
  if (loading) {
    return <Loader />;
  }

  if (data.length === 0) {
    return <EmptyState title={emptyTitle} message={emptyMessage} />;
  }

  // Below this width the table scrolls horizontally instead of squashing columns.
  const colMin = (c: Column<T>) =>
    c.minWidth ?? (c.width?.endsWith('px') ? parseFloat(c.width) : DEFAULT_MIN_COL);
  const minTableWidth = columns.reduce((sum, c) => sum + colMin(c), 0) + (actions ? actionsWidth : 0);

  const thBase =
    'px-[var(--cell-px)] text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap overflow-hidden text-ellipsis';

  return (
    <div className="overflow-x-auto">
      <table
        className="w-full table-fixed border-collapse text-[13px]"
        style={{ minWidth: minTableWidth }}
      >
        <colgroup>
          {columns.map((col) => (
            <col key={String(col.key)} style={col.width ? { width: col.width } : undefined} />
          ))}
          {actions && <col style={{ width: actionsWidth }} />}
        </colgroup>

        <thead className={stickyHeader ? 'sticky top-0 z-10' : ''}>
          <tr className="bg-primary text-white h-[var(--thead-h)]">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`${thBase} ${alignClass[col.align ?? 'left']} ${col.className || ''}`}
              >
                {col.label}
              </th>
            ))}
            {actions && <th className={`${thBase} text-center`}>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr
              key={String(row[rowKey])}
              onClick={() => onRowClick?.(row)}
              className={`h-[var(--row-h)] bg-white border-b border-border table-row-hover hover:bg-row-hover ${
                onRowClick ? 'cursor-pointer' : ''
              }`}
            >
              {columns.map((col) => {
                const value = getValue(row, col.key);
                const content = col.render ? col.render(value, row) : String(value ?? '');
                const truncate = col.truncate !== false;
                return (
                  <td
                    key={String(col.key)}
                    title={truncate && typeof content === 'string' ? content : undefined}
                    className={`px-[var(--cell-px)] align-middle text-text-primary ${alignClass[col.align ?? 'left']} ${
                      truncate ? 'whitespace-nowrap overflow-hidden text-ellipsis' : ''
                    } ${col.className || ''}`}
                  >
                    {content}
                  </td>
                );
              })}
              {actions && (
                <td className="px-[var(--cell-px)] align-middle text-center">{actions(row)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

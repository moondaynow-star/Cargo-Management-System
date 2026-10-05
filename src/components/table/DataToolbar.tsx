import React from 'react';
import { Plus, Upload, Download } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { SearchInput } from '@/components/common/SearchInput';
import { DateFilter } from '@/components/common/DateFilter';
import { SelectFilter } from '@/components/common/SelectFilter';
import type { SelectOption } from '@/types/common';

export interface ToolbarFilter {
  key: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  /** "No filter" label, e.g. "All Branches". */
  allLabel: string;
}

interface DataToolbarProps {
  /** Record count + noun, rendered as "20 users found". */
  count: number;
  countLabel: string;
  search?: {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
  };
  dateRange?: {
    from: string;
    to: string;
    onChange: (from: string, to: string) => void;
  };
  filters?: ToolbarFilter[];
  actions?: {
    /** Show the Import button (UI-only until a handler is supplied). */
    showImport?: boolean;
    onImport?: () => void;
    /** Show the Export button (UI-only until a handler is supplied). */
    showExport?: boolean;
    onExport?: () => void;
    add?: { label: string; onClick: () => void };
  };
}

/**
 * Standard toolbar for every Master page:
 *   count · search · from/to date · filters · Import · Export · + Add
 */
export const DataToolbar: React.FC<DataToolbarProps> = ({
  count,
  countLabel,
  search,
  dateRange,
  filters,
  actions,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-x-[var(--toolbar-gap)] gap-y-3 px-[var(--toolbar-px)] py-[var(--toolbar-py)] border-b border-border">
      <p className="text-[13px] text-text-muted whitespace-nowrap mr-auto">
        <span className="font-semibold text-text-primary">{count}</span> {countLabel} found
      </p>

      <div className="flex flex-wrap items-center gap-[var(--toolbar-gap)] w-full lg:w-auto">
        {search && (
          <SearchInput
            value={search.value}
            onChange={search.onChange}
            placeholder={search.placeholder}
          />
        )}

        {dateRange && (
          <>
            <DateFilter
              value={dateRange.from}
              onChange={(v) => dateRange.onChange(v, dateRange.to)}
              placeholder="From Date"
              max={dateRange.to || undefined}
            />
            <DateFilter
              value={dateRange.to}
              onChange={(v) => dateRange.onChange(dateRange.from, v)}
              placeholder="To Date"
              min={dateRange.from || undefined}
            />
          </>
        )}

        {filters?.map((f) => (
          <SelectFilter
            key={f.key}
            value={f.value}
            onChange={f.onChange}
            options={f.options}
            allLabel={f.allLabel}
          />
        ))}

        {(actions?.showImport || actions?.onImport) && (
          <Button variant="secondary" icon={<Upload size={14} />} onClick={actions?.onImport}>
            Import
          </Button>
        )}
        {(actions?.showExport || actions?.onExport) && (
          <Button variant="secondary" icon={<Download size={14} />} onClick={actions?.onExport}>
            Export
          </Button>
        )}
        {actions?.add && (
          <Button icon={<Plus size={14} />} onClick={actions.add.onClick}>
            {actions.add.label}
          </Button>
        )}
      </div>
    </div>
  );
};

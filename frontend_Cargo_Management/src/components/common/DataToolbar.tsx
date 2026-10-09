import React from 'react';
import { Search, Upload, Download, Plus } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';
import { Select } from './Select';
import type { SelectOption } from '@/types/common';

export interface FilterConfig {
  key: string;
  type: 'select' | 'date';
  placeholder?: string;
  options?: SelectOption[];
  value: string;
  onChange: (val: string) => void;
}

interface DataToolbarProps {
  totalCount: number;
  entityName: string;
  
  // Search
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (val: string) => void;
  
  // Custom Filters
  filters?: FilterConfig[];
  
  // Actions
  onImport?: () => void;
  onExport?: () => void;
  onAdd?: () => void;
  addLabel?: string;
}

export const DataToolbar: React.FC<DataToolbarProps> = ({
  totalCount,
  entityName,
  searchPlaceholder = 'Search...',
  searchValue,
  onSearchChange,
  filters = [],
  onImport,
  onExport,
  onAdd,
  addLabel = 'Add',
}) => {
  return (
    <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 px-6 py-4 border-b border-border bg-white">
      {/* Record Count */}
      <div className="flex-shrink-0">
        <p className="text-[13px] text-text-primary font-medium">
          {totalCount} {entityName} found
        </p>
      </div>

      {/* Controls Container */}
      <div className="flex flex-wrap items-center gap-2.5 w-full xl:w-auto xl:justify-end">
        {/* Search */}
        <div className="w-full sm:w-[220px]">
          <Input
            placeholder={searchPlaceholder}
            icon={<Search size={14} className="text-text-muted" />}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="!h-[34px] !text-[12px] !rounded bg-white border-border"
          />
        </div>

        {/* Dynamic Filters */}
        {filters.map((filter) => {
          if (filter.type === 'date') {
            return (
              <div key={filter.key} className="w-full sm:w-[130px]">
                <Input
                  type="date"
                  placeholder={filter.placeholder}
                  value={filter.value}
                  onChange={(e) => filter.onChange(e.target.value)}
                  className="!h-[34px] !text-[12px] !rounded bg-white border-border text-text-secondary"
                  title={filter.placeholder}
                />
              </div>
            );
          }
          if (filter.type === 'select') {
            return (
              <div key={filter.key} className="w-full sm:w-[140px]">
                <Select
                  options={filter.options || []}
                  value={filter.value}
                  onChange={(e) => filter.onChange(e.target.value)}
                  placeholder={filter.placeholder}
                  className="!h-[34px] !py-0 !text-[12px] !rounded bg-white border-border font-medium text-text-secondary"
                />
              </div>
            );
          }
          return null;
        })}

        {/* Buttons */}
        <div className="flex items-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto justify-end">
          {onImport && (
            <Button
              variant="secondary"
              onClick={onImport}
              className="!h-[34px] !px-3 !text-[12px] !rounded border-border font-medium text-text-secondary"
            >
              Import
            </Button>
          )}
          {onExport && (
            <Button
              variant="secondary"
              onClick={onExport}
              className="!h-[34px] !px-3 !text-[12px] !rounded border-border font-medium text-text-secondary"
            >
              Export
            </Button>
          )}
          {onAdd && (
            <Button
              variant="primary"
              onClick={onAdd}
              icon={<Plus size={14} />}
              className="!h-[34px] !px-4 !text-[12px] !rounded font-medium shadow-sm"
            >
              {addLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

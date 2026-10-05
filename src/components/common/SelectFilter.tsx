import React from 'react';
import { Select } from './Select';
import type { SelectOption } from '@/types/common';

interface SelectFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  /** Label of the "no filter" option, e.g. "All Branches". */
  allLabel: string;
  widthClass?: string;
}

export const SelectFilter: React.FC<SelectFilterProps> = ({
  value,
  onChange,
  options,
  allLabel,
  widthClass = 'sm:w-[150px]',
}) => (
  <div className={`w-full flex-none ${widthClass}`}>
    <Select
      aria-label={allLabel}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={options}
      placeholder={allLabel}
    />
  </div>
);

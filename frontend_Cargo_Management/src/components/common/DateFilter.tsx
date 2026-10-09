import React from 'react';
import { Calendar } from 'lucide-react';

interface DateFilterProps {
  /** ISO date string (YYYY-MM-DD) or empty string. */
  value: string;
  onChange: (value: string) => void;
  /** Shown while empty, e.g. "From Date". */
  placeholder: string;
  min?: string;
  max?: string;
}

/**
 * Native date input with a custom placeholder + calendar icon so it matches
 * the other toolbar controls. The whole field opens the picker.
 */
export const DateFilter: React.FC<DateFilterProps> = ({
  value,
  onChange,
  placeholder,
  min,
  max,
}) => {
  const openPicker = (e: React.MouseEvent<HTMLInputElement>) => {
    try {
      e.currentTarget.showPicker?.();
    } catch {
      /* picker already open / not supported — native behaviour takes over */
    }
  };

  return (
    <div className="relative w-full sm:w-[150px] flex-none h-[var(--control-h)]">
      <input
        type="date"
        aria-label={placeholder}
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value)}
        onClick={openPicker}
        className={`date-filter-input absolute inset-0 w-full h-full rounded-control border border-border bg-white pl-3 pr-9 text-[length:var(--control-fs)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
          value ? 'text-text-primary' : 'text-transparent'
        }`}
      />
      {!value && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[length:var(--control-fs)] text-text-muted pointer-events-none">
          {placeholder}
        </span>
      )}
      <Calendar
        size={15}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
      />
    </div>
  );
};

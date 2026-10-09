import React from 'react';
import { Search } from 'lucide-react';
import { Input } from './Input';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Desktop width; full width below the `sm` breakpoint. */
  widthClass?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  widthClass = 'sm:w-[280px]',
}) => (
  <div className={`w-full flex-none ${widthClass}`}>
    <Input
      type="text"
      aria-label={placeholder}
      placeholder={placeholder}
      icon={<Search size={15} />}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

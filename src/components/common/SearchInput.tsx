import React from 'react';
import { Search, X } from 'lucide-react';

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  inputSize?: 'md' | 'lg';
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search records, students, drives...',
  inputSize = 'md',
  className = '',
  ...props
}) => {
  const heightClass = inputSize === 'lg' ? 'h-12 text-base' : 'h-10 text-sm';

  const handleClear = () => {
    onChange('');
    if (onClear) onClear();
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737686]">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`block w-full rounded-lg border border-[#e2e8f0] bg-white text-[#0b1c30] placeholder-[#64748b] pl-9 pr-9 transition-all duration-150 focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 focus:outline-none ${heightClass}`}
        {...props}
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#737686] hover:text-[#0b1c30]"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

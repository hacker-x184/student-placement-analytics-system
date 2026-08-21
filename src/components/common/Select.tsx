import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  selectSize?: 'md' | 'lg';
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      error,
      helperText,
      selectSize = 'md',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    const heightClass = selectSize === 'lg' ? 'h-12 text-base' : 'h-10 text-sm';

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-semibold text-[#0b1c30] mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={`block w-full appearance-none rounded-lg border bg-white text-[#0b1c30] pl-3 pr-9 transition-all duration-150 cursor-pointer ${heightClass} ${
              error
                ? 'border-[#ba1a1a] focus:border-[#ba1a1a] focus:ring-4 focus:ring-[#ba1a1a]/10 focus:outline-none'
                : 'border-[#e2e8f0] focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 focus:outline-none'
            } ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#737686]">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error ? (
          <p className="mt-1 text-xs text-[#ba1a1a] font-medium">{error}</p>
        ) : helperText ? (
          <p className="mt-1 text-xs text-[#434655]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';

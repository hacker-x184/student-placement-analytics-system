import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputSize?: 'md' | 'lg';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      inputSize = 'md',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    const heightClass = inputSize === 'lg' ? 'h-10 text-[14px]' : 'h-9 text-[13px]';

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-[13px] font-medium text-[#1D2226] mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#7A828A]">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`block w-full rounded-[6px] border bg-white text-[#1D2226] placeholder-[#7A828A] transition-all duration-150 ${heightClass} ${
              leftIcon ? 'pl-9' : 'pl-3'
            } ${rightIcon ? 'pr-9' : 'pr-3'} ${
              error
                ? 'border-[#CC1016] focus:border-[#CC1016] focus:ring-2 focus:ring-[#CC1016]/15 focus:outline-none'
                : 'border-[#D9DEE3] focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/15 focus:outline-none'
            } ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7A828A]">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="mt-1 text-[12px] text-[#CC1016] font-medium">{error}</p>
        ) : helperText ? (
          <p className="mt-1 text-[12px] text-[#5E6670]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';


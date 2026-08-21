import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const isButtonLoading = isLoading || loading;

  // Base styling adhering to CareerLens (6px rounded, compact, 14px/20px/600 font, fast transitions)
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-[6px] transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/20 focus:border-[#0A66C2] disabled:opacity-50 disabled:cursor-not-allowed select-none whitespace-nowrap cursor-pointer';

  const sizeClasses = {
    sm: 'h-8 px-3 text-[12px] leading-[18px] gap-1.5',
    md: 'h-9 px-4 text-[14px] leading-[20px] gap-2',
    lg: 'h-11 px-6 text-[15px] leading-[22px] gap-2.5 font-semibold',
  };

  const variantClasses = {
    primary:
      'bg-[#0A66C2] hover:bg-[#004182] active:bg-[#003366] text-white border border-transparent shadow-[0_1px_2px_rgba(0,0,0,0.05)]',
    secondary:
      'bg-white hover:bg-[#F3F6F8] text-[#1D2226] border border-[#D9DEE3] shadow-[0_1px_2px_rgba(0,0,0,0.02)]',
    outline:
      'bg-transparent hover:bg-[#E8F3FF] text-[#0A66C2] border border-[#0A66C2] hover:border-[#0A66C2]',
    ghost:
      'bg-transparent hover:bg-[#E8F3FF] text-[#5E6670] hover:text-[#1D2226]',
    danger:
      'bg-[#CC1016] hover:bg-[#A30D12] text-white border border-transparent shadow-[0_1px_2px_rgba(0,0,0,0.05)]',
    tertiary:
      'bg-[#F3F6F8] hover:bg-[#E8ECEF] text-[#1D2226] border border-[#D9DEE3]',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`}
      disabled={disabled || isButtonLoading}
      {...props}
    >
      {isButtonLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0 flex items-center">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isButtonLoading && rightIcon && <span className="shrink-0 flex items-center">{rightIcon}</span>}
    </button>
  );
};


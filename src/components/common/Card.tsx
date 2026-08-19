import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'flat' | 'interactive' | 'large';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  headerTitle?: string;
  headerSubtitle?: string;
  headerAction?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  headerTitle,
  headerSubtitle,
  headerAction,
  className = '',
  ...props
}) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3.5',
    md: 'p-5',
    lg: 'p-6',
  };

  const variantClasses = {
    default:
      'bg-white border border-[#D9DEE3] rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.03)]',
    large:
      'bg-white border border-[#D9DEE3] rounded-[10px] shadow-[0px_1px_2px_rgba(0,0,0,0.03)]',
    flat: 'bg-[#F8FAFB] border border-[#D9DEE3] rounded-[8px]',
    interactive:
      'bg-white border border-[#D9DEE3] rounded-[8px] hover:border-[#B2BAC2] hover:shadow-[0px_2px_6px_rgba(0,0,0,0.04)] transition-all duration-150 cursor-pointer',
  };

  const hasHeader = Boolean(headerTitle || headerAction);

  return (
    <div className={`${variantClasses[variant]} ${className}`} {...props}>
      {hasHeader && (
        <div className="px-5 py-3.5 border-b border-[#D9DEE3] flex items-center justify-between gap-3">
          <div>
            {headerTitle && (
              <h3 className="text-[16px] leading-[24px] font-semibold text-[#1D2226] tracking-tight">
                {headerTitle}
              </h3>
            )}
            {headerSubtitle && (
              <p className="text-[12px] leading-[18px] text-[#5E6670] mt-0.5">{headerSubtitle}</p>
            )}
          </div>
          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </div>
      )}
      <div className={paddingClasses[padding]}>{children}</div>
    </div>
  );
};


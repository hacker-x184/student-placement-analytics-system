import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'neutral' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
  pill?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  className = '',
  pill = false,
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-1.5 py-0.5 font-medium gap-1 leading-tight',
    md: 'text-[12px] px-2 py-0.5 font-medium gap-1.5 leading-normal',
    lg: 'text-[13px] px-2.5 py-1 font-medium gap-1.5 leading-normal',
  };

  // Status badges adhering to CareerLens master color tokens
  const variantClasses = {
    primary:
      'bg-[#E8F3FF] text-[#0A66C2] border border-[#B3D7FF]',
    secondary:
      'bg-[#F3F6F8] text-[#1D2226] border border-[#D9DEE3]',
    tertiary:
      'bg-[#FFF4DF] text-[#915907] border border-[#FED99B]',
    success:
      'bg-[#E7F5EE] text-[#057642] border border-[#A2DCBF]',
    warning:
      'bg-[#FFF4DF] text-[#915907] border border-[#FED99B]',
    danger:
      'bg-[#FDECEC] text-[#CC1016] border border-[#F6B5B7]',
    neutral:
      'bg-[#F3F6F8] text-[#5E6670] border border-[#D9DEE3]',
    outline:
      'bg-transparent text-[#5E6670] border border-[#D9DEE3]',
  };

  const radiusClass = pill ? 'rounded-full' : 'rounded-[4px]';

  return (
    <span
      className={`inline-flex items-center justify-center select-none whitespace-nowrap ${radiusClass} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {icon && <span className="shrink-0 flex items-center">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};


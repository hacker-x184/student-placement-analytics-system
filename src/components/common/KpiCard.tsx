import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export interface KpiCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  theme?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger';
  subtitle?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  onClick?: () => void;
  className?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  icon,
  theme = 'primary',
  subtitle,
  trend,
  onClick,
  className = '',
}) => {
  const iconThemeClasses = {
    primary: 'bg-[#E8F3FF] text-[#0A66C2] border border-[#B3D7FF]',
    secondary: 'bg-[#F3F6F8] text-[#1D2226] border-[#D9DEE3]',
    tertiary: 'bg-[#FFF4DF] text-[#915907] border-[#FED99B]',
    success: 'bg-[#E7F5EE] text-[#057642] border-[#A2DCBF]',
    warning: 'bg-[#FFF4DF] text-[#915907] border-[#FED99B]',
    danger: 'bg-[#FDECEC] text-[#CC1016] border-[#F6B5B7]',
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-[8px] border border-[#D9DEE3] p-4 sm:p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.03)] transition-all duration-150 ${
        onClick ? 'cursor-pointer hover:border-[#B2BAC2] hover:shadow-[0px_2px_6px_rgba(0,0,0,0.04)]' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <span className="text-[12px] font-semibold text-[#5E6670] uppercase tracking-wide">
          {label}
        </span>
        <div className={`p-1.5 rounded-[6px] shrink-0 ${iconThemeClasses[theme]}`}>
          {icon}
        </div>
      </div>

      <div>
        <div className="text-[24px] leading-[32px] font-bold text-[#1D2226] tracking-tight">
          {value}
        </div>

        {subtitle && (
          <p className="text-[12px] text-[#5E6670] mt-1 font-normal">{subtitle}</p>
        )}

        {trend && (
          <div className="flex items-center gap-1.5 mt-2 text-[12px] font-medium">
            <span
              className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-[4px] font-semibold leading-tight ${
                trend.isPositive
                  ? 'bg-[#E7F5EE] text-[#057642] border border-[#A2DCBF]'
                  : 'bg-[#FDECEC] text-[#CC1016] border border-[#F6B5B7]'
              }`}
            >
              {trend.isPositive ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
              {trend.value}
            </span>
            <span className="text-[#7A828A]">{trend.label || 'vs last cycle'}</span>
          </div>
        )}
      </div>
    </div>
  );
};


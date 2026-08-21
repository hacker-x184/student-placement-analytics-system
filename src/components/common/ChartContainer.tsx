import React from 'react';

export interface ChartContainerProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  height?: number | string;
  className?: string;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  action,
  children,
  height = 300,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col ${className}`}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-snug">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className="w-full flex-1 min-h-[220px]" style={{ height }}>
        {children}
      </div>
    </div>
  );
};

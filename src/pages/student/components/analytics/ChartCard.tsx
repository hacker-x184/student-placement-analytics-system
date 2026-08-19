import React from 'react';
import { HelpCircle, Inbox } from 'lucide-react';

export interface ChartCardProps {
  id?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  isEmpty?: boolean;
  emptyMessage?: string;
  children: React.ReactNode;
  headerAction?: React.ReactNode;
  className?: string;
  minHeight?: number | string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  id,
  title,
  subtitle,
  badge,
  isEmpty = false,
  emptyMessage = 'No data available for the selected filters.',
  children,
  headerAction,
  className = '',
  minHeight = 280,
}) => {
  return (
    <div
      id={id}
      className={`bg-white rounded-xl border border-[#e2e8f0] p-5 shadow-[0px_1px_3px_rgba(15,23,42,0.05),0px_10px_15px_-3px_rgba(15,23,42,0.03)] flex flex-col justify-between ${className}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-bold text-[#0b1c30] tracking-tight truncate">
              {title}
            </h3>
            {badge && (
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#eff4ff] text-[#004ac6] border border-[#dce9ff] rounded-full shrink-0">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-[#434655] mt-0.5 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {headerAction && <div className="shrink-0">{headerAction}</div>}
      </div>

      {/* Content Area or Compact Empty State */}
      <div
        className="w-full flex-1 flex flex-col justify-center"
        style={{ minHeight }}
      >
        {isEmpty ? (
          <div className="h-full min-h-[200px] flex flex-col items-center justify-center text-center p-6 bg-[#f8f9ff] rounded-lg border border-dashed border-[#c3c6d7]">
            <Inbox className="w-8 h-8 text-[#737686] mb-2" />
            <p className="text-xs font-semibold text-[#0b1c30]">{emptyMessage}</p>
            <p className="text-[11px] text-[#737686] mt-1">
              Try adjusting your batch, branch, or year filters.
            </p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

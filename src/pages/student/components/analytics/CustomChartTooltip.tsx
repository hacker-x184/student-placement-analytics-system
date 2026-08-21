import React from 'react';

export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: string | number;
    color?: string;
    unit?: string;
    dataKey?: string;
  }>;
  label?: string;
  suffix?: string;
  valueFormatter?: (value: any, name: string) => string;
}

export const CustomChartTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  valueFormatter,
}) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="bg-white border border-[#e2e8f0] p-3 rounded-lg shadow-lg text-xs min-w-[150px] z-50">
      {label && (
        <div className="font-bold text-[#0b1c30] mb-2 pb-1.5 border-b border-[#f1f5f9]">
          {label}
        </div>
      )}
      <div className="space-y-1.5">
        {payload.map((entry, index) => {
          const formattedValue = valueFormatter
            ? valueFormatter(entry.value, entry.name || '')
            : `${entry.value}${entry.unit || ''}`;

          return (
            <div key={`item-${index}`} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-[#434655]">
                <span
                  className="w-2.5 h-2.5 rounded-sm shrink-0"
                  style={{ backgroundColor: entry.color || '#004ac6' }}
                />
                <span className="font-medium">{entry.name}:</span>
              </div>
              <span className="font-bold text-[#0b1c30]">{formattedValue}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

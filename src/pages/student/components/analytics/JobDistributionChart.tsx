import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { JobDomainDistribution } from '../../../../types';
import { ChartCard } from './ChartCard';
import { CustomChartTooltip } from './CustomChartTooltip';

export interface JobDistributionChartProps {
  data: JobDomainDistribution[];
}

const DOMAIN_COLORS = [
  '#004ac6', // Primary Blue
  '#2563eb', // Royal Blue
  '#16a34a', // Emerald Green
  '#943700', // Amber/Sienna
  '#6366f1', // Indigo/Purple
];

export const JobDistributionChart: React.FC<JobDistributionChartProps> = ({ data }) => {
  const isEmpty = !data || data.length === 0;

  return (
    <ChartCard
      id="chart-job-distribution"
      title="10. Job Role & Domain Distribution"
      subtitle="Proportion of recruitment opportunities categorized by technical domain"
      badge="Market Demand"
      isEmpty={isEmpty}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 h-64">
        {/* Donut Chart */}
        <div className="w-full sm:w-1/2 h-full min-h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
                dataKey="percentage"
                nameKey="domain"
              >
                {data?.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={DOMAIN_COLORS[index % DOMAIN_COLORS.length]}
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                content={
                  <CustomChartTooltip
                    valueFormatter={(val) => `${val}% of Total Offers`}
                  />
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Scannable Legend */}
        <div className="w-full sm:w-1/2 space-y-2 text-xs">
          {data?.map((item, idx) => (
            <div key={item.domain} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{
                    backgroundColor: DOMAIN_COLORS[idx % DOMAIN_COLORS.length],
                  }}
                />
                <span className="text-[#0b1c30] font-medium truncate">
                  {item.domain}
                </span>
              </div>
              <span className="font-bold text-[#0b1c30] shrink-0">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
};

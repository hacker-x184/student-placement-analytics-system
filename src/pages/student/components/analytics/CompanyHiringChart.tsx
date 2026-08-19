import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { TopRecruiterItem } from '../../../../types';
import { ChartCard } from './ChartCard';
import { CustomChartTooltip } from './CustomChartTooltip';

export interface CompanyHiringChartProps {
  data: TopRecruiterItem[];
}

export const CompanyHiringChart: React.FC<CompanyHiringChartProps> = ({ data }) => {
  const isEmpty = !data || data.length === 0;

  return (
    <ChartCard
      id="chart-company-hiring"
      title="9. Top Corporate Recruiters"
      subtitle="Recruitment volume (hires count) and average compensation packages"
      badge="Corporate Partners"
      isEmpty={isEmpty}
    >
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="company"
              stroke="#737686"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={45}
            />
            <YAxis
              stroke="#737686"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <Tooltip
              content={
                <CustomChartTooltip
                  valueFormatter={(val, name) => {
                    if (name === 'Hires Count') return `${val} Offers`;
                    if (name === 'Average CTC (LPA)') return `₹${val} LPA`;
                    return `${val}`;
                  }}
                />
              }
            />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }}
              iconType="circle"
            />
            <Bar
              dataKey="hires"
              name="Hires Count"
              fill="#004ac6"
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
            />
            <Bar
              dataKey="avgPackage"
              name="Average CTC (LPA)"
              fill="#16a34a"
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

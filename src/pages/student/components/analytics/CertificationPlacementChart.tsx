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
import { CertificationPlacementTrend } from '../../../../types';
import { ChartCard } from './ChartCard';
import { CustomChartTooltip } from './CustomChartTooltip';

export interface CertificationPlacementChartProps {
  data: CertificationPlacementTrend[];
}

export const CertificationPlacementChart: React.FC<CertificationPlacementChartProps> = ({
  data,
}) => {
  const isEmpty = !data || data.length === 0;

  return (
    <ChartCard
      id="chart-certifications-placement"
      title="7. Certifications vs Placement"
      subtitle="Placement rate and compensation benchmarks for verified industry certifications"
      badge="Credentials"
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
              dataKey="certifications"
              stroke="#737686"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
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
                    if (name === 'Placement Rate (%)') return `${val}%`;
                    if (name === 'Average CTC (LPA)') return `₹${val} LPA`;
                    return `${val}`;
                  }}
                />
              }
            />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
              iconType="circle"
            />
            <Bar
              dataKey="rate"
              name="Placement Rate (%)"
              fill="#004ac6"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
            <Bar
              dataKey="avgPackage"
              name="Average CTC (LPA)"
              fill="#16a34a"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

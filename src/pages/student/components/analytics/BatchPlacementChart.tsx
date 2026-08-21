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
import { BatchPlacementTrend } from '../../../../types';
import { ChartCard } from './ChartCard';
import { CustomChartTooltip } from './CustomChartTooltip';

export interface BatchPlacementChartProps {
  data: BatchPlacementTrend[];
}

export const BatchPlacementChart: React.FC<BatchPlacementChartProps> = ({ data }) => {
  const isEmpty = !data || data.length === 0;

  return (
    <ChartCard
      id="chart-batch-placement"
      title="3. Batch-wise Placement Trends"
      subtitle="Total registered vs placed students across graduating cohorts"
      badge="Cohort Trajectory"
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
              dataKey="batch"
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
                  valueFormatter={(val, name) =>
                    name === 'Placement Rate'
                      ? `${val}%`
                      : name === 'Average Package'
                      ? `₹${val} LPA`
                      : `${val} Students`
                  }
                />
              }
            />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
              iconType="circle"
            />
            <Bar
              dataKey="total"
              name="Registered Cohort"
              fill="#dce9ff"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
            <Bar
              dataKey="placed"
              name="Placed Cohort"
              fill="#1d4ed8"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

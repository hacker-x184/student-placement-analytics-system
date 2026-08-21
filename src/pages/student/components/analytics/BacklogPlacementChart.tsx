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
import { BacklogPlacementTrend } from '../../../../types';
import { ChartCard } from './ChartCard';
import { CustomChartTooltip } from './CustomChartTooltip';

export interface BacklogPlacementChartProps {
  data: BacklogPlacementTrend[];
}

export const BacklogPlacementChart: React.FC<BacklogPlacementChartProps> = ({ data }) => {
  const isEmpty = !data || data.length === 0;

  return (
    <ChartCard
      id="chart-backlogs-placement"
      title="4. Backlogs vs Placement Rate"
      subtitle="Correlation between active/cleared academic arrears and placement outcomes"
      badge="Academic Risk Metric"
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
              dataKey="backlogs"
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
              domain={[0, 100]}
              unit="%"
            />
            <Tooltip
              content={
                <CustomChartTooltip
                  valueFormatter={(val, name) =>
                    name === 'Placement Rate (%)'
                      ? `${val}%`
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
              dataKey="rate"
              name="Placement Rate (%)"
              fill="#004ac6"
              radius={[4, 4, 0, 0]}
              maxBarSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

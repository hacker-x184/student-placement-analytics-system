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
import { ProjectPlacementTrend } from '../../../../types';
import { ChartCard } from './ChartCard';
import { CustomChartTooltip } from './CustomChartTooltip';

export interface ProjectPlacementChartProps {
  data: ProjectPlacementTrend[];
}

export const ProjectPlacementChart: React.FC<ProjectPlacementChartProps> = ({ data }) => {
  const isEmpty = !data || data.length === 0;

  return (
    <ChartCard
      id="chart-projects-placement"
      title="6. Projects vs Placement & Shortlist Rate"
      subtitle="Correlation of technical portfolio size with interview shortlisting & final offers"
      badge="Portfolio Depth"
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
              dataKey="projects"
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
                  valueFormatter={(val, name) => `${val}%`}
                />
              }
            />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
              iconType="circle"
            />
            <Bar
              dataKey="shortlistRate"
              name="Shortlist Rate (%)"
              fill="#cbdbf5"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
            <Bar
              dataKey="rate"
              name="Final Offer Rate (%)"
              fill="#004ac6"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

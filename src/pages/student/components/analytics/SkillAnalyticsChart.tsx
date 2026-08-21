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
import { SkillDemandItem } from '../../../../types';
import { ChartCard } from './ChartCard';
import { CustomChartTooltip } from './CustomChartTooltip';

export interface SkillAnalyticsChartProps {
  data: SkillDemandItem[];
}

export const SkillAnalyticsChart: React.FC<SkillAnalyticsChartProps> = ({ data }) => {
  const isEmpty = !data || data.length === 0;

  // Shorten skill names for horizontal axis readability
  const formattedData = data?.map((item) => ({
    ...item,
    shortSkill: item.skill.split('&')[0].split('/')[0].trim(),
  }));

  return (
    <ChartCard
      id="chart-skill-analytics"
      title="8. Skill Market Analytics"
      subtitle="Industry recruitment demand volume vs batch student proficiency percentage"
      badge="Skill Demand"
      isEmpty={isEmpty}
    >
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formattedData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="shortSkill"
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
                    if (name === 'Student Proficiency (%)') return `${val}%`;
                    if (name === 'Industry Hiring Drives') return `${val} Recruiter Openings`;
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
              dataKey="demandCount"
              name="Industry Hiring Drives"
              fill="#004ac6"
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
            />
            <Bar
              dataKey="studentProficiencyPct"
              name="Student Proficiency (%)"
              fill="#d97706"
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

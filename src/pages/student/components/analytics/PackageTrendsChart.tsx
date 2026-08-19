import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { SalaryRangeDistribution, HistoricalPackageTrend } from '../../../../types';
import { ChartCard } from './ChartCard';
import { CustomChartTooltip } from './CustomChartTooltip';

export interface PackageTrendsChartProps {
  distributionData: SalaryRangeDistribution[];
  historicalData: HistoricalPackageTrend[];
}

export const PackageTrendsChart: React.FC<PackageTrendsChartProps> = ({
  distributionData,
  historicalData,
}) => {
  const [viewMode, setViewMode] = useState<'distribution' | 'growth'>('distribution');

  const isEmpty =
    viewMode === 'distribution'
      ? !distributionData || distributionData.length === 0
      : !historicalData || historicalData.length === 0;

  return (
    <ChartCard
      id="chart-package-trends"
      title="11. Salary & Package Trends"
      subtitle={
        viewMode === 'distribution'
          ? 'Compensation brackets across confirmed institutional placement offers'
          : 'Year-on-year growth in Average, Median, and Highest packages'
      }
      badge="Compensation Trends"
      isEmpty={isEmpty}
      headerAction={
        <div className="flex items-center bg-[#f8f9ff] p-0.5 rounded-lg border border-[#e2e8f0]">
          <button
            type="button"
            onClick={() => setViewMode('distribution')}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${
              viewMode === 'distribution'
                ? 'bg-white text-[#004ac6] shadow-xs border border-[#e2e8f0]'
                : 'text-[#737686] hover:text-[#0b1c30]'
            }`}
          >
            CTC Range
          </button>
          <button
            type="button"
            onClick={() => setViewMode('growth')}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${
              viewMode === 'growth'
                ? 'bg-white text-[#004ac6] shadow-xs border border-[#e2e8f0]'
                : 'text-[#737686] hover:text-[#0b1c30]'
            }`}
          >
            YoY Growth
          </button>
        </div>
      }
    >
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          {viewMode === 'distribution' ? (
            <BarChart
              data={distributionData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="range"
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
                      name === 'Offer Count' ? `${val} Offers` : `${val}%`
                    }
                  />
                }
              />
              <Legend
                wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                iconType="circle"
              />
              <Bar
                dataKey="count"
                name="Offer Count"
                fill="#004ac6"
                radius={[4, 4, 0, 0]}
                maxBarSize={36}
              />
            </BarChart>
          ) : (
            <LineChart
              data={historicalData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="year"
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
                unit="LPA"
              />
              <Tooltip
                content={
                  <CustomChartTooltip
                    valueFormatter={(val) => `₹${val} LPA`}
                  />
                }
              />
              <Legend
                wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                iconType="circle"
              />
              <Line
                type="monotone"
                dataKey="average"
                name="Average CTC"
                stroke="#004ac6"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="median"
                name="Median CTC"
                stroke="#16a34a"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="highest"
                name="Highest CTC"
                stroke="#943700"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

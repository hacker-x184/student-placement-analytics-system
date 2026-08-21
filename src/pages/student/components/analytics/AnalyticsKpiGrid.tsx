import React from 'react';
import { Users, CheckCircle2, TrendingUp, DollarSign, Award, BarChart3 } from 'lucide-react';
import { OverviewKPIs } from '../../../../types';
import { KpiCard } from '../../../../components/common/KpiCard';

export interface AnalyticsKpiGridProps {
  kpis: OverviewKPIs;
}

export const AnalyticsKpiGrid: React.FC<AnalyticsKpiGridProps> = ({ kpis }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {/* 1. Total Students */}
      <KpiCard
        label="Total Students"
        value={kpis.totalStudents.toLocaleString()}
        icon={<Users className="w-5 h-5" />}
        theme="primary"
        subtitle="Registered candidates"
      />

      {/* 2. Placed Students */}
      <KpiCard
        label="Placed Students"
        value={kpis.placedStudents.toLocaleString()}
        icon={<CheckCircle2 className="w-5 h-5" />}
        theme="success"
        subtitle="Offers confirmed"
      />

      {/* 3. Placement Rate */}
      <KpiCard
        label="Placement Rate"
        value={`${kpis.placementRate.toFixed(1)}%`}
        icon={<TrendingUp className="w-5 h-5" />}
        theme="primary"
        subtitle="Institutional conversion"
      />

      {/* 4. Average Package */}
      <KpiCard
        label="Average Package"
        value={`₹${kpis.averagePackage.toFixed(1)} LPA`}
        icon={<DollarSign className="w-5 h-5" />}
        theme="secondary"
        subtitle="Mean compensation"
      />

      {/* 5. Highest Package */}
      <KpiCard
        label="Highest Package"
        value={`₹${kpis.highestPackage.toFixed(1)} LPA`}
        icon={<Award className="w-5 h-5" />}
        theme="tertiary"
        subtitle="Top domestic offer"
      />

      {/* 6. Median Package */}
      <KpiCard
        label="Median Package"
        value={`₹${kpis.medianPackage.toFixed(1)} LPA`}
        icon={<BarChart3 className="w-5 h-5" />}
        theme="warning"
        subtitle="Distribution midpoint"
      />
    </div>
  );
};

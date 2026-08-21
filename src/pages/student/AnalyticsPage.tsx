import React, { useState, useEffect, useCallback } from 'react';
import { StudentAnalyticsDashboardData, AnalyticsFilterParams } from '../../types';
import { analyticsService } from '../../services/analyticsService';
import { AnalyticsHeader } from './components/analytics/AnalyticsHeader';
import { AnalyticsFilters } from './components/analytics/AnalyticsFilters';
import { AnalyticsKpiGrid } from './components/analytics/AnalyticsKpiGrid';
import { AnalyticsSkeleton } from './components/analytics/AnalyticsSkeleton';
import { CgpaPlacementChart } from './components/analytics/CgpaPlacementChart';
import { BranchPlacementChart } from './components/analytics/BranchPlacementChart';
import { BatchPlacementChart } from './components/analytics/BatchPlacementChart';
import { BacklogPlacementChart } from './components/analytics/BacklogPlacementChart';
import { InternshipPlacementChart } from './components/analytics/InternshipPlacementChart';
import { ProjectPlacementChart } from './components/analytics/ProjectPlacementChart';
import { CertificationPlacementChart } from './components/analytics/CertificationPlacementChart';
import { SkillAnalyticsChart } from './components/analytics/SkillAnalyticsChart';
import { CompanyHiringChart } from './components/analytics/CompanyHiringChart';
import { JobDistributionChart } from './components/analytics/JobDistributionChart';
import { PackageTrendsChart } from './components/analytics/PackageTrendsChart';
import { ErrorState } from '../../components/common/ErrorState';

interface Props {
  onNavigate?: (route: string) => void;
}

export const AnalyticsPage: React.FC<Props> = ({ onNavigate }) => {
  const [data, setData] = useState<StudentAnalyticsDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters State
  const [filters, setFilters] = useState<AnalyticsFilterParams>({
    batch: 'All Batches',
    branch: 'All Branches',
    year: 'All Years',
  });

  const loadAnalytics = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await analyticsService.getAnalyticsDashboard(filters);
      setData(result);
    } catch (err: any) {
      console.error('Failed to load placement analytics:', err);
      setError(
        err?.message ||
          'Unable to load institutional placement analytics. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  const handleFilterChange = (key: keyof AnalyticsFilterParams, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      batch: 'All Batches',
      branch: 'All Branches',
      year: 'All Years',
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-12">
      {/* 1. Header */}
      <AnalyticsHeader />

      {/* 2. Filters Bar */}
      <AnalyticsFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      {/* 3. Loading State */}
      {isLoading && <AnalyticsSkeleton />}

      {/* 4. Error State with Retry */}
      {!isLoading && error && (
        <ErrorState
          title="Placement Analytics Unavailable"
          message={error}
          onRetry={loadAnalytics}
          className="my-8"
        />
      )}

      {/* 5. Main Analytics Dashboard Content */}
      {!isLoading && !error && data && (
        <div className="space-y-6">
          {/* Top 6 KPI Cards Grid */}
          <AnalyticsKpiGrid kpis={data.kpis} />

          {/* 11 Analytics Visualizations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. CGPA vs Placement */}
            <CgpaPlacementChart data={data.cgpaVsPlacement} />

            {/* 2. Branch-wise Placement */}
            <BranchPlacementChart data={data.branchPlacement} />

            {/* 3. Batch-wise Placement */}
            <BatchPlacementChart data={data.batchPlacement} />

            {/* 4. Backlogs vs Placement */}
            <BacklogPlacementChart data={data.backlogsVsPlacement} />

            {/* 5. Internship vs Placement */}
            <InternshipPlacementChart data={data.internshipsVsPlacement} />

            {/* 6. Projects vs Placement & Shortlisting */}
            <ProjectPlacementChart data={data.projectsVsPlacement} />

            {/* 7. Certifications vs Placement */}
            <CertificationPlacementChart data={data.certificationsVsPlacement} />

            {/* 8. Skill Analytics */}
            <SkillAnalyticsChart data={data.skillAnalytics} />

            {/* 9. Top Corporate Recruiters */}
            <CompanyHiringChart data={data.companyHiring} />

            {/* 10. Job Distribution by Domain */}
            <JobDistributionChart data={data.jobDistribution} />

            {/* 11. Salary & Package Trends (Full width on 2-col layout) */}
            <div className="lg:col-span-2">
              <PackageTrendsChart
                distributionData={data.packageTrends}
                historicalData={data.historicalPackageTrends}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

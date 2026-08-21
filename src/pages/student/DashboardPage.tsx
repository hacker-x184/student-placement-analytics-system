import React, { useState, useEffect } from 'react';
import { dashboardService, StudentDashboardData } from '../../services/dashboardService';
import { DashboardHeader } from './components/DashboardHeader';
import { DashboardKpis } from './components/DashboardKpis';
import { RecentApplicationsSection } from './components/RecentApplicationsSection';
import { RecommendedJobsSection } from './components/RecommendedJobsSection';
import { UpcomingScheduleSection } from './components/UpcomingScheduleSection';
import { DashboardSkeleton } from './components/DashboardSkeleton';
import { ErrorState } from '../../components/common/ErrorState';

export interface DashboardPageProps {
  onNavigate?: (route: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [data, setData] = useState<StudentDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await dashboardService.getStudentDashboardData();
      setData(response);
    } catch (err: any) {
      setError(
        err?.message || 'Unable to retrieve placement metrics. Please check your connection and retry.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error || !data) {
    return (
      <div className="py-8 max-w-xl mx-auto">
        <ErrorState
          title="Dashboard Unavailable"
          message={error || 'Failed to load student dashboard metrics.'}
          onRetry={loadDashboardData}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8" id="student-dashboard-page">
      {/* 1. Welcome & Context Header */}
      <DashboardHeader
        studentName={data.student.name}
        branch={data.student.branch}
        batchYear={data.student.batchYear}
        cgpa={data.student.cgpa}
        activeCycle={data.student.activeCycle}
        onNavigate={onNavigate}
      />

      {/* 2. KPI Metrics Grid */}
      <DashboardKpis stats={data.stats} onNavigate={onNavigate} />

      {/* 3. Main 12-Column Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Applications & Recommended Jobs (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Recent Applications Section */}
          <RecentApplicationsSection
            applications={data.recentApplications}
            onNavigate={onNavigate}
          />

          {/* Recommended Jobs Section */}
          <RecommendedJobsSection
            jobs={data.recommendedJobs}
            onNavigate={onNavigate}
          />
        </div>

        {/* Right Column: Upcoming Schedule & Placement Readiness (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <UpcomingScheduleSection
            activities={data.upcomingActivities}
            onNavigate={onNavigate}
          />
        </div>
      </div>
    </div>
  );
};

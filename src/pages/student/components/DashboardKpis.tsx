import React from 'react';
import { KpiCard } from '../../../components/common/KpiCard';
import { FileText, BookmarkCheck, Video, GraduationCap } from 'lucide-react';
import { DashboardStats } from '../../../services/dashboardService';

export interface DashboardKpisProps {
  stats: DashboardStats;
  onNavigate?: (route: string) => void;
}

export const DashboardKpis: React.FC<DashboardKpisProps> = ({ stats, onNavigate }) => {
  return (
    <div
      id="dashboard-kpis-grid"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
    >
      {/* 1. Total Applications */}
      <KpiCard
        label="Applications"
        value={stats.applications.total}
        icon={<FileText className="w-5 h-5 text-[#004ac6]" />}
        theme="primary"
        subtitle="Total applications submitted"
        trend={stats.applications.trend}
        onClick={() => onNavigate?.('/applications')}
      />

      {/* 2. Shortlisted */}
      <KpiCard
        label="Shortlisted"
        value={stats.shortlisted.total}
        icon={<BookmarkCheck className="w-5 h-5 text-[#1d4ed8]" />}
        theme="secondary"
        subtitle="Screening rounds cleared"
        trend={stats.shortlisted.trend}
        onClick={() => onNavigate?.('/applications')}
      />

      {/* 3. Interviews */}
      <KpiCard
        label="Interviews"
        value={stats.interviews.total}
        icon={<Video className="w-5 h-5 text-[#d97706]" />}
        theme="warning"
        subtitle="Active technical & HR rounds"
        trend={stats.interviews.trend}
        onClick={() => onNavigate?.('/applications')}
      />

      {/* 4. Placement Status */}
      <KpiCard
        label="Placement Status"
        value={stats.placement.label}
        icon={<GraduationCap className="w-5 h-5 text-[#16a34a]" />}
        theme="success"
        subtitle={stats.placement.subtitle || 'Active Recruitment Cycle'}
        onClick={() => onNavigate?.('/profile')}
      />
    </div>
  );
};

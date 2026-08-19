import React from 'react';
import { Button } from '../../../components/common/Button';
import { ArrowRight, Building2, BookOpen } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export interface DashboardHeaderProps {
  studentName?: string;
  branch?: string;
  batchYear?: number;
  cgpa?: number;
  activeCycle?: string;
  onNavigate?: (route: string) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  studentName = 'Lucky Sharma',
  branch = 'Computer Science & Engineering',
  batchYear = 2027,
  cgpa = 8.7,
  activeCycle = 'Placement Cycle 2026-27 Active',
  onNavigate,
}) => {
  const { user } = useAuth();
  const displayName = user?.name || studentName;

  return (
    <div
      id="dashboard-header"
      className="bg-white border border-[#D9DEE3] rounded-[8px] p-5 sm:p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center md:justify-between gap-4"
    >
      <div className="space-y-1.5 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] text-[11px] font-semibold bg-[#E8F3FF] text-[#0A66C2] border border-[#B3D7FF]">
            <span>{activeCycle}</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[11px] font-medium bg-[#F3F6F8] text-[#5E6670] border border-[#D9DEE3]">
            <BookOpen className="w-3 h-3 text-[#7A828A]" />
            <span>CGPA: {cgpa.toFixed(1)} / 10</span>
          </span>
        </div>

        <h1 className="text-[22px] sm:text-[26px] leading-[32px] font-bold text-[#1D2226] tracking-tight truncate">
          Welcome back, {displayName}
        </h1>

        <p className="text-[13px] text-[#5E6670] font-normal">
          {branch} • Class of {batchYear} • Placement progress and campus recruitment overview
        </p>
      </div>

      {/* Quick Action Button */}
      <div className="flex items-center gap-3 shrink-0">
        <Button
          id="dashboard-explore-jobs-btn"
          variant="primary"
          size="md"
          leftIcon={<Building2 className="w-4 h-4" />}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          onClick={() => onNavigate?.('/jobs')}
          className="w-full sm:w-auto"
        >
          Browse Recruitment Drives
        </Button>
      </div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { KpiCard } from '../../components/common/KpiCard';
import { Skeleton } from '../../components/common/Skeleton';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';
import { Modal } from '../../components/common/Modal';
import { Avatar } from '../../components/common/Avatar';
import {
  Users,
  Building2,
  Briefcase,
  FileCheck2,
  Award,
  TrendingUp,
  BarChart3,
  Calendar,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  DollarSign,
  GraduationCap,
  Eye,
  FileSpreadsheet,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { adminService } from '../../services/adminService';
import {
  TpoDashboardData,
  TpoRecentPlacementItem,
  TpoActiveRecruitmentItem,
} from '../../types';

export interface AdminDashboardPageProps {
  onNavigate?: (route: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onNavigate,
}) => {
  const { user } = useAuth();
  const { success: showToastSuccess, info: showToastInfo } = useToast();

  const [dashboardData, setDashboardData] = useState<TpoDashboardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Detail Modal State
  const [selectedPlacement, setSelectedPlacement] =
    useState<TpoRecentPlacementItem | null>(null);
  const [selectedDrive, setSelectedDrive] =
    useState<TpoActiveRecruitmentItem | null>(null);

  // Fetch Dashboard Data
  const loadData = async (forceFail: boolean = false) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await adminService.getTpoDashboardData(forceFail);
      setDashboardData(data);
    } catch (err: any) {
      setError(err?.message || 'Unable to load placement overview.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 1. LOADING SKELETON STATE
  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <Skeleton width={280} height={28} />
            <Skeleton width={320} height={16} />
          </div>
          <Skeleton width={150} height={36} />
        </div>

        {/* 6 KPI Skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-[8px] border border-[#D9DEE3] p-4 space-y-3"
            >
              <div className="flex justify-between items-center">
                <Skeleton width={80} height={12} />
                <Skeleton width={28} height={28} variant="circular" />
              </div>
              <Skeleton width={70} height={26} />
              <Skeleton width={100} height={12} />
            </div>
          ))}
        </div>

        {/* Overview Row Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-[8px] border border-[#D9DEE3] p-5 space-y-4">
            <Skeleton width={180} height={20} />
            <Skeleton width="100%" height={160} />
          </div>
          <div className="lg:col-span-5 bg-white rounded-[8px] border border-[#D9DEE3] p-5 space-y-4">
            <Skeleton width={160} height={20} />
            <Skeleton width="100%" height={160} />
          </div>
        </div>

        {/* Tables Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-[8px] border border-[#D9DEE3] p-5 space-y-4">
            <Skeleton width={200} height={20} />
            <Skeleton width="100%" height={200} />
          </div>
          <div className="lg:col-span-5 bg-white rounded-[8px] border border-[#D9DEE3] p-5 space-y-4">
            <Skeleton width={180} height={20} />
            <Skeleton width="100%" height={200} />
          </div>
        </div>
      </div>
    );
  }

  // 2. ERROR STATE
  if (error || !dashboardData) {
    return (
      <div className="py-12">
        <ErrorState
          title="Unable to load placement overview."
          message={
            error ||
            'There was an issue connecting to the TPO analytics service. Please verify your connection.'
          }
          onRetry={() => loadData()}
        />
      </div>
    );
  }

  const {
    college,
    kpis,
    placementOverview,
    packageOverview,
    departmentPlacements,
    recentPlacements,
    activeRecruitments,
    placementTrends,
  } = dashboardData;

  // Calculate placement ring circumference
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (placementOverview.placementRate / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[22px] sm:text-[24px] font-bold text-[#1D2226] tracking-tight">
              Good morning, TPO Team
            </h1>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-[4px] bg-[#E8F3FF] text-[#0A66C2] border border-[#B3D7FF]">
              {college.academicYear}
            </span>
          </div>
          <p className="text-[13px] sm:text-[14px] text-[#5E6670] mt-0.5">
            Here's your college placement overview.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            size="md"
            leftIcon={<Award className="w-4 h-4" />}
            onClick={() => onNavigate?.('/admin/placements')}
          >
            View Placements
          </Button>
        </div>
      </div>

      {/* 2. KPI Section (Six KPI Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        <KpiCard
          label="Total Students"
          value={kpis.totalStudents.toLocaleString()}
          icon={<Users className="w-4 h-4" />}
          theme="primary"
          subtitle="Enrolled batch"
          onClick={() => onNavigate?.('/admin/students')}
        />

        <KpiCard
          label="Placed Students"
          value={kpis.placedStudents.toLocaleString()}
          icon={<Award className="w-4 h-4" />}
          theme="success"
          subtitle="Verified offers"
          onClick={() => onNavigate?.('/admin/placements')}
        />

        <KpiCard
          label="Placement Rate"
          value={`${kpis.placementRate}%`}
          icon={<TrendingUp className="w-4 h-4" />}
          theme="tertiary"
          subtitle="+3.9% vs last season"
          onClick={() => onNavigate?.('/admin/analytics')}
        />

        <KpiCard
          label="Active Companies"
          value={kpis.activeCompanies}
          icon={<Building2 className="w-4 h-4" />}
          theme="primary"
          subtitle="Recruiting partners"
          onClick={() => onNavigate?.('/admin/companies')}
        />

        <KpiCard
          label="Active Jobs"
          value={kpis.activeJobs}
          icon={<Briefcase className="w-4 h-4" />}
          theme="primary"
          subtitle="Campus openings"
          onClick={() => onNavigate?.('/admin/jobs')}
        />

        <KpiCard
          label="Applications"
          value={kpis.applications.toLocaleString()}
          icon={<FileCheck2 className="w-4 h-4" />}
          theme="primary"
          subtitle="Total submissions"
          onClick={() => onNavigate?.('/admin/applications')}
        />
      </div>

      {/* 3. Placement Overview & Package Overview (Two Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* LEFT: Placement Overview (col-span-7) */}
        <div className="lg:col-span-7">
          <Card variant="default" className="p-5 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#D9DEE3] mb-4">
                <div>
                  <h2 className="text-[15px] font-bold text-[#1D2226] tracking-tight">
                    Placement Overview
                  </h2>
                  <p className="text-[12px] text-[#5E6670]">
                    Current season conversion rate & student distribution
                  </p>
                </div>
                <button
                  onClick={() => onNavigate?.('/admin/analytics')}
                  className="text-[12px] font-semibold text-[#0A66C2] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Detailed Analytics</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Visual Ring Chart and Metric Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center pt-1">
                {/* SVG Progress Donut */}
                <div className="sm:col-span-5 flex flex-col items-center justify-center">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
                      {/* Background circle */}
                      <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        className="stroke-[#E8ECEF]"
                        strokeWidth="12"
                        fill="transparent"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        className="stroke-[#0A66C2] transition-all duration-700 ease-out"
                        strokeWidth="12"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center text-center">
                      <span className="text-[24px] font-bold text-[#1D2226] leading-none">
                        {placementOverview.placementRate}%
                      </span>
                      <span className="text-[11px] font-semibold text-[#5E6670] mt-1">
                        Placement Rate
                      </span>
                    </div>
                  </div>
                </div>

                {/* Placed vs Not Placed Metrics */}
                <div className="sm:col-span-7 space-y-3">
                  {/* Placed Row */}
                  <div className="p-3 rounded-[8px] bg-[#F4F9FF] border border-[#B3D7FF] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-[#0A66C2] shrink-0" />
                      <div>
                        <span className="text-[12px] font-semibold text-[#1D2226] block">
                          Placed Students
                        </span>
                        <span className="text-[11px] text-[#5E6670]">
                          Offers accepted & verified
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[16px] font-bold text-[#0A66C2]">
                        {placementOverview.placed}
                      </span>
                      <span className="text-[11px] text-[#5E6670] block">
                        {placementOverview.placementRate}%
                      </span>
                    </div>
                  </div>

                  {/* Not Placed Row */}
                  <div className="p-3 rounded-[8px] bg-[#F8FAFB] border border-[#D9DEE3] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-[#D9DEE3] shrink-0" />
                      <div>
                        <span className="text-[12px] font-semibold text-[#1D2226] block">
                          Not Placed Yet
                        </span>
                        <span className="text-[11px] text-[#5E6670]">
                          In interview & assessment rounds
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[16px] font-bold text-[#5E6670]">
                        {placementOverview.notPlaced}
                      </span>
                      <span className="text-[11px] text-[#7A828A] block">
                        {(100 - placementOverview.placementRate).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Progress Summary */}
            <div className="mt-4 pt-3 border-t border-[#E8ECEF] flex items-center justify-between text-[12px] text-[#5E6670]">
              <span>
                Total Batch Size:{' '}
                <strong className="text-[#1D2226]">
                  {kpis.totalStudents.toLocaleString()} candidates
                </strong>
              </span>
              <span className="text-[#057642] font-semibold">
                Target: 85% by end of cycle
              </span>
            </div>
          </Card>
        </div>

        {/* RIGHT: Package Overview (col-span-5) */}
        <div className="lg:col-span-5">
          <Card variant="default" className="p-5 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#D9DEE3] mb-4">
                <div>
                  <h2 className="text-[15px] font-bold text-[#1D2226] tracking-tight">
                    Package Overview
                  </h2>
                  <p className="text-[12px] text-[#5E6670]">
                    CTC benchmarks across verified placements
                  </p>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#F3F6F8] text-[#5E6670] border border-[#D9DEE3]">
                  INR (LPA)
                </span>
              </div>

              {/* 3 Package Benchmark Cards */}
              <div className="space-y-2.5">
                {/* Average Package */}
                <div className="p-3.5 rounded-[8px] bg-[#F4F9FF] border border-[#B3D7FF] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[6px] bg-[#0A66C2] text-white flex items-center justify-center shrink-0">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[12px] font-semibold text-[#5E6670] uppercase tracking-wider block">
                        Average Package
                      </span>
                      <span className="text-[11px] text-[#7A828A]">
                        Campus-wide mean CTC
                      </span>
                    </div>
                  </div>
                  <span className="text-[20px] font-bold text-[#0A66C2]">
                    {packageOverview.averagePackage}
                  </span>
                </div>

                {/* Highest Package */}
                <div className="p-3.5 rounded-[8px] bg-[#E7F5EE] border border-[#A2DCBF] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[6px] bg-[#057642] text-white flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[12px] font-semibold text-[#057642] uppercase tracking-wider block">
                        Highest Package
                      </span>
                      <span className="text-[11px] text-[#5E6670]">
                        Top recruiter offer
                      </span>
                    </div>
                  </div>
                  <span className="text-[20px] font-bold text-[#057642]">
                    {packageOverview.highestPackage}
                  </span>
                </div>

                {/* Median Package */}
                <div className="p-3.5 rounded-[8px] bg-[#F8FAFB] border border-[#D9DEE3] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[6px] bg-[#5E6670] text-white flex items-center justify-center shrink-0">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[12px] font-semibold text-[#5E6670] uppercase tracking-wider block">
                        Median Package
                      </span>
                      <span className="text-[11px] text-[#7A828A]">
                        50th percentile CTC
                      </span>
                    </div>
                  </div>
                  <span className="text-[20px] font-bold text-[#1D2226]">
                    {packageOverview.medianPackage}
                  </span>
                </div>
              </div>
            </div>

            {/* Package Insight Note */}
            <div className="mt-4 pt-3 border-t border-[#E8ECEF] flex items-center gap-2 text-[12px] text-[#5E6670]">
              <Sparkles className="w-3.5 h-3.5 text-[#0A66C2] shrink-0" />
              <span>
                <strong>18.4%</strong> of placed students secured Dream offers (&gt;12 LPA).
              </span>
            </div>
          </Card>
        </div>
      </div>

      {/* 4. Department Placement & Placement Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Department-wise Placement (col-span-7) */}
        <div className="lg:col-span-7">
          <Card variant="default" className="p-5 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#D9DEE3] mb-4">
                <div>
                  <h2 className="text-[15px] font-bold text-[#1D2226] tracking-tight">
                    Department-wise Placement
                  </h2>
                  <p className="text-[12px] text-[#5E6670]">
                    Placement rates across academic disciplines
                  </p>
                </div>
                <span className="text-[11px] font-medium text-[#5E6670]">
                  Academic Year {college.academicYear}
                </span>
              </div>

              {/* Clean Horizontal Bar Charts */}
              <div className="space-y-4 pt-1">
                {departmentPlacements.map((dept) => (
                  <div key={dept.department} className="space-y-1.5">
                    <div className="flex items-center justify-between text-[13px]">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1D2226] w-10">
                          {dept.department}
                        </span>
                        {dept.placedCount && dept.totalCount && (
                          <span className="text-[11px] text-[#7A828A]">
                            ({dept.placedCount} / {dept.totalCount} placed)
                          </span>
                        )}
                      </div>
                      <span className="font-bold text-[#0A66C2]">
                        {dept.rate}%
                      </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full h-3 bg-[#E8ECEF] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0A66C2] rounded-full transition-all duration-500"
                        style={{ width: `${dept.rate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#E8ECEF] flex items-center justify-between text-[12px] text-[#5E6670]">
              <span>Leading Branch: <strong className="text-[#0A66C2]">CSE (82%)</strong></span>
              <button
                onClick={() => onNavigate?.('/admin/analytics')}
                className="text-[#0A66C2] font-semibold hover:underline cursor-pointer"
              >
                View all branches →
              </button>
            </div>
          </Card>
        </div>

        {/* Placement Trend (col-span-5) */}
        <div className="lg:col-span-5">
          <Card variant="default" className="p-5 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#D9DEE3] mb-4">
                <div>
                  <h2 className="text-[15px] font-bold text-[#1D2226] tracking-tight">
                    Placement Trend
                  </h2>
                  <p className="text-[12px] text-[#5E6670]">
                    Historical 4-year institutional progress
                  </p>
                </div>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#F8FAFB] text-[#7A828A] border border-[#D9DEE3]">
                  Demo Data
                </span>
              </div>

              {/* Vertical Column Chart for Yearly Trend */}
              <div className="pt-3 pb-2">
                <div className="flex items-end justify-between gap-4 h-36 px-2">
                  {placementTrends.map((trend, idx) => {
                    const heightPercent = (trend.rate / 85) * 100;
                    const isLatest = idx === placementTrends.length - 1;

                    return (
                      <div
                        key={trend.year}
                        className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
                      >
                        <span
                          className={`text-[12px] font-bold ${
                            isLatest ? 'text-[#0A66C2]' : 'text-[#5E6670]'
                          }`}
                        >
                          {trend.rate}%
                        </span>

                        <div className="w-full max-w-[42px] bg-[#E8ECEF] rounded-t-[4px] overflow-hidden flex items-end h-28">
                          <div
                            className={`w-full rounded-t-[4px] transition-all duration-500 ${
                              isLatest
                                ? 'bg-[#0A66C2] shadow-xs'
                                : 'bg-[#559EE8] opacity-80 group-hover:opacity-100'
                            }`}
                            style={{ height: `${heightPercent}%` }}
                          />
                        </div>

                        <span
                          className={`text-[12px] font-semibold ${
                            isLatest ? 'text-[#1D2226]' : 'text-[#7A828A]'
                          }`}
                        >
                          {trend.year}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E8ECEF] flex items-center justify-between text-[12px] text-[#5E6670]">
              <span className="flex items-center gap-1 text-[#057642] font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                +7.9% growth over 4 years
              </span>
              <span className="text-[#7A828A]">Verified records</span>
            </div>
          </Card>
        </div>
      </div>

      {/* 5. Tables: Recent Placement Activity & Active Recruitment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Recent Placement Activity (col-span-7) */}
        <div className="lg:col-span-7">
          <Card variant="default" className="p-0 overflow-hidden">
            {/* Section Header */}
            <div className="p-4 sm:p-5 border-b border-[#D9DEE3] flex items-center justify-between bg-white">
              <div>
                <h2 className="text-[15px] font-bold text-[#1D2226] tracking-tight">
                  Recent Placement Activity
                </h2>
                <p className="text-[12px] text-[#5E6670] mt-0.5">
                  Latest student placements verified by TPO cell
                </p>
              </div>

              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-[4px] bg-[#E7F5EE] text-[#057642] border border-[#A2DCBF]">
                Live Verified Feed
              </span>
            </div>

            {/* Placement Records Table */}
            <div className="divide-y divide-[#E8ECEF] overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[520px]">
                <thead>
                  <tr className="bg-[#F8FAFB] text-[11px] font-semibold text-[#5E6670] uppercase tracking-wider">
                    <th className="py-2.5 px-4">Student</th>
                    <th className="py-2.5 px-3">Company</th>
                    <th className="py-2.5 px-3">Role</th>
                    <th className="py-2.5 px-3">Package</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8ECEF] text-[13px]">
                  {recentPlacements.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#F8FAFB] transition-colors group"
                    >
                      {/* Student Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={item.studentName} size="sm" />
                          <div className="min-w-0">
                            <p className="font-semibold text-[#1D2226] truncate group-hover:text-[#0A66C2] transition-colors">
                              {item.studentName}
                            </p>
                            {item.branch && (
                              <p className="text-[11px] text-[#7A828A]">
                                {item.branch}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Company */}
                      <td className="py-3 px-3">
                        <span className="font-semibold text-[#1D2226]">
                          {item.company}
                        </span>
                      </td>

                      {/* Role */}
                      <td className="py-3 px-3 text-[#5E6670]">
                        {item.role}
                      </td>

                      {/* Package */}
                      <td className="py-3 px-3">
                        <span className="font-bold text-[#057642]">
                          {item.package}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-3 px-3 text-[#5E6670] whitespace-nowrap">
                        {item.date}
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedPlacement(item)}
                          className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#0A66C2] hover:underline px-2 py-1 rounded hover:bg-[#E8F3FF] transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Footer Link */}
            <div className="p-3.5 bg-[#F8FAFB] border-t border-[#D9DEE3] text-center">
              <button
                onClick={() => onNavigate?.('/admin/placements')}
                className="text-[13px] font-semibold text-[#0A66C2] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>View all verified placements</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </Card>
        </div>

        {/* RIGHT: Active Recruitment (col-span-5) */}
        <div className="lg:col-span-5">
          <Card variant="default" className="p-0 overflow-hidden">
            {/* Section Header */}
            <div className="p-4 sm:p-5 border-b border-[#D9DEE3] flex items-center justify-between bg-white">
              <div>
                <h2 className="text-[15px] font-bold text-[#1D2226] tracking-tight">
                  Active Recruitment
                </h2>
                <p className="text-[12px] text-[#5E6670] mt-0.5">
                  Live campus drives and application deadlines
                </p>
              </div>

              <button
                onClick={() => onNavigate?.('/admin/jobs')}
                className="text-[12px] font-semibold text-[#0A66C2] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>All Drives</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Active Drives Table */}
            <div className="divide-y divide-[#E8ECEF] overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[420px]">
                <thead>
                  <tr className="bg-[#F8FAFB] text-[11px] font-semibold text-[#5E6670] uppercase tracking-wider">
                    <th className="py-2.5 px-4">Company & Job</th>
                    <th className="py-2.5 px-3">Applicants</th>
                    <th className="py-2.5 px-3">Deadline</th>
                    <th className="py-2.5 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8ECEF] text-[13px]">
                  {activeRecruitments.map((drive) => (
                    <tr
                      key={drive.id}
                      className="hover:bg-[#F8FAFB] transition-colors group cursor-pointer"
                      onClick={() => setSelectedDrive(drive)}
                    >
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-semibold text-[#1D2226] group-hover:text-[#0A66C2] transition-colors">
                            {drive.company}
                          </p>
                          <p className="text-[11px] text-[#5E6670]">
                            {drive.job}
                          </p>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-semibold text-[#0A66C2]">
                          {drive.applicants}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-[#5E6670] whitespace-nowrap">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#7A828A]" />
                          {drive.deadline}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <Badge variant="success" size="sm">
                          {drive.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Footer Link */}
            <div className="p-3.5 bg-[#F8FAFB] border-t border-[#D9DEE3] text-center">
              <button
                onClick={() => onNavigate?.('/admin/jobs')}
                className="text-[13px] font-semibold text-[#0A66C2] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>View all campus drives</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* 6. Quick Actions Section */}
      <Card variant="default" className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D9DEE3] mb-3">
          <div>
            <h2 className="text-[15px] font-bold text-[#1D2226] tracking-tight">
              Quick Actions
            </h2>
            <p className="text-[12px] text-[#5E6670]">
              Direct access to core college placement modules
            </p>
          </div>

          <span className="text-[11px] text-[#7A828A]">TPO Management Hub</span>
        </div>

        {/* Compact Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            className="justify-center"
            leftIcon={<Users className="w-4 h-4 text-[#0A66C2]" />}
            onClick={() => onNavigate?.('/admin/students')}
          >
            View Students
          </Button>

          <Button
            variant="secondary"
            size="sm"
            className="justify-center"
            leftIcon={<Building2 className="w-4 h-4 text-[#0A66C2]" />}
            onClick={() => onNavigate?.('/admin/companies')}
          >
            View Companies
          </Button>

          <Button
            variant="secondary"
            size="sm"
            className="justify-center"
            leftIcon={<Briefcase className="w-4 h-4 text-[#0A66C2]" />}
            onClick={() => onNavigate?.('/admin/jobs')}
          >
            View Jobs
          </Button>

          <Button
            variant="secondary"
            size="sm"
            className="justify-center"
            leftIcon={<Award className="w-4 h-4 text-[#0A66C2]" />}
            onClick={() => onNavigate?.('/admin/placements')}
          >
            View Placements
          </Button>

          <Button
            variant="secondary"
            size="sm"
            className="justify-center"
            leftIcon={<BarChart3 className="w-4 h-4 text-[#0A66C2]" />}
            onClick={() => onNavigate?.('/admin/analytics')}
          >
            View Analytics
          </Button>
        </div>
      </Card>

      {/* =========================================================================
          INTERACTIVE MODALS
         ========================================================================= */}

      {/* 1. PLACEMENT RECORD MODAL */}
      {selectedPlacement && (
        <Modal
          isOpen={!!selectedPlacement}
          onClose={() => setSelectedPlacement(null)}
          title="Placement Verification Record"
          subtitle={`${selectedPlacement.studentName} • ${selectedPlacement.company}`}
          maxWidth="md"
          footer={
            <div className="flex items-center justify-between gap-2 w-full">
              <span className="text-[12px] text-[#057642] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified by TPO Cell
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedPlacement(null)}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    showToastSuccess(
                      `Offer letter and placement record verified for ${selectedPlacement.studentName}.`,
                      'Record Confirmed'
                    );
                    setSelectedPlacement(null);
                  }}
                >
                  Download Dossier
                </Button>
              </div>
            </div>
          }
        >
          <div className="space-y-4 py-2 text-[13px]">
            <div className="flex items-center gap-3 p-3 bg-[#F8FAFB] border border-[#E8ECEF] rounded-[8px]">
              <Avatar name={selectedPlacement.studentName} size="md" />
              <div>
                <p className="font-bold text-[#1D2226]">
                  {selectedPlacement.studentName}
                </p>
                <p className="text-[12px] text-[#5E6670]">
                  Branch: {selectedPlacement.branch || 'CSE'} • Batch {college.academicYear}
                </p>
                <p className="text-[11px] text-[#7A828A]">
                  Record ID: {selectedPlacement.id}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[12px]">
              <div className="p-2.5 rounded bg-white border border-[#D9DEE3]">
                <span className="text-[#5E6670] block">Recruiting Company</span>
                <span className="font-bold text-[#1D2226]">
                  {selectedPlacement.company}
                </span>
              </div>

              <div className="p-2.5 rounded bg-white border border-[#D9DEE3]">
                <span className="text-[#5E6670] block">Offered Role</span>
                <span className="font-semibold text-[#1D2226]">
                  {selectedPlacement.role}
                </span>
              </div>

              <div className="p-2.5 rounded bg-white border border-[#D9DEE3]">
                <span className="text-[#5E6670] block">Annual CTC</span>
                <span className="font-bold text-[#057642]">
                  {selectedPlacement.package}
                </span>
              </div>

              <div className="p-2.5 rounded bg-white border border-[#D9DEE3]">
                <span className="text-[#5E6670] block">Verification Date</span>
                <span className="font-semibold text-[#1D2226]">
                  {selectedPlacement.date}
                </span>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* 2. ACTIVE DRIVE DETAILS MODAL */}
      {selectedDrive && (
        <Modal
          isOpen={!!selectedDrive}
          onClose={() => setSelectedDrive(null)}
          title={selectedDrive.company}
          subtitle={`Campus Recruitment Drive • ${selectedDrive.job}`}
          maxWidth="md"
          footer={
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedDrive(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSelectedDrive(null);
                  onNavigate?.('/admin/applications');
                }}
              >
                Manage {selectedDrive.applicants} Applications
              </Button>
            </div>
          }
        >
          <div className="space-y-3 py-2 text-[13px]">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 bg-[#F8FAFB] border border-[#D9DEE3] rounded-[6px]">
                <p className="text-[11px] text-[#5E6670]">Applicants</p>
                <p className="text-[16px] font-bold text-[#0A66C2]">
                  {selectedDrive.applicants}
                </p>
              </div>
              <div className="p-2.5 bg-[#F8FAFB] border border-[#D9DEE3] rounded-[6px]">
                <p className="text-[11px] text-[#5E6670]">Deadline</p>
                <p className="text-[14px] font-bold text-[#1D2226]">
                  {selectedDrive.deadline}
                </p>
              </div>
              <div className="p-2.5 bg-[#F8FAFB] border border-[#D9DEE3] rounded-[6px]">
                <p className="text-[11px] text-[#5E6670]">Status</p>
                <p className="text-[14px] font-bold text-[#057642]">
                  {selectedDrive.status}
                </p>
              </div>
            </div>

            <p className="text-[12px] text-[#5E6670] leading-relaxed">
              This drive is open to eligible final-year candidates of {college.name}. Eligible students can submit credentials until the designated deadline.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { KpiCard } from '../../components/common/KpiCard';
import { Skeleton } from '../../components/common/Skeleton';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Avatar } from '../../components/common/Avatar';
import {
  Briefcase,
  Users,
  Calendar,
  Award,
  Plus,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
  TrendingUp,
  Filter,
  CheckCircle2,
  AlertCircle,
  Eye,
  Settings,
  ChevronRight,
  DollarSign,
  Send,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { companyService } from '../../services/companyService';
import {
  CompanyDashboardData,
  CompanyRecentApplication,
  CompanyActiveJobItem,
} from '../../types';

export interface CompanyDashboardPageProps {
  onNavigate?: (route: string) => void;
}

export const CompanyDashboardPage: React.FC<CompanyDashboardPageProps> = ({
  onNavigate,
}) => {
  const { user } = useAuth();
  const { success: showToastSuccess, info: showToastInfo } = useToast();

  const [dashboardData, setDashboardData] =
    useState<CompanyDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Demo state triggers
  const [viewState, setViewState] = useState<'normal' | 'empty'>('normal');

  // Interactive Modals state
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState<boolean>(false);
  const [selectedCandidate, setSelectedCandidate] =
    useState<CompanyRecentApplication | null>(null);
  const [selectedJob, setSelectedJob] = useState<CompanyActiveJobItem | null>(
    null
  );

  // Post Job Form State
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobLocation, setNewJobLocation] = useState('Bengaluru, India');
  const [newJobPackage, setNewJobPackage] = useState('₹10–14 LPA');
  const [newJobType, setNewJobType] = useState('Full-time');
  const [isSubmittingJob, setIsSubmittingJob] = useState(false);

  // Fetch Dashboard Data
  const loadData = async (forceFail: boolean = false) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await companyService.getCompanyDashboardData(forceFail);
      setDashboardData(data);
    } catch (err: any) {
      setError(err?.message || 'Unable to load recruitment data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handlePostJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle.trim()) return;

    setIsSubmittingJob(true);
    setTimeout(() => {
      if (dashboardData) {
        const createdJob: CompanyActiveJobItem = {
          id: `job-c-${Date.now()}`,
          title: newJobTitle.trim(),
          company: dashboardData.company.name,
          location: newJobLocation,
          package: newJobPackage,
          applicantsCount: 0,
          status: 'Active',
          jobType: newJobType,
          postedDate: 'Today',
        };

        setDashboardData({
          ...dashboardData,
          kpis: {
            ...dashboardData.kpis,
            activeJobs: dashboardData.kpis.activeJobs + 1,
          },
          activeJobs: [createdJob, ...dashboardData.activeJobs],
        });
      }

      setIsSubmittingJob(false);
      setIsPostJobModalOpen(false);
      setNewJobTitle('');
      showToastSuccess(
        `"${newJobTitle}" has been posted to the campus drive.`,
        'Job Posted Successfully'
      );
    }, 400);
  };

  const handleUpdateCandidateStatus = (
    candidateId: string,
    newStatus: 'Applied' | 'Shortlisted' | 'Interview' | 'Selected'
  ) => {
    if (!dashboardData) return;

    const updatedApplications = dashboardData.recentApplications.map((app) =>
      app.id === candidateId ? { ...app, status: newStatus } : app
    );

    setDashboardData({
      ...dashboardData,
      recentApplications: updatedApplications,
    });

    if (selectedCandidate && selectedCandidate.id === candidateId) {
      setSelectedCandidate({ ...selectedCandidate, status: newStatus });
    }

    showToastSuccess(
      `Candidate status updated to "${newStatus}".`,
      'Status Updated'
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Shortlisted':
        return (
          <Badge variant="tertiary" size="sm">
            Shortlisted
          </Badge>
        );
      case 'Interview':
        return (
          <Badge variant="primary" size="sm">
            Interview
          </Badge>
        );
      case 'Selected':
        return (
          <Badge variant="success" size="sm">
            Selected
          </Badge>
        );
      case 'Applied':
      default:
        return (
          <Badge variant="neutral" size="sm">
            Applied
          </Badge>
        );
    }
  };

  // 1. LOADING SKELETON STATE
  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <Skeleton width={260} height={28} />
            <Skeleton width={320} height={16} />
          </div>
          <Skeleton width={140} height={36} />
        </div>

        {/* 5 KPI Skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-white rounded-[8px] border border-[#D9DEE3] p-4 space-y-3"
            >
              <div className="flex justify-between items-center">
                <Skeleton width={80} height={12} />
                <Skeleton width={28} height={28} variant="circular" />
              </div>
              <Skeleton width={60} height={28} />
              <Skeleton width={110} height={12} />
            </div>
          ))}
        </div>

        {/* Pipeline Skeleton */}
        <div className="bg-white rounded-[8px] border border-[#D9DEE3] p-5">
          <Skeleton width={180} height={16} className="mb-4" />
          <Skeleton width="100%" height={56} />
        </div>

        {/* Two Column Layout Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-[8px] border border-[#D9DEE3] p-5 space-y-4">
            <Skeleton width={160} height={20} />
            <Skeleton width="100%" height={240} />
          </div>
          <div className="lg:col-span-5 bg-white rounded-[8px] border border-[#D9DEE3] p-5 space-y-4">
            <Skeleton width={140} height={20} />
            <Skeleton width="100%" height={240} />
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
          title="Unable to load recruitment data."
          message={
            error ||
            'There was an issue connecting to the CareerLens recruitment service. Please try again.'
          }
          onRetry={() => loadData()}
        />
      </div>
    );
  }

  // 3. EMPTY STATE (When no active jobs exist)
  if (viewState === 'empty' || dashboardData.activeJobs.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#D9DEE3]">
          <div>
            <h1 className="text-[22px] font-bold text-[#1D2226] tracking-tight">
              Good morning, {dashboardData.company.name}
            </h1>
            <p className="text-[13px] text-[#5E6670] mt-0.5">
              Here's your recruitment overview.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsPostJobModalOpen(true)}
          >
            Post a Job
          </Button>
        </div>

        <EmptyState
          icon={<Briefcase className="w-6 h-6" />}
          title="No active jobs yet."
          description="Create your first campus recruitment drive to receive applications, shortlist candidates, and coordinate interview rounds."
          actionLabel="Post your first job"
          onAction={() => setIsPostJobModalOpen(true)}
        />
      </div>
    );
  }

  const { kpis, recentApplications, activeJobs, pipeline, recentActivity, hiringInsight } =
    dashboardData;

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
        <div>
          <h1 className="text-[22px] sm:text-[24px] font-bold text-[#1D2226] tracking-tight">
            Good morning, {dashboardData.company.name}
          </h1>
          <p className="text-[13px] sm:text-[14px] text-[#5E6670] mt-0.5">
            Here's your recruitment overview.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsPostJobModalOpen(true)}
          >
            Post a Job
          </Button>
        </div>
      </div>

      {/* 2. KPI Cards (5 Metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <KpiCard
          label="Active Jobs"
          value={kpis.activeJobs}
          icon={<Briefcase className="w-4 h-4" />}
          theme="primary"
          subtitle="4 active openings"
          onClick={() => onNavigate?.('/company/jobs')}
        />

        <KpiCard
          label="Total Applicants"
          value={kpis.totalApplicants}
          icon={<Users className="w-4 h-4" />}
          theme="primary"
          subtitle="Across all postings"
          onClick={() => onNavigate?.('/company/applicants')}
        />

        <KpiCard
          label="Shortlisted"
          value={kpis.shortlisted}
          icon={<CheckCircle2 className="w-4 h-4" />}
          theme="tertiary"
          subtitle="25.4% qualification rate"
          onClick={() => onNavigate?.('/company/applicants')}
        />

        <KpiCard
          label="Interviews"
          value={kpis.interviews}
          icon={<Calendar className="w-4 h-4" />}
          theme="warning"
          subtitle="Technical & HR rounds"
          onClick={() => onNavigate?.('/company/interviews')}
        />

        <KpiCard
          label="Selected"
          value={kpis.selected}
          icon={<Award className="w-4 h-4" />}
          theme="success"
          subtitle="Offers extended"
          onClick={() => onNavigate?.('/company/hiring')}
        />
      </div>

      {/* 3. Recruitment Pipeline Flow (Horizontal Desktop / Vertical Mobile) */}
      <Card variant="default" className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[15px] font-bold text-[#1D2226] tracking-tight">
              Recruitment Pipeline
            </h2>
            <p className="text-[12px] text-[#5E6670]">
              Candidate progression across active hiring stages
            </p>
          </div>
          <button
            onClick={() => onNavigate?.('/company/applicants')}
            className="text-[12px] font-semibold text-[#0A66C2] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Funnel Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Pipeline on Desktop / Stacked on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
          {pipeline.map((stageItem, index) => {
            const isLast = index === pipeline.length - 1;
            const stageTheme =
              stageItem.stage === 'Applied'
                ? 'border-[#B3D7FF] bg-[#F4F9FF]'
                : stageItem.stage === 'Shortlisted'
                ? 'border-[#FED99B] bg-[#FFFBF4]'
                : stageItem.stage === 'Interview'
                ? 'border-[#FED99B] bg-[#FFFBF4]'
                : 'border-[#A2DCBF] bg-[#F3FAF6]';

            const textColor =
              stageItem.stage === 'Applied'
                ? 'text-[#0A66C2]'
                : stageItem.stage === 'Shortlisted'
                ? 'text-[#915907]'
                : stageItem.stage === 'Interview'
                ? 'text-[#915907]'
                : 'text-[#057642]';

            return (
              <div
                key={stageItem.stage}
                className={`p-3.5 rounded-[8px] border ${stageTheme} flex flex-col justify-between transition-all`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[#5E6670] uppercase tracking-wider">
                    {stageItem.stage}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-1.5 py-0.5 rounded-[4px] bg-white border border-[#D9DEE3] ${textColor}`}
                  >
                    {stageItem.percentage}%
                  </span>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-[22px] font-bold text-[#1D2226]">
                    {stageItem.count}
                  </span>
                  <span className="text-[11px] text-[#7A828A]">candidates</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 4. Main Two-Column Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Recent Applications (col-span-7) */}
        <div className="lg:col-span-7">
          <Card variant="default" className="p-0 overflow-hidden">
            {/* Section Header */}
            <div className="p-4 sm:p-5 border-b border-[#D9DEE3] flex items-center justify-between bg-white">
              <div>
                <h2 className="text-[15px] font-bold text-[#1D2226] tracking-tight">
                  Recent Applications
                </h2>
                <p className="text-[12px] text-[#5E6670] mt-0.5">
                  Latest candidates across your active openings.
                </p>
              </div>

              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-[4px] bg-[#F3F6F8] text-[#5E6670] border border-[#D9DEE3]">
                {recentApplications.length} New Candidates
              </span>
            </div>

            {/* Applications Table / Rows */}
            <div className="divide-y divide-[#E8ECEF] overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-[#F8FAFB] text-[11px] font-semibold text-[#5E6670] uppercase tracking-wider">
                    <th className="py-2.5 px-4">Candidate</th>
                    <th className="py-2.5 px-3">Position</th>
                    <th className="py-2.5 px-3">Applied</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8ECEF] text-[13px]">
                  {recentApplications.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-[#F8FAFB] transition-colors group"
                    >
                      {/* Candidate Name & Avatar */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={app.candidateName} size="sm" />
                          <div className="min-w-0">
                            <p className="font-semibold text-[#1D2226] truncate group-hover:text-[#0A66C2] transition-colors">
                              {app.candidateName}
                            </p>
                            {app.email && (
                              <p className="text-[11px] text-[#7A828A] truncate">
                                {app.email}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Position */}
                      <td className="py-3 px-3">
                        <span className="font-medium text-[#1D2226]">
                          {app.position}
                        </span>
                      </td>

                      {/* Applied Date */}
                      <td className="py-3 px-3 text-[#5E6670] whitespace-nowrap">
                        {app.appliedDate}
                      </td>

                      {/* Status Badge */}
                      <td className="py-3 px-3">
                        {getStatusBadge(app.status)}
                      </td>

                      {/* Action Button */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedCandidate(app)}
                          className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#0A66C2] hover:text-[#004182] hover:underline px-2 py-1 rounded hover:bg-[#E8F3FF] transition-colors cursor-pointer"
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
                onClick={() => onNavigate?.('/company/applicants')}
                className="text-[13px] font-semibold text-[#0A66C2] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>View all applicants</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: Active Jobs (col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          <Card variant="default" className="p-4 sm:p-5">
            {/* Section Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#D9DEE3] mb-3.5">
              <div>
                <h2 className="text-[15px] font-bold text-[#1D2226] tracking-tight">
                  Active Jobs
                </h2>
                <p className="text-[12px] text-[#5E6670]">
                  Live campus postings and candidate volume
                </p>
              </div>

              <button
                onClick={() => onNavigate?.('/company/jobs')}
                className="text-[12px] font-semibold text-[#0A66C2] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>All Jobs</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Compact Job Rows */}
            <div className="space-y-2.5">
              {activeJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-3 rounded-[8px] border border-[#D9DEE3] bg-[#FDFDFE] hover:bg-white hover:border-[#B3D7FF] hover:shadow-[0px_2px_4px_rgba(0,0,0,0.03)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[13px] font-bold text-[#1D2226] truncate">
                        {job.title}
                      </h3>
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-[#E7F5EE] text-[#057642] border border-[#A2DCBF]">
                        Active
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-[#5E6670]">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#7A828A]" />
                        {job.location}
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-[#1D2226]">
                        {job.package}
                      </span>
                      <span>•</span>
                      <span className="text-[#0A66C2] font-medium">
                        {job.applicantsCount} applicants
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center justify-end">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="text-[12px] font-semibold text-[#0A66C2] hover:text-[#004182] hover:underline px-2.5 py-1 rounded bg-[#E8F3FF] hover:bg-[#D4E8FF] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Manage</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Hiring Insight Card */}
          <Card
            variant="default"
            className="p-4 bg-gradient-to-br from-[#F4F9FF] to-[#E8F3FF] border-[#B3D7FF]"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-[6px] bg-[#0A66C2] text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-[13px] font-bold text-[#004182]">
                    {hiringInsight.title}
                  </h3>
                  <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-white text-[#0A66C2] border border-[#B3D7FF]">
                    High Engagement
                  </span>
                </div>
                <p className="text-[12px] text-[#1D2226] mt-1 leading-snug">
                  {hiringInsight.description}
                </p>
                <div className="mt-2.5">
                  <button
                    onClick={() => {
                      const job = activeJobs.find(
                        (j) => j.title === hiringInsight.highlightRole
                      );
                      if (job) setSelectedJob(job);
                      else onNavigate?.('/company/jobs');
                    }}
                    className="text-[12px] font-bold text-[#0A66C2] hover:text-[#004182] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Job</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 5. Bottom Row: Recent Hiring Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Hiring Activity (col-span-8) */}
        <div className="lg:col-span-8">
          <Card variant="default" className="p-4 sm:p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#D9DEE3] mb-3.5">
              <div>
                <h2 className="text-[15px] font-bold text-[#1D2226] tracking-tight">
                  Recent Hiring Activity
                </h2>
                <p className="text-[12px] text-[#5E6670]">
                  Real-time events across your candidate pipeline
                </p>
              </div>

              <span className="text-[11px] text-[#7A828A]">Live Feed</span>
            </div>

            <div className="space-y-3">
              {recentActivity.map((activity) => {
                const isShortlist = activity.type === 'shortlist';
                const isInterview = activity.type === 'interview';
                const isSelect = activity.type === 'select';

                const iconBg = isSelect
                  ? 'bg-[#E7F5EE] text-[#057642] border-[#A2DCBF]'
                  : isInterview
                  ? 'bg-[#E8F3FF] text-[#0A66C2] border-[#B3D7FF]'
                  : 'bg-[#FFF4DF] text-[#915907] border-[#FED99B]';

                const IconComponent = isSelect
                  ? Award
                  : isInterview
                  ? Calendar
                  : CheckCircle2;

                return (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-3 rounded-[6px] bg-[#F8FAFB] border border-[#E8ECEF] text-[13px]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 ${iconBg}`}
                      >
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-[#1D2226] truncate">
                        <span className="font-semibold text-[#1D2226]">
                          {activity.candidateName}
                        </span>{' '}
                        <span className="text-[#5E6670]">
                          {activity.action}
                        </span>{' '}
                        <span className="font-semibold text-[#1D2226]">
                          {activity.position}
                        </span>
                      </p>
                    </div>

                    <span className="text-[11px] text-[#7A828A] whitespace-nowrap pl-3">
                      {activity.timestamp}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Quick Actions (col-span-4) */}
        <div className="lg:col-span-4">
          <Card variant="default" className="p-4 sm:p-5 space-y-3">
            <h2 className="text-[15px] font-bold text-[#1D2226] tracking-tight pb-2 border-b border-[#D9DEE3]">
              Quick Actions
            </h2>

            <div className="space-y-2 pt-1">
              <Button
                variant="primary"
                size="sm"
                className="w-full justify-start"
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={() => setIsPostJobModalOpen(true)}
              >
                + Post a Job
              </Button>

              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-start"
                leftIcon={<Users className="w-4 h-4" />}
                onClick={() => onNavigate?.('/company/applicants')}
              >
                View Applicants
              </Button>

              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-start"
                leftIcon={<Calendar className="w-4 h-4" />}
                onClick={() => onNavigate?.('/company/interviews')}
              >
                Schedule Interview
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE MODALS
         ========================================================================= */}

      {/* 1. POST A JOB MODAL */}
      <Modal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        title="Post a New Campus Job"
        subtitle={`Create and publish a hiring drive for ${dashboardData.company.name}.`}
        maxWidth="md"
        footer={
          <div className="flex items-center justify-end gap-2.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsPostJobModalOpen(false)}
              disabled={isSubmittingJob}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handlePostJobSubmit}
              loading={isSubmittingJob}
            >
              Publish Job
            </Button>
          </div>
        }
      >
        <form onSubmit={handlePostJobSubmit} className="space-y-4 py-1">
          <div>
            <label className="block text-[12px] font-semibold text-[#1D2226] mb-1">
              Job Title *
            </label>
            <Input
              placeholder="e.g. Senior Frontend Engineer"
              value={newJobTitle}
              onChange={(e) => setNewJobTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-semibold text-[#1D2226] mb-1">
                Location *
              </label>
              <Input
                placeholder="e.g. Bengaluru, India"
                value={newJobLocation}
                onChange={(e) => setNewJobLocation(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#1D2226] mb-1">
                Package / CTC *
              </label>
              <Input
                placeholder="e.g. ₹12–16 LPA"
                value={newJobPackage}
                onChange={(e) => setNewJobPackage(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#1D2226] mb-1">
              Employment Type
            </label>
            <select
              value={newJobType}
              onChange={(e) => setNewJobType(e.target.value)}
              className="w-full h-9 px-3 text-[13px] bg-white border border-[#D9DEE3] rounded-[6px] text-[#1D2226] focus:border-[#0A66C2] focus:outline-none"
            >
              <option value="Full-time">Full-time Campus Drive</option>
              <option value="Internship">Summer / Winter Internship</option>
              <option value="Remote">Remote Role</option>
            </select>
          </div>
        </form>
      </Modal>

      {/* 2. CANDIDATE DETAILS MODAL (When clicking "View") */}
      {selectedCandidate && (
        <Modal
          isOpen={!!selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          title={selectedCandidate.candidateName}
          subtitle={`Application for ${selectedCandidate.position} • Applied ${selectedCandidate.appliedDate}`}
          maxWidth="md"
          footer={
            <div className="flex flex-wrap items-center justify-between gap-2 w-full">
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] text-[#5E6670]">Current:</span>
                {getStatusBadge(selectedCandidate.status)}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedCandidate(null)}
                >
                  Close
                </Button>
                {selectedCandidate.status !== 'Shortlisted' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() =>
                      handleUpdateCandidateStatus(
                        selectedCandidate.id,
                        'Shortlisted'
                      )
                    }
                  >
                    Shortlist
                  </Button>
                )}
                {selectedCandidate.status !== 'Interview' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      handleUpdateCandidateStatus(
                        selectedCandidate.id,
                        'Interview'
                      )
                    }
                  >
                    Move to Interview
                  </Button>
                )}
                {selectedCandidate.status !== 'Selected' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() =>
                      handleUpdateCandidateStatus(
                        selectedCandidate.id,
                        'Selected'
                      )
                    }
                  >
                    Select Candidate
                  </Button>
                )}
              </div>
            </div>
          }
        >
          <div className="space-y-4 py-2 text-[13px]">
            <div className="flex items-center gap-3 p-3 bg-[#F8FAFB] border border-[#E8ECEF] rounded-[8px]">
              <Avatar name={selectedCandidate.candidateName} size="md" />
              <div>
                <p className="font-bold text-[#1D2226]">
                  {selectedCandidate.candidateName}
                </p>
                <p className="text-[12px] text-[#5E6670]">
                  {selectedCandidate.email || 'candidate@college.edu'}
                </p>
                <p className="text-[11px] text-[#7A828A]">
                  Candidate ID: {selectedCandidate.id}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[12px]">
              <div className="p-2.5 rounded bg-white border border-[#D9DEE3]">
                <span className="text-[#5E6670] block">Position Applied</span>
                <span className="font-semibold text-[#1D2226]">
                  {selectedCandidate.position}
                </span>
              </div>
              <div className="p-2.5 rounded bg-white border border-[#D9DEE3]">
                <span className="text-[#5E6670] block">Profile Match Score</span>
                <span className="font-bold text-[#057642]">
                  {selectedCandidate.matchScore || 92}% Match
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#F4F9FF] border border-[#B3D7FF] rounded-[6px]">
              <p className="text-[12px] text-[#0A66C2] font-semibold">
                Recruiter Action Notes:
              </p>
              <p className="text-[12px] text-[#1D2226] mt-0.5">
                Eligible candidate. Verified coursework in Algorithms, System
                Design, and Distributed Systems.
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* 3. MANAGE JOB MODAL */}
      {selectedJob && (
        <Modal
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
          title={selectedJob.title}
          subtitle={`${selectedJob.company} • ${selectedJob.location} • ${selectedJob.package}`}
          maxWidth="md"
          footer={
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedJob(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSelectedJob(null);
                  onNavigate?.('/company/applicants');
                }}
              >
                View {selectedJob.applicantsCount} Applicants
              </Button>
            </div>
          }
        >
          <div className="space-y-3 py-2 text-[13px]">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 bg-[#F8FAFB] border border-[#D9DEE3] rounded-[6px]">
                <p className="text-[11px] text-[#5E6670]">Applicants</p>
                <p className="text-[16px] font-bold text-[#1D2226]">
                  {selectedJob.applicantsCount}
                </p>
              </div>
              <div className="p-2.5 bg-[#F8FAFB] border border-[#D9DEE3] rounded-[6px]">
                <p className="text-[11px] text-[#5E6670]">Package</p>
                <p className="text-[14px] font-bold text-[#057642]">
                  {selectedJob.package}
                </p>
              </div>
              <div className="p-2.5 bg-[#F8FAFB] border border-[#D9DEE3] rounded-[6px]">
                <p className="text-[11px] text-[#5E6670]">Status</p>
                <p className="text-[14px] font-bold text-[#0A66C2]">Active</p>
              </div>
            </div>

            <p className="text-[12px] text-[#5E6670] leading-relaxed">
              This job posting is live across the student portal and eligible
              candidates have full access to apply and submit their credentials.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

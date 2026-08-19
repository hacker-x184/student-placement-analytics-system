import React, { useState, useEffect, useMemo } from 'react';
import { Job } from '../../types';
import { jobService, JobFilterParams } from '../../services/jobService';
import { applicationService } from '../../services/applicationService';
import { JobCard } from '../../components/common/JobCard';
import { JobFilterBar, FilterState } from './components/jobs/JobFilterBar';
import { JobsSkeleton } from './components/jobs/JobsSkeleton';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';
import { Pagination } from '../../components/common/Pagination';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { Toast } from '../../components/common/Toast';
import {
  Briefcase,
  Building2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Calendar,
  Layers,
  FileCheck2,
} from 'lucide-react';

interface Props {
  onNavigate?: (route: string) => void;
}

const PAGE_SIZE = 6;

export const JobsPage: React.FC<Props> = ({ onNavigate }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter & Search State
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    branch: 'All',
    minCgpa: '',
    jobType: 'All',
    status: 'All',
    sortBy: 'deadline',
  });

  // Apply Modal State
  const [applyModalJob, setApplyModalJob] = useState<Job | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{
    variant?: 'success' | 'warning' | 'info' | 'danger';
    title: string;
    message: string;
  } | null>(null);

  // Fetch jobs & user application history
  const fetchJobsAndApplications = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [jobsData, applicationsData] = await Promise.all([
        jobService.getJobs({
          search: filters.search,
          branch: filters.branch,
          minCgpa: filters.minCgpa === '' ? undefined : (filters.minCgpa as number),
          jobType: filters.jobType,
          status: filters.status,
          sortBy: filters.sortBy,
        }),
        applicationService.getApplications(),
      ]);

      setJobs(jobsData);
      setAppliedJobIds(new Set(applicationsData.map((app) => app.jobId)));
      setCurrentPage(1);
    } catch (err: any) {
      console.error('Failed to fetch recruitment jobs:', err);
      setError('Unable to load campus recruitment opportunities. Please verify your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobsAndApplications();
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      search: '',
      branch: 'All',
      minCgpa: '',
      jobType: 'All',
      status: 'All',
      sortBy: 'deadline',
    });
  };

  // Bookmark toggle
  const handleToggleSave = async (jobId: string) => {
    try {
      const updated = await jobService.toggleSaveJob(jobId);
      setJobs((prev) => prev.map((j) => (j.id === jobId ? updated : j)));
      setToastMessage({
        variant: 'info',
        title: updated.isSaved ? 'Job Saved' : 'Removed from Saved',
        message: `${updated.title} at ${updated.company} has been ${
          updated.isSaved ? 'saved to your shortlisted list' : 'removed'
        }.`,
      });
    } catch (err) {
      console.error('Failed to toggle save job:', err);
    }
  };

  // View Details navigation
  const handleViewDetails = (job: Job) => {
    if (onNavigate) {
      onNavigate(`/jobs/${job.id}`);
    }
  };

  // Apply button handler
  const handleOpenApplyModal = (job: Job) => {
    if (appliedJobIds.has(job.id)) {
      setToastMessage({
        variant: 'warning',
        title: 'Already Applied',
        message: 'You have already applied for this job. Check your Applications page for status updates.',
      });
      return;
    }
    setApplyModalJob(job);
  };

  const handleConfirmApplication = async () => {
    if (!applyModalJob) return;
    try {
      setIsSubmitting(true);
      await applicationService.createApplication(applyModalJob.id);
      
      // Update applied status in set
      setAppliedJobIds((prev) => new Set([...Array.from(prev), applyModalJob.id]));
      
      const title = applyModalJob.title;
      const company = applyModalJob.company;
      setApplyModalJob(null);
      setToastMessage({
        variant: 'success',
        title: 'Application Submitted',
        message: 'Application submitted successfully.',
      });
    } catch (err: any) {
      console.error('Application creation error:', err);
      setToastMessage({
        variant: 'warning',
        title: 'Application Notice',
        message: err?.message || 'Failed to submit application.',
      });
      if (err?.message?.includes('already applied')) {
        setAppliedJobIds((prev) => new Set([...Array.from(prev), applyModalJob.id]));
      }
      setApplyModalJob(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pagination calculation
  const totalPages = Math.ceil(jobs.length / PAGE_SIZE) || 1;
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return jobs.slice(start, start + PAGE_SIZE);
  }, [jobs, currentPage]);

  const activeCount = useMemo(() => {
    return jobs.filter((j) => j.status === 'Active').length;
  }, [jobs]);

  return (
    <div id="student-jobs-page" className="space-y-6 max-w-[1280px] mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          variant={toastMessage.variant || 'info'}
          title={toastMessage.title}
          message={toastMessage.message}
          onClose={() => setToastMessage(null)}
          duration={5000}
        />
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#e2e8f0]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b1c30] tracking-tight">
            Campus Recruitment Drives
          </h1>
          <p className="text-sm text-[#434655] mt-1 font-normal">
            Explore verified corporate placement openings, review technical requirements, and check academic eligibility.
          </p>
        </div>

        {/* Overview Stats Badges */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <div className="px-3.5 py-1.5 rounded-lg bg-white border border-[#e2e8f0] shadow-xs text-xs flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#004ac6]" />
            <span className="text-[#434655]">Total Openings:</span>
            <strong className="text-[#0b1c30] font-bold">{jobs.length}</strong>
          </div>
          <div className="px-3.5 py-1.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff] text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
            <span className="text-[#004ac6] font-semibold">{activeCount} Active</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <JobFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalResults={jobs.length}
      />

      {/* Main Content Area: Loading / Error / Empty / Grid */}
      {isLoading ? (
        <JobsSkeleton />
      ) : error ? (
        <ErrorState
          title="Recruitment Drives Unavailable"
          message={error}
          onRetry={fetchJobsAndApplications}
        />
      ) : jobs.length === 0 ? (
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-8 shadow-[0px_1px_3px_rgba(15,23,42,0.05)]">
          <EmptyState
            title="No Matching Placement Drives"
            description="We could not find any active job opportunities matching your current search and eligibility filters. Try relaxing your CGPA threshold or clearing specific department constraints."
            actionText="Clear All Filters"
            onAction={handleResetFilters}
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onViewDetails={handleViewDetails}
                onApply={handleOpenApplyModal}
                onToggleSave={handleToggleSave}
                showFullDetails={true}
                isApplied={appliedJobIds.has(job.id)}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(p) => {
                setCurrentPage(p);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              totalItems={jobs.length}
              pageSize={PAGE_SIZE}
            />
          )}
        </div>
      )}

      {/* Apply Confirmation Modal */}
      <Modal
        isOpen={Boolean(applyModalJob)}
        onClose={() => !isSubmitting && setApplyModalJob(null)}
        title="Confirm Application"
        subtitle="Campus Placement Recruitment Submission"
        maxWidth="md"
        footer={
          <div className="flex items-center justify-end gap-3 w-full">
            <Button
              id="btn-cancel-jobs-apply-modal"
              variant="outline"
              size="sm"
              disabled={isSubmitting}
              onClick={() => setApplyModalJob(null)}
            >
              Cancel
            </Button>
            <Button
              id="btn-confirm-jobs-apply-modal"
              variant="primary"
              size="sm"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              leftIcon={<FileCheck2 className="w-4 h-4" />}
              onClick={handleConfirmApplication}
            >
              {isSubmitting ? 'Submitting Application...' : 'Confirm Application'}
            </Button>
          </div>
        }
      >
        {applyModalJob && (
          <div className="space-y-4 text-sm text-[#434655]">
            <div className="p-4 bg-[#eff4ff] border border-[#dce9ff] rounded-xl space-y-1.5">
              <span className="text-[10px] font-bold text-[#004ac6] uppercase tracking-wider block">
                Applying for Position
              </span>
              <h4 className="font-bold text-[#0b1c30] text-base">{applyModalJob.title}</h4>
              <div className="flex items-center gap-2 text-xs text-[#434655] font-medium flex-wrap pt-0.5">
                <span className="font-semibold text-[#004ac6]">{applyModalJob.company}</span>
                <span>•</span>
                <span className="font-semibold text-[#0b1c30]">{applyModalJob.package}</span>
                <span>•</span>
                <span className="text-[#737686]">{applyModalJob.location}</span>
              </div>
            </div>

            <p className="text-xs text-[#434655] leading-relaxed">
              Are you sure you want to apply for <strong>{applyModalJob.title}</strong> at <strong>{applyModalJob.company}</strong>?
            </p>

            <div className="p-3 bg-[#f8f9ff] border border-[#e2e8f0] rounded-lg text-[11px] text-[#737686] space-y-1">
              <p className="font-semibold text-[#0b1c30]">Verification & Profile Notice:</p>
              <p>
                Your verified student profile (CGPA: 8.7, Department: Computer Science, Batch: 2027) will be submitted to the corporate recruitment committee.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

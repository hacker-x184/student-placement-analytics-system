import React, { useState, useEffect, useCallback } from 'react';
import { Job, Application } from '../../types';
import { jobService } from '../../services/jobService';
import { applicationService } from '../../services/applicationService';
import { JobDetailsSkeleton } from './components/jobs/JobDetailsSkeleton';
import { JobDetailsHeader } from './components/jobs/JobDetailsHeader';
import { JobDescriptionCard } from './components/jobs/JobDescriptionCard';
import { JobSelectionStagesCard } from './components/jobs/JobSelectionStagesCard';
import { JobAcademicEligibilityCard } from './components/jobs/JobAcademicEligibilityCard';
import { JobCompanyProfileCard } from './components/jobs/JobCompanyProfileCard';
import { JobScheduleCard } from './components/jobs/JobScheduleCard';
import { JobApplyModal } from './components/jobs/JobApplyModal';
import { EmptyState } from '../../components/common/EmptyState';
import { Toast } from '../../components/common/Toast';
import { ArrowLeft } from 'lucide-react';

interface Props {
  onNavigate?: (route: string) => void;
  jobId?: string;
}

export const JobDetailsPage: React.FC<Props> = ({ onNavigate, jobId = 'job-1' }) => {
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const [, setExistingApp] = useState<Application | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{
    variant?: 'success' | 'warning' | 'info' | 'danger';
    title: string;
    message: string;
  } | null>(null);

  const fetchJobDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      let targetJob = await jobService.getJobById(jobId);
      if (!targetJob) {
        targetJob = await jobService.getJobById(`job-${jobId}`);
      }

      if (!targetJob) {
        setError('The requested job drive was not found or is no longer available.');
      } else {
        setJob(targetJob);
        const applied = await applicationService.hasApplied(targetJob.id);
        setIsApplied(applied);
        if (applied) {
          const app = await applicationService.getApplicationByJobId(targetJob.id);
          setExistingApp(app);
        }
      }
    } catch (err) {
      console.error('Error fetching job details:', err);
      setError('Unable to retrieve job details. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    fetchJobDetails();
  }, [fetchJobDetails]);

  const handleToggleSave = async () => {
    if (!job) return;
    try {
      const updated = await jobService.toggleSaveJob(job.id);
      setJob(updated);
      setToastMessage({
        variant: 'info',
        title: updated.isSaved ? 'Job Shortlisted' : 'Removed from Saved',
        message: `${updated.title} at ${updated.company} has been ${
          updated.isSaved ? 'added to your saved drives' : 'removed'
        }.`,
      });
    } catch (err) {
      console.error('Error toggling job save state:', err);
    }
  };

  const handleApplyClick = () => {
    if (!job) return;

    if (isApplied) {
      setToastMessage({
        variant: 'warning',
        title: 'Already Applied',
        message: 'You have already applied for this job. Check your Applications page for status updates.',
      });
      return;
    }

    setIsApplyModalOpen(true);
  };

  const handleConfirmApplication = async () => {
    if (!job) return;
    try {
      setIsSubmitting(true);
      const newApp = await applicationService.createApplication(job.id);
      setIsApplied(true);
      setExistingApp(newApp);
      setIsApplyModalOpen(false);
      setToastMessage({
        variant: 'success',
        title: 'Application Submitted',
        message: 'Application submitted successfully.',
      });
    } catch (err: any) {
      console.error('Application submission error:', err);
      setToastMessage({
        variant: 'warning',
        title: 'Application Notice',
        message: err?.message || 'Failed to submit application. Please try again.',
      });
      if (err?.message?.includes('already applied')) {
        setIsApplied(true);
      }
      setIsApplyModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (onNavigate) {
      onNavigate('/jobs');
    }
  };

  const handleNavigateToApplications = () => {
    if (onNavigate) {
      onNavigate('/applications');
    } else {
      setToastMessage({
        variant: 'info',
        title: 'Application Status',
        message: 'You have already applied for this job. Check your Applications page.',
      });
    }
  };

  if (isLoading) {
    return <JobDetailsSkeleton />;
  }

  if (error || !job) {
    return (
      <div className="max-w-[1280px] mx-auto space-y-6">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#004ac6] hover:text-[#003da6] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Opportunities</span>
        </button>

        <div className="bg-white border border-[#e2e8f0] rounded-xl p-8 shadow-[0px_1px_3px_rgba(15,23,42,0.05)]">
          <EmptyState
            title="Job Drive Not Found"
            description={error || 'The requested placement drive does not exist or has concluded.'}
            actionText="Browse All Openings"
            onAction={handleBack}
          />
        </div>
      </div>
    );
  }

  return (
    <div id={`job-details-page-${job.id}`} className="space-y-6 max-w-[1280px] mx-auto">
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

      {/* Back Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          id="btn-back-to-jobs"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#004ac6] hover:text-[#003da6] hover:underline transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Placement Opportunities</span>
        </button>

        <span className="text-xs text-[#737686] hidden sm:inline-block">
          Ref ID: <strong className="font-mono text-[#0b1c30]">{job.id}</strong>
        </span>
      </div>

      {/* Header Banner Card */}
      <JobDetailsHeader
        job={job}
        isApplied={isApplied}
        onToggleSave={handleToggleSave}
        onApplyClick={handleApplyClick}
        onNavigateToApplications={handleNavigateToApplications}
      />

      {/* Two-Column Core Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column (2 Cols): Overview, Responsibilities, Skills, Selection Process */}
        <div className="lg:col-span-2 space-y-6">
          <JobDescriptionCard job={job} />
          <JobSelectionStagesCard />
        </div>

        {/* Right Column (1 Col): Eligibility Criteria, Company Profile, Timeline */}
        <div className="space-y-6">
          <JobAcademicEligibilityCard job={job} />
          <JobCompanyProfileCard job={job} />
          <JobScheduleCard job={job} />
        </div>
      </div>

      {/* Application Confirmation Modal */}
      <JobApplyModal
        job={job}
        isOpen={isApplyModalOpen}
        isSubmitting={isSubmitting}
        onClose={() => setIsApplyModalOpen(false)}
        onConfirm={handleConfirmApplication}
      />
    </div>
  );
};

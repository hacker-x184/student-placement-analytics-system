import React from 'react';
import { Job } from '../../../../types';
import { Badge } from '../../../../components/common/Badge';
import { Button } from '../../../../components/common/Button';
import {
  Building2,
  MapPin,
  Bookmark,
  Sparkles,
  CheckCircle2,
  FileCheck2,
} from 'lucide-react';

export interface JobDetailsHeaderProps {
  job: Job;
  isApplied: boolean;
  onToggleSave: () => void;
  onApplyClick: () => void;
  onNavigateToApplications?: () => void;
}

export const JobDetailsHeader: React.FC<JobDetailsHeaderProps> = ({
  job,
  isApplied,
  onToggleSave,
  onApplyClick,
  onNavigateToApplications,
}) => {
  const isClosed = job.status === 'Closed';
  const isUrgent =
    job.deadline.toLowerCase().includes('days left') ||
    job.deadline.toLowerCase().includes('today') ||
    job.deadline.toLowerCase().includes('hours');

  return (
    <div
      id="job-details-header-card"
      className="bg-white border border-[#e2e8f0] rounded-xl p-5 sm:p-6 shadow-[0px_1px_3px_rgba(15,23,42,0.05)] space-y-6"
    >
      {/* Top row: Company avatar, title, badges, and action buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          {/* Company Avatar */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-center text-[#004ac6] font-bold text-xl sm:text-2xl shrink-0 shadow-xs">
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={job.company}
                className="w-full h-full object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span>{job.companyInitial || job.company.charAt(0)}</span>
            )}
          </div>

          {/* Title & Metadata */}
          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#0b1c30] tracking-tight">
                {job.title}
              </h1>
              {isClosed ? (
                <Badge variant="danger" size="sm">
                  Closed
                </Badge>
              ) : (
                <Badge variant="success" size="sm">
                  Active Drive
                </Badge>
              )}
              {job.matchScore && (
                <Badge variant="primary" size="sm" icon={<Sparkles className="w-3 h-3" />}>
                  {job.matchScore}% Match
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs sm:text-sm text-[#434655] font-medium flex-wrap">
              <span className="font-semibold text-[#0b1c30] flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#004ac6]" />
                {job.company}
              </span>
              <span className="text-[#737686]">•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#737686]" />
                {job.location}
              </span>
              <span className="text-[#737686]">•</span>
              <span className="text-[#737686]">{job.postedDate}</span>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-2.5 self-stretch sm:self-auto shrink-0 pt-2 md:pt-0 border-t md:border-0 border-[#e2e8f0]">
          <Button
            id="btn-details-save"
            variant="outline"
            size="md"
            onClick={onToggleSave}
            className="flex-1 sm:flex-initial"
            leftIcon={
              <Bookmark
                className={`w-4 h-4 ${job.isSaved ? 'fill-current text-[#004ac6]' : ''}`}
              />
            }
          >
            {job.savedCount ? `Saved (${job.savedCount})` : job.isSaved ? 'Saved' : 'Save'}
          </Button>

          {isApplied ? (
            <Button
              id="btn-details-applied"
              variant="outline"
              size="md"
              onClick={onNavigateToApplications}
              className="flex-1 sm:flex-initial text-[#004ac6] border-[#004ac6]/30 bg-[#eff4ff]"
              leftIcon={<CheckCircle2 className="w-4 h-4 text-[#004ac6]" />}
            >
              Applied (View Status)
            </Button>
          ) : (
            <Button
              id="btn-details-apply"
              variant={isClosed ? 'secondary' : 'primary'}
              size="md"
              disabled={isClosed}
              onClick={onApplyClick}
              className="flex-1 sm:flex-initial"
              leftIcon={<FileCheck2 className="w-4 h-4" />}
            >
              {isClosed ? 'Drive Concluded' : 'Apply Now'}
            </Button>
          )}
        </div>
      </div>

      {/* Highlight Key Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-[#e2e8f0]">
        <div className="bg-[#f8f9ff] border border-[#e2e8f0] rounded-lg p-3 space-y-0.5">
          <span className="text-[10px] font-bold text-[#737686] uppercase tracking-wider block">
            Package (CTC)
          </span>
          <span className="text-sm font-extrabold text-[#0b1c30] block">{job.package}</span>
        </div>

        <div className="bg-[#f8f9ff] border border-[#e2e8f0] rounded-lg p-3 space-y-0.5">
          <span className="text-[10px] font-bold text-[#737686] uppercase tracking-wider block">
            Min. CGPA
          </span>
          <span className="text-sm font-extrabold text-[#004ac6] block">
            {job.minCgpa.toFixed(1)} / 10.0
          </span>
        </div>

        <div className="bg-[#f8f9ff] border border-[#e2e8f0] rounded-lg p-3 space-y-0.5">
          <span className="text-[10px] font-bold text-[#737686] uppercase tracking-wider block">
            Openings
          </span>
          <span className="text-sm font-extrabold text-[#0b1c30] block">
            {job.openings} Positions
          </span>
        </div>

        <div className="bg-[#f8f9ff] border border-[#e2e8f0] rounded-lg p-3 space-y-0.5">
          <span className="text-[10px] font-bold text-[#737686] uppercase tracking-wider block">
            Batch Eligibility
          </span>
          <span className="text-sm font-bold text-[#0b1c30] truncate block">
            {job.batchYear}
          </span>
        </div>

        <div className="bg-[#f8f9ff] border border-[#e2e8f0] rounded-lg p-3 space-y-0.5">
          <span className="text-[10px] font-bold text-[#737686] uppercase tracking-wider block">
            Work Mode
          </span>
          <span className="text-sm font-bold text-[#0b1c30] block">{job.jobType}</span>
        </div>

        <div className="bg-[#f8f9ff] border border-[#e2e8f0] rounded-lg p-3 space-y-0.5">
          <span className="text-[10px] font-bold text-[#737686] uppercase tracking-wider block">
            Deadline
          </span>
          <span
            className={`text-sm font-extrabold truncate block ${
              isUrgent ? 'text-[#ba1a1a]' : 'text-[#0b1c30]'
            }`}
          >
            {job.deadline}
          </span>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Bookmark, Building2, MapPin, Calendar, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { Job } from '../../types';
import { Badge } from './Badge';
import { Button } from './Button';

export interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
  onApply?: (job: Job) => void;
  onToggleSave?: (jobId: string) => void;
  showFullDetails?: boolean;
  isApplied?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onViewDetails,
  onApply,
  onToggleSave,
  showFullDetails = true,
  isApplied = false,
}) => {
  const isClosed = job.status === 'Closed';
  const isUrgent =
    job.deadline.toLowerCase().includes('days left') ||
    job.deadline.toLowerCase().includes('today') ||
    job.deadline.toLowerCase().includes('hours');

  return (
    <div
      id={`job-card-${job.id}`}
      className="bg-white border border-[#D9DEE3] rounded-[8px] p-4 sm:p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.03)] hover:border-[#B2BAC2] hover:shadow-[0px_2px_6px_rgba(0,0,0,0.04)] transition-all duration-150 flex flex-col justify-between group"
    >
      <div className="space-y-3.5">
        {/* Header row: Company avatar, Title, Company Name, and Bookmark/Match */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            {/* Company Avatar */}
            <div className="w-10 h-10 rounded-[6px] bg-[#E8F3FF] border border-[#B3D7FF] flex items-center justify-center text-[#0A66C2] font-bold text-[13px] shrink-0">
              {job.companyLogo ? (
                <img
                  src={job.companyLogo}
                  alt={job.company}
                  className="w-full h-full object-cover rounded-[6px]"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <span>{job.companyInitial || job.company.charAt(0)}</span>
              )}
            </div>

            {/* Title & Organization */}
            <div className="min-w-0">
              <h3
                onClick={() => onViewDetails(job)}
                className="text-[15px] sm:text-[16px] leading-[22px] font-semibold text-[#1D2226] group-hover:text-[#0A66C2] transition-colors cursor-pointer line-clamp-1"
                title={job.title}
              >
                {job.title}
              </h3>
              <p className="text-[13px] text-[#5E6670] font-normal mt-0.5 truncate">{job.company}</p>
              
              <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                {isClosed ? (
                  <Badge variant="danger" size="sm">
                    Closed
                  </Badge>
                ) : (
                  <Badge variant="success" size="sm">
                    Active Drive
                  </Badge>
                )}
                {job.jobType && (
                  <span className="text-[11px] font-medium text-[#5E6670] bg-[#F3F6F8] px-1.5 py-0.5 rounded-[4px] border border-[#D9DEE3]">
                    {job.jobType}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Match Score & Save Button */}
          <div className="flex items-center gap-1.5 shrink-0">
            {job.matchScore && (
              <Badge
                variant={job.matchScore >= 90 ? 'primary' : 'neutral'}
                size="sm"
                icon={<Sparkles className="w-3 h-3" />}
              >
                {job.matchScore}%
              </Badge>
            )}
            {onToggleSave && (
              <button
                type="button"
                id={`btn-save-job-${job.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave(job.id);
                }}
                className={`p-1.5 rounded-[6px] transition-colors ${
                  job.isSaved
                    ? 'text-[#0A66C2] bg-[#E8F3FF] border border-[#B3D7FF]'
                    : 'text-[#7A828A] hover:text-[#1D2226] hover:bg-[#F3F6F8] border border-transparent'
                }`}
                title={job.isSaved ? 'Remove from Saved' : 'Save this job'}
                aria-label={job.isSaved ? 'Saved job' : 'Save job'}
              >
                <Bookmark className={`w-4 h-4 ${job.isSaved ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Info Grid (Package, Location, Min CGPA, Deadline) */}
        {showFullDetails && (
          <div className="grid grid-cols-2 gap-y-2 gap-x-3 py-2.5 border-y border-[#D9DEE3] text-[12px]">
            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold text-[#7A828A] uppercase tracking-wider block">
                Package (CTC)
              </span>
              <span className="text-[13px] font-bold text-[#1D2226] block">{job.package}</span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold text-[#7A828A] uppercase tracking-wider block">
                Location
              </span>
              <span className="text-[12px] text-[#5E6670] truncate block" title={job.location}>
                {job.location.split(',')[0]}
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold text-[#7A828A] uppercase tracking-wider block">
                Min. CGPA
              </span>
              <span className="text-[12px] font-semibold text-[#0A66C2] block">
                {job.minCgpa.toFixed(1)} / 10.0
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold text-[#7A828A] uppercase tracking-wider block">
                Deadline
              </span>
              <span
                className={`text-[12px] truncate block ${
                  isUrgent ? 'text-[#CC1016] font-semibold' : 'text-[#5E6670]'
                }`}
              >
                {job.deadline}
              </span>
            </div>
          </div>
        )}

        {/* Skills Tag Section */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap gap-1">
            {job.requiredSkills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="px-1.5 py-0.5 bg-[#F3F6F8] text-[#5E6670] text-[11px] font-medium rounded-[4px] border border-[#D9DEE3]"
              >
                {skill}
              </span>
            ))}
            {job.requiredSkills.length > 4 && (
              <span className="px-1.5 py-0.5 text-[#7A828A] bg-[#F3F6F8] border border-[#D9DEE3] text-[11px] font-medium rounded-[4px]">
                +{job.requiredSkills.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="pt-3 mt-3 border-t border-[#D9DEE3] flex items-center gap-2">
        <Button
          id={`btn-view-details-${job.id}`}
          variant="secondary"
          size="sm"
          className="flex-1"
          onClick={() => onViewDetails(job)}
        >
          View Job
        </Button>

        {isApplied ? (
          <Button
            id={`btn-applied-job-${job.id}`}
            variant="secondary"
            size="sm"
            className="flex-1 text-[#057642] border-[#A2DCBF] bg-[#E7F5EE]"
            leftIcon={<CheckCircle2 className="w-3.5 h-3.5 text-[#057642]" />}
            onClick={() => (onApply ? onApply(job) : onViewDetails(job))}
          >
            Applied
          </Button>
        ) : (
          <Button
            id={`btn-apply-job-${job.id}`}
            variant={isClosed ? 'secondary' : 'primary'}
            size="sm"
            className="flex-1"
            disabled={isClosed}
            onClick={() => (onApply ? onApply(job) : onViewDetails(job))}
          >
            {isClosed ? 'Closed' : 'Apply'}
          </Button>
        )}
      </div>
    </div>
  );
};


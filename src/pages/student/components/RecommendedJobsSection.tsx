import React from 'react';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { Badge } from '../../../components/common/Badge';
import { EmptyState } from '../../../components/common/EmptyState';
import { Job } from '../../../types';
import {
  ArrowRight,
  Building2,
  MapPin,
  Sparkles,
  Banknote,
} from 'lucide-react';

export interface RecommendedJobsSectionProps {
  jobs: Job[];
  onNavigate?: (route: string) => void;
}

export const RecommendedJobsSection: React.FC<RecommendedJobsSectionProps> = ({
  jobs,
  onNavigate,
}) => {
  return (
    <Card
      id="dashboard-recommended-jobs"
      variant="default"
      padding="none"
      className="overflow-hidden"
      headerTitle="Recommended Opportunities"
      headerSubtitle="Curated placement drives matching your academic profile and skill qualifications"
      headerAction={
        <Button
          variant="ghost"
          size="sm"
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          onClick={() => onNavigate?.('/recommendations')}
        >
          View Recommendations
        </Button>
      }
    >
      {jobs.length === 0 ? (
        <div className="p-6">
          <EmptyState
            icon={<Sparkles className="w-6 h-6 text-[#0A66C2]" />}
            title="No recommendations available yet"
            description="We are matching your technical competencies and CGPA against live campus openings. Check back shortly."
            actionLabel="View All Drives"
            onAction={() => onNavigate?.('/jobs')}
          />
        </div>
      ) : (
        <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {jobs.map((job) => (
            <div
              key={job.id}
              onClick={() => onNavigate?.(`/jobs/${job.id}`)}
              className="bg-white rounded-[6px] border border-[#D9DEE3] p-3.5 flex flex-col justify-between hover:border-[#B2BAC2] hover:shadow-[0px_2px_6px_rgba(0,0,0,0.04)] transition-all cursor-pointer group"
            >
              <div className="space-y-2.5">
                {/* Header: Avatar + Title + Match Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-[6px] bg-[#E8F3FF] border border-[#B3D7FF] flex items-center justify-center text-[#0A66C2] font-bold text-[12px] shrink-0">
                      {job.companyInitial || <Building2 className="w-4 h-4 text-[#0A66C2]" />}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-[13px] text-[#1D2226] group-hover:text-[#0A66C2] transition-colors truncate leading-tight">
                        {job.title}
                      </h4>
                      <p className="text-[12px] text-[#5E6670] truncate font-normal mt-0.5">
                        {job.company}
                      </p>
                    </div>
                  </div>

                  {job.matchScore && (
                    <Badge variant="primary" size="sm" className="shrink-0">
                      {job.matchScore}% Match
                    </Badge>
                  )}
                </div>

                {/* Key Attributes */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#D9DEE3] text-[12px]">
                  <div className="flex items-center gap-1.5 text-[#1D2226] font-medium truncate">
                    <Banknote className="w-3.5 h-3.5 text-[#057642] shrink-0" />
                    <span className="truncate">{job.package}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#5E6670] font-normal truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#7A828A] shrink-0" />
                    <span className="truncate">{job.location.split(',')[0]}</span>
                  </div>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {job.requiredSkills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-1.5 py-0.5 rounded-[4px] text-[11px] font-medium bg-[#F3F6F8] text-[#5E6670] border border-[#D9DEE3]"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.requiredSkills.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[11px] font-medium text-[#7A828A]">
                      +{job.requiredSkills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* View Action */}
              <div className="pt-2.5 mt-2.5 border-t border-[#D9DEE3] flex items-center justify-between">
                <span className="text-[11px] text-[#7A828A]">
                  Min CGPA: <strong className="text-[#1D2226]">{job.minCgpa}</strong>
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate?.(`/jobs/${job.id}`);
                  }}
                >
                  View Job
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};


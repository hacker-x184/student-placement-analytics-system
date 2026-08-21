import React from 'react';
import { Card } from '../../../../components/common/Card';
import { Job } from '../../../../types';
import { AlertCircle } from 'lucide-react';

export interface JobAcademicEligibilityCardProps {
  job: Job;
}

export const JobAcademicEligibilityCard: React.FC<JobAcademicEligibilityCardProps> = ({
  job,
}) => {
  return (
    <Card
      id="job-eligibility-card"
      variant="default"
      padding="md"
      headerTitle="Academic Eligibility"
      headerSubtitle="Campus placement criteria"
    >
      <div className="space-y-3.5 pt-1 text-xs">
        <div className="pb-3 border-b border-[#e2e8f0]">
          <span className="text-[#737686] font-medium block mb-1">
            Minimum Cumulative CGPA
          </span>
          <span className="text-sm font-bold text-[#004ac6]">
            {job.minCgpa.toFixed(1)} / 10.0 CGPA
          </span>
        </div>

        <div className="pb-3 border-b border-[#e2e8f0]">
          <span className="text-[#737686] font-medium block mb-1">
            Eligible Engineering Branches
          </span>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {job.eligibleBranches.map((branch) => (
              <span
                key={branch}
                className="px-2 py-0.5 bg-[#eff4ff] text-[#004ac6] text-[11px] font-semibold rounded border border-[#dce9ff]"
              >
                {branch}
              </span>
            ))}
          </div>
        </div>

        <div className="pb-3 border-b border-[#e2e8f0]">
          <span className="text-[#737686] font-medium block mb-1">Graduation Batch</span>
          <span className="text-xs font-bold text-[#0b1c30]">
            Class of {job.batchYear}
          </span>
        </div>

        <div className="pb-3 border-b border-[#e2e8f0]">
          <span className="text-[#737686] font-medium block mb-1">
            Active Backlogs Tolerance
          </span>
          <span className="text-xs font-bold text-[#0b1c30]">
            {job.activeBacklogsAllowed === 0
              ? '0 Active Backlogs (Strict)'
              : `Max ${job.activeBacklogsAllowed} Active Backlogs`}
          </span>
        </div>

        {/* Eligibility Disclaimer Notice */}
        <div className="p-3 bg-[#f8f9ff] border border-[#e2e8f0] rounded-lg text-[11px] text-[#737686] leading-relaxed flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-[#004ac6] shrink-0 mt-0.5" />
          <span>
            Eligibility criteria are verified by the Campus Placement Cell. Official eligibility confirmation occurs during drive registration.
          </span>
        </div>
      </div>
    </Card>
  );
};

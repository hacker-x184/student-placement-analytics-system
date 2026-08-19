import React from 'react';
import { Card } from '../../../../components/common/Card';
import { Job } from '../../../../types';
import { ShieldCheck } from 'lucide-react';

export interface JobCompanyProfileCardProps {
  job: Job;
}

export const JobCompanyProfileCard: React.FC<JobCompanyProfileCardProps> = ({ job }) => {
  return (
    <Card id="job-company-profile-card" variant="default" padding="md" headerTitle="Recruiting Organization">
      <div className="space-y-3 pt-1 text-xs text-[#434655]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-center font-bold text-base text-[#004ac6] shrink-0">
            {job.companyInitial || job.company.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-[#0b1c30] text-sm">{job.company}</h4>
            <p className="text-[11px] text-[#737686]">{job.category} Sector</p>
          </div>
        </div>

        <div className="pt-2 border-t border-[#e2e8f0] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#737686]">Location:</span>
            <span className="font-semibold text-[#0b1c30]">{job.location}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#737686]">Verification:</span>
            <span className="inline-flex items-center gap-1 font-semibold text-[#16a34a]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Partner
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

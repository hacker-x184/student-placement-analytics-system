import React from 'react';
import { Card } from '../../../../components/common/Card';
import { Job } from '../../../../types';
import { Calendar, Clock } from 'lucide-react';

export interface JobScheduleCardProps {
  job: Job;
}

export const JobScheduleCard: React.FC<JobScheduleCardProps> = ({ job }) => {
  return (
    <Card id="job-schedule-card" variant="default" padding="md" headerTitle="Drive Schedule & Timelines">
      <div className="space-y-3 pt-1 text-xs text-[#434655]">
        <div className="flex items-start gap-2.5">
          <Calendar className="w-4 h-4 text-[#004ac6] shrink-0 mt-0.5" />
          <div>
            <span className="text-[#737686] block font-medium">Application Deadline</span>
            <span className="font-bold text-[#0b1c30] text-sm">{job.deadline}</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5 pt-2 border-t border-[#e2e8f0]">
          <Clock className="w-4 h-4 text-[#004ac6] shrink-0 mt-0.5" />
          <div>
            <span className="text-[#737686] block font-medium">Posting Status</span>
            <span className="font-semibold text-[#0b1c30]">{job.postedDate}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

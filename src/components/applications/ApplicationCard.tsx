import React from 'react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Clock, Building2, Calendar } from 'lucide-react';

export interface ApplicationCardProps {
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: string;
  nextStep?: string;
  onViewTimeline?: () => void;
  className?: string;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  jobTitle,
  company,
  appliedDate,
  status,
  nextStep,
  onViewTimeline,
  className = '',
}) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${className}`}
    >
      <div>
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-bold text-slate-900">{jobTitle}</h4>
          <Badge
            variant={
              status === 'Offered'
                ? 'success'
                : status === 'Technical Interview' || status === 'Shortlisted'
                ? 'info'
                : status === 'Rejected'
                ? 'error'
                : 'warning'
            }
            size="sm"
          >
            {status}
          </Badge>
        </div>
        <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
          <Building2 className="w-3.5 h-3.5" />
          <span>{company}</span>
          <span className="text-slate-300">•</span>
          <Calendar className="w-3.5 h-3.5" />
          <span>Applied: {appliedDate}</span>
        </p>
        {nextStep && (
          <p className="text-xs text-blue-700 font-semibold flex items-center gap-1 mt-1.5">
            <Clock className="w-3 h-3" />
            <span>Next: {nextStep}</span>
          </p>
        )}
      </div>

      {onViewTimeline && (
        <Button variant="outline" size="sm" onClick={onViewTimeline}>
          View Milestones
        </Button>
      )}
    </div>
  );
};

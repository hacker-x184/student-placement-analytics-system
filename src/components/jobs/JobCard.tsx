import React from 'react';
import { Briefcase, Building2, MapPin, DollarSign, Calendar } from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export interface JobCardProps {
  title: string;
  company: string;
  location?: string;
  packageStr?: string;
  deadline?: string;
  category?: string;
  isEligible?: boolean;
  onApply?: () => void;
  onViewDetails?: () => void;
  className?: string;
}

export const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  location = 'Hybrid',
  packageStr = '12 - 15 LPA',
  deadline = 'Open',
  category = 'Technology',
  isEligible = true,
  onApply,
  onViewDetails,
  className = '',
}) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between gap-4 ${className}`}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <span className="text-[11px] font-bold text-blue-600 tracking-wider uppercase">
              {category}
            </span>
            <h4 className="text-base font-bold text-slate-900 leading-tight mt-0.5">{title}</h4>
            <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 mt-1">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{company}</span>
              <span className="text-slate-300">•</span>
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{location}</span>
            </p>
          </div>
          <Badge variant={isEligible ? 'success' : 'neutral'} size="sm">
            {isEligible ? 'Eligible' : 'Not Eligible'}
          </Badge>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1 font-bold text-slate-900">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <span>{packageStr}</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1 text-slate-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>Deadline: {deadline}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2">
        {onViewDetails && (
          <Button variant="outline" size="sm" className="flex-1" onClick={onViewDetails}>
            View Role
          </Button>
        )}
        {onApply && (
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={onApply}
            disabled={!isEligible}
          >
            Apply Now
          </Button>
        )}
      </div>
    </div>
  );
};

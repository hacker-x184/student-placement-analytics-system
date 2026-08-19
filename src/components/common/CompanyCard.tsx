import React from 'react';
import { Building2, MapPin, Briefcase, ExternalLink, Users, Award } from 'lucide-react';
import { Company } from '../../types';
import { Badge } from './Badge';
import { Button } from './Button';

export interface CompanyCardProps {
  company: Company;
  onViewCompany?: (company: Company) => void;
  onViewDrives?: (company: Company) => void;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
  onViewCompany,
  onViewDrives,
}) => {
  return (
    <div
      id={`company-card-${company.id}`}
      className="bg-white border border-[#D9DEE3] rounded-[8px] p-4 sm:p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.03)] hover:border-[#B2BAC2] hover:shadow-[0px_2px_6px_rgba(0,0,0,0.04)] transition-all duration-150 flex flex-col justify-between group"
    >
      <div className="space-y-3.5">
        {/* Header: Logo, Name, Industry, Tier Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-[6px] bg-[#E8F3FF] border border-[#B3D7FF] flex items-center justify-center text-[#0A66C2] font-bold text-[13px] shrink-0">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-cover rounded-[6px]"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <span>{company.initial || company.name.charAt(0)}</span>
              )}
            </div>
            <div className="min-w-0">
              <h3
                onClick={() => onViewCompany && onViewCompany(company)}
                className="text-[15px] sm:text-[16px] leading-[22px] font-semibold text-[#1D2226] group-hover:text-[#0A66C2] transition-colors cursor-pointer truncate"
                title={company.name}
              >
                {company.name}
              </h3>
              <p className="text-[13px] text-[#5E6670] font-normal mt-0.5 truncate">
                {company.industry}
              </p>
            </div>
          </div>

          <Badge variant="primary" size="sm">
            {company.tier.split(' ')[0]}
          </Badge>
        </div>

        {/* Location & Package Details */}
        <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-[#D9DEE3] text-[12px]">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-[#7A828A] uppercase tracking-wider block">
              Avg Package
            </span>
            <span className="text-[13px] font-bold text-[#1D2226] block">
              {company.avgPackage}
            </span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-[#7A828A] uppercase tracking-wider block">
              Location
            </span>
            <div className="flex items-center gap-1 text-[#5E6670] truncate">
              <MapPin className="w-3 h-3 text-[#7A828A] shrink-0" />
              <span className="truncate">{company.location}</span>
            </div>
          </div>
        </div>

        {/* Active Drives & Past Recruits */}
        <div className="flex items-center justify-between pt-1 text-[12px] text-[#5E6670]">
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-[#0A66C2]" />
            <span>
              <strong className="text-[#1D2226] font-semibold">{company.activeJobsCount}</strong> active {company.activeJobsCount === 1 ? 'drive' : 'drives'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#057642]" />
            <span>
              <strong className="text-[#1D2226] font-semibold">{company.placedStudentsCount}</strong> hired
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 mt-3 border-t border-[#D9DEE3] flex items-center gap-2">
        {onViewCompany && (
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={() => onViewCompany(company)}
          >
            Overview
          </Button>
        )}
        <Button
          variant="primary"
          size="sm"
          className="flex-1"
          onClick={() => (onViewDrives ? onViewDrives(company) : onViewCompany?.(company))}
        >
          View Drives
        </Button>
      </div>
    </div>
  );
};

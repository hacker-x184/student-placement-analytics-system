import React from 'react';
import { Application } from '../../../../types';
import { Briefcase, BookmarkCheck, Video, CheckCircle2, XCircle } from 'lucide-react';

export interface ApplicationMetricsProps {
  applications: Application[];
  selectedStatus: string;
  onSelectStatus: (status: string) => void;
}

export const ApplicationMetrics: React.FC<ApplicationMetricsProps> = ({
  applications,
  selectedStatus,
  onSelectStatus,
}) => {
  const total = applications.length;
  const appliedCount = applications.filter(
    (a) => a.status === 'Applied' || a.status === 'Under Review'
  ).length;
  const shortlistedCount = applications.filter((a) => a.status === 'Shortlisted').length;
  const interviewCount = applications.filter(
    (a) =>
      a.status === 'Interview' ||
      a.status === 'Technical Interview' ||
      a.status === 'HR Final Round'
  ).length;
  const selectedCount = applications.filter(
    (a) => a.status === 'Selected' || a.status === 'Offered'
  ).length;
  const rejectedCount = applications.filter((a) => a.status === 'Rejected').length;

  const cards = [
    {
      id: 'All',
      label: 'Total Applications',
      count: total,
      icon: <Briefcase className="w-4 h-4 text-[#004ac6]" />,
      bgClass: 'bg-white',
      borderClass: 'border-[#e2e8f0]',
      activeClass: 'ring-2 ring-[#004ac6] border-[#004ac6]',
    },
    {
      id: 'Shortlisted',
      label: 'Shortlisted',
      count: shortlistedCount,
      icon: <BookmarkCheck className="w-4 h-4 text-[#2563eb]" />,
      bgClass: 'bg-white',
      borderClass: 'border-[#e2e8f0]',
      activeClass: 'ring-2 ring-[#2563eb] border-[#2563eb]',
    },
    {
      id: 'Interview',
      label: 'In Interview',
      count: interviewCount,
      icon: <Video className="w-4 h-4 text-amber-600" />,
      bgClass: 'bg-white',
      borderClass: 'border-[#e2e8f0]',
      activeClass: 'ring-2 ring-amber-500 border-amber-500',
    },
    {
      id: 'Selected',
      label: 'Selected / Offers',
      count: selectedCount,
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
      bgClass: 'bg-white',
      borderClass: 'border-[#e2e8f0]',
      activeClass: 'ring-2 ring-emerald-500 border-emerald-500',
    },
    {
      id: 'Rejected',
      label: 'Not Selected',
      count: rejectedCount,
      icon: <XCircle className="w-4 h-4 text-rose-500" />,
      bgClass: 'bg-white',
      borderClass: 'border-[#e2e8f0]',
      activeClass: 'ring-2 ring-rose-500 border-rose-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {cards.map((c) => {
        const isSelected = selectedStatus.toLowerCase() === c.id.toLowerCase();

        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelectStatus(isSelected ? 'All' : c.id)}
            className={`p-3.5 rounded-xl border text-left transition-all duration-150 shadow-xs hover:shadow-sm cursor-pointer ${
              c.bgClass
            } ${isSelected ? c.activeClass : c.borderClass} ${
              isSelected ? 'bg-[#f8f9ff]' : 'hover:bg-[#f8fafc]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#737686] uppercase tracking-wider block truncate">
                {c.label}
              </span>
              <div className="p-1 rounded-lg bg-[#eff4ff] shrink-0">{c.icon}</div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-xl font-black text-[#0b1c30] tracking-tight">{c.count}</span>
              {total > 0 && c.id !== 'All' && (
                <span className="text-[11px] font-medium text-[#737686]">
                  ({Math.round((c.count / total) * 100)}%)
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

import React from 'react';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { Badge } from '../../../components/common/Badge';
import { EmptyState } from '../../../components/common/EmptyState';
import { Application, ApplicationStatus } from '../../../types';
import {
  ArrowRight,
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  BookmarkCheck,
  Video,
  XCircle,
  Briefcase,
} from 'lucide-react';

export interface RecentApplicationsSectionProps {
  applications: Application[];
  onNavigate?: (route: string) => void;
}

export const RecentApplicationsSection: React.FC<RecentApplicationsSectionProps> = ({
  applications,
  onNavigate,
}) => {
  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Offered':
        return (
          <Badge
            variant="success"
            size="sm"
            icon={<CheckCircle2 className="w-3 h-3" />}
          >
            Offer Released
          </Badge>
        );
      case 'Technical Interview':
      case 'HR Final Round':
        return (
          <Badge
            variant="warning"
            size="sm"
            icon={<Video className="w-3 h-3" />}
          >
            {status}
          </Badge>
        );
      case 'Shortlisted':
        return (
          <Badge
            variant="secondary"
            size="sm"
            icon={<BookmarkCheck className="w-3 h-3" />}
          >
            Shortlisted
          </Badge>
        );
      case 'Rejected':
        return (
          <Badge
            variant="danger"
            size="sm"
            icon={<XCircle className="w-3 h-3" />}
          >
            Not Selected
          </Badge>
        );
      case 'Under Review':
      case 'Applied':
      default:
        return (
          <Badge
            variant="neutral"
            size="sm"
            icon={<Clock className="w-3 h-3" />}
          >
            {status}
          </Badge>
        );
    }
  };

  return (
    <Card
      id="dashboard-recent-applications"
      variant="default"
      padding="none"
      className="overflow-hidden"
      headerTitle="Recent Applications"
      headerSubtitle="Track your current application review progress and drive statuses"
      headerAction={
        <Button
          variant="ghost"
          size="sm"
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          onClick={() => onNavigate?.('/applications')}
        >
          View All Applications
        </Button>
      }
    >
      {applications.length === 0 ? (
        <div className="p-6">
          <EmptyState
            icon={<Briefcase className="w-6 h-6 text-[#0A66C2]" />}
            title="No applications yet"
            description="You have not submitted applications to any campus drives yet. Explore active recruitment opportunities to get started."
            actionLabel="Browse Recruitment Drives"
            onAction={() => onNavigate?.('/jobs')}
          />
        </div>
      ) : (
        <div className="divide-y divide-[#D9DEE3]">
          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#F8FAFB] text-[#5E6670] uppercase font-semibold text-[11px] border-b border-[#D9DEE3]">
                <tr>
                  <th className="py-2.5 px-5">Role & Company</th>
                  <th className="py-2.5 px-4">Applied Date</th>
                  <th className="py-2.5 px-4">Application Status</th>
                  <th className="py-2.5 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9DEE3] bg-white">
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => onNavigate?.('/applications')}
                    className="hover:bg-[#F8FAFB] transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-[6px] bg-[#E8F3FF] border border-[#B3D7FF] flex items-center justify-center text-[#0A66C2] font-bold text-[12px] shrink-0">
                          {app.companyInitial || <Building2 className="w-4 h-4 text-[#0A66C2]" />}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-[13px] text-[#1D2226] group-hover:text-[#0A66C2] transition-colors truncate">
                            {app.jobTitle}
                          </p>
                          <p className="text-[12px] text-[#5E6670] truncate font-normal">
                            {app.company}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-[#5E6670]">
                      <div className="flex items-center gap-1.5 font-normal text-[12px]">
                        <Calendar className="w-3.5 h-3.5 text-[#7A828A]" />
                        <span>{app.appliedDate}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      {getStatusBadge(app.status)}
                    </td>

                    <td className="py-3 px-5 text-right">
                      <span className="text-[12px] font-semibold text-[#0A66C2] inline-flex items-center gap-1 group-hover:underline">
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List View */}
          <div className="sm:hidden divide-y divide-[#D9DEE3]">
            {applications.map((app) => (
              <div
                key={app.id}
                onClick={() => onNavigate?.('/applications')}
                className="p-4 hover:bg-[#F8FAFB] transition-colors space-y-2.5 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-[6px] bg-[#E8F3FF] border border-[#B3D7FF] flex items-center justify-center text-[#0A66C2] font-bold text-[12px] shrink-0">
                      {app.companyInitial || <Building2 className="w-4 h-4 text-[#0A66C2]" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[13px] text-[#1D2226]">
                        {app.jobTitle}
                      </h4>
                      <p className="text-[12px] text-[#5E6670]">{app.company}</p>
                    </div>
                  </div>
                  <div>{getStatusBadge(app.status)}</div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#7A828A] pt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Applied: {app.appliedDate}</span>
                  </span>
                  <span className="font-semibold text-[#0A66C2] flex items-center gap-0.5">
                    <span>View Status</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};


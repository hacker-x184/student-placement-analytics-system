import React from 'react';
import { Application, ApplicationStatus } from '../../../../types';
import { Modal } from '../../../../components/common/Modal';
import { Badge } from '../../../../components/common/Badge';
import { Button } from '../../../../components/common/Button';
import { StatusTimeline } from './StatusTimeline';
import {
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Video,
  ExternalLink,
  GraduationCap,
  Clock,
  BookmarkCheck,
  CheckCircle2,
  XCircle,
  FileText,
} from 'lucide-react';

export interface ApplicationDetailsModalProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToJob?: (jobId: string) => void;
}

export const ApplicationDetailsModal: React.FC<ApplicationDetailsModalProps> = ({
  application,
  isOpen,
  onClose,
  onNavigateToJob,
}) => {
  if (!application) return null;

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Selected':
      case 'Offered':
        return (
          <Badge variant="success" size="md" icon={<CheckCircle2 className="w-4 h-4" />}>
            Selected / Offered
          </Badge>
        );
      case 'Interview':
      case 'Technical Interview':
      case 'HR Final Round':
        return (
          <Badge variant="warning" size="md" icon={<Video className="w-4 h-4" />}>
            Interview Scheduled
          </Badge>
        );
      case 'Shortlisted':
        return (
          <Badge variant="secondary" size="md" icon={<BookmarkCheck className="w-4 h-4" />}>
            Shortlisted
          </Badge>
        );
      case 'Rejected':
        return (
          <Badge variant="danger" size="md" icon={<XCircle className="w-4 h-4" />}>
            Rejected
          </Badge>
        );
      case 'Applied':
      case 'Under Review':
      default:
        return (
          <Badge variant="neutral" size="md" icon={<Clock className="w-4 h-4" />}>
            Applied (In Screening)
          </Badge>
        );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Application Specification & Progress"
      subtitle={`Reference ID: ${application.id.toUpperCase()}`}
      maxWidth="xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>

          <div className="flex items-center gap-2">
            {application.jobId && onNavigateToJob && (
              <Button
                variant="primary"
                size="sm"
                rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                onClick={() => {
                  onClose();
                  onNavigateToJob(application.jobId);
                }}
              >
                View Drive Details
              </Button>
            )}
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Top Company & Role Header Card */}
        <div className="p-4 sm:p-5 bg-[#eff4ff] border border-[#dce9ff] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white border border-[#dce9ff] flex items-center justify-center text-[#004ac6] font-bold text-lg shadow-xs shrink-0">
              {application.companyInitial || application.company.charAt(0)}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0b1c30]">
                {application.jobTitle}
              </h3>
              <div className="flex items-center gap-2 text-xs text-[#434655] mt-0.5 flex-wrap">
                <span className="font-semibold text-[#004ac6]">{application.company}</span>
                {application.location && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[#737686]">
                      <MapPin className="w-3 h-3" />
                      {application.location}
                    </span>
                  </>
                )}
                {application.package && (
                  <>
                    <span>•</span>
                    <span className="font-semibold text-[#0b1c30]">{application.package}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="self-start sm:self-auto shrink-0">
            {getStatusBadge(application.status)}
          </div>
        </div>

        {/* Overview Key Application Facts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-[#f8f9ff] border border-[#e2e8f0] rounded-xl space-y-0.5">
            <span className="text-[10px] font-bold text-[#737686] uppercase tracking-wider block">
              Applied Date
            </span>
            <span className="font-bold text-[#0b1c30] flex items-center gap-1.5 text-xs">
              <Calendar className="w-3.5 h-3.5 text-[#004ac6]" />
              {application.appliedDate}
            </span>
          </div>

          <div className="p-3 bg-[#f8f9ff] border border-[#e2e8f0] rounded-xl space-y-0.5">
            <span className="text-[10px] font-bold text-[#737686] uppercase tracking-wider block">
              Candidate
            </span>
            <span className="font-bold text-[#0b1c30] truncate block">
              {application.studentName}
            </span>
          </div>

          <div className="p-3 bg-[#f8f9ff] border border-[#e2e8f0] rounded-xl space-y-0.5 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-bold text-[#737686] uppercase tracking-wider block">
              Academic Record
            </span>
            <span className="font-bold text-[#004ac6] flex items-center gap-1.5 text-xs">
              <GraduationCap className="w-3.5 h-3.5 text-[#004ac6]" />
              {application.studentCgpa ? `${application.studentCgpa.toFixed(1)} CGPA` : '8.7 CGPA'} • {application.studentBranch || 'CSE'}
            </span>
          </div>
        </div>

        {/* Live Interview Meeting Box if in Interview stage */}
        {application.meetingLink && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2.5 text-xs text-amber-900">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-amber-950 text-sm">
                <Video className="w-4 h-4 text-amber-700" />
                <span>Interview Session Details</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded border border-amber-300">
                Action Required
              </span>
            </div>

            {application.interviewScheduledDate && (
              <p className="text-amber-800 font-medium">
                Scheduled: {application.interviewScheduledDate}
              </p>
            )}

            <div className="pt-1 flex items-center gap-2">
              <a
                href={application.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs shadow-xs transition-colors"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Join Virtual Interview Room</span>
              </a>
            </div>
          </div>
        )}

        {/* Status Timeline */}
        <StatusTimeline status={application.status} timeline={application.timeline} />
      </div>
    </Modal>
  );
};

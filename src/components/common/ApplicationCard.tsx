import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Video,
  CheckCircle2,
  Clock,
  BookmarkCheck,
  Building2,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { Application, ApplicationStatus } from '../../types';
import { Button } from './Button';
import { Badge } from './Badge';

export interface ApplicationCardProps {
  application: Application;
  onJoinMeeting?: (link: string) => void;
  onReschedule?: (app: Application) => void;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  onJoinMeeting,
  onReschedule,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(
    application.status === 'Technical Interview' || application.timeline.some((t) => t.actionRequired)
  );

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Technical Interview':
      case 'HR Final Round':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200">
            <Video className="w-3.5 h-3.5" />
            {status}
          </span>
        );
      case 'Shortlisted':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <BookmarkCheck className="w-3.5 h-3.5" />
            Shortlisted
          </span>
        );
      case 'Offered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Offer Released
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            Not Selected
          </span>
        );
      case 'Under Review':
      case 'Applied':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <Clock className="w-3.5 h-3.5" />
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all duration-200">
      {/* Top Header Row */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-5 cursor-pointer hover:bg-slate-50/60 transition-colors flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-sm shrink-0">
            {application.companyInitial || <Building2 className="w-5 h-5 text-slate-500" />}
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-slate-900 truncate">{application.jobTitle}</h3>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span className="font-medium text-slate-700">{application.company}</span>
              <span>•</span>
              <span>Applied: {application.appliedDate}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {getStatusBadge(application.status)}
          <button className="text-slate-400 hover:text-slate-600 p-1">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Progress Timeline */}
      {isExpanded && (
        <div className="px-5 pb-6 pt-2 border-t border-slate-100 bg-slate-50/40">
          <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-4">
            Application Progress
          </h4>

          <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {application.timeline.map((event, index) => {
              const isDone = event.completed;
              const isActive = event.active;
              const hasAction = event.actionRequired;

              return (
                <div key={index} className="relative">
                  {/* Step icon / marker */}
                  <div className="absolute -left-[30px] top-0.5">
                    {isDone ? (
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xs">
                        <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    ) : isActive ? (
                      <div className="w-6 h-6 rounded-full bg-orange-100 border-2 border-orange-500 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-slate-300" />
                    )}
                  </div>

                  {/* Step details */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-slate-900">{event.title}</span>
                      {hasAction && (
                        <span className="text-[10px] uppercase font-bold tracking-wide px-2 py-0.5 bg-orange-100 text-orange-800 rounded-md border border-orange-200">
                          Action Required
                        </span>
                      )}
                    </div>

                    {(event.date || event.time) && (
                      <p className="text-xs text-slate-500 mt-0.5">
                        {event.date} {event.time ? `• ${event.time}` : ''}
                      </p>
                    )}

                    {event.description && (
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{event.description}</p>
                    )}

                    {/* Action buttons (e.g. Join Meeting / Reschedule) */}
                    {hasAction && (
                      <div className="flex flex-wrap items-center gap-2.5 mt-3">
                        <Button
                          size="sm"
                          variant="primary"
                          leftIcon={<Video className="w-3.5 h-3.5" />}
                          onClick={() =>
                            onJoinMeeting
                              ? onJoinMeeting(application.meetingLink || 'https://meet.google.com/spas-placement')
                              : window.open(application.meetingLink || 'https://meet.google.com', '_blank')
                          }
                        >
                          Join Meeting
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onReschedule && onReschedule(application)}
                        >
                          Reschedule
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

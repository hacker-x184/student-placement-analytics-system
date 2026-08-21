import React from 'react';
import { ApplicationStatus, ApplicationTimelineEvent } from '../../../../types';
import { CheckCircle2, Clock, XCircle, Video, Calendar, AlertCircle } from 'lucide-react';

export interface StatusTimelineProps {
  status: ApplicationStatus;
  timeline?: ApplicationTimelineEvent[];
}

const STAGES: ApplicationStatus[] = ['Applied', 'Shortlisted', 'Interview', 'Selected'];

export const StatusTimeline: React.FC<StatusTimelineProps> = ({ status, timeline = [] }) => {
  const isRejected = status === 'Rejected';

  // Find stage index based on current status
  const getStageIndex = (s: ApplicationStatus): number => {
    switch (s) {
      case 'Applied':
      case 'Under Review':
        return 0;
      case 'Shortlisted':
        return 1;
      case 'Interview':
      case 'Technical Interview':
      case 'HR Final Round':
        return 2;
      case 'Selected':
      case 'Offered':
        return 3;
      case 'Rejected':
        return -1;
      default:
        return 0;
    }
  };

  const currentStageIndex = getStageIndex(status);

  return (
    <div className="space-y-6">
      {/* Horizontal Stage Stepper for Standard Progression */}
      <div className="bg-[#f8f9ff] border border-[#e2e8f0] rounded-xl p-4 sm:p-5">
        <h4 className="text-xs font-bold text-[#737686] uppercase tracking-wider mb-4">
          Recruitment Stage Progression
        </h4>

        {isRejected ? (
          <div className="flex items-center gap-3 p-3.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs">
            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <div>
              <p className="font-bold text-sm text-rose-900">Application Concluded (Not Selected)</p>
              <p className="text-xs text-rose-700 mt-0.5">
                The recruitment panel has completed their review for this drive and decided not to proceed further.
              </p>
            </div>
          </div>
        ) : (
          <div className="relative flex items-center justify-between">
            {/* Background connecting line */}
            <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-[#e2e8f0] z-0" />
            
            {/* Active connecting line up to currentStageIndex */}
            <div
              className="absolute left-4 top-1/2 -translate-y-1/2 h-0.5 bg-[#004ac6] transition-all duration-300 z-0"
              style={{
                width: `${(currentStageIndex / (STAGES.length - 1)) * 90}%`,
              }}
            />

            {STAGES.map((stage, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              const isUpcoming = idx > currentStageIndex;

              return (
                <div key={stage} className="relative z-10 flex flex-col items-center group">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 shadow-xs ${
                      isPast
                        ? 'bg-[#004ac6] text-white'
                        : isCurrent
                        ? 'bg-[#eff4ff] text-[#004ac6] ring-4 ring-[#dce9ff] border-2 border-[#004ac6]'
                        : 'bg-white text-[#737686] border-2 border-[#e2e8f0]'
                    }`}
                  >
                    {isPast ? (
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>
                  <span
                    className={`text-[11px] font-semibold mt-2 whitespace-nowrap ${
                      isCurrent
                        ? 'text-[#004ac6] font-bold'
                        : isPast
                        ? 'text-[#0b1c30]'
                        : 'text-[#737686]'
                    }`}
                  >
                    {stage}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detailed Status Event Log & Timeline */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-[#737686] uppercase tracking-wider">
          Timeline Activity & Audit Trail
        </h4>

        <div className="relative pl-6 space-y-4 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-[#e2e8f0]">
          {timeline.map((event, index) => {
            const isDone = event.completed;
            const isActive = event.active;
            const hasAction = event.actionRequired;

            return (
              <div key={index} className="relative">
                {/* Node icon */}
                <div className="absolute -left-[30px] top-0.5">
                  {isDone ? (
                    <div className="w-6 h-6 rounded-full bg-[#004ac6] flex items-center justify-center text-white shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  ) : isActive ? (
                    <div className="w-6 h-6 rounded-full bg-amber-50 border-2 border-amber-500 flex items-center justify-center shadow-xs">
                      <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-[#e2e8f0] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#737686]" />
                    </div>
                  )}
                </div>

                {/* Event info card */}
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-3.5 space-y-1 shadow-xs">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#0b1c30]">{event.title}</span>
                      {hasAction && (
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-amber-50 text-amber-800 rounded border border-amber-200">
                          Action Required
                        </span>
                      )}
                    </div>

                    {(event.date || event.time) && (
                      <span className="text-[11px] font-medium text-[#737686] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#737686]" />
                        <span>
                          {event.date} {event.time ? `• ${event.time}` : ''}
                        </span>
                      </span>
                    )}
                  </div>

                  {event.description && (
                    <p className="text-xs text-[#434655] leading-relaxed pt-0.5">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

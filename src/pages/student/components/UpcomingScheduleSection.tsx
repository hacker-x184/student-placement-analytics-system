import React from 'react';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { Badge } from '../../../components/common/Badge';
import { UpcomingActivity } from '../../../services/dashboardService';
import {
  Calendar,
  Clock,
  Video,
  FileCode2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export interface UpcomingScheduleSectionProps {
  activities: UpcomingActivity[];
  onNavigate?: (route: string) => void;
}

export const UpcomingScheduleSection: React.FC<UpcomingScheduleSectionProps> = ({
  activities,
  onNavigate,
}) => {
  const getActivityIcon = (type: UpcomingActivity['type']) => {
    switch (type) {
      case 'interview':
        return <Video className="w-4 h-4 text-[#915907]" />;
      case 'assessment':
        return <FileCode2 className="w-4 h-4 text-[#0A66C2]" />;
      case 'deadline':
      default:
        return <Clock className="w-4 h-4 text-[#CC1016]" />;
    }
  };

  const getActivityBadge = (type: UpcomingActivity['type']) => {
    switch (type) {
      case 'interview':
        return (
          <Badge variant="warning" size="sm">
            Interview
          </Badge>
        );
      case 'assessment':
        return (
          <Badge variant="primary" size="sm">
            Online Test
          </Badge>
        );
      case 'deadline':
      default:
        return (
          <Badge variant="danger" size="sm">
            Drive Deadline
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-5">
      {/* 1. Schedule & Drive Milestones */}
      <Card
        id="dashboard-upcoming-schedule"
        variant="default"
        padding="none"
        headerTitle="Upcoming Activity"
        headerSubtitle="Interviews, assessments, and drive deadlines"
      >
        <div className="divide-y divide-[#D9DEE3]">
          {activities.length === 0 ? (
            <div className="p-5 text-center text-[12px] text-[#5E6670]">
              No upcoming interviews or pending assessments scheduled.
            </div>
          ) : (
            activities.map((act) => (
              <div
                key={act.id}
                className="p-3.5 hover:bg-[#F8FAFB] transition-colors space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="p-1.5 rounded-[6px] bg-[#F3F6F8] border border-[#D9DEE3] shrink-0 mt-0.5">
                      {getActivityIcon(act.type)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-[13px] text-[#1D2226] leading-tight">
                        {act.title}
                      </h4>
                      <p className="text-[12px] text-[#5E6670] font-normal mt-0.5">
                        {act.company}
                      </p>
                    </div>
                  </div>
                  <div>{getActivityBadge(act.type)}</div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-[#7A828A]">
                  <div className="flex items-center gap-1 font-medium text-[#5E6670]">
                    <Calendar className="w-3.5 h-3.5 text-[#7A828A]" />
                    <span>{act.date}</span>
                    {act.time && (
                      <>
                        <span>•</span>
                        <span>{act.time}</span>
                      </>
                    )}
                  </div>

                  {act.actionRequired && act.locationOrLink && (
                    <a
                      href={act.locationOrLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] bg-[#E8F3FF] text-[#0A66C2] border border-[#B3D7FF] text-[11px] font-semibold hover:bg-[#d0e5ff] transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Join Session</span>
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* 2. Placement Readiness & Intelligence Card */}
      <div
        id="dashboard-readiness-widget"
        className="bg-white border border-[#D9DEE3] rounded-[8px] p-4 sm:p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.03)] space-y-3"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[6px] bg-[#E8F3FF] border border-[#B3D7FF] text-[#0A66C2] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-[#1D2226]">
                Placement Readiness
              </h4>
              <p className="text-[11px] text-[#5E6670]">Intelligence & Eligibility</p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-[#057642] bg-[#E7F5EE] border border-[#A2DCBF] px-2 py-0.5 rounded-[4px]">
            92% Likelihood
          </span>
        </div>

        <p className="text-[12px] text-[#5E6670] leading-relaxed">
          Your profile and academic credentials meet eligibility for <strong className="text-[#1D2226]">88%</strong> of active campus recruitment drives.
        </p>

        <div className="pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate?.('/prediction')}
            rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
            className="w-full justify-between"
          >
            <span>Run Placement Predictor</span>
          </Button>
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { Card } from '../../../../components/common/Card';

export interface SelectionRound {
  step: number;
  title: string;
  type: string;
  description: string;
}

export interface JobSelectionStagesCardProps {
  rounds?: SelectionRound[];
}

const DEFAULT_ROUNDS: SelectionRound[] = [
  {
    step: 1,
    title: 'Online Technical Assessment',
    type: 'Aptitude & DSA Coding (90 Mins)',
    description: 'Covers core algorithmic problem solving, quantitative aptitude, and object-oriented concepts.',
  },
  {
    step: 2,
    title: 'Technical Interview Round I',
    type: 'Live Coding & System Discussion (45 Mins)',
    description: 'Hands-on architectural questions, project deep dive, and live coding exercises.',
  },
  {
    step: 3,
    title: 'HR & Leadership Evaluation',
    type: 'Behavioral & Fitment (30 Mins)',
    description: 'Discussion on team collaboration, problem solving approach, and employment terms.',
  },
];

export const JobSelectionStagesCard: React.FC<JobSelectionStagesCardProps> = ({
  rounds = DEFAULT_ROUNDS,
}) => {
  return (
    <Card
      id="job-selection-stages-card"
      variant="default"
      padding="md"
      headerTitle="Recruitment Selection Stages"
      headerSubtitle="Standard on-campus evaluation procedure"
    >
      <div className="space-y-4 pt-1">
        {rounds.map((round) => (
          <div
            key={round.step}
            className="flex items-start gap-4 p-3.5 rounded-lg border border-[#e2e8f0] bg-[#f8f9ff]/50"
          >
            <div className="w-8 h-8 rounded-full bg-[#004ac6] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
              {round.step}
            </div>
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4 className="text-sm font-bold text-[#0b1c30]">{round.title}</h4>
                <span className="text-xs font-semibold text-[#004ac6] bg-[#eff4ff] px-2 py-0.5 rounded border border-[#dce9ff] self-start sm:self-auto">
                  {round.type}
                </span>
              </div>
              <p className="text-xs text-[#434655] leading-relaxed">{round.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

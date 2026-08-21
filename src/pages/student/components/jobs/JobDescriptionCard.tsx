import React from 'react';
import { Card } from '../../../../components/common/Card';
import { Job } from '../../../../types';
import { CheckCircle2 } from 'lucide-react';

export interface JobDescriptionCardProps {
  job: Job;
}

export const JobDescriptionCard: React.FC<JobDescriptionCardProps> = ({ job }) => {
  return (
    <div className="space-y-6">
      {/* Job Overview & Description */}
      <Card
        id="job-overview-card"
        variant="default"
        padding="md"
        headerTitle="Role Overview & Specifications"
        headerSubtitle="Comprehensive scope and departmental expectations"
      >
        <div className="space-y-4 text-sm text-[#434655] leading-relaxed pt-1">
          <p>{job.description}</p>
        </div>
      </Card>

      {/* Key Responsibilities */}
      {job.responsibilities && job.responsibilities.length > 0 && (
        <Card
          id="job-responsibilities-card"
          variant="default"
          padding="md"
          headerTitle="Key Responsibilities & Scope"
          headerSubtitle="Core deliverables for this position"
        >
          <ul className="space-y-3 pt-1 text-sm text-[#434655]">
            {job.responsibilities.map((resp, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-center text-[#004ac6] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="leading-snug">{resp}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Skills Breakdown (Required & Preferred) */}
      <Card
        id="job-skills-framework-card"
        variant="default"
        padding="md"
        headerTitle="Skill Competency Framework"
        headerSubtitle="Required core proficiencies and preferred domain knowledge"
      >
        <div className="space-y-5 pt-1">
          {/* Required Skills */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#0b1c30] uppercase tracking-wider">
                Mandatory Technical Skills
              </span>
              <span className="text-[11px] text-[#737686]">
                (Evaluated in Round 1 & Round 2)
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-[#eff4ff] text-[#004ac6] text-xs font-semibold rounded-lg border border-[#dce9ff] shadow-2xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Preferred Skills */}
          {job.preferredSkills && job.preferredSkills.length > 0 && (
            <div className="space-y-2.5 pt-4 border-t border-[#e2e8f0]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#434655] uppercase tracking-wider">
                  Preferred / Bonus Skills
                </span>
                <span className="text-[11px] text-[#737686]">
                  (Value additions for candidate ranking)
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {job.preferredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-[#f8f9ff] text-[#434655] text-xs font-medium rounded-lg border border-[#e2e8f0]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

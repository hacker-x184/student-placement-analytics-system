import React from 'react';
import { Card } from '../../../../components/common/Card';
import { Input } from '../../../../components/common/Input';
import { Select } from '../../../../components/common/Select';
import { StudentProfile } from '../../../../types';
import { GraduationCap, Calendar, Award, AlertCircle, CheckCircle2 } from 'lucide-react';
import { BRANCH_OPTIONS } from '../../../../utils/constants';

export interface AcademicInfoSectionProps {
  profile: StudentProfile;
  isEditing: boolean;
  errors: Record<string, string>;
  onChange: (field: keyof StudentProfile, value: any) => void;
}

export const AcademicInfoSection: React.FC<AcademicInfoSectionProps> = ({
  profile,
  isEditing,
  errors,
  onChange,
}) => {
  const branchOptions = BRANCH_OPTIONS.map((b) => ({ value: b, label: b }));

  const batchYearOptions = [
    { value: '2024', label: '2024 (Graduating)' },
    { value: '2025', label: '2025' },
    { value: '2026', label: '2026' },
    { value: '2027', label: '2027 (Active Recruitment)' },
    { value: '2028', label: '2028' },
  ];

  return (
    <Card
      id="profile-academic-info-card"
      variant="default"
      padding="md"
      headerTitle="Academic Information"
      headerSubtitle="Official university records, branch qualification, and academic performance"
    >
      {isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            id="select-branch"
            label="Department / Branch"
            options={branchOptions}
            value={profile.branch}
            onChange={(e) => onChange('branch', e.target.value)}
            error={errors.branch}
            required
          />

          <Select
            id="select-batch-year"
            label="Graduation Batch Year"
            options={batchYearOptions}
            value={profile.batchYear.toString()}
            onChange={(e) => onChange('batchYear', parseInt(e.target.value, 10))}
            error={errors.batchYear}
            required
          />

          <Input
            id="input-cgpa"
            label="Cumulative GPA (Scale: 0.0 – 10.0)"
            type="number"
            step="0.01"
            min="0"
            max="10"
            value={profile.cgpa.toString()}
            onChange={(e) => onChange('cgpa', parseFloat(e.target.value))}
            error={errors.cgpa}
            required
            helperText="Official university verified CGPA out of 10.0"
            leftIcon={<Award className="w-4 h-4 text-[#737686]" />}
          />

          <Input
            id="input-backlogs"
            label="Active Backlogs Count"
            type="number"
            step="1"
            min="0"
            value={profile.backlogs.toString()}
            onChange={(e) => onChange('backlogs', parseInt(e.target.value, 10))}
            error={errors.backlogs}
            required
            helperText="Total standing or active backlogs"
            leftIcon={<AlertCircle className="w-4 h-4 text-[#737686]" />}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="bg-[#f8f9ff] border border-[#e2e8f0] rounded-lg p-3.5 space-y-1">
            <span className="text-xs font-semibold text-[#737686] uppercase tracking-wider block">
              Department / Branch
            </span>
            <div className="flex items-center gap-2 text-[#0b1c30] font-semibold text-sm">
              <GraduationCap className="w-4 h-4 text-[#004ac6] shrink-0" />
              <span className="truncate">{profile.branch || '—'}</span>
            </div>
          </div>

          <div className="bg-[#f8f9ff] border border-[#e2e8f0] rounded-lg p-3.5 space-y-1">
            <span className="text-xs font-semibold text-[#737686] uppercase tracking-wider block">
              Graduation Batch
            </span>
            <div className="flex items-center gap-2 text-[#0b1c30] font-semibold text-sm">
              <Calendar className="w-4 h-4 text-[#004ac6] shrink-0" />
              <span>Class of {profile.batchYear}</span>
            </div>
          </div>

          <div className="bg-[#eff4ff] border border-[#dce9ff] rounded-lg p-3.5 space-y-1">
            <span className="text-xs font-semibold text-[#004ac6] uppercase tracking-wider block">
              Cumulative CGPA
            </span>
            <div className="flex items-center gap-2 text-[#004ac6] font-bold text-base">
              <Award className="w-4 h-4 text-[#004ac6] shrink-0" />
              <span>{profile.cgpa.toFixed(2)} / 10.0</span>
            </div>
          </div>

          <div
            className={`rounded-lg p-3.5 space-y-1 border ${
              profile.backlogs === 0
                ? 'bg-[rgba(22,163,74,0.06)] border-[rgba(22,163,74,0.2)]'
                : 'bg-[rgba(186,26,26,0.06)] border-[rgba(186,26,26,0.2)]'
            }`}
          >
            <span
              className={`text-xs font-semibold uppercase tracking-wider block ${
                profile.backlogs === 0 ? 'text-[#16a34a]' : 'text-[#ba1a1a]'
              }`}
            >
              Active Backlogs
            </span>
            <div className="flex items-center gap-2 font-bold text-sm">
              {profile.backlogs === 0 ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" />
                  <span className="text-[#16a34a]">0 (All Cleared)</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-[#ba1a1a] shrink-0" />
                  <span className="text-[#ba1a1a]">{profile.backlogs} Active</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

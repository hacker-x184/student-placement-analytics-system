import React from 'react';
import { Button } from '../../../../components/common/Button';
import { Badge } from '../../../../components/common/Badge';
import { StudentProfile } from '../../../../types';
import {
  User,
  CheckCircle2,
  Edit3,
  Save,
  X,
  Sparkles,
  GraduationCap,
  Briefcase,
} from 'lucide-react';

export interface ProfileHeaderProps {
  profile: StudentProfile;
  isEditing: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  isEditing,
  isSaving,
  onEdit,
  onSave,
  onCancel,
}) => {
  // Calculate completion percentage based on filled profile attributes
  const calculateCompletion = (): number => {
    let score = 0;
    if (profile.name) score += 15;
    if (profile.email) score += 15;
    if (profile.phone) score += 10;
    if (profile.branch && profile.batchYear) score += 15;
    if (profile.cgpa !== undefined && profile.cgpa > 0) score += 15;
    if (profile.skills && profile.skills.length > 0) score += 10;
    if (profile.projects && profile.projects.length > 0) score += 10;
    if (profile.internships && profile.internships.length > 0) score += 5;
    if (profile.certifications && profile.certifications.length > 0) score += 5;
    return Math.min(score, 100);
  };

  const completion = calculateCompletion();

  const getPlacementBadge = (status: StudentProfile['placementStatus']) => {
    switch (status) {
      case 'Placed':
        return (
          <Badge variant="success" size="md" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
            Placed ({profile.placedCompany || 'Campus Selected'})
          </Badge>
        );
      case 'In Process':
        return (
          <Badge variant="warning" size="md" icon={<Sparkles className="w-3.5 h-3.5" />}>
            In Active Recruitment
          </Badge>
        );
      case 'Seeking':
      default:
        return (
          <Badge variant="primary" size="md" icon={<GraduationCap className="w-3.5 h-3.5" />}>
            Seeking Placement
          </Badge>
        );
    }
  };

  return (
    <div
      id="profile-header-card"
      className="bg-white border border-[#e2e8f0] rounded-xl p-5 sm:p-6 shadow-[0px_1px_3px_rgba(15,23,42,0.05)] space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        {/* Left: Avatar & Identity */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#eff4ff] border-2 border-[#dce9ff] text-[#004ac6] font-bold text-xl sm:text-2xl flex items-center justify-center overflow-hidden shadow-xs shrink-0">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to initial if image fails
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <span>{profile.name.charAt(0) || 'S'}</span>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#16a34a] border-2 border-white flex items-center justify-center">
              <CheckCircle2 className="w-3 h-3 text-white" />
            </div>
          </div>

          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0b1c30] tracking-tight truncate">
                {profile.name}
              </h1>
              {getPlacementBadge(profile.placementStatus)}
            </div>
            <p className="text-xs sm:text-sm text-[#434655] font-normal flex items-center gap-2">
              <span>{profile.branch}</span>
              <span>•</span>
              <span>Batch of {profile.batchYear}</span>
            </p>
            <p className="text-xs text-[#737686]">
              Verified Candidate ID: <span className="font-mono text-[#0b1c30]">{profile.id}</span>
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {!isEditing ? (
            <Button
              id="profile-edit-btn"
              variant="primary"
              size="md"
              leftIcon={<Edit3 className="w-4 h-4" />}
              onClick={onEdit}
              className="w-full sm:w-auto"
            >
              Edit Profile
            </Button>
          ) : (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                id="profile-cancel-btn"
                variant="outline"
                size="md"
                leftIcon={<X className="w-4 h-4" />}
                onClick={onCancel}
                disabled={isSaving}
                className="flex-1 sm:flex-initial"
              >
                Cancel
              </Button>
              <Button
                id="profile-save-btn"
                variant="primary"
                size="md"
                leftIcon={<Save className="w-4 h-4" />}
                onClick={onSave}
                loading={isSaving}
                className="flex-1 sm:flex-initial"
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Completion Bar */}
      <div className="pt-4 border-t border-[#e2e8f0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#f8f9ff] -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-4 sm:p-5 rounded-b-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#0b1c30]">Profile Completion</span>
            <span className="text-xs font-bold text-[#004ac6] bg-[#eff4ff] border border-[#dce9ff] px-2 py-0.5 rounded-full">
              {completion}% Complete
            </span>
          </div>
          <p className="text-[11px] text-[#737686]">
            Complete all academic, technical skills, and project fields for maximum recruiter visibility.
          </p>
        </div>

        <div className="w-full sm:w-48 bg-[#e2e8f0] h-2.5 rounded-full overflow-hidden shrink-0">
          <div
            className="bg-[#2563eb] h-full rounded-full transition-all duration-300"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>
    </div>
  );
};

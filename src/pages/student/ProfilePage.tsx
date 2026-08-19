import React, { useState, useEffect } from 'react';
import { studentService } from '../../services/studentService';
import { StudentProfile } from '../../types';
import { useToast } from '../../context/ToastContext';
import { ProfileHeader } from './components/profile/ProfileHeader';
import { PersonalInfoSection } from './components/profile/PersonalInfoSection';
import { AcademicInfoSection } from './components/profile/AcademicInfoSection';
import { SkillsSection } from './components/profile/SkillsSection';
import { ProjectsSection, ProjectItem } from './components/profile/ProjectsSection';
import { InternshipsSection, InternshipItem } from './components/profile/InternshipsSection';
import { CertificationsSection, CertificationItem } from './components/profile/CertificationsSection';
import { ProfileSkeleton } from './components/profile/ProfileSkeleton';
import { ErrorState } from '../../components/common/ErrorState';
import { isValidEmail, isValidCgpa, isValidBacklogs, isNotEmpty } from '../../utils/validation';

export interface ProfilePageProps {
  onNavigate?: (route: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { success, error: toastError } = useToast();

  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [originalProfile, setOriginalProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const loadProfile = async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const data = await studentService.getProfile();
      setProfile(data);
      setOriginalProfile(JSON.parse(JSON.stringify(data)));
    } catch (err: any) {
      setFetchError(
        err?.message || 'Unable to retrieve your student placement profile. Please check your connection.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleStartEdit = () => {
    setValidationErrors({});
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    if (originalProfile) {
      setProfile(JSON.parse(JSON.stringify(originalProfile)));
    }
    setValidationErrors({});
    setIsEditing(false);
  };

  const validate = (): boolean => {
    if (!profile) return false;
    const errors: Record<string, string> = {};

    if (!isNotEmpty(profile.name)) {
      errors.name = 'Full name is required.';
    }

    if (!isNotEmpty(profile.email)) {
      errors.email = 'Email address is required.';
    } else if (!isValidEmail(profile.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!isNotEmpty(profile.branch)) {
      errors.branch = 'Department / Branch is required.';
    }

    if (profile.batchYear === undefined || isNaN(profile.batchYear)) {
      errors.batchYear = 'Graduation batch year is required.';
    }

    if (profile.cgpa === undefined || isNaN(profile.cgpa)) {
      errors.cgpa = 'CGPA is required.';
    } else if (!isValidCgpa(profile.cgpa)) {
      errors.cgpa = 'CGPA must be a valid number between 0.0 and 10.0';
    }

    if (profile.backlogs === undefined || isNaN(profile.backlogs) || profile.backlogs < 0) {
      errors.backlogs = 'Active backlogs must be 0 or a positive integer.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (!profile) return;

    if (!validate()) {
      toastError('Please resolve all validation errors before saving.', 'Invalid Input');
      return;
    }

    setIsSaving(true);
    try {
      const updated = await studentService.updateProfile(profile);
      setProfile(updated);
      setOriginalProfile(JSON.parse(JSON.stringify(updated)));
      setIsEditing(false);
      setValidationErrors({});
      success('Profile updated successfully', 'Changes Saved');
    } catch (err: any) {
      toastError(err?.message || 'Failed to update profile. Please try again.', 'Update Failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangeField = (field: keyof StudentProfile, value: any) => {
    if (!profile) return;
    setProfile({
      ...profile,
      [field]: value,
    });
    // Clear inline error when typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Skill management
  const handleAddSkill = (skill: string) => {
    if (!profile) return;
    setProfile({
      ...profile,
      skills: [...profile.skills, skill],
    });
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    if (!profile) return;
    setProfile({
      ...profile,
      skills: profile.skills.filter((s) => s !== skillToRemove),
    });
  };

  // Project management
  const handleAddProject = (newProj: Omit<ProjectItem, 'id'>) => {
    if (!profile) return;
    const projectWithId: ProjectItem = {
      ...newProj,
      id: `proj-${Date.now()}`,
    };
    setProfile({
      ...profile,
      projects: [...profile.projects, projectWithId],
    });
    success('Project added successfully');
  };

  const handleRemoveProject = (id: string) => {
    if (!profile) return;
    setProfile({
      ...profile,
      projects: profile.projects.filter((p) => p.id !== id),
    });
    success('Project removed');
  };

  // Internship management
  const handleAddInternship = (newIntern: Omit<InternshipItem, 'id'>) => {
    if (!profile) return;
    const internshipWithId: InternshipItem = {
      ...newIntern,
      id: `intern-${Date.now()}`,
    };
    setProfile({
      ...profile,
      internships: [...profile.internships, internshipWithId],
    });
    success('Internship experience added');
  };

  const handleRemoveInternship = (id: string) => {
    if (!profile) return;
    setProfile({
      ...profile,
      internships: profile.internships.filter((i) => i.id !== id),
    });
    success('Internship experience removed');
  };

  // Certification management
  const handleAddCertification = (newCert: Omit<CertificationItem, 'id'>) => {
    if (!profile) return;
    const certWithId: CertificationItem = {
      ...newCert,
      id: `cert-${Date.now()}`,
    };
    setProfile({
      ...profile,
      certifications: [...profile.certifications, certWithId],
    });
    success('Certification added');
  };

  const handleRemoveCertification = (id: string) => {
    if (!profile) return;
    setProfile({
      ...profile,
      certifications: profile.certifications.filter((c) => c.id !== id),
    });
    success('Certification removed');
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (fetchError || !profile) {
    return (
      <div className="py-12 max-w-xl mx-auto">
        <ErrorState
          title="Profile Unavailable"
          message={fetchError || 'Unable to load your student profile.'}
          onRetry={loadProfile}
        />
      </div>
    );
  }

  return (
    <div id="student-profile-page" className="space-y-6 max-w-[1280px] mx-auto">
      {/* 1. Profile Header & Completion Bar */}
      <ProfileHeader
        profile={profile}
        isEditing={isEditing}
        isSaving={isSaving}
        onEdit={handleStartEdit}
        onSave={handleSaveChanges}
        onCancel={handleCancelEdit}
      />

      {/* 2. Personal & Academic Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <PersonalInfoSection
          profile={profile}
          isEditing={isEditing}
          errors={validationErrors}
          onChange={handleChangeField}
        />

        <AcademicInfoSection
          profile={profile}
          isEditing={isEditing}
          errors={validationErrors}
          onChange={handleChangeField}
        />
      </div>

      {/* 3. Technical Skills & Competencies */}
      <SkillsSection
        skills={profile.skills}
        isEditing={isEditing}
        onAddSkill={handleAddSkill}
        onRemoveSkill={handleRemoveSkill}
      />

      {/* 4. Technical Projects */}
      <ProjectsSection
        projects={profile.projects}
        isEditing={isEditing}
        onAddProject={handleAddProject}
        onRemoveProject={handleRemoveProject}
      />

      {/* 5. Internships & Work Experience */}
      <InternshipsSection
        internships={profile.internships}
        isEditing={isEditing}
        onAddInternship={handleAddInternship}
        onRemoveInternship={handleRemoveInternship}
      />

      {/* 6. Certifications & Accreditations */}
      <CertificationsSection
        certifications={profile.certifications}
        isEditing={isEditing}
        onAddCertification={handleAddCertification}
        onRemoveCertification={handleRemoveCertification}
      />
    </div>
  );
};

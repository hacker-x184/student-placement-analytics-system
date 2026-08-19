import React from 'react';
import { Card } from '../../../../components/common/Card';
import { Input } from '../../../../components/common/Input';
import { StudentProfile } from '../../../../types';
import { User, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

export interface PersonalInfoSectionProps {
  profile: StudentProfile;
  isEditing: boolean;
  errors: Record<string, string>;
  onChange: (field: keyof StudentProfile, value: any) => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  profile,
  isEditing,
  errors,
  onChange,
}) => {
  return (
    <Card
      id="profile-personal-info-card"
      variant="default"
      padding="md"
      headerTitle="Personal Information"
      headerSubtitle="Candidate contact details and placement correspondence information"
    >
      {isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="input-full-name"
            label="Full Name"
            value={profile.name}
            onChange={(e) => onChange('name', e.target.value)}
            error={errors.name}
            required
            leftIcon={<User className="w-4 h-4 text-[#737686]" />}
            placeholder="e.g. Lucky"
          />

          <Input
            id="input-email"
            label="Email Address"
            type="email"
            value={profile.email}
            onChange={(e) => onChange('email', e.target.value)}
            error={errors.email}
            required
            leftIcon={<Mail className="w-4 h-4 text-[#737686]" />}
            placeholder="e.g. lucky@college.edu"
          />

          <Input
            id="input-phone"
            label="Phone Number"
            type="tel"
            value={profile.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            error={errors.phone}
            leftIcon={<Phone className="w-4 h-4 text-[#737686]" />}
            placeholder="e.g. +1 (555) 349-8821"
          />

          <Input
            id="input-address"
            label="Campus Address / Location"
            value={profile.address}
            onChange={(e) => onChange('address', e.target.value)}
            error={errors.address}
            leftIcon={<MapPin className="w-4 h-4 text-[#737686]" />}
            placeholder="e.g. 124 Academic Way, Tech Campus"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#737686] uppercase tracking-wider block">
              Full Name
            </span>
            <div className="flex items-center gap-2 text-[#0b1c30] font-medium">
              <User className="w-4 h-4 text-[#004ac6] shrink-0" />
              <span>{profile.name || '—'}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#737686] uppercase tracking-wider block">
              Email Address
            </span>
            <div className="flex items-center gap-2 text-[#0b1c30] font-medium">
              <Mail className="w-4 h-4 text-[#004ac6] shrink-0" />
              <span className="truncate">{profile.email || '—'}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#737686] uppercase tracking-wider block">
              Phone Number
            </span>
            <div className="flex items-center gap-2 text-[#0b1c30] font-medium">
              <Phone className="w-4 h-4 text-[#004ac6] shrink-0" />
              <span>{profile.phone || '—'}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#737686] uppercase tracking-wider block">
              Campus Address / Location
            </span>
            <div className="flex items-center gap-2 text-[#0b1c30] font-medium">
              <MapPin className="w-4 h-4 text-[#004ac6] shrink-0" />
              <span className="truncate">{profile.address || '—'}</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Badge } from '../../components/common/Badge';
import { Toast } from '../../components/common/Toast';
import {
  Building2,
  Globe,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  Award,
  Users,
  Briefcase,
  CheckCircle2,
  Edit2,
} from 'lucide-react';

interface Props {
  onNavigate?: (route: string) => void;
}

export const CompanyProfilePage: React.FC<Props> = ({ onNavigate }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profile, setProfile] = useState({
    name: 'TechNova Global Solutions',
    industry: 'Enterprise Software & Cloud AI',
    website: 'https://technova.io',
    headquarters: 'Bengaluru, Karnataka, India',
    founded: '2016',
    teamSize: '1,200+ Employees',
    primaryRecruiter: 'Vikram Mehta (VP of Talent Acquisition)',
    recruiterEmail: 'recruiter@technova.com',
    recruiterPhone: '+91 98765 43210',
    description:
      'TechNova builds scalable cloud infrastructure, intelligent developer tooling, and modern distributed SaaS ecosystems serving Fortune 500 enterprises globally.',
    tier: 'Dream Tier (15+ LPA)',
    hiringSeason: '2026–27 Campus Placement Cycle Active',
    affiliatedColleges: 'ABC Institute of Technology, IIT Bombay, BITS Pilani',
  });

  const [toastMessage, setToastMessage] = useState<{ title: string; message: string } | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setToastMessage({
      title: 'Profile Updated',
      message: 'Company profile and recruitment credentials saved successfully.',
    });
  };

  return (
    <div className="space-y-6 max-w-[1240px] mx-auto w-full" id="company-profile-page">
      {toastMessage && (
        <Toast
          variant="success"
          title={toastMessage.title}
          message={toastMessage.message}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* Top Banner Header */}
      <div className="bg-white border border-[#D9DEE3] rounded-[8px] p-5 sm:p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-[8px] bg-[#0A66C2] text-white flex items-center justify-center font-bold text-[20px] shadow-xs shrink-0">
            TN
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[22px] sm:text-[24px] font-bold text-[#1D2226] tracking-tight">
                {profile.name}
              </h1>
              <Badge variant="success" size="sm">
                Verified Recruiter
              </Badge>
            </div>
            <p className="text-[13px] text-[#5E6670] mt-0.5">
              {profile.industry} • {profile.headquarters}
            </p>
          </div>
        </div>

        <Button
          variant={isEditing ? 'ghost' : 'secondary'}
          size="md"
          leftIcon={!isEditing ? <Edit2 className="w-4 h-4" /> : undefined}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </Button>
      </div>

      {/* Form / Profile Content */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Organization Details (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <Card variant="default" className="p-5 sm:p-6 space-y-5">
            <h2 className="text-[16px] font-bold text-[#1D2226] border-b border-[#D9DEE3] pb-3">
              Corporate Overview &amp; Placement Standing
            </h2>

            {isEditing ? (
              <div className="space-y-4 text-[13px]">
                <Input
                  label="Company Name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Industry / Domain"
                    value={profile.industry}
                    onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                  />
                  <Input
                    label="Official Website"
                    value={profile.website}
                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                  />
                </div>
                <Input
                  label="Headquarters"
                  value={profile.headquarters}
                  onChange={(e) => setProfile({ ...profile, headquarters: e.target.value })}
                />
                <div>
                  <label className="block text-[12px] font-semibold text-[#1D2226] mb-1">
                    Company Description
                  </label>
                  <textarea
                    rows={4}
                    value={profile.description}
                    onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                    className="w-full px-3 py-2 text-[13px] bg-white border border-[#D9DEE3] rounded-[6px] outline-none focus:border-[#0A66C2]"
                  />
                </div>
                <div className="flex justify-end pt-2">
                  <Button variant="primary" size="md" type="submit">
                    Save Profile Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-[13px]">
                <p className="text-[#1D2226] leading-relaxed bg-[#F3F6F8] p-4 rounded-[6px] border border-[#D9DEE3]">
                  {profile.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3 border border-[#D9DEE3] rounded-[6px]">
                    <span className="text-[11px] text-[#7A828A] block">Campus Hiring Tier</span>
                    <span className="text-[14px] font-bold text-[#057642]">{profile.tier}</span>
                  </div>
                  <div className="p-3 border border-[#D9DEE3] rounded-[6px]">
                    <span className="text-[11px] text-[#7A828A] block">Workforce Scale</span>
                    <span className="text-[14px] font-bold text-[#1D2226]">{profile.teamSize}</span>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Institutional Affiliations */}
          <Card variant="default" className="p-5 sm:p-6 space-y-4">
            <h3 className="text-[15px] font-bold text-[#1D2226]">
              Institutional Affiliations &amp; College MOU
            </h3>
            <div className="p-4 bg-[#E8F3FF] border border-[#B3D7FF] rounded-[6px] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#0A66C2]" />
                <div>
                  <div className="font-bold text-[#1D2226] text-[13px]">
                    ABC Institute of Technology
                  </div>
                  <div className="text-[11px] text-[#5E6670]">
                    Official Campus Partner • Day-1 Recruitment Slot Verified
                  </div>
                </div>
              </div>
              <Badge variant="success" size="sm">
                Active Cycle
              </Badge>
            </div>
          </Card>
        </div>

        {/* Right Column: Recruiter Contacts (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <Card variant="default" className="p-5 space-y-4">
            <h3 className="text-[15px] font-bold text-[#1D2226] flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#0A66C2]" />
              Talent Acquisition Lead
            </h3>

            <div className="space-y-3 text-[13px]">
              <div className="p-3 bg-[#F3F6F8] rounded-[6px] border border-[#D9DEE3] space-y-1">
                <span className="text-[11px] text-[#7A828A] block">Primary POC</span>
                <span className="font-bold text-[#1D2226] block">{profile.primaryRecruiter}</span>
                <span className="text-[12px] text-[#5E6670] flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#7A828A]" />
                  {profile.recruiterEmail}
                </span>
                <span className="text-[12px] text-[#5E6670] flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#7A828A]" />
                  {profile.recruiterPhone}
                </span>
              </div>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => onNavigate?.('/company/settings')}
              className="w-full"
            >
              Manage Team Access
            </Button>
          </Card>
        </div>
      </form>
    </div>
  );
};

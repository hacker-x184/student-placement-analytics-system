import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Badge } from '../../components/common/Badge';
import { Toast } from '../../components/common/Toast';
import {
  Settings,
  Bell,
  Users,
  Shield,
  Key,
  CheckCircle2,
  Mail,
  Plus,
  Trash2,
} from 'lucide-react';

interface Props {
  onNavigate?: (route: string) => void;
}

export const CompanySettingsPage: React.FC<Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'team' | 'security'>('notifications');
  const [toastMessage, setToastMessage] = useState<{ title: string; message: string } | null>(null);

  // Notification toggles
  const [notifications, setNotifications] = useState({
    newApplicantAlert: true,
    interviewReminder: true,
    placementCellDispatch: true,
    dailyDigest: false,
  });

  // Team Members
  const [teamMembers, setTeamMembers] = useState([
    { id: '1', name: 'Vikram Mehta', email: 'recruiter@technova.com', role: 'Admin / Lead Recruiter' },
    { id: '2', name: 'Arun Kumar', email: 'arun.k@technova.com', role: 'Technical Interviewer' },
    { id: '3', name: 'Kavita Singh', email: 'kavita.s@technova.com', role: 'HR Assessment Specialist' },
  ]);

  const [inviteEmail, setInviteEmail] = useState('');

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setTeamMembers((prev) => [
      ...prev,
      { id: Date.now().toString(), name: 'Invited Member', email: inviteEmail, role: 'Interviewer' },
    ]);
    setInviteEmail('');
    setToastMessage({
      title: 'Invitation Dispatched',
      message: `An invitation link was sent to ${inviteEmail}.`,
    });
  };

  const handleRemoveMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
    setToastMessage({
      title: 'Member Removed',
      message: 'Access credentials revoked.',
    });
  };

  return (
    <div className="space-y-6 max-w-[1240px] mx-auto w-full" id="company-settings-page">
      {toastMessage && (
        <Toast
          variant="success"
          title={toastMessage.title}
          message={toastMessage.message}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* Top Header */}
      <div className="bg-white border border-[#D9DEE3] rounded-[8px] p-5 sm:p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[22px] sm:text-[26px] font-bold text-[#1D2226] tracking-tight">
            Recruiter Account &amp; Workspace Settings
          </h1>
          <p className="text-[13px] text-[#5E6670] mt-0.5">
            Manage your company notifications, recruitment team members, and integration preferences.
          </p>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex border-b border-[#D9DEE3] gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 text-[13px] font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'notifications'
              ? 'border-[#0A66C2] text-[#0A66C2]'
              : 'border-transparent text-[#5E6670] hover:text-[#1D2226]'
          }`}
        >
          Notifications &amp; Alerts
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('team')}
          className={`px-4 py-2 text-[13px] font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'team'
              ? 'border-[#0A66C2] text-[#0A66C2]'
              : 'border-transparent text-[#5E6670] hover:text-[#1D2226]'
          }`}
        >
          Hiring Team &amp; Access
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 text-[13px] font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'security'
              ? 'border-[#0A66C2] text-[#0A66C2]'
              : 'border-transparent text-[#5E6670] hover:text-[#1D2226]'
          }`}
        >
          Security &amp; Keys
        </button>
      </div>

      {/* Tab 1: Notifications */}
      {activeTab === 'notifications' && (
        <Card variant="default" className="p-5 sm:p-6 space-y-5">
          <h3 className="text-[15px] font-bold text-[#1D2226]">
            Placement Communication Preferences
          </h3>

          <div className="space-y-4 text-[13px] divide-y divide-[#D9DEE3]">
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="font-semibold text-[#1D2226] block">
                  New Candidate Application Alert
                </span>
                <span className="text-[12px] text-[#5E6670]">
                  Receive immediate notification when students submit new applications.
                </span>
              </div>
              <input
                type="checkbox"
                checked={notifications.newApplicantAlert}
                onChange={(e) =>
                  setNotifications({ ...notifications, newApplicantAlert: e.target.checked })
                }
                className="w-4 h-4 accent-[#0A66C2] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <span className="font-semibold text-[#1D2226] block">
                  Interview Schedule Reminders
                </span>
                <span className="text-[12px] text-[#5E6670]">
                  Get alerted 30 minutes before candidate technical panel rounds.
                </span>
              </div>
              <input
                type="checkbox"
                checked={notifications.interviewReminder}
                onChange={(e) =>
                  setNotifications({ ...notifications, interviewReminder: e.target.checked })
                }
                className="w-4 h-4 accent-[#0A66C2] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <span className="font-semibold text-[#1D2226] block">
                  Placement Cell Direct Dispatch
                </span>
                <span className="text-[12px] text-[#5E6670]">
                  Synchronize official student eligibility verification logs directly from the TPO.
                </span>
              </div>
              <input
                type="checkbox"
                checked={notifications.placementCellDispatch}
                onChange={(e) =>
                  setNotifications({ ...notifications, placementCellDispatch: e.target.checked })
                }
                className="w-4 h-4 accent-[#0A66C2] cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#D9DEE3] flex justify-end">
            <Button
              variant="primary"
              size="sm"
              onClick={() =>
                setToastMessage({
                  title: 'Preferences Saved',
                  message: 'Notification settings updated.',
                })
              }
            >
              Save Preferences
            </Button>
          </div>
        </Card>
      )}

      {/* Tab 2: Team Members */}
      {activeTab === 'team' && (
        <Card variant="default" className="p-5 sm:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="text-[15px] font-bold text-[#1D2226]">
                Recruitment Team Members
              </h3>
              <p className="text-[12px] text-[#5E6670]">
                Invite colleagues and panel interviewers to evaluate student applications.
              </p>
            </div>

            <form onSubmit={handleInviteMember} className="flex items-center gap-2">
              <input
                type="email"
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="px-3 py-1.5 text-[13px] bg-[#F3F6F8] border border-[#D9DEE3] rounded-[6px] outline-none focus:border-[#0A66C2] w-64 text-[#1D2226]"
              />
              <Button variant="primary" size="sm" type="submit">
                Invite
              </Button>
            </form>
          </div>

          <div className="divide-y divide-[#D9DEE3] border border-[#D9DEE3] rounded-[6px] overflow-hidden text-[13px]">
            {teamMembers.map((member) => (
              <div key={member.id} className="p-3.5 flex items-center justify-between bg-white hover:bg-[#F8FAFB]">
                <div>
                  <div className="font-bold text-[#1D2226]">{member.name}</div>
                  <div className="text-[12px] text-[#5E6670]">{member.email}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 bg-[#F3F6F8] border border-[#D9DEE3] rounded text-[11px] font-semibold text-[#5E6670]">
                    {member.role}
                  </span>
                  {member.role !== 'Admin / Lead Recruiter' && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-[#CC1016] hover:bg-[#FDECEC] p-1.5 rounded cursor-pointer"
                      title="Remove Member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tab 3: Security */}
      {activeTab === 'security' && (
        <Card variant="default" className="p-5 sm:p-6 space-y-4">
          <h3 className="text-[15px] font-bold text-[#1D2226]">
            Authentication &amp; Session Security
          </h3>
          <p className="text-[13px] text-[#5E6670]">
            Your session is secured using institutional token-based authentication.
          </p>

          <div className="p-4 bg-[#F3F6F8] rounded-[6px] border border-[#D9DEE3] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Key className="w-4 h-4 text-[#0A66C2]" />
              <div>
                <span className="font-semibold text-[#1D2226] text-[13px]">
                  Multi-Factor Authentication
                </span>
                <span className="text-[11px] text-[#7A828A] block">
                  Mandatory for all corporate campus recruitment accounts.
                </span>
              </div>
            </div>
            <Badge variant="success" size="sm">
              Enforced
            </Badge>
          </div>
        </Card>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Badge } from '../../components/common/Badge';
import { Toast } from '../../components/common/Toast';
import {
  Settings,
  Shield,
  Bell,
  Sliders,
  Users,
  CheckCircle2,
  Building,
  GraduationCap,
} from 'lucide-react';

interface Props {
  onNavigate?: (route: string) => void;
}

export const AdminSettingsPage: React.FC<Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'policy' | 'notifications' | 'tpoTeam'>('policy');
  const [toastMessage, setToastMessage] = useState<{ title: string; message: string } | null>(null);

  const [policyConfig, setPolicyConfig] = useState({
    academicYear: '2026–2027',
    minCgpaDefault: '7.0',
    maxBacklogsDefault: '0',
    dreamPackageThreshold: '15.0',
    superDreamThreshold: '25.0',
    oneOfferPolicyEnforced: true,
    allowUpgradeTier: true,
    autoVerifyCollegeEmails: true,
  });

  const [tpoMembers, setTpoMembers] = useState([
    { name: 'Dr. Ramesh Kulkarni', role: 'Head of Training & Placement (TPO)', email: 'tpo@college.edu' },
    { name: 'Prof. Anjali Saxena', role: 'CSE Department Placement Coordinator', email: 'anjali.s@college.edu' },
    { name: 'Prof. Sandeep Kumar', role: 'ECE Department Placement Coordinator', email: 'sandeep.k@college.edu' },
  ]);

  const handleSavePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage({
      title: 'Institutional Placement Policy Saved',
      message: 'Placement rules and academic criteria updated for season 2026–2027.',
    });
  };

  return (
    <div className="space-y-6 max-w-[1240px] mx-auto w-full" id="admin-settings-page">
      {toastMessage && (
        <Toast
          variant="success"
          title={toastMessage.title}
          message={toastMessage.message}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* Header */}
      <div className="bg-white border border-[#D9DEE3] rounded-[8px] p-5 sm:p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[22px] sm:text-[26px] font-bold text-[#1D2226] tracking-tight">
            Institutional Placement Cell Configuration
          </h1>
          <p className="text-[13px] text-[#5E6670] mt-0.5">
            Configure academic placement eligibility cutoffs, Dream Tier policies, and institutional coordinator roles.
          </p>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="flex border-b border-[#D9DEE3] gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('policy')}
          className={`px-4 py-2 text-[13px] font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'policy'
              ? 'border-[#0A66C2] text-[#0A66C2]'
              : 'border-transparent text-[#5E6670] hover:text-[#1D2226]'
          }`}
        >
          Placement Policies &amp; Thresholds
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('tpoTeam')}
          className={`px-4 py-2 text-[13px] font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'tpoTeam'
              ? 'border-[#0A66C2] text-[#0A66C2]'
              : 'border-transparent text-[#5E6670] hover:text-[#1D2226]'
          }`}
        >
          TPO Officers &amp; Coordinators
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 text-[13px] font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'notifications'
              ? 'border-[#0A66C2] text-[#0A66C2]'
              : 'border-transparent text-[#5E6670] hover:text-[#1D2226]'
          }`}
        >
          Broadcast &amp; Alerts
        </button>
      </div>

      {/* Policy Configuration Form */}
      {activeTab === 'policy' && (
        <form onSubmit={handleSavePolicy} className="space-y-6">
          <Card variant="default" className="p-5 sm:p-6 space-y-6">
            <h3 className="text-[15px] font-bold text-[#1D2226] border-b border-[#D9DEE3] pb-3">
              Season Academic Rules &amp; Tier Classification
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
              <Input
                label="Active Academic Placement Season"
                value={policyConfig.academicYear}
                onChange={(e) => setPolicyConfig({ ...policyConfig, academicYear: e.target.value })}
              />
              <Input
                label="Default Institution CGPA Floor"
                value={policyConfig.minCgpaDefault}
                onChange={(e) => setPolicyConfig({ ...policyConfig, minCgpaDefault: e.target.value })}
              />
              <Input
                label="Dream Tier Package Minimum (LPA)"
                value={policyConfig.dreamPackageThreshold}
                onChange={(e) =>
                  setPolicyConfig({ ...policyConfig, dreamPackageThreshold: e.target.value })
                }
              />
              <Input
                label="Super Dream Tier Minimum (LPA)"
                value={policyConfig.superDreamThreshold}
                onChange={(e) =>
                  setPolicyConfig({ ...policyConfig, superDreamThreshold: e.target.value })
                }
              />
            </div>

            {/* Policy Toggles */}
            <div className="space-y-3 pt-3 border-t border-[#D9DEE3] text-[13px]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-[#1D2226] block">
                    One-Student-One-Offer Rule
                  </span>
                  <span className="text-[12px] text-[#5E6670]">
                    Once placed in a standard role, student is restricted to Dream/Super-Dream upgrades only.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={policyConfig.oneOfferPolicyEnforced}
                  onChange={(e) =>
                    setPolicyConfig({ ...policyConfig, oneOfferPolicyEnforced: e.target.checked })
                  }
                  className="w-4 h-4 accent-[#0A66C2] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#D9DEE3]">
                <div>
                  <span className="font-semibold text-[#1D2226] block">
                    Allow Super Dream Upgrades
                  </span>
                  <span className="text-[12px] text-[#5E6670]">
                    Allow already-placed students to attend campus drives with 2x higher CTC.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={policyConfig.allowUpgradeTier}
                  onChange={(e) =>
                    setPolicyConfig({ ...policyConfig, allowUpgradeTier: e.target.checked })
                  }
                  className="w-4 h-4 accent-[#0A66C2] cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#D9DEE3] flex justify-end">
              <Button variant="primary" size="md" type="submit">
                Save Season Policy
              </Button>
            </div>
          </Card>
        </form>
      )}

      {/* TPO Team Members Tab */}
      {activeTab === 'tpoTeam' && (
        <Card variant="default" className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9DEE3]">
            <div>
              <h3 className="text-[15px] font-bold text-[#1D2226]">
                Training &amp; Placement Cell Officers
              </h3>
              <p className="text-[12px] text-[#5E6670]">
                Institutional coordinators responsible for verifying company criteria and student rosters.
              </p>
            </div>
          </div>

          <div className="divide-y divide-[#D9DEE3] border border-[#D9DEE3] rounded-[6px] overflow-hidden text-[13px]">
            {tpoMembers.map((m) => (
              <div key={m.email} className="p-3.5 flex items-center justify-between bg-white hover:bg-[#F8FAFB]">
                <div>
                  <div className="font-bold text-[#1D2226]">{m.name}</div>
                  <div className="text-[12px] text-[#5E6670]">{m.role}</div>
                </div>
                <span className="text-[12px] font-semibold text-[#0A66C2]">{m.email}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Broadcast Tab */}
      {activeTab === 'notifications' && (
        <Card variant="default" className="p-5 sm:p-6 space-y-4">
          <h3 className="text-[15px] font-bold text-[#1D2226]">
            Campus Broadcast Channels
          </h3>
          <p className="text-[13px] text-[#5E6670]">
            Automatic notifications are broadcast via SMS and institutional email when recruiters release new eligibility criteria.
          </p>

          <div className="p-4 bg-[#E8F3FF] border border-[#B3D7FF] rounded-[6px] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Bell className="w-5 h-5 text-[#0A66C2]" />
              <div>
                <span className="font-semibold text-[#1D2226] text-[13px]">
                  Institutional Placement Telegram &amp; Email Dispatch
                </span>
                <span className="text-[11px] text-[#5E6670] block">
                  Active for all 1,280 registered final year candidates.
                </span>
              </div>
            </div>
            <Badge variant="success" size="sm">
              Connected
            </Badge>
          </div>
        </Card>
      )}
    </div>
  );
};

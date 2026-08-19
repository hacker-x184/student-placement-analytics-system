import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { Modal } from '../../components/common/Modal';
import { Toast } from '../../components/common/Toast';
import { applicationService } from '../../services/applicationService';
import { Application } from '../../types';
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Eye,
  Building2,
  Calendar,
} from 'lucide-react';

interface Props {
  onNavigate?: (route: string) => void;
}

export const AdminApplicationsPage: React.FC<Props> = ({ onNavigate }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [toastMessage, setToastMessage] = useState<{ title: string; message: string } | null>(null);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        setIsLoading(true);
        const data = await applicationService.getApplications();
        setApplications(data);
      } catch (err) {
        console.error('Failed to load admin applications:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApps();
  }, []);

  const handleUpdateStatus = (appId: string, newStatus: Application['status']) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
    );
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
    setToastMessage({
      title: 'Status Updated',
      message: `Application stage changed to ${newStatus}.`,
    });
  };

  const filteredApps = applications.filter((app) => {
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesSearch =
      !searchQuery ||
      app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusVariant = (st: string) => {
    switch (st) {
      case 'Selected':
        return 'success';
      case 'Shortlisted':
      case 'Interview':
        return 'info';
      case 'Rejected':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="space-y-6 max-w-[1240px] mx-auto w-full" id="admin-applications-page">
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
            Institutional Placement Application Master Registry
          </h1>
          <p className="text-[13px] text-[#5E6670] mt-0.5">
            Audit and moderate all student job applications across participating corporate recruiters.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => onNavigate?.('/admin/placements')}
        >
          View Verified Placements
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-[#D9DEE3] rounded-[8px] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#7A828A] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student, role or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-[13px] bg-[#F3F6F8] border border-[#D9DEE3] rounded-[6px] outline-none focus:border-[#0A66C2] text-[#1D2226] placeholder-[#7A828A]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {(['All', 'Applied', 'Shortlisted', 'Interview', 'Selected', 'Rejected'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-[6px] transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#0A66C2] text-white shadow-xs'
                  : 'bg-[#F3F6F8] text-[#5E6670] hover:bg-[#E8F3FF] hover:text-[#0A66C2]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <Card variant="default" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#F3F6F8] text-[#5E6670] font-semibold text-[11px] uppercase tracking-wider border-b border-[#D9DEE3]">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Drive Role</th>
                <th className="py-3 px-4">Recruiter</th>
                <th className="py-3 px-4">Package</th>
                <th className="py-3 px-4">Applied Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9DEE3]">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-[#F8FAFB] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={app.studentName} size="sm" />
                      <div>
                        <div className="font-bold text-[#1D2226]">{app.studentName}</div>
                        <div className="text-[11px] text-[#7A828A]">{app.studentBranch || 'Engineering'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#1D2226]">
                    {app.jobTitle}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#1D2226]">
                    {app.company}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#057642]">
                    {app.package}
                  </td>
                  <td className="py-3.5 px-4 text-[#5E6670] text-[12px]">
                    {app.appliedDate}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={getStatusVariant(app.status)} size="sm">
                      {app.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant="secondary"
                      size="xs"
                      onClick={() => setSelectedApp(app)}
                    >
                      Review
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Review Modal */}
      {selectedApp && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedApp(null)}
          title={`Review Application: ${selectedApp.studentName}`}
          size="md"
        >
          <div className="space-y-4 text-[13px]">
            <div className="p-3.5 bg-[#F3F6F8] rounded-[6px] border border-[#D9DEE3] space-y-2">
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Student:</span>
                <span className="font-bold text-[#1D2226]">{selectedApp.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Company &amp; Role:</span>
                <span className="font-semibold text-[#1D2226]">{selectedApp.company} — {selectedApp.jobTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Package:</span>
                <span className="font-bold text-[#057642]">{selectedApp.package}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Current Status:</span>
                <Badge variant={getStatusVariant(selectedApp.status)} size="sm">
                  {selectedApp.status}
                </Badge>
              </div>
            </div>

            {/* Moderation Stage Buttons */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A828A] block">
                Moderate Stage
              </span>
              <div className="grid grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedApp.id, 'Shortlisted')}
                  className="px-2 py-1.5 bg-[#E8F3FF] text-[#0A66C2] rounded border border-[#B3D7FF] font-semibold text-[11px] cursor-pointer"
                >
                  Shortlist
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedApp.id, 'Interview')}
                  className="px-2 py-1.5 bg-[#E8F3FF] text-[#0A66C2] rounded border border-[#B3D7FF] font-semibold text-[11px] cursor-pointer"
                >
                  Interview
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedApp.id, 'Selected')}
                  className="px-2 py-1.5 bg-[#E7F5EE] text-[#057642] rounded border border-[#A3E0C2] font-semibold text-[11px] cursor-pointer"
                >
                  Select &amp; Placed
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedApp.id, 'Rejected')}
                  className="px-2 py-1.5 bg-[#FDECEC] text-[#CC1016] rounded border border-[#F8B4B4] font-semibold text-[11px] cursor-pointer"
                >
                  Reject
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-[#D9DEE3]">
              <Button variant="secondary" size="sm" onClick={() => setSelectedApp(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

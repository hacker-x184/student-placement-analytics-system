import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Toast } from '../../components/common/Toast';
import { jobService } from '../../services/jobService';
import { Job } from '../../types';
import {
  Briefcase,
  Search,
  Filter,
  Users,
  Calendar,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Layers,
} from 'lucide-react';

interface Props {
  onNavigate?: (route: string) => void;
}

export const AdminJobsPage: React.FC<Props> = ({ onNavigate }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [toastMessage, setToastMessage] = useState<{ title: string; message: string } | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const data = await jobService.getJobs();
        setJobs(data);
      } catch (err) {
        console.error('Failed to load admin jobs:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleCloseDrive = (jobId: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: 'Closed' } : j))
    );
    setToastMessage({
      title: 'Recruitment Drive Closed',
      message: 'Applications have been closed for this institutional drive.',
    });
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    const matchesSearch =
      !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-[1240px] mx-auto w-full" id="admin-jobs-page">
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
            Institutional Campus Drives &amp; Openings
          </h1>
          <p className="text-[13px] text-[#5E6670] mt-0.5">
            Monitor verified recruiter job openings, CGPA eligibility criteria, student applicant volumes, and deadlines.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => onNavigate?.('/admin/applications')}
        >
          View All Applications
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-[#D9DEE3] rounded-[8px] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#7A828A] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by drive title, company or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-[13px] bg-[#F3F6F8] border border-[#D9DEE3] rounded-[6px] outline-none focus:border-[#0A66C2] text-[#1D2226] placeholder-[#7A828A]"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {(['All', 'Active', 'Closed'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 text-[12px] font-semibold rounded-[6px] transition-colors cursor-pointer ${
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

      {/* Jobs Table */}
      <Card variant="default" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#F3F6F8] text-[#5E6670] font-semibold text-[11px] uppercase tracking-wider border-b border-[#D9DEE3]">
              <tr>
                <th className="py-3 px-4">Drive Title</th>
                <th className="py-3 px-4">Recruiter Company</th>
                <th className="py-3 px-4">Package</th>
                <th className="py-3 px-4">Min CGPA</th>
                <th className="py-3 px-4">Applicants</th>
                <th className="py-3 px-4">Deadline</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9DEE3]">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-[#F8FAFB] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#1D2226]">
                    {job.title}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#1D2226]">
                    {job.company}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#057642]">
                    {job.package}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#1D2226]">
                    {job.minCgpa} / 10
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-[#0A66C2]">
                      {job.applicantsCount || 42} Students
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#5E6670] text-[12px]">
                    {job.deadline}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={job.status === 'Active' ? 'success' : 'neutral'} size="sm">
                      {job.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="secondary"
                        size="xs"
                        onClick={() => setSelectedJob(job)}
                      >
                        Details
                      </Button>
                      {job.status === 'Active' && (
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => handleCloseDrive(job.id)}
                        >
                          Close
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Drive Modal */}
      {selectedJob && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedJob(null)}
          title={`Campus Recruitment Drive: ${selectedJob.title}`}
          size="md"
        >
          <div className="space-y-4 text-[13px]">
            <div className="p-3.5 bg-[#F3F6F8] rounded-[6px] border border-[#D9DEE3] space-y-2">
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Company:</span>
                <span className="font-bold text-[#1D2226]">{selectedJob.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Compensation (CTC):</span>
                <span className="font-bold text-[#057642]">{selectedJob.package}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Eligibility Cutoff:</span>
                <span className="font-semibold text-[#1D2226]">{selectedJob.minCgpa} CGPA (0 Backlogs)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Location:</span>
                <span className="text-[#1D2226]">{selectedJob.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Application Deadline:</span>
                <span className="text-[#1D2226]">{selectedJob.deadline}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A828A]">
                Required Technical Skills
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedJob.requiredSkills?.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 bg-[#E8F3FF] text-[#0A66C2] border border-[#B3D7FF] rounded-[4px] text-[11px] font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-[#D9DEE3]">
              <Button variant="primary" size="sm" onClick={() => setSelectedJob(null)}>
                Done
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

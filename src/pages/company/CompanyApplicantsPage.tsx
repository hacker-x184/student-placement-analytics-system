import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { Modal } from '../../components/common/Modal';
import { Toast } from '../../components/common/Toast';
import {
  Users,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  XCircle,
  Calendar,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Download,
  Mail,
  ExternalLink,
} from 'lucide-react';

interface Props {
  onNavigate?: (route: string) => void;
}

interface ApplicantRecord {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  jobId: string;
  branch: string;
  cgpa: number;
  skills: string[];
  appliedDate: string;
  status: 'Applied' | 'Shortlisted' | 'Interview' | 'Selected' | 'Rejected';
  matchScore: number;
  experience: string;
}

const INITIAL_APPLICANTS: ApplicantRecord[] = [
  {
    id: 'app-1',
    name: 'Lucky Sharma',
    email: 'lucky.s@college.edu',
    jobTitle: 'Software Engineer',
    jobId: 'job-1',
    branch: 'Computer Science & Engineering',
    cgpa: 8.7,
    skills: ['Python', 'React', 'SQL', 'FastAPI', 'Docker'],
    appliedDate: '2026-08-16',
    status: 'Shortlisted',
    matchScore: 98,
    experience: '2 Internships, 3 Web Apps',
  },
  {
    id: 'app-2',
    name: 'Priya Patel',
    email: 'priya.p@college.edu',
    jobTitle: 'Software Engineer',
    jobId: 'job-1',
    branch: 'Information Technology',
    cgpa: 9.1,
    skills: ['Java', 'Spring Boot', 'React', 'PostgreSQL'],
    appliedDate: '2026-08-15',
    status: 'Interview',
    matchScore: 94,
    experience: '1 Fintech Internship',
  },
  {
    id: 'app-3',
    name: 'Rohan Verma',
    email: 'rohan.v@college.edu',
    jobTitle: 'Frontend Engineer',
    jobId: 'job-2',
    branch: 'Computer Science & Engineering',
    cgpa: 8.3,
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Redux'],
    appliedDate: '2026-08-14',
    status: 'Applied',
    matchScore: 89,
    experience: '2 Frontend Projects',
  },
  {
    id: 'app-4',
    name: 'Ananya Deshmukh',
    email: 'ananya.d@college.edu',
    jobTitle: 'Data Analyst',
    jobId: 'job-3',
    branch: 'Electronics & Communication',
    cgpa: 8.8,
    skills: ['Python', 'SQL', 'Tableau', 'Pandas'],
    appliedDate: '2026-08-13',
    status: 'Selected',
    matchScore: 92,
    experience: '1 Analytics Research Paper',
  },
  {
    id: 'app-5',
    name: 'Devendra Joshi',
    email: 'dev.j@college.edu',
    jobTitle: 'Software Engineer',
    jobId: 'job-1',
    branch: 'Information Technology',
    cgpa: 7.6,
    skills: ['C++', 'Python', 'Git'],
    appliedDate: '2026-08-12',
    status: 'Rejected',
    matchScore: 68,
    experience: '1 College Project',
  },
  {
    id: 'app-6',
    name: 'Sneha Roy',
    email: 'sneha.r@college.edu',
    jobTitle: 'Frontend Engineer',
    jobId: 'job-2',
    branch: 'Computer Science & Engineering',
    cgpa: 8.9,
    skills: ['React', 'Next.js', 'TypeScript', 'Figma'],
    appliedDate: '2026-08-17',
    status: 'Applied',
    matchScore: 96,
    experience: 'Freelance UI/UX & React',
  },
];

export const CompanyApplicantsPage: React.FC<Props> = ({ onNavigate }) => {
  const [applicants, setApplicants] = useState<ApplicantRecord[]>(INITIAL_APPLICANTS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [jobFilter, setJobFilter] = useState<string>('All');

  // Candidate dossier modal
  const [selectedCandidate, setSelectedCandidate] = useState<ApplicantRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<{ title: string; message: string; variant?: 'success' | 'warning' } | null>(null);

  const handleUpdateStatus = (id: string, newStatus: ApplicantRecord['status']) => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
    if (selectedCandidate && selectedCandidate.id === id) {
      setSelectedCandidate({ ...selectedCandidate, status: newStatus });
    }
    setToastMessage({
      title: 'Status Updated',
      message: `Candidate stage changed to ${newStatus}.`,
      variant: 'success',
    });
  };

  const filteredApplicants = applicants.filter((app) => {
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesJob = jobFilter === 'All' || app.jobTitle === jobFilter;
    const matchesSearch =
      !searchQuery ||
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      app.branch.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesJob && matchesSearch;
  });

  const getStatusBadgeVariant = (st: string) => {
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
    <div className="space-y-6 max-w-[1240px] mx-auto w-full" id="company-applicants-page">
      {toastMessage && (
        <Toast
          variant={toastMessage.variant || 'success'}
          title={toastMessage.title}
          message={toastMessage.message}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* Top Header */}
      <div className="bg-white border border-[#D9DEE3] rounded-[8px] p-5 sm:p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[22px] sm:text-[26px] font-bold text-[#1D2226] tracking-tight">
            Applicant Review &amp; Candidate Funnel
          </h1>
          <p className="text-[13px] text-[#5E6670] mt-0.5">
            Review student candidates, filter by skill alignment &amp; CGPA, and advance candidates through recruitment stages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigate?.('/company/interviews')}
          >
            Interview Schedule
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onNavigate?.('/company/hiring')}
          >
            Hiring Pipeline
          </Button>
        </div>
      </div>

      {/* Search & Multi-Filters Strip */}
      <div className="bg-white border border-[#D9DEE3] rounded-[8px] p-3.5 flex flex-col lg:flex-row lg:items-center justify-between gap-3 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#7A828A] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search candidate by name, skills or branch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-[13px] bg-[#F3F6F8] border border-[#D9DEE3] rounded-[6px] outline-none focus:border-[#0A66C2] text-[#1D2226] placeholder-[#7A828A]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Job Filter Dropdown */}
          <select
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
            className="px-3 py-1.5 text-[12px] font-medium bg-[#F3F6F8] border border-[#D9DEE3] rounded-[6px] outline-none text-[#1D2226] cursor-pointer"
          >
            <option value="All">All Jobs</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Frontend Engineer">Frontend Engineer</option>
            <option value="Data Analyst">Data Analyst</option>
          </select>

          {/* Status Pills */}
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

      {/* Candidates Table */}
      <Card variant="default" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#F3F6F8] text-[#5E6670] font-semibold text-[11px] uppercase tracking-wider border-b border-[#D9DEE3]">
              <tr>
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Role Applied</th>
                <th className="py-3 px-4">Academic &amp; Branch</th>
                <th className="py-3 px-4">Skills Matrix</th>
                <th className="py-3 px-4">Applied</th>
                <th className="py-3 px-4">Stage</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9DEE3]">
              {filteredApplicants.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#5E6670]">
                    No applicants found matching the selected filter.
                  </td>
                </tr>
              ) : (
                filteredApplicants.map((app) => (
                  <tr key={app.id} className="hover:bg-[#F8FAFB] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={app.name} size="sm" />
                        <div>
                          <div className="font-bold text-[#1D2226]">{app.name}</div>
                          <div className="text-[11px] text-[#7A828A]">{app.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#1D2226]">{app.jobTitle}</div>
                      <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0A66C2]">
                        <Sparkles className="w-3 h-3" />
                        {app.matchScore}% Match
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[#5E6670]">
                      <div className="font-semibold text-[#1D2226]">{app.cgpa} CGPA</div>
                      <div className="text-[11px] text-[#7A828A] truncate max-w-[150px]">
                        {app.branch}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {app.skills.slice(0, 3).map((sk) => (
                          <span
                            key={sk}
                            className="px-1.5 py-0.2 bg-[#F3F6F8] text-[#1D2226] border border-[#D9DEE3] rounded-[3px] text-[10px] font-medium"
                          >
                            {sk}
                          </span>
                        ))}
                        {app.skills.length > 3 && (
                          <span className="text-[10px] text-[#7A828A]">
                            +{app.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[#5E6670] text-[12px]">
                      {app.appliedDate}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={getStatusBadgeVariant(app.status)} size="sm">
                        {app.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="secondary"
                          size="xs"
                          onClick={() => setSelectedCandidate(app)}
                        >
                          View Dossier
                        </Button>
                        {app.status === 'Applied' && (
                          <Button
                            variant="primary"
                            size="xs"
                            onClick={() => handleUpdateStatus(app.id, 'Shortlisted')}
                          >
                            Shortlist
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Candidate Dossier Modal */}
      {selectedCandidate && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedCandidate(null)}
          title={`Candidate Profile: ${selectedCandidate.name}`}
          size="md"
        >
          <div className="space-y-4 text-[13px]">
            {/* Header & Avatar */}
            <div className="flex items-center gap-3 p-3 bg-[#F3F6F8] rounded-[6px] border border-[#D9DEE3]">
              <Avatar name={selectedCandidate.name} size="md" />
              <div className="min-w-0 flex-1">
                <div className="font-bold text-[15px] text-[#1D2226]">
                  {selectedCandidate.name}
                </div>
                <div className="text-[12px] text-[#5E6670]">{selectedCandidate.email}</div>
                <div className="text-[11px] text-[#7A828A]">
                  {selectedCandidate.branch} • {selectedCandidate.cgpa} CGPA
                </div>
              </div>
              <div className="text-right">
                <div className="text-[13px] font-bold text-[#0A66C2] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {selectedCandidate.matchScore}% Match
                </div>
                <Badge variant={getStatusBadgeVariant(selectedCandidate.status)} size="sm">
                  {selectedCandidate.status}
                </Badge>
              </div>
            </div>

            {/* Experience & Highlights */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A828A]">
                Experience &amp; Portfolio
              </span>
              <p className="text-[12px] text-[#1D2226] p-2.5 bg-white border border-[#D9DEE3] rounded-[6px]">
                {selectedCandidate.experience}
              </p>
            </div>

            {/* Skills Matrix */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A828A]">
                Verified Skills
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedCandidate.skills.map((sk) => (
                  <span
                    key={sk}
                    className="px-2 py-0.5 bg-[#E8F3FF] text-[#0A66C2] border border-[#B3D7FF] rounded-[4px] text-[11px] font-semibold"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Stage Buttons */}
            <div className="space-y-2 pt-3 border-t border-[#D9DEE3]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A828A] block">
                Update Stage
              </span>
              <div className="grid grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedCandidate.id, 'Shortlisted')}
                  className="px-2 py-1.5 bg-[#E8F3FF] text-[#0A66C2] rounded-[4px] border border-[#B3D7FF] font-semibold text-[11px] hover:bg-[#d6eaff] transition-colors cursor-pointer"
                >
                  Shortlist
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedCandidate.id, 'Interview')}
                  className="px-2 py-1.5 bg-[#E8F3FF] text-[#0A66C2] rounded-[4px] border border-[#B3D7FF] font-semibold text-[11px] hover:bg-[#d6eaff] transition-colors cursor-pointer"
                >
                  Interview
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedCandidate.id, 'Selected')}
                  className="px-2 py-1.5 bg-[#E7F5EE] text-[#057642] rounded-[4px] border border-[#A3E0C2] font-semibold text-[11px] hover:bg-[#d0f0e0] transition-colors cursor-pointer"
                >
                  Select &amp; Offer
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedCandidate.id, 'Rejected')}
                  className="px-2 py-1.5 bg-[#FDECEC] text-[#CC1016] rounded-[4px] border border-[#F8B4B4] font-semibold text-[11px] hover:bg-[#fcdede] transition-colors cursor-pointer"
                >
                  Reject
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 pt-2 border-t border-[#D9DEE3]">
              <Button variant="secondary" size="sm" onClick={() => setSelectedCandidate(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

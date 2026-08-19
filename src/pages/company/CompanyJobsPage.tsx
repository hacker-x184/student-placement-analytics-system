import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Toast } from '../../components/common/Toast';
import { companyService } from '../../services/companyService';
import { CompanyActiveJobItem } from '../../types';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  MapPin,
  Calendar,
  Users,
  Eye,
  Edit2,
  XCircle,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign,
} from 'lucide-react';

interface Props {
  onNavigate?: (route: string) => void;
}

export const CompanyJobsPage: React.FC<Props> = ({ onNavigate }) => {
  const [jobs, setJobs] = useState<CompanyActiveJobItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Draft' | 'Closed'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Toast
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [viewJob, setViewJob] = useState<CompanyActiveJobItem | null>(null);
  const [toastMessage, setToastMessage] = useState<{ title: string; message: string; variant?: 'success' | 'warning' } | null>(null);

  // Post Job Multi-Section Form State
  const [formData, setFormData] = useState({
    title: '',
    roleCategory: 'Technology',
    location: 'Bengaluru, India (Hybrid)',
    jobType: 'Full-time',
    package: '₹14–18 LPA',
    openings: '6',
    minCgpa: '7.5',
    activeBacklogsAllowed: '0',
    eligibleBranches: 'CSE, IT, ECE',
    requiredSkills: 'React, TypeScript, Node.js, PostgreSQL',
    preferredSkills: 'AWS, Docker, CI/CD',
    deadline: '2026-09-30',
    description: 'We are seeking passionate engineers to build mission-critical distributed systems and customer-facing interfaces.',
    responsibilities: 'Design and develop scalable microservices, write clean testable code, collaborate with product managers.',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const loadJobs = async () => {
    try {
      setIsLoading(true);
      const data = await companyService.getCompanyDashboardData();
      if (data && data.activeJobs) {
        setJobs(data.activeJobs);
      }
    } catch (err) {
      console.error('Failed to load company jobs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.title.trim()) errors.title = 'Job title is required.';
    if (!formData.package.trim()) errors.package = 'CTC compensation range is required.';
    if (!formData.requiredSkills.trim()) errors.requiredSkills = 'Specify at least 2 required skills.';
    if (!formData.deadline.trim()) errors.deadline = 'Application deadline is required.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setIsSubmitting(true);
      const newJob: CompanyActiveJobItem = {
        id: `job-${Date.now()}`,
        title: formData.title,
        location: formData.location,
        jobType: formData.jobType as any,
        package: formData.package,
        deadline: formData.deadline,
        applicantsCount: 0,
        status: 'Active',
        postedDate: 'Today',
      };

      setJobs((prev) => [newJob, ...prev]);
      setIsPostModalOpen(false);
      setToastMessage({
        title: 'Job Published Successfully',
        message: `${formData.title} has been posted and notified to eligible students.`,
        variant: 'success',
      });
      // Reset form
      setFormData({
        title: '',
        roleCategory: 'Technology',
        location: 'Bengaluru, India (Hybrid)',
        jobType: 'Full-time',
        package: '₹14–18 LPA',
        openings: '6',
        minCgpa: '7.5',
        activeBacklogsAllowed: '0',
        eligibleBranches: 'CSE, IT, ECE',
        requiredSkills: 'React, TypeScript, Node.js, PostgreSQL',
        preferredSkills: 'AWS, Docker, CI/CD',
        deadline: '2026-09-30',
        description: 'We are seeking passionate engineers to build mission-critical distributed systems.',
        responsibilities: 'Design and develop scalable microservices, write clean testable code.',
      });
    } catch (err) {
      setToastMessage({
        title: 'Publishing Error',
        message: 'Could not create recruitment drive. Please try again.',
        variant: 'warning',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseJob = (jobId: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: 'Closed' } : j))
    );
    setToastMessage({
      title: 'Job Drive Closed',
      message: 'Applications have been closed for this role.',
      variant: 'success',
    });
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    const matchesSearch =
      !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-[1240px] mx-auto w-full" id="company-jobs-page">
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
            Campus Job &amp; Drive Postings
          </h1>
          <p className="text-[13px] text-[#5E6670] mt-0.5">
            Manage your corporate openings, candidate criteria, CTC breakdown, and application timelines.
          </p>
        </div>

        <Button
          id="company-post-job-btn"
          variant="primary"
          size="md"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setIsPostModalOpen(true)}
        >
          Post a Job
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-[#D9DEE3] rounded-[8px] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#7A828A] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by job title or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-[13px] bg-[#F3F6F8] border border-[#D9DEE3] rounded-[6px] outline-none focus:border-[#0A66C2] text-[#1D2226] placeholder-[#7A828A]"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5">
          {(['All', 'Active', 'Draft', 'Closed'] as const).map((st) => (
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
                <th className="py-3 px-4">Job Title</th>
                <th className="py-3 px-4">Location &amp; Type</th>
                <th className="py-3 px-4">Package</th>
                <th className="py-3 px-4">Applicants</th>
                <th className="py-3 px-4">Deadline</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9DEE3]">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#5E6670]">
                    No job postings found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-[#F8FAFB] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#1D2226]">{job.title}</div>
                      <div className="text-[11px] text-[#7A828A]">ID: {job.id}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[#5E6670]">
                      <div>{job.location}</div>
                      <div className="text-[11px] font-medium text-[#7A828A]">{job.jobType}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#057642]">
                      {job.package}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        type="button"
                        onClick={() => onNavigate?.('/company/applicants')}
                        className="inline-flex items-center gap-1 font-semibold text-[#0A66C2] hover:underline cursor-pointer"
                      >
                        <Users className="w-3.5 h-3.5" />
                        {job.applicantsCount} Candidates
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-[#5E6670]">
                      {job.deadline}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={job.status === 'Active' ? 'success' : job.status === 'Draft' ? 'warning' : 'neutral'}
                        size="sm"
                      >
                        {job.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setViewJob(job)}
                          title="View Details"
                          className="p-1.5 text-[#5E6670] hover:text-[#0A66C2] hover:bg-[#E8F3FF] rounded-[4px] cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {job.status === 'Active' && (
                          <button
                            type="button"
                            onClick={() => handleCloseJob(job.id)}
                            title="Close Applications"
                            className="p-1.5 text-[#5E6670] hover:text-[#CC1016] hover:bg-[#FDECEC] rounded-[4px] cursor-pointer"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
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

      {/* Multi-Section Post Job Modal */}
      {isPostModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsPostModalOpen(false)}
          title="Create New Campus Recruitment Drive"
          size="lg"
        >
          <form onSubmit={handlePostJob} className="space-y-6 text-[13px]">
            {/* Section 1: Basic Information */}
            <div className="space-y-3 pb-4 border-b border-[#D9DEE3]">
              <h3 className="text-[14px] font-bold text-[#1D2226] uppercase tracking-wider">
                1. Basic Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Job Title *"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  error={formErrors.title}
                  placeholder="e.g. Software Engineer (Backend)"
                />
                <div>
                  <label className="block text-[12px] font-semibold text-[#1D2226] mb-1">
                    Role Category
                  </label>
                  <select
                    value={formData.roleCategory}
                    onChange={(e) => setFormData({ ...formData, roleCategory: e.target.value })}
                    className="w-full px-3 py-2 text-[13px] bg-white border border-[#D9DEE3] rounded-[6px] outline-none focus:border-[#0A66C2]"
                  >
                    <option>Technology</option>
                    <option>Data Science &amp; AI</option>
                    <option>Product &amp; Design</option>
                    <option>Core Engineering</option>
                    <option>Finance</option>
                  </select>
                </div>
                <Input
                  label="Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Bengaluru / Hyderabad / Remote"
                />
                <div>
                  <label className="block text-[12px] font-semibold text-[#1D2226] mb-1">
                    Engagement Type
                  </label>
                  <select
                    value={formData.jobType}
                    onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                    className="w-full px-3 py-2 text-[13px] bg-white border border-[#D9DEE3] rounded-[6px] outline-none focus:border-[#0A66C2]"
                  >
                    <option>Full-time</option>
                    <option>Internship</option>
                    <option>Hybrid</option>
                    <option>Remote</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Compensation & Capacity */}
            <div className="space-y-3 pb-4 border-b border-[#D9DEE3]">
              <h3 className="text-[14px] font-bold text-[#1D2226] uppercase tracking-wider">
                2. Compensation &amp; Timeline
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="CTC Package *"
                  value={formData.package}
                  onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                  error={formErrors.package}
                  placeholder="e.g. ₹12–16 LPA"
                />
                <Input
                  label="Target Openings"
                  value={formData.openings}
                  onChange={(e) => setFormData({ ...formData, openings: e.target.value })}
                  placeholder="e.g. 5"
                />
                <Input
                  label="Application Deadline *"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  error={formErrors.deadline}
                />
              </div>
            </div>

            {/* Section 3: Student Eligibility Criteria */}
            <div className="space-y-3 pb-4 border-b border-[#D9DEE3]">
              <h3 className="text-[14px] font-bold text-[#1D2226] uppercase tracking-wider">
                3. Academic Eligibility
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Minimum CGPA Cutoff"
                  value={formData.minCgpa}
                  onChange={(e) => setFormData({ ...formData, minCgpa: e.target.value })}
                  placeholder="e.g. 7.5"
                />
                <Input
                  label="Max Backlogs Allowed"
                  value={formData.activeBacklogsAllowed}
                  onChange={(e) => setFormData({ ...formData, activeBacklogsAllowed: e.target.value })}
                  placeholder="0"
                />
                <Input
                  label="Eligible Branches"
                  value={formData.eligibleBranches}
                  onChange={(e) => setFormData({ ...formData, eligibleBranches: e.target.value })}
                  placeholder="e.g. CSE, IT, ECE"
                />
              </div>
            </div>

            {/* Section 4: Skills Matrix & Description */}
            <div className="space-y-3">
              <h3 className="text-[14px] font-bold text-[#1D2226] uppercase tracking-wider">
                4. Skills &amp; Description
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Required Skills (Comma-separated) *"
                  value={formData.requiredSkills}
                  onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
                  error={formErrors.requiredSkills}
                  placeholder="React, TypeScript, Python, SQL"
                />
                <Input
                  label="Preferred Skills"
                  value={formData.preferredSkills}
                  onChange={(e) => setFormData({ ...formData, preferredSkills: e.target.value })}
                  placeholder="AWS, Docker, Redis"
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#1D2226] mb-1">
                  Job Description &amp; Responsibilities
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 text-[13px] bg-white border border-[#D9DEE3] rounded-[6px] outline-none focus:border-[#0A66C2]"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#D9DEE3]">
              <Button variant="ghost" size="md" onClick={() => setIsPostModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="md" type="submit" isLoading={isSubmitting}>
                Publish Recruitment Drive
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* View Job Dossier Modal */}
      {viewJob && (
        <Modal
          isOpen={true}
          onClose={() => setViewJob(null)}
          title={`Job Posting Details: ${viewJob.title}`}
          size="md"
        >
          <div className="space-y-4 text-[13px]">
            <div className="p-3.5 bg-[#F3F6F8] rounded-[6px] border border-[#D9DEE3] space-y-2">
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Role:</span>
                <span className="font-bold text-[#1D2226]">{viewJob.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Location:</span>
                <span className="text-[#1D2226]">{viewJob.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Compensation:</span>
                <span className="font-bold text-[#057642]">{viewJob.package}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Applicants Received:</span>
                <span className="font-semibold text-[#0A66C2]">{viewJob.applicantsCount} Candidates</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Deadline:</span>
                <span className="text-[#1D2226]">{viewJob.deadline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Status:</span>
                <Badge variant={viewJob.status === 'Active' ? 'success' : 'neutral'} size="sm">
                  {viewJob.status}
                </Badge>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#D9DEE3]">
              <Button variant="secondary" size="sm" onClick={() => onNavigate?.('/company/applicants')}>
                View Applicants ({viewJob.applicantsCount})
              </Button>
              <Button variant="primary" size="sm" onClick={() => setViewJob(null)}>
                Done
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

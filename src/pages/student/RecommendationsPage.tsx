import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Toast } from '../../components/common/Toast';
import { jobService } from '../../services/jobService';
import { applicationService } from '../../services/applicationService';
import { studentService } from '../../services/studentService';
import { Job, StudentProfile } from '../../types';
import {
  Sparkles,
  CheckCircle2,
  Building2,
  MapPin,
  Briefcase,
  ArrowRight,
  TrendingUp,
  Award,
  AlertCircle,
  ExternalLink,
  BookOpen,
  Calendar,
  Layers,
} from 'lucide-react';

interface Props {
  onNavigate?: (route: string) => void;
}

export const RecommendationsPage: React.FC<Props> = ({ onNavigate }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedDomain, setSelectedDomain] = useState<string>('All');

  // Apply Modal state
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ title: string; message: string; variant?: 'success' | 'warning' } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [jobsList, userProfile, applications] = await Promise.all([
          jobService.getJobs(),
          studentService.getProfile(),
          applicationService.getApplications(),
        ]);
        setJobs(jobsList);
        setProfile(userProfile);
        setAppliedJobIds(new Set(applications.map((a) => a.jobId)));
      } catch (err) {
        console.error('Failed to load recommendation data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApply = async () => {
    if (!applyJob) return;
    try {
      setIsSubmitting(true);
      await applicationService.submitApplication({
        jobId: applyJob.id,
        jobTitle: applyJob.title,
        company: applyJob.company,
        location: applyJob.location,
        package: applyJob.package,
        studentId: profile?.id || 'student-1',
        studentName: profile?.name || 'Lucky Sharma',
        studentEmail: profile?.email || 'lucky.s@college.edu',
        studentCgpa: profile?.cgpa || 8.7,
        studentBranch: profile?.branch || 'Computer Science & Engineering',
      });

      setAppliedJobIds((prev) => new Set([...prev, applyJob.id]));
      setToastMessage({
        title: 'Application Submitted',
        message: `Successfully applied to ${applyJob.title} at ${applyJob.company}.`,
        variant: 'success',
      });
      setApplyJob(null);
    } catch (err: any) {
      setToastMessage({
        title: 'Application Failed',
        message: err?.message || 'Unable to submit application.',
        variant: 'warning',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const studentSkills = new Set(profile?.skills?.map((s) => s.toLowerCase()) || ['python', 'react', 'sql', 'javascript', 'docker']);

  // Enhance jobs with tailored recommendation metadata
  const recommendedOpportunities = jobs
    .map((job) => {
      const reqSkills = job.requiredSkills || [];
      const matchingSkills = reqSkills.filter((s) => studentSkills.has(s.toLowerCase()));
      const missingSkills = reqSkills.filter((s) => !studentSkills.has(s.toLowerCase()));

      let matchPct = 70;
      if (reqSkills.length > 0) {
        matchPct = Math.round(60 + (matchingSkills.length / reqSkills.length) * 38);
      }
      matchPct = Math.min(98, Math.max(65, matchPct));

      let whyRecommended = 'Strong alignment with your technical projects and department requirements.';
      if (matchingSkills.length >= 3) {
        whyRecommended = `Matches ${matchingSkills.length} core skills in your verified stack including ${matchingSkills.slice(0, 2).join(' & ')}.`;
      } else if (job.minCgpa <= (profile?.cgpa || 8.7)) {
        whyRecommended = `High eligibility match with ${job.company}'s cutoff and hiring benchmarks.`;
      }

      return {
        ...job,
        matchPct,
        matchingSkills,
        missingSkills,
        whyRecommended,
      };
    })
    .sort((a, b) => b.matchPct - a.matchPct);

  const filteredRecs = recommendedOpportunities.filter((job) => {
    if (selectedDomain === 'All') return true;
    return job.category.toLowerCase().includes(selectedDomain.toLowerCase()) || job.title.toLowerCase().includes(selectedDomain.toLowerCase());
  });

  const skillPathways = [
    {
      domain: 'Cloud & Kubernetes Proficiency',
      targetJob: 'Cloud Infrastructure & DevOps Engineer',
      skillsToAcquire: ['Docker', 'Kubernetes', 'Terraform'],
      estimatedTime: '3–4 Weeks',
      benefit: 'Unlocks 12 high-paying backend roles averaging ₹14 LPA.',
    },
    {
      domain: 'Scalable System Design',
      targetJob: 'Software Development Engineer II',
      skillsToAcquire: ['Redis', 'Kafka', 'Microservices Architecture'],
      estimatedTime: '2–3 Weeks',
      benefit: 'Boosts Day-1 Dream Tier shortlisting likelihood by 28%.',
    },
    {
      domain: 'Advanced Machine Learning & LLMs',
      targetJob: 'AI/ML Research Engineer',
      skillsToAcquire: ['PyTorch', 'LangChain', 'Vector DBs'],
      estimatedTime: '4 Weeks',
      benefit: 'Direct qualification for specialized AI Labs campus drives.',
    },
  ];

  return (
    <div className="space-y-6 max-w-[1240px] mx-auto w-full" id="student-recommendations-page">
      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          variant={toastMessage.variant || 'success'}
          title={toastMessage.title}
          message={toastMessage.message}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* Header Banner */}
      <div className="bg-white border border-[#D9DEE3] rounded-[8px] p-5 sm:p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] text-[11px] font-semibold bg-[#E8F3FF] text-[#0A66C2] border border-[#B3D7FF]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI MATCHING ENGINE</span>
          </div>
          <h1 className="text-[22px] sm:text-[26px] font-bold text-[#1D2226] tracking-tight">
            Recommended Opportunities
          </h1>
          <p className="text-[13px] text-[#5E6670]">
            Opportunities matched to your skill profile, CGPA eligibility, and historical selection patterns.
          </p>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', 'Technology', 'Design', 'Finance'].map((dom) => (
            <button
              key={dom}
              type="button"
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1.5 rounded-[6px] text-[12px] font-semibold transition-colors cursor-pointer ${
                selectedDomain === dom
                  ? 'bg-[#0A66C2] text-white shadow-xs'
                  : 'bg-white text-[#5E6670] border border-[#D9DEE3] hover:bg-[#F3F6F8]'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Recommended Job Cards (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {filteredRecs.map((job) => {
            const hasApplied = appliedJobIds.has(job.id);
            return (
              <Card
                key={job.id}
                variant="default"
                className="p-5 sm:p-6 space-y-4 hover:border-[#0A66C2]/40 transition-colors"
              >
                {/* Header row: Title + Match Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-[6px] bg-[#F3F6F8] border border-[#D9DEE3] flex items-center justify-center text-[#0A66C2] font-bold text-[14px] shrink-0">
                      {job.company.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-[16px] font-bold text-[#1D2226] hover:text-[#0A66C2] transition-colors">
                        {job.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#5E6670] pt-0.5">
                        <span className="font-semibold text-[#1D2226]">{job.company}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#7A828A]" />
                          {job.location}
                        </span>
                        <span>•</span>
                        <span className="font-semibold text-[#057642] bg-[#E7F5EE] px-1.5 py-0.2 rounded-[3px]">
                          {job.package}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Match Score Indicator */}
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <div className="px-2.5 py-1 rounded-[4px] bg-[#E8F3FF] border border-[#B3D7FF] text-[#0A66C2] font-bold text-[13px] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#0A66C2]" />
                      <span>{job.matchPct}% Match</span>
                    </div>
                  </div>
                </div>

                {/* Why Recommended Reason */}
                <div className="p-3 bg-[#F3F6F8] border border-[#D9DEE3] rounded-[6px] text-[12px] text-[#1D2226] flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#057642] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1D2226]">Why recommended: </span>
                    <span className="text-[#5E6670]">{job.whyRecommended}</span>
                  </div>
                </div>

                {/* Skills Analysis */}
                <div className="space-y-2 pt-1">
                  <div className="flex flex-wrap items-center gap-2 text-[12px]">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#057642]">
                      Matching Skills ({job.matchingSkills.length}):
                    </span>
                    {job.matchingSkills.map((sk) => (
                      <span
                        key={sk}
                        className="px-2 py-0.5 bg-[#E7F5EE] text-[#057642] border border-[#A3E0C2] rounded-[4px] text-[11px] font-medium"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>

                  {job.missingSkills.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 text-[12px]">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#915907]">
                        Recommended to Learn:
                      </span>
                      {job.missingSkills.map((sk) => (
                        <span
                          key={sk}
                          className="px-2 py-0.5 bg-[#FFF4DF] text-[#915907] border border-[#FFE0A3] rounded-[4px] text-[11px] font-medium"
                        >
                          +{sk}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions & Eligibility footer */}
                <div className="pt-3 border-t border-[#D9DEE3] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-[12px] text-[#7A828A]">
                    <span>Min CGPA: <strong>{job.minCgpa}</strong></span>
                    <span className="mx-2">•</span>
                    <span>Deadline: <strong>{new Date(job.deadline).toLocaleDateString()}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onNavigate?.(`/jobs/${job.id}`)}
                    >
                      View Details
                    </Button>

                    {hasApplied ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[6px] text-[12px] font-semibold bg-[#E7F5EE] text-[#057642] border border-[#A3E0C2]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Applied
                      </span>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                        onClick={() => setApplyJob(job)}
                      >
                        1-Click Apply
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Right: Skill Pathways & Growth Advisory (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <Card variant="default" className="p-5 space-y-4">
            <div className="space-y-1">
              <h3 className="text-[15px] font-bold text-[#1D2226] flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#0A66C2]" />
                Skill Gap Roadmap
              </h3>
              <p className="text-[12px] text-[#5E6670]">
                High-impact competencies that will unlock higher CTC brackets.
              </p>
            </div>

            <div className="space-y-3">
              {skillPathways.map((path, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#F3F6F8] border border-[#D9DEE3] rounded-[6px] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-[#1D2226]">
                      {path.domain}
                    </span>
                    <span className="text-[10px] font-semibold text-[#0A66C2] bg-[#E8F3FF] px-1.5 py-0.5 rounded-[4px]">
                      {path.estimatedTime}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#5E6670]">Target: {path.targetJob}</p>

                  <div className="flex flex-wrap gap-1">
                    {path.skillsToAcquire.map((s) => (
                      <span
                        key={s}
                        className="px-1.5 py-0.5 bg-white border border-[#D9DEE3] text-[#1D2226] text-[10px] font-medium rounded-[3px]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <p className="text-[11px] font-medium text-[#057642] pt-1 border-t border-[#D9DEE3]/60">
                    ✓ {path.benefit}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Profile Summary */}
          <Card variant="default" className="p-5 space-y-3 bg-[#E8F3FF]/40 border-[#B3D7FF]">
            <h4 className="text-[13px] font-bold text-[#0A66C2] uppercase tracking-wider">
              Profile Readiness Status
            </h4>
            <p className="text-[12px] text-[#1D2226] leading-relaxed">
              Your profile has <strong>8 verified skills</strong> and <strong>2 completed internships</strong>. Keep updating project repositories to sustain a 90%+ match rate.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onNavigate?.('/profile')}
              className="w-full"
            >
              Update Profile Skills
            </Button>
          </Card>
        </div>
      </div>

      {/* 1-Click Apply Confirmation Modal */}
      {applyJob && (
        <Modal
          isOpen={true}
          onClose={() => setApplyJob(null)}
          title={`Confirm Application: ${applyJob.title}`}
          size="md"
        >
          <div className="space-y-4 text-[13px]">
            <p className="text-[#5E6670]">
              You are applying to <strong>{applyJob.company}</strong> for the role of <strong>{applyJob.title}</strong> ({applyJob.package}).
            </p>

            <div className="p-3 bg-[#F3F6F8] rounded-[6px] border border-[#D9DEE3] space-y-1.5">
              <div className="flex justify-between text-[12px]">
                <span className="text-[#7A828A]">Candidate:</span>
                <span className="font-semibold text-[#1D2226]">{profile?.name || 'Lucky Sharma'}</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-[#7A828A]">CGPA:</span>
                <span className="font-semibold text-[#1D2226]">{profile?.cgpa || 8.7} / 10</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-[#7A828A]">Location:</span>
                <span className="font-semibold text-[#1D2226]">{applyJob.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#D9DEE3]">
              <Button variant="ghost" size="sm" onClick={() => setApplyJob(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                isLoading={isSubmitting}
                onClick={handleApply}
              >
                Submit Application
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

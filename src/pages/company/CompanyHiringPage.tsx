import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { Modal } from '../../components/common/Modal';
import { Toast } from '../../components/common/Toast';
import {
  Award,
  Users,
  CheckCircle2,
  XCircle,
  FileCheck,
  Send,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Download,
} from 'lucide-react';

interface Props {
  onNavigate?: (route: string) => void;
}

interface PipelineCandidate {
  id: string;
  name: string;
  jobTitle: string;
  cgpa: number;
  branch: string;
  stage: 'Applied' | 'Shortlisted' | 'Interview' | 'Selected' | 'Rejected';
  package: string;
  offerStatus?: 'Offer Released' | 'Accepted' | 'Pending Response';
}

const PIPELINE_DATA: PipelineCandidate[] = [
  { id: '1', name: 'Rohan Verma', jobTitle: 'Frontend Engineer', cgpa: 8.3, branch: 'CSE', stage: 'Applied', package: '₹12 LPA' },
  { id: '2', name: 'Sneha Roy', jobTitle: 'Frontend Engineer', cgpa: 8.9, branch: 'CSE', stage: 'Applied', package: '₹12 LPA' },
  { id: '3', name: 'Lucky Sharma', jobTitle: 'Software Engineer', cgpa: 8.7, branch: 'CSE', stage: 'Shortlisted', package: '₹15 LPA' },
  { id: '4', name: 'Aakash Mishra', jobTitle: 'Software Engineer', cgpa: 8.5, branch: 'IT', stage: 'Shortlisted', package: '₹15 LPA' },
  { id: '5', name: 'Priya Patel', jobTitle: 'Software Engineer', cgpa: 9.1, branch: 'IT', stage: 'Interview', package: '₹15 LPA' },
  { id: '6', name: 'Kunal Singhania', jobTitle: 'Data Analyst', cgpa: 8.6, branch: 'ECE', stage: 'Interview', package: '₹11 LPA' },
  { id: '7', name: 'Ananya Deshmukh', jobTitle: 'Data Analyst', cgpa: 8.8, branch: 'ECE', stage: 'Selected', package: '₹11 LPA', offerStatus: 'Accepted' },
  { id: '8', name: 'Rahul Bose', jobTitle: 'Software Engineer', cgpa: 9.3, branch: 'CSE', stage: 'Selected', package: '₹16 LPA', offerStatus: 'Offer Released' },
  { id: '9', name: 'Devendra Joshi', jobTitle: 'Software Engineer', cgpa: 7.6, branch: 'IT', stage: 'Rejected', package: '₹14 LPA' },
];

export const CompanyHiringPage: React.FC<Props> = ({ onNavigate }) => {
  const [candidates, setCandidates] = useState<PipelineCandidate[]>(PIPELINE_DATA);
  const [selectedOfferModal, setSelectedOfferModal] = useState<PipelineCandidate | null>(null);
  const [toastMessage, setToastMessage] = useState<{ title: string; message: string; variant?: 'success' | 'warning' } | null>(null);

  const stages: ('Applied' | 'Shortlisted' | 'Interview' | 'Selected' | 'Rejected')[] = [
    'Applied',
    'Shortlisted',
    'Interview',
    'Selected',
    'Rejected',
  ];

  const handleAdvanceStage = (id: string, nextStage: PipelineCandidate['stage']) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              stage: nextStage,
              offerStatus: nextStage === 'Selected' ? 'Offer Released' : c.offerStatus,
            }
          : c
      )
    );
    setToastMessage({
      title: 'Candidate Moved',
      message: `Candidate updated to ${nextStage} stage.`,
      variant: 'success',
    });
  };

  const handleReleaseOffer = (candidate: PipelineCandidate) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidate.id ? { ...c, stage: 'Selected', offerStatus: 'Offer Released' } : c
      )
    );
    setSelectedOfferModal(null);
    setToastMessage({
      title: 'Offer Letter Dispatched',
      message: `Formal campus offer released to ${candidate.name} (${candidate.package}).`,
      variant: 'success',
    });
  };

  return (
    <div className="space-y-6 max-w-[1240px] mx-auto w-full" id="company-hiring-page">
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
            Recruitment &amp; Hiring Pipeline
          </h1>
          <p className="text-[13px] text-[#5E6670] mt-0.5">
            Track candidate throughput across screening, assessment rounds, and final offer letter releases.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigate?.('/company/applicants')}
          >
            Review Applicants
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onNavigate?.('/company/jobs')}
          >
            Manage Drives
          </Button>
        </div>
      </div>

      {/* Stage Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {stages.map((stage) => {
          const count = candidates.filter((c) => c.stage === stage).length;
          return (
            <div
              key={stage}
              className="p-3.5 bg-white border border-[#D9DEE3] rounded-[8px] space-y-1 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]"
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A828A]">
                {stage}
              </span>
              <div className="text-[22px] font-bold text-[#1D2226]">{count}</div>
            </div>
          );
        })}
      </div>

      {/* Pipeline Visual Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
        {stages.map((stage) => {
          const stageCandidates = candidates.filter((c) => c.stage === stage);
          return (
            <div
              key={stage}
              className="bg-[#F3F6F8] border border-[#D9DEE3] rounded-[8px] p-3 space-y-3 min-h-[420px]"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#D9DEE3]">
                <span className="text-[12px] font-bold text-[#1D2226] uppercase tracking-wider">
                  {stage}
                </span>
                <span className="text-[11px] font-bold text-[#5E6670] px-1.5 py-0.2 bg-white rounded border border-[#D9DEE3]">
                  {stageCandidates.length}
                </span>
              </div>

              <div className="space-y-2.5">
                {stageCandidates.length === 0 ? (
                  <div className="py-8 text-center text-[11px] text-[#7A828A]">
                    No candidates
                  </div>
                ) : (
                  stageCandidates.map((c) => (
                    <Card
                      key={c.id}
                      variant="default"
                      className="p-3 space-y-2 hover:border-[#0A66C2]/40 transition-all shadow-xs"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <div className="font-bold text-[13px] text-[#1D2226]">{c.name}</div>
                          <div className="text-[11px] text-[#5E6670]">{c.jobTitle}</div>
                        </div>
                        <span className="text-[11px] font-bold text-[#057642] bg-[#E7F5EE] px-1 py-0.2 rounded">
                          {c.cgpa}
                        </span>
                      </div>

                      <div className="text-[11px] text-[#7A828A] flex justify-between">
                        <span>{c.branch}</span>
                        <span className="font-semibold text-[#1D2226]">{c.package}</span>
                      </div>

                      {c.offerStatus && (
                        <div className="pt-1 border-t border-[#D9DEE3]">
                          <Badge
                            variant={c.offerStatus === 'Accepted' ? 'success' : 'info'}
                            size="sm"
                          >
                            {c.offerStatus}
                          </Badge>
                        </div>
                      )}

                      {/* Quick stage advance triggers */}
                      <div className="pt-1.5 border-t border-[#D9DEE3]/70 flex items-center justify-between">
                        {stage === 'Applied' && (
                          <button
                            type="button"
                            onClick={() => handleAdvanceStage(c.id, 'Shortlisted')}
                            className="text-[11px] font-semibold text-[#0A66C2] hover:underline cursor-pointer"
                          >
                            → Shortlist
                          </button>
                        )}
                        {stage === 'Shortlisted' && (
                          <button
                            type="button"
                            onClick={() => handleAdvanceStage(c.id, 'Interview')}
                            className="text-[11px] font-semibold text-[#0A66C2] hover:underline cursor-pointer"
                          >
                            → Schedule Interview
                          </button>
                        )}
                        {stage === 'Interview' && (
                          <button
                            type="button"
                            onClick={() => setSelectedOfferModal(c)}
                            className="text-[11px] font-semibold text-[#057642] hover:underline cursor-pointer"
                          >
                            → Release Offer
                          </button>
                        )}
                        {stage === 'Selected' && (
                          <span className="text-[11px] font-medium text-[#057642] flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Offer Issued
                          </span>
                        )}
                        {stage === 'Rejected' && (
                          <span className="text-[11px] font-medium text-[#CC1016]">
                            Archived
                          </span>
                        )}
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Offer Release Modal */}
      {selectedOfferModal && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedOfferModal(null)}
          title={`Release Formal Offer: ${selectedOfferModal.name}`}
          size="md"
        >
          <div className="space-y-4 text-[13px]">
            <p className="text-[#5E6670]">
              You are issuing a placement offer letter to <strong>{selectedOfferModal.name}</strong> for the role of <strong>{selectedOfferModal.jobTitle}</strong>.
            </p>

            <div className="p-3.5 bg-[#F3F6F8] rounded-[6px] border border-[#D9DEE3] space-y-2">
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Annual Compensation:</span>
                <span className="font-bold text-[#057642]">{selectedOfferModal.package}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Department / CGPA:</span>
                <span className="font-semibold text-[#1D2226]">{selectedOfferModal.branch} • {selectedOfferModal.cgpa} CGPA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A828A]">Institution:</span>
                <span className="text-[#1D2226]">ABC Institute of Technology</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#D9DEE3]">
              <Button variant="ghost" size="sm" onClick={() => setSelectedOfferModal(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Send className="w-3.5 h-3.5" />}
                onClick={() => handleReleaseOffer(selectedOfferModal)}
              >
                Dispatch Offer Letter
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

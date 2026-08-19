import React from 'react';
import { Job } from '../../../../types';
import { Modal } from '../../../../components/common/Modal';
import { Button } from '../../../../components/common/Button';
import { FileCheck2 } from 'lucide-react';

export interface JobApplyModalProps {
  job: Job | null;
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const JobApplyModal: React.FC<JobApplyModalProps> = ({
  job,
  isOpen,
  isSubmitting,
  onClose,
  onConfirm,
}) => {
  if (!job) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => !isSubmitting && onClose()}
      title="Confirm Application"
      subtitle="Campus Placement Recruitment Submission"
      maxWidth="md"
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <Button
            id="btn-cancel-apply-modal"
            variant="outline"
            size="sm"
            disabled={isSubmitting}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            id="btn-confirm-apply-modal"
            variant="primary"
            size="sm"
            disabled={isSubmitting}
            loading={isSubmitting}
            leftIcon={<FileCheck2 className="w-4 h-4" />}
            onClick={onConfirm}
          >
            {isSubmitting ? 'Submitting Application...' : 'Confirm Application'}
          </Button>
        </div>
      }
    >
      <div className="space-y-4 text-sm text-[#434655]">
        {/* Target Role & Company Card */}
        <div className="p-4 bg-[#eff4ff] border border-[#dce9ff] rounded-xl space-y-1.5">
          <span className="text-[10px] font-bold text-[#004ac6] uppercase tracking-wider block">
            Applying for Position
          </span>
          <h4 className="font-bold text-[#0b1c30] text-base">{job.title}</h4>
          <div className="flex items-center gap-2 text-xs text-[#434655] font-medium flex-wrap pt-0.5">
            <span className="font-semibold text-[#004ac6]">{job.company}</span>
            <span>•</span>
            <span className="font-semibold text-[#0b1c30]">{job.package}</span>
            <span>•</span>
            <span className="text-[#737686]">{job.location}</span>
          </div>
        </div>

        <p className="text-xs text-[#434655] leading-relaxed">
          Are you sure you want to apply for <strong>{job.title}</strong> at <strong>{job.company}</strong>?
        </p>

        <div className="p-3 bg-[#f8f9ff] border border-[#e2e8f0] rounded-lg text-[11px] text-[#737686] space-y-1">
          <p className="font-semibold text-[#0b1c30]">Verification & Profile Notice:</p>
          <p>
            Your verified student profile (CGPA: 8.7, Department: Computer Science, Batch: 2027) will be submitted to the corporate recruitment committee.
          </p>
        </div>
      </div>
    </Modal>
  );
};

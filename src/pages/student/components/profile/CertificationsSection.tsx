import React, { useState } from 'react';
import { Card } from '../../../../components/common/Card';
import { Button } from '../../../../components/common/Button';
import { Modal } from '../../../../components/common/Modal';
import { Input } from '../../../../components/common/Input';
import { EmptyState } from '../../../../components/common/EmptyState';
import {
  Award,
  Calendar,
  CheckCircle2,
  Plus,
  Trash2,
  ExternalLink,
} from 'lucide-react';

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
}

export interface CertificationsSectionProps {
  certifications: CertificationItem[];
  isEditing: boolean;
  onAddCertification: (cert: Omit<CertificationItem, 'id'>) => void;
  onRemoveCertification: (id: string) => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
  isEditing,
  onAddCertification,
  onRemoveCertification,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [formError, setFormError] = useState('');

  const handleOpenModal = () => {
    setTitle('');
    setIssuer('');
    setIssueDate('');
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Certification title is required.');
      return;
    }
    if (!issuer.trim()) {
      setFormError('Issuing organization is required.');
      return;
    }
    if (!issueDate.trim()) {
      setFormError('Issue date/year is required.');
      return;
    }

    onAddCertification({
      title: title.trim(),
      issuer: issuer.trim(),
      issueDate: issueDate.trim(),
    });

    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        id="profile-certifications-card"
        variant="default"
        padding="md"
        headerTitle="Certifications & Accreditations"
        headerSubtitle="Industry-recognized certifications, licenses, and verified credentials"
        headerAction={
          isEditing && (
            <Button
              id="btn-add-cert"
              variant="outline"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={handleOpenModal}
            >
              Add Certification
            </Button>
          )
        }
      >
        {certifications.length === 0 ? (
          <EmptyState
            icon={<Award className="w-6 h-6 text-[#004ac6]" />}
            title="No certifications added yet"
            description="Add professional cloud, development, or domain certifications to strengthen eligibility for specialized job tracks."
            actionLabel={isEditing ? 'Add Certification' : undefined}
            onAction={isEditing ? handleOpenModal : undefined}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-white border border-[#e2e8f0] rounded-xl p-4 flex items-start justify-between gap-3 hover:border-[#004ac6]/30 hover:shadow-[0px_2px_8px_rgba(15,23,42,0.04)] transition-all"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#eff4ff] border border-[#dce9ff] text-[#004ac6] flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h4 className="font-bold text-sm text-[#0b1c30] leading-snug">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-[#004ac6] font-semibold truncate">
                      {cert.issuer}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#737686] font-medium pt-0.5">
                      <Calendar className="w-3 h-3" />
                      <span>Issued: {cert.issueDate}</span>
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <button
                    type="button"
                    aria-label={`Remove ${cert.title}`}
                    onClick={() => onRemoveCertification(cert.id)}
                    className="p-1 text-[#737686] hover:text-[#ba1a1a] hover:bg-[#ba1a1a]/10 rounded-md transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Add Certification Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Verified Certification"
        subtitle="Provide certificate details and issuing authority"
        maxWidth="md"
      >
        <form onSubmit={handleSave} className="space-y-4 pt-2">
          {formError && (
            <div className="p-3 rounded-lg bg-[rgba(186,26,26,0.1)] border border-[rgba(186,26,26,0.2)] text-xs text-[#7f1d1d] font-medium">
              {formError}
            </div>
          )}

          <Input
            id="modal-cert-title"
            label="Certification Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. AWS Certified Solutions Architect"
            required
          />

          <Input
            id="modal-cert-issuer"
            label="Issuing Organization"
            value={issuer}
            onChange={(e) => setIssuer(e.target.value)}
            placeholder="e.g. Amazon Web Services / Google Cloud"
            required
          />

          <Input
            id="modal-cert-date"
            label="Issue Date / Year"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            placeholder="e.g. Aug 2024"
            required
          />

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#e2e8f0]">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Save Certification
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

import React, { useState } from 'react';
import { Card } from '../../../../components/common/Card';
import { Button } from '../../../../components/common/Button';
import { Modal } from '../../../../components/common/Modal';
import { Input } from '../../../../components/common/Input';
import { EmptyState } from '../../../../components/common/EmptyState';
import {
  Briefcase,
  Building2,
  Calendar,
  Plus,
  Trash2,
} from 'lucide-react';

export interface InternshipItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface InternshipsSectionProps {
  internships: InternshipItem[];
  isEditing: boolean;
  onAddInternship: (internship: Omit<InternshipItem, 'id'>) => void;
  onRemoveInternship: (id: string) => void;
}

export const InternshipsSection: React.FC<InternshipsSectionProps> = ({
  internships,
  isEditing,
  onAddInternship,
  onRemoveInternship,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');

  const handleOpenModal = () => {
    setRole('');
    setCompany('');
    setDuration('');
    setDescription('');
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim()) {
      setFormError('Internship role title is required.');
      return;
    }
    if (!company.trim()) {
      setFormError('Company or organization name is required.');
      return;
    }
    if (!duration.trim()) {
      setFormError('Duration (e.g. May 2024 - July 2024) is required.');
      return;
    }

    onAddInternship({
      role: role.trim(),
      company: company.trim(),
      duration: duration.trim(),
      description: description.trim(),
    });

    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        id="profile-internships-card"
        variant="default"
        padding="md"
        headerTitle="Work & Internship Experience"
        headerSubtitle="Industry internships, co-ops, research assistantships, and professional work"
        headerAction={
          isEditing && (
            <Button
              id="btn-add-internship"
              variant="outline"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={handleOpenModal}
            >
              Add Internship
            </Button>
          )
        }
      >
        {internships.length === 0 ? (
          <EmptyState
            icon={<Briefcase className="w-6 h-6 text-[#004ac6]" />}
            title="No internships added yet"
            description="Add professional internships or practical work experience to demonstrate readiness to recruiting employers."
            actionLabel={isEditing ? 'Add Internship' : undefined}
            onAction={isEditing ? handleOpenModal : undefined}
          />
        ) : (
          <div className="space-y-3.5">
            {internships.map((internship) => (
              <div
                key={internship.id}
                className="bg-white border border-[#e2e8f0] rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-2.5 hover:border-[#004ac6]/30 hover:shadow-[0px_2px_8px_rgba(15,23,42,0.04)] transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#eff4ff] border border-[#dce9ff] text-[#004ac6] flex items-center justify-center shrink-0 mt-0.5">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#0b1c30]">
                        {internship.role}
                      </h4>
                      <p className="text-xs font-semibold text-[#004ac6]">
                        {internship.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <div className="flex items-center gap-1.5 text-xs text-[#737686] font-medium bg-[#f8f9ff] px-2.5 py-1 rounded-md border border-[#e2e8f0]">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{internship.duration}</span>
                    </div>

                    {isEditing && (
                      <button
                        type="button"
                        aria-label={`Remove ${internship.role}`}
                        onClick={() => onRemoveInternship(internship.id)}
                        className="p-1 text-[#737686] hover:text-[#ba1a1a] hover:bg-[#ba1a1a]/10 rounded-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {internship.description && (
                  <p className="text-xs text-[#434655] leading-relaxed pt-1">
                    {internship.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Add Internship Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Internship Experience"
        subtitle="Provide role, company, and key contributions"
        maxWidth="lg"
      >
        <form onSubmit={handleSave} className="space-y-4 pt-2">
          {formError && (
            <div className="p-3 rounded-lg bg-[rgba(186,26,26,0.1)] border border-[rgba(186,26,26,0.2)] text-xs text-[#7f1d1d] font-medium">
              {formError}
            </div>
          )}

          <Input
            id="modal-internship-role"
            label="Role Title"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Software Development Intern"
            required
          />

          <Input
            id="modal-internship-company"
            label="Company / Organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. TechNova Solutions"
            required
          />

          <Input
            id="modal-internship-duration"
            label="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g. May 2024 - July 2024 (3 mos)"
            required
          />

          <div className="space-y-1.5">
            <label
              htmlFor="modal-internship-desc"
              className="block text-xs font-semibold text-[#0b1c30]"
            >
              Responsibilities & Outcomes
            </label>
            <textarea
              id="modal-internship-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe tasks completed, frameworks used, and measurable results..."
              className="w-full px-3 py-2 text-sm bg-white border border-[#e2e8f0] rounded-lg text-[#0b1c30] placeholder-[#737686] focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 focus:outline-none"
            />
          </div>

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
              Save Experience
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

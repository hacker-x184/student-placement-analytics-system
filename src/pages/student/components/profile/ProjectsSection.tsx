import React, { useState } from 'react';
import { Card } from '../../../../components/common/Card';
import { Button } from '../../../../components/common/Button';
import { Badge } from '../../../../components/common/Badge';
import { Modal } from '../../../../components/common/Modal';
import { Input } from '../../../../components/common/Input';
import { EmptyState } from '../../../../components/common/EmptyState';
import {
  FolderGit2,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  Code2,
  Layers,
} from 'lucide-react';

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
}

export interface ProjectsSectionProps {
  projects: ProjectItem[];
  isEditing: boolean;
  onAddProject: (project: Omit<ProjectItem, 'id'>) => void;
  onRemoveProject: (id: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  isEditing,
  onAddProject,
  onRemoveProject,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techStackInput, setTechStackInput] = useState('');
  const [link, setLink] = useState('');
  const [formError, setFormError] = useState('');

  const handleOpenModal = () => {
    setTitle('');
    setDescription('');
    setTechStackInput('');
    setLink('');
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Project title is required.');
      return;
    }
    if (!description.trim()) {
      setFormError('Project description is required.');
      return;
    }

    const techStack = techStackInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onAddProject({
      title: title.trim(),
      description: description.trim(),
      techStack: techStack.length > 0 ? techStack : ['Software Engineering'],
      link: link.trim() || undefined,
    });

    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        id="profile-projects-card"
        variant="default"
        padding="md"
        headerTitle="Technical Projects"
        headerSubtitle="Key software applications, system architectures, and open-source contributions"
        headerAction={
          isEditing && (
            <Button
              id="btn-add-project"
              variant="outline"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={handleOpenModal}
            >
              Add Project
            </Button>
          )
        }
      >
        {projects.length === 0 ? (
          <EmptyState
            icon={<FolderGit2 className="w-6 h-6 text-[#004ac6]" />}
            title="No projects added yet"
            description="Highlight key software engineering or research projects to showcase hands-on technical experience to campus recruiters."
            actionLabel={isEditing ? 'Add Your First Project' : undefined}
            onAction={isEditing ? handleOpenModal : undefined}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-[#e2e8f0] rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-4 hover:border-[#004ac6]/30 hover:shadow-[0px_2px_8px_rgba(15,23,42,0.04)] transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#eff4ff] border border-[#dce9ff] text-[#004ac6] flex items-center justify-center shrink-0 mt-0.5">
                        <FolderGit2 className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-[#0b1c30] leading-snug">
                          {project.title}
                        </h4>
                      </div>
                    </div>

                    {isEditing && (
                      <button
                        type="button"
                        aria-label={`Remove ${project.title}`}
                        onClick={() => onRemoveProject(project.id)}
                        className="p-1 text-[#737686] hover:text-[#ba1a1a] hover:bg-[#ba1a1a]/10 rounded-md transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-[#434655] leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#f8f9ff] text-[#434655] border border-[#e2e8f0]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {project.link && (
                  <div className="pt-2 border-t border-[#e2e8f0]">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#004ac6] hover:underline"
                    >
                      <span>View Repository / Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Add Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Technical Project"
        subtitle="Provide project details and technologies used"
        maxWidth="lg"
      >
        <form onSubmit={handleSave} className="space-y-4 pt-2">
          {formError && (
            <div className="p-3 rounded-lg bg-[rgba(186,26,26,0.1)] border border-[rgba(186,26,26,0.2)] text-xs text-[#7f1d1d] font-medium">
              {formError}
            </div>
          )}

          <Input
            id="modal-project-title"
            label="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Distributed Task Queue"
            required
          />

          <div className="space-y-1.5">
            <label
              htmlFor="modal-project-desc"
              className="block text-xs font-semibold text-[#0b1c30]"
            >
              Project Description
            </label>
            <textarea
              id="modal-project-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe problem solved, architecture, and measurable outcomes..."
              className="w-full px-3 py-2 text-sm bg-white border border-[#e2e8f0] rounded-lg text-[#0b1c30] placeholder-[#737686] focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 focus:outline-none"
              required
            />
          </div>

          <Input
            id="modal-project-tech"
            label="Technologies & Frameworks (comma separated)"
            value={techStackInput}
            onChange={(e) => setTechStackInput(e.target.value)}
            placeholder="e.g. React, Node.js, PostgreSQL, Docker"
          />

          <Input
            id="modal-project-link"
            label="Project / GitHub Link (optional)"
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://github.com/username/project"
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
              Save Project
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

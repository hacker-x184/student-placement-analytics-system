import React, { useState } from 'react';
import { Card } from '../../../../components/common/Card';
import { Button } from '../../../../components/common/Button';
import { Badge } from '../../../../components/common/Badge';
import { Plus, X, Sparkles, Code2 } from 'lucide-react';

export interface SkillsSectionProps {
  skills: string[];
  isEditing: boolean;
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (skill: string) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  isEditing,
  onAddSkill,
  onRemoveSkill,
}) => {
  const [newSkill, setNewSkill] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAdd = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = newSkill.trim();
    if (!trimmed) return;

    if (skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setError('Skill already added.');
      return;
    }

    onAddSkill(trimmed);
    setNewSkill('');
    setError(null);
  };

  return (
    <Card
      id="profile-skills-card"
      variant="default"
      padding="md"
      headerTitle="Technical Skills & Competencies"
      headerSubtitle="Core programming languages, frameworks, developer tooling, and domain proficiencies"
    >
      <div className="space-y-4">
        {/* Add Skill Input (Always active or in edit mode) */}
        {isEditing && (
          <form onSubmit={handleAdd} className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  id="input-new-skill"
                  type="text"
                  value={newSkill}
                  onChange={(e) => {
                    setNewSkill(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Type a skill (e.g. Docker, GraphQL, Kubernetes) and press Enter"
                  className={`w-full h-10 px-3 py-2 text-sm bg-white border rounded-lg text-[#0b1c30] placeholder-[#737686] focus:outline-none transition-all ${
                    error
                      ? 'border-[#ba1a1a] focus:ring-4 focus:ring-[#ba1a1a]/10'
                      : 'border-[#e2e8f0] focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10'
                  }`}
                />
              </div>
              <Button
                id="btn-add-skill"
                type="submit"
                variant="outline"
                size="md"
                leftIcon={<Plus className="w-4 h-4" />}
                disabled={!newSkill.trim()}
              >
                Add Skill
              </Button>
            </div>
            {error && <p className="text-xs text-[#ba1a1a]">{error}</p>}
          </form>
        )}

        {/* Skills Chips Display */}
        {skills.length === 0 ? (
          <div className="p-4 text-center text-xs text-[#737686] bg-[#f8f9ff] rounded-lg border border-dashed border-[#e2e8f0]">
            No technical skills listed yet. Click Edit Profile to add skills.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 pt-1">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#eff4ff] text-[#004ac6] border border-[#dce9ff] group transition-all"
              >
                <Code2 className="w-3.5 h-3.5 text-[#004ac6]" />
                <span>{skill}</span>
                {isEditing && (
                  <button
                    type="button"
                    aria-label={`Remove ${skill}`}
                    onClick={() => onRemoveSkill(skill)}
                    className="p-0.5 ml-1 rounded-full text-[#737686] hover:bg-[#ba1a1a]/10 hover:text-[#ba1a1a] transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

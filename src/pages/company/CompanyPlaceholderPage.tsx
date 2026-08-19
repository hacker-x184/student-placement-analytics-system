import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ShieldCheck, ArrowLeft, Layers } from 'lucide-react';

export interface CompanyPlaceholderPageProps {
  title: string;
  description: string;
  onNavigate?: (route: string) => void;
}

export const CompanyPlaceholderPage: React.FC<CompanyPlaceholderPageProps> = ({
  title,
  description,
  onNavigate,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate?.('/company')}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Back to Overview
        </Button>
      </div>

      <Card variant="default" className="p-8 sm:p-12 text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-[#eff4ff] border border-[#dce9ff] text-[#004ac6] flex items-center justify-center mx-auto">
          <Layers className="w-6 h-6" />
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-[#0b1c30] tracking-tight">
          {title}
        </h1>

        <p className="text-xs sm:text-sm text-[#434655] max-w-lg mx-auto leading-relaxed">
          {description}
        </p>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eff4ff] border border-[#dce9ff] text-[#004ac6] text-xs font-semibold mt-2">
          <ShieldCheck className="w-4 h-4" />
          <span>CareerLens Recruiter Architecture Locked</span>
        </div>

        <div className="pt-4 flex items-center justify-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => onNavigate?.('/company')}
          >
            Go to Recruiter Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
};

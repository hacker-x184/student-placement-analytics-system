import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { ShieldCheck, Compass } from 'lucide-react';
import { Button } from './Button';

export interface RoutePlaceholderProps {
  routeName: string;
  routePath: string;
  role: 'student' | 'admin';
  description?: string;
  onNavigate?: (route: string) => void;
}

export const RoutePlaceholder: React.FC<RoutePlaceholderProps> = ({
  routeName,
  routePath,
  role,
  description = 'Verified route placeholder connected to the Academic Precision application shell.',
  onNavigate,
}) => {
  return (
    <div className="space-y-6">
      {/* Route Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e2e8f0]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant={role === 'admin' ? 'secondary' : 'primary'} size="sm">
              {role.toUpperCase()} CONTEXT
            </Badge>
            <span className="text-xs font-mono font-medium text-[#737686]">{routePath}</span>
          </div>
          <h1 className="text-2xl font-semibold text-[#0b1c30] tracking-[-0.01em]">{routeName}</h1>
          {description && <p className="text-xs sm:text-sm text-[#434655] mt-0.5">{description}</p>}
        </div>
      </div>

      {/* Placeholder Surface Card */}
      <Card className="p-8 text-center space-y-4" variant="default">
        <div className="w-12 h-12 rounded-lg bg-[#eff4ff] border border-[#dce9ff] text-[#004ac6] mx-auto flex items-center justify-center">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="max-w-md mx-auto space-y-1">
          <h3 className="text-base font-semibold text-[#0b1c30]">Phase 1 Design System & Shell Active</h3>
          <p className="text-xs text-[#434655] leading-relaxed">
            Layout shell, navigation drawer, top navbar, and design tokens are functioning with academic precision.
          </p>
        </div>

        <div className="pt-4 border-t border-[#e2e8f0] flex flex-wrap items-center justify-center gap-2">
          {role === 'student' ? (
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onNavigate?.('/jobs')}
              >
                Go to Jobs (/jobs)
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onNavigate?.('/applications')}
              >
                My Applications (/applications)
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onNavigate?.('/prediction')}
              >
                Prediction Engine (/prediction)
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onNavigate?.('/admin/students')}
              >
                Student Directory
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onNavigate?.('/admin/jobs')}
              >
                Campus Drives
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onNavigate?.('/admin/analytics')}
              >
                Placement Analytics
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

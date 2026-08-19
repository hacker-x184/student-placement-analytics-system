import React from 'react';
import { Inbox } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-lg border border-[#e2e8f0] shadow-[0px_1px_3px_rgba(15,23,42,0.05),0px_10px_15px_-3px_rgba(15,23,42,0.03)] ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-[#eff4ff] border border-[#dce9ff] text-[#004ac6] flex items-center justify-center mb-3.5">
        {icon || <Inbox className="w-6 h-6" />}
      </div>
      <h3 className="text-base font-semibold text-[#0b1c30] tracking-tight">{title}</h3>
      {description && (
        <p className="mt-1 text-xs text-[#434655] max-w-sm leading-relaxed">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <div className="mt-5">
          <Button variant="primary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

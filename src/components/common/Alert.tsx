import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export interface AlertProps {
  variant?: 'success' | 'warning' | 'danger' | 'info';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onClose,
  className = '',
}) => {
  const config = {
    success: {
      container: 'bg-[rgba(22,163,74,0.08)] border-[rgba(22,163,74,0.25)] text-[#14532d]',
      icon: <CheckCircle2 className="w-5 h-5 text-[#16a34a] shrink-0" />,
      closeBtn: 'text-[#16a34a] hover:bg-[rgba(22,163,74,0.15)]',
    },
    warning: {
      container: 'bg-[rgba(217,119,6,0.08)] border-[rgba(217,119,6,0.25)] text-[#78350f]',
      icon: <AlertTriangle className="w-5 h-5 text-[#d97706] shrink-0" />,
      closeBtn: 'text-[#d97706] hover:bg-[rgba(217,119,6,0.15)]',
    },
    danger: {
      container: 'bg-[rgba(186,26,26,0.08)] border-[rgba(186,26,26,0.25)] text-[#7f1d1d]',
      icon: <AlertCircle className="w-5 h-5 text-[#ba1a1a] shrink-0" />,
      closeBtn: 'text-[#ba1a1a] hover:bg-[rgba(186,26,26,0.15)]',
    },
    info: {
      container: 'bg-[#eff4ff] border-[#dce9ff] text-[#002f87]',
      icon: <Info className="w-5 h-5 text-[#004ac6] shrink-0" />,
      closeBtn: 'text-[#004ac6] hover:bg-[#dce9ff]',
    },
  };

  const current = config[variant];

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 p-4 rounded-lg border text-xs leading-relaxed ${current.container} ${className}`}
    >
      <div className="mt-0.5">{current.icon}</div>
      <div className="flex-1 min-w-0">
        {title && <h4 className="font-semibold text-sm mb-0.5 tracking-tight">{title}</h4>}
        <div>{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`p-1 rounded-md transition-colors ${current.closeBtn}`}
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

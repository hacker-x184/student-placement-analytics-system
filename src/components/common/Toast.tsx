import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  type: ToastType;
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  type,
  title,
  message,
  onClose,
  className = '',
}) => {
  const configs = {
    success: {
      border: 'border-[rgba(22,163,74,0.3)]',
      icon: <CheckCircle2 className="w-5 h-5 text-[#16a34a]" />,
      titleColor: 'text-[#14532d]',
    },
    error: {
      border: 'border-[rgba(186,26,26,0.3)]',
      icon: <AlertCircle className="w-5 h-5 text-[#ba1a1a]" />,
      titleColor: 'text-[#7f1d1d]',
    },
    warning: {
      border: 'border-[rgba(217,119,6,0.3)]',
      icon: <AlertTriangle className="w-5 h-5 text-[#d97706]" />,
      titleColor: 'text-[#78350f]',
    },
    info: {
      border: 'border-[#dce9ff]',
      icon: <Info className="w-5 h-5 text-[#004ac6]" />,
      titleColor: 'text-[#002f87]',
    },
  };

  const current = configs[type];

  return (
    <div
      role="status"
      className={`p-4 rounded-lg bg-white border ${current.border} shadow-[0px_8px_30px_rgba(15,23,42,0.12),0px_2px_8px_rgba(15,23,42,0.06)] flex items-start gap-3 text-xs w-full max-w-sm ${className}`}
    >
      <div className="shrink-0 mt-0.5">{current.icon}</div>
      <div className="flex-1 min-w-0">
        {title && <p className={`font-semibold text-sm leading-tight mb-0.5 ${current.titleColor}`}>{title}</p>}
        <p className="text-[#434655] leading-relaxed">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="shrink-0 text-[#737686] hover:text-[#0b1c30] p-1 -mr-1 -mt-1 rounded-md transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

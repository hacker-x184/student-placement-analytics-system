import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message,
  onRetry,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center bg-[rgba(186,26,26,0.03)] border border-[rgba(186,26,26,0.2)] rounded-lg ${className}`}
    >
      <div className="w-11 h-11 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-semibold text-[#7f1d1d]">{title}</h3>
      <p className="mt-1 text-xs text-[#93000a] max-w-sm">{message}</p>
      {onRetry && (
        <div className="mt-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={onRetry}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Retry Action
          </Button>
        </div>
      )}
    </div>
  );
};

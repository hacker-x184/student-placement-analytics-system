import React from 'react';

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  text,
  fullScreen = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizeClasses[size]} rounded-full border-[#dce9ff] border-t-[#004ac6] animate-spin`}
      />
      {text && (
        <p className="text-xs font-medium text-[#434655] tracking-wide">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-[#f8f9ff]/80 backdrop-blur-xs flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return <div className={`flex items-center justify-center p-6 ${className}`}>{spinner}</div>;
};

import React from 'react';

export interface ContentContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxWidth?: 'default' | 'narrow' | 'full';
}

export const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  maxWidth = 'default',
  className = '',
  ...props
}) => {
  const maxWidthClasses = {
    default: 'max-w-[1280px]',
    narrow: 'max-w-[1024px]',
    full: 'max-w-full',
  };

  return (
    <div
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthClasses[maxWidth]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

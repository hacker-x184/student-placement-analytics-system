import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { MobileNav } from '../components/layout/MobileNav';

export interface CompanyLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (route: string) => void;
  pageTitle?: string;
}

export const CompanyLayout: React.FC<CompanyLayoutProps> = ({
  children,
  currentPage,
  onNavigate,
  pageTitle = 'Recruiter Portal',
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F3F6F8] text-[#1D2226] flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        title={pageTitle}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onNavigate={onNavigate}
      />

      <div className="flex-1 flex">
        {/* Desktop Fixed Sidebar (250px) & Mobile Drawer */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          currentPage={currentPage}
          onNavigate={onNavigate}
        />

        {/* Content Canvas */}
        <main className="flex-1 lg:ml-[250px] p-4 sm:p-6 lg:p-7 pb-20 lg:pb-12 max-w-[1280px] w-full mx-auto transition-all">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav currentPage={currentPage} onNavigate={onNavigate} />
    </div>
  );
};


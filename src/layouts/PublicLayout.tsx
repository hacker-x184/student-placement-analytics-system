import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Button } from '../components/common/Button';

export interface PublicLayoutProps {
  children: React.ReactNode;
  onNavigate?: (route: string) => void;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children, onNavigate }) => {
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate('/');
      setTimeout(() => {
        const target = document.getElementById(sectionId);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F6F8] text-[#1D2226] flex flex-col font-sans">
      {/* Unified Public Top Navbar */}
      <header className="h-14 bg-white border-b border-[#D9DEE3] sticky top-0 z-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-6 sm:gap-8">
            <div
              onClick={() => onNavigate?.('/')}
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <div className="w-7 h-7 rounded-[6px] bg-[#0A66C2] flex items-center justify-center text-white shadow-xs group-hover:bg-[#004182] transition-colors">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="flex items-center">
                <span className="text-[17px] font-bold tracking-tight text-[#1D2226]">
                  CareerLens
                </span>
                <span className="hidden lg:inline-block text-[12px] font-normal text-[#5E6670] ml-3 pl-3 border-l border-[#D9DEE3]">
                  Career &amp; Hiring Intelligence Platform
                </span>
              </div>
            </div>

            {/* Public Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => scrollToSection('latest-opportunities-section')}
                className="px-3 py-1.5 text-[13px] font-semibold text-[#5E6670] hover:text-[#0A66C2] hover:bg-[#F3F6F8] rounded-[6px] transition-colors cursor-pointer"
              >
                Jobs
              </button>
              <button
                onClick={() => scrollToSection('featured-companies-section')}
                className="px-3 py-1.5 text-[13px] font-semibold text-[#5E6670] hover:text-[#0A66C2] hover:bg-[#F3F6F8] rounded-[6px] transition-colors cursor-pointer"
              >
                Companies
              </button>
              <button
                onClick={() => scrollToSection('career-intelligence-section')}
                className="px-3 py-1.5 text-[13px] font-semibold text-[#5E6670] hover:text-[#0A66C2] hover:bg-[#F3F6F8] rounded-[6px] transition-colors cursor-pointer"
              >
                Intelligence
              </button>
              <button
                onClick={() => scrollToSection('ecosystem-card-colleges')}
                className="px-3 py-1.5 text-[13px] font-semibold text-[#5E6670] hover:text-[#0A66C2] hover:bg-[#F3F6F8] rounded-[6px] transition-colors cursor-pointer"
              >
                For Colleges
              </button>
            </nav>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onNavigate?.('/login')}
            >
              Sign In
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onNavigate?.('/register')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 flex flex-col justify-start max-w-[1280px] mx-auto w-full p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Unified Institutional Footer */}
      <footer className="py-8 border-t border-[#D9DEE3] bg-white text-[12px] text-[#5E6670]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#D9DEE3]">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-[4px] bg-[#0A66C2] flex items-center justify-center text-white">
                <GraduationCap className="w-3.5 h-3.5" />
              </div>
              <span className="text-[15px] font-bold text-[#1D2226]">CareerLens</span>
              <span className="text-[#7A828A]">|</span>
              <span className="text-[13px] text-[#5E6670] font-medium">See Your Career Clearly.</span>
            </div>
            <div className="flex flex-wrap gap-4 text-[12px] font-medium text-[#5E6670]">
              <button onClick={() => scrollToSection('latest-opportunities-section')} className="hover:text-[#0A66C2]">Explore Opportunities</button>
              <button onClick={() => scrollToSection('featured-companies-section')} className="hover:text-[#0A66C2]">Browse Companies</button>
              <button onClick={() => scrollToSection('career-intelligence-section')} className="hover:text-[#0A66C2]">Career Intelligence</button>
              <button onClick={() => scrollToSection('ecosystem-card-colleges')} className="hover:text-[#0A66C2]">For Colleges</button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[#7A828A]">
            <p>© {new Date().getFullYear()} CareerLens. All rights reserved.</p>
            <p>Career &amp; Hiring Intelligence Platform</p>
          </div>
        </div>
      </footer>
    </div>
  );
};


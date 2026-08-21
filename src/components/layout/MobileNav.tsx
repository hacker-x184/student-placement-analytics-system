import React from 'react';
import {
  LayoutDashboard,
  Briefcase,
  BarChart3,
  TrendingUp,
  User,
  Users,
  Building2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export interface MobileNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentPage, onNavigate }) => {
  const { role } = useAuth();

  const isCurrent = (path: string, altId?: string) => {
    return currentPage === path || (altId ? currentPage === altId : false);
  };

  if (role === 'admin') {
    return (
      <nav
        className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#D9DEE3] px-2 py-1.5 flex items-center justify-around lg:hidden shadow-[0px_-2px_8px_rgba(0,0,0,0.04)]"
        aria-label="Mobile Navigation"
      >
        <button
          onClick={() => onNavigate('/admin')}
          className={`flex flex-col items-center py-1 px-3 rounded-[6px] text-[11px] font-medium transition-colors ${
            isCurrent('/admin', 'admin-dashboard') ? 'text-[#0A66C2] font-semibold' : 'text-[#5E6670]'
          }`}
        >
          <div
            className={`p-1 rounded-[4px] mb-0.5 ${
              isCurrent('/admin', 'admin-dashboard') ? 'bg-[#E8F3FF] text-[#0A66C2]' : ''
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
          </div>
          <span>Overview</span>
        </button>

        <button
          onClick={() => onNavigate('/admin/students')}
          className={`flex flex-col items-center py-1 px-3 rounded-[6px] text-[11px] font-medium transition-colors ${
            isCurrent('/admin/students', 'admin-students') ? 'text-[#0A66C2] font-semibold' : 'text-[#5E6670]'
          }`}
        >
          <div
            className={`p-1 rounded-[4px] mb-0.5 ${
              isCurrent('/admin/students', 'admin-students') ? 'bg-[#E8F3FF] text-[#0A66C2]' : ''
            }`}
          >
            <Users className="w-4 h-4" />
          </div>
          <span>Students</span>
        </button>

        <button
          onClick={() => onNavigate('/admin/companies')}
          className={`flex flex-col items-center py-1 px-3 rounded-[6px] text-[11px] font-medium transition-colors ${
            isCurrent('/admin/companies', 'admin-companies') ? 'text-[#0A66C2] font-semibold' : 'text-[#5E6670]'
          }`}
        >
          <div
            className={`p-1 rounded-[4px] mb-0.5 ${
              isCurrent('/admin/companies', 'admin-companies') ? 'bg-[#E8F3FF] text-[#0A66C2]' : ''
            }`}
          >
            <Building2 className="w-4 h-4" />
          </div>
          <span>Companies</span>
        </button>

        <button
          onClick={() => onNavigate('/admin/analytics')}
          className={`flex flex-col items-center py-1 px-3 rounded-[6px] text-[11px] font-medium transition-colors ${
            isCurrent('/admin/analytics', 'admin-analytics') ? 'text-[#0A66C2] font-semibold' : 'text-[#5E6670]'
          }`}
        >
          <div
            className={`p-1 rounded-[4px] mb-0.5 ${
              isCurrent('/admin/analytics', 'admin-analytics') ? 'bg-[#E8F3FF] text-[#0A66C2]' : ''
            }`}
          >
            <BarChart3 className="w-4 h-4" />
          </div>
          <span>Analytics</span>
        </button>
      </nav>
    );
  }

  if (role === 'company') {
    return (
      <nav
        className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#D9DEE3] px-2 py-1.5 flex items-center justify-around lg:hidden shadow-[0px_-2px_8px_rgba(0,0,0,0.04)]"
        aria-label="Mobile Navigation"
      >
        <button
          onClick={() => onNavigate('/company')}
          className={`flex flex-col items-center py-1 px-3 rounded-[6px] text-[11px] font-medium transition-colors ${
            isCurrent('/company', 'company-dashboard') ? 'text-[#0A66C2] font-semibold' : 'text-[#5E6670]'
          }`}
        >
          <div
            className={`p-1 rounded-[4px] mb-0.5 ${
              isCurrent('/company', 'company-dashboard') ? 'bg-[#E8F3FF] text-[#0A66C2]' : ''
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
          </div>
          <span>Overview</span>
        </button>

        <button
          onClick={() => onNavigate('/company/jobs')}
          className={`flex flex-col items-center py-1 px-3 rounded-[6px] text-[11px] font-medium transition-colors ${
            isCurrent('/company/jobs', 'company-jobs') ? 'text-[#0A66C2] font-semibold' : 'text-[#5E6670]'
          }`}
        >
          <div
            className={`p-1 rounded-[4px] mb-0.5 ${
              isCurrent('/company/jobs', 'company-jobs') ? 'bg-[#E8F3FF] text-[#0A66C2]' : ''
            }`}
          >
            <Briefcase className="w-4 h-4" />
          </div>
          <span>Jobs</span>
        </button>

        <button
          onClick={() => onNavigate('/company/applicants')}
          className={`flex flex-col items-center py-1 px-3 rounded-[6px] text-[11px] font-medium transition-colors ${
            isCurrent('/company/applicants', 'company-applicants') ? 'text-[#0A66C2] font-semibold' : 'text-[#5E6670]'
          }`}
        >
          <div
            className={`p-1 rounded-[4px] mb-0.5 ${
              isCurrent('/company/applicants', 'company-applicants') ? 'bg-[#E8F3FF] text-[#0A66C2]' : ''
            }`}
          >
            <Users className="w-4 h-4" />
          </div>
          <span>Applicants</span>
        </button>

        <button
          onClick={() => onNavigate('/company/profile')}
          className={`flex flex-col items-center py-1 px-3 rounded-[6px] text-[11px] font-medium transition-colors ${
            isCurrent('/company/profile', 'company-profile') ? 'text-[#0A66C2] font-semibold' : 'text-[#5E6670]'
          }`}
        >
          <div
            className={`p-1 rounded-[4px] mb-0.5 ${
              isCurrent('/company/profile', 'company-profile') ? 'bg-[#E8F3FF] text-[#0A66C2]' : ''
            }`}
          >
            <Building2 className="w-4 h-4" />
          </div>
          <span>Company</span>
        </button>
      </nav>
    );
  }

  // Student mobile bottom bar
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#D9DEE3] px-2 py-1.5 flex items-center justify-around lg:hidden shadow-[0px_-2px_8px_rgba(0,0,0,0.04)]"
      aria-label="Mobile Navigation"
    >
      <button
        onClick={() => onNavigate('/dashboard')}
        className={`flex flex-col items-center py-1 px-3 rounded-[6px] text-[11px] font-medium transition-colors ${
          isCurrent('/dashboard', 'dashboard') ? 'text-[#0A66C2] font-semibold' : 'text-[#5E6670]'
        }`}
      >
        <div
          className={`p-1 rounded-[4px] mb-0.5 ${
            isCurrent('/dashboard', 'dashboard') ? 'bg-[#E8F3FF] text-[#0A66C2]' : ''
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
        </div>
        <span>Home</span>
      </button>

      <button
        onClick={() => onNavigate('/jobs')}
        className={`flex flex-col items-center py-1 px-3 rounded-[6px] text-[11px] font-medium transition-colors ${
          isCurrent('/jobs', 'jobs') ? 'text-[#0A66C2] font-semibold' : 'text-[#5E6670]'
        }`}
      >
        <div
          className={`p-1 rounded-[4px] mb-0.5 ${
            isCurrent('/jobs', 'jobs') ? 'bg-[#E8F3FF] text-[#0A66C2]' : ''
          }`}
        >
          <Briefcase className="w-4 h-4" />
        </div>
        <span>Jobs</span>
      </button>

      <button
        onClick={() => onNavigate('/prediction')}
        className={`flex flex-col items-center py-1 px-3 rounded-[6px] text-[11px] font-medium transition-colors ${
          isCurrent('/prediction', 'prediction') ? 'text-[#0A66C2] font-semibold' : 'text-[#5E6670]'
        }`}
      >
        <div
          className={`p-1 rounded-[4px] mb-0.5 ${
            isCurrent('/prediction', 'prediction') ? 'bg-[#E8F3FF] text-[#0A66C2]' : ''
          }`}
        >
          <TrendingUp className="w-4 h-4" />
        </div>
        <span>Predict</span>
      </button>

      <button
        onClick={() => onNavigate('/profile')}
        className={`flex flex-col items-center py-1 px-3 rounded-[6px] text-[11px] font-medium transition-colors ${
          isCurrent('/profile', 'profile') ? 'text-[#0A66C2] font-semibold' : 'text-[#5E6670]'
        }`}
      >
        <div
          className={`p-1 rounded-[4px] mb-0.5 ${
            isCurrent('/profile', 'profile') ? 'bg-[#E8F3FF] text-[#0A66C2]' : ''
          }`}
        >
          <User className="w-4 h-4" />
        </div>
        <span>Profile</span>
      </button>
    </nav>
  );
};


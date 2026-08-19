import React from 'react';
import {
  LayoutDashboard,
  User,
  Briefcase,
  FileCheck2,
  BarChart3,
  TrendingUp,
  Sparkles,
  Settings,
  LogOut,
  Users,
  Building2,
  Award,
  X,
  GraduationCap,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../common/Avatar';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

interface NavItem {
  id: string;
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
}) => {
  const { role, logout, user } = useAuth();

  // Student navigation items strictly defined as per specification
  const studentNavItems: NavItem[] = [
    { id: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'jobs', path: '/jobs', label: 'Jobs', icon: Briefcase },
    { id: 'applications', path: '/applications', label: 'Applications', icon: FileCheck2, badge: '3' },
    { id: 'analytics', path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'prediction', path: '/prediction', label: 'Prediction', icon: TrendingUp },
    { id: 'recommendations', path: '/recommendations', label: 'Recommendations', icon: Sparkles },
    { id: 'profile', path: '/profile', label: 'Profile', icon: User },
    { id: 'settings', path: '/settings', label: 'Settings', icon: Settings },
  ];

  // Company navigation items strictly defined as per specification
  const companyPrimaryNavItems: NavItem[] = [
    { id: 'company-dashboard', path: '/company', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'company-jobs', path: '/company/jobs', label: 'Jobs', icon: Briefcase },
    { id: 'company-applicants', path: '/company/applicants', label: 'Applicants', icon: Users, badge: '126' },
    { id: 'company-interviews', path: '/company/interviews', label: 'Interviews', icon: FileCheck2, badge: '18' },
    { id: 'company-hiring', path: '/company/hiring', label: 'Hiring', icon: Award, badge: '6' },
  ];

  const companySecondaryNavItems: NavItem[] = [
    { id: 'company-profile', path: '/company/profile', label: 'Company Profile', icon: Building2 },
    { id: 'company-settings', path: '/company/settings', label: 'Settings', icon: Settings },
  ];

  // Admin navigation items strictly defined as per specification
  const adminPrimaryNavItems: NavItem[] = [
    { id: 'admin-dashboard', path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'admin-students', path: '/admin/students', label: 'Students', icon: Users },
    { id: 'admin-companies', path: '/admin/companies', label: 'Companies', icon: Building2 },
    { id: 'admin-jobs', path: '/admin/jobs', label: 'Jobs', icon: Briefcase },
    { id: 'admin-applications', path: '/admin/applications', label: 'Applications', icon: FileCheck2 },
    { id: 'admin-placements', path: '/admin/placements', label: 'Placements', icon: Award },
    { id: 'admin-analytics', path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const adminSecondaryNavItems: NavItem[] = [
    { id: 'admin-settings', path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const navItems =
    role === 'admin'
      ? [...adminPrimaryNavItems, ...adminSecondaryNavItems]
      : role === 'company'
      ? [...companyPrimaryNavItems, ...companySecondaryNavItems]
      : studentNavItems;

  const isItemActive = (item: NavItem) => {
    if (currentPage === item.id || currentPage === item.path) return true;
    if (item.path !== '/' && item.path !== '/dashboard' && item.path !== '/admin' && item.path !== '/company') {
      if (currentPage.startsWith(`${item.path}/`)) return true;
    }
    return false;
  };

  const getHomePath = () => {
    if (role === 'admin') return '/admin';
    if (role === 'company') return '/company';
    return '/dashboard';
  };

  const getPortalSubtitle = () => {
    if (role === 'admin') return 'TPO Admin';
    if (role === 'company') return 'Recruiter';
    return 'Student Portal';
  };

  const defaultUserName =
    role === 'admin'
      ? (user?.companyName || user?.name || 'ABC Institute of Technology')
      : role === 'company'
      ? (user?.companyName || user?.name || 'TechNova Technologies')
      : (user?.name || 'Lucky Sharma');

  const defaultUserRole =
    role === 'admin'
      ? 'TPO Admin'
      : role === 'company'
      ? 'Recruiter'
      : (user?.branch || 'Computer Science Engineering');

  const renderNavButton = (item: NavItem) => {
    const Icon = item.icon;
    const active = isItemActive(item);

    return (
      <button
        key={item.id}
        onClick={() => {
          onNavigate(item.path);
          onClose();
        }}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-[6px] text-[13px] font-medium transition-all duration-150 group text-left cursor-pointer ${
          active
            ? 'bg-[#E8F3FF] text-[#0A66C2] font-semibold'
            : 'text-[#5E6670] hover:text-[#1D2226] hover:bg-[#F3F6F8]'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <Icon
            className={`w-4 h-4 shrink-0 transition-colors ${
              active ? 'text-[#0A66C2]' : 'text-[#7A828A] group-hover:text-[#1D2226]'
            }`}
          />
          <span className="truncate">{item.label}</span>
        </div>

        {item.badge ? (
          <span
            className={`text-[11px] px-1.5 py-0.5 rounded-[4px] font-semibold leading-none shrink-0 ${
              active ? 'bg-[#0A66C2] text-white' : 'bg-[#E8ECEF] text-[#5E6670]'
            }`}
          >
            {item.badge}
          </span>
        ) : null}
      </button>
    );
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[#1D2226]/40 backdrop-blur-[2px] lg:hidden transition-opacity duration-150"
          aria-hidden="true"
        />
      )}

      {/* Desktop Fixed Sidebar (Width exactly 250px) & Mobile Drawer */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-[250px] bg-white border-r border-[#D9DEE3] flex flex-col justify-between transition-transform duration-150 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand & Section Navigation Header */}
        <div className="flex flex-col flex-1 min-h-0">
          <div className="h-14 px-5 border-b border-[#D9DEE3] flex items-center justify-between shrink-0 bg-white">
            <div
              onClick={() => {
                onNavigate(getHomePath());
                onClose();
              }}
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <div className="w-7 h-7 rounded-[6px] bg-[#0A66C2] flex items-center justify-center text-white shadow-xs group-hover:bg-[#004182] transition-colors">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[16px] font-bold text-[#1D2226] tracking-tight block leading-tight">
                  CareerLens
                </span>
                <span className="text-[11px] font-medium text-[#0A66C2] block leading-none">
                  {getPortalSubtitle()}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-[#5E6670] hover:text-[#1D2226] hover:bg-[#F3F6F8] rounded-[6px] transition-colors"
              aria-label="Close navigation sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Item List */}
          <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto" aria-label="Main Navigation">
            {role === 'company' ? (
              <>
                <div className="space-y-0.5">
                  {companyPrimaryNavItems.map(renderNavButton)}
                </div>
                <div className="my-2.5 border-t border-[#D9DEE3]" />
                <div className="space-y-0.5">
                  {companySecondaryNavItems.map(renderNavButton)}
                </div>
              </>
            ) : role === 'admin' ? (
              <>
                <div className="space-y-0.5">
                  {adminPrimaryNavItems.map(renderNavButton)}
                </div>
                <div className="my-2.5 border-t border-[#D9DEE3]" />
                <div className="space-y-0.5">
                  {adminSecondaryNavItems.map(renderNavButton)}
                </div>
              </>
            ) : (
              studentNavItems.map(renderNavButton)
            )}
          </nav>
        </div>

        {/* User Card & Logout in Sidebar Footer */}
        <div className="p-3 border-t border-[#D9DEE3] bg-[#F8FAFB] shrink-0 space-y-2">
          <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-[6px]">
            <Avatar
              src={user?.avatar || user?.avatarUrl}
              name={defaultUserName}
              size="sm"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-[#1D2226] truncate leading-tight">
                {defaultUserName}
              </p>
              <p className="text-[11px] text-[#7A828A] truncate leading-tight mt-0.5">
                {defaultUserRole}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-[6px] text-[13px] font-medium text-[#CC1016] hover:bg-[#FDECEC] transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};


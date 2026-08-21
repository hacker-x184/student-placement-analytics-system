import React, { useState } from 'react';
import {
  Menu,
  GraduationCap,
  Bell,
  LogOut,
  User as UserIcon,
  Settings as SettingsIcon,
  Search,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../common/Avatar';
import { Dropdown, DropdownItem } from '../common/Dropdown';

export interface NavbarProps {
  onToggleSidebar?: () => void;
  title?: string;
  onNavigate?: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, onNavigate }) => {
  const { user, role, logout } = useAuth();
  const [hasNotifications] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const getProfilePath = () => {
    if (role === 'admin') return '/admin/settings';
    if (role === 'company') return '/company/profile';
    return '/profile';
  };

  const getSettingsPath = () => {
    if (role === 'admin') return '/admin/settings';
    if (role === 'company') return '/company/settings';
    return '/settings';
  };

  const getHomePath = () => {
    if (role === 'admin') return '/admin';
    if (role === 'company') return '/company';
    return '/dashboard';
  };

  const getNotificationsPath = () => {
    if (role === 'admin') return '/admin/applications';
    if (role === 'company') return '/company/applicants';
    return '/applications';
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (role === 'student' && onNavigate) {
      onNavigate(`/jobs?q=${encodeURIComponent(searchQuery)}`);
    } else if (role === 'company' && onNavigate) {
      onNavigate(`/company/applicants?q=${encodeURIComponent(searchQuery)}`);
    } else if (role === 'admin' && onNavigate) {
      onNavigate(`/admin/students?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const userMenuItems = [
    {
      id: 'profile',
      label: role === 'admin' ? 'Placement Cell Settings' : role === 'company' ? 'Company Profile' : 'My Profile',
      icon: <UserIcon className="w-4 h-4 text-[#5E6670]" />,
      onClick: () => onNavigate && onNavigate(getProfilePath()),
    },
    {
      id: 'settings',
      label: 'Account Preferences',
      icon: <SettingsIcon className="w-4 h-4 text-[#5E6670]" />,
      onClick: () => onNavigate && onNavigate(getSettingsPath()),
    },
    {
      id: 'divider-logout',
      label: '',
      divider: true,
    },
    {
      id: 'logout',
      label: 'Sign Out',
      icon: <LogOut className="w-4 h-4 text-[#CC1016]" />,
      danger: true,
      onClick: logout,
    },
  ];

  const userRoleSubtitle =
    role === 'admin'
      ? 'TPO Admin'
      : role === 'company'
      ? 'Recruiter'
      : 'Student';

  const defaultUserName =
    role === 'admin'
      ? (user?.companyName || user?.name || 'ABC Institute of Technology')
      : role === 'company'
      ? (user?.companyName || 'TechNova Technologies')
      : (user?.name || 'Lucky Sharma');

  const profileMenuItems: DropdownItem[] = [
    ...(role !== 'admin'
      ? [
          {
            id: 'profile',
            label: role === 'company' ? 'Company Profile' : 'View Profile',
            icon: <UserIcon className="w-4 h-4 text-[#5E6670]" />,
            onClick: () => onNavigate && onNavigate(getProfilePath()),
          },
        ]
      : []),
    {
      id: 'settings',
      label: 'Settings',
      icon: <SettingsIcon className="w-4 h-4 text-[#5E6670]" />,
      onClick: () => onNavigate && onNavigate(getSettingsPath()),
    },
    {
      id: 'divider-logout',
      label: '',
      divider: true,
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: <LogOut className="w-4 h-4 text-[#CC1016]" />,
      danger: true,
      onClick: logout,
    },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#D9DEE3] h-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full gap-4">
          {/* Left section: Hamburger button + Brand */}
          <div className="flex items-center gap-3 shrink-0">
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="lg:hidden p-1.5 -ml-1 rounded-[6px] text-[#5E6670] hover:text-[#1D2226] hover:bg-[#F3F6F8] transition-colors focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <div
              onClick={() => onNavigate && onNavigate(getHomePath())}
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <div className="w-7 h-7 rounded-[6px] bg-[#0A66C2] flex items-center justify-center text-white shadow-xs group-hover:bg-[#004182] transition-colors">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-[17px] font-bold tracking-tight text-[#1D2226]">
                CareerLens
              </span>
            </div>
          </div>

          {/* Center Search Input */}
          <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center flex-1 max-w-md mx-2">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A828A]" />
              <input
                type="text"
                placeholder="Search jobs, companies, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-8 pl-9 pr-3 text-[13px] bg-[#F3F6F8] hover:bg-[#E8ECEF] focus:bg-white text-[#1D2226] placeholder-[#7A828A] border border-transparent focus:border-[#0A66C2] rounded-[6px] transition-all outline-none"
              />
            </div>
          </form>

          {/* Right section: Notification area, User menu */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Notification Bell */}
            <button
              onClick={() => onNavigate && onNavigate(getNotificationsPath())}
              className="relative p-1.5 rounded-[6px] text-[#5E6670] hover:text-[#1D2226] hover:bg-[#F3F6F8] transition-colors focus:outline-none"
              title="Notifications"
              aria-label="View notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              {hasNotifications && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#0A66C2] ring-2 ring-white" />
              )}
            </button>

            {/* User Profile Area & Dropdown */}
            <div className="pl-2 border-l border-[#D9DEE3]">
              <Dropdown
                align="right"
                trigger={
                  <div className="flex items-center gap-2 p-1 rounded-[6px] hover:bg-[#F3F6F8] transition-colors group cursor-pointer">
                    <Avatar
                      src={user?.avatar || user?.avatarUrl}
                      name={defaultUserName}
                      size="sm"
                    />
                    <div className="hidden md:block text-left">
                      <p className="text-[13px] font-semibold text-[#1D2226] leading-tight group-hover:text-[#0A66C2]">
                        {defaultUserName}
                      </p>
                      <p className="text-[11px] text-[#7A828A] leading-tight">
                        {userRoleSubtitle}
                      </p>
                    </div>
                  </div>
                }
                items={userMenuItems}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};



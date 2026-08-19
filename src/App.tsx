import React, { useState, useEffect, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { StudentLayout } from './layouts/StudentLayout';
import { CompanyLayout } from './layouts/CompanyLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';

// Student Pages
import { DashboardPage } from './pages/student/DashboardPage';
import { ProfilePage } from './pages/student/ProfilePage';
import { JobsPage } from './pages/student/JobsPage';
import { JobDetailsPage } from './pages/student/JobDetailsPage';
import { ApplicationsPage } from './pages/student/ApplicationsPage';
import { AnalyticsPage } from './pages/student/AnalyticsPage';
import { PredictionPage } from './pages/student/PredictionPage';
import { RecommendationsPage } from './pages/student/RecommendationsPage';
import { SettingsPage } from './pages/student/SettingsPage';

// Company Pages
import { CompanyDashboardPage } from './pages/company/CompanyDashboardPage';
import { CompanyJobsPage } from './pages/company/CompanyJobsPage';
import { CompanyApplicantsPage } from './pages/company/CompanyApplicantsPage';
import { CompanyInterviewsPage } from './pages/company/CompanyInterviewsPage';
import { CompanyHiringPage } from './pages/company/CompanyHiringPage';
import { CompanyProfilePage } from './pages/company/CompanyProfilePage';
import { CompanySettingsPage } from './pages/company/CompanySettingsPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminStudentsPage } from './pages/admin/AdminStudentsPage';
import { AdminCompaniesPage } from './pages/admin/AdminCompaniesPage';
import { AdminJobsPage } from './pages/admin/AdminJobsPage';
import { AdminApplicationsPage } from './pages/admin/AdminApplicationsPage';
import { AdminPlacementsPage } from './pages/admin/AdminPlacementsPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

const PUBLIC_ROUTES = ['/', '/login', '/register'];

const STUDENT_BASE_ROUTES = [
  '/dashboard',
  '/profile',
  '/jobs',
  '/applications',
  '/analytics',
  '/prediction',
  '/recommendations',
  '/settings',
];

const COMPANY_BASE_ROUTES = [
  '/company',
  '/company/profile',
  '/company/jobs',
  '/company/applicants',
  '/company/interviews',
  '/company/hiring',
  '/company/settings',
];

const ADMIN_BASE_ROUTES = [
  '/admin',
  '/admin/students',
  '/admin/companies',
  '/admin/jobs',
  '/admin/applications',
  '/admin/placements',
  '/admin/analytics',
  '/admin/settings',
];

const AppContent: React.FC = () => {
  const { user, role, isLoading } = useAuth();

  // Initialize route from window.location.pathname if available
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const pathname = window.location.pathname;
    if (pathname && pathname !== '/') {
      return pathname;
    }
    return '/';
  });

  const isStudentRoute = useCallback((route: string): boolean => {
    if (route.startsWith('/jobs/')) return true;
    return STUDENT_BASE_ROUTES.includes(route);
  }, []);

  const isCompanyRoute = useCallback((route: string): boolean => {
    if (route === '/company' || route === '/company/dashboard') return true;
    return COMPANY_BASE_ROUTES.some((companyPath) => route.startsWith(companyPath));
  }, []);

  const isAdminRoute = useCallback((route: string): boolean => {
    if (route === '/admin' || route === '/admin/dashboard') return true;
    return ADMIN_BASE_ROUTES.some((adminPath) => route.startsWith(adminPath));
  }, []);

  const isPublicRoute = useCallback((route: string): boolean => {
    return PUBLIC_ROUTES.includes(route);
  }, []);

  const normalizeRoute = useCallback((route: string): string => {
    let normalized = route.trim();
    if (!normalized.startsWith('/')) {
      if (normalized.startsWith('admin-')) {
        normalized = normalized.replace('admin-', '/admin/');
      } else if (normalized.startsWith('company-')) {
        normalized = normalized.replace('company-', '/company/');
      } else {
        normalized = `/${normalized}`;
      }
    }
    if (normalized === '/admin/dashboard') {
      normalized = '/admin';
    }
    if (normalized === '/company/dashboard') {
      normalized = '/company';
    }
    return normalized;
  }, []);

  // Listen to browser popstate navigation
  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname || '/';
      setCurrentRoute(pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Strict role-based route guard & redirect enforcement
  useEffect(() => {
    if (isLoading) return;

    // 1. Unauthenticated users cannot access protected routes
    if (!user) {
      if (!isPublicRoute(currentRoute)) {
        setCurrentRoute('/login');
        if (window.location.pathname !== '/login') {
          window.history.replaceState({}, '', '/login');
        }
      }
      return;
    }

    // 2. Authenticated Student
    if (role === 'student') {
      if (isPublicRoute(currentRoute) || isAdminRoute(currentRoute) || isCompanyRoute(currentRoute) || !isStudentRoute(currentRoute)) {
        setCurrentRoute('/dashboard');
        if (window.location.pathname !== '/dashboard') {
          window.history.replaceState({}, '', '/dashboard');
        }
      }
      return;
    }

    // 3. Authenticated Company / Recruiter
    if (role === 'company') {
      if (isPublicRoute(currentRoute) || isStudentRoute(currentRoute) || isAdminRoute(currentRoute) || !isCompanyRoute(currentRoute)) {
        setCurrentRoute('/company');
        if (window.location.pathname !== '/company') {
          window.history.replaceState({}, '', '/company');
        }
      }
      return;
    }

    // 4. Authenticated Admin
    if (role === 'admin') {
      if (isPublicRoute(currentRoute) || isStudentRoute(currentRoute) || isCompanyRoute(currentRoute) || !isAdminRoute(currentRoute)) {
        setCurrentRoute('/admin');
        if (window.location.pathname !== '/admin') {
          window.history.replaceState({}, '', '/admin');
        }
      }
    }
  }, [user, role, currentRoute, isLoading, isPublicRoute, isAdminRoute, isCompanyRoute, isStudentRoute]);

  const handleNavigate = (route: string) => {
    let target = normalizeRoute(route);

    // Apply immediate role protection during navigation
    if (!user) {
      if (!isPublicRoute(target)) {
        target = '/login';
      }
    } else if (role === 'student') {
      if (isAdminRoute(target) || isCompanyRoute(target) || isPublicRoute(target) || !isStudentRoute(target)) {
        target = '/dashboard';
      }
    } else if (role === 'company') {
      if (isStudentRoute(target) || isAdminRoute(target) || isPublicRoute(target) || !isCompanyRoute(target)) {
        target = '/company';
      }
    } else if (role === 'admin') {
      if (isStudentRoute(target) || isCompanyRoute(target) || isPublicRoute(target) || !isAdminRoute(target)) {
        target = '/admin';
      }
    }

    setCurrentRoute(target);
    if (window.location.pathname !== target) {
      window.history.pushState({}, '', target);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageTitle = (route: string): string => {
    if (route.startsWith('/jobs/')) {
      return 'Drive Specifications';
    }
    switch (route) {
      case '/dashboard':
        return 'Student Dashboard';
      case '/profile':
        return 'Student Profile';
      case '/jobs':
        return 'Recruitment Drives';
      case '/applications':
        return 'My Applications';
      case '/analytics':
        return 'Placement Statistics';
      case '/prediction':
        return 'Placement Predictor';
      case '/recommendations':
        return 'Recommendations';
      case '/settings':
        return 'Portal Settings';

      case '/company':
      case '/company/dashboard':
        return 'Recruiter Overview';
      case '/company/profile':
        return 'Company Profile';
      case '/company/jobs':
        return 'Job Postings';
      case '/company/applicants':
        return 'Applicant Pipeline';
      case '/company/interviews':
        return 'Interview Schedule';
      case '/company/hiring':
        return 'Hiring Decisions';
      case '/company/settings':
        return 'Recruitment Settings';

      case '/admin':
      case '/admin/dashboard':
        return 'Admin Dashboard';
      case '/admin/students':
        return 'Student Roster';
      case '/admin/companies':
        return 'Recruiter Directory';
      case '/admin/jobs':
        return 'Campus Drives';
      case '/admin/applications':
        return 'Application Funnel';
      case '/admin/placements':
        return 'Placement Register';
      case '/admin/analytics':
        return 'Placement Intelligence';
      case '/admin/settings':
        return 'Cell Configuration';
      default:
        return role === 'admin'
          ? 'Admin Dashboard'
          : role === 'company'
          ? 'Recruiter Dashboard'
          : 'Student Dashboard';
    }
  };

  // 1. PUBLIC ROUTES (Wrapped exclusively with PublicLayout for unauthenticated users)
  if (!user || isPublicRoute(currentRoute)) {
    let publicContent: React.ReactNode;
    if (currentRoute === '/login') {
      publicContent = <LoginPage onNavigate={handleNavigate} />;
    } else if (currentRoute === '/register') {
      publicContent = <RegisterPage onNavigate={handleNavigate} />;
    } else {
      publicContent = <LandingPage onNavigate={handleNavigate} />;
    }

    return <PublicLayout onNavigate={handleNavigate}>{publicContent}</PublicLayout>;
  }

  // 2. ADMIN ROUTES (Strictly accessible ONLY by authenticated users with role === 'admin')
  if (role === 'admin') {
    const renderAdminPage = () => {
      switch (currentRoute) {
        case '/admin':
        case '/admin/dashboard':
          return <AdminDashboardPage onNavigate={handleNavigate} />;
        case '/admin/students':
          return <AdminStudentsPage onNavigate={handleNavigate} />;
        case '/admin/companies':
          return <AdminCompaniesPage onNavigate={handleNavigate} />;
        case '/admin/jobs':
          return <AdminJobsPage onNavigate={handleNavigate} />;
        case '/admin/applications':
          return <AdminApplicationsPage onNavigate={handleNavigate} />;
        case '/admin/placements':
          return <AdminPlacementsPage onNavigate={handleNavigate} />;
        case '/admin/analytics':
          return <AdminAnalyticsPage onNavigate={handleNavigate} />;
        case '/admin/settings':
          return <AdminSettingsPage onNavigate={handleNavigate} />;
        default:
          return <AdminDashboardPage onNavigate={handleNavigate} />;
      }
    };

    return (
      <AdminLayout
        currentPage={currentRoute}
        onNavigate={handleNavigate}
        pageTitle={getPageTitle(currentRoute)}
      >
        {renderAdminPage()}
      </AdminLayout>
    );
  }

  // 3. COMPANY ROUTES (Strictly accessible ONLY by authenticated users with role === 'company')
  if (role === 'company') {
    const renderCompanyPage = () => {
      switch (currentRoute) {
        case '/company':
        case '/company/dashboard':
          return <CompanyDashboardPage onNavigate={handleNavigate} />;
        case '/company/profile':
          return <CompanyProfilePage onNavigate={handleNavigate} />;
        case '/company/jobs':
          return <CompanyJobsPage onNavigate={handleNavigate} />;
        case '/company/applicants':
          return <CompanyApplicantsPage onNavigate={handleNavigate} />;
        case '/company/interviews':
          return <CompanyInterviewsPage onNavigate={handleNavigate} />;
        case '/company/hiring':
          return <CompanyHiringPage onNavigate={handleNavigate} />;
        case '/company/settings':
          return <CompanySettingsPage onNavigate={handleNavigate} />;
        default:
          return <CompanyDashboardPage onNavigate={handleNavigate} />;
      }
    };

    return (
      <CompanyLayout
        currentPage={currentRoute}
        onNavigate={handleNavigate}
        pageTitle={getPageTitle(currentRoute)}
      >
        {renderCompanyPage()}
      </CompanyLayout>
    );
  }

  // 4. STUDENT ROUTES (Strictly accessible ONLY by authenticated users with role === 'student')
  const renderStudentPage = () => {
    if (currentRoute.startsWith('/jobs/')) {
      const jobId = currentRoute.replace('/jobs/', '') || '101';
      return <JobDetailsPage onNavigate={handleNavigate} jobId={jobId} />;
    }

    switch (currentRoute) {
      case '/dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case '/profile':
        return <ProfilePage onNavigate={handleNavigate} />;
      case '/jobs':
        return <JobsPage onNavigate={handleNavigate} />;
      case '/applications':
        return <ApplicationsPage onNavigate={handleNavigate} />;
      case '/analytics':
        return <AnalyticsPage />;
      case '/prediction':
        return <PredictionPage onNavigate={handleNavigate} />;
      case '/recommendations':
        return <RecommendationsPage onNavigate={handleNavigate} />;
      case '/settings':
        return <SettingsPage />;
      default:
        return <DashboardPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <StudentLayout
      currentPage={currentRoute}
      onNavigate={handleNavigate}
      pageTitle={getPageTitle(currentRoute)}
    >
      {renderStudentPage()}
    </StudentLayout>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ToastProvider>
  );
}



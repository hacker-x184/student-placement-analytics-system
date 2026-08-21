export const APP_NAME = 'CareerLens';
export const APP_TAGLINE = 'See Your Career Clearly.';
export const APP_DESCRIPTION = 'College Placement & Hiring Intelligence Platform';
export const APP_TECHNICAL_NAME = 'Student Placement Analytics System (SPAS)';
export const APP_VERSION = '1.0.0';

export const USER_ROLES = {
  STUDENT: 'student',
  COMPANY: 'company',
  ADMIN: 'admin',
} as const;

export const ROUTES = {
  PUBLIC: {
    LANDING: '/',
    LOGIN: '/login',
    REGISTER: '/register',
  },
  STUDENT: {
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    JOBS: '/jobs',
    JOB_DETAILS: (id: string = ':id') => `/jobs/${id}`,
    APPLICATIONS: '/applications',
    ANALYTICS: '/analytics',
    PREDICTION: '/prediction',
    RECOMMENDATIONS: '/recommendations',
    SETTINGS: '/settings',
  },
  COMPANY: {
    DASHBOARD: '/company',
    PROFILE: '/company/profile',
    JOBS: '/company/jobs',
    APPLICANTS: '/company/applicants',
    INTERVIEWS: '/company/interviews',
    HIRING: '/company/hiring',
    SETTINGS: '/company/settings',
  },
  ADMIN: {
    DASHBOARD: '/admin',
    STUDENTS: '/admin/students',
    COMPANIES: '/admin/companies',
    JOBS: '/admin/jobs',
    APPLICATIONS: '/admin/applications',
    PLACEMENTS: '/admin/placements',
    ANALYTICS: '/admin/analytics',
    SETTINGS: '/admin/settings',
  },
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
  },
  STUDENTS: {
    LIST: '/students',
    GET: (id: string) => `/students/${id}`,
    PROFILE: '/students/profile',
    UPDATE_PROFILE: '/students/profile',
  },
  COMPANIES: {
    LIST: '/companies',
    GET: (id: string) => `/companies/${id}`,
    CREATE: '/companies',
    UPDATE: (id: string) => `/companies/${id}`,
  },
  JOBS: {
    LIST: '/jobs',
    GET: (id: string) => `/jobs/${id}`,
    CREATE: '/jobs',
    UPDATE: (id: string) => `/jobs/${id}`,
    APPLY: (id: string) => `/jobs/${id}/apply`,
  },
  APPLICATIONS: {
    LIST: '/applications',
    GET: (id: string) => `/applications/${id}`,
    STATUS_UPDATE: (id: string) => `/applications/${id}/status`,
  },
  PLACEMENTS: {
    LIST: '/placements',
    RECORDS: '/placements/records',
    VERIFY: (id: string) => `/placements/${id}/verify`,
  },
  ANALYTICS: {
    OVERVIEW: '/analytics/overview',
    DEPARTMENT: '/analytics/departments',
    HISTORICAL: '/analytics/historical',
    SKILLS: '/analytics/skills',
  },
  PREDICTION: {
    PREDICT: '/prediction/placement-likelihood',
    FACTORS: '/prediction/factors',
  },
  RECOMMENDATIONS: {
    JOBS: '/recommendations/jobs',
    SKILLS: '/recommendations/skills',
  },
} as const;

export const BRANCH_OPTIONS = [
  'Computer Science Engineering',
  'Information Technology',
  'Electronics & Communication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Data Science & AI',
] as const;

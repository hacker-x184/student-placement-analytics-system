import { Application, Job } from '../types';
import { INITIAL_APPLICATIONS, INITIAL_JOBS } from '../data/mockData';

export interface DashboardStats {
  applications: {
    total: number;
    trend?: { value: string; isPositive: boolean; label?: string };
  };
  shortlisted: {
    total: number;
    trend?: { value: string; isPositive: boolean; label?: string };
  };
  interviews: {
    total: number;
    trend?: { value: string; isPositive: boolean; label?: string };
  };
  placement: {
    status: 'Seeking' | 'In Process' | 'Placed';
    label: string;
    subtitle?: string;
  };
}

export interface UpcomingActivity {
  id: string;
  title: string;
  type: 'interview' | 'assessment' | 'deadline' | 'drive';
  company: string;
  companyInitial?: string;
  date: string;
  time?: string;
  locationOrLink?: string;
  actionRequired?: boolean;
}

export interface StudentDashboardData {
  student: {
    name: string;
    branch: string;
    batchYear: number;
    cgpa: number;
    activeCycle: string;
  };
  stats: DashboardStats;
  recentApplications: Application[];
  recommendedJobs: Job[];
  upcomingActivities: UpcomingActivity[];
}

// Initial Mock Dashboard Data
const MOCK_STUDENT_DASHBOARD_DATA: StudentDashboardData = {
  student: {
    name: 'Lucky',
    branch: 'Computer Science',
    batchYear: 2027,
    cgpa: 8.7,
    activeCycle: 'Active Recruitment Cycle 2026-27',
  },
  stats: {
    applications: {
      total: 12,
      trend: { value: '+3 this week', isPositive: true, label: 'vs last week' },
    },
    shortlisted: {
      total: 4,
      trend: { value: '33% conversion', isPositive: true, label: 'shortlist rate' },
    },
    interviews: {
      total: 2,
      trend: { value: '1 round upcoming', isPositive: true, label: 'active rounds' },
    },
    placement: {
      status: 'In Process',
      label: 'In Process',
      subtitle: 'Technical Assessment Phase',
    },
  },
  recentApplications: INITIAL_APPLICATIONS.slice(0, 4),
  recommendedJobs: INITIAL_JOBS.slice(0, 3),
  upcomingActivities: [
    {
      id: 'act-1',
      title: 'Technical Interview Round 1',
      type: 'interview',
      company: 'TechNova Solutions',
      companyInitial: 'TN',
      date: 'Tomorrow',
      time: '2:00 PM - 3:00 PM EST',
      locationOrLink: 'https://meet.google.com/spas-interview-session',
      actionRequired: true,
    },
    {
      id: 'act-2',
      title: 'Online Coding Assessment',
      type: 'assessment',
      company: 'Global Tech Corp',
      companyInitial: 'GT',
      date: 'Oct 24, 2024',
      time: '6:00 PM EST (90 mins)',
      locationOrLink: 'Portal Test Environment',
      actionRequired: false,
    },
    {
      id: 'act-3',
      title: 'Application Deadline: SDE Intern',
      type: 'deadline',
      company: 'InnovateTech',
      companyInitial: 'IN',
      date: 'Oct 25, 2024',
      time: '11:59 PM EST',
      actionRequired: false,
    },
  ],
};

/**
 * Dashboard Service
 * Provides mock data for Phase 3; easily pluggable into future backend endpoints.
 */
export const dashboardService = {
  /**
   * Fetch complete student dashboard overview data
   */
  getStudentDashboardData: async (options?: {
    simulateEmpty?: boolean;
    simulateError?: boolean;
  }): Promise<StudentDashboardData> => {
    // Simulate realistic async network latency
    await new Promise((resolve) => setTimeout(resolve, 350));

    if (options?.simulateError) {
      throw new Error('Unable to load student dashboard metrics. Please check your network connection.');
    }

    if (options?.simulateEmpty) {
      return {
        student: {
          name: 'Lucky',
          branch: 'Computer Science',
          batchYear: 2027,
          cgpa: 8.7,
          activeCycle: 'Active Recruitment Cycle 2026-27',
        },
        stats: {
          applications: { total: 0 },
          shortlisted: { total: 0 },
          interviews: { total: 0 },
          placement: { status: 'Seeking', label: 'Seeking Placement', subtitle: 'No active applications' },
        },
        recentApplications: [],
        recommendedJobs: [],
        upcomingActivities: [],
      };
    }

    return MOCK_STUDENT_DASHBOARD_DATA;
  },

  /**
   * Fetch only KPI Statistics
   */
  getDashboardStats: async (): Promise<DashboardStats> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MOCK_STUDENT_DASHBOARD_DATA.stats;
  },

  /**
   * Fetch recent applications subset
   */
  getRecentApplications: async (): Promise<Application[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MOCK_STUDENT_DASHBOARD_DATA.recentApplications;
  },

  /**
   * Fetch recommended jobs subset
   */
  getRecommendedJobs: async (): Promise<Job[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MOCK_STUDENT_DASHBOARD_DATA.recommendedJobs;
  },
};

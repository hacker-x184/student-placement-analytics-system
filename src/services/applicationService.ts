import { Application, ApplicationStatus } from '../types';
import { INITIAL_APPLICATIONS, INITIAL_JOBS } from '../data/mockData';

// In-memory applications state for persistent client-side reactivity across views
let applicationsState: Application[] = JSON.parse(JSON.stringify(INITIAL_APPLICATIONS));

export interface ApplicationFilterParams {
  status?: string;
  search?: string;
  category?: 'active' | 'history' | 'all';
}

const delay = (ms: number = 200) => new Promise((resolve) => setTimeout(resolve, ms));

export const applicationService = {
  /**
   * Fetches student applications matching optional search and status filters
   */
  getApplications: async (filters?: ApplicationFilterParams): Promise<Application[]> => {
    await delay(250);
    let result = [...applicationsState];

    if (!filters) return result;

    // 1. Status Filter
    if (filters.status && filters.status !== 'All' && filters.status !== 'all') {
      const targetStatus = filters.status.toLowerCase();
      result = result.filter((app) => app.status.toLowerCase() === targetStatus);
    }

    // 2. Search Query (Role / Company)
    if (filters.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (app) =>
          app.jobTitle.toLowerCase().includes(q) ||
          app.company.toLowerCase().includes(q) ||
          (app.location && app.location.toLowerCase().includes(q))
      );
    }

    // 3. Category Filter (Active vs History)
    if (filters.category && filters.category !== 'all') {
      result = result.filter((app) => app.statusCategory === filters.category);
    }

    return result;
  },

  /**
   * Fetches a single application by its unique ID
   */
  getApplicationById: async (id: string): Promise<Application | null> => {
    await delay(150);
    const found = applicationsState.find((a) => a.id === id || a.id === `app-${id}`);
    return found ? { ...found } : null;
  },

  /**
   * Retrieves application for a specific Job ID if it exists
   */
  getApplicationByJobId: async (jobId: string): Promise<Application | null> => {
    await delay(100);
    const found = applicationsState.find((a) => a.jobId === jobId || a.jobId === `job-${jobId}`);
    return found ? { ...found } : null;
  },

  /**
   * Checks if the student has already applied for a specific job
   */
  hasApplied: async (jobId: string): Promise<boolean> => {
    await delay(100);
    return applicationsState.some((a) => a.jobId === jobId || a.jobId === `job-${jobId}`);
  },

  /**
   * Submits a new application for a campus recruitment drive
   */
  createApplication: async (jobId: string): Promise<Application> => {
    return applicationService.submitApplication({ jobId });
  },

  /**
   * Submits a new application with optional metadata
   */
  submitApplication: async (params: {
    jobId: string;
    jobTitle?: string;
    company?: string;
    location?: string;
    package?: string;
    studentId?: string;
    studentName?: string;
    studentEmail?: string;
    studentCgpa?: number;
    studentBranch?: string;
  }): Promise<Application> => {
    await delay(300);
    const { jobId } = params;

    // 1. Check for duplicate application
    const isDuplicate = applicationsState.some(
      (a) => a.jobId === jobId || a.jobId === `job-${jobId}`
    );
    if (isDuplicate) {
      throw new Error('You have already applied for this job.');
    }

    // 2. Find referenced Job data
    const matchedJob = INITIAL_JOBS.find((j) => j.id === jobId || j.id === `job-${jobId}`);
    const jobTitle = params.jobTitle || matchedJob?.title || 'Software Engineer';
    const company = params.company || matchedJob?.company || 'Recruiter Drive';
    const companyInitial = matchedJob?.companyInitial || company.substring(0, 2).toUpperCase();
    const location = params.location || matchedJob?.location || 'Campus / Multiple';
    const pkg = params.package || matchedJob?.package || 'Competitive';

    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString('default', { month: 'short' })} ${now.getFullYear()}`;
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 3. Create new application record
    const newApplication: Application = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle,
      company,
      companyInitial,
      location,
      package: pkg,
      studentId: params.studentId || 'stu-101',
      studentName: params.studentName || 'Lucky Sharma',
      studentEmail: params.studentEmail || 'lucky.s@college.edu',
      studentCgpa: params.studentCgpa || 8.7,
      studentBranch: params.studentBranch || 'Computer Science',
      appliedDate: formattedDate,
      status: 'Applied',
      statusCategory: 'active',
      timeline: [
        {
          id: `tl-${Date.now()}`,
          stage: 'Application Submitted',
          title: 'Application Submitted',
          date: formattedDate,
          time: formattedTime,
          description: 'Your application has been received by the recruiter.',
          completed: true,
          isCompleted: true,
          active: true,
          isCurrent: true,
        },
        {
          id: `tl-${Date.now() + 1}`,
          stage: 'Resume & Eligibility Screening',
          title: 'Resume & Eligibility Screening',
          date: 'Pending',
          description: 'Recruitment panel reviewing your profile criteria.',
          completed: false,
          isCompleted: false,
          active: false,
          isCurrent: false,
        },
      ],
    };

    applicationsState = [newApplication, ...applicationsState];
    return { ...newApplication };
  },

  /**
   * Compatibility function for older endpoints
   */
  getAllApplications: async (params?: Record<string, any>) => {
    return applicationService.getApplications(params as ApplicationFilterParams);
  },

  /**
   * Updates application status (for admin/recruiter simulator if needed)
   */
  updateApplicationStatus: async (id: string, status: ApplicationStatus, notes?: string) => {
    await delay(200);
    const index = applicationsState.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new Error(`Application with ID ${id} not found.`);
    }

    applicationsState[index] = {
      ...applicationsState[index],
      status,
      statusCategory: status === 'Selected' || status === 'Rejected' ? 'history' : 'active',
    };

    return { ...applicationsState[index] };
  },
};

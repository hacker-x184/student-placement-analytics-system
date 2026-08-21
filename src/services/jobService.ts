import { Job } from '../types';
import { INITIAL_JOBS } from '../data/mockData';

// In-memory jobs state for realistic client-side reactivity and persistence
let jobsState: Job[] = JSON.parse(JSON.stringify(INITIAL_JOBS));

export interface JobFilterParams {
  search?: string;
  branch?: string;
  minCgpa?: number;
  jobType?: string;
  status?: string;
  sortBy?: 'deadline' | 'package_desc' | 'cgpa_asc' | 'match_desc';
}

const delay = (ms: number = 200) => new Promise((resolve) => setTimeout(resolve, ms));

export const jobService = {
  /**
   * Fetches all available jobs matching optional query filters
   */
  getJobs: async (filters?: JobFilterParams): Promise<Job[]> => {
    await delay(200);
    let result = [...jobsState];

    if (!filters) return result;

    // 1. Search Query (Title, Company, Skills, Description)
    if (filters.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.location.toLowerCase().includes(q) ||
          job.requiredSkills.some((s) => s.toLowerCase().includes(q)) ||
          job.preferredSkills.some((s) => s.toLowerCase().includes(q))
      );
    }

    // 2. Department / Branch Eligibility
    if (filters.branch && filters.branch !== 'All' && filters.branch !== 'All Branches') {
      const b = filters.branch.toLowerCase();
      result = result.filter((job) =>
        job.eligibleBranches.some(
          (br) =>
            br.toLowerCase() === 'all' ||
            br.toLowerCase() === 'all branches' ||
            br.toLowerCase().includes(b) ||
            b.includes(br.toLowerCase())
        )
      );
    }

    // 3. Minimum CGPA filter (Candidate must meet job requirement, or filter for jobs where minCgpa <= threshold)
    if (filters.minCgpa !== undefined && filters.minCgpa > 0) {
      result = result.filter((job) => job.minCgpa <= filters.minCgpa!);
    }

    // 4. Job Type / Category
    if (filters.jobType && filters.jobType !== 'All') {
      result = result.filter((job) => job.jobType.toLowerCase() === filters.jobType?.toLowerCase());
    }

    // 5. Job Status
    if (filters.status && filters.status !== 'All') {
      result = result.filter((job) => job.status.toLowerCase() === filters.status?.toLowerCase());
    }

    // 6. Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'package_desc':
          result.sort((a, b) => b.packageNumeric - a.packageNumeric);
          break;
        case 'cgpa_asc':
          result.sort((a, b) => a.minCgpa - b.minCgpa);
          break;
        case 'match_desc':
          result.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
          break;
        case 'deadline':
        default:
          // Keep default order or sort by active status
          result.sort((a, b) => (a.status === 'Active' ? -1 : 1));
          break;
      }
    }

    return result;
  },

  /**
   * Compatibility alias for getAllJobs
   */
  getAllJobs: async (params?: Record<string, any>) => {
    return jobService.getJobs(params as JobFilterParams);
  },

  /**
   * Fetches a single job by unique identifier
   */
  getJobById: async (id: string): Promise<Job | null> => {
    await delay(150);
    const found = jobsState.find((j) => j.id === id || j.id === `job-${id}`);
    return found ? { ...found } : null;
  },

  /**
   * Toggles bookmark / saved status for a job
   */
  toggleSaveJob: async (id: string): Promise<Job> => {
    await delay(100);
    const index = jobsState.findIndex((j) => j.id === id || j.id === `job-${id}`);
    if (index === -1) {
      throw new Error(`Job with ID ${id} was not found.`);
    }

    jobsState[index] = {
      ...jobsState[index],
      isSaved: !jobsState[index].isSaved,
    };

    return { ...jobsState[index] };
  },

  /**
   * Simulates an application intent initiation (UI placeholder, no backend submission)
   */
  applyForJob: async (jobId: string, payload?: any): Promise<{ success: boolean; message: string }> => {
    await delay(300);
    return {
      success: true,
      message: 'Application intent initiated successfully.',
    };
  },

  /**
   * Admin / management placeholders
   */
  createJob: async (jobData: any) => {
    await delay(200);
    const newJob: Job = {
      ...jobData,
      id: `job-${Date.now()}`,
    };
    jobsState.unshift(newJob);
    return newJob;
  },

  updateJob: async (id: string, jobData: any) => {
    await delay(200);
    const index = jobsState.findIndex((j) => j.id === id);
    if (index !== -1) {
      jobsState[index] = { ...jobsState[index], ...jobData };
      return jobsState[index];
    }
    throw new Error('Job not found');
  },
};

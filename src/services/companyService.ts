import { apiClient } from './api';
import { API_ENDPOINTS } from '../utils/constants';
import { CompanyDashboardData } from '../types';

export const MOCK_COMPANY_DASHBOARD_DATA: CompanyDashboardData = {
  company: {
    name: 'TechNova Technologies',
    industry: 'Technology',
    location: 'Bengaluru, India',
    verified: true,
  },
  kpis: {
    activeJobs: 4,
    totalApplicants: 126,
    shortlisted: 32,
    interviews: 18,
    selected: 6,
  },
  recentApplications: [
    {
      id: 'app-c-1',
      candidateName: 'Rahul Sharma',
      position: 'Software Engineer',
      appliedDate: 'Today',
      status: 'Shortlisted',
      email: 'rahul.sharma@college.edu',
      location: 'Bengaluru',
      matchScore: 94,
    },
    {
      id: 'app-c-2',
      candidateName: 'Priya Shah',
      position: 'Data Analyst',
      appliedDate: 'Yesterday',
      status: 'Interview',
      email: 'priya.shah@college.edu',
      location: 'Hyderabad',
      matchScore: 89,
    },
    {
      id: 'app-c-3',
      candidateName: 'Aman Verma',
      position: 'Frontend Developer',
      appliedDate: '2 days ago',
      status: 'Applied',
      email: 'aman.verma@college.edu',
      location: 'Remote',
      matchScore: 91,
    },
    {
      id: 'app-c-4',
      candidateName: 'Sneha Patel',
      position: 'ML Intern',
      appliedDate: '3 days ago',
      status: 'Selected',
      email: 'sneha.patel@college.edu',
      location: 'Bengaluru',
      matchScore: 96,
    },
  ],
  activeJobs: [
    {
      id: 'job-c-1',
      title: 'Software Engineer',
      company: 'TechNova Technologies',
      location: 'Bengaluru',
      package: '₹12–15 LPA',
      applicantsCount: 84,
      status: 'Active',
      jobType: 'Full-time',
      postedDate: 'Oct 12, 2024',
    },
    {
      id: 'job-c-2',
      title: 'Data Analyst',
      company: 'TechNova Technologies',
      location: 'Hyderabad',
      package: '₹8–11 LPA',
      applicantsCount: 42,
      status: 'Active',
      jobType: 'Full-time',
      postedDate: 'Oct 15, 2024',
    },
    {
      id: 'job-c-3',
      title: 'Frontend Developer',
      company: 'TechNova Technologies',
      location: 'Remote',
      package: '₹7–10 LPA',
      applicantsCount: 31,
      status: 'Active',
      jobType: 'Full-time',
      postedDate: 'Oct 18, 2024',
    },
    {
      id: 'job-c-4',
      title: 'ML Intern',
      company: 'TechNova Technologies',
      location: 'Bengaluru',
      package: '₹5–7 LPA',
      applicantsCount: 28,
      status: 'Active',
      jobType: 'Internship',
      postedDate: 'Oct 20, 2024',
    },
  ],
  pipeline: [
    { stage: 'Applied', count: 126, percentage: 100 },
    { stage: 'Shortlisted', count: 32, percentage: 25.4 },
    { stage: 'Interview', count: 18, percentage: 14.3 },
    { stage: 'Selected', count: 6, percentage: 4.8 },
  ],
  recentActivity: [
    {
      id: 'act-c-1',
      candidateName: 'Rahul Sharma',
      action: 'was shortlisted for',
      position: 'Software Engineer',
      timestamp: '10 min ago',
      type: 'shortlist',
    },
    {
      id: 'act-c-2',
      candidateName: 'Priya Shah',
      action: 'moved to Interview for',
      position: 'Data Analyst',
      timestamp: '1 hour ago',
      type: 'interview',
    },
    {
      id: 'act-c-3',
      candidateName: 'Sneha Patel',
      action: 'was selected for',
      position: 'ML Intern',
      timestamp: 'Yesterday',
      type: 'select',
    },
  ],
  hiringInsight: {
    title: 'Hiring Insight',
    description: 'Software Engineer currently has the highest applicant volume with 84 applications.',
    highlightRole: 'Software Engineer',
    highlightCount: 84,
    jobId: 'job-c-1',
  },
};

export const companyService = {
  getCompanyDashboardData: async (shouldFail: boolean = false): Promise<CompanyDashboardData> => {
    // Realistic simulated network delay
    await new Promise((resolve) => setTimeout(resolve, 350));

    if (shouldFail) {
      throw new Error('Unable to load recruitment data.');
    }

    return JSON.parse(JSON.stringify(MOCK_COMPANY_DASHBOARD_DATA));
  },
  getAllCompanies: async (params?: Record<string, any>) => {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiClient.get(`${API_ENDPOINTS.COMPANIES.LIST}${query}`);
  },
  getCompanyById: async (id: string) => {
    return apiClient.get(API_ENDPOINTS.COMPANIES.GET(id));
  },
  createCompany: async (companyData: any) => {
    return apiClient.post(API_ENDPOINTS.COMPANIES.CREATE, companyData);
  },
  updateCompany: async (id: string, companyData: any) => {
    return apiClient.put(API_ENDPOINTS.COMPANIES.UPDATE(id), companyData);
  },
};


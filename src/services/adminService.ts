import { apiClient } from './api';
import { API_ENDPOINTS } from '../utils/constants';
import { TpoDashboardData } from '../types';

export const MOCK_TPO_DASHBOARD_DATA: TpoDashboardData = {
  college: {
    name: 'ABC Institute of Technology',
    academicYear: '2026–27',
    department: 'Training & Placement Cell (TPO)',
    verified: true,
  },
  kpis: {
    totalStudents: 1240,
    placedStudents: 892,
    placementRate: 71.9,
    activeCompanies: 84,
    activeJobs: 126,
    applications: 4820,
  },
  placementOverview: {
    placementRate: 71.9,
    placed: 892,
    notPlaced: 348,
  },
  packageOverview: {
    averagePackage: '₹8.4 LPA',
    highestPackage: '₹32 LPA',
    medianPackage: '₹7.2 LPA',
  },
  departmentPlacements: [
    { department: 'CSE', rate: 82, placedCount: 410, totalCount: 500 },
    { department: 'IT', rate: 78, placedCount: 234, totalCount: 300 },
    { department: 'ECE', rate: 69, placedCount: 172, totalCount: 250 },
    { department: 'ME', rate: 61, placedCount: 76, totalCount: 125 },
  ],
  recentPlacements: [
    {
      id: 'place-1',
      studentName: 'Rahul Sharma',
      company: 'TechNova',
      role: 'Software Engineer',
      package: '₹14 LPA',
      date: 'Today',
      branch: 'CSE',
    },
    {
      id: 'place-2',
      studentName: 'Priya Shah',
      company: 'DataSphere',
      role: 'Data Analyst',
      package: '₹9 LPA',
      date: 'Yesterday',
      branch: 'IT',
    },
    {
      id: 'place-3',
      studentName: 'Aman Verma',
      company: 'CloudCore',
      role: 'Frontend Developer',
      package: '₹8 LPA',
      date: '2 days ago',
      branch: 'CSE',
    },
  ],
  activeRecruitments: [
    {
      id: 'rec-1',
      company: 'TechNova',
      job: 'Software Engineer',
      applicants: 84,
      deadline: '28 Aug',
      status: 'Active',
      location: 'Bengaluru',
    },
    {
      id: 'rec-2',
      company: 'DataSphere',
      job: 'Data Analyst',
      applicants: 42,
      deadline: '30 Aug',
      status: 'Active',
      location: 'Hyderabad',
    },
    {
      id: 'rec-3',
      company: 'CloudCore',
      job: 'Frontend Developer',
      applicants: 31,
      deadline: '2 Sep',
      status: 'Active',
      location: 'Remote',
    },
  ],
  placementTrends: [
    { year: '2023', rate: 64 },
    { year: '2024', rate: 68 },
    { year: '2025', rate: 70 },
    { year: '2026', rate: 71.9 },
  ],
};

export const adminService = {
  getTpoDashboardData: async (shouldFail: boolean = false): Promise<TpoDashboardData> => {
    // Realistic simulated network delay
    await new Promise((resolve) => setTimeout(resolve, 350));

    if (shouldFail) {
      throw new Error('Unable to load placement overview.');
    }

    return JSON.parse(JSON.stringify(MOCK_TPO_DASHBOARD_DATA));
  },
};

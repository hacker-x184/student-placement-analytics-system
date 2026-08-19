import { StudentProfile } from '../types';
import { apiClient } from './api';
import { API_ENDPOINTS } from '../utils/constants';

// Initial Mock Student Profile for Lucky
const DEFAULT_STUDENT_PROFILE: StudentProfile = {
  id: 'stu-101',
  userId: 'usr-student-01',
  name: 'Lucky',
  email: 'lucky@college.edu',
  phone: '+1 (555) 349-8821',
  address: '124 Academic Way, Tech Campus, Building B',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  branch: 'Computer Science Engineering',
  batchYear: 2027,
  cgpa: 8.7,
  backlogs: 0,
  skills: [
    'Python',
    'Java',
    'React.js',
    'TypeScript',
    'Data Structures & Algorithms',
    'SQL',
    'Machine Learning',
    'TailwindCSS',
    'Git & GitHub',
    'FastAPI',
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Student Placement Analytics System (SPAS)',
      description: 'Comprehensive campus placement analytics portal with ML-driven eligibility scoring and recruiter intelligence.',
      techStack: ['React', 'TypeScript', 'FastAPI', 'TailwindCSS'],
      link: 'https://github.com/lucky/placement-analytics',
    },
    {
      id: 'proj-2',
      title: 'Real-Time Collaborative Code Editor',
      description: 'Web-based shared coding environment with syntax highlighting, operational transformation, and WebRTC audio chat.',
      techStack: ['React', 'Node.js', 'Socket.io', 'WebRTC'],
      link: 'https://github.com/lucky/collab-code',
    },
  ],
  internships: [
    {
      id: 'intern-1',
      role: 'Software Engineering Intern',
      company: 'TechNova Solutions',
      duration: 'May 2024 - July 2024 (3 mos)',
      description: 'Engineered REST microservices in Java Spring Boot and automated CI/CD pipelines reducing deployment time by 28%.',
    },
    {
      id: 'intern-2',
      role: 'Frontend Developer Intern',
      company: 'InnovateTech Labs',
      duration: 'Jan 2024 - Mar 2024 (3 mos)',
      description: 'Built accessible, responsive UI component libraries in React with 98% test coverage and WCAG AA compliance.',
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'AWS Certified Cloud Practitioner (CLF-C02)',
      issuer: 'Amazon Web Services',
      issueDate: 'Aug 2024',
    },
    {
      id: 'cert-2',
      title: 'Deep Learning Specialization',
      issuer: 'DeepLearning.AI / Coursera',
      issueDate: 'Nov 2023',
    },
  ],
  resumeUrl: 'https://example.com/resumes/Lucky_Resume_2027.pdf',
  placementStatus: 'In Process',
  placedCompany: undefined,
  placedPackage: undefined,
};

// In-memory state store for mock profile
let currentProfile: StudentProfile = { ...DEFAULT_STUDENT_PROFILE };

// Isolated flag for mock mode
const USE_MOCK_PROFILE = true;

export const studentService = {
  /**
   * Fetch student profile
   */
  getProfile: async (options?: { simulateError?: boolean }): Promise<StudentProfile> => {
    if (USE_MOCK_PROFILE) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      if (options?.simulateError) {
        throw new Error('Failed to retrieve student profile. Please verify your connection.');
      }
      return JSON.parse(JSON.stringify(currentProfile));
    }
    return apiClient.get(API_ENDPOINTS.STUDENTS.PROFILE);
  },

  /**
   * Update student profile
   */
  updateProfile: async (
    updatedData: Partial<StudentProfile>,
    options?: { simulateError?: boolean }
  ): Promise<StudentProfile> => {
    if (USE_MOCK_PROFILE) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      if (options?.simulateError) {
        throw new Error('Failed to save profile changes. Please try again.');
      }
      currentProfile = {
        ...currentProfile,
        ...updatedData,
      };
      return JSON.parse(JSON.stringify(currentProfile));
    }
    return apiClient.put(API_ENDPOINTS.STUDENTS.UPDATE_PROFILE, updatedData);
  },

  /**
   * Reset to default profile (useful for testing)
   */
  resetProfile: (): void => {
    currentProfile = { ...DEFAULT_STUDENT_PROFILE };
  },

  getAllStudents: async (params?: Record<string, any>) => {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiClient.get(`${API_ENDPOINTS.STUDENTS.LIST}${query}`);
  },

  getStudentById: async (id: string) => {
    return apiClient.get(API_ENDPOINTS.STUDENTS.GET(id));
  },
};

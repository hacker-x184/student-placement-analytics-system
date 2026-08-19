import { apiClient } from './api';
import { API_ENDPOINTS } from '../utils/constants';
import { AuthUser } from '../context/AuthContext';

export interface LoginCredentials {
  email: string;
  password?: string;
  role?: 'student' | 'company' | 'admin';
}

export interface RegisterPayload {
  name: string;
  email: string;
  password?: string;
  role?: 'student' | 'company' | 'admin';
  companyName?: string;
}

export interface AuthResponse {
  user: AuthUser;
  message?: string;
}

// Flag to use mock adapter in UI-only development phases
const USE_MOCK_AUTH = true;

/**
 * CareerLens Mock Test Accounts & Isolated Authentication Adapter
 * Enforces role isolation ('student' | 'company' | 'admin') without fake tokens
 */
export const MOCK_TEST_ACCOUNTS = {
  student: {
    id: 'usr-student-01',
    name: 'Lucky Sharma',
    email: 'student@college.edu',
    role: 'student' as const,
    branch: 'Computer Science Engineering',
    department: 'Computer Science & Engineering',
  },
  company: {
    id: 'usr-company-01',
    name: 'TechNova Technologies',
    email: 'recruiter@technova.com',
    role: 'company' as const,
    companyId: 'comp-1',
    companyName: 'TechNova Technologies',
    department: 'Talent Acquisition & Hiring',
    designation: 'Recruiter',
  },
  admin: {
    id: 'usr-admin-01',
    name: 'ABC Institute of Technology',
    email: 'admin@college.edu',
    role: 'admin' as const,
    companyName: 'ABC Institute of Technology',
    department: 'Training & Placement Cell (TPO)',
    designation: 'TPO Admin',
  },
};

const mockAuthAdapter = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulate brief network delay for authentic UI loading states
    await new Promise((resolve) => setTimeout(resolve, 400));

    const email = credentials.email.trim().toLowerCase();

    // Mock validation: reject invalid demo trigger
    if (credentials.password === 'wrongpassword') {
      throw new Error('Invalid email or password. Please verify your credentials.');
    }

    const isAdmin =
      email.includes('admin') ||
      email.includes('tpo') ||
      credentials.role === 'admin' ||
      email === 'admin@college.edu';

    const isCompany =
      email.includes('recruiter') ||
      email.includes('company') ||
      email.includes('technova') ||
      credentials.role === 'company' ||
      email === 'recruiter@technova.com';

    let mockUser: AuthUser;

    if (isAdmin) {
      mockUser = {
        ...MOCK_TEST_ACCOUNTS.admin,
        email: credentials.email || MOCK_TEST_ACCOUNTS.admin.email,
      };
    } else if (isCompany) {
      mockUser = {
        ...MOCK_TEST_ACCOUNTS.company,
        email: credentials.email || MOCK_TEST_ACCOUNTS.company.email,
      };
    } else {
      mockUser = {
        ...MOCK_TEST_ACCOUNTS.student,
        name: email.startsWith('lucky') ? 'Lucky' : (credentials.email.split('@')[0] || 'Lucky Sharma'),
        email: credentials.email || MOCK_TEST_ACCOUNTS.student.email,
      };
    }

    return {
      user: mockUser,
      message: 'Authentication successful',
    };
  },

  register: async (payload: RegisterPayload): Promise<{ success: boolean; message: string }> => {
    // Simulate brief network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const email = payload.email.trim().toLowerCase();

    // Mock check: if email is already taken
    if (email === 'taken@college.edu') {
      throw new Error('An account with this institutional email already exists.');
    }

    return {
      success: true,
      message: 'Account registration completed successfully.',
    };
  },
};

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    if (USE_MOCK_AUTH) {
      return mockAuthAdapter.login(credentials);
    }
    // Future FastAPI endpoint: POST /auth/login
    return apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },

  register: async (payload: RegisterPayload): Promise<{ success: boolean; message: string }> => {
    if (USE_MOCK_AUTH) {
      return mockAuthAdapter.register(payload);
    }
    // Future FastAPI endpoint: POST /auth/register
    return apiClient.post(API_ENDPOINTS.AUTH.REGISTER, payload);
  },

  getCurrentUser: async () => {
    return apiClient.get(API_ENDPOINTS.AUTH.ME);
  },

  logout: async () => {
    if (USE_MOCK_AUTH) {
      return { success: true };
    }
    return apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },
};


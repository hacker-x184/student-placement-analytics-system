import { apiClient } from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const recommendationService = {
  getRecommendedJobs: async (studentId?: string) => {
    const query = studentId ? `?studentId=${studentId}` : '';
    return apiClient.get(`${API_ENDPOINTS.RECOMMENDATIONS.JOBS}${query}`);
  },
  getSkillRecommendations: async (studentId?: string) => {
    const query = studentId ? `?studentId=${studentId}` : '';
    return apiClient.get(`${API_ENDPOINTS.RECOMMENDATIONS.SKILLS}${query}`);
  },
};

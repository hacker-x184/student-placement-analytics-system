import { apiClient } from './api';
import { API_ENDPOINTS } from '../utils/constants';

export interface PredictionPayload {
  cgpa: number;
  backlogs: number;
  internships: number;
  projectsCount: number;
  aptitudeScore?: number;
  branch?: string;
  skills?: string[];
}

export const predictionService = {
  predictLikelihood: async (payload: PredictionPayload) => {
    return apiClient.post(API_ENDPOINTS.PREDICTION.PREDICT, payload);
  },
  getContributingFactors: async () => {
    return apiClient.get(API_ENDPOINTS.PREDICTION.FACTORS);
  },
};

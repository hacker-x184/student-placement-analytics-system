import { apiClient } from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const placementService = {
  getAllPlacements: async (params?: Record<string, any>) => {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiClient.get(`${API_ENDPOINTS.PLACEMENTS.LIST}${query}`);
  },
  getPlacementRecords: async () => {
    return apiClient.get(API_ENDPOINTS.PLACEMENTS.RECORDS);
  },
  verifyPlacement: async (id: string, verificationData: any) => {
    return apiClient.post(API_ENDPOINTS.PLACEMENTS.VERIFY(id), verificationData);
  },
};

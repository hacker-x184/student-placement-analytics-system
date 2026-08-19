import {
  StudentAnalyticsDashboardData,
  AnalyticsFilterParams,
  OverviewKPIs,
  CgpaPlacementTrend,
  BranchAnalytics,
  BatchPlacementTrend,
  BacklogPlacementTrend,
  InternshipPlacementTrend,
  ProjectPlacementTrend,
  CertificationPlacementTrend,
  SkillDemandItem,
  TopRecruiterItem,
  JobDomainDistribution,
  SalaryRangeDistribution,
  HistoricalPackageTrend,
} from '../types';
import { getMockAnalyticsDataset } from '../data/mockAnalyticsData';

/**
 * Placement Analytics Service
 * Retrieves structured analytics summaries and KPI datasets.
 * Future backend connects directly via FastAPI endpoints.
 */
export const analyticsService = {
  /**
   * Fetch complete dashboard dataset according to active filters
   */
  getAnalyticsDashboard: async (
    filters?: AnalyticsFilterParams,
    options?: { simulateError?: boolean; delayMs?: number }
  ): Promise<StudentAnalyticsDashboardData> => {
    const delay = options?.delayMs ?? 250;
    await new Promise((resolve) => setTimeout(resolve, delay));

    if (options?.simulateError) {
      throw new Error('Unable to retrieve placement analytics. Please verify your network connection.');
    }

    return getMockAnalyticsDataset(filters);
  },

  /**
   * Fetch top-level Overview KPIs
   */
  getOverviewKPIs: async (filters?: AnalyticsFilterParams): Promise<OverviewKPIs> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const data = getMockAnalyticsDataset(filters);
    return data.kpis;
  },

  /**
   * CGPA vs Placement distribution
   */
  getCgpaVsPlacement: async (filters?: AnalyticsFilterParams): Promise<CgpaPlacementTrend[]> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return getMockAnalyticsDataset(filters).cgpaVsPlacement;
  },

  /**
   * Branch-wise Placement metrics
   */
  getBranchPlacement: async (filters?: AnalyticsFilterParams): Promise<BranchAnalytics[]> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return getMockAnalyticsDataset(filters).branchPlacement;
  },

  /**
   * Batch-wise Placement trends
   */
  getBatchPlacement: async (filters?: AnalyticsFilterParams): Promise<BatchPlacementTrend[]> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return getMockAnalyticsDataset(filters).batchPlacement;
  },

  /**
   * Backlog impact on placement
   */
  getBacklogsVsPlacement: async (filters?: AnalyticsFilterParams): Promise<BacklogPlacementTrend[]> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return getMockAnalyticsDataset(filters).backlogsVsPlacement;
  },

  /**
   * Internship experience vs placement
   */
  getInternshipsVsPlacement: async (filters?: AnalyticsFilterParams): Promise<InternshipPlacementTrend[]> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return getMockAnalyticsDataset(filters).internshipsVsPlacement;
  },

  /**
   * Academic & Capstone projects vs placement
   */
  getProjectsVsPlacement: async (filters?: AnalyticsFilterParams): Promise<ProjectPlacementTrend[]> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return getMockAnalyticsDataset(filters).projectsVsPlacement;
  },

  /**
   * Industry certifications vs placement
   */
  getCertificationsVsPlacement: async (filters?: AnalyticsFilterParams): Promise<CertificationPlacementTrend[]> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return getMockAnalyticsDataset(filters).certificationsVsPlacement;
  },

  /**
   * Skill demand & proficiency comparison
   */
  getSkillAnalytics: async (filters?: AnalyticsFilterParams): Promise<SkillDemandItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return getMockAnalyticsDataset(filters).skillAnalytics;
  },

  /**
   * Top recruiting companies & hire volume
   */
  getCompanyHiring: async (filters?: AnalyticsFilterParams): Promise<TopRecruiterItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return getMockAnalyticsDataset(filters).companyHiring;
  },

  /**
   * Job distribution across industry domains
   */
  getJobDistribution: async (filters?: AnalyticsFilterParams): Promise<JobDomainDistribution[]> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return getMockAnalyticsDataset(filters).jobDistribution;
  },

  /**
   * Salary CTC distribution brackets
   */
  getPackageTrends: async (filters?: AnalyticsFilterParams): Promise<SalaryRangeDistribution[]> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return getMockAnalyticsDataset(filters).packageTrends;
  },

  /**
   * Year-on-year historical package trends
   */
  getHistoricalPackageTrends: async (filters?: AnalyticsFilterParams): Promise<HistoricalPackageTrend[]> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return getMockAnalyticsDataset(filters).historicalPackageTrends;
  },
};

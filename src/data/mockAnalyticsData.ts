import { StudentAnalyticsDashboardData, OverviewKPIs } from '../types';

export const BASE_ANALYTICS_DATA: StudentAnalyticsDashboardData = {
  kpis: {
    totalStudents: 1420,
    placedStudents: 1210,
    placementRate: 85.2,
    averagePackage: 8.4,
    highestPackage: 44.5,
    medianPackage: 7.2,
    activeCompanies: 78,
    totalJobs: 142,
    totalApplications: 4850,
  },
  cgpaVsPlacement: [
    { bracket: '9.0 - 10.0', total: 180, placed: 176, rate: 97.8 },
    { bracket: '8.0 - 8.9', total: 460, placed: 428, rate: 93.0 },
    { bracket: '7.0 - 7.9', total: 490, placed: 397, rate: 81.0 },
    { bracket: '6.0 - 6.9', total: 210, placed: 155, rate: 73.8 },
    { bracket: '< 6.0', total: 80, placed: 54, rate: 67.5 },
  ],
  branchPlacement: [
    { branch: 'Computer Science (CSE)', total: 420, placed: 403, rate: 96.0, avgPackage: 12.8 },
    { branch: 'Information Technology (IT)', total: 260, placed: 242, rate: 93.1, avgPackage: 11.4 },
    { branch: 'Electronics & Comm (ECE)', total: 310, placed: 267, rate: 86.1, avgPackage: 8.9 },
    { branch: 'Electrical Eng (EE)', total: 180, placed: 140, rate: 77.8, avgPackage: 7.4 },
    { branch: 'Mechanical Eng (ME)', total: 150, placed: 98, rate: 65.3, avgPackage: 6.8 },
    { branch: 'Civil Eng (CE)', total: 100, placed: 60, rate: 60.0, avgPackage: 6.2 },
  ],
  batchPlacement: [
    { batch: 'Batch 2024', total: 1280, placed: 1024, rate: 80.0, avgPackage: 7.2 },
    { batch: 'Batch 2025', total: 1340, placed: 1112, rate: 83.0, avgPackage: 7.8 },
    { batch: 'Batch 2026', total: 1390, placed: 1180, rate: 84.9, avgPackage: 8.1 },
    { batch: 'Batch 2027', total: 1420, placed: 1210, rate: 85.2, avgPackage: 8.4 },
  ],
  backlogsVsPlacement: [
    { backlogs: '0 Backlogs', total: 1040, placed: 988, rate: 95.0 },
    { backlogs: '1 Backlog', total: 230, placed: 156, rate: 67.8 },
    { backlogs: '2 Backlogs', total: 105, placed: 51, rate: 48.6 },
    { backlogs: '3+ Backlogs', total: 45, placed: 15, rate: 33.3 },
  ],
  internshipsVsPlacement: [
    { internships: '0 Internships', total: 280, placed: 179, rate: 63.9, avgPackage: 5.8 },
    { internships: '1 Internship', total: 540, placed: 448, rate: 83.0, avgPackage: 7.6 },
    { internships: '2 Internships', total: 420, placed: 395, rate: 94.0, avgPackage: 10.8 },
    { internships: '3+ Internships', total: 180, placed: 178, rate: 98.9, avgPackage: 14.5 },
  ],
  projectsVsPlacement: [
    { projects: '0 - 1 Projects', total: 220, placed: 132, rate: 60.0, shortlistRate: 42.0 },
    { projects: '2 - 3 Projects', total: 680, placed: 585, rate: 86.0, shortlistRate: 74.5 },
    { projects: '4 - 5 Projects', total: 380, placed: 361, rate: 95.0, shortlistRate: 89.2 },
    { projects: '6+ Projects', total: 140, placed: 132, rate: 94.3, shortlistRate: 92.0 },
  ],
  certificationsVsPlacement: [
    { certifications: '0 Certifications', total: 360, placed: 248, rate: 68.9, avgPackage: 6.4 },
    { certifications: '1 Certification', total: 510, placed: 433, rate: 84.9, avgPackage: 8.2 },
    { certifications: '2 Certifications', total: 390, placed: 363, rate: 93.1, avgPackage: 10.5 },
    { certifications: '3+ Certifications', total: 160, placed: 156, rate: 97.5, avgPackage: 13.6 },
  ],
  skillAnalytics: [
    { skill: 'Data Structures & Algorithms', demandCount: 132, studentProficiencyPct: 88 },
    { skill: 'Python & AI / Machine Learning', demandCount: 118, studentProficiencyPct: 82 },
    { skill: 'SQL & Database Systems', demandCount: 112, studentProficiencyPct: 85 },
    { skill: 'Java & Spring Boot Framework', demandCount: 96, studentProficiencyPct: 74 },
    { skill: 'React & TypeScript Ecosystem', demandCount: 92, studentProficiencyPct: 78 },
    { skill: 'Cloud Architecture (AWS / GCP)', demandCount: 84, studentProficiencyPct: 56 },
    { skill: 'Docker, CI/CD & DevOps', demandCount: 72, studentProficiencyPct: 52 },
    { skill: 'System Design & Distributed Systems', demandCount: 65, studentProficiencyPct: 46 },
  ],
  companyHiring: [
    { company: 'Microsoft', hires: 34, avgPackage: 28.5, sector: 'Product & Tech' },
    { company: 'Amazon', hires: 42, avgPackage: 24.2, sector: 'E-Commerce & Cloud' },
    { company: 'Google', hires: 18, avgPackage: 32.0, sector: 'Search & Cloud' },
    { company: 'TechNova Solutions', hires: 64, avgPackage: 14.8, sector: 'Enterprise Software' },
    { company: 'InnovateTech Systems', hires: 52, avgPackage: 13.5, sector: 'Cloud SaaS' },
    { company: 'Deloitte USI', hires: 78, avgPackage: 9.2, sector: 'Consulting & Tech' },
    { company: 'Goldman Sachs', hires: 22, avgPackage: 21.0, sector: 'FinTech & Banking' },
    { company: 'Qualcomm', hires: 26, avgPackage: 18.4, sector: 'Semiconductor & Embedded' },
  ],
  jobDistribution: [
    { domain: 'Software Engineering & Full Stack', percentage: 38, count: 460 },
    { domain: 'Cloud, Systems & DevOps', percentage: 20, count: 242 },
    { domain: 'Data Science, ML & Analytics', percentage: 18, count: 218 },
    { domain: 'FinTech & Management Consulting', percentage: 14, count: 169 },
    { domain: 'Core Engineering & Embedded Systems', percentage: 10, count: 121 },
  ],
  packageTrends: [
    { range: '< 6 LPA', count: 218, percentage: 18.0 },
    { range: '6 - 10 LPA', count: 472, percentage: 39.0 },
    { range: '10 - 15 LPA', count: 315, percentage: 26.0 },
    { range: '15 - 25 LPA', count: 145, percentage: 12.0 },
    { range: '25+ LPA', count: 60, percentage: 5.0 },
  ],
  historicalPackageTrends: [
    { year: '2023-24', average: 7.2, highest: 36.0, median: 6.4 },
    { year: '2024-25', average: 7.8, highest: 38.5, median: 6.8 },
    { year: '2025-26', average: 8.1, highest: 42.0, median: 7.0 },
    { year: '2026-27', average: 8.4, highest: 44.5, median: 7.2 },
  ],
};

/**
 * Filtered Variations Generator
 * Provides distinct datasets based on selected Batch, Branch, and Academic Year
 */
export const getMockAnalyticsDataset = (filters?: {
  batch?: string;
  branch?: string;
  year?: string;
}): StudentAnalyticsDashboardData => {
  // If no filters or all defaults, return baseline
  if (!filters || (
    (!filters.batch || filters.batch === 'All' || filters.batch === 'All Batches') &&
    (!filters.branch || filters.branch === 'All' || filters.branch === 'All Branches') &&
    (!filters.year || filters.year === 'All' || filters.year === 'All Years')
  )) {
    return BASE_ANALYTICS_DATA;
  }

  // CSE Department filter variation
  if (filters.branch && (filters.branch.includes('CSE') || filters.branch.includes('Computer Science'))) {
    return {
      ...BASE_ANALYTICS_DATA,
      kpis: {
        totalStudents: 420,
        placedStudents: 403,
        placementRate: 96.0,
        averagePackage: 12.8,
        highestPackage: 44.5,
        medianPackage: 11.5,
        activeCompanies: 62,
        totalJobs: 98,
        totalApplications: 1840,
      },
      cgpaVsPlacement: [
        { bracket: '9.0 - 10.0', total: 95, placed: 95, rate: 100.0 },
        { bracket: '8.0 - 8.9', total: 180, placed: 178, rate: 98.9 },
        { bracket: '7.0 - 7.9', total: 115, placed: 107, rate: 93.0 },
        { bracket: '6.0 - 6.9', total: 24, placed: 20, rate: 83.3 },
        { bracket: '< 6.0', total: 6, placed: 3, rate: 50.0 },
      ],
      packageTrends: [
        { range: '< 6 LPA', count: 18, percentage: 4.5 },
        { range: '6 - 10 LPA', count: 112, percentage: 27.8 },
        { range: '10 - 15 LPA', count: 168, percentage: 41.7 },
        { range: '15 - 25 LPA', count: 72, percentage: 17.9 },
        { range: '25+ LPA', count: 33, percentage: 8.2 },
      ],
    };
  }

  // IT Department filter variation
  if (filters.branch && (filters.branch.includes('IT') || filters.branch.includes('Information Technology'))) {
    return {
      ...BASE_ANALYTICS_DATA,
      kpis: {
        totalStudents: 260,
        placedStudents: 242,
        placementRate: 93.1,
        averagePackage: 11.4,
        highestPackage: 36.0,
        medianPackage: 10.2,
        activeCompanies: 54,
        totalJobs: 82,
        totalApplications: 1120,
      },
      cgpaVsPlacement: [
        { bracket: '9.0 - 10.0', total: 42, placed: 42, rate: 100.0 },
        { bracket: '8.0 - 8.9', total: 110, placed: 106, rate: 96.4 },
        { bracket: '7.0 - 7.9', total: 85, placed: 78, rate: 91.8 },
        { bracket: '6.0 - 6.9', total: 18, placed: 14, rate: 77.8 },
        { bracket: '< 6.0', total: 5, placed: 2, rate: 40.0 },
      ],
    };
  }

  // ECE Department filter variation
  if (filters.branch && (filters.branch.includes('ECE') || filters.branch.includes('Electronics'))) {
    return {
      ...BASE_ANALYTICS_DATA,
      kpis: {
        totalStudents: 310,
        placedStudents: 267,
        placementRate: 86.1,
        averagePackage: 8.9,
        highestPackage: 28.0,
        medianPackage: 8.0,
        activeCompanies: 48,
        totalJobs: 70,
        totalApplications: 980,
      },
    };
  }

  // Batch 2026 filter variation
  if (filters.batch && filters.batch.includes('2026')) {
    return {
      ...BASE_ANALYTICS_DATA,
      kpis: {
        totalStudents: 1390,
        placedStudents: 1180,
        placementRate: 84.9,
        averagePackage: 8.1,
        highestPackage: 42.0,
        medianPackage: 7.0,
        activeCompanies: 74,
        totalJobs: 134,
        totalApplications: 4420,
      },
    };
  }

  // Batch 2025 filter variation
  if (filters.batch && filters.batch.includes('2025')) {
    return {
      ...BASE_ANALYTICS_DATA,
      kpis: {
        totalStudents: 1340,
        placedStudents: 1112,
        placementRate: 83.0,
        averagePackage: 7.8,
        highestPackage: 38.5,
        medianPackage: 6.8,
        activeCompanies: 68,
        totalJobs: 122,
        totalApplications: 4100,
      },
    };
  }

  return BASE_ANALYTICS_DATA;
};

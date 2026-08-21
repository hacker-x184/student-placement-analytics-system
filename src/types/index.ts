export type UserRole = 'student' | 'company' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  branch?: string;
  batchYear?: number;
  companyId?: string;
  companyName?: string;
  designation?: string;
  department?: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  branch: string;
  batchYear: number;
  cgpa: number;
  backlogs: number;
  skills: string[];
  projects: {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    link?: string;
  }[];
  internships: {
    id: string;
    role: string;
    company: string;
    duration: string;
    description: string;
  }[];
  certifications: {
    id: string;
    title: string;
    issuer: string;
    issueDate: string;
  }[];
  resumeUrl?: string;
  placementStatus: 'Placed' | 'In Process' | 'Seeking';
  placedCompany?: string;
  placedPackage?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  companyInitial?: string;
  location: string;
  jobType: 'Full-time' | 'Internship' | 'Hybrid' | 'Remote';
  package: string;
  packageNumeric: number; // in LPA
  minCgpa: number;
  deadline: string;
  postedDate: string;
  openings: number;
  batchYear: number | string;
  category: 'Technology' | 'Finance' | 'Consulting' | 'Core' | 'Design';
  description: string;
  responsibilities: string[];
  eligibleBranches: string[];
  activeBacklogsAllowed: number;
  requiredSkills: string[];
  preferredSkills: string[];
  status: 'Active' | 'Closed' | 'Draft';
  applicantsCount?: number;
  matchScore?: number;
  isSaved?: boolean;
}

export type ApplicationStatus =
  | 'Applied'
  | 'Shortlisted'
  | 'Interview'
  | 'Selected'
  | 'Rejected'
  | 'Under Review'
  | 'Technical Interview'
  | 'HR Final Round'
  | 'Offered';

export interface ApplicationTimelineEvent {
  id?: string;
  stage?: string;
  title: string;
  date?: string;
  time?: string;
  description?: string;
  completed: boolean;
  active?: boolean;
  actionRequired?: boolean;
  isCompleted?: boolean;
  isCurrent?: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  companyLogo?: string;
  companyInitial?: string;
  location?: string;
  package?: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentCgpa?: number;
  studentBranch?: string;
  appliedDate: string;
  status: ApplicationStatus;
  statusCategory: 'active' | 'history';
  meetingLink?: string;
  interviewScheduledDate?: string;
  timeline: ApplicationTimelineEvent[];
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  initial?: string;
  industry: string;
  location: string;
  website: string;
  activeJobsCount: number;
  placedStudentsCount: number;
  avgPackage: string;
  tier: 'Dream (15+ LPA)' | 'Tier 1 (8-15 LPA)' | 'Tier 2 (4-8 LPA)';
  contactPerson: string;
  contactEmail: string;
}

export interface PlacementRecord {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  branch: string;
  cgpa: number;
  company: string;
  companyLogo?: string;
  jobTitle: string;
  package: string;
  packageValue: number; // LPA
  placementDate: string;
  tier: string;
  offerLetterStatus: 'Issued' | 'Accepted' | 'Pending';
}

export interface OverviewKPIs {
  totalStudents: number;
  placedStudents: number;
  placementRate: number;
  averagePackage: number;
  highestPackage: number;
  medianPackage: number;
  activeCompanies: number;
  totalJobs: number;
  totalApplications: number;
}

export interface BranchAnalytics {
  branch: string;
  total: number;
  placed: number;
  rate: number;
  avgPackage: number;
}

export interface CgpaPlacementTrend {
  bracket: string;
  total: number;
  placed: number;
  rate: number;
}

export interface SkillDemandItem {
  skill: string;
  demandCount: number;
  studentProficiencyPct: number;
}

export interface SalaryRangeDistribution {
  range: string;
  count: number;
  percentage?: number;
}

export interface TopRecruiterItem {
  company: string;
  hires: number;
  avgPackage: number;
  sector?: string;
}

export interface BatchPlacementTrend {
  batch: string;
  total: number;
  placed: number;
  rate: number;
  avgPackage: number;
}

export interface BacklogPlacementTrend {
  backlogs: string;
  total: number;
  placed: number;
  rate: number;
}

export interface InternshipPlacementTrend {
  internships: string;
  total: number;
  placed: number;
  rate: number;
  avgPackage: number;
}

export interface ProjectPlacementTrend {
  projects: string;
  total: number;
  placed: number;
  rate: number;
  shortlistRate: number;
}

export interface CertificationPlacementTrend {
  certifications: string;
  total: number;
  placed: number;
  rate: number;
  avgPackage: number;
}

export interface JobDomainDistribution {
  domain: string;
  percentage: number;
  count: number;
}

export interface HistoricalPackageTrend {
  year: string;
  average: number;
  highest: number;
  median: number;
}

export interface AnalyticsFilterParams {
  batch?: string;
  branch?: string;
  year?: string;
}

export interface StudentAnalyticsDashboardData {
  kpis: OverviewKPIs;
  cgpaVsPlacement: CgpaPlacementTrend[];
  branchPlacement: BranchAnalytics[];
  batchPlacement: BatchPlacementTrend[];
  backlogsVsPlacement: BacklogPlacementTrend[];
  internshipsVsPlacement: InternshipPlacementTrend[];
  projectsVsPlacement: ProjectPlacementTrend[];
  certificationsVsPlacement: CertificationPlacementTrend[];
  skillAnalytics: SkillDemandItem[];
  companyHiring: TopRecruiterItem[];
  jobDistribution: JobDomainDistribution[];
  packageTrends: SalaryRangeDistribution[];
  historicalPackageTrends: HistoricalPackageTrend[];
}

export interface PredictionInput {
  cgpa: number;
  backlogs: number;
  internships: number;
  projects: number;
  certifications: number;
  aptitudeScore: number;
  communicationScore: number;
  targetRole: string;
  branch: string;
  batchYear: number;
}

export interface PredictionResult {
  probabilityScore: number; // percentage e.g. 92
  predictionLabel: 'High Probability' | 'Moderate Probability' | 'Low Probability';
  skillsMatchPct: number;
  academicTrend: 'Strong' | 'Moderate' | 'Needs Improvement';
  confidenceInterval: string;
  factors: {
    factor: string;
    impact: 'positive' | 'neutral' | 'negative';
    description: string;
    weightPct: number;
  }[];
  readinessCategory: 'Ready for Top Tier' | 'Profile Strong' | 'Needs Skill Polish';
}

export interface RecommendationJobItem {
  job: Job;
  matchPct: number;
  matchingSkills: string[];
  missingSkills: string[];
}

export interface ImprovementSuggestion {
  id: string;
  title: string;
  targetRoleOrJob: string;
  impactText: string;
  courseUrl?: string;
  category: 'Skill Module' | 'Certification' | 'Project Idea';
  iconType: 'code' | 'chart' | 'database' | 'brain';
}

export interface CompanyKpis {
  activeJobs: number;
  totalApplicants: number;
  shortlisted: number;
  interviews: number;
  selected: number;
}

export interface CompanyRecentApplication {
  id: string;
  candidateName: string;
  candidateAvatar?: string;
  position: string;
  appliedDate: string; // e.g. 'Today', 'Yesterday', '2 days ago', '3 days ago'
  status: 'Applied' | 'Shortlisted' | 'Interview' | 'Selected';
  email?: string;
  location?: string;
  matchScore?: number;
}

export interface CompanyActiveJobItem {
  id: string;
  title: string;
  company?: string;
  location: string;
  package: string;
  applicantsCount: number;
  status: 'Active' | 'Draft' | 'Closed';
  postedDate?: string;
  jobType?: string;
  deadline?: string;
}

export interface CompanyPipelineStage {
  stage: 'Applied' | 'Shortlisted' | 'Interview' | 'Selected';
  count: number;
  percentage?: number;
}

export interface CompanyHiringActivityItem {
  id: string;
  candidateName: string;
  action: string;
  position: string;
  timestamp: string; // e.g. '10 min ago', '1 hour ago', 'Yesterday'
  type: 'shortlist' | 'interview' | 'select' | 'apply';
}

export interface CompanyDashboardData {
  company: {
    name: string;
    industry: string;
    location: string;
    verified: boolean;
  };
  kpis: CompanyKpis;
  recentApplications: CompanyRecentApplication[];
  activeJobs: CompanyActiveJobItem[];
  pipeline: CompanyPipelineStage[];
  recentActivity: CompanyHiringActivityItem[];
  hiringInsight: {
    title: string;
    description: string;
    highlightRole: string;
    highlightCount: number;
    jobId: string;
  };
}

export interface TpoDashboardKpis {
  totalStudents: number;
  placedStudents: number;
  placementRate: number;
  activeCompanies: number;
  activeJobs: number;
  applications: number;
}

export interface TpoPlacementOverview {
  placementRate: number;
  placed: number;
  notPlaced: number;
}

export interface TpoPackageOverview {
  averagePackage: string;
  highestPackage: string;
  medianPackage: string;
}

export interface TpoDepartmentPlacementItem {
  department: string;
  rate: number;
  placedCount?: number;
  totalCount?: number;
}

export interface TpoRecentPlacementItem {
  id: string;
  studentName: string;
  company: string;
  role: string;
  package: string;
  date: string;
  branch?: string;
}

export interface TpoActiveRecruitmentItem {
  id: string;
  company: string;
  job: string;
  applicants: number;
  deadline: string;
  status: 'Active' | 'Closed' | 'Interviewing';
  location?: string;
}

export interface TpoPlacementTrendItem {
  year: string;
  rate: number;
}

export interface TpoDashboardData {
  college: {
    name: string;
    academicYear: string;
    department: string;
    verified: boolean;
  };
  kpis: TpoDashboardKpis;
  placementOverview: TpoPlacementOverview;
  packageOverview: TpoPackageOverview;
  departmentPlacements: TpoDepartmentPlacementItem[];
  recentPlacements: TpoRecentPlacementItem[];
  activeRecruitments: TpoActiveRecruitmentItem[];
  placementTrends: TpoPlacementTrendItem[];
}



import { APP_CONFIG } from "../config.js";
import { api } from "../api.js";
import { adminMock } from "../mock/admin.js";

export async function getAdminDevelopmentData() {
  if (APP_CONFIG.USE_MOCK_DATA) return adminMock;
  const [overview, companies, jobs, applications] = await Promise.all([
    api.analytics.getOverview(), api.companies.getCompanies(), api.jobs.getJobs(), api.applications.getMine()
  ]);
  return { overview, companies, jobs, applications, students: [] };
}

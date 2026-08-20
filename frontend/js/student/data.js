import { APP_CONFIG } from "../config.js";
import { api } from "../api.js";
import { studentMock } from "../mock/student.js";

/** Replace this adapter with central API calls when the FastAPI contract is finalized. */
export async function getStudentDevelopmentData() {
  if (APP_CONFIG.USE_MOCK_DATA) return studentMock;
  // The dashboard aggregate shape is pending backend confirmation. Individual
  // endpoint calls below prove the integration boundary without inventing fields.
  const [jobs, applications] = await Promise.all([api.jobs.getJobs(), api.applications.getMine()]);
  return { jobs, applications, profile: null, dashboard: null };
}

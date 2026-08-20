import { APP_CONFIG } from "./config.js";
import { clearAuthSession, getAuthSession } from "./storage.js";

const STATUS_MESSAGES = {
  400: "The request could not be processed. Please review the form and try again.",
  401: "Your session has expired. Please sign in again.",
  403: "You do not have permission to complete this action.",
  404: "The requested resource could not be found.",
  409: "This record already exists.",
  422: "Please review the submitted information.",
  429: "Too many requests. Please wait a moment and try again.",
  500: "The service is temporarily unavailable. Please try again later."
};

export class ApiError extends Error {
  constructor(message, status = 0, details = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

function getErrorMessage(payload, status) {
  if (status === 422) return STATUS_MESSAGES[422];
  if (payload && typeof payload.detail === "string") return payload.detail;
  return STATUS_MESSAGES[status] ?? "Unable to reach the service. Please try again.";
}

async function request(path, options = {}) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), APP_CONFIG.REQUEST_TIMEOUT_MS);
  const headers = new Headers(options.headers);
  const session = getAuthSession();

  if (options.body) headers.set("Content-Type", "application/json");
  if (APP_CONFIG.AUTH_MODE === "bearer-session" && session?.accessToken) {
    headers.set("Authorization", `Bearer ${session.accessToken}`);
  }

  try {
    const response = await fetch(`${APP_CONFIG.API_BASE_URL}${path}`, {
      ...options,
      headers,
      signal: controller.signal,
      credentials: APP_CONFIG.AUTH_MODE === "cookie" ? "include" : "same-origin"
    });
    const contentType = response.headers.get("content-type") ?? "";
    const payload = contentType.includes("application/json") ? await response.json() : null;

    if (!response.ok) {
      if (response.status === 401) clearAuthSession();
      throw new ApiError(getErrorMessage(payload, response.status), response.status, payload);
    }
    return payload;
  } catch (error) {
    if (error.name === "AbortError") throw new ApiError("The request timed out. Please try again.");
    if (error instanceof ApiError) throw error;
    throw new ApiError("Unable to reach the service. Check your connection and try again.");
  } finally {
    window.clearTimeout(timeout);
  }
}

export const api = Object.freeze({
  auth: {
    login(credentials) {
      return request("/auth/login", { method: "POST", body: JSON.stringify(credentials) });
    },
    register(student) {
      return request("/auth/register", { method: "POST", body: JSON.stringify(student) });
    }
  },
  students: {
    getById(studentId) { return request(`/students/${encodeURIComponent(studentId)}`); },
    updateById(studentId, profile) { return request(`/students/${encodeURIComponent(studentId)}`, { method: "PUT", body: JSON.stringify(profile) }); }
  },
  companies: {
    getCompanies(query = "") { return request(`/companies${query ? `?${new URLSearchParams(query)}` : ""}`); },
    createCompany(company) { return request("/companies", { method: "POST", body: JSON.stringify(company) }); }
  },
  jobs: {
    getJobs(query = "") { return request(`/jobs${query ? `?${new URLSearchParams(query)}` : ""}`); },
    getJob(jobId) { return request(`/jobs/${encodeURIComponent(jobId)}`); },
    apply(application) { return request("/applications", { method: "POST", body: JSON.stringify(application) }); }
  },
  applications: {
    getMine(query = "") { return request(`/applications${query ? `?${new URLSearchParams(query)}` : ""}`); },
    updateStatus(applicationId, update) { return request(`/applications/${encodeURIComponent(applicationId)}`, { method: "PUT", body: JSON.stringify(update) }); }
  },
  placements: {
    // TODO: Confirm placement-management endpoint with the backend team before adding mutations.
  },
  analytics: {
    getOverview(query = "") { return request(`/analytics/overview${query ? `?${new URLSearchParams(query)}` : ""}`); }
  },
  prediction: {
    getPrediction(payload = {}) { return request("/prediction", { method: "POST", body: JSON.stringify(payload) }); }
  },
  recommendations: {
    getRecommendations(payload = {}) { return request("/recommendations", { method: "POST", body: JSON.stringify(payload) }); }
  }
});

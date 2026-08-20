/**
 * Client configuration only. Do not put credentials, signing secrets, or other
 * private backend values in this file.
 */
const IS_LOCAL_DEVELOPMENT = ["localhost", "127.0.0.1", ""].includes(window.location.hostname);

export const APP_CONFIG = Object.freeze({
  API_BASE_URL: "http://127.0.0.1:8000",
  // Switch to "cookie" only after the backend supports HttpOnly Secure SameSite cookies.
  AUTH_MODE: "bearer-session",
  REQUEST_TIMEOUT_MS: 15_000,
  // Mock data is strictly limited to local development and is disabled elsewhere.
  USE_MOCK_DATA: IS_LOCAL_DEVELOPMENT
});

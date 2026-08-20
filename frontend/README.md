# Student Placement Analytics System — Frontend

This directory is the frontend workspace for the Student Placement Analytics System. It contains the vanilla HTML, CSS, and JavaScript implementation, with localhost-only development mocks until the FastAPI contract is finalized.

## Top-level pages

| File | Purpose |
| --- | --- |
| `index.html` | Public landing page. |
| `login.html` | Common sign-in page for both student and admin users. |
| `register.html` | Student account registration page. |

## Student pages

| File | Purpose |
| --- | --- |
| `student/dashboard.html` | Student placement overview. |
| `student/profile.html` | Student profile view and editing. |
| `student/jobs.html` | Job discovery, filtering, and applications. |
| `student/applications.html` | Student application tracking. |
| `student/prediction.html` | Backend-provided placement prediction display. |
| `student/recommendations.html` | Backend-provided job and skill recommendations. |

## Admin pages

| File | Purpose |
| --- | --- |
| `admin/dashboard.html` | Institutional placement overview. |
| `admin/students.html` | Student management. |
| `admin/companies.html` | Company management. |
| `admin/jobs.html` | Job posting management. |
| `admin/applications.html` | Application review and status management. |
| `admin/analytics.html` | Institutional analytics and charts. |

## Stylesheets

| File | Purpose |
| --- | --- |
| `css/base.css` | Design tokens, reset, typography, and global accessibility rules. |
| `css/components.css` | Reusable UI component styles. |
| `css/layout.css` | Shared navigation, page shell, and responsive layout. |
| `css/auth.css` | Login and registration layouts. |
| `css/dashboard.css` | Student and admin dashboard styles. |
| `css/profile.css` | Profile page styles. |
| `css/jobs.css` | Job list, details, filters, and eligibility styles. |
| `css/applications.css` | Application tracker and status timeline styles. |
| `css/analytics.css` | Analytics cards, charts, and reporting styles. |
| `css/prediction.css` | Prediction page styles. |
| `css/recommendations.css` | Recommendation and skill-gap styles. |

## Shared JavaScript modules

| File | Purpose |
| --- | --- |
| `js/config.js` | Non-secret runtime configuration, including the API base URL. |
| `js/api.js` | Centralized Fetch API client and endpoint groups. |
| `js/auth.js` | Sign-in, registration, logout, and role redirect flow. |
| `js/guards.js` | Client-side navigation guards; backend authorization remains mandatory. |
| `js/storage.js` | Isolated authentication/session storage strategy. |
| `js/components.js` | Safe reusable DOM components and UI helpers. |
| `js/validation.js` | Shared client-side form validation. |

## Page JavaScript modules

Each module below owns only its corresponding page: loading state, safe rendering, user interactions, and calls to `js/api.js`.

| Directory | Modules |
| --- | --- |
| `js/student/` | `dashboard.js`, `profile.js`, `jobs.js`, `applications.js`, `prediction.js`, `recommendations.js` |
| `js/admin/` | `dashboard.js`, `students.js`, `companies.js`, `jobs.js`, `applications.js`, `analytics.js` |

## Assets

| Directory | Purpose |
| --- | --- |
| `assets/images/` | Optimized illustrative and content images. |
| `assets/icons/` | Project-owned icon assets when needed. |
| `assets/logos/` | University and application branding assets. |

## API integration contract

`js/api.js` is the only module that performs Fetch requests. It maps the endpoints stated in the project brief:

| Group | Mapped methods |
| --- | --- |
| Authentication | `auth.login`, `auth.register` |
| Students | `students.getById`, `students.updateById` |
| Companies | `companies.getCompanies`, `companies.createCompany` |
| Jobs | `jobs.getJobs`, `jobs.getJob`, `jobs.apply` |
| Applications | `applications.getMine`, `applications.updateStatus` |
| Analytics | `analytics.getOverview` |
| Prediction | `prediction.getPrediction` |
| Recommendations | `recommendations.getRecommendations` |

### Backend decisions still required

- Confirm response envelopes and pagination fields for list endpoints.
- Confirm whether `GET /applications` is automatically scoped to the authenticated student/admin role.
- Confirm the current student's ID source for `GET /students/{id}`; the login example does not include it.
- Define the dashboard aggregate response shape or a dedicated dashboard endpoint.
- Confirm request bodies for prediction/recommendation calls and all create/edit actions.
- Provide placement-management endpoints before implementing placement mutations.

Until those details are confirmed, application screens use clearly separated mock data only when hosted locally. Production hosts never enable mock data.

## Deployment and quality checklist

- Set `API_BASE_URL` to the HTTPS API origin for production.
- Prefer `AUTH_MODE: "cookie"` only after the backend provides HttpOnly, Secure, SameSite cookies; otherwise bearer tokens are session-only and remain exposed to XSS.
- Configure CORS, TLS, JWT validation, role authorization, rate limiting, CSP, and security headers on the backend/reverse proxy.
- Verify API error payloads and replace the remaining disabled mutation controls only after the backend contract is approved.
- Test keyboard navigation, mobile layouts, screen-reader labels, and API loading/empty/error states against real data before release.

## Next step

Phase 1 implementation: base CSS, reusable components, and the landing page.

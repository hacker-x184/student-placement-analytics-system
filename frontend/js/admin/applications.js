import { requireAdmin } from "../guards.js"; import { getAdminDevelopmentData } from "./data.js"; import { initAdminPage, pageError, table } from "./ui.js";
function render(data) { document.querySelector("#admin-content").replaceChildren(table(["Student", "Role", "Company", "Status"], data.applications.map((a) => [a.student, a.job, a.company, a.status]))); }
initAdminPage("applications"); if (requireAdmin()) getAdminDevelopmentData().then(render).catch((error) => { document.querySelector("#admin-content").replaceChildren(); pageError(error.message); });

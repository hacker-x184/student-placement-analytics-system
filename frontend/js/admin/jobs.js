import { requireAdmin } from "../guards.js"; import { getAdminDevelopmentData } from "./data.js"; import { el, initAdminPage, pageError, table } from "./ui.js";
function render(data) { document.querySelector("#admin-content").replaceChildren(table(["Role", "Company", "Package", "Deadline", "Status"], data.jobs.map((j) => [j.title, j.company, j.package, j.deadline, j.status]))); }
initAdminPage("jobs"); if (requireAdmin()) getAdminDevelopmentData().then(render).catch((error) => { document.querySelector("#admin-content").replaceChildren(); pageError(error.message); });

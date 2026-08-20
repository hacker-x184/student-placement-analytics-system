import { getStudentDevelopmentData } from "./data.js";
import { requireStudent } from "../guards.js";
import { element, initializeStudentPage, showPageError } from "./ui.js";

function statusClass(status) { return `status-${status.toLowerCase().replaceAll(" ", "-")}`; }
function renderApplications(data) {
  const wrap = element("div", "application-table-wrap"); const table = element("table", "application-table"); const caption = element("caption", "visually-hidden", "Your placement applications"); const head = element("thead"); const headRow = element("tr"); ["Company", "Role", "Applied", "Status", "Last updated"].forEach((label) => headRow.append(element("th", "", label))); head.append(headRow); const body = element("tbody");
  data.applications.forEach((application) => { const row = element("tr"); [application.company, application.job, application.date].forEach((value) => row.append(element("td", "", value))); const statusCell = element("td"); statusCell.append(element("span", `status-badge ${statusClass(application.status)}`, application.status)); row.append(statusCell, element("td", "", application.updated)); body.append(row); }); table.append(caption, head, body); wrap.append(table); document.querySelector("#applications-content").replaceChildren(wrap);
}

initializeStudentPage("applications");
if (requireStudent()) getStudentDevelopmentData().then(renderApplications).catch((error) => { document.querySelector("#applications-content").replaceChildren(); showPageError(error.message); });

import { getStudentDevelopmentData } from "./data.js";
import { requireStudent } from "../guards.js";
import { addTags, element, initializeStudentPage, showPageError } from "./ui.js";

function stat(label, value) {
  const card = element("article", "card stat-card");
  card.append(element("span", "", label), element("strong", "", value));
  return card;
}

function renderDashboard(data) {
  document.querySelector("[data-student-name]").textContent = data.profile.name.split(" ")[0];
  const content = document.querySelector("#dashboard-content");
  const stats = element("section", "dashboard-stats");
  stats.setAttribute("aria-label", "Placement statistics");
  [["Profile completion", `${data.profile.completion}%`], ["Applications", data.dashboard.applications], ["Interviews", data.dashboard.interviews], ["Offers", data.dashboard.offers]].forEach(([label, value]) => stats.append(stat(label, String(value))));

  const grid = element("section", "dashboard-grid");
  const jobsPanel = element("article", "card dashboard-panel"); jobsPanel.append(element("h2", "", "Recommended opportunities"));
  data.jobs.slice(0, 3).forEach((job) => { const row = element("div", "list-row"); const text = element("div"); text.append(element("strong", "", job.title), element("span", "", job.company)); row.append(text, element("span", "match-score", `${job.match}% match`)); jobsPanel.append(row); });
  const progressPanel = element("article", "card dashboard-panel probability"); progressPanel.append(element("span", "", "Placement probability"), element("strong", "", `${data.dashboard.probability}%`), element("p", "", "Statistical estimate, not a guarantee."));
  const activityPanel = element("article", "card dashboard-panel"); activityPanel.append(element("h2", "", "Recent activity")); data.dashboard.activity.forEach((item) => { const row = element("div", "list-row"); row.append(element("span", "", item)); activityPanel.append(row); });
  const skillsPanel = element("article", "card dashboard-panel"); skillsPanel.append(element("h2", "", "Current technical skills"), addTags(data.profile.skills));
  grid.append(jobsPanel, progressPanel, activityPanel, skillsPanel); content.replaceChildren(stats, grid);
}

initializeStudentPage("dashboard");
if (requireStudent()) getStudentDevelopmentData().then(renderDashboard).catch((error) => { document.querySelector("#dashboard-content").replaceChildren(); showPageError(error.message); });

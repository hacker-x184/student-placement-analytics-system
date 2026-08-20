import { getStudentDevelopmentData } from "./data.js";
import { requireStudent } from "../guards.js";
import { addTags, element, initializeStudentPage, showPageError } from "./ui.js";

let jobs = [];
function renderJobs() {
  const search = document.querySelector("#job-search").value.toLowerCase(); const sector = document.querySelector("#sector-filter").value; const sort = document.querySelector("#sort-jobs").value;
  const filtered = jobs.filter((job) => `${job.company} ${job.title}`.toLowerCase().includes(search) && (!sector || job.sector === sector)).sort((a, b) => sort === "package" ? Number.parseFloat(b.package.replace(/[^\d.]/g, "")) - Number.parseFloat(a.package.replace(/[^\d.]/g, "")) : b.match - a.match);
  const content = document.querySelector("#job-content");
  if (!filtered.length) { content.replaceChildren(element("p", "", "No active jobs match those filters.")); return; }
  const cards = filtered.map((job) => { const card = element("article", "card job-card"); const top = element("div", "job-card-top"); const intro = element("div"); intro.append(element("p", "", job.company), element("h2", "", job.title)); top.append(intro, element("span", "match-score", `${job.match}% match`)); const meta = element("div", "job-meta"); [job.sector, job.package, `Min. CGPA ${job.minCgpa}`, `Deadline ${job.deadline}`].forEach((value) => meta.append(element("span", "", value))); const footer = element("div", "job-footer"); footer.append(element("span", `eligibility${job.eligible ? "" : " is-ineligible"}`, job.eligible ? "Eligibility to be confirmed" : "May not meet criteria")); const apply = element("button", "button button-primary", "Apply"); apply.disabled = true; apply.title = "Applying will be enabled when the backend application endpoint is integrated."; footer.append(apply); card.append(top, meta, addTags(job.skills), footer); return card; }); content.replaceChildren(...cards);
}
function initializeFilters(data) { jobs = data.jobs; const sectors = [...new Set(jobs.map((job) => job.sector))]; const filter = document.querySelector("#sector-filter"); sectors.forEach((sector) => { const option = element("option", "", sector); option.value = sector; filter.append(option); }); ["#job-search", "#sector-filter", "#sort-jobs"].forEach((selector) => document.querySelector(selector).addEventListener(selector === "#job-search" ? "input" : "change", renderJobs)); renderJobs(); }

initializeStudentPage("jobs");
if (requireStudent()) getStudentDevelopmentData().then(initializeFilters).catch((error) => { document.querySelector("#job-content").replaceChildren(); showPageError(error.message); });

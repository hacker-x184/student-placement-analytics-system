import { getStudentDevelopmentData } from "./data.js";
import { requireStudent } from "../guards.js";
import { addTags, element, initializeStudentPage, showPageError } from "./ui.js";

function detailCard(title, entries) {
  const card = element("section", "card profile-card"); const list = element("dl", "detail-list");
  card.append(element("h2", "", title));
  entries.forEach(([label, value]) => { const row = element("div"); row.append(element("dt", "", label), element("dd", "", value)); list.append(row); }); card.append(list); return card;
}

function renderProfile(data) {
  const profile = data.profile; const content = document.querySelector("#profile-content"); const layout = element("div", "profile-layout");
  const summary = element("section", "card profile-card profile-summary"); summary.append(element("div", "profile-avatar", profile.name.split(" ").map((part) => part[0]).join("")), element("h2", "", profile.name), element("p", "", profile.email), element("p", "", `${profile.completion}% profile complete`));
  const academic = detailCard("Academic information", [["Branch", profile.branch], ["Batch", String(profile.batchYear)], ["CGPA", String(profile.cgpa)], ["Backlogs", String(profile.backlogs)]]);
  const skills = element("section", "card profile-card"); skills.append(element("h2", "", "Technical skills"), addTags(profile.skills), element("h2", "", "Soft skills"), addTags(profile.softSkills));
  const credentials = element("section", "card profile-card"); credentials.append(element("h2", "", "Certifications"), addTags(profile.certifications));
  const projects = element("section", "card profile-card"); projects.append(element("h2", "", "Projects")); profile.projects.forEach((project) => { const item = element("article", "project-item"); item.append(element("h3", "", project.title), element("p", "", project.summary)); projects.append(item); });
  const internships = element("section", "card profile-card"); internships.append(element("h2", "", "Internships")); profile.internships.forEach((internship) => { const item = element("article", "internship-item"); item.append(element("h3", "", internship.role), element("p", "", `${internship.company} · ${internship.period}`)); internships.append(item); });
  const details = element("div", "detail-list"); details.append(academic, skills, credentials, projects, internships); layout.append(summary, details); content.replaceChildren(layout);
}

initializeStudentPage("profile");
if (requireStudent()) getStudentDevelopmentData().then(renderProfile).catch((error) => { document.querySelector("#profile-content").replaceChildren(); showPageError(error.message); });

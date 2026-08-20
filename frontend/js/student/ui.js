import { renderStudentShell } from "../components.js";

export function initializeStudentPage(activePage) {
  renderStudentShell(document.querySelector("#student-shell"), activePage);
}

export function element(tag, className = "", text = "") {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

export function showPageError(message) {
  const target = document.querySelector("[data-page-message]");
  target.textContent = message;
  target.hidden = false;
}

export function addTags(values) {
  const list = element("div", "skill-list");
  values.forEach((value) => list.append(element("span", "tag", value)));
  return list;
}

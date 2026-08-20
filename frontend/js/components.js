import { clearAuthSession } from "./storage.js";

/** Shared, static layout components. Dynamic API content must use safe DOM APIs. */
const createElement = (tagName, className, text) => {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

const createLink = (href, text, className = "") => {
  const link = createElement("a", className, text);
  link.href = href;
  return link;
};

export function renderPublicNavigation(target) {
  const header = createElement("header", "site-header");
  const nav = createElement("nav", "site-nav container");
  nav.setAttribute("aria-label", "Main navigation");

  const brand = createLink("index.html", "", "brand");
  const mark = createElement("span", "brand-mark", "SP");
  mark.setAttribute("aria-hidden", "true");
  brand.append(mark, createElement("span", "", "PlacePath"));

  const links = createElement("div", "nav-links");
  [["#how-it-works", "How it works"], ["#features", "Features"], ["#for-students", "For students"]]
    .forEach(([href, text]) => links.append(createLink(href, text)));

  const actions = createElement("div", "nav-actions");
  actions.append(
    createLink("login.html", "Log in", "button button-secondary"),
    createLink("register.html", "Get started", "button button-primary")
  );

  nav.append(brand, links, actions);
  header.append(nav);
  target.replaceChildren(header);
}

export function renderPublicFooter(target) {
  const footer = createElement("footer", "site-footer");
  const content = createElement("div", "footer-content container");
  const copy = createElement("p", "", `© ${new Date().getFullYear()} PlacePath. Student placement analytics.`);
  const links = createElement("div", "footer-links");
  links.append(createLink("login.html", "Log in"), createLink("register.html", "Create account"));
  content.append(copy, links);
  footer.append(content);
  target.replaceChildren(footer);
}

export function renderStudentShell(target, activePage) {
  const links = [["dashboard", "Dashboard"], ["profile", "My profile"], ["jobs", "Jobs"], ["applications", "Applications"], ["prediction", "Prediction"], ["recommendations", "Recommendations"]];
  const header = createElement("header", "app-header");
  const headerContent = createElement("div", "app-header-content container");
  const brand = createLink("../index.html", "", "brand");
  const mark = createElement("span", "brand-mark", "SP"); mark.setAttribute("aria-hidden", "true");
  brand.append(mark, createElement("span", "", "PlacePath")); headerContent.append(brand);
  const actions = createElement("div", "app-header-actions");
  const logout = createElement("button", "button button-secondary", "Sign out"); logout.type = "button";
  logout.addEventListener("click", () => { clearAuthSession(); window.location.assign("../login.html"); });
  actions.append(logout);
  headerContent.append(actions); header.append(headerContent);
  const sidebar = createElement("aside", "app-sidebar");
  const nav = createElement("nav", "app-links"); nav.setAttribute("aria-label", "Student navigation");
  links.forEach(([slug, text]) => {
    const link = createLink(`${slug}.html`, text, slug === activePage ? "is-active" : "");
    if (slug === activePage) link.setAttribute("aria-current", "page");
    nav.append(link);
  });
  sidebar.append(nav); target.replaceChildren(header, sidebar);
}

export function renderAdminShell(target, activePage) {
  const links = [["dashboard", "Dashboard"], ["students", "Students"], ["companies", "Companies"], ["jobs", "Jobs"], ["applications", "Applications"], ["analytics", "Analytics"]];
  const header = createElement("header", "app-header"); const headerContent = createElement("div", "app-header-content container");
  const brand = createLink("../index.html", "", "brand"); const mark = createElement("span", "brand-mark", "SP"); mark.setAttribute("aria-hidden", "true"); brand.append(mark, createElement("span", "", "PlacePath Admin")); headerContent.append(brand);
  const actions = createElement("div", "app-header-actions"); const logout = createElement("button", "button button-secondary", "Sign out"); logout.type = "button"; logout.addEventListener("click", () => { clearAuthSession(); window.location.assign("../login.html"); }); actions.append(logout); headerContent.append(actions); header.append(headerContent);
  const sidebar = createElement("aside", "app-sidebar"); const nav = createElement("nav", "app-links"); nav.setAttribute("aria-label", "Administrator navigation"); links.forEach(([slug, text]) => { const link = createLink(`${slug}.html`, text, slug === activePage ? "is-active" : ""); if (slug === activePage) link.setAttribute("aria-current", "page"); nav.append(link); }); sidebar.append(nav); target.replaceChildren(header, sidebar);
}

if (document.body.dataset.publicShell === "true") {
  renderPublicNavigation(document.querySelector("#site-navigation"));
  renderPublicFooter(document.querySelector("#site-footer"));
}

import { getAuthSession } from "./storage.js";

function redirectTo(relativePath) {
  window.location.replace(new URL(relativePath, window.location.href));
}

export function redirectByRole(role) {
  if (role === "admin") redirectTo("admin/dashboard.html");
  else redirectTo("student/dashboard.html");
}

export function requireAuth() {
  const session = getAuthSession();
  if (!session) {
    redirectTo("../login.html");
    return null;
  }
  return session;
}

export function requireStudent() {
  const session = requireAuth();
  if (session && session.role !== "student") {
    redirectTo("../admin/dashboard.html");
    return null;
  }
  return session;
}

export function requireAdmin() {
  const session = requireAuth();
  if (session && session.role !== "admin") {
    redirectTo("../student/dashboard.html");
    return null;
  }
  return session;
}

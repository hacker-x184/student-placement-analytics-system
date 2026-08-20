const SESSION_KEY = "placepath.auth";

/**
 * Keeps the session short-lived in the browser. sessionStorage is still readable
 * by injected JavaScript, so an HttpOnly cookie is preferred when the API supports it.
 */
export function saveAuthSession({ accessToken, role, user }) {
  if (!accessToken || !role) throw new Error("An access token and role are required.");

  sessionStorage.setItem(SESSION_KEY, JSON.stringify({
    accessToken,
    role: String(role).toLowerCase(),
    user: user ?? null
  }));
}

export function getAuthSession() {
  try {
    const rawSession = sessionStorage.getItem(SESSION_KEY);
    if (!rawSession) return null;

    const session = JSON.parse(rawSession);
    return session?.accessToken && session?.role ? session : null;
  } catch {
    clearAuthSession();
    return null;
  }
}

export function clearAuthSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

import { api, ApiError } from "./api.js";
import { redirectByRole } from "./guards.js";
import { saveAuthSession } from "./storage.js";
import { showFormErrors, validateLogin, validateRegistration } from "./validation.js";

function setFormMessage(form, message = "", type = "error") {
  const target = form.querySelector("[data-form-message]");
  target.textContent = message;
  target.hidden = !message;
  target.dataset.messageType = type;
}

function setLoading(form, isLoading) {
  const submit = form.querySelector("button[type='submit']");
  submit.disabled = isLoading;
  submit.setAttribute("aria-busy", String(isLoading));
  submit.querySelector("[data-button-text]").textContent = isLoading ? "Please wait…" : submit.dataset.defaultText;
}

function setupPasswordToggles() {
  document.querySelectorAll("[data-password-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.querySelector(`#${button.dataset.passwordToggle}`);
      const visible = input.type === "text";
      input.type = visible ? "password" : "text";
      button.textContent = visible ? "Show" : "Hide";
      button.setAttribute("aria-pressed", String(!visible));
    });
  });
}

async function handleLogin(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const errors = validateLogin(form);
  showFormErrors(form, errors);
  setFormMessage(form);
  if (Object.keys(errors).length) return;

  setLoading(form, true);
  try {
    const data = await api.auth.login({ email: form.email.value.trim(), password: form.password.value });
    if (!data?.access_token || !["student", "admin"].includes(String(data.role).toLowerCase())) {
      throw new ApiError("The sign-in response was incomplete. Please contact support.");
    }
    saveAuthSession({ accessToken: data.access_token, role: data.role, user: data.user });
    redirectByRole(String(data.role).toLowerCase());
  } catch (error) {
    setFormMessage(form, error.message);
  } finally {
    setLoading(form, false);
  }
}

async function handleRegistration(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const errors = validateRegistration(form);
  showFormErrors(form, errors);
  setFormMessage(form);
  if (Object.keys(errors).length) return;

  const formData = new FormData(form);
  const payload = {
    first_name: formData.get("firstName").trim(), last_name: formData.get("lastName").trim(),
    email: formData.get("email").trim(), password: formData.get("password"), branch: formData.get("branch").trim(),
    batch_year: Number(formData.get("batchYear")), cgpa: Number(formData.get("cgpa")), backlogs: Number(formData.get("backlogs")),
    aptitude_score: Number(formData.get("aptitudeScore")), communication_score: Number(formData.get("communicationScore"))
  };
  setLoading(form, true);
  try {
    await api.auth.register(payload);
    window.location.assign("login.html?registered=1");
  } catch (error) {
    setFormMessage(form, error.message);
  } finally {
    setLoading(form, false);
  }
}

function init() {
  setupPasswordToggles();
  const loginForm = document.querySelector("#login-form");
  const registerForm = document.querySelector("#register-form");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
    if (new URLSearchParams(window.location.search).has("registered")) setFormMessage(loginForm, "Registration complete. Please sign in.", "success");
  }
  if (registerForm) registerForm.addEventListener("submit", handleRegistration);
}

init();

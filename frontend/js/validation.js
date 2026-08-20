const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function getFieldValue(form, name) {
  return String(new FormData(form).get(name) ?? "").trim();
}

export function validateLogin(form) {
  const errors = {};
  const email = getFieldValue(form, "email");
  const password = getFieldValue(form, "password");
  if (!EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address.";
  if (!password) errors.password = "Enter your password.";
  return errors;
}

export function validateRegistration(form) {
  const errors = {};
  const values = Object.fromEntries(new FormData(form));
  const requiredFields = ["firstName", "lastName", "email", "password", "confirmPassword", "branch", "batchYear", "cgpa", "backlogs", "aptitudeScore", "communicationScore"];
  requiredFields.forEach((field) => {
    if (!String(values[field] ?? "").trim()) errors[field] = "This field is required.";
  });

  if (values.email && !EMAIL_PATTERN.test(String(values.email))) errors.email = "Enter a valid email address.";
  if (values.password && !isStrongPassword(String(values.password))) errors.password = "Use 8+ characters with upper, lower, and a number.";
  if (values.password && values.confirmPassword && values.password !== values.confirmPassword) errors.confirmPassword = "Passwords do not match.";
  validateRange(errors, "cgpa", values.cgpa, 0, 10, "CGPA must be between 0 and 10.");
  validateRange(errors, "backlogs", values.backlogs, 0, Number.MAX_SAFE_INTEGER, "Backlogs cannot be negative.", true);
  validateRange(errors, "aptitudeScore", values.aptitudeScore, 0, 100, "Score must be between 0 and 100.");
  validateRange(errors, "communicationScore", values.communicationScore, 0, 100, "Score must be between 0 and 100.");
  validateRange(errors, "batchYear", values.batchYear, 2000, 2100, "Enter a valid batch year.", true);
  return errors;
}

function validateRange(errors, field, value, min, max, message, integerOnly = false) {
  if (value === "" || value === undefined) return;
  const number = Number(value);
  if (!Number.isFinite(number) || number < min || number > max || (integerOnly && !Number.isInteger(number))) errors[field] = message;
}

function isStrongPassword(password) {
  return password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password);
}

export function showFormErrors(form, errors) {
  form.querySelectorAll(".field-error").forEach((element) => element.remove());
  form.querySelectorAll("[aria-invalid]").forEach((element) => {
    element.removeAttribute("aria-invalid");
    element.removeAttribute("aria-describedby");
  });
  Object.entries(errors).forEach(([name, message]) => {
    const field = form.elements.namedItem(name);
    if (!field) return;
    field.setAttribute("aria-invalid", "true");
    const error = document.createElement("p");
    error.className = "field-error";
    error.textContent = message;
    error.id = `${name}-error`;
    field.setAttribute("aria-describedby", error.id);
    field.closest(".form-field").append(error);
  });
  const firstInvalid = form.querySelector("[aria-invalid='true']");
  if (firstInvalid) firstInvalid.focus();
}

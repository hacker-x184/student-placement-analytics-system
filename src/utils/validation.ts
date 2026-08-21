/**
 * Input validation helpers
 */

export function isNotEmpty(value: string | null | undefined): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === 'string' && re.test(email.trim());
}

export function isValidPassword(password: string): boolean {
  return typeof password === 'string' && password.length >= 6;
}

export function doPasswordsMatch(p1: string, p2: string): boolean {
  return typeof p1 === 'string' && typeof p2 === 'string' && p1 === p2 && p1.length > 0;
}

export function isValidCgpa(cgpa: number): boolean {
  return !isNaN(cgpa) && cgpa >= 0 && cgpa <= 10;
}

export function isValidBacklogs(backlogs: number): boolean {
  return !isNaN(backlogs) && backlogs >= 0 && Number.isInteger(backlogs);
}

/**
 * Formatting utilities for dates, currency, percentages, and text
 */

export function formatCurrency(amount: number | string, unit = 'LPA'): string {
  if (typeof amount === 'string') return amount;
  return `₹${amount.toFixed(1)} ${unit}`;
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatCgpa(cgpa: number): string {
  return cgpa.toFixed(2);
}

export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/** Formatting shared by the pages: dates (Temporal) and money (Intl). */

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const whole = new Intl.NumberFormat('en-US');

/** 2499 → $2,499.00 */
export function money(value: number): string {
  return usd.format(value);
}

/** 9125 → 9,125 */
export function count(value: number): string {
  return whole.format(value);
}

/** 2026-06-14 → Jun 14, 2026 */
export function day(iso: string): string {
  return Temporal.PlainDate.from(iso.slice(0, 10)).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** 2026-06-03T23:28 → Jun 3, 2026, 11:28 PM */
export function dayTime(iso: string): string {
  return Temporal.PlainDateTime.from(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/** Today, as an ISO date. */
export function today(): string {
  return Temporal.Now.plainDateISO().toString();
}

/** Now, as an ISO date and time (minutes). */
export function now(): string {
  return Temporal.Now.plainDateTimeISO().toString().slice(0, 16);
}

/** A person's initials: Emily Carter → EC. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

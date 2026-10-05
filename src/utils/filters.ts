/**
 * True when an ISO date (YYYY-MM-DD) falls inside the optional [from, to] range.
 * ISO dates compare correctly as plain strings.
 */
export function inDateRange(date: string, from: string, to: string): boolean {
  if (from && date < from) return false;
  if (to && date > to) return false;
  return true;
}

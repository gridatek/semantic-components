import type { ScSchedulerEventData } from './scheduler-types';

/** The first day of `date`'s week (1 = Monday … 7 = Sunday starts it). */
export function startOfWeek(
  date: Temporal.PlainDate,
  firstDayOfWeek: number,
): Temporal.PlainDate {
  return date.subtract({ days: (date.dayOfWeek - firstDayOfWeek + 7) % 7 });
}

/** `count` days from `start`. */
export function daysFrom(
  start: Temporal.PlainDate,
  count: number,
): Temporal.PlainDate[] {
  return Array.from({ length: count }, (_, i) => start.add({ days: i }));
}

/** The weeks a month view shows: whole weeks, from the one with the 1st. */
export function monthWeeks(
  date: Temporal.PlainDate,
  firstDayOfWeek: number,
): Temporal.PlainDate[][] {
  const first = date.with({ day: 1 });
  const last = date.with({ day: date.daysInMonth });
  const weeks: Temporal.PlainDate[][] = [];
  for (
    let start = startOfWeek(first, firstDayOfWeek);
    Temporal.PlainDate.compare(start, last) <= 0;
    start = start.add({ weeks: 1 })
  ) {
    weeks.push(daysFrom(start, 7));
  }
  return weeks;
}

/** The events on `day` (in `timeZone`): all-day ones first, then by start. */
export function eventsOn<T extends ScSchedulerEventData>(
  events: readonly T[],
  day: Temporal.PlainDate,
  timeZone: string,
): T[] {
  const dayStart = day.toZonedDateTime(timeZone).toInstant();
  const dayEnd = day.add({ days: 1 }).toZonedDateTime(timeZone).toInstant();
  return events
    .filter(
      (event) =>
        Temporal.Instant.compare(event.start.toInstant(), dayEnd) < 0 &&
        Temporal.Instant.compare(event.end.toInstant(), dayStart) > 0,
    )
    .sort(
      (a, b) =>
        Number(!!b.allDay) - Number(!!a.allDay) ||
        Temporal.ZonedDateTime.compare(a.start, b.start),
    );
}

/** Where a timed event sits in its day's column, in percent. */
export interface ScSchedulerPlacement<T> {
  readonly event: T;
  readonly top: number;
  readonly height: number;
  readonly left: number;
  readonly width: number;
}

/** Minutes into `day` (wall clock in `timeZone`), within 0–1440. */
function minuteOf(
  moment: Temporal.ZonedDateTime,
  day: Temporal.PlainDate,
  timeZone: string,
): number {
  const local = moment.withTimeZone(timeZone).toPlainDateTime();
  const compared = Temporal.PlainDate.compare(local.toPlainDate(), day);
  if (compared < 0) return 0;
  if (compared > 0) return 24 * 60;
  return local.hour * 60 + local.minute;
}

/**
 * Places a day's timed events between `startHour` and `endHour`: overlapping
 * ones share the width, side by side, each in the first column free.
 */
export function placeTimed<T extends ScSchedulerEventData>(
  events: readonly T[],
  day: Temporal.PlainDate,
  timeZone: string,
  startHour: number,
  endHour: number,
): ScSchedulerPlacement<T>[] {
  const from = startHour * 60;
  const to = endHour * 60;
  const spans = events
    .filter((event) => !event.allDay)
    .map((event) => ({
      event,
      start: Math.max(from, minuteOf(event.start, day, timeZone)),
      end: Math.min(to, minuteOf(event.end, day, timeZone)),
    }))
    .filter((span) => span.end > from && span.start < to)
    // At least half an hour high, so a short event's line can be read.
    .map((span) => ({ ...span, end: Math.max(span.end, span.start + 30) }))
    .sort((a, b) => a.start - b.start || b.end - a.end);

  const placed: ScSchedulerPlacement<T>[] = [];
  // Clusters: events that overlap, directly or through others.
  let cluster: { span: (typeof spans)[number]; column: number }[] = [];
  let clusterEnd = -1;
  const flush = () => {
    const columns = Math.max(0, ...cluster.map((c) => c.column)) + 1;
    for (const { span, column } of cluster) {
      placed.push({
        event: span.event,
        top: ((span.start - from) / (to - from)) * 100,
        height: ((span.end - span.start) / (to - from)) * 100,
        left: (column / columns) * 100,
        width: (1 / columns) * 100,
      });
    }
    cluster = [];
  };
  for (const span of spans) {
    if (span.start >= clusterEnd) flush();
    // The first column whose last event has ended.
    let column = 0;
    while (
      cluster.some((c) => c.column === column && c.span.end > span.start)
    ) {
      column++;
    }
    cluster.push({ span, column });
    clusterEnd = Math.max(clusterEnd, span.end);
  }
  flush();
  return placed;
}

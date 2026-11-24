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

/** The local days an event covers in `timeZone` (its end exclusive). */
export function eventDays(
  event: ScSchedulerEventData,
  timeZone: string,
): { first: Temporal.PlainDate; last: Temporal.PlainDate } {
  const first = event.start.withTimeZone(timeZone).toPlainDate();
  const end = event.end.withTimeZone(timeZone);
  // Ending at midnight: the day before is its last.
  const last =
    end.toPlainTime().equals(Temporal.PlainTime.from('00:00')) &&
    Temporal.ZonedDateTime.compare(event.end, event.start) > 0
      ? end.toPlainDate().subtract({ days: 1 })
      : end.toPlainDate();
  return {
    first,
    last: Temporal.PlainDate.compare(last, first) < 0 ? first : last,
  };
}

/** Whether an event is drawn as a bar: all day, or over more than one day. */
export function isBar(event: ScSchedulerEventData, timeZone: string): boolean {
  if (event.allDay) return true;
  const { first, last } = eventDays(event, timeZone);
  return !first.equals(last);
}

/** An event's piece in a row of days: its column, its span, its lane. */
export interface ScSchedulerSegment<T> {
  readonly event: T;
  /** From 0. */
  readonly column: number;
  readonly span: number;
  /** From 0: the line it is drawn on. */
  readonly lane: number;
  readonly continuesBefore: boolean;
  readonly continuesAfter: boolean;
}

/**
 * Lays a row of days out (a month's week, the all-day row): each event a
 * piece across its days in the row, on the first lane free — bars first,
 * longer first, then by start. With `maxLanes`, the pieces past the last lane
 * (or on it, where a day has more) are left out; each day says how many it
 * left out.
 */
export function layoutRow<T extends ScSchedulerEventData>(
  events: readonly T[],
  days: readonly Temporal.PlainDate[],
  timeZone: string,
  maxLanes = Infinity,
): { segments: ScSchedulerSegment<T>[]; more: number[] } {
  const first = days[0];
  const last = days[days.length - 1];
  const pieces = events
    .map((event) => {
      const span = eventDays(event, timeZone);
      if (
        Temporal.PlainDate.compare(span.last, first) < 0 ||
        Temporal.PlainDate.compare(span.first, last) > 0
      ) {
        return null;
      }
      const from =
        Temporal.PlainDate.compare(span.first, first) < 0 ? first : span.first;
      const to =
        Temporal.PlainDate.compare(span.last, last) > 0 ? last : span.last;
      const column = first.until(from).days;
      return {
        event,
        column,
        span: from.until(to).days + 1,
        continuesBefore: Temporal.PlainDate.compare(span.first, first) < 0,
        continuesAfter: Temporal.PlainDate.compare(span.last, last) > 0,
        bar: isBar(event, timeZone),
      };
    })
    .filter((piece) => piece !== null)
    .sort(
      (a, b) =>
        a.column - b.column ||
        Number(b.bar) - Number(a.bar) ||
        b.span - a.span ||
        Temporal.ZonedDateTime.compare(a.event.start, b.event.start),
    );

  // Each lane: which columns are taken.
  const lanes: boolean[][] = [];
  const placed = pieces.map((piece) => {
    let lane = 0;
    while (
      lanes[lane]?.slice(piece.column, piece.column + piece.span).some(Boolean)
    ) {
      lane++;
    }
    lanes[lane] ??= Array.from({ length: days.length }, () => false);
    for (let i = piece.column; i < piece.column + piece.span; i++) {
      lanes[lane][i] = true;
    }
    return { ...piece, lane };
  });

  const perDay = days.map((_, day) =>
    placed.filter((p) => p.column <= day && day < p.column + p.span),
  );
  // A day with more than the lanes: its last lane says how many more.
  const crowded = perDay.map((pieces) => pieces.length > maxLanes);
  const shown = placed.filter((piece) => {
    if (piece.lane >= maxLanes) return false;
    if (piece.lane < maxLanes - 1) return true;
    return !crowded
      .slice(piece.column, piece.column + piece.span)
      .some(Boolean);
  });
  const more = perDay.map(
    (pieces) => pieces.filter((piece) => !shown.includes(piece)).length,
  );
  return {
    segments: shown.map((piece) => ({
      event: piece.event,
      column: piece.column,
      span: piece.span,
      lane: piece.lane,
      continuesBefore: piece.continuesBefore,
      continuesAfter: piece.continuesAfter,
    })),
    more,
  };
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

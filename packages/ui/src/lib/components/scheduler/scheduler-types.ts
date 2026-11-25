import { InjectionToken, Injector } from '@angular/core';

/** What the scheduler shows: a month's weeks, a week's days, a day, or a month's events as a list. */
export type ScSchedulerView = 'month' | 'week' | 'day' | 'agenda';

/** An event the scheduler places; add your own fields (title, colour…). */
export interface ScSchedulerEventData {
  readonly id: string;
  readonly start: Temporal.ZonedDateTime;
  /** Exclusive: an event from 9:00 to 10:00 ends at 10:00. */
  readonly end: Temporal.ZonedDateTime;
  /** A bar across its days (the month, the all-day row), first in a day. */
  readonly allDay?: boolean;
}

/** What an event's parts act on: the event, where it is shown, and its day. */
export interface ScSchedulerEventContext<
  T extends ScSchedulerEventData = ScSchedulerEventData,
> {
  readonly event: T;
  /** Where it is shown: a month's week, the all-day row, the time grid, or the agenda. */
  readonly place: 'month' | 'all-day' | 'time' | 'agenda';
  /** The day it is shown on (a bar: its first day in the row). */
  readonly day: Temporal.PlainDate;
  /** A bar that goes on before this row (its start corners square). */
  readonly continuesBefore?: boolean;
  /** A bar that goes on after this row (its end corners square). */
  readonly continuesAfter?: boolean;
}

/** A slot picked to create an event: a time range, or whole days. */
export interface ScSchedulerSlot {
  readonly start: Temporal.ZonedDateTime;
  /** Exclusive. */
  readonly end: Temporal.ZonedDateTime;
  readonly allDay: boolean;
}

/** An event moved or resized: its new times, for you to save (the scheduler shows `events`). */
export interface ScSchedulerEventChange<
  T extends ScSchedulerEventData = ScSchedulerEventData,
> {
  readonly event: T;
  readonly start: Temporal.ZonedDateTime;
  readonly end: Temporal.ZonedDateTime;
}

export const SC_SCHEDULER_EVENT = new InjectionToken<ScSchedulerEventContext>(
  'SC_SCHEDULER_EVENT',
);

/** An event's injector, for its parts: its context. */
export function schedulerEventInjector(
  parent: Injector,
  context: ScSchedulerEventContext,
): Injector {
  return Injector.create({
    parent,
    providers: [{ provide: SC_SCHEDULER_EVENT, useValue: context }],
  });
}

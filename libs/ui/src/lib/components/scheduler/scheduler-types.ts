import { InjectionToken, Injector } from '@angular/core';

/** What the scheduler shows: a month's weeks, a week's days, or a day. */
export type ScSchedulerView = 'month' | 'week' | 'day';

/** An event the scheduler places; add your own fields (title, colour…). */
export interface ScSchedulerEventData {
  readonly id: string;
  readonly start: Temporal.ZonedDateTime;
  /** Exclusive: an event from 9:00 to 10:00 ends at 10:00. */
  readonly end: Temporal.ZonedDateTime;
  /** In the all-day row (week, day), and first in a month's day. */
  readonly allDay?: boolean;
}

/** What an event's parts act on: the event, where it is shown, and its day. */
export interface ScSchedulerEventContext<
  T extends ScSchedulerEventData = ScSchedulerEventData,
> {
  readonly event: T;
  /** Where it is shown: a month's day, the all-day row, or the time grid. */
  readonly place: 'month' | 'all-day' | 'time';
  readonly day: Temporal.PlainDate;
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

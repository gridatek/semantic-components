import { Directive, TemplateRef, inject } from '@angular/core';

/** What a day's template is given: the day, and how it stands. */
export interface ScCalendarNextDayContext {
  /** The day. */
  readonly $implicit: Temporal.PlainDate;
  readonly selected: boolean;
  readonly today: boolean;
  readonly unavailable: boolean;
  /** Of a month before or after the one shown. */
  readonly outside: boolean;
}

/**
 * Your content for each day, in the calendar's cell — under its number:
 * `<ng-template scCalendarNextDay let-day>`. An event's dot, a price. Say
 * what it means for screen readers too (an `sr-only` text).
 */
@Directive({ selector: 'ng-template[scCalendarNextDay]' })
export class ScCalendarNextDay {
  readonly template =
    inject<TemplateRef<ScCalendarNextDayContext>>(TemplateRef);

  static ngTemplateContextGuard(
    _dir: ScCalendarNextDay,
    context: unknown,
  ): context is ScCalendarNextDayContext {
    return !!context;
  }
}

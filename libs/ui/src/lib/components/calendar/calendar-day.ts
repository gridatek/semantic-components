import { Directive, TemplateRef, inject } from '@angular/core';

/** What a day's template is given: the day, and how it stands. */
export interface ScCalendarDayContext {
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
 * `<ng-template scCalendarDay let-day>`. An event's dot, a price. Say
 * what it means for screen readers too (an `sr-only` text).
 */
@Directive({ selector: 'ng-template[scCalendarDay]' })
export class ScCalendarDay {
  readonly template = inject<TemplateRef<ScCalendarDayContext>>(TemplateRef);

  static ngTemplateContextGuard(
    _dir: ScCalendarDay,
    context: unknown,
  ): context is ScCalendarDayContext {
    return !!context;
  }
}

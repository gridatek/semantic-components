import { Directive, TemplateRef, inject } from '@angular/core';

/** What a month's day shows for the events it has no room for. */
export interface ScSchedulerMoreContext {
  /** How many are not shown. */
  readonly $implicit: number;
  readonly day: Temporal.PlainDate;
}

/**
 * A month's day with more events than `scSchedulerMonth`'s `maxEvents`:
 * `<ng-template scSchedulerMoreTemplate let-count let-day="day">`, e.g. a
 * `scSchedulerMore` button ("2 more").
 */
@Directive({
  selector: 'ng-template[scSchedulerMoreTemplate]',
})
export class ScSchedulerMoreTemplate {
  readonly template = inject<TemplateRef<ScSchedulerMoreContext>>(TemplateRef);

  static ngTemplateContextGuard(
    _directive: ScSchedulerMoreTemplate,
    _context: unknown,
  ): _context is ScSchedulerMoreContext {
    return true;
  }
}

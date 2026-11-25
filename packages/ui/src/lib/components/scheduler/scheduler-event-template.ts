import { Directive, TemplateRef, inject, input } from '@angular/core';
import type { ScSchedulerEventData } from './scheduler-types';

/**
 * How an event looks, in every view — written once, inside `scScheduler`:
 * `<ng-template [scSchedulerEventTemplate]="events" let-event>`. Bind your
 * events to it so `event` has your type. Its root is a `scSchedulerEvent`.
 */
@Directive({
  selector: 'ng-template[scSchedulerEventTemplate]',
})
export class ScSchedulerEventTemplate<
  T extends ScSchedulerEventData = ScSchedulerEventData,
> {
  /** Your events: only for the template's type (`let-event` is one of them). */
  readonly events = input<readonly T[] | '' | undefined>(undefined, {
    alias: 'scSchedulerEventTemplate',
  });

  readonly template = inject<TemplateRef<{ $implicit: T }>>(TemplateRef);

  static ngTemplateContextGuard<T extends ScSchedulerEventData>(
    _directive: ScSchedulerEventTemplate<T>,
    _context: unknown,
  ): _context is { $implicit: T } {
    return true;
  }
}

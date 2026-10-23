import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';

/**
 * What is shown — write `{{ scheduler.label() }}` in it. Announced when it
 * changes.
 */
@Directive({
  selector: '[scSchedulerTitle]',
  host: {
    'data-slot': 'scheduler-title',
    'aria-live': 'polite',
    '[class]': 'class()',
  },
})
export class ScSchedulerTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-lg font-semibold', this.classInput()),
  );
}

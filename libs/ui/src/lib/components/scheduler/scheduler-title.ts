import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

/**
 * What is shown — write `{{ scheduler.label() }}` in it. Announced when it
 * changes.
 */
@Directive({
  selector:
    'h1[scSchedulerTitle], h2[scSchedulerTitle], h3[scSchedulerTitle], div[scSchedulerTitle]',
  host: {
    'aria-live': 'polite',
    '[class]': 'class()',
  },
})
export class ScSchedulerTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn('text-lg font-semibold', this.classInput()),
  );
}

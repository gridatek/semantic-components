import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/**
 * Read out, not shown: your text about the results (`{{ cmd.count() }}
 * results`), announced as it changes. Outside the list.
 */
@Directive({
  selector: 'div[scCommandNextStatus]',
  host: {
    'data-slot': 'command-status',
    role: 'status',
    'aria-live': 'polite',
    'aria-atomic': 'true',
    '[class]': 'class()',
  },
})
export class ScCommandNextStatus {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('sr-only', this.classInput()));
}

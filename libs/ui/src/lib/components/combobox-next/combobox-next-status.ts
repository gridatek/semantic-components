import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/**
 * Read out, not shown: your text about the results ("3 results",
 * "Searching…"), announced as it changes.
 */
@Directive({
  selector: 'div[scComboboxNextStatus]',
  host: {
    'data-slot': 'combobox-status',
    role: 'status',
    'aria-live': 'polite',
    'aria-atomic': 'true',
    '[class]': 'class()',
  },
})
export class ScComboboxNextStatus {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('sr-only', this.classInput()));
}

import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

/**
 * Read out, not shown: your text about the results ("3 results",
 * "Searching…"), announced as it changes.
 */
@Directive({
  selector: 'div[scComboboxStatus]',
  host: {
    'data-slot': 'combobox-status',
    role: 'status',
    'aria-live': 'polite',
    'aria-atomic': 'true',
    '[class]': 'class()',
  },
})
export class ScComboboxStatus {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('sr-only', this.classInput()));
}

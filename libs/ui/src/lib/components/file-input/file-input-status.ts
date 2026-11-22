import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

/**
 * A polite live region: what it holds is read when it changes — your words
 * from `lastChange()` (files added, removed, kept out). Hidden on screen.
 */
@Directive({
  selector: '[scFileInputStatus]',
  host: {
    'data-slot': 'file-input-status',
    role: 'status',
    'aria-live': 'polite',
    'aria-atomic': 'true',
    '[class]': 'class()',
  },
})
export class ScFileInputStatus {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn('sr-only', this.classInput()));
}

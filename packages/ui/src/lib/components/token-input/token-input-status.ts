import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

/**
 * A polite live region: what it holds is read when it changes — the
 * consumer's words from `lastChange()` (a token added, removed). Hidden on
 * screen.
 */
@Directive({
  selector: 'div[scTokenInputStatus]',
  host: {
    'data-slot': 'token-input-status',
    role: 'status',
    'aria-live': 'polite',
    'aria-atomic': 'true',
    '[class]': 'class()',
  },
})
export class ScTokenInputStatus {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn('sr-only', this.classInput()));
}

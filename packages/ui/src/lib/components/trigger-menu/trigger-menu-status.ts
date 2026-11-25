import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

/**
 * A polite live region in the popup: what it holds is read when it changes —
 * the consumer's words (how many found, loading). Hidden on screen.
 */
@Directive({
  selector: '[scTriggerMenuStatus]',
  host: {
    'data-slot': 'trigger-menu-status',
    role: 'status',
    'aria-live': 'polite',
    'aria-atomic': 'true',
    '[class]': 'class()',
  },
})
export class ScTriggerMenuStatus {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn('sr-only', this.classInput()));
}

import { Directive, computed, inject, input } from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '../../utils';
import { SC_TOAST_CONTEXT } from './toast-context';

/**
 * Dismisses its toast, in your `scToastTemplate`: behaviour only, on any
 * button — the ✕ (`scButton variant="ghost" size="icon-xs"`, straight in the
 * toast: in its corner, shown on hover or focus), or a Dismiss of your own.
 * Write its icon and name it.
 */
@Directive({
  selector: 'button[scToastClose]',
  host: {
    type: 'button',
    'data-slot': 'toast-close',
    '[class]': 'class()',
    '(click)': 'context.dismiss()',
  },
})
export class ScToastClose {
  protected readonly context = inject(SC_TOAST_CONTEXT);
  readonly classInput = input<string>('', { alias: 'class' });

  constructor() {
    ɵwarnIfUnnamed('scToastClose');
  }

  protected readonly class = computed(() => cn(this.classInput()));
}

import { Directive, computed, inject, input } from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '../../utils';
import { SC_TOAST_CONTEXT } from './toast-context';

/** Dismisses its toast, in your `scToastTemplate`. Write its icon and name it. */
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

  protected readonly class = computed(() =>
    cn(
      'absolute end-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity [&_svg]:size-4',
      'hover:text-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 group-hover:opacity-100',
      this.classInput(),
    ),
  );
}

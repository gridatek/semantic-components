import { Directive, computed, inject, input } from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '../../utils';
import { type ScButtonVariants, buttonVariants } from '../button/button';
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
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-xs');

  constructor() {
    ɵwarnIfUnnamed('scToastClose');
  }

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'absolute end-1 top-1 text-foreground/50 opacity-0 group-hover:opacity-100 focus-visible:opacity-100',
      this.classInput(),
    ),
  );
}

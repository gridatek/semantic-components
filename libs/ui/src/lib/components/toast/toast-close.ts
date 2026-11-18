import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils';
import { type ScButtonVariants } from '../button/button';
import { SC_TOAST_CONTEXT } from './toast-context';

/**
 * Dismisses its toast, in your `scToastTemplate`: the style's button, ghost
 * and icon-sized for the ✕, at the end of the row, muted until hovered, its
 * hit area a little larger than itself. A Dismiss of your own sets `variant`
 * and `size`. Write its icon and name it.
 */
@Directive({
  selector: 'button[scToastClose]',
  host: {
    'data-slot': 'toast-close',
    '[attr.type]': 'type()',
    '[class]': 'class()',
    '(click)': 'context.dismiss()',
  },
})
export class ScToastClose {
  private readonly context = inject(SC_TOAST_CONTEXT);
  private readonly buttonStyles = injectStyle().button;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  constructor() {
    ɵwarnIfUnnamed('scToastClose');
  }

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      "relative shrink-0 text-muted-foreground after:absolute after:-inset-2 after:content-[''] hover:text-foreground",
      this.classInput(),
    ),
  );
}

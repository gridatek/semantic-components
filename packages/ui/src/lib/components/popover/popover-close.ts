import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { type ScButtonVariants } from '../button/button';
import { ScPopoverProvider } from './popover-provider';

/**
 * Closes the popover: the style's button, ghost and icon-sized for a ✕
 * (`variant`, `size` for another). Name it.
 */
@Directive({
  selector: 'button[scPopoverClose]',
  host: {
    '[attr.type]': 'type()',
    '[class]': 'class()',
    '(click)': 'popover.close()',
  },
})
export class ScPopoverClose {
  private readonly buttonStyles = injectStyle().button;
  private readonly popover = inject(ScPopoverProvider);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-xs');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}

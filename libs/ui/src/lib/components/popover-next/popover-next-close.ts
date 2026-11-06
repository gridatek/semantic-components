import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { type ScButtonVariants } from '../button/button';
import { ScPopoverNextProvider } from './popover-next-provider';

/**
 * Closes the popover: the preset's button, ghost and icon-sized for a ✕
 * (`variant`, `size` for another). Name it.
 */
@Directive({
  selector: 'button[scPopoverNextClose]',
  host: {
    '[attr.type]': 'type()',
    '[class]': 'class()',
    '(click)': 'popover.close()',
  },
})
export class ScPopoverNextClose {
  private readonly buttonStyles = injectPreset().button;
  protected readonly popover = inject(ScPopoverNextProvider);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-xs');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}

import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { type ScButtonVariants } from '../button/button';
import { ScPopoverProvider } from './popover-provider';

@Directive({
  selector: 'button[scPopoverClose]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'closePopover()',
  },
})
export class ScPopoverClose {
  private readonly buttonStyles = injectPreset().button;

  private readonly popover = inject(ScPopoverProvider);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-xs');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'absolute end-2 top-2',
      this.classInput(),
    ),
  );

  protected closePopover(): void {
    this.popover.open.set(false);
  }
}

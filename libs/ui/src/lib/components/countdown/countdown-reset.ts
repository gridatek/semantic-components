import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
import { ScCountdown } from './countdown';

/** A timer, back to its full time. Write its icon and name it ("Reset"). */
@Directive({
  selector: 'button[scCountdownReset]',
  host: {
    type: 'button',
    'data-slot': 'countdown-reset',
    '[class]': 'class()',
    '(click)': 'countdown.reset()',
  },
})
export class ScCountdownReset {
  private readonly buttonStyles = injectPreset().button;

  protected readonly countdown = inject(ScCountdown);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('default');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scCountdownReset');
  }
}

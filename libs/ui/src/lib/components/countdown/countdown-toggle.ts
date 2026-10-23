import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
import { ScCountdown } from './countdown';

/** A timer: starts and pauses it — done, starts it again. Write its icon and its name from `countdown.paused()` ("Start" / "Pause"). */
@Directive({
  selector: 'button[scCountdownToggle]',
  host: {
    type: 'button',
    'data-slot': 'countdown-toggle',
    '[class]': 'class()',
    '(click)': 'toggle()',
  },
})
export class ScCountdownToggle {
  private readonly buttonStyles = injectPreset().button;

  protected readonly countdown = inject(ScCountdown);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('default');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scCountdownToggle');
  }

  protected toggle(): void {
    if (this.countdown.done()) {
      this.countdown.paused.set(false);
      this.countdown.reset();
    } else {
      this.countdown.paused.update((paused) => !paused);
    }
  }
}

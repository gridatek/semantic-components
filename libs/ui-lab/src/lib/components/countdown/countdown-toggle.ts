import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
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
  protected readonly countdown = inject(ScCountdown);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('default');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
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

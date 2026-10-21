import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
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
  protected readonly countdown = inject(ScCountdown);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('default');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scCountdownReset');
  }
}

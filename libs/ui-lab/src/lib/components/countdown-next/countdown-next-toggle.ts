import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScCountdownNext } from './countdown-next';

/** A timer: starts and pauses it — done, starts it again. Write its icon and its name from `countdown.paused()` ("Start" / "Pause"). */
@Directive({
  selector: 'button[scCountdownNextToggle]',
  host: {
    type: 'button',
    'data-slot': 'countdown-toggle',
    '[class]': 'class()',
    '(click)': 'toggle()',
  },
})
export class ScCountdownNextToggle {
  protected readonly countdown = inject(ScCountdownNext);

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
    ɵwarnIfUnnamed('scCountdownNextToggle');
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

import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScSpotlight } from './spotlight';

/** Closes the spotlight. Write its icon and name it ("Close"); placed in the card's corner. */
@Directive({
  selector: 'button[scSpotlightClose]',
  host: {
    type: 'button',
    'data-slot': 'spotlight-close',
    '[class]': 'class()',
    '(click)': 'spotlight.close()',
  },
})
export class ScSpotlightClose {
  private readonly buttonStyles = injectPreset().button;

  protected readonly spotlight = inject(ScSpotlight);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'absolute end-2 top-2',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scSpotlightClose');
  }
}

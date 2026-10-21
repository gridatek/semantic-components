import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScSpotlightNext } from './spotlight-next';

/** Closes the spotlight. Write its icon and name it ("Close"); placed in the card's corner. */
@Directive({
  selector: 'button[scSpotlightNextClose]',
  host: {
    type: 'button',
    'data-slot': 'spotlight-close',
    '[class]': 'class()',
    '(click)': 'spotlight.close()',
  },
})
export class ScSpotlightNextClose {
  protected readonly spotlight = inject(ScSpotlightNext);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'absolute end-2 top-2',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scSpotlightNextClose');
  }
}

import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScTourGuideNext } from './tour-guide-next';

/** Ends the tour, unfinished. Write its icon and name it ("Close tour"); placed in the card's corner. */
@Directive({
  selector: 'button[scTourGuideNextClose]',
  host: {
    type: 'button',
    'data-slot': 'tour-guide-close',
    '[class]': 'class()',
    '(click)': 'tour.close()',
  },
})
export class ScTourGuideNextClose {
  protected readonly tour = inject(ScTourGuideNext);

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
    ɵwarnIfUnnamed('scTourGuideNextClose');
  }
}

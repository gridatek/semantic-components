import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScTourGuideNext } from './tour-guide-next';

/** The step before; disabled at the first. Write its text ("Back"). */
@Directive({
  selector: 'button[scTourGuideNextPrevious]',
  host: {
    type: 'button',
    'data-slot': 'tour-guide-previous',
    '[disabled]': 'tour.first()',
    '[class]': 'class()',
    '(click)': 'tour.previous()',
  },
})
export class ScTourGuideNextPrevious {
  protected readonly tour = inject(ScTourGuideNext);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scTourGuideNextPrevious');
  }
}

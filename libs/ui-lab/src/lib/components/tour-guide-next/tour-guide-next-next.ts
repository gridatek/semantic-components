import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScTourGuideNext } from './tour-guide-next';

/** The next step — at the last, the end (finished). Write its text from `tour.last()` ("Next" / "Done"). */
@Directive({
  selector: 'button[scTourGuideNextNext]',
  host: {
    type: 'button',
    'data-slot': 'tour-guide-next',
    '[class]': 'class()',
    '(click)': 'tour.next()',
  },
})
export class ScTourGuideNextNext {
  protected readonly tour = inject(ScTourGuideNext);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scTourGuideNextNext');
  }
}

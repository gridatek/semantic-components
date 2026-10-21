import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScTourGuide } from './tour-guide';

/** The next step — at the last, the end (finished). Write its text from `tour.last()` ("Next" / "Done"). */
@Directive({
  selector: 'button[scTourGuideNext]',
  host: {
    type: 'button',
    'data-slot': 'tour-guide',
    '[class]': 'class()',
    '(click)': 'tour.next()',
  },
})
export class ScTourGuideNext {
  protected readonly tour = inject(ScTourGuide);

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
    ɵwarnIfUnnamed('scTourGuideNext');
  }
}

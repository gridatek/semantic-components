import { _IdGenerator } from '@angular/cdk/a11y';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScTourGuide } from './tour-guide';

/** A step's title — your heading: the tour names its dialog with it. */
@Directive({
  selector: '[scTourGuideTitle]',
  host: {
    'data-slot': 'tour-guide-title',
    '[id]': 'id',
    '[class]': 'class()',
  },
})
export class ScTourGuideTitle {
  protected readonly id = inject(_IdGenerator).getId('sc-tour-title-');

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('pe-6 leading-tight font-semibold', this.classInput()),
  );

  constructor() {
    const tour = inject(ScTourGuide);
    tour.ɵtitleId.set(this.id);
    inject(DestroyRef).onDestroy(() => {
      if (tour.ɵtitleId() === this.id) tour.ɵtitleId.set(null);
    });
  }
}

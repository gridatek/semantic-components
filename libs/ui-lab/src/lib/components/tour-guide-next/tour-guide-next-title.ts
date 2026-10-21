import { _IdGenerator } from '@angular/cdk/a11y';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScTourGuideNext } from './tour-guide-next';

/** A step's title — your heading: the tour names its dialog with it. */
@Directive({
  selector: '[scTourGuideNextTitle]',
  host: {
    'data-slot': 'tour-guide-title',
    '[id]': 'id',
    '[class]': 'class()',
  },
})
export class ScTourGuideNextTitle {
  protected readonly id = inject(_IdGenerator).getId('sc-tour-title-');

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('pe-6 leading-tight font-semibold', this.classInput()),
  );

  constructor() {
    const tour = inject(ScTourGuideNext);
    tour.ɵtitleId.set(this.id);
    inject(DestroyRef).onDestroy(() => {
      if (tour.ɵtitleId() === this.id) tour.ɵtitleId.set(null);
    });
  }
}

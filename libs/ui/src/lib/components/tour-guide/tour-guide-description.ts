import { _IdGenerator } from '@angular/cdk/a11y';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScTourGuide } from './tour-guide';

/** A step's text: the tour describes its dialog with it. */
@Directive({
  selector: '[scTourGuideDescription]',
  host: {
    'data-slot': 'tour-guide-description',
    '[id]': 'id',
    '[class]': 'class()',
  },
})
export class ScTourGuideDescription {
  protected readonly id = inject(_IdGenerator).getId('sc-tour-description-');

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-muted-foreground text-sm', this.classInput()),
  );

  constructor() {
    const tour = inject(ScTourGuide);
    tour.ɵdescriptionId.set(this.id);
    inject(DestroyRef).onDestroy(() => {
      if (tour.ɵdescriptionId() === this.id) tour.ɵdescriptionId.set(null);
    });
  }
}

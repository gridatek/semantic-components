import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScTourGuideState } from './tour-guide-state';

@Directive({
  selector: 'h3[scTourGuideTitle]',
  host: {
    'data-slot': 'tour-guide-title',
    '[class]': 'class()',
    '[textContent]': 'state.currentStep()?.title',
  },
})
export class ScTourGuideTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly state = inject(ScTourGuideState);

  protected readonly class = computed(() =>
    cn('mb-2 text-lg font-semibold', this.classInput()),
  );
}

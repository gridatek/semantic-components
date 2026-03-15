import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScTourGuideState } from './tour-guide-state';

@Directive({
  selector: 'p[scTourGuideDescription]',
  host: {
    'data-slot': 'tour-guide-description',
    '[class]': 'class()',
    '[textContent]': 'state.currentStep()?.content',
  },
})
export class ScTourGuideDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly state = inject(ScTourGuideState);

  protected readonly class = computed(() =>
    cn('text-muted-foreground text-sm', this.classInput()),
  );
}

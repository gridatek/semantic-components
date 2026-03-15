import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScTourGuideState } from './tour-guide-state';

@Directive({
  selector: '[scTourGuideStepNumber]',
  host: {
    'data-slot': 'tour-guide-step-number',
    '[class]': 'class()',
    '[textContent]': 'stepNumber()',
  },
})
export class ScTourGuideStepNumber {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly state = inject(ScTourGuideState);

  protected readonly stepNumber = computed(
    () => this.state.currentStepIndex() + 1,
  );

  protected readonly class = computed(() =>
    cn(
      'bg-primary text-primary-foreground absolute -top-3 -left-3 flex size-6 items-center justify-center rounded-full text-xs font-medium',
      this.classInput(),
    ),
  );
}

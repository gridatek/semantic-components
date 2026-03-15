import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScTourGuideState } from './tour-guide-state';

@Directive({
  selector: '[scTourGuideCounter]',
  host: {
    'data-slot': 'tour-guide-counter',
    '[class]': 'class()',
    '[textContent]': 'counterText()',
  },
})
export class ScTourGuideCounter {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly state = inject(ScTourGuideState);

  protected readonly counterText = computed(
    () => `${this.state.currentStepIndex() + 1} of ${this.state.totalSteps()}`,
  );

  protected readonly class = computed(() =>
    cn('text-muted-foreground text-sm', this.classInput()),
  );
}

import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_STEPPER } from './stepper-types';

@Directive({
  selector: '[scStepperList]',
  host: {
    'data-slot': 'stepper-list',
    role: 'tablist',
    '[class]': 'class()',
  },
})
export class ScStepperList {
  private readonly stepper = inject(SC_STEPPER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => {
    const isVertical = this.stepper.orientation() === 'vertical';
    return cn(
      'flex',
      isVertical ? 'flex-col gap-2' : 'flex-row items-start',
      this.classInput(),
    );
  });
}

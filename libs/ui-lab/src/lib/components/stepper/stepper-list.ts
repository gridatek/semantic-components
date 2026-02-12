import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { SC_STEPPER } from './stepper-types';

@Directive({
  selector: '[sc-stepper-list]',
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
      'flex gap-2',
      isVertical ? 'flex-col' : 'flex-row items-center',
      this.classInput(),
    );
  });
}

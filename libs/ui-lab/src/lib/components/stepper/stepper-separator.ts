import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { SC_STEPPER, SC_STEPPER_ITEM } from './stepper-types';

@Directive({
  selector: '[sc-stepper-separator]',
  host: {
    'data-slot': 'stepper-separator',
    '[class]': 'class()',
    '[attr.data-state]': 'state()',
  },
})
export class ScStepperSeparator {
  private readonly stepper = inject(SC_STEPPER);
  private readonly stepperItem = inject(SC_STEPPER_ITEM, { optional: true });

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly state = computed(() => {
    if (!this.stepperItem) return 'inactive';
    return this.stepper.isStepComplete(this.stepperItem.step())
      ? 'complete'
      : 'inactive';
  });

  protected readonly class = computed(() => {
    const isVertical = this.stepper.orientation() === 'vertical';
    return cn(
      'transition-colors',
      isVertical ? 'ml-5 h-8 w-0.5' : 'h-0.5 flex-1',
      'data-[state=complete]:bg-primary data-[state=inactive]:bg-muted',
      this.classInput(),
    );
  });
}

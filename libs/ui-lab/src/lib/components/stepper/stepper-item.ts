import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { SC_STEPPER, SC_STEPPER_ITEM } from './stepper-types';

@Directive({
  selector: '[sc-stepper-item]',
  providers: [{ provide: SC_STEPPER_ITEM, useExisting: ScStepperItem }],
  host: {
    'data-slot': 'stepper-item',
    '[class]': 'class()',
    '[attr.data-state]': 'state()',
  },
})
export class ScStepperItem {
  private readonly stepper = inject(SC_STEPPER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly step = input.required<number>();

  readonly state = computed(() => {
    const stepNum = this.step();
    if (this.stepper.isStepComplete(stepNum)) return 'complete';
    if (this.stepper.isStepActive(stepNum)) return 'active';
    return 'inactive';
  });

  protected readonly class = computed(() => {
    const isVertical = this.stepper.orientation() === 'vertical';
    return cn(
      'flex gap-2',
      isVertical ? 'flex-row' : 'flex-col items-center',
      this.classInput(),
    );
  });
}

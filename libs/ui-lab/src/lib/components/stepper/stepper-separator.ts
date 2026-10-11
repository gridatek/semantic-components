import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_STEPPER, SC_STEPPER_ITEM } from './stepper-types';

/** The line after step `step`; filled once that step is completed. */
@Directive({
  selector: '[scStepperSeparator]',
  host: {
    'aria-hidden': 'true',
    '[class]': 'class()',
    '[attr.data-state]': 'state()',
  },
})
export class ScStepperSeparator {
  private readonly stepper = inject(SC_STEPPER);
  private readonly stepperItem = inject(SC_STEPPER_ITEM, { optional: true });

  readonly classInput = input<string>('', { alias: 'class' });
  /** The step before this line (0-based); defaults to the enclosing step. */
  readonly step = input<number | undefined>(undefined);

  protected readonly state = computed(() => {
    const index = this.step() ?? this.stepperItem?.index();
    if (index === undefined || index < 0) return 'inactive';
    return this.stepper.isStepComplete(index) ? 'complete' : 'inactive';
  });

  protected readonly class = computed(() => {
    const isVertical = this.stepper.orientation() === 'vertical';
    return cn(
      'transition-colors',
      isVertical ? 'ms-5 h-8 w-0.5' : 'mt-5 h-0.5 flex-1',
      'data-[state=complete]:bg-primary data-[state=inactive]:bg-muted',
      this.classInput(),
    );
  });
}

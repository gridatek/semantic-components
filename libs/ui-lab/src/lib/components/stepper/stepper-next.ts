import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_STEPPER } from './stepper-types';

@Directive({
  selector: 'button[scStepperNext]',
  host: {
    '[class]': 'class()',
    '(click)': 'stepper.nextStep()',
  },
})
export class ScStepperNext {
  readonly stepper = inject(SC_STEPPER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}

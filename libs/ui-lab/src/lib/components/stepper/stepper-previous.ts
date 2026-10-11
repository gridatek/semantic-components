import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_STEPPER } from './stepper-types';

/** Goes to the previous step; disabled on the first one. */
@Directive({
  selector: 'button[scStepperPrevious]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'stepper.isFirstStep()',
    '(click)': 'stepper.previous()',
  },
})
export class ScStepperPrevious {
  readonly stepper = inject(SC_STEPPER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}

import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_STEPPER } from './stepper-types';

/**
 * Goes to the next step. In `linear` mode an invalid step stays (its errors
 * show instead). Not rendered as disabled on the last step — use it there for
 * your own "Finish" action, or hide it.
 */
@Directive({
  selector: 'button[scStepperNext]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'stepper.next()',
  },
})
export class ScStepperNext {
  readonly stepper = inject(SC_STEPPER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}

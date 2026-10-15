import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
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
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('lg');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}

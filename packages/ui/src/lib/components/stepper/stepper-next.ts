import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { type ScButtonVariants } from '../button/button';
import { ScStepper } from './stepper';

/** Goes to the next step: the style's button. Refused (`linear`, the step's form invalid), the form shows its errors. */
@Directive({
  selector: 'button[scStepperNext]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'stepper.next()',
  },
})
export class ScStepperNext {
  private readonly buttonStyles = injectStyle().button;
  private readonly stepper = inject(ScStepper);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('default');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}

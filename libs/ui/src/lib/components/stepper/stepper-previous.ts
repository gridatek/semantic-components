import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { type ScButtonVariants } from '../button/button';
import { ScStepper } from './stepper';

/** Goes to the previous step: the style's button (outline); disabled on the first one. */
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
  private readonly buttonStyles = injectStyle().button;
  private readonly stepper = inject(ScStepper);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('default');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}

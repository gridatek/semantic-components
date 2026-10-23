import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
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
  private readonly buttonStyles = injectPreset().button;

  readonly stepper = inject(SC_STEPPER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('lg');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}

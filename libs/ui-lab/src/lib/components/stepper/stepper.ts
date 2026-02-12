import { computed, Directive, input, model } from '@angular/core';
import { cn } from '../../utils';
import { SC_STEPPER, StepperOrientation } from './stepper-types';

@Directive({
  selector: '[sc-stepper]',
  providers: [{ provide: SC_STEPPER, useExisting: ScStepper }],
  host: {
    'data-slot': 'stepper',
    '[class]': 'class()',
    '[attr.data-orientation]': 'orientation()',
  },
})
export class ScStepper {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation = input<StepperOrientation>('horizontal');
  readonly activeStep = model<number>(0);

  protected readonly class = computed(() =>
    cn(
      'flex gap-4',
      this.orientation() === 'vertical' ? 'flex-col' : 'flex-row',
      this.classInput(),
    ),
  );

  goToStep(step: number): void {
    this.activeStep.set(step);
  }

  nextStep(): void {
    this.activeStep.update((s) => s + 1);
  }

  prevStep(): void {
    this.activeStep.update((s) => Math.max(0, s - 1));
  }

  isStepComplete(step: number): boolean {
    return step < this.activeStep();
  }

  isStepActive(step: number): boolean {
    return step === this.activeStep();
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { buttonVariants, cn } from '@semantic-components/ui';
import { SC_STEPPER } from './stepper-types';

@Component({
  selector: 'button[scStepperPrevious]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'stepper-previous',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'stepper.activeStep() === 0',
    '[attr.aria-disabled]': 'stepper.activeStep() === 0 || null',
    '(click)': 'stepper.prevStep()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScStepperPrevious {
  readonly stepper = inject(SC_STEPPER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(buttonVariants({ variant: 'outline', size: 'lg' }), this.classInput()),
  );
}

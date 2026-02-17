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
  selector: 'button[scStepperNext]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'stepper-next',
    type: 'button',
    '[class]': 'class()',
    '(click)': 'stepper.nextStep()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScStepperNext {
  readonly stepper = inject(SC_STEPPER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(buttonVariants({ variant: 'default', size: 'lg' }), this.classInput()),
  );
}

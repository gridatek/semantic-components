import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_STEPPER } from './stepper-types';

@Component({
  selector: 'button[sc-stepper-previous]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'stepper-previous',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'stepper.activeStep() === 0',
    '(click)': 'stepper.prevStep()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScStepperPrevious {
  readonly stepper = inject(SC_STEPPER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'inline-flex h-10 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium',
      'ring-offset-background transition-colors',
      'hover:bg-accent hover:text-accent-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      this.classInput(),
    ),
  );
}

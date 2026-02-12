import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { SC_STEPPER } from './stepper-types';

@Directive({
  selector: '[sc-stepper-content]',
  host: {
    'data-slot': 'stepper-content',
    role: 'tabpanel',
    '[class]': 'class()',
    '[hidden]': '!isActive()',
  },
})
export class ScStepperContent {
  private readonly stepper = inject(SC_STEPPER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly step = input.required<number>();

  protected readonly isActive = computed(() =>
    this.stepper.isStepActive(this.step()),
  );

  protected readonly class = computed(() => cn('mt-4', this.classInput()));
}

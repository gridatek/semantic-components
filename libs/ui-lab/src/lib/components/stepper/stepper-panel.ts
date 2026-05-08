import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_STEPPER, SC_STEPPER_PANEL } from './stepper-types';

@Directive({
  selector: '[scStepperPanel]',
  providers: [{ provide: SC_STEPPER_PANEL, useExisting: ScStepperPanel }],
  host: {
    role: 'tabpanel',
    '[class]': 'class()',
    '[hidden]': '!isActive()',
  },
})
export class ScStepperPanel {
  private readonly stepper = inject(SC_STEPPER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly step = input.required<number>();

  readonly isActive = computed(() => this.stepper.isStepActive(this.step()));

  protected readonly class = computed(() => cn('mt-4', this.classInput()));
}

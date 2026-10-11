import { Directive, type OnInit, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScAriaStepperPanel } from './aria-stepper-panel';
import { SC_STEPPER, SC_STEPPER_PANEL } from './stepper-types';

/**
 * The content of step `step` (an aria tab panel), shown while it's current.
 * Its content goes in an `<ng-template scStepperContent>`.
 */
@Directive({
  selector: '[scStepperPanel]',
  hostDirectives: [ScAriaStepperPanel],
  providers: [{ provide: SC_STEPPER_PANEL, useExisting: ScStepperPanel }],
  host: {
    '[class]': 'class()',
    '[hidden]': '!isActive()',
  },
})
export class ScStepperPanel implements OnInit {
  private readonly stepper = inject(SC_STEPPER);
  private readonly panel = inject(ScAriaStepperPanel);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Index of the step this panel belongs to (0-based). */
  readonly step = input.required<number>();

  readonly isActive = computed(() => this.stepper.isStepActive(this.step()));

  protected readonly class = computed(() => cn('mt-4', this.classInput()));

  ngOnInit(): void {
    this.panel.setValue(String(this.step()));
  }
}

import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { SC_STEPPER } from './stepper-types';

/**
 * The content of step `step` (`role="tabpanel"`, labelled by its trigger),
 * shown while it's current. Hidden panels keep their content.
 */
@Directive({
  selector: '[scStepperPanel]',
  host: {
    role: 'tabpanel',
    '[id]': 'stepper.panelId(step())',
    '[attr.aria-labelledby]': 'stepper.triggerId(step())',
    '[attr.tabindex]': 'isActive() ? 0 : null',
    '[hidden]': '!isActive()',
    '[class]': 'class()',
  },
})
export class ScStepperPanel {
  protected readonly stepper = inject(SC_STEPPER);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Index of the step this panel belongs to (0-based). */
  readonly step = input.required<number>();

  readonly isActive = computed(() => this.stepper.isStepActive(this.step()));

  protected readonly class = computed(() =>
    cn(
      'mt-4 rounded-md outline-none',
      'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      this.classInput(),
    ),
  );
}

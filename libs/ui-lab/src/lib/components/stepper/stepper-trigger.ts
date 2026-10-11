import { CdkStepHeader } from '@angular/cdk/stepper';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_STEPPER, SC_STEPPER_ITEM } from './stepper-types';

/**
 * The clickable step header (`role="tab"`, a CDK step header). Disabled (still
 * focusable) when the step can't be reached yet — `linear` mode with an
 * earlier step incomplete. Put a `scStepperIndicator` inside, and optionally
 * the title.
 */
@Directive({
  selector: 'button[scStepperTrigger]',
  exportAs: 'scStepperTrigger',
  hostDirectives: [CdkStepHeader],
  host: {
    type: 'button',
    '[id]': 'stepper.triggerId(index())',
    '[attr.aria-controls]': 'stepper.panelId(index())',
    '[attr.aria-selected]': 'stepperItem.isSelected()',
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.aria-posinset]': 'index() + 1',
    '[attr.aria-setsize]': 'stepper.stepCount()',
    '[tabIndex]': 'stepper.focusIndex() === index() ? 0 : -1',
    '[class]': 'class()',
    '[attr.data-state]': 'stepperItem.status()',
    '(click)': 'select()',
    '(focus)': 'stepper.syncFocusIndex()',
  },
})
export class ScStepperTrigger {
  protected readonly stepper = inject(SC_STEPPER);
  readonly stepperItem = inject(SC_STEPPER_ITEM);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly index = this.stepperItem.index;
  /** Whether the step can't be reached yet. */
  readonly disabled = computed(() => !this.stepperItem.isNavigable());

  protected readonly class = computed(() =>
    cn(
      // The clickable step header; the circle is scStepperIndicator inside.
      'inline-flex items-center gap-2 rounded-full outline-none',
      'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'aria-disabled:cursor-not-allowed',
      this.classInput(),
    ),
  );

  protected select(): void {
    if (!this.disabled()) this.stepper.goToStep(this.index());
  }
}

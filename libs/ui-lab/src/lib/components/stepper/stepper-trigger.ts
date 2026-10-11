import {
  Directive,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { bindInput, cn } from '@semantic-components/ui';
import { ScAriaStepperTab } from './aria-stepper-tab';
import { SC_STEPPER_ITEM } from './stepper-types';

/**
 * The clickable step header (an aria tab). Disabled (still focusable) when the
 * step can't be reached yet — `linear` mode with an earlier step incomplete.
 * Put a `scStepperIndicator` inside, and optionally the title.
 */
@Directive({
  selector: 'button[scStepperTrigger]',
  exportAs: 'scStepperTrigger',
  hostDirectives: [ScAriaStepperTab],
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.data-state]': 'stepperItem.status()',
  },
})
export class ScStepperTrigger {
  private readonly tab = inject(ScAriaStepperTab);
  readonly stepperItem = inject(SC_STEPPER_ITEM);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      // The clickable step header; the circle is scStepperIndicator inside.
      'inline-flex items-center gap-2 rounded-full outline-none',
      'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'aria-disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50',
      this.classInput(),
    ),
  );

  constructor() {
    bindInput(
      this.tab.disabled,
      computed(() => !this.stepperItem.isNavigable()),
    );
    // The CDK numbers the steps once it has collected them.
    effect(() => {
      const index = this.stepperItem.index();
      if (index >= 0) untracked(() => this.tab.setValue(String(index)));
    });
  }
}

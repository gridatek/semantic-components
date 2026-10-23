import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { SC_STEPPER } from './stepper-types';

/**
 * The row of steps (`role="tablist"`): one Tab stop; the arrow keys (and
 * Home/End) move between steps and select them — as far as the CDK stepper
 * allows (linear mode, validity).
 */
@Directive({
  selector: '[scStepperList]',
  host: {
    role: 'tablist',
    '[attr.aria-orientation]': 'stepper.orientation()',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScStepperList {
  protected readonly stepper = inject(SC_STEPPER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => {
    const isVertical = this.stepper.orientation() === 'vertical';
    return cn(
      'flex',
      isVertical ? 'flex-col gap-2' : 'flex-row items-start',
      this.classInput(),
    );
  });

  protected onKeydown(event: KeyboardEvent): void {
    const cdk = this.stepper.cdk;
    const before = cdk._getFocusIndex();
    cdk._onKeydown(event);
    const after = cdk._getFocusIndex();
    // Selection follows focus.
    if (after !== null && after !== before) this.stepper.goToStep(after);
  }
}

import { CdkStep } from '@angular/cdk/stepper';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  SC_STEPPER,
  SC_STEPPER_ITEM,
  type ScStepperState,
} from './stepper-types';

/**
 * One step. A `CdkStep`, so it takes the CDK's inputs: `stepControl` (a Signal
 * Forms field — the step can't be left while it's invalid in `linear` mode),
 * `optional`, `editable`, `completed`, `hasError`. Its index comes from the
 * stepper.
 *
 * An attribute component rather than a directive only because `CdkStep` is a
 * component, and Angular lets only components extend components. It's used
 * like a directive and just projects its content.
 */
@Component({
  selector: '[scStepperItem]',
  exportAs: 'scStepperItem',
  template: '<ng-content />',
  providers: [
    { provide: CdkStep, useExisting: ScStepperItem },
    { provide: SC_STEPPER_ITEM, useExisting: ScStepperItem },
  ],
  host: {
    '[class]': 'class()',
    '[attr.data-state]': 'status()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScStepperItem extends CdkStep {
  private readonly stepper = inject(SC_STEPPER);

  readonly classInput = input<string>('', { alias: 'class' });

  /**
   * The step's status, for styling and your indicator content. (Not `state`:
   * that is CdkStep's own input.)
   */
  readonly status = computed((): ScStepperState => {
    if (this.isSelected()) return 'active';
    if (this.interacted && this.hasError) return 'error';
    if (this.completed) return 'complete';
    return 'inactive';
  });

  protected readonly class = computed(() => {
    const isVertical = this.stepper.orientation() === 'vertical';
    return cn(
      'flex gap-2',
      isVertical ? 'flex-row' : 'flex-col items-center text-center',
      this.classInput(),
    );
  });
}

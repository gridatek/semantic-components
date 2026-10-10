import { TabList } from '@angular/aria/tabs';
import {
  Directive,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { bindInput, cn } from '@semantic-components/ui';
import { SC_STEPPER } from './stepper-types';

/**
 * The row of steps (`role="tablist"` via aria `TabList`): one Tab stop, arrow
 * keys (and Home/End) move between steps and activate them.
 */
@Directive({
  selector: '[scStepperList]',
  hostDirectives: [TabList],
  host: {
    '[class]': 'class()',
  },
})
export class ScStepperList {
  private readonly stepper = inject(SC_STEPPER);
  private readonly tabList = inject(TabList);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => {
    const isVertical = this.stepper.orientation() === 'vertical';
    return cn(
      'flex',
      isVertical ? 'flex-col gap-2' : 'flex-row items-start',
      this.classInput(),
    );
  });

  constructor() {
    bindInput(this.tabList.orientation, this.stepper.orientation);

    // stepper → tab list
    effect(() => {
      const step = String(this.stepper.activeStep());
      untracked(() => {
        if (this.tabList.selectedTab() !== step)
          this.tabList.selectedTab.set(step);
      });
    });
    // tab list → stepper (arrow keys, clicks)
    effect(() => {
      const selected = this.tabList.selectedTab();
      untracked(() => {
        if (
          selected !== undefined &&
          Number(selected) !== this.stepper.activeStep()
        ) {
          this.stepper.goToStep(Number(selected));
        }
      });
    });
  }
}

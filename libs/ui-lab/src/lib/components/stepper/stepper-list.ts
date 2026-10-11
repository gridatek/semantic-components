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
 * keys (and Home/End) move between steps and activate them — as far as the
 * CDK stepper allows (linear mode, validity).
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
      const step = String(this.stepper.selectedIndex());
      untracked(() => {
        if (this.tabList.selectedTab() !== step) {
          this.tabList.selectedTab.set(step);
        }
      });
    });
    // tab list → stepper (arrow keys, clicks). The CDK may refuse the move
    // (linear mode); then the selected tab goes back to the current step.
    effect(() => {
      const selected = this.tabList.selectedTab();
      untracked(() => {
        if (selected === undefined) return;
        const current = this.stepper.selectedIndex();
        if (Number(selected) === current) return;
        this.stepper.goToStep(Number(selected));
        const now = String(this.stepper.selectedIndex());
        if (this.tabList.selectedTab() !== now) {
          this.tabList.selectedTab.set(now);
        }
      });
    });
  }
}

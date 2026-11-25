import {
  Directive,
  ElementRef,
  computed,
  contentChild,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScStepper } from './stepper';
import { ScStepperDescription } from './stepper-description';
import { ScStepperItem } from './stepper-item';

/**
 * The step's tab: goes to it. Put the indicator and the title (and a
 * description) in it — they name the tab. `aria-disabled` while the step
 * can't be reached (still focusable); the focus ring and corners as the
 * Timeline's events (the style's `timeline.item`).
 */
@Directive({
  selector: 'button[scStepperTrigger]',
  exportAs: 'scStepperTrigger',
  host: {
    type: 'button',
    role: 'tab',
    '[id]': 'stepper.triggerId(index())',
    '[attr.aria-controls]': 'stepper.panelId(index())',
    '[attr.aria-selected]': 'item.current()',
    '[attr.aria-disabled]': '!item.reachable() || null',
    '[attr.aria-posinset]': 'index() + 1',
    '[attr.aria-setsize]': 'stepper.stepCount()',
    '[tabIndex]': 'stepper.focusIndex() === index() ? 0 : -1',
    '[class]': 'class()',
    '(click)': 'stepper.goToStep(index())',
    '(focus)': 'stepper.focusIndex.set(index())',
  },
})
export class ScStepperTrigger {
  private readonly stepper = inject(ScStepper);
  private readonly item = inject(ScStepperItem);
  private readonly element =
    inject<ElementRef<HTMLButtonElement>>(ElementRef).nativeElement;
  private readonly styles = injectStyle().timeline;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly description = contentChild(ScStepperDescription, {
    descendants: false,
  });
  /** A description straight in it: the indicator spans its two lines. */
  readonly twoLines = computed(() => !!this.description());

  /** Its step's place, from 0. */
  readonly index = this.item.index;

  /** Focus, from the list's keys. */
  focus(): void {
    this.element.focus();
  }

  private readonly class = computed(() =>
    cn(
      // The indicator, then the title over the description.
      'grid shrink-0 grid-cols-[auto_1fr] items-center gap-x-3 text-start outline-none',
      this.styles.item,
      !this.item.reachable() && 'cursor-not-allowed',
      this.classInput(),
    ),
  );
}

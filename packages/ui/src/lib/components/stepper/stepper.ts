import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
  linkedSignal,
  model,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import type { ScStepperItem } from './stepper-item';
import type { ScStepperOrientation } from './stepper-types';

/**
 * A multi-step flow: its steps (tabs in a list, one Tab stop), their panels,
 * Previous and Next. `[(selectedIndex)]` is the step shown; `linear` keeps
 * the steps in order, each step's form valid before the next.
 */
@Directive({
  selector: 'div[scStepper]',
  exportAs: 'scStepper',
  host: {
    '[attr.data-orientation]': 'orientation()',
    '[style.--sc-stepper-indicator]': 'indicatorSize',
    '[class]': 'class()',
  },
})
export class ScStepper {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation = input<ScStepperOrientation>('horizontal');
  /** The steps in order: a step's form valid (or the step done) before the next. */
  readonly linear = input(false, { transform: booleanAttribute });
  /** The step shown, from 0. */
  readonly selectedIndex = model(0);

  /** The indicators' size: the style's icon button's (`size-8`: 8 spacing units). */
  private readonly indicatorSize = (() => {
    const size = injectStyle()
      .button({ size: 'icon' })
      .split(/\s+/)
      .find((c) => /^size-\d+(\.\d+)?$/.test(c));
    return `calc(var(--spacing) * ${size ? size.slice(5) : 8})`;
  })();

  private readonly items = signal<readonly ScStepperItem[]>([]);
  /** The steps, in page order (they register themselves). */
  readonly steps = computed(() =>
    [...this.items()].sort((a, b) =>
      // 4: b follows a (Node.DOCUMENT_POSITION_FOLLOWING, no Node global on the server).
      a.element.compareDocumentPosition(b.element) & 4 ? -1 : 1,
    ),
  );
  readonly stepCount = computed(() => this.steps().length);
  readonly isFirstStep = computed(() => this.selectedIndex() === 0);
  readonly isLastStep = computed(
    () => this.selectedIndex() === this.stepCount() - 1,
  );
  /** The step whose trigger is the list's one Tab stop: the one shown, until focus moves. */
  readonly focusIndex = linkedSignal(() => this.selectedIndex());

  private readonly id = inject(_IdGenerator).getId('sc-stepper-');

  private readonly class = computed(() =>
    cn('flex flex-col gap-6', this.classInput()),
  );

  /** @internal A step, from its directive: until it goes. */
  register(item: ScStepperItem): () => void {
    this.items.update((items) => [...items, item]);
    return () => this.items.update((items) => items.filter((i) => i !== item));
  }

  /** Id of step `index`'s trigger (it names the step's panel). */
  triggerId(index: number): string {
    return `${this.id}-trigger-${index}`;
  }

  /** Id of step `index`'s panel. */
  panelId(index: number): string {
    return `${this.id}-panel-${index}`;
  }

  /**
   * Goes to a step, unless it may not: in `linear` mode, past a required step
   * not done; back to a done step that isn't `editable`. The step left counts
   * as visited either way. Whether it moved.
   */
  goToStep(index: number): boolean {
    const steps = this.steps();
    const from = this.selectedIndex();
    if (index === from || index < 0 || index >= steps.length) return false;
    steps[from]?.visited.set(true);
    if (!this.canReach(index)) return false;
    this.selectedIndex.set(index);
    return true;
  }

  /** The next step; refused, the step's form shows its errors (its fields touched). */
  next(): void {
    const from = this.selectedIndex();
    if (!this.goToStep(from + 1) && !this.isLastStep()) {
      this.steps()[from]?.stepControl()?.().markAsTouched();
    }
  }

  previous(): void {
    this.goToStep(this.selectedIndex() - 1);
  }

  /** Back to the first step, every step unvisited, its form untouched. */
  reset(): void {
    for (const step of this.steps()) {
      step.visited.set(false);
      step.stepControl()?.().reset();
    }
    this.selectedIndex.set(0);
  }

  /**
   * Whether step `index` can be reached from the one shown: back, if it is
   * `editable` or not done; ahead, unless `linear` and a required step before
   * it isn't done.
   */
  canReach(index: number): boolean {
    const steps = this.steps();
    const from = this.selectedIndex();
    const target = steps[index];
    if (!target) return false;
    if (index === from) return true;
    if (index < from) return target.editable() || !target.complete();
    return !this.blocked(index);
  }

  /** In `linear` mode, a required step before `index` not done. */
  private blocked(index: number): boolean {
    if (!this.linear()) return false;
    return this.steps()
      .slice(0, index)
      .some((step) => {
        if (step.optional() || step.completed() === true) return false;
        const control = step.stepControl()?.();
        return control
          ? !control.valid() || control.pending() || !step.visited()
          : !step.complete();
      });
  }
}

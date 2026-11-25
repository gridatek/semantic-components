import {
  DestroyRef,
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { ScStepper } from './stepper';
import type { ScStepperControl, ScStepperStatus } from './stepper-types';

/**
 * A step, in the list: its trigger, and the connector to the next one. Its
 * place comes from the page order. `status()` — complete, current, upcoming,
 * failed — in the Timeline's words (`data-complete`, `data-current`…).
 */
@Directive({
  selector: 'div[scStepperItem]',
  exportAs: 'scStepperItem',
  host: {
    '[attr.data-orientation]': 'stepper.orientation()',
    '[attr.data-complete]': 'status() === "complete" ? "" : null',
    '[attr.data-current]': 'status() === "current" ? "" : null',
    '[attr.data-upcoming]': 'status() === "upcoming" ? "" : null',
    '[attr.data-failed]': 'status() === "failed" ? "" : null',
    '[class]': 'class()',
  },
})
export class ScStepperItem {
  readonly stepper = inject(ScStepper);
  /** @internal */
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** The step's form (a Signal Forms field): done once valid and visited. */
  readonly stepControl = input<ScStepperControl>();
  /** May be skipped in `linear` mode. */
  readonly optional = input(false, { transform: booleanAttribute });
  /** Can be gone back to once done. */
  readonly editable = input(true, { transform: booleanAttribute });
  /** Done or not, whatever its form says. */
  readonly completed = input<boolean | undefined>(undefined);
  /** Failed or not, whatever its form says. */
  readonly hasError = input<boolean | undefined>(undefined);

  /** Left at least once (by Next, Previous, a trigger, a key). */
  readonly visited = signal(false);

  /** Its place, from 0. */
  readonly index = computed(() => this.stepper.steps().indexOf(this));
  readonly isLast = computed(
    () => this.index() === this.stepper.stepCount() - 1,
  );
  readonly current = computed(
    () => this.stepper.selectedIndex() === this.index(),
  );
  /** Done: its form valid once visited, or visited (no form), or as `completed` says. */
  readonly complete = computed(() => {
    const completed = this.completed();
    if (completed !== undefined) return completed;
    const control = this.stepControl()?.();
    return control ? control.valid() && this.visited() : this.visited();
  });
  /** Left with its form invalid, or as `hasError` says. */
  readonly failed = computed(() => {
    const hasError = this.hasError();
    if (hasError !== undefined) return hasError;
    const control = this.stepControl()?.();
    return this.visited() && !!control && !control.valid();
  });
  readonly status = computed((): ScStepperStatus => {
    if (this.current()) return 'current';
    if (this.failed()) return 'failed';
    if (this.complete()) return 'complete';
    return 'upcoming';
  });
  /** It can be gone to from the step shown. */
  readonly reachable = computed(() => this.stepper.canReach(this.index()));

  constructor() {
    inject(DestroyRef).onDestroy(this.stepper.register(this));
  }

  private readonly class = computed(() =>
    cn(
      this.stepper.orientation() === 'vertical'
        ? 'flex flex-col'
        : // From its content (the trigger, the connector's least width), the
          // room left shared equally: only the connector grows in it, so every
          // connector is as long, whatever the titles (as MUI's).
          cn('flex items-center gap-3', !this.isLast() && 'flex-auto'),
      this.classInput(),
    ),
  );
}

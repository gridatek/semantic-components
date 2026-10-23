import { CdkStepper } from '@angular/cdk/stepper';
import {
  type AfterContentInit,
  DestroyRef,
  Directive,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { startWith } from 'rxjs';
import { cn } from '../../utils/cn/cn';
import { SC_STEPPER, ScStepperOrientation } from './stepper-types';

/**
 * A stepper, built on `@angular/cdk/stepper`: it owns the state —
 * `[(selectedIndex)]`, `linear` mode, step validation (`stepControl`),
 * completed/optional/editable steps — and the keyboard of the step list. The
 * parts add the tab semantics (`tablist`, `tab`, `tabpanel`).
 */
@Directive({
  selector: '[scStepper]',
  exportAs: 'scStepper',
  hostDirectives: [
    {
      directive: CdkStepper,
      inputs: ['linear', 'selectedIndex'],
      outputs: ['selectedIndexChange', 'selectionChange'],
    },
  ],
  providers: [{ provide: SC_STEPPER, useExisting: ScStepper }],
  host: {
    '[class]': 'class()',
    '[attr.data-orientation]': 'orientation()',
  },
})
export class ScStepper implements AfterContentInit {
  /** The CDK stepper behind this one. */
  readonly cdk = inject(CdkStepper);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation = input<ScStepperOrientation>('horizontal');

  /** Index of the current step. */
  readonly selectedIndex = computed(() => this.cdk.selectedIndex);
  /** Number of steps. */
  readonly stepCount = signal(0);
  /** Index of the step whose trigger is the step list's one Tab stop. */
  readonly focusIndex = signal(0);

  private readonly destroyRef = inject(DestroyRef);

  protected readonly class = computed(() =>
    cn('flex flex-col gap-4', this.classInput()),
  );

  constructor() {
    effect(() => (this.cdk.orientation = this.orientation()));
    // The CDK moves its focus manager along with the selection.
    effect(() => {
      this.selectedIndex();
      untracked(() => this.syncFocusIndex());
    });
  }

  /** Reads the CDK focus manager's position (it isn't reactive). */
  syncFocusIndex(): void {
    this.focusIndex.set(this.cdk._getFocusIndex() ?? this.selectedIndex());
  }

  /** Id of the trigger of step `index` (it labels the step's panel). */
  triggerId(index: number): string {
    return this.cdk._getStepLabelId(index);
  }

  /** Id of the panel of step `index`. */
  panelId(index: number): string {
    return this.cdk._getStepContentId(index);
  }

  ngAfterContentInit(): void {
    // The CDK has collected its steps by now (host directives initialise first).
    const subscription = this.cdk.steps.changes
      .pipe(startWith(null))
      .subscribe(() => this.stepCount.set(this.cdk.steps.length));
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  /** Goes to a step, if the CDK allows it (linear mode, validity, `editable`). */
  goToStep(index: number): void {
    if (index >= 0 && index < this.cdk.steps.length) {
      this.cdk.selectedIndex = index;
    }
  }

  /**
   * Next step. When the CDK refuses (linear mode, invalid step), the step's
   * form is marked as touched so its errors show.
   */
  next(): void {
    const before = this.cdk.selectedIndex;
    this.cdk.next();
    if (this.cdk.selectedIndex === before && !this.isLastStep()) {
      this.revealErrors(before);
    }
  }

  private revealErrors(index: number): void {
    const control = this.cdk.steps.get(index)?.stepControl;
    if (typeof control === 'function') control().markAsTouched();
    else control?.markAllAsTouched();
  }

  previous(): void {
    this.cdk.previous();
  }

  /** Back to the first step, with every step reset (and its form). */
  reset(): void {
    this.cdk.reset();
  }

  isFirstStep(): boolean {
    return this.selectedIndex() === 0;
  }

  isLastStep(): boolean {
    return this.selectedIndex() === this.stepCount() - 1;
  }

  /** Whether the step at `index` is completed (reactive). */
  isStepComplete(index: number): boolean {
    this.stepCount();
    return this.cdk.steps.get(index)?.completed ?? false;
  }

  isStepActive(index: number): boolean {
    return this.selectedIndex() === index;
  }
}

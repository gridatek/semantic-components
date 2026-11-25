import type { Signal } from '@angular/core';

export type ScStepperOrientation = 'horizontal' | 'vertical';

/**
 * Where a step is, in the Timeline's words: done, the one shown, ahead, or
 * left invalid.
 */
export type ScStepperStatus = 'complete' | 'current' | 'upcoming' | 'failed';

/** A step's form: a Signal Forms field (`form.account`), its state when called. */
export type ScStepperControl = () => {
  readonly valid: Signal<boolean>;
  readonly pending: Signal<boolean>;
  markAsTouched(): void;
  reset(): void;
};

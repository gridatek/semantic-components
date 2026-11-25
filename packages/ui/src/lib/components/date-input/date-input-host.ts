import { InjectionToken, type Signal } from '@angular/core';
import type { ScCalendarValue } from '../calendar';

/**
 * What a date input belongs to, and writes into: a Date Picker, or a Date
 * Range Input — its value (a day, or a range whose end the input is), its
 * limits, its state.
 */
export interface ScDateInputHost {
  /** Its value: written by the input (a range's end with `part`). */
  readonly value: Signal<ScCalendarValue> & {
    set(value: ScCalendarValue): void;
  };
  readonly disabled: Signal<boolean>;
  /** Read-only: its inputs too. */
  readonly readonlyState?: Signal<boolean>;
  /** Required: its inputs say so. */
  readonly requiredState?: Signal<boolean>;
  /** Invalid, shown (once touched). */
  readonly showInvalid: Signal<boolean>;
  /** A day within its limits, not unavailable. */
  canPick(date: Temporal.PlainDate): boolean;
  /** An input left. */
  readonly touch: { emit(): void };
}

/** The Date Picker or Date Range Input a date input belongs to. */
export const SC_DATE_INPUT_HOST = new InjectionToken<ScDateInputHost>(
  'SC_DATE_INPUT_HOST',
);

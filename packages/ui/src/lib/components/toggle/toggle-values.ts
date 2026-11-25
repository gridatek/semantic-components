import { InjectionToken } from '@angular/core';

/**
 * A container holding its toggles' pressed values (a toolbar's widget
 * group): a toggle with a `value` inside it is pressed when the container
 * has it, and a click toggles it there.
 */
export interface ScToggleValues {
  has(value: unknown): boolean;
  toggle(value: unknown): void;
  disabled(): boolean;
}

export const SC_TOGGLE_VALUES = new InjectionToken<ScToggleValues>(
  'SC_TOGGLE_VALUES',
);

import { InjectionToken } from '@angular/core';
import type { ScStepper } from './stepper';
import type { ScStepperItem } from './stepper-item';

export type ScStepperOrientation = 'horizontal' | 'vertical';

/** A step's state: the current one, done, invalid after a visit, or ahead. */
export type ScStepperState = 'active' | 'complete' | 'error' | 'inactive';

export const SC_STEPPER = new InjectionToken<ScStepper>('SC_STEPPER');
export const SC_STEPPER_ITEM = new InjectionToken<ScStepperItem>(
  'SC_STEPPER_ITEM',
);

import { InjectionToken } from '@angular/core';
import type { ScStepper } from './stepper';
import type { ScStepperItem } from './stepper-item';

export type StepperOrientation = 'horizontal' | 'vertical';

export const SC_STEPPER = new InjectionToken<ScStepper>('SC_STEPPER');
export const SC_STEPPER_ITEM = new InjectionToken<ScStepperItem>(
  'SC_STEPPER_ITEM',
);

import { InjectionToken } from '@angular/core';
import type { ScStepper } from './stepper';
import type { ScStepperItem } from './stepper-item';
import type { ScStepperPanel } from './stepper-panel';

export type ScStepperOrientation = 'horizontal' | 'vertical';

export const SC_STEPPER = new InjectionToken<ScStepper>('SC_STEPPER');
export const SC_STEPPER_ITEM = new InjectionToken<ScStepperItem>(
  'SC_STEPPER_ITEM',
);
export const SC_STEPPER_PANEL = new InjectionToken<ScStepperPanel>(
  'SC_STEPPER_PANEL',
);

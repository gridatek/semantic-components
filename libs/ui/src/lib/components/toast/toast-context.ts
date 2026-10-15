import { InjectionToken } from '@angular/core';
import type { ScToastData } from './toast.types';

/** What the parts of a toast act on: the toast, and dismissing it. */
export interface ScToastContext {
  readonly toast: ScToastData;
  dismiss(): void;
}

export const SC_TOAST_CONTEXT = new InjectionToken<ScToastContext>(
  'SC_TOAST_CONTEXT',
);

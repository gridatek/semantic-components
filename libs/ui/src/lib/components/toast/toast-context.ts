import { InjectionToken, type Signal } from '@angular/core';
import type { ScToastData } from './toast-types';

/** What the parts of a toast act on: the toast (as it is updated), and dismissing it. */
export interface ScToastContext {
  readonly toast: Signal<ScToastData>;
  dismiss(): void;
}

export const SC_TOAST_CONTEXT = new InjectionToken<ScToastContext>(
  'SC_TOAST_CONTEXT',
);

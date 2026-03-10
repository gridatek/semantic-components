import type { Signal } from '@angular/core';
import { InjectionToken } from '@angular/core';

export interface ScScrollAreaContext {
  readonly viewport: Signal<HTMLElement | undefined>;
}

export const SC_SCROLL_AREA = new InjectionToken<ScScrollAreaContext>(
  'SC_SCROLL_AREA',
);

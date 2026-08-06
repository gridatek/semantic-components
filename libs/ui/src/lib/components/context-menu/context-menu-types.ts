import { InjectionToken } from '@angular/core';

export interface ScContextMenuContext {
  /** Viewport coordinates of the last right-click. */
  position: () => { x: number; y: number };
}

export const SC_CONTEXT_MENU_PROVIDER =
  new InjectionToken<ScContextMenuContext>('SC_CONTEXT_MENU_PROVIDER');

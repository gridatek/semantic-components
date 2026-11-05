import type { Direction } from '@angular/cdk/bidi';
import {
  InjectionToken,
  type Signal,
  type WritableSignal,
} from '@angular/core';

/** What a menu's parts read from its provider. */
export interface ScMenuNextContext {
  /**
   * Opened by a pointer, and not yet moved over nor keyed: no item shows as
   * highlighted (Base UI's way). A keyboard open highlights the first item.
   */
  readonly quiet: WritableSignal<boolean>;
  /** The trigger's direction and language, given to the menu's overlay. */
  readonly direction: () => Direction;
  readonly lang: () => string | null;
}

export const SC_MENU_NEXT = new InjectionToken<ScMenuNextContext>('ScMenuNext');

/** A checkbox or radio item, for its indicator. */
export interface ScMenuNextCheckable {
  readonly checked: Signal<boolean>;
}

export const SC_MENU_NEXT_CHECKABLE = new InjectionToken<ScMenuNextCheckable>(
  'ScMenuNextCheckable',
);

/** A group, or radio group, for its label to name it. */
export interface ScMenuNextGroupContext {
  readonly labelId: WritableSignal<string | null>;
}

export const SC_MENU_NEXT_GROUP = new InjectionToken<ScMenuNextGroupContext>(
  'ScMenuNextGroup',
);

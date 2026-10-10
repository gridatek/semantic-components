import type { Combobox } from '@angular/aria/combobox';
import { InjectionToken } from '@angular/core';
import type { ScCommandItem } from './command-item';

export interface ScCommandContext {
  /** The search input's combobox, once rendered. */
  readonly input: {
    (): Combobox | undefined;
    set(combobox: Combobox | undefined): void;
  };
  registerItem(item: ScCommandItem): void;
  unregisterItem(item: ScCommandItem): void;
  itemFor(value: string): ScCommandItem | undefined;
}

export const SC_COMMAND = new InjectionToken<ScCommandContext>('SC_COMMAND');

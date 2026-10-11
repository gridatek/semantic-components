import { InjectionToken } from '@angular/core';

export interface ScMasonryBreakpoint {
  minWidth: number;
  columns: number;
}

export interface ScMasonryConfig {
  columns?: number;
  gap?: number;
  breakpoints?: ScMasonryBreakpoint[];
}

export type ScMasonryLayoutMode = 'columns' | 'absolute';

export interface ScMasonryGridRef {
  gap: () => number;
}

export interface ScMasonryItemRef {
  getElement(): HTMLElement;
  getHeight(): number;
}

export const SC_MASONRY_GRID = new InjectionToken<ScMasonryGridRef>(
  'ScMasonryGrid',
);

export const SC_MASONRY_ITEM = new InjectionToken<ScMasonryItemRef>(
  'ScMasonryItem',
);

export const DEFAULT_BREAKPOINTS: ScMasonryBreakpoint[] = [
  { minWidth: 0, columns: 1 },
  { minWidth: 640, columns: 2 },
  { minWidth: 768, columns: 3 },
  { minWidth: 1024, columns: 4 },
  { minWidth: 1280, columns: 5 },
];

export const DEFAULT_CONFIG: ScMasonryConfig = {
  columns: 4,
  gap: 16,
  breakpoints: DEFAULT_BREAKPOINTS,
};

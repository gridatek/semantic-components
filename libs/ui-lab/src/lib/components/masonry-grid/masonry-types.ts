import { InjectionToken } from '@angular/core';

export interface MasonryBreakpoint {
  minWidth: number;
  columns: number;
}

export interface MasonryConfig {
  columns?: number;
  gap?: number;
  breakpoints?: MasonryBreakpoint[];
}

export type MasonryLayoutMode = 'columns' | 'absolute';

export interface MasonryGridRef {
  gap: () => number;
}

export interface MasonryItemRef {
  getElement(): HTMLElement;
  getHeight(): number;
}

export const SC_MASONRY_GRID = new InjectionToken<MasonryGridRef>(
  'ScMasonryGrid',
);

export const SC_MASONRY_ITEM = new InjectionToken<MasonryItemRef>(
  'ScMasonryItem',
);

export const DEFAULT_BREAKPOINTS: MasonryBreakpoint[] = [
  { minWidth: 0, columns: 1 },
  { minWidth: 640, columns: 2 },
  { minWidth: 768, columns: 3 },
  { minWidth: 1024, columns: 4 },
  { minWidth: 1280, columns: 5 },
];

export const DEFAULT_CONFIG: MasonryConfig = {
  columns: 4,
  gap: 16,
  breakpoints: DEFAULT_BREAKPOINTS,
};

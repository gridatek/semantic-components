import type { Type } from '@angular/core';

export interface ScDockItemData {
  id: string;
  label: string;
  icon: Type<unknown>;
  href?: string;
  badge?: number | string;
  disabled?: boolean;
}

export type ScDockPosition = 'bottom' | 'left' | 'right';
export type ScDockSize = 'sm' | 'md' | 'lg';

export interface ScDockOptions {
  position?: ScDockPosition;
  size?: ScDockSize;
  magnification?: boolean;
  magnificationScale?: number;
}

export const DEFAULT_DOCK_OPTIONS: Required<ScDockOptions> = {
  position: 'bottom',
  size: 'md',
  magnification: true,
  magnificationScale: 1.5,
};

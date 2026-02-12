export interface DockItem {
  id: string;
  label: string;
  icon: string;
  href?: string;
  badge?: number | string;
  disabled?: boolean;
}

export type DockPosition = 'bottom' | 'left' | 'right';
export type DockSize = 'sm' | 'md' | 'lg';

export interface DockOptions {
  position?: DockPosition;
  size?: DockSize;
  magnification?: boolean;
  magnificationScale?: number;
}

export const DEFAULT_DOCK_OPTIONS: Required<DockOptions> = {
  position: 'bottom',
  size: 'md',
  magnification: true,
  magnificationScale: 1.5,
};

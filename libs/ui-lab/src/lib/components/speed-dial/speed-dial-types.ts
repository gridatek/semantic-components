import type { Type } from '@angular/core';

export type SpeedDialDirection = 'up' | 'down' | 'left' | 'right';

export interface SpeedDialAction {
  id: string;
  icon: Type<unknown>;
  label: string;
  disabled?: boolean;
  ariaLabel?: string;
}

export interface SpeedDialActionClickEvent {
  action: SpeedDialAction;
  index: number;
}

import { InjectionToken } from '@angular/core';
import type { ScSpeedDial } from './speed-dial';

export type SpeedDialDirection = 'up' | 'down' | 'left' | 'right';
export type SpeedDialSize = 'sm' | 'md' | 'lg';

export const SC_SPEED_DIAL = new InjectionToken<ScSpeedDial>('SC_SPEED_DIAL');

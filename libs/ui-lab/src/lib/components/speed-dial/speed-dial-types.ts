import { InjectionToken } from '@angular/core';
import type { ScSpeedDial } from './speed-dial';

export type ScSpeedDialDirection = 'up' | 'down' | 'left' | 'right';
export type ScSpeedDialSize = 'sm' | 'md' | 'lg';

export const SC_SPEED_DIAL = new InjectionToken<ScSpeedDial>('SC_SPEED_DIAL');

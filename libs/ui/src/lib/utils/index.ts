import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type { OverlayAlign, OverlaySide } from './overlay-positions';
export {
  buildOverlayPosition,
  buildOverlayPositionsWithFallback,
} from './overlay-positions';

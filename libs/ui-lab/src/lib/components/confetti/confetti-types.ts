export interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  shape: ConfettiShape;
}

export type ConfettiShape = 'square' | 'circle' | 'triangle' | 'ribbon';

export interface ConfettiOptions {
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  colors?: string[];
  shapes?: ConfettiShape[];
  origin?: { x: number; y: number };
  duration?: number;
}

export const DEFAULT_CONFETTI_OPTIONS: Required<ConfettiOptions> = {
  particleCount: 100,
  spread: 70,
  startVelocity: 30,
  decay: 0.94,
  gravity: 1,
  drift: 0,
  colors: [
    '#ef4444',
    '#f97316',
    '#eab308',
    '#22c55e',
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
  ],
  shapes: ['square', 'circle', 'ribbon'],
  origin: { x: 0.5, y: 0.5 },
  duration: 3000,
};

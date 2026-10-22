import { DOCUMENT } from '@angular/common';
import { Service, inject } from '@angular/core';
import type { CreateTypes, Options } from 'canvas-confetti';

export type ScConfettiShape = 'square' | 'circle' | 'star';

/** A burst: how many, which way, how far, from where, in which colours. */
export interface ScConfettiOptions {
  /** How many pieces. */
  readonly count?: number;
  /** How wide the burst is, in degrees. */
  readonly spread?: number;
  /** Which way it goes, in degrees: 90 is up. */
  readonly angle?: number;
  /** How fast the pieces start. */
  readonly velocity?: number;
  /** Where it starts: a point of the screen (0–1 each way), or an element's centre. */
  readonly origin?: { readonly x: number; readonly y: number } | Element;
  /** Any CSS colours; the theme's by default. */
  readonly colors?: readonly string[];
  readonly shapes?: readonly ScConfettiShape[];
  /** How big the pieces are: 1 is the usual. */
  readonly size?: number;
  /** How fast they fall: 1 is the usual. */
  readonly gravity?: number;
}

/** Fireworks: random bursts, for `duration` milliseconds. */
export interface ScConfettiFireworksOptions extends ScConfettiOptions {
  readonly duration?: number;
}

/** The theme's colours, the defaults. */
const THEME = [
  '--primary',
  '--chart-1',
  '--chart-2',
  '--chart-3',
  '--chart-4',
  '--chart-5',
];

/**
 * Confetti, for a celebration: `burst()`, `sides()` (two cannons),
 * `fireworks()`. Each settles when the confetti has fallen. Drawn on one
 * full-screen canvas — hidden from screen readers, never in the way — and
 * none at all for reduced motion. `canvas-confetti` is loaded on the
 * first one.
 */
@Service()
export class ScConfetti {
  private readonly document = inject(DOCUMENT);
  private fire: Promise<CreateTypes | null> | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private running = 0;

  /** A burst — from the bottom middle, or `origin`. */
  async burst(options: ScConfettiOptions = {}): Promise<void> {
    await this.run(this.options({ count: 100, spread: 70, ...options }));
  }

  /** Two cannons, from the sides. */
  async sides(options: ScConfettiOptions = {}): Promise<void> {
    const base = { count: 80, spread: 55, velocity: 60, ...options };
    await Promise.all([
      this.run(this.options({ ...base, angle: 60, origin: { x: 0, y: 0.7 } })),
      this.run(this.options({ ...base, angle: 120, origin: { x: 1, y: 0.7 } })),
    ]);
  }

  /** Fireworks: bursts here and there, for `duration` (3 s). */
  async fireworks({
    duration = 3000,
    ...options
  }: ScConfettiFireworksOptions = {}): Promise<void> {
    const bursts: Promise<void>[] = [];
    const end = performance.now() + duration;
    while (performance.now() < end) {
      const left = (end - performance.now()) / duration;
      for (const x of [0.1 + Math.random() * 0.2, 0.7 + Math.random() * 0.2]) {
        bursts.push(
          this.run(
            this.options({
              count: Math.max(5, Math.round(50 * left)),
              spread: 360,
              velocity: 30,
              ...options,
              origin: { x, y: Math.random() * 0.4 },
            }),
          ),
        );
      }
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    await Promise.all(bursts);
  }

  /** Clears what is falling. */
  reset(): void {
    void this.instance().then((fire) => fire?.reset());
  }

  private async run(options: Options): Promise<void> {
    const fire = await this.instance();
    if (!fire || !this.canvas) return;
    this.running++;
    this.canvas.dataset['active'] = '';
    try {
      await fire(options);
    } finally {
      if (--this.running === 0) delete this.canvas.dataset['active'];
    }
  }

  /** The canvas and the library: made, and loaded, on the first burst. */
  private instance(): Promise<CreateTypes | null> {
    this.fire ??= (async () => {
      const view = this.document.defaultView;
      if (!view) return null;
      const canvas = this.document.createElement('canvas');
      canvas.dataset['slot'] = 'confetti';
      canvas.setAttribute('aria-hidden', 'true');
      canvas.style.cssText =
        'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:100';
      this.document.body.append(canvas);
      this.canvas = canvas;
      const confetti = (await import('canvas-confetti')).default;
      return confetti.create(canvas, {
        resize: true,
        useWorker: false,
        disableForReducedMotion: true,
      });
    })();
    return this.fire;
  }

  /** Ours, in the library's words. */
  private options(options: ScConfettiOptions): Options {
    const colors = (options.colors ?? this.themeColors())
      .map((color) => this.hex(color))
      .filter((color): color is string => color !== null);
    return {
      particleCount: options.count,
      spread: options.spread,
      angle: options.angle,
      startVelocity: options.velocity,
      origin: this.origin(options.origin),
      colors: colors.length ? colors : undefined,
      shapes: options.shapes ? [...options.shapes] : undefined,
      scalar: options.size,
      gravity: options.gravity,
    };
  }

  /** An element's centre, as a point of the screen (0–1 each way). */
  private origin(
    origin: ScConfettiOptions['origin'],
  ): { x: number; y: number } | undefined {
    if (!origin || !('getBoundingClientRect' in origin)) return origin;
    const view = this.document.defaultView;
    const rect = origin.getBoundingClientRect();
    return {
      x: (rect.left + rect.width / 2) / (view?.innerWidth || 1),
      y: (rect.top + rect.height / 2) / (view?.innerHeight || 1),
    };
  }

  private themeColors(): string[] {
    const style = getComputedStyle(this.document.documentElement);
    return THEME.map((name) => style.getPropertyValue(name).trim()).filter(
      Boolean,
    );
  }

  /** Any CSS colour, as the library takes it: #rrggbb. */
  private hex(color: string): string | null {
    const context = this.document
      .createElement('canvas')
      .getContext('2d', { willReadFrequently: true });
    if (!context) return null;
    context.fillStyle = '#000';
    context.fillStyle = color;
    context.fillRect(0, 0, 1, 1);
    const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
    return '#' + [r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('');
  }
}

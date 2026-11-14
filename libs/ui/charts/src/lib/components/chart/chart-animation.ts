import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  DestroyRef,
  PLATFORM_ID,
  type Signal,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';

/** How a series' entrance runs (Recharts' `animationEasing`). */
export type ScChartAnimationEasing =
  'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';

/** CSS's curves for those names. */
const CURVES: Record<ScChartAnimationEasing, [number, number, number, number]> =
  {
    ease: [0.25, 0.1, 0.25, 1],
    'ease-in': [0.42, 0, 1, 1],
    'ease-out': [0, 0, 0.58, 1],
    'ease-in-out': [0.42, 0, 0.58, 1],
    linear: [0, 0, 1, 1],
  };

/** A cubic Bézier timing curve, as CSS's: the progress at a share of the time. */
export function scChartEasing(
  easing: ScChartAnimationEasing,
): (time: number) => number {
  const [x1, y1, x2, y2] = CURVES[easing];
  const at = (a: number, b: number, t: number) =>
    3 * a * t * (1 - t) ** 2 + 3 * b * t ** 2 * (1 - t) + t ** 3;
  return (time) => {
    if (time <= 0) return 0;
    if (time >= 1) return 1;
    // The curve's parameter whose x is the time: bisection, plenty for a frame.
    let low = 0;
    let high = 1;
    for (let i = 0; i < 20; i++) {
      const mid = (low + high) / 2;
      if (at(x1, x2, mid) < time) low = mid;
      else high = mid;
    }
    return at(y1, y2, (low + high) / 2);
  };
}

/** The entrance's settings: Recharts' names, read when it starts. */
export interface ScChartEntranceOptions {
  begin: () => number;
  duration: () => number;
  easing: () => ScChartAnimationEasing;
}

/**
 * A series' entrance (Recharts' animation on mount): its progress, 0 to 1,
 * eased, after the first render in the browser. 1 from the start on the
 * server, and when the user asks for reduced motion. Call it in a
 * constructor; whether to use it (`isAnimationActive`) is the series'.
 */
export function scChartEntrance(
  options: ScChartEntranceOptions,
): Signal<number> {
  const browser = isPlatformBrowser(inject(PLATFORM_ID));
  const view = inject(DOCUMENT).defaultView;
  const reduced = !!view?.matchMedia?.('(prefers-reduced-motion: reduce)')
    .matches;
  const progress = signal(browser && !reduced ? 0 : 1);
  if (progress() === 1 || !view) return progress.asReadonly();

  let frame = 0;
  afterNextRender(() => {
    const ease = scChartEasing(options.easing());
    const duration = Math.max(0, options.duration());
    const start = view.performance.now() + Math.max(0, options.begin());
    const step = (now: number) => {
      const time = duration ? (now - start) / duration : 1;
      progress.set(ease(Math.min(1, Math.max(0, time))));
      if (time < 1) frame = view.requestAnimationFrame(step);
    };
    frame = view.requestAnimationFrame(step);
  });
  inject(DestroyRef).onDestroy(() => view.cancelAnimationFrame(frame));
  return progress.asReadonly();
}

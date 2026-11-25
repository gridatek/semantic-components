/** How an animation runs: CSS's timing names (Recharts' `animationEasing`). */
export type ScEasing =
  'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';

/** CSS's curves for those names. */
const CURVES: Record<ScEasing, [number, number, number, number]> = {
  ease: [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1],
  linear: [0, 0, 1, 1],
};

/**
 * A cubic Bézier timing curve, as CSS's: the progress (0 to 1) at a share of
 * the time (0 to 1). For animations run frame by frame, without a library.
 */
export function scEasing(easing: ScEasing): (time: number) => number {
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

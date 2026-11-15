import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  DestroyRef,
  PLATFORM_ID,
  type Signal,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
  untracked,
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

/**
 * How a series pairs its shapes before and after its data changes
 * (Recharts' `animationMatchBy`): by position (`index`, stretched when the
 * counts differ), the first ones with the first (`append`: the rest are new),
 * or by a key of each row — a shape whose key is gone leaves, a new key's
 * shape comes in.
 */
export type ScChartAnimationMatchBy =
  | 'index'
  | 'append'
  | ((row: Record<string, unknown>, index: number) => string | number | null);

/** A shape across a change: in both, new, or gone. */
export type ScChartAnimationItem<T> =
  | { readonly status: 'matched'; readonly prev: T; readonly next: T }
  | { readonly status: 'added'; readonly next: T }
  | { readonly status: 'removed'; readonly prev: T };

/** What a shape carries to be matched by key: its row's key. */
export interface ScChartMatchable {
  readonly id?: string | number | null;
}

/** Pairs the shapes before and after a change, as Recharts does. */
export function scChartMatchItems<T extends ScChartMatchable>(
  prev: readonly T[],
  next: readonly T[],
  matchBy: 'index' | 'append' | 'key',
): ScChartAnimationItem<T>[] {
  const tag = (
    aligned: readonly (T | undefined)[],
    removed: readonly T[] = [],
  ): ScChartAnimationItem<T>[] => [
    ...removed.map((item) => ({ status: 'removed' as const, prev: item })),
    ...next.map((item, i): ScChartAnimationItem<T> => {
      const before = aligned[i];
      return before === undefined
        ? { status: 'added', next: item }
        : { status: 'matched', prev: before, next: item };
    }),
  ];
  if (matchBy === 'index') {
    const factor = prev.length / Math.max(1, next.length);
    return tag(next.map((_, i) => prev[Math.floor(i * factor)]));
  }
  if (matchBy === 'append') return tag(next.map((_, i) => prev[i]));
  const before = new Map<string | number, T>();
  for (const item of prev)
    if (item.id != null && !before.has(item.id)) before.set(item.id, item);
  const matched = new Set<string | number>();
  const aligned = next.map((item) => {
    const found = item.id == null ? undefined : before.get(item.id);
    if (found !== undefined && item.id != null) matched.add(item.id);
    return found;
  });
  return tag(
    aligned,
    [...before].filter(([id]) => !matched.has(id)).map(([, item]) => item),
  );
}

/** A number on its way: from `a` to `b` at a share of the time. */
export const scChartInterpolate = (a: number, b: number, time: number) =>
  a + (b - a) * time;

/** A series' shapes over its changes: Recharts' names, read when each starts. */
export interface ScChartTransitionOptions<T> extends ScChartEntranceOptions {
  /** The shapes as they are now (no entrance applied). */
  items: () => readonly T[];
  active: () => boolean;
  matchBy: () => ScChartAnimationMatchBy;
  /** The shapes part-way: Recharts' step for this series. */
  interpolate: (
    items: readonly ScChartAnimationItem<T>[],
    time: number,
  ) => readonly T[];
}

/** The shapes to draw, and whether they're on their way. */
export interface ScChartTransition<T> {
  readonly items: Signal<readonly T[]>;
  readonly animating: Signal<boolean>;
}

/**
 * A series' shapes moving to their new places when they change — new data,
 * a new size (Recharts' animation on update): matched before and after
 * (`matchBy`), stepped by `interpolate`, from wherever they are drawn (a
 * change mid-way starts from there). The first shapes are drawn as they are
 * (the entrance is the series'). At once on the server and with reduced
 * motion. Call it in a constructor.
 */
export function scChartTransition<T extends ScChartMatchable>(
  options: ScChartTransitionOptions<T>,
): ScChartTransition<T> {
  const run = signal<readonly ScChartAnimationItem<T>[] | null>(null);
  const time = signal(1);
  const items = computed(() => {
    const items = run();
    const at = time();
    return items && at < 1 ? options.interpolate(items, at) : options.items();
  });
  const animating = computed(() => run() !== null && time() < 1);

  const view = inject(DOCUMENT).defaultView;
  if (!isPlatformBrowser(inject(PLATFORM_ID)) || !view) {
    return { items, animating: computed(() => false) };
  }
  const reduced = !!view.matchMedia?.('(prefers-reduced-motion: reduce)')
    .matches;
  let previous: readonly T[] | null = null;
  let frame = 0;
  effect(() => {
    const next = options.items();
    untracked(() => {
      const current = run();
      const from =
        current && time() < 1 ? options.interpolate(current, time()) : previous;
      previous = next;
      view.cancelAnimationFrame(frame);
      if (from === null || reduced || !options.active()) {
        run.set(null);
        time.set(1);
        return;
      }
      const matchBy = options.matchBy();
      run.set(
        scChartMatchItems(
          from,
          next,
          typeof matchBy === 'function' ? 'key' : matchBy,
        ),
      );
      time.set(0);
      const ease = scChartEasing(options.easing());
      const duration = Math.max(0, options.duration());
      const start = view.performance.now() + Math.max(0, options.begin());
      const step = (now: number) => {
        const elapsed = duration ? (now - start) / duration : 1;
        time.set(ease(Math.min(1, Math.max(0, elapsed))));
        if (elapsed < 1) frame = view.requestAnimationFrame(step);
        else run.set(null);
      };
      frame = view.requestAnimationFrame(step);
    });
  });
  inject(DestroyRef).onDestroy(() => view.cancelAnimationFrame(frame));
  return { items, animating };
}

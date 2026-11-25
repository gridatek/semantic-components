import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ApplicationRef,
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
import { type ScEasing, scEasing } from '@semantic-components/ui';

/** The entrance's settings: Recharts' names, read when it starts. */
export interface ScChartEntranceOptions {
  begin: () => number;
  duration: () => number;
  easing: () => ScEasing;
  /**
   * When it may start (the chart's `seen`: first in view) — at once after
   * the first render without one.
   */
  start?: () => boolean;
}

/**
 * A series' entrance (Recharts' animation on mount): its progress, 0 to 1,
 * eased, after the first render in the browser — or once `start` says so
 * (the chart first seen). 1 from the start on the
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
  let destroyed = false;
  const app = inject(ApplicationRef);
  // Once the app is stable: hydration waits for it, and an entrance changes
  // the view every frame — a page of charts entering at once kept it from
  // ever being stable on a slow machine (NG0506).
  const run = () => void app.whenStable().then(sweep);
  const sweep = () => {
    if (destroyed) return;
    const ease = scEasing(options.easing());
    const duration = Math.max(0, options.duration());
    const start = view.performance.now() + Math.max(0, options.begin());
    const step = (now: number) => {
      const time = duration ? (now - start) / duration : 1;
      progress.set(ease(Math.min(1, Math.max(0, time))));
      if (time < 1) frame = view.requestAnimationFrame(step);
    };
    frame = view.requestAnimationFrame(step);
  };
  const may = options.start;
  if (may) {
    // Once it may (first seen): never again.
    let started = false;
    effect(() => {
      if (started || !may()) return;
      started = true;
      untracked(run);
    });
  } else afterNextRender(run);
  inject(DestroyRef).onDestroy(() => {
    destroyed = true;
    view.cancelAnimationFrame(frame);
  });
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
  /**
   * The shapes are where they belong (the chart has measured itself): until
   * then, and at that first measure, they are drawn as they are — a guessed
   * size is no change to animate.
   */
  ready?: () => boolean;
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
  let settled = false;
  let frame = 0;
  effect(() => {
    const next = options.items();
    const ready = options.ready?.() ?? true;
    untracked(() => {
      // Before the chart is measured, and at that first measure: no change,
      // only shapes finding their place.
      if (!ready || !settled) {
        settled = ready;
        previous = next;
        return;
      }
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
      const ease = scEasing(options.easing());
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

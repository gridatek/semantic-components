import { Directionality } from '@angular/cdk/bidi';
import { DestroyRef, Service, computed, inject, signal } from '@angular/core';

/** A scroll area's axis: its scrollbar's orientation. */
export type ScScrollAreaOrientation = 'vertical' | 'horizontal';

interface ScScrollAreaMetrics {
  /** Scrolled from the start (px; positive in either direction). */
  x: number;
  y: number;
  scrollWidth: number;
  scrollHeight: number;
  clientWidth: number;
  clientHeight: number;
}

const NONE: ScScrollAreaMetrics = {
  x: 0,
  y: 0,
  scrollWidth: 0,
  scrollHeight: 0,
  clientWidth: 0,
  clientHeight: 0,
};

/** How long `data-scrolling` stays after the last scroll (ms). */
const SCROLLING = 500;

/**
 * A scroll area's state, given by its root to its parts: what its viewport
 * holds, where it is scrolled, whether the pointer is over it. Its own class,
 * not the root's: the root renders the default scrollbar, which reads it.
 */
@Service({ autoProvided: false })
export class ScScrollAreaState {
  private readonly directionality = inject(Directionality);

  /** The scrolling element, registered by the viewport. */
  readonly viewport = signal<HTMLElement | null>(null);
  private readonly metrics = signal(NONE);
  /** The pointer is over it. */
  readonly hovering = signal(false);
  /** It is scrolling (and was, a moment ago). */
  readonly scrolling = signal(false);

  readonly hasOverflowX = computed(
    () => this.metrics().scrollWidth > this.metrics().clientWidth,
  );
  readonly hasOverflowY = computed(
    () => this.metrics().scrollHeight > this.metrics().clientHeight,
  );
  readonly bothOverflow = computed(
    () => this.hasOverflowX() && this.hasOverflowY(),
  );
  /** How far from each edge it is scrolled (px). */
  readonly overflowXStart = computed(() => Math.round(this.metrics().x));
  readonly overflowXEnd = computed(() =>
    Math.max(0, Math.round(this.maxScroll('horizontal') - this.metrics().x)),
  );
  readonly overflowYStart = computed(() => Math.round(this.metrics().y));
  readonly overflowYEnd = computed(() =>
    Math.max(0, Math.round(this.maxScroll('vertical') - this.metrics().y)),
  );

  /** Right to left: the horizontal scroll runs from the right. */
  readonly isRtl = computed(() => this.directionality.valueSignal() === 'rtl');

  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  /** Reads the viewport again: after a scroll or a resize. */
  measure(): void {
    const v = this.viewport();
    if (!v) return;
    this.metrics.set({
      // A right-to-left box scrolls from 0 down to negative values.
      x: Math.abs(v.scrollLeft),
      y: v.scrollTop,
      scrollWidth: v.scrollWidth,
      scrollHeight: v.scrollHeight,
      clientWidth: v.clientWidth,
      clientHeight: v.clientHeight,
    });
  }

  /** It scrolled: measured, and `data-scrolling` for a moment. */
  scrolled(): void {
    this.measure();
    this.scrolling.set(true);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.scrolling.set(false), SCROLLING);
  }

  /** Its scroll along an axis: how far from the start, how far it can go, its size. */
  position(axis: ScScrollAreaOrientation): number {
    return axis === 'vertical' ? this.metrics().y : this.metrics().x;
  }

  maxScroll(axis: ScScrollAreaOrientation): number {
    const m = this.metrics();
    return Math.max(
      0,
      axis === 'vertical'
        ? m.scrollHeight - m.clientHeight
        : m.scrollWidth - m.clientWidth,
    );
  }

  /** The share of the content in view along an axis (0–1). */
  shown(axis: ScScrollAreaOrientation): number {
    const m = this.metrics();
    const [view, all] =
      axis === 'vertical'
        ? [m.clientHeight, m.scrollHeight]
        : [m.clientWidth, m.scrollWidth];
    return all > 0 ? Math.min(1, view / all) : 1;
  }

  /** Scrolls to a distance from the start, in either direction. */
  scrollTo(axis: ScScrollAreaOrientation, distance: number): void {
    const v = this.viewport();
    if (!v) return;
    const to = Math.max(0, Math.min(this.maxScroll(axis), distance));
    if (axis === 'vertical') v.scrollTop = to;
    else v.scrollLeft = this.isRtl() ? -to : to;
  }
}

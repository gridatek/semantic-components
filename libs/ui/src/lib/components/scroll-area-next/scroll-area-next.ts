import { Directionality } from '@angular/cdk/bidi';
import {
  DestroyRef,
  Directive,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from 'cn';

/** A scroll area's axis: its scrollbar's orientation. */
export type ScScrollAreaNextOrientation = 'vertical' | 'horizontal';

interface ScScrollAreaNextMetrics {
  /** Scrolled from the start (px; positive in either direction). */
  x: number;
  y: number;
  scrollWidth: number;
  scrollHeight: number;
  clientWidth: number;
  clientHeight: number;
}

const NONE: ScScrollAreaNextMetrics = {
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
 * A native scroll container with custom scrollbars: the root. Its viewport
 * scrolls (wheel, touch, keyboard — the browser's), its scrollbars follow.
 * It tells what overflows, and where: `data-has-overflow-x` / `-y`,
 * `data-overflow-x-start` / `-end`, `data-overflow-y-start` / `-end`, and
 * `data-scrolling` while it scrolls. As Base UI's ScrollArea.Root.
 */
@Directive({
  selector: 'div[scScrollAreaNext]',
  host: {
    '[attr.data-has-overflow-x]': 'hasOverflowX() ? "" : null',
    '[attr.data-has-overflow-y]': 'hasOverflowY() ? "" : null',
    '[attr.data-overflow-x-start]': 'overflowXStart() > 0 ? "" : null',
    '[attr.data-overflow-x-end]': 'overflowXEnd() > 0 ? "" : null',
    '[attr.data-overflow-y-start]': 'overflowYStart() > 0 ? "" : null',
    '[attr.data-overflow-y-end]': 'overflowYEnd() > 0 ? "" : null',
    '[attr.data-scrolling]': 'scrolling() ? "" : null',
    '[style.--scroll-area-corner-size]': 'bothOverflow() ? "0.625rem" : "0px"',
    '[class]': 'class()',
    '(pointerenter)': 'hovering.set(true)',
    '(pointerleave)': 'hovering.set(false)',
  },
})
export class ScScrollAreaNext {
  private readonly directionality = inject(Directionality);
  readonly classInput = input<string>('', { alias: 'class' });

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

  private timer: ReturnType<typeof setTimeout> | undefined;

  protected readonly class = computed(() =>
    cn('relative overflow-hidden', this.classInput()),
  );

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
  position(axis: ScScrollAreaNextOrientation): number {
    return axis === 'vertical' ? this.metrics().y : this.metrics().x;
  }

  maxScroll(axis: ScScrollAreaNextOrientation): number {
    const m = this.metrics();
    return Math.max(
      0,
      axis === 'vertical'
        ? m.scrollHeight - m.clientHeight
        : m.scrollWidth - m.clientWidth,
    );
  }

  /** The share of the content in view along an axis (0–1). */
  shown(axis: ScScrollAreaNextOrientation): number {
    const m = this.metrics();
    const [view, all] =
      axis === 'vertical'
        ? [m.clientHeight, m.scrollHeight]
        : [m.clientWidth, m.scrollWidth];
    return all > 0 ? Math.min(1, view / all) : 1;
  }

  /** Scrolls to a distance from the start, in either direction. */
  scrollTo(axis: ScScrollAreaNextOrientation, distance: number): void {
    const v = this.viewport();
    if (!v) return;
    const to = Math.max(0, Math.min(this.maxScroll(axis), distance));
    if (axis === 'vertical') v.scrollTop = to;
    else v.scrollLeft = this.isRtl() ? -to : to;
  }

  isRtl(): boolean {
    return this.directionality.value === 'rtl';
  }
}

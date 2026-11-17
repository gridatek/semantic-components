import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { SC_CHART_DEFAULT_MARGIN, ScChartState } from './chart-state';
import type {
  ScChartLayout,
  ScChartMargin,
  ScChartStackOffset,
} from './chart-types';

/**
 * The preset's corner radius (`--sc-chart-bar-radius`) in px: a length only the
 * browser resolves (calc(var(--radius) - 4px)…), read through a probe as wide.
 */
function radiusOf(chart: Element): number {
  const probe = chart.ownerDocument.createElement('div');
  probe.style.cssText =
    'position:absolute;visibility:hidden;width:var(--sc-chart-bar-radius,0px)';
  chart.append(probe);
  const width = parseFloat(getComputedStyle(probe).width);
  probe.remove();
  return Number.isFinite(width) ? width : 0;
}

/**
 * The chart's drawing (`svg`): a category per row (`categoryKey`), and inside
 * it, in drawing order, a grid, axes, a cursor and the series. Points with the
 * pointer and with the keyboard — focus it, then the arrow keys, Home and End
 * move between categories (the tooltip says their values). Name it
 * (`aria-label`).
 */
@Directive({
  selector: 'svg[scChartPlot]',
  host: {
    'data-slot': 'chart-plot',
    tabindex: '0',
    role: 'group',
    dir: 'ltr',
    '[attr.viewBox]': 'viewBox()',
    '[class]': 'class()',
    '(pointermove)': 'onPointerMove($event)',
    // A tap moves nothing: its press points.
    '(pointerdown)': 'onPointerMove($event)',
    '(pointerleave)': 'onPointerLeave($event)',
    '(focus)': 'onFocus()',
    '(blur)': 'onLeave()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScChartPlot {
  private readonly state = inject(ScChartState);
  private readonly host =
    inject<ElementRef<SVGSVGElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** The key of each row's category (`month`). */
  readonly categoryKey = input.required<string>();
  /**
   * Room around the drawing, in px, as Recharts: 5 on each side without one;
   * the sides a given one leaves out are 0.
   */
  readonly margin = input<Partial<ScChartMargin> | undefined>(undefined);
  /** `expand`: each category's stacks to 100%. */
  readonly stackOffset = input<ScChartStackOffset>('none');
  /** `vertical`: the categories down the side, the bars across. */
  readonly layout = input<ScChartLayout>('horizontal');
  /**
   * Polar charts: where they start, in degrees — Recharts': 0 at 3 o'clock,
   * counterclockwise. Unset, Recharts' default: 0 (a radar's: 90, the top).
   */
  readonly startAngle = input<number | undefined>(undefined);
  /** Polar charts: where they end (180: a half circle over the top). Unset: 360 (a radar's: −270). */
  readonly endAngle = input<number | undefined>(undefined);

  private readonly viewBox = computed(
    () => `0 0 ${this.state.width()} ${this.state.height()}`,
  );

  private readonly class = computed(() =>
    cn(
      'h-full min-h-0 w-full flex-1 overflow-visible rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
      // Its text anchored as placed (start: from the point rightwards), in a
      // right-to-left page too: SVG's start follows the direction.
      '[direction:ltr]',
      this.classInput(),
    ),
  );

  constructor() {
    this.state.plotElement.set(this.host);
    this.state.plot.set({
      categoryKey: this.categoryKey,
      margin: computed(() => {
        const margin = this.margin();
        return margin
          ? { top: 0, right: 0, bottom: 0, left: 0, ...margin }
          : SC_CHART_DEFAULT_MARGIN;
      }),
      stackOffset: this.stackOffset,
      layout: this.layout,
      startAngle: this.startAngle,
      endAngle: this.endAngle,
    });

    // Its size, in the browser.
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const chart = this.host.closest('[data-slot=chart]');
      const measure = () => {
        const box = this.host.getBoundingClientRect();
        if (box.width > 0) this.state.width.set(box.width);
        if (box.height > 0) this.state.height.set(box.height);
        if (box.width > 0 && box.height > 0) this.state.measured.set(true);
        // Laid out at last (a chart rendered before it was in the page has
        // no styles to read until then): the preset's corner radius in px.
        if (box.width > 0 && chart) this.state.barRadius.set(radiusOf(chart));
        const around = chart?.getBoundingClientRect();
        if (around)
          this.state.offset.set({
            x: box.left - around.left,
            y: box.top - around.top,
          });
      };
      measure();
      const observer = new ResizeObserver(measure);
      observer.observe(this.host);
      destroyRef.onDestroy(() => observer.disconnect());
      // First seen: a third of it in view, once.
      const View = this.host.ownerDocument.defaultView?.IntersectionObserver;
      if (!View) {
        this.state.seen.set(true);
        return;
      }
      const seen = new View(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          this.state.seen.set(true);
          seen.disconnect();
        },
        { threshold: 0.3 },
      );
      seen.observe(this.host);
      destroyRef.onDestroy(() => seen.disconnect());
    });
  }

  private onPointerMove(event: PointerEvent): void {
    this.state.pointer.set({
      x: event.clientX,
      y: event.clientY,
      type: event.pointerType,
    });
    const box = this.host.getBoundingClientRect();
    const px = ((event.clientX - box.left) * this.state.width()) / box.width;
    const py = ((event.clientY - box.top) * this.state.height()) / box.height;
    // Shapes (slices, rings, boxes, flows): they say it themselves; a radar,
    // its nearest spoke.
    if (!this.state.shaped())
      this.state.activeIndex.set(this.state.indexAt(px, py));
    else if (this.state.series().some((s) => s.kind === 'radar'))
      this.state.activeIndex.set(this.state.spokeAt(px, py));
  }

  private onFocus(): void {
    // Focused by a tap: what it pointed at stays.
    if (this.state.pointer()) return;
    if (this.state.activeIndex() === null && this.state.data().length)
      this.state.activeIndex.set(0);
  }

  /** A finger lifted "leaves": what it tapped stays, until a tap elsewhere (blur). */
  private onPointerLeave(event: PointerEvent): void {
    if (event.pointerType !== 'touch') this.onLeave();
  }

  private onLeave(): void {
    this.state.pointer.set(null);
    if (this.host.ownerDocument.activeElement !== this.host)
      this.state.activeIndex.set(null);
  }

  private onKeydown(event: KeyboardEvent): void {
    const last = this.state.data().length - 1;
    if (last < 0) return;
    const current = this.state.activeIndex() ?? 0;
    // The arrows go the way the categories are drawn: from the right when
    // they run backwards across (mirrored), up when backwards down the side.
    const backwards =
      this.state.categoryReversed() ||
      (this.state.mirrored() && this.state.shaped());
    const across = !this.state.vertical();
    const forward =
      event.key === (across && backwards ? 'ArrowLeft' : 'ArrowRight') ||
      event.key === (!across && backwards ? 'ArrowUp' : 'ArrowDown');
    const back =
      event.key === (across && backwards ? 'ArrowRight' : 'ArrowLeft') ||
      event.key === (!across && backwards ? 'ArrowDown' : 'ArrowUp');
    const next = forward
      ? Math.min(last, current + 1)
      : back
        ? Math.max(0, current - 1)
        : event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? last
            : event.key === 'Escape'
              ? null
              : undefined;
    if (next === undefined) return;
    event.preventDefault();
    this.state.pointer.set(null);
    this.state.activeIndex.set(next);
  }
}

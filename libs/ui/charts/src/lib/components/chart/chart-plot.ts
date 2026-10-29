import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScChartState } from './chart-state';
import type {
  ScChartLayout,
  ScChartMargin,
  ScChartStackOffset,
} from './chart-types';

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
    '(pointerleave)': 'onLeave()',
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
  /** Room around the drawing, in px. */
  readonly margin = input<Partial<ScChartMargin>>({});
  /** `expand`: each category's stacks to 100%. */
  readonly stackOffset = input<ScChartStackOffset>('none');
  /** `vertical`: the categories down the side, the bars across. */
  readonly layout = input<ScChartLayout>('horizontal');
  /** Polar charts: where they start, in degrees (0 at the top, clockwise). */
  readonly startAngle = input(0);
  /** Polar charts: where they end (180: a half circle). */
  readonly endAngle = input(360);

  protected readonly viewBox = computed(
    () => `0 0 ${this.state.width()} ${this.state.height()}`,
  );

  protected readonly class = computed(() =>
    cn(
      'min-h-0 w-full flex-1 overflow-visible rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
      this.classInput(),
    ),
  );

  constructor() {
    this.state.plot.set({
      categoryKey: this.categoryKey,
      margin: computed(() => ({
        top: 8,
        right: 16,
        bottom: 8,
        left: 16,
        ...this.margin(),
      })),
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
    });
  }

  protected onPointerMove(event: PointerEvent): void {
    const box = this.host.getBoundingClientRect();
    const px = ((event.clientX - box.left) * this.state.width()) / box.width;
    const py = ((event.clientY - box.top) * this.state.height()) / box.height;
    // Pies and radial bars: their slices and rings say it themselves.
    if (!this.state.polar())
      this.state.activeIndex.set(this.state.indexAt(px, py));
    else if (this.state.series().some((s) => s.kind === 'radar'))
      this.state.activeIndex.set(this.state.spokeAt(px, py));
  }

  protected onFocus(): void {
    if (this.state.activeIndex() === null && this.state.data().length)
      this.state.activeIndex.set(0);
  }

  protected onLeave(): void {
    if (this.host.ownerDocument.activeElement !== this.host)
      this.state.activeIndex.set(null);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const last = this.state.data().length - 1;
    if (last < 0) return;
    const current = this.state.activeIndex() ?? 0;
    const next =
      event.key === 'ArrowRight' || event.key === 'ArrowDown'
        ? Math.min(last, current + 1)
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
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
    this.state.activeIndex.set(next);
  }
}

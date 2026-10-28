import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { area, line } from 'd3-shape';
import { CURVES } from '../chart/chart-curve';
import { ScChartState } from '../chart/chart-state';
import type { ScChartCurve } from '../chart/chart-types';

interface Point {
  x: number;
  y0: number;
  y1: number;
}

/**
 * A series as an area: its values (`key`) filled down to 0 — or onto the
 * series under it in its `stack`. Its color: `--color-<key>`, or `fill`
 * (a gradient of yours: `url(#…)`).
 */
@Component({
  selector: 'g[scChartArea]',
  template: `
    <svg:path
      [attr.d]="areaPath()"
      [attr.fill]="fill() || color()"
      [attr.fill-opacity]="fillOpacity()"
    />
    <svg:path
      [attr.d]="edgePath()"
      [attr.stroke]="color()"
      stroke-width="2"
      fill="none"
    />
    @if (activePoint(); as p) {
      <svg:circle
        class="stroke-background"
        [attr.cx]="p.x"
        [attr.cy]="p.y1"
        r="4"
        stroke-width="2"
        [attr.fill]="color()"
      />
    }
  `,
  host: {
    'data-slot': 'chart-area',
    '[attr.data-key]': 'key()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartArea {
  private readonly state = inject(ScChartState);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The series' key in the rows. */
  readonly key = input.required<string>();
  readonly curve = input<ScChartCurve>('natural');
  /** Areas of a stack are drawn on one another. */
  readonly stack = input<string | null>(null);
  /** Instead of its color: `url(#gradient)`. */
  readonly fill = input('');
  readonly fillOpacity = input(0.4);
  /** A dot where the pointer is. */
  readonly activeDot = input(true, { transform: booleanAttribute });

  protected readonly color = computed(() => `var(--color-${this.key()})`);

  private readonly points = computed<Point[]>(() => {
    const y = this.state.y();
    return (this.state.extents().get(this.key()) ?? []).map(([y0, y1], i) => ({
      x: this.state.center(i),
      y0: y(y0),
      y1: y(y1),
    }));
  });

  protected readonly areaPath = computed(
    () =>
      area<Point>()
        .x((p) => p.x)
        .y0((p) => p.y0)
        .y1((p) => p.y1)
        .curve(CURVES[this.curve()])(this.points()) ?? '',
  );

  protected readonly edgePath = computed(
    () =>
      line<Point>()
        .x((p) => p.x)
        .y((p) => p.y1)
        .curve(CURVES[this.curve()])(this.points()) ?? '',
  );

  protected readonly activePoint = computed(() => {
    const index = this.state.activeIndex();
    return this.activeDot() && index !== null ? this.points()[index] : null;
  });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const unregister = this.state.register({
      key: this.key,
      kind: 'area',
      stack: this.stack,
    });
    inject(DestroyRef).onDestroy(unregister);
  }
}

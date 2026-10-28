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
import { line } from 'd3-shape';
import { CURVES } from './chart-next-curve';
import { ScChartNextState } from './chart-next-state';
import type { ScChartNextCurve } from './chart-next-types';

interface Point {
  x: number;
  y: number;
}

/** A series as a line through its values (`key`), in `--color-<key>`. */
@Component({
  selector: 'g[scChartNextLine]',
  template: `
    <svg:path
      [attr.d]="path()"
      [attr.stroke]="color()"
      [attr.stroke-width]="strokeWidth()"
      fill="none"
    />
    @if (dots()) {
      @for (p of points(); track $index) {
        <svg:circle
          [attr.cx]="p.x"
          [attr.cy]="p.y"
          r="3"
          [attr.fill]="color()"
        />
      }
    }
    @if (activePoint(); as p) {
      <svg:circle
        class="stroke-background"
        [attr.cx]="p.x"
        [attr.cy]="p.y"
        r="4"
        stroke-width="2"
        [attr.fill]="color()"
      />
    }
  `,
  host: {
    'data-slot': 'chart-line',
    '[attr.data-key]': 'key()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartNextLine {
  private readonly state = inject(ScChartNextState);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The series' key in the rows. */
  readonly key = input.required<string>();
  readonly curve = input<ScChartNextCurve>('natural');
  readonly strokeWidth = input(2);
  /** A dot at each value. */
  readonly dots = input(false, { transform: booleanAttribute });
  /** A dot where the pointer is. */
  readonly activeDot = input(true, { transform: booleanAttribute });

  protected readonly color = computed(() => `var(--color-${this.key()})`);

  protected readonly points = computed<Point[]>(() => {
    const y = this.state.y();
    return (this.state.extents().get(this.key()) ?? []).map(([, value], i) => ({
      x: this.state.center(i),
      y: y(value),
    }));
  });

  protected readonly path = computed(
    () =>
      line<Point>()
        .x((p) => p.x)
        .y((p) => p.y)
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
      kind: 'line',
      stack: computed(() => null),
    });
    inject(DestroyRef).onDestroy(unregister);
  }
}

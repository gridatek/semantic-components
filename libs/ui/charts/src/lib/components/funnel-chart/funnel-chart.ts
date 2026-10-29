import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  SC_CHART_SERIES,
  type ScChartLabelPoint,
  type ScChartLabelPosition,
  type ScChartSeriesLabels,
} from '../chart/chart-series';
import { ScChartState, numberOf } from '../chart/chart-state';

interface Stage {
  index: number;
  path: string;
  color: string;
  cx: number;
  cy: number;
  /** Half its top's width. */
  half: number;
}

/**
 * A series as a funnel: a stage per row, top to bottom, each as wide as its
 * value (the largest, the plot's width) narrowing to the next one's, in its
 * category's color (`--color-<category>`).
 */
@Component({
  selector: 'g[scChartFunnel]',
  providers: [{ provide: SC_CHART_SERIES, useExisting: ScChartFunnel }],
  template: `
    @for (stage of stages(); track stage.index) {
      <svg:path
        [attr.d]="stage.path"
        [attr.fill]="stage.color"
        [attr.fill-opacity]="stage.index === active() ? 1 : 0.85"
        (pointerenter)="point(stage.index)"
      />
    }
    <ng-content />
  `,
  host: {
    'data-slot': 'chart-funnel',
    '[attr.data-key]': 'key()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartFunnel implements ScChartSeriesLabels {
  private readonly state = inject(ScChartState);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The series' key in the rows: each stage's value. */
  readonly key = input.required<string>();
  /** The space between stages, in px. */
  readonly gap = input(2);

  protected readonly active = this.state.activeIndex;

  protected readonly stages = computed<Stage[]>(() => {
    const rows = this.state.data();
    const values = rows.map((row) => numberOf(row[this.key()]));
    const max = Math.max(1, ...values);
    const { left, top, right, bottom } = this.state.area();
    const cx = (left + right) / 2;
    const width = right - left;
    const height = (bottom - top) / Math.max(1, rows.length);
    const gap = this.gap();
    const categories = this.state.categories();
    return values.map((value, index) => {
      const half = (width * value) / max / 2;
      const next = index + 1 < values.length ? values[index + 1] : value * 0.6;
      const narrow = (width * next) / max / 2;
      const y0 = top + index * height + gap / 2;
      const y1 = top + (index + 1) * height - gap / 2;
      return {
        index,
        cx,
        cy: (y0 + y1) / 2,
        half,
        color: `var(--color-${categories[index]})`,
        path: `M${cx - half},${y0}H${cx + half}L${cx + narrow},${y1}H${cx - narrow}Z`,
      };
    });
  });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const unregister = this.state.register({
      key: this.key,
      kind: 'funnel',
      stack: computed(() => null),
      colorBy: computed(() => 'category' as const),
    });
    inject(DestroyRef).onDestroy(unregister);
  }

  protected point(index: number): void {
    this.state.activeIndex.set(index);
  }

  labelPoints(
    position: ScChartLabelPosition,
    offset: number,
  ): ScChartLabelPoint[] {
    const rows = this.state.data();
    return this.stages().map((stage) => {
      const value = numberOf(rows[stage.index]?.[this.key()]);
      // Outside: beyond its right edge; else in its middle.
      return position === 'outside'
        ? {
            index: stage.index,
            value,
            x: stage.cx + stage.half + offset,
            y: stage.cy,
            anchor: 'start',
            baseline: 'middle',
          }
        : {
            index: stage.index,
            value,
            x: stage.cx,
            y: stage.cy,
            anchor: 'middle',
            baseline: 'middle',
          };
    });
  }
}

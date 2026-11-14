import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScChartState } from './chart-state';
import type { ScChartLegendPayload } from './chart-types';

/**
 * The legend's row. Its `payload()` is what it lists — the series of the plot
 * or, for a pie's slices and radial bars, the categories; a sunburst's
 * groups, a sankey's nodes — each with its name (the chart's `config`) and
 * colour. You write an item per entry, with `scChartLegendItem`.
 */
@Directive({
  selector: 'div[scChartLegend]',
  exportAs: 'scChartLegend',
  host: {
    'data-slot': 'chart-legend',
    '[class]': 'class()',
  },
})
export class ScChartLegend {
  private readonly state = inject(ScChartState);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly payload = computed<ScChartLegendPayload[]>(() => {
    const config = this.state.config();
    // A series' own list (groups, nodes); a pie's slices, radial bars: their
    // categories.
    const own = this.state
      .series()
      .find((s) => s.legend)
      ?.legend?.();
    const keys =
      own ??
      (this.state.categoryKeys().size
        ? [...new Set(this.state.categories())]
        : this.state.keys());
    return keys.map((key) => ({
      dataKey: key,
      name: config[key]?.label ?? key,
      color: `var(--color-${key})`,
    }));
  });

  protected readonly class = computed(() =>
    cn('flex items-center justify-center gap-4 pt-3', this.classInput()),
  );
}

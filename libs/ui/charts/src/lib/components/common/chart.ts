import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScChartState } from './chart-state';
import type { ScChartConfig, ScChartDatum } from './chart-types';

/**
 * A chart: its rows (`data`) and its series' names and colors (`config`),
 * each color as `--color-<key>` for the parts. Holds a plot
 * (`svg[scChartPlot]`) and, around it, a tooltip and a legend.
 */
@Directive({
  selector: 'div[scChart]',
  exportAs: 'scChart',
  providers: [ScChartState],
  host: {
    'data-slot': 'chart',
    '[class]': 'class()',
    '[style]': 'colors()',
  },
})
export class ScChart {
  readonly state = inject(ScChartState);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly data = input<readonly ScChartDatum[]>([]);
  readonly config = input<ScChartConfig>({});

  protected readonly class = computed(() =>
    cn(
      'relative flex aspect-video flex-col justify-center text-xs',
      this.classInput(),
    ),
  );

  /** Each series' color, as `--color-<key>`. */
  protected readonly colors = computed(() =>
    Object.fromEntries(
      Object.entries(this.config())
        .filter(([, series]) => series.color)
        .map(([key, series]) => [`--color-${key}`, series.color]),
    ),
  );

  constructor() {
    this.state.source.set({ data: this.data, config: this.config });
  }
}

import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScChartNextState } from './chart-next-state';
import type { ScChartNextConfig, ScChartNextDatum } from './chart-next-types';

/**
 * A chart: its rows (`data`) and its series' names and colors (`config`),
 * each color as `--color-<key>` for the parts. Holds a plot
 * (`svg[scChartNextPlot]`) and, around it, a tooltip and a legend.
 */
@Directive({
  selector: 'div[scChartNext]',
  exportAs: 'scChartNext',
  providers: [ScChartNextState],
  host: {
    'data-slot': 'chart',
    '[class]': 'class()',
    '[style]': 'colors()',
  },
})
export class ScChartNext {
  readonly state = inject(ScChartNextState);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly data = input<readonly ScChartNextDatum[]>([]);
  readonly config = input<ScChartNextConfig>({});

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

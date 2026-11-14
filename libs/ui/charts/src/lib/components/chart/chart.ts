import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '@semantic-components/ui';
import { cn } from 'cn';
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
    '[style]': 'state.colors()',
  },
})
export class ScChart {
  readonly state = inject(ScChartState);
  /** The preset's: how round the bars are (`--chart-bar-radius`). */
  private readonly chartStyles = injectPreset().chart.chart;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly data = input<readonly ScChartDatum[]>([]);
  readonly config = input<ScChartConfig>({});

  protected readonly class = computed(() =>
    cn(
      'relative flex aspect-video min-h-0 flex-col justify-center text-xs',
      this.chartStyles,
      this.classInput(),
    ),
  );

  constructor() {
    this.state.source.set({ data: this.data, config: this.config });
  }
}

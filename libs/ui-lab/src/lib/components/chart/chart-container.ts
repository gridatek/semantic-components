import { computed, Directive, InjectionToken, input } from '@angular/core';
import { cn } from '../../utils';
import { CHART_COLORS, ChartConfig } from './chart-types';

// Token for chart context
export const SC_CHART = new InjectionToken<ScChartContainer>('SC_CHART');

@Directive({
  selector: '[sc-chart-container]',
  providers: [{ provide: SC_CHART, useExisting: ScChartContainer }],
  host: {
    'data-slot': 'chart-container',
    '[class]': 'class()',
  },
})
export class ScChartContainer {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly config = input<ChartConfig>({});

  protected readonly class = computed(() =>
    cn('flex flex-col gap-4', this.classInput()),
  );

  getColor(key: string, index: number): string {
    const cfg = this.config()[key];
    if (cfg?.color) return cfg.color;
    return CHART_COLORS[index % CHART_COLORS.length];
  }

  getLabel(key: string): string {
    return this.config()[key]?.label ?? key;
  }
}

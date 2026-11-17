import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  type ScChartConfig,
  ScChartLegend,
  ScChartLegendIndicator,
  ScChartLegendItem,
  ScChartPie,
  ScChartPlot,
  ScChartTooltip,
  ScChartTooltipIndicator,
  ScChartTooltipItem,
  ScChartTooltipName,
  ScChartTooltipPortal,
  ScChartTooltipProvider,
  ScChartTooltipValue,
} from '@semantic-components/ui/charts';

/** In a right-to-left page: the text, the tooltip and the legend in Arabic, right to left; the app following the direction (charts.followDirection), it is mirrored — from 9 o’clock, clockwise; ← to the next. */
@Component({
  selector: 'app-rtl-pie-chart-demo',
  imports: [
    Dir,
    ScChart,
    ScChartLegend,
    ScChartLegendIndicator,
    ScChartLegendItem,
    ScChartPie,
    ScChartPlot,
    ScChartTooltip,
    ScChartTooltipIndicator,
    ScChartTooltipItem,
    ScChartTooltipName,
    ScChartTooltipPortal,
    ScChartTooltipProvider,
    ScChartTooltipValue,
  ],
  template: `
    <div
      dir="rtl"
      lang="ar"
      scChart
      class="mx-auto aspect-square max-h-72"
      [config]="config"
      [data]="data"
    >
      <svg scChartPlot categoryKey="browser" aria-label="الزوار حسب المتصفح">
        <g scChartPie key="visitors" />
      </svg>
      <div scChartTooltipProvider>
        <ng-template scChartTooltipPortal>
          <div scChartTooltip #tooltip="scChartTooltip">
            @for (item of tooltip.payload(); track item.dataKey) {
              <div scChartTooltipItem [item]="item">
                <span scChartTooltipIndicator></span>
                <span scChartTooltipName>{{ item.name }}</span>
                <span scChartTooltipValue>{{ format(item.value) }}</span>
              </div>
            }
          </div>
        </ng-template>
      </div>
      <div scChartLegend #legend="scChartLegend" class="flex-wrap">
        @for (item of legend.payload(); track item.dataKey) {
          <div scChartLegendItem [item]="item">
            <span scChartLegendIndicator></span>
            {{ item.name }}
          </div>
        }
      </div>
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlPieChartDemo {
  private readonly data = [
    { browser: 'chrome', visitors: 275 },
    { browser: 'safari', visitors: 200 },
    { browser: 'firefox', visitors: 187 },
    { browser: 'edge', visitors: 173 },
    { browser: 'other', visitors: 90 },
  ];
  private readonly config: ScChartConfig = {
    visitors: { label: 'الزوار' },
    chrome: { label: 'Chrome', color: 'var(--chart-1)' },
    safari: { label: 'Safari', color: 'var(--chart-2)' },
    firefox: { label: 'Firefox', color: 'var(--chart-3)' },
    edge: { label: 'Edge', color: 'var(--chart-4)' },
    other: { label: 'أخرى', color: 'var(--chart-5)' },
  };
  private readonly numbers = new Intl.NumberFormat('ar');

  /** A value in the locale's digits. */
  private format(value: unknown): string {
    return this.numbers.format(Number(value));
  }
}

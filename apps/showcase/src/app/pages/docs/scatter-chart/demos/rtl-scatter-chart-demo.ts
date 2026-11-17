import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  ScChartCategoryAxis,
  type ScChartConfig,
  ScChartGrid,
  ScChartPlot,
  ScChartScatter,
  ScChartTooltip,
  ScChartTooltipIndicator,
  ScChartTooltipItem,
  ScChartTooltipLabel,
  ScChartTooltipName,
  ScChartTooltipPortal,
  ScChartTooltipProvider,
  ScChartTooltipValue,
  ScChartValueAxis,
} from '@semantic-components/ui/charts';

/** In a right-to-left page, the app following the direction: the heights grow leftwards, the weights on the right; the numbers in Arabic. */
@Component({
  selector: 'app-rtl-scatter-chart-demo',
  imports: [
    Dir,
    ScChart,
    ScChartCategoryAxis,
    ScChartGrid,
    ScChartPlot,
    ScChartScatter,
    ScChartTooltip,
    ScChartTooltipIndicator,
    ScChartTooltipItem,
    ScChartTooltipLabel,
    ScChartTooltipName,
    ScChartTooltipPortal,
    ScChartTooltipProvider,
    ScChartTooltipValue,
    ScChartValueAxis,
  ],
  template: `
    <div
      dir="rtl"
      lang="ar"
      scChart
      class="aspect-video max-h-72"
      [config]="config"
      [data]="data"
    >
      <svg
        scChartPlot
        categoryKey="name"
        aria-label="الطول والوزن لاثني عشر شخصًا"
      >
        <g scChartGrid [vertical]="true" />
        <g scChartCategoryAxis />
        <g scChartValueAxis />
        <g scChartScatter key="weight" xKey="height" />
      </svg>
      <div scChartTooltipProvider>
        <ng-template scChartTooltipPortal>
          <div scChartTooltip #tooltip="scChartTooltip">
            <div scChartTooltipLabel>{{ tooltip.label() }}</div>
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
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlScatterChartDemo {
  private readonly data = [
    { name: 'سارة', height: 158, weight: 52 },
    { name: 'أحمد', height: 183, weight: 81 },
    { name: 'ليلى', height: 165, weight: 60 },
    { name: 'عمر', height: 176, weight: 74 },
    { name: 'نور', height: 162, weight: 55 },
    { name: 'خالد', height: 189, weight: 90 },
    { name: 'مريم', height: 171, weight: 68 },
    { name: 'يوسف', height: 168, weight: 63 },
    { name: 'هدى', height: 179, weight: 85 },
    { name: 'علي', height: 155, weight: 49 },
    { name: 'رنا', height: 185, weight: 77 },
    { name: 'زياد', height: 173, weight: 66 },
  ];
  private readonly config: ScChartConfig = {
    height: { label: 'الطول (سم)' },
    weight: { label: 'الوزن (كغ)', color: 'var(--chart-1)' },
  };
  private readonly numbers = new Intl.NumberFormat('ar');

  /** A value in Arabic digits. */
  private format(value: unknown): string {
    return this.numbers.format(Number(value));
  }
}

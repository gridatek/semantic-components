import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  type ScChartConfig,
  ScChartLabels,
  ScChartPlot,
  ScChartSunburst,
  ScChartTooltip,
  ScChartTooltipIndicator,
  ScChartTooltipItem,
  ScChartTooltipLabel,
  ScChartTooltipName,
  ScChartTooltipValue,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-label-sunburst-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartSunburst,
    ScChartLabels,
    ScChartTooltip,
    DecimalPipe,
    ScChartTooltipLabel,
    ScChartTooltipIndicator,
    ScChartTooltipItem,
    ScChartTooltipName,
    ScChartTooltipValue,
  ],
  template: `
    <div
      scChart
      class="mx-auto aspect-square max-h-72"
      [config]="config"
      [data]="data"
    >
      <svg
        scChartPlot
        categoryKey="country"
        [margin]="{ top: 24, right: 56, bottom: 24, left: 56 }"
        aria-label="Sales by region and country"
      >
        <g scChartSunburst key="sales" groupKey="region" [innerRadius]="0.4">
          <g scChartLabels position="outside" [formatter]="name" />
        </g>
      </svg>
      <div scChartTooltip #tooltip="scChartTooltip">
        <div scChartTooltipLabel>{{ tooltip.label() }}</div>
        @for (item of tooltip.payload(); track item.dataKey) {
          <div scChartTooltipItem [item]="item">
            <span scChartTooltipIndicator></span>
            <span scChartTooltipName>{{ item.name }}</span>
            <span scChartTooltipValue>{{ item.value | number }}</span>
          </div>
        }
      </div>
    </div>
  `,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class LabelSunburstChartDemo {
  readonly data = [
    { region: 'europe', country: 'France', sales: 240 },
    { region: 'europe', country: 'Germany', sales: 190 },
    { region: 'americas', country: 'USA', sales: 320 },
    { region: 'americas', country: 'Brazil', sales: 130 },
    { region: 'asia', country: 'Japan', sales: 210 },
  ];
  readonly config: ScChartConfig = {
    sales: { label: 'Sales' },
    europe: { label: 'Europe', color: 'var(--chart-1)' },
    americas: { label: 'Americas', color: 'var(--chart-2)' },
    asia: { label: 'Asia', color: 'var(--chart-3)' },
  };
  readonly name = (_: number, country: string) => country;
}

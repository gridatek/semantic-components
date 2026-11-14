import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  ScChartCategoryAxis,
  type ScChartConfig,
  ScChartCursor,
  ScChartGrid,
  ScChartLine,
  ScChartPlot,
  ScChartTooltip,
  ScChartTooltipIndicator,
  ScChartTooltipItem,
  ScChartTooltipName,
  ScChartTooltipPortal,
  ScChartTooltipProvider,
  ScChartTooltipValue,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-line-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartGrid,
    ScChartCategoryAxis,
    ScChartCursor,
    ScChartLine,
    ScChartTooltip,
    ScChartTooltipPortal,
    ScChartTooltipProvider,
    DecimalPipe,
    ScChartTooltipIndicator,
    ScChartTooltipItem,
    ScChartTooltipName,
    ScChartTooltipValue,
  ],
  template: `
    <div scChart [config]="config" [data]="data">
      <svg
        scChartPlot
        categoryKey="month"
        aria-label="Desktop visitors, January to June"
      >
        <g scChartGrid />
        <g scChartCategoryAxis [tickFormatter]="short" />
        <g scChartCursor />
        <g scChartLine key="desktop" dots />
      </svg>
      <div scChartTooltipProvider>
        <ng-template scChartTooltipPortal>
          <div scChartTooltip #tooltip="scChartTooltip">
            @for (item of tooltip.payload(); track item.dataKey) {
              <div scChartTooltipItem [item]="item">
                <span scChartTooltipIndicator></span>
                <span scChartTooltipName>{{ item.name }}</span>
                <span scChartTooltipValue>{{ item.value | number }}</span>
              </div>
            }
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class LineChartDemo {
  readonly data = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 },
  ];
  readonly config: ScChartConfig = {
    desktop: { label: 'Desktop', color: 'var(--chart-1)' },
    mobile: { label: 'Mobile', color: 'var(--chart-2)' },
  };
  /** January → Jan. */
  readonly short = (month: string) => month.slice(0, 3);
}

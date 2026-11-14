import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  ScChartCategoryAxis,
  type ScChartConfig,
  ScChartCursor,
  ScChartGrid,
  ScChartLabels,
  ScChartLine,
  ScChartPlot,
  ScChartTooltip,
  ScChartTooltipIndicator,
  ScChartTooltipItem,
  ScChartTooltipLabel,
  ScChartTooltipName,
  ScChartTooltipPortal,
  ScChartTooltipProvider,
  ScChartTooltipValue,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-label-line-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartGrid,
    ScChartCategoryAxis,
    ScChartCursor,
    ScChartLine,
    ScChartLabels,
    ScChartTooltip,
    ScChartTooltipPortal,
    ScChartTooltipProvider,
    DecimalPipe,
    ScChartTooltipLabel,
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
        [margin]="{ top: 24 }"
        aria-label="Desktop visitors, January to June"
      >
        <g scChartGrid />
        <g scChartCategoryAxis [tickFormatter]="short" />
        <g scChartCursor />
        <g scChartLine key="desktop" dots>
          <g scChartLabels [offset]="12" />
        </g>
      </svg>
      <div scChartTooltipProvider>
        <ng-template scChartTooltipPortal>
          <div scChartTooltip #tooltip="scChartTooltip">
            <div scChartTooltipLabel>{{ tooltip.label() }}</div>
            @for (item of tooltip.payload(); track item.dataKey) {
              <div scChartTooltipItem [item]="item">
                <span scChartTooltipIndicator variant="line"></span>
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
export class LabelLineChartDemo {
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

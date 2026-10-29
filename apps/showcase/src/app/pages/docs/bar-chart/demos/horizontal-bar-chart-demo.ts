import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  ScChartBar,
  ScChartCategoryAxis,
  type ScChartConfig,
  ScChartCursor,
  ScChartPlot,
  ScChartTooltip,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-horizontal-bar-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartCategoryAxis,
    ScChartCursor,
    ScChartBar,
    ScChartTooltip,
  ],
  template: `
    <div scChart [config]="config" [data]="data">
      <svg
        scChartPlot
        categoryKey="month"
        layout="vertical"
        aria-label="Desktop visitors, January to June"
      >
        <g scChartCategoryAxis [tickFormatter]="short" [width]="32" />
        <g scChartCursor />
        <g scChartBar key="desktop" [radius]="5" />
      </svg>
      <div scChartTooltip hideLabel></div>
    </div>
  `,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class HorizontalBarChartDemo {
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

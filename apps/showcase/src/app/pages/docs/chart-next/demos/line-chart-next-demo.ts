import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChartNext,
  type ScChartNextConfig,
  ScChartNextCursor,
  ScChartNextGrid,
  ScChartNextLine,
  ScChartNextPlot,
  ScChartNextTooltip,
  ScChartNextXAxis,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-line-chart-next-demo',
  imports: [
    ScChartNext,
    ScChartNextPlot,
    ScChartNextGrid,
    ScChartNextXAxis,
    ScChartNextCursor,
    ScChartNextLine,
    ScChartNextTooltip,
  ],
  template: `
    <div scChartNext [config]="config" [data]="data">
      <svg
        scChartNextPlot
        categoryKey="month"
        aria-label="Desktop visitors, January to June"
      >
        <g scChartNextGrid />
        <g scChartNextXAxis [tickFormatter]="short" />
        <g scChartNextCursor />
        <g scChartNextLine key="desktop" dots />
      </svg>
      <div scChartNextTooltip hideLabel></div>
    </div>
  `,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class LineChartNextDemo {
  readonly data = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 },
  ];
  readonly config: ScChartNextConfig = {
    desktop: { label: 'Desktop', color: 'var(--chart-1)' },
    mobile: { label: 'Mobile', color: 'var(--chart-2)' },
  };
  /** January → Jan. */
  readonly short = (month: string) => month.slice(0, 3);
}

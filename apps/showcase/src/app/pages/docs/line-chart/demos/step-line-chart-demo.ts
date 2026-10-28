import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  type ScChartConfig,
  ScChartCursor,
  ScChartGrid,
  ScChartLine,
  ScChartPlot,
  ScChartTooltip,
  ScChartXAxis,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-step-line-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartGrid,
    ScChartXAxis,
    ScChartCursor,
    ScChartLine,
    ScChartTooltip,
  ],
  template: `
    <div scChart [config]="config" [data]="data">
      <svg
        scChartPlot
        categoryKey="month"
        aria-label="Desktop visitors, January to June"
      >
        <g scChartGrid />
        <g scChartXAxis [tickFormatter]="short" />
        <g scChartCursor />
        <g scChartLine key="desktop" curve="step" />
      </svg>
      <div scChartTooltip hideLabel></div>
    </div>
  `,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class StepLineChartDemo {
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

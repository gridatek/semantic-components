import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChartNext,
  type ScChartNextConfig,
  ScChartNextCursor,
  ScChartNextGrid,
  ScChartNextLegend,
  ScChartNextLine,
  ScChartNextPlot,
  ScChartNextTooltip,
  ScChartNextXAxis,
  ScChartNextYAxis,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-multiple-line-chart-next-demo',
  imports: [
    ScChartNext,
    ScChartNextPlot,
    ScChartNextGrid,
    ScChartNextXAxis,
    ScChartNextYAxis,
    ScChartNextCursor,
    ScChartNextLine,
    ScChartNextTooltip,
    ScChartNextLegend,
  ],
  template: `
    <div scChartNext [config]="config" [data]="data">
      <svg
        scChartNextPlot
        categoryKey="month"
        aria-label="Visitors by device, January to June"
      >
        <g scChartNextGrid />
        <g scChartNextXAxis [tickFormatter]="short" />
        <g scChartNextYAxis />
        <g scChartNextCursor />
        <g scChartNextLine key="desktop" curve="monotone" />
        <g scChartNextLine key="mobile" curve="monotone" />
      </svg>
      <div scChartNextTooltip indicator="line"></div>
      <div scChartNextLegend></div>
    </div>
  `,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleLineChartNextDemo {
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

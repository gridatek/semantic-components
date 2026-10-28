import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChartNext,
  ScChartNextArea,
  type ScChartNextConfig,
  ScChartNextCursor,
  ScChartNextGrid,
  ScChartNextLegend,
  ScChartNextPlot,
  ScChartNextTooltip,
  ScChartNextXAxis,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-stacked-area-chart-next-demo',
  imports: [
    ScChartNext,
    ScChartNextPlot,
    ScChartNextGrid,
    ScChartNextXAxis,
    ScChartNextCursor,
    ScChartNextArea,
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
        <defs>
          <linearGradient id="fill-desktop" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stop-color="var(--color-desktop)"
              stop-opacity="0.8"
            />
            <stop
              offset="95%"
              stop-color="var(--color-desktop)"
              stop-opacity="0.1"
            />
          </linearGradient>
          <linearGradient id="fill-mobile" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stop-color="var(--color-mobile)"
              stop-opacity="0.8"
            />
            <stop
              offset="95%"
              stop-color="var(--color-mobile)"
              stop-opacity="0.1"
            />
          </linearGradient>
        </defs>
        <g scChartNextGrid />
        <g scChartNextXAxis [tickFormatter]="short" />
        <g scChartNextCursor />
        <g
          scChartNextArea
          key="mobile"
          stack="a"
          fill="url(#fill-mobile)"
          [fillOpacity]="1"
        />
        <g
          scChartNextArea
          key="desktop"
          stack="a"
          fill="url(#fill-desktop)"
          [fillOpacity]="1"
        />
      </svg>
      <div scChartNextTooltip></div>
      <div scChartNextLegend></div>
    </div>
  `,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class StackedAreaChartNextDemo {
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

import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChartNext,
  ScChartNextArea,
  type ScChartNextConfig,
  ScChartNextCursor,
  ScChartNextGrid,
  ScChartNextPlot,
  ScChartNextTooltip,
  ScChartNextXAxis,
  ScChartNextYAxis,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-expanded-area-chart-next-demo',
  imports: [
    ScChartNext,
    ScChartNextPlot,
    ScChartNextGrid,
    ScChartNextXAxis,
    ScChartNextYAxis,
    ScChartNextCursor,
    ScChartNextArea,
    ScChartNextTooltip,
  ],
  template: `
    <div scChartNext [config]="config" [data]="data">
      <svg
        scChartNextPlot
        categoryKey="month"
        stackOffset="expand"
        aria-label="Share of visitors by device, January to June"
      >
        <g scChartNextGrid />
        <g scChartNextXAxis [tickFormatter]="short" />
        <g scChartNextYAxis [tickFormatter]="percent" />
        <g scChartNextCursor />
        <g scChartNextArea key="mobile" stack="a" curve="linear" />
        <g scChartNextArea key="desktop" stack="a" curve="linear" />
      </svg>
      <div scChartNextTooltip></div>
    </div>
  `,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class ExpandedAreaChartNextDemo {
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
  /** 0.5 → 50%. */
  readonly percent = (share: number) => Math.round(share * 100) + '%';
}

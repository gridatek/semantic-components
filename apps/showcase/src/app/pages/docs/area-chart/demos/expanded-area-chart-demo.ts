import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  ScChartArea,
  ScChartCategoryAxis,
  type ScChartConfig,
  ScChartCursor,
  ScChartGrid,
  ScChartPlot,
  ScChartTooltip,
  ScChartValueAxis,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-expanded-area-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartGrid,
    ScChartCategoryAxis,
    ScChartValueAxis,
    ScChartCursor,
    ScChartArea,
    ScChartTooltip,
  ],
  template: `
    <div scChart [config]="config" [data]="data">
      <svg
        scChartPlot
        categoryKey="month"
        stackOffset="expand"
        aria-label="Share of visitors by device, January to June"
      >
        <g scChartGrid />
        <g scChartCategoryAxis [tickFormatter]="short" />
        <g scChartValueAxis [tickFormatter]="percent" />
        <g scChartCursor />
        <g scChartArea key="mobile" stack="a" curve="linear" />
        <g scChartArea key="desktop" stack="a" curve="linear" />
      </svg>
      <div scChartTooltip></div>
    </div>
  `,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class ExpandedAreaChartDemo {
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
  /** 0.5 → 50%. */
  readonly percent = (share: number) => Math.round(share * 100) + '%';
}

import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  type ScChartConfig,
  ScChartPlot,
  ScChartPolarAngleAxis,
  ScChartPolarGrid,
  ScChartRadar,
  ScChartTooltip,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-lines-radar-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartPolarGrid,
    ScChartPolarAngleAxis,
    ScChartRadar,
    ScChartTooltip,
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
        categoryKey="month"
        aria-label="Visitors by device, January to June"
      >
        <g scChartPolarGrid shape="circle" />
        <g scChartPolarAngleAxis [tickFormatter]="short" />
        <g scChartRadar key="desktop" stroke [fillOpacity]="0" />
        <g scChartRadar key="mobile" stroke [fillOpacity]="0" />
      </svg>
      <div scChartTooltip indicator="line"></div>
    </div>
  `,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class LinesRadarChartDemo {
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

import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MultipleRadarChartDemo } from './multiple-radar-chart-demo';

@Component({
  selector: 'app-multiple-radar-chart-demo-container',
  imports: [DemoContainer, MultipleRadarChartDemo],
  template: `
    <app-demo-container
      title="Radar, two series"
      demoUrl="/demos/radar-chart/multiple-radar-chart-demo"
      [code]="code"
    >
      <app-multiple-radar-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleRadarChartDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  type ScChartConfig,
  ScChartLegend,
  ScChartPlot,
  ScChartPolarAngleAxis,
  ScChartPolarGrid,
  ScChartRadar,
  ScChartTooltip,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-multiple-radar-chart-demo',
  imports: [ScChart, ScChartPlot, ScChartPolarGrid, ScChartPolarAngleAxis, ScChartRadar, ScChartTooltip, ScChartLegend],
  template: \`
    <div scChart class="mx-auto aspect-square max-h-72" [config]="config" [data]="data">
      <svg scChartPlot categoryKey="month" aria-label="Visitors by device, January to June">
        <g scChartPolarGrid />
        <g scChartPolarAngleAxis [tickFormatter]="short" />
        <g scChartRadar key="desktop" [fillOpacity]="0.6" />
        <g scChartRadar key="mobile" [fillOpacity]="0.6" />
      </svg>
      <div scChartTooltip indicator="line"></div>
      <div scChartLegend></div>
    </div>
  \`,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleRadarChartDemo {
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
}`;
}

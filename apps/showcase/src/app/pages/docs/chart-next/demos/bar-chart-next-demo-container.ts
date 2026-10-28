import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BarChartNextDemo } from './bar-chart-next-demo';

@Component({
  selector: 'app-bar-chart-next-demo-container',
  imports: [DemoContainer, BarChartNextDemo],
  template: `
    <app-demo-container
      title="Bar"
      demoUrl="/demos/chart-next/bar-chart-next-demo"
      [code]="code"
    >
      <app-bar-chart-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BarChartNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChartNext,
  ScChartNextBar,
  type ScChartNextConfig,
  ScChartNextCursor,
  ScChartNextGrid,
  ScChartNextPlot,
  ScChartNextTooltip,
  ScChartNextXAxis,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-bar-chart-next-demo',
  imports: [ScChartNext, ScChartNextPlot, ScChartNextGrid, ScChartNextXAxis, ScChartNextCursor, ScChartNextBar, ScChartNextTooltip],
  template: \`
    <div scChartNext [config]="config" [data]="data">
      <svg scChartNextPlot categoryKey="month" aria-label="Desktop visitors, January to June">
        <g scChartNextGrid />
        <g scChartNextXAxis [tickFormatter]="short" />
        <g scChartNextCursor />
        <g scChartNextBar key="desktop" [radius]="8" />
      </svg>
      <div scChartNextTooltip hideLabel></div>
    </div>
  \`,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class BarChartNextDemo {
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
}`;
}

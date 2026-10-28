import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AreaChartNextDemo } from './area-chart-next-demo';

@Component({
  selector: 'app-area-chart-next-demo-container',
  imports: [DemoContainer, AreaChartNextDemo],
  template: `
    <app-demo-container
      title="Area"
      demoUrl="/demos/chart-next/area-chart-next-demo"
      [code]="code"
    >
      <app-area-chart-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AreaChartNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChartNext,
  ScChartNextArea,
  type ScChartNextConfig,
  ScChartNextCursor,
  ScChartNextGrid,
  ScChartNextPlot,
  ScChartNextTooltip,
  ScChartNextXAxis,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-area-chart-next-demo',
  imports: [ScChartNext, ScChartNextPlot, ScChartNextGrid, ScChartNextXAxis, ScChartNextCursor, ScChartNextArea, ScChartNextTooltip],
  template: \`
    <div scChartNext [config]="config" [data]="data">
      <svg scChartNextPlot categoryKey="month" aria-label="Desktop visitors, January to June">
        <g scChartNextGrid />
        <g scChartNextXAxis [tickFormatter]="short" />
        <g scChartNextCursor />
        <g scChartNextArea key="desktop" />
      </svg>
      <div scChartNextTooltip indicator="line"></div>
    </div>
  \`,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class AreaChartNextDemo {
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

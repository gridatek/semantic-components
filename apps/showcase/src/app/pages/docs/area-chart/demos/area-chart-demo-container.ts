import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AreaChartDemo } from './area-chart-demo';

@Component({
  selector: 'app-area-chart-demo-container',
  imports: [DemoContainer, AreaChartDemo],
  template: `
    <app-demo-container
      title="Area"
      demoUrl="/demos/area-chart/area-chart-demo"
      [code]="code"
    >
      <app-area-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AreaChartDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  ScChartArea,
  type ScChartConfig,
  ScChartCursor,
  ScChartGrid,
  ScChartPlot,
  ScChartTooltip,
  ScChartXAxis,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-area-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartGrid,
    ScChartXAxis,
    ScChartCursor,
    ScChartArea,
    ScChartTooltip,
  ],
  template: \`
    <div scChart [config]="config" [data]="data">
      <svg
        scChartPlot
        categoryKey="month"
        aria-label="Desktop visitors, January to June"
      >
        <g scChartGrid />
        <g scChartXAxis [tickFormatter]="short" />
        <g scChartCursor />
        <g scChartArea key="desktop" />
      </svg>
      <div scChartTooltip indicator="line"></div>
    </div>
  \`,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class AreaChartDemo {
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

import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MultipleLineChartDemo } from './multiple-line-chart-demo';

@Component({
  selector: 'app-multiple-line-chart-demo-container',
  imports: [DemoContainer, MultipleLineChartDemo],
  template: `
    <app-demo-container
      title="Line, two series"
      demoUrl="/demos/line-chart/multiple-line-chart-demo"
      [code]="code"
    >
      <app-multiple-line-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleLineChartDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  type ScChartConfig,
  ScChartCursor,
  ScChartGrid,
  ScChartLegend,
  ScChartLine,
  ScChartPlot,
  ScChartTooltip,
  ScChartXAxis,
  ScChartYAxis,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-multiple-line-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartGrid,
    ScChartXAxis,
    ScChartYAxis,
    ScChartCursor,
    ScChartLine,
    ScChartTooltip,
    ScChartLegend,
  ],
  template: \`
    <div scChart [config]="config" [data]="data">
      <svg
        scChartPlot
        categoryKey="month"
        aria-label="Visitors by device, January to June"
      >
        <g scChartGrid />
        <g scChartXAxis [tickFormatter]="short" />
        <g scChartYAxis />
        <g scChartCursor />
        <g scChartLine key="desktop" curve="monotone" />
        <g scChartLine key="mobile" curve="monotone" />
      </svg>
      <div scChartTooltip indicator="line"></div>
      <div scChartLegend></div>
    </div>
  \`,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleLineChartDemo {
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

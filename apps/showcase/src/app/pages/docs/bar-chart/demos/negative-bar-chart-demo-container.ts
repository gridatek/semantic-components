import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NegativeBarChartDemo } from './negative-bar-chart-demo';

@Component({
  selector: 'app-negative-bar-chart-demo-container',
  imports: [DemoContainer, NegativeBarChartDemo],
  template: `
    <app-demo-container
      title="Bar, negative values"
      demoUrl="/demos/bar-chart/negative-bar-chart-demo"
      [code]="code"
    >
      <app-negative-bar-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class NegativeBarChartDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  ScChartBar,
  type ScChartConfig,
  ScChartCursor,
  ScChartGrid,
  ScChartPlot,
  ScChartTooltip,
  ScChartXAxis,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-negative-bar-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartGrid,
    ScChartXAxis,
    ScChartCursor,
    ScChartBar,
    ScChartTooltip,
  ],
  template: \`
    <div scChart [config]="config" [data]="data">
      <svg
        scChartPlot
        categoryKey="month"
        aria-label="Change in visitors, January to June"
      >
        <g scChartGrid />
        <g scChartXAxis [tickFormatter]="short" />
        <g scChartCursor />
        <g scChartBar key="change" />
      </svg>
      <div scChartTooltip hideIndicator></div>
    </div>
  \`,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class NegativeBarChartDemo {
  readonly data = [
    { month: 'January', change: 186 },
    { month: 'February', change: 205 },
    { month: 'March', change: -207 },
    { month: 'April', change: 173 },
    { month: 'May', change: -209 },
    { month: 'June', change: 214 },
  ];
  readonly config: ScChartConfig = {
    change: { label: 'Change', color: 'var(--chart-1)' },
  };
  /** January → Jan. */
  readonly short = (month: string) => month.slice(0, 3);
}`;
}

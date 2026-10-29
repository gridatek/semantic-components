import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomLabelBarChartDemo } from './custom-label-bar-chart-demo';

@Component({
  selector: 'app-custom-label-bar-chart-demo-container',
  imports: [DemoContainer, CustomLabelBarChartDemo],
  template: `
    <app-demo-container
      title="Horizontal, its name inside"
      demoUrl="/demos/bar-chart/custom-label-bar-chart-demo"
      [code]="code"
    >
      <app-custom-label-bar-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomLabelBarChartDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  ScChartBar,
  type ScChartConfig,
  ScChartCursor,
  ScChartLabels,
  ScChartPlot,
  ScChartTooltip,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-custom-label-bar-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartCursor,
    ScChartBar,
    ScChartLabels,
    ScChartTooltip,
  ],
  template: \`
    <div scChart [config]="config" [data]="data">
      <svg
        scChartPlot
        categoryKey="month"
        layout="vertical"
        [margin]="{ right: 40 }"
        aria-label="Desktop visitors, January to June"
      >
        <g scChartCursor />
        <g scChartBar key="desktop" [radius]="4">
          <g scChartLabels position="start" [formatter]="name" />
          <g scChartLabels />
        </g>
      </svg>
      <div scChartTooltip hideLabel></div>
    </div>
  \`,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomLabelBarChartDemo {
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
  /** The month's name, in its bar. */
  readonly name = (_: number, month: string) => month;
}`;
}

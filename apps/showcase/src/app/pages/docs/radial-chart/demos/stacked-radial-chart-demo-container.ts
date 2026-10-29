import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StackedRadialChartDemo } from './stacked-radial-chart-demo';

@Component({
  selector: 'app-stacked-radial-chart-demo-container',
  imports: [DemoContainer, StackedRadialChartDemo],
  template: `
    <app-demo-container
      title="Stacked, on a half circle"
      demoUrl="/demos/radial-chart/stacked-radial-chart-demo"
      [code]="code"
    >
      <app-stacked-radial-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StackedRadialChartDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  ScChartCenter,
  type ScChartConfig,
  ScChartPlot,
  ScChartRadialBar,
  ScChartTooltip,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-stacked-radial-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartRadialBar,
    ScChartCenter,
    ScChartTooltip,
  ],
  template: \`
    <div
      scChart
      class="mx-auto aspect-square max-h-64"
      [config]="config"
      [data]="data"
    >
      <svg
        scChartPlot
        categoryKey="month"
        [startAngle]="-90"
        [endAngle]="90"
        aria-label="Visitors in January, by device"
      >
        <g
          scChartRadialBar
          key="desktop"
          stack="a"
          [innerRadius]="0.75"
          [cornerRadius]="5"
        />
        <g
          scChartRadialBar
          key="mobile"
          stack="a"
          [innerRadius]="0.75"
          [cornerRadius]="5"
        />
        <g scChartCenter>
          <text
            text-anchor="middle"
            dy="-1.2em"
            class="fill-foreground text-2xl font-bold"
          >
            {{ total }}
          </text>
          <text text-anchor="middle" dy="0.2em" class="fill-muted-foreground">
            Visitors
          </text>
        </g>
      </svg>
      <div scChartTooltip hideLabel></div>
    </div>
  \`,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class StackedRadialChartDemo {
  readonly data = [{ month: 'January', desktop: 1260, mobile: 570 }];
  readonly config: ScChartConfig = {
    desktop: { label: 'Desktop', color: 'var(--chart-1)' },
    mobile: { label: 'Mobile', color: 'var(--chart-2)' },
  };
  readonly total = this.data[0].desktop + this.data[0].mobile;
}`;
}

import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LabelPieChartDemo } from './label-pie-chart-demo';

@Component({
  selector: 'app-label-pie-chart-demo-container',
  imports: [DemoContainer, LabelPieChartDemo],
  template: `
    <app-demo-container
      title="With labels"
      demoUrl="/demos/pie-chart/label-pie-chart-demo"
      [code]="code"
    >
      <app-label-pie-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LabelPieChartDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  type ScChartConfig,
  ScChartLabels,
  ScChartPie,
  ScChartPlot,
  ScChartTooltip,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-label-pie-chart-demo',
  imports: [ScChart, ScChartPlot, ScChartPie, ScChartLabels, ScChartTooltip],
  template: \`
    <div
      scChart
      class="mx-auto aspect-square max-h-72"
      [config]="config"
      [data]="data"
    >
      <svg
        scChartPlot
        categoryKey="browser"
        [margin]="{ top: 24, right: 40, bottom: 24, left: 40 }"
        aria-label="Visitors by browser"
      >
        <g scChartPie key="visitors">
          <g scChartLabels position="outside" [offset]="12" />
        </g>
      </svg>
      <div scChartTooltip hideLabel></div>
    </div>
  \`,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class LabelPieChartDemo {
  readonly data = [
    { browser: 'chrome', visitors: 275 },
    { browser: 'safari', visitors: 200 },
    { browser: 'firefox', visitors: 187 },
    { browser: 'edge', visitors: 173 },
    { browser: 'other', visitors: 90 },
  ];
  readonly config: ScChartConfig = {
    visitors: { label: 'Visitors' },
    chrome: { label: 'Chrome', color: 'var(--chart-1)' },
    safari: { label: 'Safari', color: 'var(--chart-2)' },
    firefox: { label: 'Firefox', color: 'var(--chart-3)' },
    edge: { label: 'Edge', color: 'var(--chart-4)' },
    other: { label: 'Other', color: 'var(--chart-5)' },
  };
}`;
}

import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TreemapChartDemo } from './treemap-chart-demo';

@Component({
  selector: 'app-treemap-chart-demo-container',
  imports: [DemoContainer, TreemapChartDemo],
  template: `
    <app-demo-container
      title="Treemap"
      demoUrl="/demos/treemap-chart/treemap-chart-demo"
      [code]="code"
    >
      <app-treemap-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TreemapChartDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  type ScChartConfig,
  ScChartLabels,
  ScChartPlot,
  ScChartTooltip,
} from '@semantic-components/ui/charts';
import { ScChartTreemap } from '@semantic-components/ui/charts/treemap';

@Component({
  selector: 'app-treemap-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartTreemap,
    ScChartLabels,
    ScChartTooltip,
  ],
  template: \`
    <div scChart class="aspect-video max-h-72" [config]="config" [data]="data">
      <svg scChartPlot categoryKey="browser" aria-label="Visitors by browser">
        <g scChartTreemap key="visitors">
          <g
            scChartLabels
            position="start"
            class="fill-background"
            [formatter]="name"
          />
        </g>
      </svg>
      <div scChartTooltip hideLabel></div>
    </div>
  \`,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class TreemapChartDemo {
  readonly data = [
    { browser: 'chrome', visitors: 275 },
    { browser: 'safari', visitors: 200 },
    { browser: 'firefox', visitors: 187 },
    { browser: 'edge', visitors: 173 },
  ];
  readonly config: ScChartConfig = {
    visitors: { label: 'Visitors' },
    chrome: { label: 'Chrome', color: 'var(--chart-2)' },
    safari: { label: 'Safari', color: 'var(--chart-3)' },
    firefox: { label: 'Firefox', color: 'var(--chart-4)' },
    edge: { label: 'Edge', color: 'var(--chart-5)' },
  };
  readonly name = (_: number, browser: string) =>
    this.config[browser]?.label ?? browser;
}`;
}

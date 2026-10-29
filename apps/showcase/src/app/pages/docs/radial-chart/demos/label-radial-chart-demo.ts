import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  type ScChartConfig,
  ScChartLabels,
  ScChartPlot,
  ScChartRadialBar,
  ScChartTooltip,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-label-radial-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartRadialBar,
    ScChartLabels,
    ScChartTooltip,
  ],
  template: `
    <div
      scChart
      class="mx-auto aspect-square max-h-72"
      [config]="config"
      [data]="data"
    >
      <svg scChartPlot categoryKey="browser" aria-label="Visitors by browser">
        <g scChartRadialBar key="visitors" colorBy="category" track>
          <g
            scChartLabels
            position="start"
            class="fill-white capitalize mix-blend-difference"
            [formatter]="name"
          />
        </g>
      </svg>
      <div scChartTooltip hideLabel></div>
    </div>
  `,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class LabelRadialChartDemo {
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
  /** The browser's name, at its ring's start. */
  readonly name = (_: number, browser: string) => browser;
}

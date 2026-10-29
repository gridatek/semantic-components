import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SunburstChartDemo } from './sunburst-chart-demo';

@Component({
  selector: 'app-sunburst-chart-demo-container',
  imports: [DemoContainer, SunburstChartDemo],
  template: `
    <app-demo-container
      title="Sunburst"
      demoUrl="/demos/sunburst-chart/sunburst-chart-demo"
      [code]="code"
    >
      <app-sunburst-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SunburstChartDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  type ScChartConfig,
  ScChartLegend,
  ScChartPlot,
  ScChartSunburst,
  ScChartTooltip,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-sunburst-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartSunburst,
    ScChartTooltip,
    ScChartLegend,
  ],
  template: \`
    <div
      scChart
      class="mx-auto aspect-square max-h-72"
      [config]="config"
      [data]="data"
    >
      <svg
        scChartPlot
        categoryKey="country"
        aria-label="Sales by region and country"
      >
        <g scChartSunburst key="sales" groupKey="region" />
      </svg>
      <div scChartTooltip></div>
      <div scChartLegend></div>
    </div>
  \`,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class SunburstChartDemo {
  readonly data = [
    { region: 'europe', country: 'France', sales: 240 },
    { region: 'europe', country: 'Germany', sales: 190 },
    { region: 'europe', country: 'Spain', sales: 110 },
    { region: 'americas', country: 'USA', sales: 320 },
    { region: 'americas', country: 'Brazil', sales: 130 },
    { region: 'asia', country: 'Japan', sales: 210 },
    { region: 'asia', country: 'India', sales: 150 },
  ];
  readonly config: ScChartConfig = {
    sales: { label: 'Sales' },
    europe: { label: 'Europe', color: 'var(--chart-1)' },
    americas: { label: 'Americas', color: 'var(--chart-2)' },
    asia: { label: 'Asia', color: 'var(--chart-3)' },
  };
}`;
}

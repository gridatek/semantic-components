import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ScatterChartDemo } from './scatter-chart-demo';

@Component({
  selector: 'app-scatter-chart-demo-container',
  imports: [DemoContainer, ScatterChartDemo],
  template: `
    <app-demo-container
      title="Scatter"
      demoUrl="/demos/scatter-chart/scatter-chart-demo"
      [code]="code"
    >
      <app-scatter-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ScatterChartDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  ScChartCategoryAxis,
  type ScChartConfig,
  ScChartGrid,
  ScChartPlot,
  ScChartScatter,
  ScChartTooltip,
  ScChartValueAxis,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-scatter-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartGrid,
    ScChartCategoryAxis,
    ScChartValueAxis,
    ScChartScatter,
    ScChartTooltip,
  ],
  template: \`
    <div scChart class="aspect-video max-h-72" [config]="config" [data]="data">
      <svg
        scChartPlot
        categoryKey="name"
        aria-label="Height and weight of 12 people"
      >
        <g scChartGrid [vertical]="true" />
        <g scChartCategoryAxis />
        <g scChartValueAxis />
        <g scChartScatter key="weight" xKey="height" />
      </svg>
      <div scChartTooltip></div>
    </div>
  \`,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class ScatterChartDemo {
  readonly data = [
    { name: 'Ana', height: 158, weight: 52 },
    { name: 'Ben', height: 183, weight: 81 },
    { name: 'Chloé', height: 165, weight: 60 },
    { name: 'Dev', height: 176, weight: 74 },
    { name: 'Emi', height: 162, weight: 55 },
    { name: 'Farid', height: 189, weight: 90 },
    { name: 'Gus', height: 171, weight: 68 },
    { name: 'Hana', height: 168, weight: 63 },
    { name: 'Ivo', height: 179, weight: 85 },
    { name: 'Jo', height: 155, weight: 49 },
    { name: 'Kai', height: 185, weight: 77 },
    { name: 'Lea', height: 173, weight: 66 },
  ];
  readonly config: ScChartConfig = {
    height: { label: 'Height (cm)' },
    weight: { label: 'Weight (kg)', color: 'var(--chart-1)' },
  };
}`;
}

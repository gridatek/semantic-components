import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StackedPieChartDemo } from './stacked-pie-chart-demo';

@Component({
  selector: 'app-stacked-pie-chart-demo-container',
  imports: [DemoContainer, StackedPieChartDemo],
  template: `
    <app-demo-container
      title="Rings, two series"
      demoUrl="/demos/pie-chart/stacked-pie-chart-demo"
      [code]="code"
    >
      <app-stacked-pie-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StackedPieChartDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  type ScChartConfig,
  ScChartPie,
  ScChartPlot,
  ScChartTooltip,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-stacked-pie-chart-demo',
  imports: [ScChart, ScChartPlot, ScChartPie, ScChartTooltip],
  template: \`
    <div
      scChart
      class="mx-auto aspect-square max-h-72"
      [config]="config"
      [data]="data"
    >
      <svg
        scChartPlot
        categoryKey="month"
        aria-label="Visitors by month, desktop inside, mobile outside"
      >
        <g scChartPie key="desktop" [outerRadius]="0.6" />
        <g scChartPie key="mobile" [innerRadius]="0.7" />
      </svg>
      <div scChartTooltip></div>
    </div>
  \`,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class StackedPieChartDemo {
  readonly data = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 },
  ];
  readonly config: ScChartConfig = {
    desktop: { label: 'Desktop' },
    mobile: { label: 'Mobile' },
    January: { label: 'January', color: 'var(--chart-1)' },
    February: { label: 'February', color: 'var(--chart-2)' },
    March: { label: 'March', color: 'var(--chart-3)' },
    April: { label: 'April', color: 'var(--chart-4)' },
    May: { label: 'May', color: 'var(--chart-5)' },
    June: { label: 'June', color: 'var(--chart-1)' },
  };
}`;
}

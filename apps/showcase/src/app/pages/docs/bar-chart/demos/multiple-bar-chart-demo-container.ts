import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MultipleBarChartDemo } from './multiple-bar-chart-demo';

@Component({
  selector: 'app-multiple-bar-chart-demo-container',
  imports: [DemoContainer, MultipleBarChartDemo],
  template: `
    <app-demo-container
      title="Bar, two series"
      demoUrl="/demos/bar-chart/multiple-bar-chart-demo"
      [code]="code"
    >
      <app-multiple-bar-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleBarChartDemoContainer {
  readonly code = `import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  ScChartBar,
  ScChartCategoryAxis,
  type ScChartConfig,
  ScChartCursor,
  ScChartGrid,
  ScChartLegend,
  ScChartLegendIndicator,
  ScChartLegendItem,
  ScChartPlot,
  ScChartTooltip,
  ScChartTooltipIndicator,
  ScChartTooltipItem,
  ScChartTooltipLabel,
  ScChartTooltipName,
  ScChartTooltipValue,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-multiple-bar-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartGrid,
    ScChartCategoryAxis,
    ScChartCursor,
    ScChartBar,
    ScChartTooltip,
    ScChartLegend,
    DecimalPipe,
    ScChartTooltipLabel,
    ScChartTooltipIndicator,
    ScChartTooltipItem,
    ScChartTooltipName,
    ScChartTooltipValue,
    ScChartLegendItem,
    ScChartLegendIndicator,
  ],
  template: \`
    <div scChart [config]="config" [data]="data">
      <svg
        scChartPlot
        categoryKey="month"
        aria-label="Visitors by device, January to June"
      >
        <g scChartGrid />
        <g scChartCategoryAxis [tickFormatter]="short" />
        <g scChartCursor />
        <g scChartBar key="desktop" />
        <g scChartBar key="mobile" />
      </svg>
      <div scChartTooltip #tooltip="scChartTooltip">
        <div scChartTooltipLabel>{{ tooltip.label() }}</div>
        @for (item of tooltip.payload(); track item.dataKey) {
          <div scChartTooltipItem [item]="item">
            <span scChartTooltipIndicator variant="dashed"></span>
            <span scChartTooltipName>{{ item.name }}</span>
            <span scChartTooltipValue>{{ item.value | number }}</span>
          </div>
        }
      </div>
      <div scChartLegend #legend="scChartLegend">
        @for (item of legend.payload(); track item.dataKey) {
          <div scChartLegendItem [item]="item">
            <span scChartLegendIndicator></span>
            {{ item.name }}
          </div>
        }
      </div>
    </div>
  \`,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleBarChartDemo {
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

import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MultipleLineChartDemo } from './multiple-line-chart-demo';

@Component({
  selector: 'app-multiple-line-chart-demo-container',
  imports: [DemoContainer, MultipleLineChartDemo],
  template: `
    <app-demo-container
      title="Line, two series"
      demoUrl="/demos/line-chart/multiple-line-chart-demo"
      [code]="code"
    >
      <app-multiple-line-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleLineChartDemoContainer {
  readonly code = `import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  ScChartCategoryAxis,
  type ScChartConfig,
  ScChartCursor,
  ScChartGrid,
  ScChartLegend,
  ScChartLegendIndicator,
  ScChartLegendItem,
  ScChartLine,
  ScChartPlot,
  ScChartTooltip,
  ScChartTooltipIndicator,
  ScChartTooltipItem,
  ScChartTooltipLabel,
  ScChartTooltipName,
  ScChartTooltipPortal,
  ScChartTooltipProvider,
  ScChartTooltipValue,
  ScChartValueAxis,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-multiple-line-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartGrid,
    ScChartCategoryAxis,
    ScChartValueAxis,
    ScChartCursor,
    ScChartLine,
    ScChartTooltip,
    ScChartTooltipPortal,
    ScChartTooltipProvider,
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
        <g scChartValueAxis />
        <g scChartCursor />
        <g scChartLine key="desktop" curve="monotone" />
        <g scChartLine key="mobile" curve="monotone" />
      </svg>
      <div scChartTooltipProvider>
        <ng-template scChartTooltipPortal>
          <div scChartTooltip #tooltip="scChartTooltip">
            <div scChartTooltipLabel>{{ tooltip.label() }}</div>
            @for (item of tooltip.payload(); track item.dataKey) {
              <div scChartTooltipItem [item]="item">
                <span scChartTooltipIndicator variant="line"></span>
                <span scChartTooltipName>{{ item.name }}</span>
                <span scChartTooltipValue>{{ item.value | number }}</span>
              </div>
            }
          </div>
        </ng-template>
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
export class MultipleLineChartDemo {
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

import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StackedAreaChartDemo } from './stacked-area-chart-demo';

@Component({
  selector: 'app-stacked-area-chart-demo-container',
  imports: [DemoContainer, StackedAreaChartDemo],
  template: `
    <app-demo-container
      title="Area, stacked, with a gradient"
      demoUrl="/demos/area-chart/stacked-area-chart-demo"
      [code]="code"
    >
      <app-stacked-area-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StackedAreaChartDemoContainer {
  readonly code = `import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  ScChartArea,
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
  ScChartTooltipPortal,
  ScChartTooltipProvider,
  ScChartTooltipValue,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-stacked-area-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartGrid,
    ScChartCategoryAxis,
    ScChartCursor,
    ScChartArea,
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
        <defs>
          <linearGradient id="fill-desktop" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stop-color="var(--color-desktop)"
              stop-opacity="0.8"
            />
            <stop
              offset="95%"
              stop-color="var(--color-desktop)"
              stop-opacity="0.1"
            />
          </linearGradient>
          <linearGradient id="fill-mobile" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stop-color="var(--color-mobile)"
              stop-opacity="0.8"
            />
            <stop
              offset="95%"
              stop-color="var(--color-mobile)"
              stop-opacity="0.1"
            />
          </linearGradient>
        </defs>
        <g scChartGrid />
        <g scChartCategoryAxis [tickFormatter]="short" />
        <g scChartCursor />
        <g
          scChartArea
          key="mobile"
          stack="a"
          fill="url(#fill-mobile)"
          [fillOpacity]="1"
        />
        <g
          scChartArea
          key="desktop"
          stack="a"
          fill="url(#fill-desktop)"
          [fillOpacity]="1"
        />
      </svg>
      <div scChartTooltipProvider>
        <ng-template scChartTooltipPortal>
          <div scChartTooltip #tooltip="scChartTooltip">
            <div scChartTooltipLabel>{{ tooltip.label() }}</div>
            @for (item of tooltip.payload(); track item.dataKey) {
              <div scChartTooltipItem [item]="item">
                <span scChartTooltipIndicator></span>
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
export class StackedAreaChartDemo {
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

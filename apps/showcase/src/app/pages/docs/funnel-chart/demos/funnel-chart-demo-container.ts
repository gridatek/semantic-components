import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FunnelChartDemo } from './funnel-chart-demo';

@Component({
  selector: 'app-funnel-chart-demo-container',
  imports: [DemoContainer, FunnelChartDemo],
  template: `
    <app-demo-container
      title="Funnel"
      demoUrl="/demos/funnel-chart/funnel-chart-demo"
      [code]="code"
    >
      <app-funnel-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FunnelChartDemoContainer {
  readonly code = `import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  type ScChartConfig,
  ScChartFunnel,
  ScChartLabels,
  ScChartLegend,
  ScChartLegendIndicator,
  ScChartLegendItem,
  ScChartPlot,
  ScChartTooltip,
  ScChartTooltipIndicator,
  ScChartTooltipItem,
  ScChartTooltipName,
  ScChartTooltipPortal,
  ScChartTooltipProvider,
  ScChartTooltipValue,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-funnel-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartFunnel,
    ScChartLabels,
    ScChartTooltip,
    ScChartTooltipPortal,
    ScChartTooltipProvider,
    ScChartLegend,
    DecimalPipe,
    ScChartTooltipIndicator,
    ScChartTooltipItem,
    ScChartTooltipName,
    ScChartTooltipValue,
    ScChartLegendItem,
    ScChartLegendIndicator,
  ],
  template: \`
    <div
      scChart
      class="mx-auto aspect-video max-h-72"
      [config]="config"
      [data]="data"
    >
      <svg
        scChartPlot
        categoryKey="stage"
        aria-label="Visitors at each step to a purchase"
      >
        <g scChartFunnel key="visitors">
          <g scChartLabels position="inside" class="fill-background" />
        </g>
      </svg>
      <div scChartTooltipProvider>
        <ng-template scChartTooltipPortal>
          <div scChartTooltip #tooltip="scChartTooltip">
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
      <div scChartLegend #legend="scChartLegend" class="flex-wrap">
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
export class FunnelChartDemo {
  readonly data = [
    { stage: 'visit', visitors: 1200 },
    { stage: 'signup', visitors: 860 },
    { stage: 'trial', visitors: 540 },
    { stage: 'paid', visitors: 280 },
  ];
  readonly config: ScChartConfig = {
    visitors: { label: 'Visitors' },
    visit: { label: 'Visit', color: 'var(--chart-2)' },
    signup: { label: 'Sign up', color: 'var(--chart-3)' },
    trial: { label: 'Trial', color: 'var(--chart-4)' },
    paid: { label: 'Paid', color: 'var(--chart-5)' },
  };
}`;
}

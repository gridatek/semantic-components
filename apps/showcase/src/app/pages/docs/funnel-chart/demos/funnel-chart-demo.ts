import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  type ScChartConfig,
  ScChartFunnel,
  ScChartLabels,
  ScChartLegend,
  ScChartPlot,
  ScChartTooltip,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-funnel-chart-demo',
  imports: [
    ScChart,
    ScChartPlot,
    ScChartFunnel,
    ScChartLabels,
    ScChartTooltip,
    ScChartLegend,
  ],
  template: `
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
      <div scChartTooltip hideLabel></div>
      <div scChartLegend class="flex-wrap"></div>
    </div>
  `,
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
}

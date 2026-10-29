import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LabelFunnelChartDemo } from './label-funnel-chart-demo';

@Component({
  selector: 'app-label-funnel-chart-demo-container',
  imports: [DemoContainer, LabelFunnelChartDemo],
  template: `
    <app-demo-container
      title="Labels"
      demoUrl="/demos/funnel-chart/label-funnel-chart-demo"
      [code]="code"
    >
      <app-label-funnel-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LabelFunnelChartDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  type ScChartConfig,
  ScChartFunnel,
  ScChartLabels,
  ScChartPlot,
  ScChartTooltip,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-label-funnel-chart-demo',
  imports: [ScChart, ScChartPlot, ScChartFunnel, ScChartLabels, ScChartTooltip],
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
        [margin]="{ top: 8, right: 80, bottom: 8, left: 80 }"
        aria-label="Visitors at each step to a purchase"
      >
        <g scChartFunnel key="visitors" [gap]="4">
          <g
            scChartLabels
            position="inside"
            class="fill-background"
            [formatter]="name"
          />
          <g scChartLabels position="outside" />
        </g>
      </svg>
      <div scChartTooltip hideLabel></div>
    </div>
  \`,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class LabelFunnelChartDemo {
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
  readonly name = (_: number, stage: string) =>
    this.config[stage]?.label ?? stage;
}`;
}

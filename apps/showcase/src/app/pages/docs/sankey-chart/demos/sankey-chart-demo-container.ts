import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SankeyChartDemo } from './sankey-chart-demo';

@Component({
  selector: 'app-sankey-chart-demo-container',
  imports: [DemoContainer, SankeyChartDemo],
  template: `
    <app-demo-container
      title="Sankey"
      demoUrl="/demos/sankey-chart/sankey-chart-demo"
      [code]="code"
    >
      <app-sankey-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SankeyChartDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  type ScChartConfig,
  ScChartPlot,
  ScChartSankey,
  ScChartTooltip,
} from '@semantic-components/ui/charts';

@Component({
  selector: 'app-sankey-chart-demo',
  imports: [ScChart, ScChartPlot, ScChartSankey, ScChartTooltip],
  template: \`
    <div scChart class="aspect-video max-h-80" [config]="config" [data]="data">
      <svg
        scChartPlot
        categoryKey="flow"
        aria-label="Where visitors come from and where they go"
      >
        <g scChartSankey key="visitors" />
      </svg>
      <div scChartTooltip></div>
    </div>
  \`,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class SankeyChartDemo {
  readonly data = [
    {
      flow: 'Search → Pricing',
      source: 'search',
      target: 'pricing',
      visitors: 420,
    },
    { flow: 'Search → Docs', source: 'search', target: 'docs', visitors: 310 },
    {
      flow: 'Social → Pricing',
      source: 'social',
      target: 'pricing',
      visitors: 180,
    },
    { flow: 'Social → Docs', source: 'social', target: 'docs', visitors: 90 },
    {
      flow: 'Direct → Pricing',
      source: 'direct',
      target: 'pricing',
      visitors: 150,
    },
    {
      flow: 'Pricing → Sign up',
      source: 'pricing',
      target: 'signup',
      visitors: 380,
    },
    {
      flow: 'Pricing → Left',
      source: 'pricing',
      target: 'left',
      visitors: 370,
    },
    { flow: 'Docs → Sign up', source: 'docs', target: 'signup', visitors: 160 },
    { flow: 'Docs → Left', source: 'docs', target: 'left', visitors: 240 },
  ];
  readonly config: ScChartConfig = {
    visitors: { label: 'Visitors' },
    search: { label: 'Search', color: 'var(--chart-1)' },
    social: { label: 'Social', color: 'var(--chart-2)' },
    direct: { label: 'Direct', color: 'var(--chart-3)' },
    pricing: { label: 'Pricing', color: 'var(--chart-4)' },
    docs: { label: 'Docs', color: 'var(--chart-5)' },
    signup: { label: 'Sign up', color: 'var(--chart-1)' },
    left: { label: 'Left', color: 'var(--chart-3)' },
  };
}`;
}

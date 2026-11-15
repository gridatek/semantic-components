import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlSankeyChartDemo } from './rtl-sankey-chart-demo';

@Component({
  selector: 'app-rtl-sankey-chart-demo-container',
  imports: [DemoContainer, RtlSankeyChartDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/sankey-chart/rtl-sankey-chart-demo"
      [code]="code"
    >
      <app-rtl-sankey-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSankeyChartDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  type ScChartConfig,
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
import { ScChartSankey } from '@semantic-components/ui/charts/sankey';

/** In a right-to-left page: the text, the tooltip and the legend in Arabic, right to left; the chart itself reads the same both ways, so it is not mirrored. */
@Component({
  selector: 'app-rtl-sankey-chart-demo',
  imports: [
    Dir,
    ScChart,
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
    ScChartSankey,
  ],
  template: \`
    <div
      dir="rtl"
      lang="ar"
      scChart
      class="aspect-video max-h-80"
      [config]="config"
      [data]="data"
    >
      <svg
        scChartPlot
        categoryKey="flow"
        aria-label="من أين يأتي الزوار وإلى أين يذهبون"
      >
        <g scChartSankey key="visitors" />
      </svg>
      <div scChartTooltipProvider>
        <ng-template scChartTooltipPortal>
          <div scChartTooltip #tooltip="scChartTooltip">
            @for (item of tooltip.payload(); track item.dataKey) {
              <div scChartTooltipItem [item]="item">
                <span scChartTooltipIndicator></span>
                <span scChartTooltipName>{{ item.name }}</span>
                <span scChartTooltipValue>{{ format(item.value) }}</span>
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
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSankeyChartDemo {
  readonly data = [
    {
      flow: 'البحث ← الأسعار',
      source: 'search',
      target: 'pricing',
      visitors: 420,
    },
    {
      flow: 'البحث ← التوثيق',
      source: 'search',
      target: 'docs',
      visitors: 310,
    },
    {
      flow: 'التواصل الاجتماعي ← الأسعار',
      source: 'social',
      target: 'pricing',
      visitors: 180,
    },
    {
      flow: 'التواصل الاجتماعي ← التوثيق',
      source: 'social',
      target: 'docs',
      visitors: 90,
    },
    {
      flow: 'مباشر ← الأسعار',
      source: 'direct',
      target: 'pricing',
      visitors: 150,
    },
    {
      flow: 'الأسعار ← التسجيل',
      source: 'pricing',
      target: 'signup',
      visitors: 380,
    },
    {
      flow: 'الأسعار ← غادر',
      source: 'pricing',
      target: 'left',
      visitors: 370,
    },
    {
      flow: 'التوثيق ← التسجيل',
      source: 'docs',
      target: 'signup',
      visitors: 160,
    },
    { flow: 'التوثيق ← غادر', source: 'docs', target: 'left', visitors: 240 },
  ];
  readonly config: ScChartConfig = {
    visitors: { label: 'الزوار' },
    search: { label: 'البحث', color: 'var(--chart-1)' },
    social: { label: 'التواصل الاجتماعي', color: 'var(--chart-2)' },
    direct: { label: 'مباشر', color: 'var(--chart-3)' },
    pricing: { label: 'الأسعار', color: 'var(--chart-4)' },
    docs: { label: 'التوثيق', color: 'var(--chart-5)' },
    signup: { label: 'التسجيل', color: 'var(--chart-1)' },
    left: { label: 'غادر', color: 'var(--chart-3)' },
  };
  private readonly numbers = new Intl.NumberFormat('ar');

  /** A value in the locale's digits. */
  private format(value: unknown): string {
    return this.numbers.format(Number(value));
  }
}`;
}

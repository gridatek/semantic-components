import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlFunnelChartDemo } from './rtl-funnel-chart-demo';

@Component({
  selector: 'app-rtl-funnel-chart-demo-container',
  imports: [DemoContainer, RtlFunnelChartDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/funnel-chart/rtl-funnel-chart-demo"
      [code]="code"
    >
      <app-rtl-funnel-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlFunnelChartDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  type ScChartConfig,
  ScChartFunnel,
  ScChartLabels,
  ScChartPlot,
  ScChartTooltip,
  ScChartTooltipIndicator,
  ScChartTooltipItem,
  ScChartTooltipName,
  ScChartTooltipPortal,
  ScChartTooltipProvider,
  ScChartTooltipValue,
} from '@semantic-components/ui/charts';

/** In a right-to-left page: the text, the tooltip and the legend in Arabic, right to left; the app following the direction (charts.followDirection), it is mirrored — symmetric, so only its arrows; ← to the next. */
@Component({
  selector: 'app-rtl-funnel-chart-demo',
  imports: [
    Dir,
    ScChart,
    ScChartFunnel,
    ScChartLabels,
    ScChartPlot,
    ScChartTooltip,
    ScChartTooltipIndicator,
    ScChartTooltipItem,
    ScChartTooltipName,
    ScChartTooltipPortal,
    ScChartTooltipProvider,
    ScChartTooltipValue,
  ],
  template: \`
    <div
      dir="rtl"
      lang="ar"
      scChart
      class="mx-auto aspect-video max-h-72"
      [config]="config"
      [data]="data"
    >
      <svg
        scChartPlot
        categoryKey="stage"
        aria-label="الزوار في كل خطوة حتى الشراء"
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
                <span scChartTooltipValue>{{ format(item.value) }}</span>
              </div>
            }
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlFunnelChartDemo {
  private readonly data = [
    { stage: 'visit', visitors: 1200 },
    { stage: 'signup', visitors: 860 },
    { stage: 'trial', visitors: 540 },
    { stage: 'paid', visitors: 280 },
  ];
  private readonly config: ScChartConfig = {
    visitors: { label: 'الزوار' },
    visit: { label: 'زيارة', color: 'var(--chart-2)' },
    signup: { label: 'تسجيل', color: 'var(--chart-3)' },
    trial: { label: 'تجربة', color: 'var(--chart-4)' },
    paid: { label: 'اشتراك مدفوع', color: 'var(--chart-5)' },
  };
  private readonly numbers = new Intl.NumberFormat('ar');

  /** A value in the locale's digits. */
  private format(value: unknown): string {
    return this.numbers.format(Number(value));
  }
}`;
}

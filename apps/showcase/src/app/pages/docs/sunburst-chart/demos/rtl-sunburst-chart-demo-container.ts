import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlSunburstChartDemo } from './rtl-sunburst-chart-demo';

@Component({
  selector: 'app-rtl-sunburst-chart-demo-container',
  imports: [DemoContainer, RtlSunburstChartDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/sunburst-chart/rtl-sunburst-chart-demo"
      [code]="code"
    >
      <app-rtl-sunburst-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSunburstChartDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  type ScChartConfig,
  ScChartLegend,
  ScChartLegendIndicator,
  ScChartLegendItem,
  ScChartPlot,
  ScChartSunburst,
  ScChartTooltip,
  ScChartTooltipIndicator,
  ScChartTooltipItem,
  ScChartTooltipName,
  ScChartTooltipPortal,
  ScChartTooltipProvider,
  ScChartTooltipValue,
} from '@semantic-components/ui/charts';

/** In a right-to-left page: the text, the tooltip and the legend in Arabic, right to left; the chart itself reads the same both ways, so it is not mirrored. */
@Component({
  selector: 'app-rtl-sunburst-chart-demo',
  imports: [
    Dir,
    ScChart,
    ScChartLegend,
    ScChartLegendIndicator,
    ScChartLegendItem,
    ScChartPlot,
    ScChartSunburst,
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
      class="mx-auto aspect-square max-h-72"
      [config]="config"
      [data]="data"
    >
      <svg
        scChartPlot
        categoryKey="country"
        aria-label="المبيعات حسب المنطقة والبلد"
      >
        <g scChartSunburst key="sales" groupKey="region" />
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
export class RtlSunburstChartDemo {
  readonly data = [
    { region: 'europe', country: 'فرنسا', sales: 240 },
    { region: 'europe', country: 'ألمانيا', sales: 190 },
    { region: 'europe', country: 'إسبانيا', sales: 110 },
    { region: 'americas', country: 'الولايات المتحدة', sales: 320 },
    { region: 'americas', country: 'البرازيل', sales: 130 },
    { region: 'asia', country: 'اليابان', sales: 210 },
    { region: 'asia', country: 'الهند', sales: 150 },
  ];
  readonly config: ScChartConfig = {
    sales: { label: 'المبيعات' },
    europe: { label: 'أوروبا', color: 'var(--chart-1)' },
    americas: { label: 'الأمريكتان', color: 'var(--chart-2)' },
    asia: { label: 'آسيا', color: 'var(--chart-3)' },
  };
  private readonly numbers = new Intl.NumberFormat('ar');

  /** A value in the locale's digits. */
  private format(value: unknown): string {
    return this.numbers.format(Number(value));
  }
}`;
}

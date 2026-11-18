import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlLineChartDemo } from './rtl-line-chart-demo';

@Component({
  selector: 'app-rtl-line-chart-demo-container',
  imports: [DemoContainer, RtlLineChartDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/line-chart/rtl-line-chart-demo"
      [code]="code"
    >
      <app-rtl-line-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlLineChartDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
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

/** In a right-to-left page, the app following the direction: the lines run from the right, the values on the right; the arrows mirrored. */
@Component({
  selector: 'app-rtl-line-chart-demo',
  imports: [
    Dir,
    ScChart,
    ScChartCategoryAxis,
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
  ],
  template: \`
    <div dir="rtl" lang="ar" scChart [config]="config" [data]="data">
      <svg
        scChartPlot
        categoryKey="month"
        aria-label="الزوار حسب الجهاز، من يناير إلى يونيو"
      >
        <g scChartGrid />
        <g scChartCategoryAxis />
        <g scChartValueAxis />
        <g scChartCursor />
        <g scChartLine key="desktop" dots />
        <g scChartLine key="mobile" dots />
      </svg>
      <div scChartTooltipProvider>
        <ng-template scChartTooltipPortal>
          <div scChartTooltip #tooltip="scChartTooltip">
            <div scChartTooltipLabel>{{ tooltip.label() }}</div>
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
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlLineChartDemo {
  private readonly data = [
    { month: 'يناير', desktop: 186, mobile: 80 },
    { month: 'فبراير', desktop: 305, mobile: 200 },
    { month: 'مارس', desktop: 237, mobile: 120 },
    { month: 'أبريل', desktop: 73, mobile: 190 },
    { month: 'مايو', desktop: 209, mobile: 130 },
    { month: 'يونيو', desktop: 214, mobile: 140 },
  ];
  private readonly config: ScChartConfig = {
    desktop: { label: 'سطح المكتب', color: 'var(--chart-1)' },
    mobile: { label: 'الجوال', color: 'var(--chart-2)' },
  };
  private readonly numbers = new Intl.NumberFormat('ar');

  /** A value in Arabic digits. */
  private format(value: unknown): string {
    return this.numbers.format(Number(value));
  }
}`;
}

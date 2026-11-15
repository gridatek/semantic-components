import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlBarChartDemo } from './rtl-bar-chart-demo';

@Component({
  selector: 'app-rtl-bar-chart-demo-container',
  imports: [DemoContainer, RtlBarChartDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/bar-chart/rtl-bar-chart-demo"
      [code]="code"
    >
      <app-rtl-bar-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlBarChartDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  ScChartBar,
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
  ScChartValueAxis,
} from '@semantic-components/ui/charts';

/** In a right-to-left page, the app following the direction: the months from the right, the values on the right; the arrows mirrored, the tooltip and legend in Arabic. */
@Component({
  selector: 'app-rtl-bar-chart-demo',
  imports: [
    Dir,
    ScChart,
    ScChartBar,
    ScChartCategoryAxis,
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
        <g scChartBar key="desktop" />
        <g scChartBar key="mobile" />
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
export class RtlBarChartDemo {
  readonly data = [
    { month: 'يناير', desktop: 186, mobile: 80 },
    { month: 'فبراير', desktop: 305, mobile: 200 },
    { month: 'مارس', desktop: 237, mobile: 120 },
    { month: 'أبريل', desktop: 73, mobile: 190 },
    { month: 'مايو', desktop: 209, mobile: 130 },
    { month: 'يونيو', desktop: 214, mobile: 140 },
  ];
  readonly config: ScChartConfig = {
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

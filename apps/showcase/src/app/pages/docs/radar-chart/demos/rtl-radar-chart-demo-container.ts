import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlRadarChartDemo } from './rtl-radar-chart-demo';

@Component({
  selector: 'app-rtl-radar-chart-demo-container',
  imports: [DemoContainer, RtlRadarChartDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/radar-chart/rtl-radar-chart-demo"
      [code]="code"
    >
      <app-rtl-radar-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlRadarChartDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  type ScChartConfig,
  ScChartPlot,
  ScChartPolarAngleAxis,
  ScChartPolarGrid,
  ScChartRadar,
  ScChartTooltip,
  ScChartTooltipIndicator,
  ScChartTooltipItem,
  ScChartTooltipLabel,
  ScChartTooltipName,
  ScChartTooltipPortal,
  ScChartTooltipProvider,
  ScChartTooltipValue,
} from '@semantic-components/ui/charts';

/** In a right-to-left page: the text, the tooltip and the legend in Arabic, right to left; the app following the direction (charts.followDirection), it is mirrored — its spokes counterclockwise from the top; ← to the next. */
@Component({
  selector: 'app-rtl-radar-chart-demo',
  imports: [
    Dir,
    ScChart,
    ScChartPlot,
    ScChartPolarAngleAxis,
    ScChartPolarGrid,
    ScChartRadar,
    ScChartTooltip,
    ScChartTooltipIndicator,
    ScChartTooltipItem,
    ScChartTooltipLabel,
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
        categoryKey="month"
        aria-label="زوار سطح المكتب، من يناير إلى يونيو"
      >
        <g scChartPolarGrid />
        <g scChartPolarAngleAxis />
        <g scChartRadar key="desktop" dots />
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
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlRadarChartDemo {
  private readonly data = [
    { month: 'يناير', desktop: 186 },
    { month: 'فبراير', desktop: 305 },
    { month: 'مارس', desktop: 237 },
    { month: 'أبريل', desktop: 73 },
    { month: 'مايو', desktop: 209 },
    { month: 'يونيو', desktop: 214 },
  ];
  private readonly config: ScChartConfig = {
    desktop: { label: 'سطح المكتب', color: 'var(--chart-1)' },
  };
  private readonly numbers = new Intl.NumberFormat('ar');

  /** A value in the locale's digits. */
  private format(value: unknown): string {
    return this.numbers.format(Number(value));
  }
}`;
}

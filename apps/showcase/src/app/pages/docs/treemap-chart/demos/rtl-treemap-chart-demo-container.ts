import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlTreemapChartDemo } from './rtl-treemap-chart-demo';

@Component({
  selector: 'app-rtl-treemap-chart-demo-container',
  imports: [DemoContainer, RtlTreemapChartDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/treemap-chart/rtl-treemap-chart-demo"
      [code]="code"
    >
      <app-rtl-treemap-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTreemapChartDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScChart,
  type ScChartConfig,
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
import { ScChartTreemap } from '@semantic-components/ui/charts/treemap';

/** In a right-to-left page: the text, the tooltip and the legend in Arabic, right to left; the chart itself reads the same both ways, so it is not mirrored. */
@Component({
  selector: 'app-rtl-treemap-chart-demo',
  imports: [
    Dir,
    ScChart,
    ScChartLabels,
    ScChartPlot,
    ScChartTooltip,
    ScChartTooltipIndicator,
    ScChartTooltipItem,
    ScChartTooltipName,
    ScChartTooltipPortal,
    ScChartTooltipProvider,
    ScChartTooltipValue,
    ScChartTreemap,
  ],
  template: \`
    <div
      dir="rtl"
      lang="ar"
      scChart
      class="aspect-video max-h-72"
      [config]="config"
      [data]="data"
    >
      <svg scChartPlot categoryKey="browser" aria-label="الزوار حسب المتصفح">
        <g scChartTreemap key="visitors">
          <g
            scChartLabels
            position="start"
            class="fill-background"
            [formatter]="name"
          />
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
export class RtlTreemapChartDemo {
  readonly data = [
    { browser: 'chrome', visitors: 275 },
    { browser: 'safari', visitors: 200 },
    { browser: 'firefox', visitors: 187 },
    { browser: 'edge', visitors: 173 },
    { browser: 'other', visitors: 90 },
  ];
  readonly config: ScChartConfig = {
    visitors: { label: 'الزوار' },
    chrome: { label: 'Chrome', color: 'var(--chart-1)' },
    safari: { label: 'Safari', color: 'var(--chart-2)' },
    firefox: { label: 'Firefox', color: 'var(--chart-3)' },
    edge: { label: 'Edge', color: 'var(--chart-4)' },
    other: { label: 'أخرى', color: 'var(--chart-5)' },
  };
  /** Each box's browser, by its name. */
  private readonly name = (_: number, browser: string) =>
    this.config[browser]?.label ?? browser;
  private readonly numbers = new Intl.NumberFormat('ar');

  /** A value in the locale's digits. */
  private format(value: unknown): string {
    return this.numbers.format(Number(value));
  }
}`;
}

import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui';
import {
  ScChart,
  ScChartBar,
  ScChartCategoryAxis,
  type ScChartConfig,
  ScChartGrid,
  ScChartLegend,
  ScChartPlot,
  ScChartTooltip,
} from '@semantic-components/ui/charts';

const DATA = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];
const DESKTOP = DATA.reduce((sum, row) => sum + row.desktop, 0);
const MOBILE = DATA.reduce((sum, row) => sum + row.mobile, 0);
const DELTA = Math.round(((DESKTOP - MOBILE) / MOBILE) * 100);

/** Traffic by device: grouped bars, a legend, and the totals. */
@Component({
  selector: 'app-preview-bar-chart-card',
  imports: [
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScChart,
    ScChartBar,
    ScChartCategoryAxis,
    ScChartGrid,
    ScChartLegend,
    ScChartPlot,
    ScChartTooltip,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle class="text-lg">Traffic channels</h2>
        <p scCardDescription class="line-clamp-2 text-sm leading-snug">
          Monthly desktop and mobile traffic for the last six months—compare
          volume and mix across platforms and devices at a glance.
        </p>
      </div>
      <div scCardBody class="flex flex-col gap-4 pt-0">
        <div scChart class="h-[180px] w-full" [config]="config" [data]="data">
          <svg
            scChartPlot
            categoryKey="month"
            aria-label="Traffic by device, January to June"
            [margin]="{ left: 0, right: 0, top: 8, bottom: 0 }"
          >
            <g scChartGrid class="[&_line]:[stroke-dasharray:3_3]" />
            <g scChartCategoryAxis [tickFormatter]="short" />
            <g scChartBar key="desktop" [radius]="[6, 6, 0, 0]" />
            <g scChartBar key="mobile" [radius]="[6, 6, 0, 0]" />
          </svg>
          <div scChartTooltip indicator="dashed"></div>
          <div scChartLegend></div>
        </div>
        <dl class="divide-border/60 grid w-full grid-cols-3 divide-x">
          @for (stat of stats; track stat.label) {
            <div class="flex flex-col-reverse px-2 text-center">
              <dd class="text-sm font-medium tabular-nums">{{ stat.value }}</dd>
              <dt class="text-muted-foreground text-[0.65rem] uppercase">
                {{ stat.label }}
              </dt>
            </div>
          }
        </dl>
      </div>
      <div scCardFooter>
        <button scButton class="w-full">View report</button>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewBarChartCard {
  protected readonly data = DATA;
  protected readonly config: ScChartConfig = {
    desktop: { label: 'Desktop', color: 'var(--chart-1)' },
    mobile: { label: 'Mobile', color: 'var(--chart-2)' },
  };
  protected readonly stats = [
    { label: 'Desktop', value: DESKTOP.toLocaleString('en-US') },
    { label: 'Mobile', value: MOBILE.toLocaleString('en-US') },
    { label: 'Mix Delta', value: (DELTA > 0 ? '+' : '') + DELTA + '%' },
  ];

  protected readonly short = (month: string) => month.slice(0, 3);
}

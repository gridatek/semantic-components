import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBadge,
  ScCard,
  ScCardAction,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScProgress,
  ScProgressRange,
  ScProgressTrack,
} from '@semantic-components/ui';
import {
  ScChart,
  ScChartCenter,
  type ScChartConfig,
  ScChartLegend,
  ScChartLegendIndicator,
  ScChartLegendItem,
  ScChartPie,
  ScChartPlot,
  ScChartTooltip,
  ScChartTooltipIndicator,
  ScChartTooltipItem,
  ScChartTooltipName,
  ScChartTooltipValue,
} from '@semantic-components/ui/charts';

const DATA = [
  { browser: 'chrome', visitors: 275 },
  { browser: 'safari', visitors: 200 },
  { browser: 'firefox', visitors: 287 },
  { browser: 'edge', visitors: 173 },
];
const TOTAL = DATA.reduce((sum, row) => sum + row.visitors, 0);
const TOP = DATA.reduce((max, row) =>
  row.visitors > max.visitors ? row : max,
);

/** Browser share: a donut with its total, a legend, the leader's share. */
@Component({
  selector: 'app-preview-pie-chart-card',
  imports: [
    ScBadge,
    ScCard,
    ScCardAction,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScChart,
    ScChartCenter,
    ScChartLegend,
    DecimalPipe,
    ScChartTooltipIndicator,
    ScChartTooltipItem,
    ScChartTooltipName,
    ScChartTooltipValue,
    ScChartLegendItem,
    ScChartLegendIndicator,
    ScChartPie,
    ScChartPlot,
    ScChartTooltip,
    ScProgress,
    ScProgressRange,
    ScProgressTrack,
  ],
  template: `
    <div scCard>
      <div scCardHeader class="pb-0">
        <h2 scCardTitle>Browser Share</h2>
        <p scCardDescription>January - June 2026</p>
        <div scCardAction>
          <span scBadge variant="outline">{{ topLabel }}</span>
        </div>
      </div>
      <div scCardBody class="pt-0">
        <div
          scChart
          class="mx-auto aspect-square max-h-[190px]"
          [config]="config"
          [data]="data"
        >
          <svg
            scChartPlot
            categoryKey="browser"
            aria-label="Visitors by browser"
          >
            <g
              scChartPie
              key="visitors"
              [innerRadius]="0.55"
              [strokeWidth]="5"
            />
            <g scChartCenter>
              <text text-anchor="middle" dominant-baseline="middle">
                <tspan x="0" y="-8" class="fill-foreground text-2xl font-bold">
                  {{ total }}
                </tspan>
                <tspan x="0" y="12" class="fill-muted-foreground text-xs">
                  Visitors
                </tspan>
              </text>
            </g>
          </svg>
          <div scChartTooltip #tooltip="scChartTooltip">
            @for (item of tooltip.payload(); track item.dataKey) {
              <div scChartTooltipItem [item]="item">
                <span scChartTooltipIndicator></span>
                <span scChartTooltipName>{{ item.name }}</span>
                <span scChartTooltipValue>{{ item.value | number }}</span>
              </div>
            }
          </div>
          <div scChartLegend #legend="scChartLegend" class="translate-y-2">
            @for (item of legend.payload(); track item.dataKey) {
              <div scChartLegendItem [item]="item">
                <span scChartLegendIndicator></span>
                {{ item.name }}
              </div>
            }
          </div>
        </div>
      </div>
      <div scCardFooter class="flex-col items-stretch gap-2">
        <div class="flex items-center text-xs">
          <span class="font-medium">{{ topLabel }}</span>
          <span class="text-muted-foreground ms-auto tabular-nums">
            {{ topShare }}%
          </span>
        </div>
        <div
          scProgress
          [value]="topShare"
          [attr.aria-label]="topLabel + ' share'"
        >
          <div scProgressTrack>
            <div scProgressRange class="bg-chart-3"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewPieChartCard {
  protected readonly data = DATA;
  protected readonly config: ScChartConfig = {
    visitors: { label: 'Visitors' },
    chrome: { label: 'Chrome', color: 'var(--chart-1)' },
    safari: { label: 'Safari', color: 'var(--chart-2)' },
    firefox: { label: 'Firefox', color: 'var(--chart-3)' },
    edge: { label: 'Edge', color: 'var(--chart-4)' },
  };
  protected readonly total = TOTAL.toLocaleString('en-US');
  protected readonly topLabel = this.config[TOP.browser]?.label ?? 'Top';
  protected readonly topShare = Math.round((TOP.visitors / TOTAL) * 100);
}

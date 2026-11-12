import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCard,
  ScCardContent,
  ScCardFooter,
  ScSeparator,
} from '@semantic-components/ui';
import {
  ScChart,
  ScChartCenter,
  type ScChartConfig,
  ScChartPie,
  ScChartPlot,
  ScChartTooltip,
} from '@semantic-components/ui/charts';

/** A savings goal as a donut, its total in the middle, then the details. */
@Component({
  selector: 'app-preview-savings-progress',
  imports: [
    ScCard,
    ScCardContent,
    ScCardFooter,
    ScChart,
    ScChartCenter,
    ScChartPie,
    ScChartPlot,
    ScChartTooltip,
    ScSeparator,
  ],
  template: `
    <div scCard>
      <div scCardContent>
        <div
          scChart
          class="mx-auto aspect-square max-h-[220px]"
          [config]="config"
          [data]="data"
        >
          <svg
            scChartPlot
            categoryKey="name"
            aria-label="Savings: $24,000 of $30,000"
          >
            <g
              scChartPie
              key="value"
              [innerRadius]="70 / 95"
              [strokeWidth]="0"
            />
            <g scChartCenter>
              <text text-anchor="middle" dominant-baseline="middle">
                <tspan x="0" y="-12" class="fill-foreground text-2xl font-bold">
                  $24,000
                </tspan>
                <tspan x="0" y="12" class="fill-muted-foreground text-xs">
                  80% of $30,000
                </tspan>
              </text>
            </g>
          </svg>
          <div scChartTooltip hideLabel></div>
        </div>
      </div>
      <div scCardFooter class="flex-col gap-0">
        @for (row of details; track row.label; let last = $last) {
          <div class="flex w-full items-center justify-between py-3">
            <span class="text-muted-foreground text-sm">{{ row.label }}</span>
            <span class="text-sm font-semibold tabular-nums">{{
              row.value
            }}</span>
          </div>
          @if (!last) {
            <div scSeparator aria-hidden="true"></div>
          }
        }
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewSavingsProgress {
  protected readonly data = [
    { name: 'saved', value: 24000 },
    { name: 'remaining', value: 6000 },
  ];
  protected readonly config: ScChartConfig = {
    saved: { label: 'Saved', color: 'var(--chart-2)' },
    remaining: { label: 'Remaining', color: 'var(--chart-1)' },
  };
  protected readonly details = [
    { label: 'Projected Finish', value: 'October 2024' },
    { label: 'Monthly Average', value: '$1,250' },
    { label: 'Top Contributor', value: 'Auto-Transfer' },
  ];
}

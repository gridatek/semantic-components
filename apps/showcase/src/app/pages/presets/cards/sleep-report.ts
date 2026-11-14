import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBadge,
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
  type ScChartConfig,
  ScChartPlot,
  ScChartTooltip,
  ScChartTooltipIndicator,
  ScChartTooltipItem,
  ScChartTooltipLabel,
  ScChartTooltipName,
  ScChartTooltipValue,
} from '@semantic-components/ui/charts';

/** A night's sleep: its stages stacked by hour, then the totals. */
@Component({
  selector: 'app-preview-sleep-report',
  imports: [
    ScBadge,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScChart,
    ScChartBar,
    ScChartPlot,
    ScChartTooltip,
    DecimalPipe,
    ScChartTooltipLabel,
    ScChartTooltipIndicator,
    ScChartTooltipItem,
    ScChartTooltipName,
    ScChartTooltipValue,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Sleep Report</h2>
        <p scCardDescription>Last night · 7h 24m</p>
      </div>
      <div scCardBody class="flex flex-col gap-3">
        <div scChart class="h-32 w-full" [config]="config" [data]="data">
          <svg
            scChartPlot
            categoryKey="hour"
            aria-label="Sleep stages by hour, 10pm to 6am"
            [margin]="{ left: 0, right: 0, top: 0, bottom: 0 }"
          >
            <g scChartBar key="deep" stack="a" corners="none" [barSize]="16" />
            <g scChartBar key="light" stack="a" corners="none" [barSize]="16" />
            <g scChartBar key="rem" stack="a" corners="end" [barSize]="16" />
          </svg>
          <div scChartTooltip #tooltip="scChartTooltip">
            <div scChartTooltipLabel>{{ tooltip.label() }}</div>
            @for (item of tooltip.payload(); track item.dataKey) {
              <div scChartTooltipItem [item]="item">
                <span scChartTooltipIndicator></span>
                <span scChartTooltipName>{{ item.name }}</span>
                <span scChartTooltipValue>{{ item.value | number }}</span>
              </div>
            }
          </div>
        </div>
        <dl class="grid grid-cols-4 gap-2">
          @for (stat of stats; track stat.label) {
            <div class="flex flex-col-reverse text-center">
              <dt class="text-muted-foreground text-xs">{{ stat.label }}</dt>
              <dd class="text-sm font-medium tabular-nums">{{ stat.value }}</dd>
            </div>
          }
        </dl>
      </div>
      <div scCardFooter>
        <span scBadge variant="outline">Good</span>
        <button scButton variant="outline" size="sm" class="ms-auto">
          Details
        </button>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewSleepReport {
  protected readonly data = [
    { hour: '10pm', deep: 0, light: 30, rem: 0 },
    { hour: '11pm', deep: 20, light: 10, rem: 0 },
    { hour: '12am', deep: 40, light: 0, rem: 10 },
    { hour: '1am', deep: 30, light: 5, rem: 15 },
    { hour: '2am', deep: 10, light: 20, rem: 30 },
    { hour: '3am', deep: 25, light: 10, rem: 20 },
    { hour: '4am', deep: 15, light: 25, rem: 10 },
    { hour: '5am', deep: 5, light: 35, rem: 15 },
    { hour: '6am', deep: 0, light: 20, rem: 25 },
  ];
  protected readonly config: ScChartConfig = {
    deep: { label: 'Deep', color: 'var(--chart-1)' },
    light: { label: 'Light', color: 'var(--chart-2)' },
    rem: { label: 'REM', color: 'var(--chart-3)' },
  };
  protected readonly stats = [
    { label: 'Deep', value: '2h 10m' },
    { label: 'Light', value: '3h 48m' },
    { label: 'REM', value: '1h 26m' },
    { label: 'Score', value: '84' },
  ];
}

import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScItem,
  ScItemBody,
  ScItemDescription,
} from '@semantic-components/ui';
import {
  ScChart,
  ScChartBar,
  ScChartCategoryAxis,
  type ScChartConfig,
  ScChartPlot,
  ScChartTooltip,
  ScChartTooltipIndicator,
  ScChartTooltipItem,
  ScChartTooltipName,
  ScChartTooltipPortal,
  ScChartTooltipProvider,
  ScChartTooltipValue,
} from '@semantic-components/ui/charts';

/** A bar per month, each its own colour (a chart: the preset's corners), then what comes next. */
@Component({
  selector: 'app-home-contribution-history',
  imports: [
    DecimalPipe,
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
    ScChartPlot,
    ScChartTooltip,
    ScChartTooltipPortal,
    ScChartTooltipProvider,
    ScChartTooltipIndicator,
    ScChartTooltipItem,
    ScChartTooltipName,
    ScChartTooltipValue,
    ScItem,
    ScItemBody,
    ScItemDescription,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Contribution History</h2>
        <p scCardDescription>Last 6 months of activity</p>
      </div>
      <div scCardBody>
        <div scChart class="h-[200px] w-full" [config]="config" [data]="data">
          <svg
            scChartPlot
            categoryKey="month"
            aria-label="Contributions, December to April"
            [margin]="{ left: 0, right: 0, top: 0, bottom: 0 }"
          >
            <g scChartCategoryAxis />
            <g scChartBar key="amount" colorBy="category" />
          </svg>
          <div scChartTooltipProvider>
            <ng-template scChartTooltipPortal>
              <div scChartTooltip #tooltip="scChartTooltip">
                @for (item of tooltip.payload(); track item.dataKey) {
                  <div scChartTooltipItem [item]="item">
                    <span scChartTooltipIndicator></span>
                    <span scChartTooltipName>{{ item.name }}</span>
                    <span scChartTooltipValue>{{ item.value | number }}</span>
                  </div>
                }
              </div>
            </ng-template>
          </div>
        </div>
      </div>
      <div scCardBody>
        <div class="grid w-full grid-cols-1 gap-3 xl:grid-cols-2">
          <div scItem variant="muted" class="flex-col items-stretch">
            <div scItemBody class="gap-1">
              <p
                scItemDescription
                class="text-muted-foreground text-xs font-medium tracking-wider uppercase"
              >
                Upcoming
              </p>
              <span class="text-base font-semibold">May 2024</span>
              <span class="text-muted-foreground text-sm">Scheduled</span>
            </div>
          </div>
          <div
            scItem
            variant="muted"
            class="hidden flex-col items-stretch xl:flex"
          >
            <div scItemBody class="gap-1">
              <p
                scItemDescription
                class="text-muted-foreground text-xs font-medium tracking-wider uppercase"
              >
                Savings Plan
              </p>
              <span class="text-base font-semibold">Accelerated</span>
              <span class="text-muted-foreground text-sm">Recurring</span>
            </div>
          </div>
        </div>
      </div>
      <div scCardFooter>
        <button scButton class="w-full">View Full Report</button>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HomeContributionHistory {
  protected readonly data = [
    { month: 'Dec', amount: 800 },
    { month: 'Jan', amount: 1100 },
    { month: 'Feb', amount: 900 },
    { month: 'Mar', amount: 1300 },
    { month: 'Apr', amount: 750 },
  ];
  /** A colour per month (`colorBy="category"`), each named for the tooltip. */
  protected readonly config: ScChartConfig = {
    Dec: { label: 'December', color: 'var(--chart-1)' },
    Jan: { label: 'January', color: 'var(--chart-2)' },
    Feb: { label: 'February', color: 'var(--chart-3)' },
    Mar: { label: 'March', color: 'var(--chart-4)' },
    Apr: { label: 'April', color: 'var(--chart-5)' },
  };
}

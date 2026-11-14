import { DecimalPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBadge,
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardTitle,
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

/** A card account: its balance, the payment due, a year's activity. */
@Component({
  selector: 'app-preview-card-overview',
  imports: [
    ScBadge,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardTitle,
    ScChart,
    ScChartBar,
    ScChartCategoryAxis,
    ScChartPlot,
    ScChartTooltip,
    ScChartTooltipPortal,
    ScChartTooltipProvider,
    DecimalPipe,
    ScChartTooltipIndicator,
    ScChartTooltipItem,
    ScChartTooltipName,
    ScChartTooltipValue,
  ],
  template: `
    <div class="grid grid-cols-2 gap-3">
      <div scCard>
        <div scCardBody>
          <p scCardDescription>Card Balance</p>
          <h2 scCardTitle class="text-2xl tabular-nums">US$12.94</h2>
          <p scCardDescription class="tabular-nums">US$11,337.06 Available</p>
        </div>
      </div>
      <div scCard class="flex flex-col justify-between">
        <div scCardBody class="flex flex-1 flex-col justify-between">
          <div class="flex flex-col gap-1">
            <p scCardDescription>Payment Due</p>
            <h2 scCardTitle class="text-2xl">1 Apr</h2>
          </div>
          <button scButton variant="outline" size="sm" class="mt-3 w-full">
            Pay Early
          </button>
        </div>
      </div>
      <div scCard class="col-span-2">
        <div scCardBody class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <p scCardDescription>Yearly Activity</p>
            <span scBadge variant="secondary">+US$0.25 Daily Cash</span>
          </div>
          <div scChart class="h-20 w-full" [config]="config" [data]="data">
            <svg
              scChartPlot
              categoryKey="month"
              aria-label="Activity by month"
              [margin]="{ top: 4, right: 0, bottom: 0, left: 0 }"
            >
              <g
                scChartCategoryAxis
                class="text-[10px]"
                [tickFormatter]="initial"
              />
              <g scChartBar key="amount" corners="end" />
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
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewCardOverview {
  protected readonly data = [
    { month: 'Jan', amount: 40 },
    { month: 'Feb', amount: 55 },
    { month: 'Mar', amount: 35 },
    { month: 'Apr', amount: 60 },
    { month: 'May', amount: 45 },
    { month: 'Jun', amount: 50 },
    { month: 'Jul', amount: 65 },
    { month: 'Aug', amount: 40 },
    { month: 'Sep', amount: 55 },
    { month: 'Oct', amount: 70 },
    { month: 'Nov', amount: 45 },
    { month: 'Dec', amount: 80 },
  ];
  protected readonly config: ScChartConfig = {
    amount: { label: 'Activity', color: 'var(--chart-2)' },
  };

  protected readonly initial = (month: string) => month.slice(0, 1);
}

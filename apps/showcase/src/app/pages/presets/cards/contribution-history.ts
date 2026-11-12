import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardContent,
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
} from '@semantic-components/ui/charts';

/** Six months of contributions as bars, then what comes next. */
@Component({
  selector: 'app-preview-contribution-history',
  imports: [
    ScButton,
    ScCard,
    ScCardContent,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScChart,
    ScChartBar,
    ScChartCategoryAxis,
    ScChartPlot,
    ScChartTooltip,
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
      <div scCardContent>
        <div scChart class="h-[200px] w-full" [config]="config" [data]="data">
          <svg
            scChartPlot
            categoryKey="month"
            aria-label="Contributions, December to May"
            [margin]="{ left: 0, right: 0, top: 8, bottom: 0 }"
          >
            <g scChartCategoryAxis />
            <g scChartBar key="amount" [radius]="[6, 6, 0, 0]" />
          </svg>
          <div scChartTooltip hideLabel class="min-w-40"></div>
        </div>
      </div>
      <div scCardContent>
        <div class="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
          @for (plan of plans; track plan.label) {
            <div scItem variant="muted" class="flex-col items-stretch">
              <div scItemBody class="gap-1">
                <p
                  scItemDescription
                  class="text-muted-foreground text-xs font-medium tracking-wider uppercase"
                >
                  {{ plan.label }}
                </p>
                <span class="font-heading text-lg font-semibold">{{
                  plan.value
                }}</span>
                <span class="text-muted-foreground text-sm">{{
                  plan.note
                }}</span>
              </div>
            </div>
          }
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
export class PreviewContributionHistory {
  protected readonly data = [
    { month: 'Dec', amount: 800 },
    { month: 'Jan', amount: 1100 },
    { month: 'Feb', amount: 900 },
    { month: 'Mar', amount: 1300 },
    { month: 'Apr', amount: 750 },
    { month: 'May', amount: 1400 },
  ];
  protected readonly config: ScChartConfig = {
    amount: { label: 'Contribution', color: 'var(--chart-2)' },
  };
  protected readonly plans = [
    { label: 'Upcoming', value: 'May 25, 2024', note: '$1,000 scheduled' },
    { label: 'Auto-Save Plan', value: 'Accelerated', note: 'Recurring weekly' },
  ];
}

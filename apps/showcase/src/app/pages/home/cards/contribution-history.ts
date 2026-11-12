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

/** A bar per month, then what comes next. */
@Component({
  selector: 'app-home-contribution-history',
  imports: [
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
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Contribution History</h2>
        <p scCardDescription>Last 6 months of activity</p>
      </div>
      <div scCardContent>
        <div
          class="flex h-[200px] w-full items-end gap-3"
          role="img"
          aria-label="Last 6 months of contribution activity"
        >
          @for (item of months; track item.month; let i = $index) {
            <div class="flex h-full flex-1 flex-col justify-end gap-2">
              <div
                class="min-h-2 rounded-lg"
                [style.height.%]="(item.amount / max) * 100"
                [style.background-color]="'var(--chart-' + (i + 1) + ')'"
              ></div>
              <span class="text-muted-foreground text-center text-xs">{{
                item.month
              }}</span>
            </div>
          }
        </div>
      </div>
      <div scCardContent>
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
  protected readonly months = [
    { month: 'Dec', amount: 800 },
    { month: 'Jan', amount: 1100 },
    { month: 'Feb', amount: 900 },
    { month: 'Mar', amount: 1300 },
    { month: 'Apr', amount: 750 },
  ];
  protected readonly max = Math.max(...this.months.map((m) => m.amount));
}

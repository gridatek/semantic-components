import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DashboardStatCardDemo } from './dashboard-stat-card-demo';

@Component({
  selector: 'app-dashboard-stat-card-demo-container',
  imports: [DemoContainer, DashboardStatCardDemo],
  template: `
    <app-demo-container
      title="Dashboard"
      [code]="code"
      demoUrl="/demos/stat-card/dashboard-stat-card-demo"
    >
      <app-dashboard-stat-card-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DashboardStatCardDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScCard, ScCardBody, ScNumberTicker } from '@semantic-components/ui';
import {
  SiActivityIcon,
  SiCreditCardIcon,
  SiDollarSignIcon,
  SiUsersIcon,
} from '@semantic-icons/lucide-icons';

interface Stat {
  readonly label: string;
  readonly value: number;
  readonly format: Intl.NumberFormatOptions;
  readonly change: number;
  readonly changeFormat: Intl.NumberFormatOptions;
  /** The way that is good news: up (revenue), or down (costs). */
  readonly good: 'up' | 'down';
  readonly since: string;
}

const PERCENT: Intl.NumberFormatOptions = {
  style: 'percent',
  maximumFractionDigits: 1,
  signDisplay: 'exceptZero',
};

/** Four figures in a row, each with your icon: currency, a count, a fall, a plain number. */
@Component({
  selector: 'app-dashboard-stat-card-demo',
  imports: [
    SiActivityIcon,
    SiCreditCardIcon,
    SiDollarSignIcon,
    SiUsersIcon,
    ScCard,
    ScCardBody,
    ScNumberTicker,
  ],
  template: \`
    <div class="grid grid-cols-1 w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
      @for (stat of stats; track stat.label) {
        <div scCard>
          <div scCardBody>
            <dl class="grid gap-1">
              <dt
                class="text-muted-foreground flex items-center justify-between gap-2 text-sm font-medium [&_svg]:size-4"
              >
                {{ stat.label }}
                @switch (stat.icon) {
                  @case ('dollar') {
                    <svg siDollarSignIcon></svg>
                  }
                  @case ('users') {
                    <svg siUsersIcon></svg>
                  }
                  @case ('card') {
                    <svg siCreditCardIcon></svg>
                  }
                  @case ('activity') {
                    <svg siActivityIcon></svg>
                  }
                }
              </dt>
              <dd class="text-2xl font-semibold tabular-nums">
                <span
                  scNumberTicker
                  [value]="stat.value"
                  [format]="stat.format"
                ></span>
              </dd>
              <dd
                class="flex items-center gap-1 text-xs tabular-nums"
                [class]="tone(stat)"
              >
                <span
                  scNumberTicker
                  [value]="stat.change"
                  [format]="stat.changeFormat"
                ></span>
                <span class="text-muted-foreground">{{ stat.since }}</span>
              </dd>
            </dl>
          </div>
        </div>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DashboardStatCardDemo {
  private readonly stats: readonly (Stat & {
    icon: 'dollar' | 'users' | 'card' | 'activity';
  })[] = [
    {
      label: 'Revenue',
      icon: 'dollar',
      value: 45231.89,
      format: { style: 'currency', currency: 'USD' },
      change: 0.201,
      changeFormat: PERCENT,
      good: 'up',
      since: 'from last month',
    },
    {
      label: 'Subscriptions',
      icon: 'users',
      value: 2350,
      format: {},
      change: 180,
      changeFormat: { signDisplay: 'exceptZero' },
      good: 'up',
      since: 'from last month',
    },
    {
      label: 'Sales',
      icon: 'card',
      value: 12234,
      format: {},
      change: -0.043,
      changeFormat: PERCENT,
      good: 'up',
      since: 'from last month',
    },
    {
      label: 'Active now',
      icon: 'activity',
      value: 573,
      format: {},
      change: 0,
      changeFormat: { signDisplay: 'exceptZero' },
      good: 'up',
      since: 'since last hour',
    },
  ];

  /** Good news in the theme's success colour, bad in its destructive one; no change muted. */
  private tone(stat: Stat): string {
    if (stat.change === 0) return 'text-muted-foreground';
    const up = stat.change > 0;
    return up === (stat.good === 'up') ? 'text-success' : 'text-destructive';
  }
}`;
}

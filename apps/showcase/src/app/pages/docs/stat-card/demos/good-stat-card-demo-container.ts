import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GoodStatCardDemo } from './good-stat-card-demo';

@Component({
  selector: 'app-good-stat-card-demo-container',
  imports: [DemoContainer, GoodStatCardDemo],
  template: `
    <app-demo-container
      title="Good news"
      [code]="code"
      demoUrl="/demos/stat-card/good-stat-card-demo"
    >
      <app-good-stat-card-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GoodStatCardDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScCard, ScCardBody, ScNumberTicker } from '@semantic-components/ui';

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

/** Down can be good news: costs and errors falling are in the success colour — and said in words too, not only by colour. */
@Component({
  selector: 'app-good-stat-card-demo',
  imports: [ScCard, ScCardBody, ScNumberTicker],
  template: \`
    <div class="grid grid-cols-1 w-full gap-4 sm:grid-cols-2">
      @for (stat of stats; track stat.label) {
        <div scCard>
          <div scCardBody>
            <dl class="grid gap-1">
              <dt
                class="text-muted-foreground flex items-center justify-between gap-2 text-sm font-medium [&_svg]:size-4"
              >
                {{ stat.label }}
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
                <span class="sr-only">{{ verdict(stat) }}</span>
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
export class GoodStatCardDemo {
  private readonly stats: readonly Stat[] = [
    {
      label: 'Cloud costs',
      value: 1840,
      format: { style: 'currency', currency: 'USD', maximumFractionDigits: 0 },
      change: -0.12,
      changeFormat: PERCENT,
      good: 'down',
      since: 'from last month',
    },
    {
      label: 'Errors',
      value: 37,
      format: {},
      change: 0.09,
      changeFormat: PERCENT,
      good: 'down',
      since: 'from last week',
    },
  ];

  /** Good news in the theme's success colour, bad in its destructive one; no change muted. */
  private tone(stat: Stat): string {
    if (stat.change === 0) return 'text-muted-foreground';
    const up = stat.change > 0;
    return up === (stat.good === 'up') ? 'text-success' : 'text-destructive';
  }

  /** The good or bad news, in words: read after the change. */
  private verdict(stat: Stat): string {
    if (stat.change === 0) return '';
    return stat.change > 0 === (stat.good === 'up') ? '(good)' : '(bad)';
  }
}`;
}

import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlStatCardDemo } from './rtl-stat-card-demo';

@Component({
  selector: 'app-rtl-stat-card-demo-container',
  imports: [DemoContainer, RtlStatCardDemo],
  template: `
    <app-demo-container
      title="RTL"
      [code]="code"
      demoUrl="/demos/stat-card/rtl-stat-card-demo"
    >
      <app-rtl-stat-card-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlStatCardDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
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

/** In a right-to-left page: the label and change from the right, the figures written for Arabic. */
@Component({
  selector: 'app-rtl-stat-card-demo',
  imports: [Dir, ScCard, ScCardBody, ScNumberTicker],
  template: \`
    <div dir="rtl" lang="ar" class="w-full max-w-xs">
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
                <span class="text-muted-foreground">{{ stat.since }}</span>
              </dd>
            </dl>
          </div>
        </div>
      }
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlStatCardDemo {
  private readonly stats: readonly Stat[] = [
    {
      label: 'الإيرادات',
      value: 45231.89,
      format: { style: 'currency', currency: 'USD' },
      change: 0.201,
      changeFormat: PERCENT,
      good: 'up',
      since: 'عن الشهر الماضي',
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

import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScLink, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { TocHeading } from '../../../components/toc/toc-heading';
import { DashboardStatCardDemoContainer } from './demos/dashboard-stat-card-demo-container';
import { GoodStatCardDemoContainer } from './demos/good-stat-card-demo-container';
import { RtlStatCardDemoContainer } from './demos/rtl-stat-card-demo-container';
import { StatCardUsageDemoContainer } from './demos/stat-card-usage-demo-container';

@Component({
  selector: 'app-stat-card-page',
  imports: [
    Anatomy,
    RouterLink,
    ScLink,
    ScTypeset,
    StatCardUsageDemoContainer,
    DashboardStatCardDemoContainer,
    GoodStatCardDemoContainer,
    RtlStatCardDemoContainer,
    TocHeading,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Stat Card</h1>
        <p class="text-muted-foreground">
          A recipe: one figure, how it changed and whether that is good news — a
          <a scLink routerLink="/docs/components/card">Card</a> holding a
          description list, its numbers written by a
          <a scLink routerLink="/docs/components/number-ticker">Number Ticker</a
          >. No component of its own.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-stat-card-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>How it is made</h2>
        <p>
          A Card&apos;s body holds a
          <code scTypeset>dl</code>: the label is the <code scTypeset>dt</code>,
          the value and the change are <code scTypeset>dd</code>s. Each number
          is a Number Ticker, written by Intl in the locale with your format —
          currency, percent, compact — and counting to its value as the card
          appears. The change takes
          <code scTypeset>{{ signCode }}</code>
          (+20.1%, −4.3%, 0); its colour is yours, from whether the change is
          good news: up for revenue, down for costs.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            A description list: the label names the value and the change. Screen
            readers get each number&apos;s value, never the numbers on the way.
          </li>
          <li>
            The sign is read («plus 20.1 percent»); colour alone says good or
            bad — say it in words too where it matters (a sr-only «good»).
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-dashboard-stat-card-demo-container />
        <app-good-stat-card-demo-container />
        <app-rtl-stat-card-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class StatCardPage {
  private readonly signCode = "signDisplay: 'exceptZero'";

  private readonly anatomy = {
    imports:
      "import { ScCard, ScCardBody, ScNumberTicker } from '@semantic-components/ui';",
    markup: [
      '<div scCard>',
      '  <div scCardBody>',
      '    <dl>',
      '      <dt>Revenue</dt>',
      '      <dd><span scNumberTicker [value]="45231.89" [format]="{ style: \'currency\', currency: \'USD\' }"></span></dd>',
      '      <dd class="text-success">',
      '        <span scNumberTicker [value]="0.201" [format]="{ style: \'percent\', signDisplay: \'exceptZero\' }"></span>',
      '        from last month',
      '      </dd>',
      '    </dl>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };
}

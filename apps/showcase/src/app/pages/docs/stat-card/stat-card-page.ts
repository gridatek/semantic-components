import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicStatCardDemoContainer } from './demos/basic-stat-card-demo-container';
import { DashboardStatCardDemoContainer } from './demos/dashboard-stat-card-demo-container';
import { FormatsStatCardDemoContainer } from './demos/formats-stat-card-demo-container';
import { GoodStatCardDemoContainer } from './demos/good-stat-card-demo-container';
import { TextStatCardDemoContainer } from './demos/text-stat-card-demo-container';

@Component({
  selector: 'app-stat-card-page',
  imports: [
    BasicStatCardDemoContainer,
    DashboardStatCardDemoContainer,
    FormatsStatCardDemoContainer,
    GoodStatCardDemoContainer,
    TextStatCardDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Stat Card</h1>
        <p class="text-muted-foreground">
          One figure on a description list — its label, its value written by
          Intl.NumberFormat, and how it changed, coloured by whether that is
          good news.
        </p>
        <app-component-badges path="stat-card" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Basic</h2>
        <p>
          One figure on a description list: its label, its value in the app’s
          language, how it changed — signed, green for good news — and from
          when.
        </p>
        <app-basic-stat-card-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Dashboard</h2>
        <p>
          A row of cards, each with an icon at the end of its label — two
          columns, then four as there is room.
        </p>
        <app-dashboard-stat-card-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Formats</h2>
        <p>
          Any Intl.NumberFormat options — compact, a unit, a currency — in
          LOCALE_ID: provided here as German.
        </p>
        <app-formats-stat-card-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Good direction</h2>
        <p>
          When down is good news — costs, errors, wait times — say so with
          good="down": the colour follows the meaning, the sign the number.
          Unchanged is neither.
        </p>
        <app-good-stat-card-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Text value</h2>
        <p>
          Not every figure is a number: without a value, the card shows your
          text.
        </p>
        <app-text-stat-card-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class StatCardPage {}

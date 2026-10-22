import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicStatCardNextDemoContainer } from './demos/basic-stat-card-next-demo-container';
import { DashboardStatCardNextDemoContainer } from './demos/dashboard-stat-card-next-demo-container';
import { FormatsStatCardNextDemoContainer } from './demos/formats-stat-card-next-demo-container';
import { GoodStatCardNextDemoContainer } from './demos/good-stat-card-next-demo-container';
import { TextStatCardNextDemoContainer } from './demos/text-stat-card-next-demo-container';

@Component({
  selector: 'app-stat-card-next-page',
  imports: [
    BasicStatCardNextDemoContainer,
    DashboardStatCardNextDemoContainer,
    FormatsStatCardNextDemoContainer,
    GoodStatCardNextDemoContainer,
    TextStatCardNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Stat Card Next</h1>
        <p class="text-muted-foreground">
          The stat card, rebuilt: one figure on a description list — its label,
          its value written by Intl.NumberFormat, and how it changed, coloured
          by whether that is good news.
        </p>
        <app-component-badges path="stat-card-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Basic</h2>
        <p class="text-muted-foreground">
          One figure on a description list: its label, its value in the app’s
          language, how it changed — signed, green for good news — and from
          when.
        </p>
        <app-basic-stat-card-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Dashboard</h2>
        <p class="text-muted-foreground">
          A row of cards, each with an icon at the end of its label — two
          columns, then four as there is room.
        </p>
        <app-dashboard-stat-card-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Formats</h2>
        <p class="text-muted-foreground">
          Any Intl.NumberFormat options — compact, a unit, a currency — in the
          card’s locale: here, German.
        </p>
        <app-formats-stat-card-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Good direction</h2>
        <p class="text-muted-foreground">
          When down is good news — costs, errors, wait times — say so with
          good="down": the colour follows the meaning, the sign the number.
          Unchanged is neither.
        </p>
        <app-good-stat-card-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Text value</h2>
        <p class="text-muted-foreground">
          Not every figure is a number: without a value, the card shows your
          text.
        </p>
        <app-text-stat-card-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class StatCardNextPage {}

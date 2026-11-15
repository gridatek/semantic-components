import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { CardNumberTickerDemoContainer } from './demos/card-number-ticker-demo-container';
import { CountNumberTickerDemoContainer } from './demos/count-number-ticker-demo-container';
import { FormatsNumberTickerDemoContainer } from './demos/formats-number-ticker-demo-container';
import { RollNumberTickerDemoContainer } from './demos/roll-number-ticker-demo-container';
import { VisibleNumberTickerDemoContainer } from './demos/visible-number-ticker-demo-container';

@Component({
  selector: 'app-number-ticker-page',
  imports: [
    CountNumberTickerDemoContainer,
    RollNumberTickerDemoContainer,
    FormatsNumberTickerDemoContainer,
    VisibleNumberTickerDemoContainer,
    CardNumberTickerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Number Ticker</h1>
        <p class="text-muted-foreground">
          A number that moves to its new value — counting, or each digit rolling
          — written in the reader’s language. No animation library: it runs
          frame by frame, and works on an SVG text too (a chart’s total).
        </p>
        <app-component-badges path="number-ticker" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Count</h2>
        <p class="text-muted-foreground">
          The number counts to its new value, easing out. Screen readers get
          only the value; with reduced motion, it is there at once.
        </p>
        <app-count-number-ticker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Roll</h2>
        <p class="text-muted-foreground">
          effect="roll": each digit rolls to its new place, like an odometer —
          the separators and the currency stay still.
        </p>
        <app-roll-number-ticker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Formats</h2>
        <p class="text-muted-foreground">
          Any Intl.NumberFormat options, in LOCALE_ID — provided here as German:
          euros, a percent, compact.
        </p>
        <app-formats-number-ticker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>When seen</h2>
        <p class="text-muted-foreground">
          start="visible": landing-page figures that count up from zero when
          they are first scrolled into view.
        </p>
        <app-visible-number-ticker-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>In a stat card</h2>
        <p class="text-muted-foreground">
          In the stat card’s value: the figure moves to its new value as the
          data comes in.
        </p>
        <app-card-number-ticker-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class NumberTickerPage {}

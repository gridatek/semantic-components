import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { CardAnimatedCounterDemoContainer } from './demos/card-animated-counter-demo-container';
import { CountAnimatedCounterDemoContainer } from './demos/count-animated-counter-demo-container';
import { FormatsAnimatedCounterDemoContainer } from './demos/formats-animated-counter-demo-container';
import { RollAnimatedCounterDemoContainer } from './demos/roll-animated-counter-demo-container';
import { VisibleAnimatedCounterDemoContainer } from './demos/visible-animated-counter-demo-container';

@Component({
  selector: 'app-animated-counter-page',
  imports: [
    CountAnimatedCounterDemoContainer,
    RollAnimatedCounterDemoContainer,
    FormatsAnimatedCounterDemoContainer,
    VisibleAnimatedCounterDemoContainer,
    CardAnimatedCounterDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Animated Counter</h1>
        <p class="text-muted-foreground">
          A number that moves to its new value — counting, or each digit rolling
          — written in the reader’s language; from its own entry point, so the
          motion library is only needed where it is used.
        </p>
        <app-component-badges path="animated-counter" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <p class="text-muted-foreground">
          It counts with the
          <a
            href="https://motion.dev"
            target="_blank"
            rel="noopener"
            class="text-foreground underline underline-offset-4"
            >motion</a
          >
          library — an optional peer of the lab: install it where you use the
          counter.
        </p>
        <pre
          class="bg-muted overflow-x-auto rounded-md p-4 text-sm"
        ><code>npm install motion</code></pre>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <p class="text-muted-foreground">
          It has its own entry point, so motion is only loaded where it is used:
        </p>
        <pre
          class="bg-muted overflow-x-auto rounded-md p-4 text-sm"
        ><code>import {{ '{' }} ScAnimatedCounter {{ '}' }} from '&#64;semantic-components/ui-lab/animated-counter';</code></pre>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Count</h2>
        <p class="text-muted-foreground">
          The number counts to its new value, easing out. Screen readers get
          only the value; with reduced motion, it is there at once.
        </p>
        <app-count-animated-counter-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Roll</h2>
        <p class="text-muted-foreground">
          effect="roll": each digit rolls to its new place, like an odometer —
          the separators and the currency stay still.
        </p>
        <app-roll-animated-counter-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Formats</h2>
        <p class="text-muted-foreground">
          Any Intl.NumberFormat options, in the counter’s locale — here, German:
          euros, a percent, compact.
        </p>
        <app-formats-animated-counter-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>When seen</h2>
        <p class="text-muted-foreground">
          start="visible": landing-page figures that count up from zero when
          they are first scrolled into view.
        </p>
        <app-visible-animated-counter-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>In a stat card</h2>
        <p class="text-muted-foreground">
          In the stat card’s value: the figure moves to its new value as the
          data comes in.
        </p>
        <app-card-animated-counter-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class AnimatedCounterPage {}

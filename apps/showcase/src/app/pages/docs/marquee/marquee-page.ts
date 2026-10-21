import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { LogosMarqueeDemoContainer } from './demos/logos-marquee-demo-container';
import { SpeedMarqueeDemoContainer } from './demos/speed-marquee-demo-container';
import { TestimonialsMarqueeDemoContainer } from './demos/testimonials-marquee-demo-container';
import { TickerMarqueeDemoContainer } from './demos/ticker-marquee-demo-container';
import { VerticalMarqueeDemoContainer } from './demos/vertical-marquee-demo-container';

@Component({
  selector: 'app-marquee-page',
  imports: [
    LogosMarqueeDemoContainer,
    TestimonialsMarqueeDemoContainer,
    VerticalMarqueeDemoContainer,
    TickerMarqueeDemoContainer,
    SpeedMarqueeDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Marquee</h1>
        <p class="text-muted-foreground">
          Your content written once and repeated to fill, at a speed in pixels a
          second, in four directions; it waits under the pointer and with focus,
          pauses on a button, and stands still for reduced motion.
        </p>
        <app-component-badges path="marquee" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Logos</h2>
        <p class="text-muted-foreground">
          Links, written once: the copies are out of reach. It waits under the
          pointer and with focus inside — Tab into it — and the button pauses
          it.
        </p>
        <app-logos-marquee-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Testimonials</h2>
        <p class="text-muted-foreground">Two rows, going opposite ways.</p>
        <app-testimonials-marquee-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Vertical</h2>
        <p class="text-muted-foreground">
          A column, going up: give it a height.
        </p>
        <app-vertical-marquee-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Ticker</h2>
        <p class="text-muted-foreground">
          Headlines, with your separators — text is content like any other.
        </p>
        <app-ticker-marquee-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Speed</h2>
        <p class="text-muted-foreground">
          In pixels a second: short and long content move at the same pace.
        </p>
        <app-speed-marquee-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class MarqueePage {}

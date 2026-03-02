import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { GalleryMarqueeDemoContainer } from './demos/gallery-marquee-demo-container';
import { LogoMarqueeDemoContainer } from './demos/logo-marquee-demo-container';
import { PauseOnHoverMarqueeDemoContainer } from './demos/pause-on-hover-marquee-demo-container';
import { ReversedMarqueeDemoContainer } from './demos/reversed-marquee-demo-container';
import { SpeedMarqueeDemoContainer } from './demos/speed-marquee-demo-container';
import { StackedMarqueeDemoContainer } from './demos/stacked-marquee-demo-container';
import { TestimonialsMarqueeDemoContainer } from './demos/testimonials-marquee-demo-container';
import { TextMarqueeDemoContainer } from './demos/text-marquee-demo-container';
import { VerticalMarqueeDemoContainer } from './demos/vertical-marquee-demo-container';

@Component({
  selector: 'app-marquee-page',
  imports: [
    TextMarqueeDemoContainer,
    ReversedMarqueeDemoContainer,
    LogoMarqueeDemoContainer,
    TestimonialsMarqueeDemoContainer,
    VerticalMarqueeDemoContainer,
    SpeedMarqueeDemoContainer,
    PauseOnHoverMarqueeDemoContainer,
    GalleryMarqueeDemoContainer,
    StackedMarqueeDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Marquee</h1>
        <p class="text-muted-foreground">
          Scrolling content with smooth animations, multiple directions, and
          customizable speed.
        </p>
        <app-component-badges path="marquee" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-text-marquee-demo-container />
        <app-reversed-marquee-demo-container />
        <app-logo-marquee-demo-container />
        <app-testimonials-marquee-demo-container />
        <app-vertical-marquee-demo-container />
        <app-speed-marquee-demo-container />
        <app-pause-on-hover-marquee-demo-container />
        <app-gallery-marquee-demo-container />
        <app-stacked-marquee-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MarqueePage {}

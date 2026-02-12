import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { TextMarqueeDemoContainer } from './demos/text-marquee-demo-container';
import { ReversedMarqueeDemoContainer } from './demos/reversed-marquee-demo-container';
import { LogoMarqueeDemoContainer } from './demos/logo-marquee-demo-container';
import { TestimonialsMarqueeDemoContainer } from './demos/testimonials-marquee-demo-container';
import { VerticalMarqueeDemoContainer } from './demos/vertical-marquee-demo-container';
import { SpeedMarqueeDemoContainer } from './demos/speed-marquee-demo-container';
import { PauseOnHoverMarqueeDemoContainer } from './demos/pause-on-hover-marquee-demo-container';
import { GalleryMarqueeDemoContainer } from './demos/gallery-marquee-demo-container';
import { StackedMarqueeDemoContainer } from './demos/stacked-marquee-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

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
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Marquee</h1>
        <p class="text-muted-foreground">
          Scrolling content with smooth animations, multiple directions, and
          customizable speed.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
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
export default class MarqueePage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'marquee')!
    .status;
}

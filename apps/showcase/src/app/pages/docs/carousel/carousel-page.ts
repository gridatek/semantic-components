import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CardsCarouselDemoContainer } from './demos/cards-carousel-demo-container';
import { DefaultCarouselDemoContainer } from './demos/default-carousel-demo-container';
import { HalfWidthCarouselDemoContainer } from './demos/half-width-carousel-demo-container';
import { ImagesCarouselDemoContainer } from './demos/images-carousel-demo-container';
import { ThirdWidthCarouselDemoContainer } from './demos/third-width-carousel-demo-container';
import { VerticalCarouselDemoContainer } from './demos/vertical-carousel-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

@Component({
  selector: 'app-carousel-page',
  imports: [
    DefaultCarouselDemoContainer,
    CardsCarouselDemoContainer,
    ThirdWidthCarouselDemoContainer,
    HalfWidthCarouselDemoContainer,
    VerticalCarouselDemoContainer,
    ImagesCarouselDemoContainer,
    TocHeading,
    ComponentBadges,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Carousel</h1>
        <p class="text-muted-foreground">
          A carousel with motion and swipe built using CSS scroll snap.
        </p>
        <app-component-badges path="carousel" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-default-carousel-demo-container />
        <app-cards-carousel-demo-container />
        <app-third-width-carousel-demo-container />
        <app-half-width-carousel-demo-container />
        <app-vertical-carousel-demo-container />
        <app-images-carousel-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CarouselPage {}

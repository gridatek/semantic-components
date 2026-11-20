import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ApiCarouselDemoContainer } from './demos/api-carousel-demo-container';
import { CarouselUsageDemoContainer } from './demos/carousel-usage-demo-container';
import { DotsCarouselDemoContainer } from './demos/dots-carousel-demo-container';
import { ImagesCarouselDemoContainer } from './demos/images-carousel-demo-container';
import { MultipleCarouselDemoContainer } from './demos/multiple-carousel-demo-container';
import { OrientationCarouselDemoContainer } from './demos/orientation-carousel-demo-container';
import { PluginCarouselDemoContainer } from './demos/plugin-carousel-demo-container';
import { RtlCarouselDemoContainer } from './demos/rtl-carousel-demo-container';
import { SizesCarouselDemoContainer } from './demos/sizes-carousel-demo-container';
import { SpacingCarouselDemoContainer } from './demos/spacing-carousel-demo-container';

@Component({
  selector: 'app-carousel-page',
  imports: [
    ScKbd,
    PartsTable,
    Anatomy,
    EntryInstall,
    CarouselUsageDemoContainer,
    SizesCarouselDemoContainer,
    SpacingCarouselDemoContainer,
    OrientationCarouselDemoContainer,
    ApiCarouselDemoContainer,
    DotsCarouselDemoContainer,
    PluginCarouselDemoContainer,
    MultipleCarouselDemoContainer,
    ImagesCarouselDemoContainer,
    RtlCarouselDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Carousel</h1>
        <p class="text-muted-foreground">
          A slideshow with motion and swipe, built on Embla.
        </p>
        <app-component-badges path="carousel" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Installation</h2>
        <app-entry-install
          entry="carousel"
          library="embla-carousel"
          href="https://www.embla-carousel.com"
          names="ScCarousel, ScCarouselViewport, ScCarouselTrack, ScCarouselItem"
        />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-carousel-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          A region holding a viewport, its track of slides, and the previous and
          next buttons. You write the slides, the icons and every name.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The root is a region: name it (aria-label) and give it your word for
            carousel (aria-roledescription).
          </li>
          <li>
            Each slide is a group: your word for slide (aria-roledescription)
            and its place (aria-label, from index() and count(): "2 of 5").
          </li>
          <li>
            With focus inside, the arrow keys move: <kbd scKbd>←</kbd> and
            <kbd scKbd>→</kbd> (mirrored right to left), <kbd scKbd>↑</kbd> and
            <kbd scKbd>↓</kbd> when vertical.
          </li>
          <li>
            The buttons are disabled at either end (unless it loops); name them
            (a span with sr-only) and write their icons — mirrored right to left
            by the buttons.
          </li>
          <li>
            Moving by itself (autoplay)? Give a pause button, and stop on hover
            and focus (WCAG 2.2.2): the Plugin example.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-sizes-carousel-demo-container />
        <app-spacing-carousel-demo-container />
        <app-orientation-carousel-demo-container />
        <app-api-carousel-demo-container />
        <app-dots-carousel-demo-container />
        <app-plugin-carousel-demo-container />
        <app-multiple-carousel-demo-container />
        <app-images-carousel-demo-container />
        <app-rtl-carousel-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over the style (cn: a later class
          wins).
        </p>
        <app-parts-table label="Carousel parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class CarouselPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScCarousel, ScCarouselViewport, ScCarouselTrack,',
      '  ScCarouselItem, ScCarouselPrevious, ScCarouselNext, ScCarouselDot,',
      "} from '@semantic-components/ui/carousel';",
    ].join('\n'),
    markup: [
      '<div scCarousel aria-roledescription="…" aria-label="…">',
      '  <div scCarouselViewport>',
      '    <div scCarouselTrack>',
      '      <div scCarouselItem #slide="scCarouselItem"',
      '        aria-roledescription="…" [attr.aria-label]="…">…</div>',
      '    </div>',
      '  </div>',
      '  <button scCarouselPrevious>',
      '    <svg siChevronLeftIcon></svg><span class="sr-only">…</span>',
      '  </button>',
      '  <button scCarouselNext>',
      '    <svg siChevronRightIcon></svg><span class="sr-only">…</span>',
      '  </button>',
      '  <div role="group" aria-label="…">',
      '    @for (i of carousel.positions(); track i) {',
      '      <button scCarouselDot [index]="i"><span class="sr-only">…</span></button>',
      '    }',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScCarousel',
      selector: 'div[scCarousel]',
      description:
        "The region. orientation ('horizontal', 'vertical'); options and plugins (Embla's: a change starts it again with them; its direction from the page unless given); [(activeIndex)]. exportAs scCarousel: api() (Embla's), count() (positions), positions() (0 … count − 1, for the dots), canScrollPrev(), canScrollNext(), scrollPrev(), scrollNext().",
    },
    {
      name: 'ScCarouselViewport',
      selector: 'div[scCarouselViewport]',
      description: "Embla's viewport: the window the slides move in.",
    },
    {
      name: 'ScCarouselTrack',
      selector: 'div[scCarouselTrack]',
      description:
        'The row of slides (a column, vertical); its negative margin matches the slides’ gap.',
    },
    {
      name: 'ScCarouselItem',
      selector: 'div[scCarouselItem]',
      description:
        'A slide, a group: a full basis by default (basis-1/2… for more in view), its gap as start padding. exportAs scCarouselItem: index() and count(), for its name.',
    },
    {
      name: 'ScCarouselPrevious, ScCarouselNext',
      selector: 'button[…]',
      description:
        "The style's button (variant 'outline', size 'icon-sm', the style's corners) outside either end; disabled when it can't move; your icon, mirrored right to left.",
    },
    {
      name: 'ScCarouselDot',
      selector: 'button[scCarouselDot]',
      description:
        'A position’s dot (index): a click goes there; the current one has aria-current and is wider. A 24px target that draws its mark, in the style’s corners. Write its name; put the dots in a group of yours, inside the carousel.',
    },
  ];
}
